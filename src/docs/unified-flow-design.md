# Unified Bulk Ads Launcher — Flow Design

> Goal: ops teams switching between Meta, Google PMax, and Google Search shouldn't have to learn three different mental models. Same skeleton everywhere; content adapts to the platform underneath.

---

## 1 · Current state — three flows compared

| Step | Meta (7 steps) | Google PMax (6 steps) | Google Search (6 steps) |
|---|---|---|---|
| 1 | **Location Pack** (account + locations) | **Data Source** (sheet + product) | **Data Source** (sheet + product) |
| 2 | **Campaign Config** | **Campaign Template** | **Campaign Template** |
| 3 | **Audience** (single) | **Asset Group Templates** (multi 4–5) | **Ad Group Templates** (multi 4–5) |
| 4 | **Adset Config** (placement, bid, schedule) | — *(rolled into campaign)* | — *(rolled into campaign)* |
| 5 | **Creative Assets** (multi-select) | **Ad Copy Template** (single, with placeholders) | **RSA Template** (single, with placeholders) |
| 6 | **Lead Form** | **Bulk Mapping** (locations + matrix) | **Bulk Mapping** (locations + matrix) |
| 7 | **Review & Launch** | **Review & Publish** | **Review & Publish** |

### What's already the same

1. Right rail with live numbers and bulk math
2. Template sources: **Brand / Global / Custom** with badges
3. Multi-select for the "fan-out" step (creatives in Meta, asset groups / ad groups in Google)
4. Spotlight design system, sidebar, stepper, launch modal
5. The fundamental shape: setup → templates → review → push

### What's different (and creates cognitive load)

| Difference | Impact |
|---|---|
| Different number of steps (7 vs 6) | Ops team has to re-learn count every platform switch |
| **Adset/Adgroup/AssetGroup** terminology in different positions | Same concept, three names; users get lost |
| **Audience step** explicit in Meta, embedded in Google | Where do I set targeting? Different answer per platform |
| **Lead Form** is a step in Meta, an extension in Google | Easy to forget on Google or duplicate on Meta |
| **Locations picked early** in Meta (Step 1), **late** in Google (Step 5 Bulk Mapping) | Right rail math is incomplete in Google for 4 steps |
| Meta has no placeholders; Google has heavy placeholders | Different mental model for personalization |
| **No image picker** anywhere yet | Currently we just reference media packs; users can't actually see/swap images |
| **No in-flow preview** anywhere | Users have to wait until Step 7 to see anything visual |

---

## 2 · Design principles for the unified flow

1. **Same skeleton, different content.** Six steps. Same numbers, same names, same order. The form fields inside each step adapt to the platform.
2. **Platform-native subtitles, not platform-native step names.** Step 3 is always called "Targeting Templates", but underneath we show "Meta · ad sets" or "Google · asset groups" so users still learn the platform vocabulary for when they look at reports later.
3. **Locations picked early, always.** Move Google's location selection from Step 5 to Step 1, so the right rail math is meaningful from the start.
4. **One image picker, used everywhere it's needed.** Same modal whether it's a Meta carousel or a PMax asset group.
5. **Preview is not a final step, it's a constant companion.** A live ad mockup sits in the right rail through every step. The Step 6 preview is the full-screen, multi-format version.
6. **One way to do every cross-platform concept.** Lead capture, geo targeting, creative selection — pick one UI pattern and reuse.

---

## 3 · The Unified Flow (6 steps)

```
┌─ 1 SETUP ─────────┬─ 2 CAMPAIGN ──┬─ 3 TARGETING ────┬─ 4 CREATIVE ──────┬─ 5 CONVERSION ─┬─ 6 REVIEW ────┐
│                   │ TEMPLATE      │ TEMPLATES        │ & COPY            │ SETUP          │ & LAUNCH      │
│                   │               │ (multi 4–5)      │                   │                │               │
│ Brand             │ Objective     │ Meta: Ad Sets    │ Headlines + Desc  │ Lead Form      │ Multi-format  │
│ Process Name      │ Bidding       │ PMax: Asset Grps │ Images / Videos   │ Landing URL    │ preview       │
│ Ad Platform 🆕    │ Geo / Budget  │ Search: Ad Grps  │ CTAs              │ Call ext / VMN │ Per-dealer    │
│ Locations         │ Schedule      │ + each carries   │ Placeholders 🆕   │ WhatsApp / Msg │ resolution    │
│ Product (Google)  │ Language      │   audience/kw    │ Image picker 🆕   │                │ Launch button │
│ Data source       │               │   theme/media    │                   │                │               │
└───────────────────┴───────────────┴──────────────────┴───────────────────┴────────────────┴───────────────┘

Right rail (persistent across all 6 steps):
  ┌─ Live Summary    ┐  ┌─ Live Ad Preview 🆕 ┐  ┌─ Bulk Math       ┐
  │ Process · etc.   │  │ Phone/SERP mockup    │  │ N × M = X        │
  │ Account          │  │ resolves placeholders│  │ Daily budget     │
  │ Templates picked │  │ Toggle: Mumbai/Delhi │  │ Est. leads/week  │
  └──────────────────┘  └──────────────────────┘  └──────────────────┘
```

### Step 1 — Setup *(was Location Pack / Data Source)*

| Field | Meta | PMax | Search |
|---|---|---|---|
| Process Name | yes | yes | yes |
| **Ad Platform** | **Meta** *(implicit)* | **Google** + sub-toggle (PMax/Search) | same |
| Ad Account / Customer ID | Meta ad account | Google Ads MCC | same |
| Locations (group or custom) | yes | **yes — moved up from Step 5** | same |
| Product / Data Source | — | sheet + product | sheet + product |

**Locations selected here** so the right rail's math is live from Step 1.

### Step 2 — Campaign Template

Already nearly identical. Fields adapt:

| Concept | Meta | PMax | Search |
|---|---|---|---|
| Objective | Leads / Awareness / Traffic | Leads / Sales / Local | Leads / Traffic |
| Buying / Bidding | Auction / Reservation | Max Conv / Conv Value | Max Conv / Max Clicks |
| Budget unit | per location (CBO/ABO) | campaign-level | campaign-level |
| Geo | inherited from Step 1 locations | Radius / City / State | City / State / Radius |
| Schedule | yes | yes | yes |

### Step 3 — Targeting Templates *(was Audience / Asset Group / Ad Group)*

**Always called "Targeting Templates."** Multi-select 4–5 templates. The subtitle tells the user what these will become in the platform:

- Meta: *"Each becomes an Ad Set"* — Audience (radius, demos, interests)
- PMax: *"Each becomes an Asset Group"* — Audience signal + media pack + search theme
- Search: *"Each becomes an Ad Group"* — Keyword theme + match type + landing page

Meta currently only supports one audience. **Upgrade**: allow Meta multi-audience too (each becomes a separate ad set, mirroring Google's fan-out). Most Meta advertisers actually do this manually today.

### Step 4 — Creative & Copy *(was Creative Assets / Ad Copy / RSA)*

Three sub-sections, conditionally shown:

| Sub-section | Meta | PMax | Search |
|---|---|---|---|
| **A · Headlines & Descriptions** | per creative (1 per ad) | template with `{placeholders}` | RSA with `{placeholders}` |
| **B · Visual Assets** *(image picker)* | required (1:1, 9:16, 16:9) | required per asset group | hidden |
| **C · CTAs & Extensions** | Book Now / Learn More / etc | Sitelinks, Call ext, Lead form ext | same as PMax |

Placeholder support added to Meta too — `{Dealer}`, `{City}` can appear in headline overrides so a Mumbai creative reads differently from a Delhi creative even if it's the same image.

### Step 5 — Conversion Setup *(was Lead Form / built-in)*

The thing that captures the lead. Always its own step now.

| Method | Meta | PMax | Search |
|---|---|---|---|
| Instant Lead Form | yes (Meta Lead Form) | Lead Form Extension | Lead Form Extension |
| Landing Page | yes | yes (Final URL) | yes (Final URL) |
| Call (VMN) | Call ad / button | Call extension | Call extension |
| WhatsApp / Messenger | yes | — | — |

User picks one (or multiple), configures fields if it's a form, picks the landing URL pattern with placeholders if it's a page.

### Step 6 — Review & Launch

Same on all platforms:

- **Big-number matrix** (locations, ad groups, daily budget, est. leads/week)
- **Template Stack** table with source badges
- **Multi-format Preview** (new — section 5 below)
- **Per-dealer resolution table** for placeholders
- **Launch button** → loading modal → success modal

---

## 4 · Image Selection — the picker

### The library structure

A four-tab modal that opens anywhere creative is needed (Step 4 sub-section B).

```
┌──────────────────────────────────────────────────────────────┐
│ Select images                                          [×]    │
├──────────────────────────────────────────────────────────────┤
│ [Brand library]  [Spotlight stock]  [AI generate]  [Upload]   │
│  ────────────                                                 │
│                                                               │
│ Filters: [All] [1:1] [9:16] [16:9]  Tags: ✓Showroom ✓Vehicle │
│ Search: ____________                                          │
│                                                               │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐  ← grid, multi-select w/ checkmarks │
│  │ ✓ │ │ ✓ │ │   │ │   │                                    │
│  └───┘ └───┘ └───┘ └───┘                                    │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐                                    │
│  │   │ │   │ │   │ │   │                                    │
│  └───┘ └───┘ └───┘ └───┘                                    │
│                                                               │
│  3 selected · max 10 for asset group         [Cancel] [Done] │
└──────────────────────────────────────────────────────────────┘
```

### Tabs

| Tab | Content | When useful |
|---|---|---|
| **Brand library** | Pre-approved by Hyundai marketing. Tagged by model (Creta / Venue / i20), format (1:1 / 9:16 / 16:9), campaign type (festive / launch / always-on). | Default. 80% of selections come from here. |
| **Spotlight stock** | Generic auto / lifestyle / showroom images licensed by Spotlight, available to all brands. | Filler when brand library doesn't have the right ratio. |
| **AI generate** | Prompt → 4 variants → pick. Brand color palette pre-applied. | Quick custom for one-off batches. v2 priority — not v1. |
| **Upload** | Drag-drop from device. Image gets auto-tagged on upload. | Last resort for one-time assets that don't deserve to be saved to brand library. |

### Where the picker shows up

- **Meta · Step 4 sub-section B**: pick **multiple** images (each = one creative variant = one ad per location after fan-out).
- **PMax · Step 4 sub-section B**: pick images **per asset group**. The Asset Group Template suggests a media pack (Showroom / Vehicle / Lifestyle); user can confirm or swap individual images.
- **Search · sub-section B is hidden** entirely. Search ads have no images.

### What we DON'T do

- Don't auto-pick images for the user. Always confirm.
- Don't allow upload of images without brand approval flagging. If an ops user uploads a non-brand-library image, it gets a "pending brand approval" badge and the campaign can't launch until cleared.
- Don't store everything in one giant flat library — tag aggressively (model, format, campaign type, date, approved-by).

---

## 5 · Preview System — two layers

### Layer 1 · In-flow preview (right rail, persistent)

A third card in the right rail, below Live Summary, above Bulk Math. Updates in real time as the user makes selections.

```
┌─ Live Ad Preview ───────────┐
│ ☐ Mumbai dealer  ☑ Delhi   │  ← toggle between sample locations
├─────────────────────────────┤
│                             │
│  [phone or SERP mockup]     │
│                             │
│  Headlines/copy resolved    │
│  with current placeholders  │
│                             │
│  CTA · Image preview        │
│                             │
└─────────────────────────────┘
```

**Per platform mockup style:**

- **Meta**: a phone-shaped frame showing Feed format with image + headline + CTA. Toggle for Story/Reel formats.
- **PMax**: a small Search SERP mockup OR a Display banner mockup, toggleable.
- **Search**: classic SERP mockup with sponsored badge, 2 headlines, description, sitelinks.

The location toggle (Mumbai / Delhi) shows the placeholder magic in action — same template, different resolved content.

### Layer 2 · Step 6 full preview (multi-format gallery)

When the user reaches Step 6, the preview gets a full section above the launch bar:

```
┌─ Multi-format preview ─────────────────────────────────┐
│ Format: [Feed] [Story] [Reel]  Location: [Mumbai ▾]    │
│                                                         │
│  ┌──────────────────────────┐                          │
│  │                          │                          │
│  │   [full ad mockup]       │                          │
│  │                          │                          │
│  └──────────────────────────┘                          │
│                                                         │
│  Hyundai Festive Lead Gen · Shree Hyundai · Andheri W   │
│  Daily budget: ₹3,500 · Est. leads/wk: ~148            │
└────────────────────────────────────────────────────────┘
```

User can flip through every combination — Feed Mumbai, Story Mumbai, Feed Delhi, Reel Pune, etc. — before pulling the trigger.

For Search, the formats are: Mobile SERP / Desktop SERP / Search Partners. For PMax: Search / Display / YouTube / Discover.

---

## 6 · What changes vs. the current demos

| Change | Meta demo | PMax demo | Search demo |
|---|---|---|---|
| Step count: 6 (was 7 for Meta) | Merge Adset Config into Campaign + Targeting | no change | no change |
| Step 1 includes locations | already there | **move from Step 5** | **move from Step 5** |
| Step 3 renamed "Targeting Templates" | rename + allow multi-select audiences | rename | rename |
| Step 4 gets image picker | **new component** | **new component** | section hidden |
| Step 5 becomes explicit "Conversion Setup" | already had Lead Form | **promote from extension toggle** | **promote from extension toggle** |
| Right rail gets live preview card | **new component** | **new component** | **new component** |
| Step 6 gets multi-format preview gallery | **new component** | **new component** | **new component** |
| Platform toggle at top of every flow | Meta | Google + PMax/Search sub-toggle | same |

---

## 7 · The single-HTML demo

Once this design is agreed, we can collapse the two HTMLs (Meta + Google) into a **single demo** with a top-level platform toggle:

```
[Meta] [Google]
       └─ [PMax] [Search]
```

Same 6 steps below, content adapts to the chosen combination. This is the cleanest way to prove "one flow, three modes" and is what we'd ship to ops in production.

---

## 8 · Open questions

1. **Multi-audience in Meta as default?** Or behind a "Show advanced" toggle? Current Meta flow assumes one audience. Defaulting to multi would match Google but might feel heavy for simple cases.
2. **AI image generation in v1 or v2?** It's the flashiest tab but the lowest volume early. Probably stub it for v1 with "Coming soon" and ship in v2.
3. **Save custom configs as templates?** When a user builds a one-off custom audience or campaign, do we offer "Save as template" automatically, or require explicit action? Recommend explicit action with a prominent CTA.
4. **Preview resolution sample size.** Right rail shows 1 dealer at a time (toggleable). Step 6 shows 1 at a time too. Should Step 6 show a 4-up grid (4 dealers side by side) by default to drive home the personalization story?
5. **Brand approval gate for uploads.** Hard block on launch if any uploaded asset isn't brand-approved, or soft warning? Recommend hard block — the cost of a non-brand-approved ad going live is high.

---

## 9 · Next steps

If the design above looks right, the next moves are:

1. **Update the two existing HTMLs** to the unified 6-step flow (or rebuild as one HTML with the platform toggle)
2. **Build the image picker modal** as a reusable component
3. **Build the in-flow preview card** for the right rail (one component, three rendering modes per platform)
4. **Build the Step 6 multi-format preview gallery**
5. **Run the unified flow past 2–3 ops users** on Hyundai and one other brand to pressure-test

The current Meta and Google HTMLs stay valid as platform-specific deep-dives in the meantime.
