# Media Plan Creation — Monthly Workflow

**Scope:** How a brand's media plan for the upcoming month is created, reviewed, and shipped. This document is the workflow spec; the algorithm spec lives in `media-plan-generation-flow.md`.

**Brand of reference:** Hyundai India · 312 active dealers · planning for April 2026.

---

## 1. Entry surfaces

Three ways the creation flow can start. All converge on the same engine.

| Surface | Who triggers | When | Notes |
|---|---|---|---|
| **Monthly cron** | System | 25th of each month, ~02:00 IST | Auto-creates a draft plan for the next month. Notifies brand admin. Never auto-publishes. |
| **Brand admin UI** | Brand admin | On-demand | "+ New media plan" button in the brand's planning module. Wizard mode. |
| **Max chat** | Brand admin or agency lead | Anytime | One-line invocation: *"Build April plan for all active dealers — keep brand defaults, apply +12% Diwali boost to North zone."* Max parses intent, populates the wizard with derived overrides, and either auto-runs or shows the wizard for review depending on confidence. |

All three produce a plan in `state = draft`. Nothing goes live without an explicit `lock` action.

---

## 2. Plan state machine

```
draft ─────▶ generating ─────▶ review ─────▶ approval_pending ─────▶ locked ─────▶ live
   │              │                │                │                    │            │
   │              │                │                │                    │            ▼
   │              │                │                │                    │       (mid-month
   │              │                │                │                    │       re-plan creates
   │              │                │                │                    │       a new draft)
   ▼              ▼                ▼                ▼                    ▼
discarded     failed (retry)   amended         rejected             cancelled
                                (back to draft) (back to review)    (rollback)
```

A plan that's `locked` is the source of truth for the month. Mid-month re-plans don't overwrite it — they create a new draft that supersedes affected dealer rows when locked.

---

## 3. The six steps

Each step has a **trigger** (who initiates), **inputs**, **system actions**, **decisions surfaced to the user**, and **outputs** that feed the next step.

### Step 1 — Scope

> *Who are we planning for, and for which month?*

| | |
|---|---|
| **Trigger** | Brand admin / Max chat / Cron |
| **Duration** | < 1 min |
| **State on entry** | `draft (empty)` |
| **State on exit** | `draft (scoped)` |

**Inputs**
- `period` — next calendar month, default. Custom range supported.
- `scope` — one of: `all_active` (default), `by_zone`, `by_state`, `specific_dealers`, `include_paused`.
- `include_new_dealers` — boolean, default `true`. Toggles cohort-fallback for sub-30-day dealers.

**System actions**
- Resolve `period` to start/end dates.
- Apply scope filter against the dealer master.
- Compute the breakdown: active / new / paused / churned.
- Validate that scope is non-empty.

**Decisions surfaced**
- *Include the 5 new dealers (<30 days)?* — Defaults to YES with `cold_start` flag. Their plans get cohort-median fallback at Stage 3 and route through brand approval regardless of co-op rules.
- *Include paused dealers?* — Defaults to NO. Reactivation handled separately.

**Output**
```js
scope: {
  period: { start: "2026-04-01", end: "2026-04-30" },
  dealer_ids: [...312 ids],
  status_breakdown: { active: 312, new: 5, paused_excluded: 2, churned_excluded: 1 },
  cold_start_treatment: "cohort_median"
}
```

---

### Step 2 — Load context

> *Pull every input the math will need.*

| | |
|---|---|
| **Trigger** | System (automatic on scope confirm) |
| **Duration** | 8–15 sec |
| **State** | `draft (scoped) → draft (loaded)` |

Pure read stage. No decisions, no writes. If anything fails, the step retries; on second failure, surface error and abort.

**System actions** *(parallel where possible)*

| Source | What's fetched | Where it lives |
|---|---|---|
| Brand config | `brand_format_catalog` (3 platforms, 6 formats), `channel_share_defaults`, `daily_max_budget` | brand setup module |
| Zone floors | 4 zones × ₹ floor | hardcoded in algo / config table |
| CPL bands | floors + ceilings per zone × format (6 × 4 = 24 bands) | config table |
| Co-op rules | brand-funded % per format, approval thresholds, monthly cap | `CooptRulesModule` |
| Historical perf | 90 days of spend + CPL per `dealer × format × week` | BigQuery |
| Wallet state | balance, days_runway, status per dealer | wallet module |
| Subscription state | which dealers are on Velocity, CTWA add-on enabled | subscription module |

**Data quality bucketing** *(emitted as part of load)*

- `full_history` — ≥90 days of data → use as-is.
- `partial_history` — 30–89 days → use with confidence flag.
- `cold_start` — <30 days → cohort-median fallback at Stage 3.
- `wallet_healthy` — runway ≥7d.
- `wallet_warn` — runway 2–7d → generate with alert.
- `wallet_critical` — runway <2d → suspend plan, notify dealer to top up.

**Output**
```js
context: {
  brand: { platforms, formats, zone_floors, cpl_bands, daily_max, coop_rules },
  history: { [dealer_id]: { totalSpendAvg, cpl: {...}, trend: {...}, dataQuality } },
  wallets: { [dealer_id]: { balance, runwayDays, status } },
  subscriptions: { [dealer_id]: { tier, ctwa_enabled } }
}
```

---

### Step 3 — Apply overrides

> *Layer this month's adjustments on top of brand defaults.*

| | |
|---|---|
| **Trigger** | Brand admin / Max chat |
| **Duration** | 1–5 min |
| **State** | `draft (loaded) → draft (overrides_applied)` |

Optional but always inspected. The override stack is resolved into an `effective_config` per dealer before Stage 4 runs.

**Override sources** *(rendered in the UI grouped by source)*

1. **Max chat history** — anything the brand admin told Max in past chats that's marked durable. Examples:
   - "*Apply Diwali +12% to North zone for April*" → seasonality multiplier.
   - "*For new dealers, use cohort medians and 70% of zone floor*" → cold-start policy override.
   - "*Cap brand co-op pool at ₹38L for April*" → monthly cap override.

2. **System-auto** — overrides the system applies based on signals. Examples:
   - Regional CPL imbalance ("Tamil Nadu Meta > 2× Search for 6 weeks") → auto-shift 5% to Search.
   - Wallet pattern ("Dealer X auto-pauses every month at week 3") → tighten daily budget.

3. **Manual additions** — brand admin adds new ones inline. Stored to either ephemeral (this plan only) or persistent (brand default change).

**Override precedence** *(resolved top-down)*

```
1. Max chat (this session)        — highest, ephemeral
2. Dealer-level pins              — persistent per dealer
3. Region / state overrides       — persistent per state
4. Zone-level rules               — North/South/East/West
5. Brand-level defaults           — from brand setup
6. System fallbacks               — hardcoded
```

Every value used by the math has an `override_source` field that gets logged. Crucial for the question "why did this dealer's Search share end up at 95%?"

**Output**
```js
overrides: [
  { source: "max_chat", scope: "zone:north", field: "baseline_multiplier", value: 1.12, expires: "2026-05-31" },
  { source: "max_chat", scope: "status:new", field: "cold_start_policy", value: "cohort_median" },
  { source: "system_auto", scope: "state:TN", field: "meta_share_delta", value: -0.05 },
  { source: "max_chat", scope: "brand:global", field: "coop_monthly_cap", value: 3800000 }
]
```

---

### Step 4 — Generate

> *Run the seven-stage algorithm per dealer.*

| | |
|---|---|
| **Trigger** | System (on user confirm at end of Step 3) |
| **Duration** | ~30 sec for 312 dealers (≈90 ms/dealer) |
| **State** | `draft (overrides_applied) → generating → review` |

For each dealer in scope:

1. **Resolve effective config** — deep-merge the 6 layers.
2. **Compute baseline** — `max(hist_avg, zone_floor)`, capped by `daily_max × 30`, gated by `wallet_runway ≥ 2d`.
3. **Platform split** — apply % shares across enabled platforms; rebalance if Meta CPL > 2× Search CPL.
4. **Format split** — within each platform, split by brand format shares (or dealer-historical if applicable).
5. **CPL targets** — `hist_cpl × 0.95` (or `last_month_cpl` if rising), clamped to floor/ceiling.
6. **Co-op decomposition** — split each row's budget into `brand_pays` and `dealer_pays`. Track cumulative against monthly cap.
7. **Risk flags** — apply the flag taxonomy (rising, meta_over_2x, cold_start, floor_hit, ceiling_hit, wallet_critical, coop_cap_near).

Failures don't abort the batch — they accumulate. Typical outcomes for 312 dealers:

| Outcome | Count |
|---|---|
| Plans drafted | 309 |
| Suspended (wallet critical) | 2 |
| Failed (override conflict, retry) | 1 |
| Total rows generated | 1,854 (309 × 6 platform-format combinations) |

**Live progress** — UI streams stage-level progress: "Stage 4 / 7 · 207 of 312 dealers". Behind-the-scenes log shows aggregate stats (floors hit, ceilings hit, co-op pool drawn).

**Output**
```js
plans: [
  {
    dealer_id, period,
    baseline, total_budget,
    rows: [{ platform, format, budget, brand_funded, dealer_funded, target_cpl, hist_cpl, expected_leads, flags, override_sources }],
    summary: { total_leads, blended_cpl, brand_funded_total },
    flags: [...dealer-level flags]
  },
  ...
]
```

---

### Step 5 — Review & approve

> *Aggregate metrics, flagged dealers, approval queue.*

| | |
|---|---|
| **Trigger** | Brand admin (review session) |
| **Duration** | 10–30 min for a 300-dealer brand |
| **State** | `review → approval_pending → review_approved` |

Brand admin sees three things, in order:

#### 5a. Roll-up metrics

| Metric | Example value |
|---|---|
| Total monthly budget | ₹4.19 Cr |
| Brand-funded total | ₹37.2 L (97.9% of ₹38 L cap) |
| Dealer-funded total | ₹3.82 Cr |
| Expected leads | 11,240 |
| Blended CPL | ₹372 |
| Dealers needing attention | 38 of 309 |

#### 5b. Flag grouping

Dealers don't surface individually — they're grouped by flag category so a buyer can act in bulk.

| Flag | Count | Action |
|---|---|---|
| `rising_cpl` (≥10% MoM for 2+ months) | 17 | Review creative refresh, reallocation |
| `meta_over_2x` (Meta CPL > 2× Search) | 9 | Auto-rebalance applied; manual review optional |
| `cold_start` (new dealer) | 5 | Approve estimate or set manual baseline |
| `floor_hit` (CPL clamped to floor) | 4 | Historical anomaly or genuine outlier? |
| `wallet_critical` (runway <2d) | 2 | Notify dealer to top up; plan stays suspended |
| `coop_cap_near` (brand pool >95%) | 1 | Reserve last 2% for mid-month adjustments |

#### 5c. Approval queue

- **Auto-approve eligible** — 271 plans below the configured threshold. One click approves all.
- **Pending brand admin review** — 38 plans above threshold or flagged. Each needs a human OK.
- Brand-funded co-op portions enter `approval_pending` until cleared.

**Output**
```js
review: {
  approved_plan_ids: [...271 + cleared subset of 38],
  rejected_plan_ids: [...],
  amended_plan_ids: [...]  // edited values + audit trail
}
```

If anything was amended, the plan goes back to `draft` for that dealer (only) and Step 4 re-runs for them.

---

### Step 6 — Lock & ship

> *Allocate wallets, push campaigns, notify dealers.*

| | |
|---|---|
| **Trigger** | Brand admin clicks "Lock plan" |
| **Duration** | 2–5 min end-to-end |
| **State** | `review_approved → locked → live` |

The publish sequence runs as a transaction. Any step failing rolls back the previous ones.

1. **Finalize plan state** (~5s)
   - Mark `state = locked`, stamp `revision_id` (e.g. `mp_apr26_v1`).
   - Persist immutable snapshot for audit.

2. **Allocate sub-wallets** (~20s)
   - Create or update 309 sub-wallet entries with the dealer's monthly allocation.
   - Draw brand-funded portion (₹37.2 L) from the brand's co-op pool.
   - Reserve runway gates per dealer.

3. **Push to Campaigns module** (~45s)
   - 1,854 campaign drafts created.
   - Google Ads + Meta Ads + WhatsApp Business APIs queued.
   - Each campaign carries its plan row reference (so analytics can later compare actuals vs plan).

4. **Notify dealers** (~10s)
   - WhatsApp message via the dealer's connected number: *"Your April plan is live · ₹X budget · Y expected leads."*
   - In-app notification + email.

5. **Generate Excel export** (~3s)
   - Standard template: per-row sheet + summary sheet.
   - Uploaded to brand's Reports module folder.

6. **Schedule mid-month re-plan** (instant)
   - Cron set for the 15th of the month.
   - Partial re-plan only — affects dealers with deviation >20% from plan, not the full brand.

**Side effects**
- Campaigns module dashboard updates for all dealers.
- Analytics begins tracking against plan targets (hourly refresh).
- Max watches the plan for deviation alerts in the background.

---

## 4. The Max chat express lane

For brands that have run the wizard 6+ months and trust the defaults, the entire flow collapses into a single chat command:

> **Brand admin:** *Build April plan for all active dealers — keep brand defaults, apply +12% Diwali boost to North zone.*
>
> **Max:** *Got it. Scoping 312 active dealers for April. Loading 90-day history... done — 287 with full history, 5 cold-start, 2 wallet-critical. Applying your Diwali override and the standing co-op cap from last month. Generating now... done — 309 plans, 38 flagged. Want me to walk through the flagged ones, or auto-approve eligible and queue the rest for review?*

What happens under the hood: Max parses the intent, runs Steps 1–4 unattended, then surfaces the Step 5 review screen with the flag groups. The brand admin stays in chat until they say "Lock it" — at which point Step 6 runs.

The wizard and the chat path are **identical engines** — same plan state, same audit log. The only difference is the rendering surface.

---

## 5. Re-plan triggers (mid-month)

A `locked` plan doesn't mean static. Five events trigger a partial re-plan:

| Event | Re-plan scope | Auto or manual? |
|---|---|---|
| **Zone floor change** | All dealers in that zone | Auto + brand notification |
| **Dealer onboards mid-month** | New dealer only | Auto — generates a pro-rated plan |
| **Wallet top-up after critical pause** | That dealer only | Auto — unsuspends and generates |
| **Brand toggles a format off** | All dealers using that format | Manual — brand admin confirms the reallocation |
| **Performance deviation >20%** | Dealers triggering the alert | Manual — buyer reviews and decides |

Each re-plan event creates a new `draft` revision against the locked plan. When the new revision is locked, it supersedes the affected rows only — the rest of the original plan stays untouched. Revision history is preserved (`mp_apr26_v1`, `mp_apr26_v2`, ...).

---

## 6. Edge cases & how the flow handles them

| Case | Treatment |
|---|---|
| **Brand has zero dealers with history** (first month live) | Cold-start path for everyone. Plans flagged as estimates, brand approval required, no auto-approve eligibility. |
| **Override conflict** (Max chat says +12%, dealer pin says -5% for the same dealer) | Higher precedence wins (chat > dealer pin). Conflict logged in audit and surfaced as `override_conflict` flag in review. |
| **Co-op cap exceeded** | Last few rows fall back to 100% dealer-funded with `coop_cap_exceeded` flag. Brand admin can raise the cap and re-approve, or accept. |
| **Format disabled mid-cycle** | Existing locked plans aren't touched. Next month's plan excludes the format. If brand wants immediate effect, manual re-plan trigger. |
| **Wallet critical at lock time** (was healthy at generate time) | Plan locks but the dealer's row enters `paused` state. Campaigns module doesn't push for that dealer until top-up. |
| **Subscription downgrade between draft and lock** | Plan invalidated for that dealer. Returns to `draft` with a `subscription_change` flag. Brand admin decides. |
| **BigQuery fetch fails partially** | Affected dealers move to `partial_history` bucket and get cohort-fallback for missing periods. Surfaced as `data_quality_warn`. |

---

## 7. Data model

### Plan object (top level)

```js
{
  plan_id, brand_id, revision_id,
  period: { start, end },
  state: 'draft' | 'generating' | 'review' | 'approval_pending' | 'locked' | 'live' | 'cancelled',
  created_at, locked_at, created_by, locked_by,
  scope: { dealer_ids, status_breakdown },
  effective_config: { ...resolved overrides },
  override_stack: [...overrides with sources],
  summary: { total_budget, brand_funded, leads, blended_cpl, flagged_dealers },
  rows: [...1,854 dealer-platform-format rows]
}
```

### Row object (one per dealer × platform × format)

```js
{
  row_id, plan_id, dealer_id,
  platform, format,
  budget, brand_funded, dealer_funded,
  target_cpl, hist_cpl, expected_leads,
  flags: [...],
  override_sources: { baseline: 'zone_floor', cpl: 'hist', share: 'brand_default', ... },
  campaign_id: null  // populated at lock time
}
```

### Audit log entry

```js
{
  event_id, plan_id, timestamp, actor,
  action: 'scope_set' | 'context_loaded' | 'override_added' | 'generated' | 'reviewed' | 'amended' | 'locked' | 'replanned',
  payload: { ...event-specific data },
  precedence_resolution?: { dealer_id, field, source, value }
}
```

---

## 8. What still needs deciding

Open questions before this can be built end-to-end:

1. **Cron timing** — 25th of month at 02:00 IST works for a brand with a single admin in IST. Multi-region brands may need a different default. Make it configurable per brand.
2. **Approval threshold** — what defines "auto-approve eligible"? Suggested: budget ≤ 1.5× last month's actual + no red flags + brand-funded ≤ ₹50k for that dealer. Make it brand-configurable.
3. **Cohort definition for cold-start** — same zone + same dealer-type (Dealer / Showroom / Franchise) is the minimum. Should it also match city tier? Vehicle segment? Decide before launch.
4. **Re-plan deviation threshold** — currently set at 20% for performance deviations. Should this be format-specific (Meta has more noise) or zone-specific? Pilot for one month then tune.
5. **Excel template versioning** — when the brand changes column preferences, do all historical plans render with new template or stay with their snapshot template? Suggest: snapshot at lock time, render-as-it-was-then.
6. **Max chat memory retention** — how long do overrides from chat persist? Single plan? Single month? Until explicitly cleared? Suggest: per-override `expires` field with sensible defaults.

---

*Sister doc: `media-plan-generation-flow.md` (the algorithm). Companion visualization: `media-plan-creation-flow.html` (the wizard) and `media-plan-flow-viz.html` (the dashboard).*
