# Spotlight Product Suite — Three Products + Creative AI Layer

> **What this is.** A prototyping-ready spec that defines the three Spotlight products, the Creative AI layer that cuts across them, and the **single visual language** to use for all of them. Hand this entire document to a design/prototyping tool and it should have everything it needs to produce hi-fi screens.
>
> **Sources used:**
> - **Spotlight Admin** flows → `spotlight-master-config-spec` (subscription & onboarding master)
> - **Brand product** flows → `Magicpatter_brand_bangkok_demo`
> - **Partner product** flows → `Magicpatter_partner_bangkok_demo`
> - **Creative AI** flows → `CREATIVE_AI_USER_FLOWS`
> - **Visual language** → `Spotlight_Design_Guidelines` (overrides the orb/void-purple/Playfair aesthetic described in the demo PDFs)

---

# PART I — FOUNDATION

## 0. Product Landscape at a Glance

| # | Product | Persona | Primary purpose | Source doc |
|---|---|---|---|---|
| 1 | **Spotlight Admin** *(internal)* | Spotlight ops team | Onboard brands end-to-end, configure commercials, bulk-set-up campaigns on behalf of brands | `spotlight-master-config-spec` |
| 2 | **Partner Product** *(Bolt)* | Dealer / franchisee / store owner | Get onboarded under a brand, pick a package, sign dealer agreement, pay, wait for activation, then run campaigns | `Magicpatter_partner_bangkok_demo` |
| 3 | **Brand Product** | Brand HQ POC | Configure brand DNA, see partner-network performance, control creatives, monitor co-op spend | `Magicpatter_brand_bangkok_demo` |
| 4 | **Creative AI** *(cross-product)* | Spotlight / Brand admin / Dealer | One creative system used by all three roles — Spotlight curates backgrounds, brand sets the template, dealer composes | `CREATIVE_AI_USER_FLOWS` |

**One-line model.** Spotlight Admin loads the platform → Brand Product configures the brand's slice of it → Partner Product is what the local dealer uses day-to-day → Creative AI is the shared creative pipeline running underneath all three.

> **⚠️ Note on visual language for prototypers.** All three products share the **single design system in §1**. Earlier prototype-specific aesthetics referenced in the brand/partner demo PDFs (the agent orb gradient, beam-gold → void-purple, Playfair Display + DM Sans, void/iris/beam color tokens) are superseded by this unified system. The flows themselves stay the same — only the visual treatment changes.

---

## 1. Design System

This section is the design language for **every** screen across the three products. Copy it verbatim into the prototyping tool's style system.

### 1.1 Brand identity

| Element | Spec |
|---|---|
| Product mark | White wordmark + coloured dots on indigo `#0E0071` chip. Auth screen wraps the wordmark in a 12×16 indigo box, radius 10. |
| Voice | Confident, instructive, second-person. Microcopy explains *why*, not just *what* — e.g. "Compose a creative in Creative AI, hit Save to Library, and it'll appear here." |
| Density | High — sidebar is permanent, cards stack tight (14px gap), tables run dense rows. |

### 1.2 Color tokens

Paste this `:root` block verbatim. Every color across every screen comes from here.

```css
:root {
  /* Brand */
  --brand-indigo:        #0E0071;  /* sidebar bg, toasts, headings on dark, accent */
  --brand-blue:          #0070FC;  /* primary CTA, links, active tabs, focus rings */

  /* Surfaces */
  --bg-page:             #F2F8FF;  /* page background — very pale blue, NOT white */
  --surface:             #FFFFFF;  /* cards, modals */
  --border-soft:         #CCE3FF;  /* every divider/border, 0.5px or 1px */

  /* Text */
  --text:                #333333;
  --text-muted:          #657180;

  /* Status (pills) */
  --pill-pending-bg:     #FFF7E5;  --pill-pending-fg:    #9A6601;
  --pill-submitted-bg:   #E5F1FF;  --pill-submitted-fg:  #0E0071;
  --pill-done-bg:        #D0FEE5;  --pill-done-fg:       #003F1D;

  /* Semantic */
  --accent-success:      #00C158;
  --danger:              #D9342B;

  /* Radii */
  --radius-card:  12px;
  --radius-ctrl:  8px;
  --radius-pill:  20px;
  --radius-badge: 4px;

  /* Elevation */
  --shadow-card: 0 1px 3px rgba(14, 11, 26, 0.08);

  /* Typography */
  --font-body:  "Noto Sans", system-ui, sans-serif;
  --font-brand: Barlow, "Playfair Display", serif;
  --font-mono:  "JetBrains Mono", ui-monospace, monospace;
}
```

**Key intent the prototype must preserve:**
- Page background is `#F2F8FF` (pale blue), **not white**. Cards (white) float on a faint blue field. This is the entire reason the UI doesn't read as Bootstrap.
- All borders are `border-soft` at **0.5px**, not 1px. Subtle separation, never hard lines.
- Single shadow ladder: cards get `--shadow-card` (almost invisible); modals/drawers escalate to `0 10px 40px rgba(14,11,26,0.18)`. No mid-tier elevation.

### 1.3 Typography

| Role | Font | Size | Weight | Line-height | Letter-spacing | Notes |
|---|---|---|---|---|---|---|
| Body | Noto Sans | 14 | 400 | 23.8 (1.7) | 0 | base |
| Page title | Noto Sans | 24 | 700 | 40.8 | −0.48px | `h1.page-title` |
| Auth title | Noto Sans | 22 | 700 | 1.2 | 0 | login hero |
| Card title | Noto Sans | 16 | 600 | — | 0 | inside `.sp-card` |
| Section label | Noto Sans | 13 | 600 | — | 0.78px UPPERCASE | numbered card sections |
| Side-group label | Noto Sans | 10 | 500 | — | 0.8px UPPERCASE | sidebar group titles, rgba-30 white |
| Field label | Noto Sans | 12 | 600 | — | 0.48px UPPERCASE | form labels |
| Pill | Noto Sans | 11 | 500 | — | 0.66px UPPERCASE | status pills |
| Help / sub | Noto Sans | 12–13 | 400 | — | 0 | `--text-muted` |
| Numeric stat | JetBrains Mono | 22 | 500 | 1.1 | 0 | dashboard tiles, counts |
| Side stat value | JetBrains Mono | 16 | 500 | — | 0 | sidebar numbers |
| Brand wordmark | Barlow | 20 | 700 | 34 | −0.2px | sidebar product name |

**Rules of thumb (apply everywhere):**
- Anything categorical (labels, status, section headers) → UPPERCASE + letter-spacing.
- Anything numeric (counts, IDs, prices, dimensions) → JetBrains Mono.
- Everything else → Noto Sans body.

### 1.4 Spacing & sizing scale

`4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28 · 32 · 40`

| Surface | Padding | Inter-child gap |
|---|---|---|
| `.sp-card` (main content card) | 20px 24px | `.card-stack > * + * { margin-top: 14px }` |
| `.content` (page main) | 24px 32px 40px | — |
| `.sidebar` | 20px 14px 24px | gap 18px (column) |
| `.topbar` | 18px 32px 0 | gap 14px |
| `.modal` | 24px 28px | 14/20 between sections |
| Form `.field` | — | gap 6 between label/input |
| Button (primary) | 8px 16px | — |
| Button (sm) | 6px 14px | — |
| Pill | 3px 10px | — |

### 1.5 Layout primitives

#### App shell
```
┌──────────────┬─────────────────────────────────────────────┐
│              │ topbar (right-aligned: avatar + username)   │
│  sidebar     ├─────────────────────────────────────────────┤
│  220px       │ .content                                    │
│  indigo bg   │   .page-head (h1 + sub on L, CTA on R)      │
│              │   .card-stack (every page = stacked cards)  │
│  sticky      │     .sp-card                                │
│  100vh       │     .sp-card                                │
└──────────────┴─────────────────────────────────────────────┘
```

**Sidebar:** 220px wide, fixed, indigo `#0E0071`, sticky to viewport, scrolls if overflow. White text at varying alpha (1.0 → 0.3 for group labels). Active nav item = solid `--brand-blue` pill background. Hover = 5% white wash.

**Content area:** always white cards on the pale-blue page background — never raw page bg under primary content.

#### Page anatomy (every page in every product follows this)

```html
<div class="card-stack">
  <div class="page-head">
    <div>
      <h1 class="page-title">…</h1>
      <div class="page-sub">…</div>
    </div>
    <button class="btn-primary-sm">+ Primary action</button>
  </div>

  <div class="sp-card">
    <div class="section-label">1 · Section name</div>
    …
  </div>

  <div class="sp-card">
    <div class="section-label">2 · Next section</div>
    …
  </div>
</div>
```

Numbered section labels (`1 · `, `2 · `, with middle dot, not colon) are a signature — long flows are always explicit step-by-step.

### 1.6 Component library

#### Cards `.sp-card`
```css
.sp-card {
  background: var(--surface);
  border: 0.5px solid var(--border-soft);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  padding: 20px 24px;
}
.card-stack > * + * { margin-top: 14px; }
```

#### Buttons

| Class | Use |
|---|---|
| `.btn-primary` | Solid `--brand-blue`, white text, 600 weight, 8px 16px, radius 8. Hover: `filter: brightness(.95)` + soft glow `0 2px 6px rgba(0,112,252,.25)`. Active: `translateY(1px)`. |
| `.btn-primary-sm` | Same fill, 6px 14px, weight 500. Used in `.page-head`. |
| `.btn-outline` | Transparent, blue text, 1px blue border, 7px 16px. Hover: `background: rgba(0,112,252,.06)`. Always pair with a primary. |
| `.btn-outline-xs` | Same shape, 4px 10px, 0.5px border. Table-row actions. |
| `.btn-success` | Green `#1FB161`, white text. Save/publish confirmations. |
| `.btn-danger-outline` | Red `--danger` outline. Delete/remove. |
| `.btn-ai-outline` | Blue **dashed** border. Signals an "AI-powered" action (generate, suggest). |
| `[disabled]` | `filter: grayscale(.35); opacity: .65; cursor: not-allowed`. Not a fade-out. |

#### Filter tabs `.filter-tabs > .tab`
Pill-shaped, blue text on white with 1px soft border. Active: solid blue fill, white text, weight 600. Used wherever a list is filtered (creatives, backgrounds, dealers, partners).

#### Status pills
```css
.pill { padding: 3px 10px; border-radius: 4px; font-size: 11px;
        letter-spacing: 0.66px; text-transform: uppercase; }
.pill-pending   { bg: #FFF7E5;  fg: #9A6601; }   /* yellow */
.pill-submitted { bg: #E5F1FF;  fg: #0E0071; }   /* indigo */
.pill-done      { bg: #D0FEE5;  fg: #003F1D; }   /* green */
.pill-muted     { bg: #EEF2F6;  fg: #657180; }   /* gray */
```
**Three colours, three states. Don't invent new ones.**

#### Forms
- Inputs / selects / textareas share one base: white, 1px `--border-soft`, radius 8, 9px 12px, 14px font.
- `.field-label` is uppercase, 12/600, letter-spacing 0.48px.
- `.field-help` is muted 12px.
- Selects override the default arrow with an inline SVG chevron (gray `#657180`). Same trick for an indigo `.role-select` (white chevron).
- Search inputs: prefix a 14×14 inline-SVG magnifier (stroke `#657180`) at `left: 12px`; input gets `padding-left: 34px`.
- Focus state: `border-color: --brand-blue` + `box-shadow: 0 0 0 3px rgba(0,112,252,.12)`.

#### Tables `.sp-table`
- Header row: 12/500, muted, uppercase, 0.4px tracking, 0.5px bottom border.
- Body row: 13/500, dark text, 14×16 padding, 1px `#F2F8FF` divider.
- Hover row: `background: rgba(0,112,252,.03)` — almost invisible blue wash.

#### Modals
Centred, white, radius 16 (one notch up from cards), max 480px (`.lg = 640px`), 24×28 padding, shadow `0 10px 40px rgba(14,11,26,.18)`. Overlay `rgba(15,23,42,.45)`. Title 18/700, sub 13 muted. Footer right-aligned buttons with 10px gap.

#### Toasts
Fixed bottom-right (24px / 24px), indigo background `#0E0071`, white text, radius 8, 10px 14px, 13px font. One per action.

#### Drawers
Right-side slide-in, 720px wide, white. Same `border-soft` divider between head/body. Used for read-only detail views (audit log entries, lead detail, partner detail, etc.).

#### Toggle (switch)
34×20 pill. Gray off `#CBD5E1`, blue on `--brand-blue`. 16×16 white knob, translates 14px.

#### Chip input (tag entry)
```css
.chip-input { border: 0.5px solid var(--border-soft); border-radius: 6px; min-height: 38px; }
.chip { background: var(--brand-blue); color: #fff; border-radius: 999px; padding: 3px 4px 3px 10px; }
```
Enter or comma commits a tag; backspace on empty input removes the last chip.

#### AI chips (prompt suggestions)
Page-bg fill, soft border, radius 20, 12px font, 5×12 padding. Click-to-append behaviour. Used for agent prompt suggestions.

### 1.7 Iconography

- All nav icons are 16×16 line SVGs, `stroke-width: 1.5`, white stroke, no fill.
- Inline as `<svg viewBox="0 0 24 24">…</svg>` and let CSS handle sizing.
- Same draw style for every new icon — **no filled icons, no gradients, no two-tone**.

### 1.8 Interaction states (canonical)

| State | Treatment |
|---|---|
| Hover (primary) | `filter: brightness(.95)` + soft brand-blue glow shadow |
| Hover (outline) | `background: rgba(0,112,252,.06)` |
| Hover (table row) | `background: rgba(0,112,252,.03)` |
| Active / pressed | `translateY(1px)` on primary CTAs |
| Focus (input) | 1px brand-blue border + 3px outer ring `rgba(0,112,252,.12)` |
| Selected tile | `outline: 2px solid brand-blue; outline-offset: 1px` (outline, not border — avoids layout shift) |
| Disabled | `filter: grayscale(.35); opacity: .65` |
| Loading | `dpSpin` keyframe (rotate + 1.15× scale, 1.2s ease-in-out) |

**Transitions:** 120ms for colour, 80ms for translate, 150ms for shadow. No "bouncy" easing — always default ease / ease-out.

### 1.9 Empty states

```css
.empty {
  padding: 32px; text-align: center; color: var(--text-muted);
  border: 1px dashed var(--border-soft);   /* dashed, not solid */
  border-radius: 12px; background: #fff;
}
```

For "rich" empty states (e.g. Backgrounds Library), wrap with `.bg-empty-state`: same dashed border on `--bg-page` fill, optional 32px brand-blue icon at 0.7 opacity, then a 16/600 title + 13 muted sub (max 420px wide).

### 1.10 Auth screen pattern

The login screen is the moodboard for the whole product:

```css
.auth-shell {
  background:
    radial-gradient(circle at 20% 30%, rgba(0,112,252,.10), transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(14,0,113,.10), transparent 55%),
    var(--bg-page);
}
```

Two soft radial gradients (top-left blue, bottom-right indigo) blooming through the pale-blue page background. The auth card is 420px max, radius 16, with an outsized shadow `0 20px 50px rgba(0,0,0,.10)`. Wordmark sits on an indigo chip because the asset is white-on-dark.

> **For the prototyping team:** if you copy one detail for marketing/auth surfaces, copy this background. This is the only place gradients appear in the UI.

### 1.11 Studio composer pattern (multi-step builder)

Use this for **every multi-step builder** — Spotlight Admin's brand onboarding wizard, Brand product's onboarding, Partner product's 6-screen onboarding, and the Creative AI composer.

- **Grid split:** `minmax(0,1fr)` content + `minmax(260px, 340px)` live preview, sticky on the right.
- **Hero collapse:** when nothing is picked yet, hide the preview column and let the picker take full width — `.studio-layout-hero` switches to `grid-template-columns: 1fr`.
- **Numbered steps:** each step is its own `.sp-card`. Step header has a `.studio-step-num` (24×24 blue circle, white digit) + 15/600 title + right-aligned summary chip in pale blue.
- **Context chip:** once step 1 is done, replace it with a compact summary chip (`.studio-context-chip` — 56×56 thumb + label + value) so the user can re-edit without re-expanding the section.
- **Tile grids:** `repeat(auto-fill, minmax(120px, 1fr))` for picker tiles, 10px gap, `aspect-ratio: 4/3`, **outline (not border) for selection** so layout doesn't shift.

### 1.12 Data-rich list pattern

Use this for **every list with metadata + actions** — Brands list, Package catalog, Add-on catalog, Templates, Backgrounds library, Partners list, Campaigns list, Leads list, Library of saved creatives, Invoices.

- **Stats banner** at the top: row of `.bg-stat` cards — number in JetBrains Mono 22/600, label uppercase 11px muted. Optional semantic accent (`.good` green, `.warn` yellow, `.pending` blue).
- **Toolbar:** search input (left, `flex: 1`, `max-width: 360px`) + filter chips (right, with count badges).
- **Grid:** `repeat(auto-fill, minmax(380px, 1fr))` of `.bg-library-card` (pale-blue fill `--bg-page`, 0.5px border, 14px padding). Hover lifts `translateY(-1px)` + soft shadow.
- **Thumb row inside card** (when applicable): 1:1:1 grid of three aspect-ratio thumbs (square / 1200×628 landscape / 4:5 portrait). Missing thumb shows striped pattern with dashed border.

### 1.13 Microcopy & voice

Patterns to copy across every product:

- **Section titles include the step number** with a middle dot, never a colon: "1 · Creative Details", "2 · Background".
- **Help text explains the why:** "Auto-generated from type, product, event, and validity. System-managed for uniqueness." — not just "title is required".
- **Empty states address the user directly and name the next action:** "Compose a creative in Creative AI, hit Save to Library, and it'll appear here."
- **Errors are blamed on the system, not the user:** "Couldn't connect — check your network and retry." not "You entered an invalid value."
- **Confirmation toasts are terse:** "Background uploaded", "Invite sent". No exclamation marks.

### 1.14 Don'ts (anti-patterns to keep out)

- ❌ Hard 1px black borders. Always 0.5px `var(--border-soft)`.
- ❌ Drop shadows on inputs/buttons. Only cards/modals/drawers get shadow.
- ❌ Rounded corners > 16px on functional components.
- ❌ Mixing icon styles. Stick to the 1.5-stroke line set.
- ❌ Colours outside the seven semantic tokens. Don't pick a "nice teal" for a new state.
- ❌ Title case on `.section-label`, `.field-label`, `.pill`, `.side-group-label`. They are UPPERCASE + tracking **without exception**.
- ❌ Filled, multi-stop gradients in the UI chrome. The only gradients in the app are the auth-page radials and the download progress bar.

### 1.15 Fonts to load

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Barlow:wght@600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
```

---

# PART II — THE THREE PRODUCTS

## 2. Product One — Spotlight Admin (Internal)

### 2.1 Purpose

Spotlight Admin is the **internal-only** product the ops team uses to:
1. Onboard a brand end-to-end (assisted, not self-serve).
2. Configure commercials — who pays, packages, add-ons, freemium, discounts.
3. Set up campaigns in bulk on behalf of the brand.
4. Curate the Creative AI **backgrounds library** that every brand+dealer downstream consumes.

> **Today:** no Brand Admin or Partner Admin self-serve. Everything happens from **Spotlight Admin view**. Onboarding is **fully assisted**. Future intent is brand self-serve, but it's not built.

### 2.2 Roles inside Spotlight Admin

- **Spotlight Admin** — full access.
- **Spotlight Dealer** — internal ops support, scoped down.

No Brand Admin role yet.

### 2.3 Top-level navigation (four surfaces)

| Surface | What it does | Edit cadence |
|---|---|---|
| **Brands** | Daily ops — onboard new brands, edit existing brand configs | Daily |
| **Templates** | Reusable section configs that brands pick from during onboarding | Weekly–monthly |
| **Package catalog** | Master menu of all packages and what they include | Rare |
| **Add-on catalog** | Master menu of all add-ons, pricing models, pack denominations | Rare |

### 2.4 Flow A — Brand Onboarding (the demo flow)

Two sections: **Brand Setup**, then **Commercial Setup**. Source: master config Part II.

#### Pre-setup requirements (so the demo doesn't look empty)
- Pre-create **7–8 packages** in the Package catalog (min 4–5).
- Pre-load **≥1 deal** and **≥1 add-on** in the Add-on catalog.
- Confirm relevant templates exist (brand-setup, packages, etc.).

#### Step 1 — Brand Setup *(direct form — no template selector)*

Captured fields, grouped:
- **Brand identity** — legal name, brand short name, industry/vertical, website, registered address, logo, favicon.
- **Social & web presence** — Facebook, Instagram, YouTube, Twitter/X, LinkedIn, Meta Brand Page ID.
- **Compliance & legal** — GST, PAN, T&C URL, Privacy URL, **dealer agreement upload**, contract doc upload, contract start date.
- **Commercial & media** — media money type (Prepaid / Postpaid / Credit), intended media platforms (Google · Meta · WhatsApp CTWA), daily max budget.
- **Operational setup** — expected go-live date, expected number of locations, location type label, states of operation.
- **Brand-side POC** — name, email, phone.
- **Associated agencies / channel partners** — repeatable block; search existing or create new; role, commission %, credit-line permission, primary-for-billing toggle.

Demo talking point: *"we came in, we onboarded the brand, added its details, captured the basic deal."*

#### Step 2 — Commercials Setup *(template-based)*

- **Who pays?** Subscription payer pills: **Brand** | **Partner**.
  - In the demo, **click "Partner pays"** — typical/expected path.
  - **Co-op as a third option:** ideally shown alongside Brand and Partner, but the internal decision is not finalised (pre-payment vs post-payment, posting logic). **Keep Co-op out of the UI for now** — call it out verbally instead.
- **Network type** — Central / Partner.
- **Wallet mode** — depends on `media_funding`:
  - Partner-funded → PO · Prepaid · Partner credit line.
  - Brand or hybrid → PO · Prepaid · Agency credit line · Brand credit line.
- **Media funding** — Brand / Partner / Hybrid.
- **Media billing cadence** — single-select if brand-funded, multi-select if partner-funded.
- **Velocity type** — None / Retail Boost / Demand Gen.
- **AI add-ons allowed**, **Grace period** (toggle + days + access), **Credit card required**.

#### Step 3 — Configure packages

Per enabled package: inclusions multi-select (pre-checked, deselect to remove), Free AI tokens toggle + count, pricing matrix M/Q/H/Y, cadence discounts (Q/H/Y %).

#### Step 4 — Freemium *(template-based, optional)*

Pick freemium-eligible packages, composite gate mode (ANY / ALL), gate thresholds (qualified leads, site visits, qualified calls, media spend, duration), caps, on-expiry behaviour (convert vs cancel + who gets prompted).

#### Step 5 — Add-ons

AI master toggle + cost per token + token pack denominations (Pack 100/500/2000/Custom). Per-AI-add-on enable toggles. Other add-ons (CTWA flat, WhatsApp Conversation per-unit) — enable toggle + currency pack selection.

#### Step 6 — Discount codes *(template-based, optional)*

Code, % or flat, validity window, max uses per partner, invoice display rules.

#### Revenue view
Read-only roll-up across packages × cadences × add-ons × discounts for this brand.

#### Media planning view
Surfaces media setup (platforms, daily budget, wallet mode, billing cadence) and lets ops adjust across the partner network.

### 2.5 Flow B — Bulk Campaign Setup

Push campaigns out across the partner network in one shot. Structure mirrors per-partner launch but with:
- Multi-partner selection (CSV or filter by region / package / status).
- Template campaign creative pulled from the brand's Creative AI template.
- Budget split applied using the brand's co-op rules.
- Schedule (start, end, paused-start).

> This screen-set is **not yet specified in any source doc** — flagged in Open Items.

### 2.6 Flow C — Spotlight's Creative AI Surface (Backgrounds)

Source: `CREATIVE_AI_USER_FLOWS` §2.

Spotlight is **upstream of everything** in the creative pipeline — they curate the background library that brands consume and dealers compose against.

**Sidebar nav (Spotlight in Creative AI mode):**
```
• Backgrounds            ← the only page
```

**Default landing:** `/studio-backgrounds`.

**Step-by-step:**
1. Sign in → land on Backgrounds.
2. See the library — stats banner (total / image-based / gradient / pending), search bar, filter chips by theme tag, grid of background cards (each shows three aspect-ratio thumbs: square, 1200×628, 4:5 portrait).
3. **Upload a new background** (Write access only) — modal: upload image → pick label (existing or new) → add tag chips → save (`POST /api/backgrounds`, gated by `requireSpotlight`).
4. Filter / search to verify, edit, or delete entries.

**Hard rules:**
- Spotlight cannot see Products, Templates, the composer, or the dealer Library.
- Backgrounds API is `requireSpotlight`-only.

### 2.7 Sidebar composite (Spotlight Admin)

```
Brands           ← daily onboarding & edits
Templates        ← reusable wizard configs
Package catalog
Add-on catalog
─────────────────
Creative AI      ← Backgrounds page only
```

### 2.8 Design-pattern map (Spotlight Admin)

| Screen | Pattern from §1 | Notes |
|---|---|---|
| Login | §1.10 Auth shell | Radial gradients on `--bg-page`, indigo wordmark chip |
| App shell | §1.5 Layout primitives | 220px indigo sidebar + topbar + content |
| Brands list | §1.12 Data-rich list | Stats banner + toolbar + grid of brand cards |
| Brand onboarding wizard (Steps 1–6) | §1.11 Studio composer | Numbered `.sp-card` per step, right-rail summary, blue step circles |
| Step 1 — direct form | Page anatomy + §1.6 Forms | Field labels UPPERCASE, file-upload chips for dealer agreement & contract doc |
| Step 2 — pills/toggles | §1.6 Forms (filter-tab pattern for pill groups) | "Who pays?" = pill group, Brand visible, Partner active |
| Step 3 — package matrix | Table-as-card | `.sp-table` inside `.sp-card`, numeric cells in JetBrains Mono |
| Step 4 — freemium gates | Numbered card with toggles | Composite mode = ANY/ALL pill group |
| Step 5 — add-ons | Per-add-on `.sp-card` panels | Each panel collapses when disabled |
| Step 6 — discount code | Form card | Code field is mono, auto-uppercased |
| Revenue view | §1.12 Data-rich list + stats banner | Numeric stats in JetBrains Mono |
| Media planning | §1.12 Data-rich list | Stats banner + filter chips + partners table |
| Package catalog | §1.12 Data-rich list | Card grid with version badge |
| Add-on catalog | §1.12 Data-rich list | Card grid with pricing-model badge |
| Templates library | §1.12 Data-rich list | Used-by count, `View →` opens drawer |
| Backgrounds library | §1.12 Data-rich list (exemplar) | Three-thumb row inside each card |
| Upload background modal | §1.6 Modals | Image preview + label dropdown + chip input for tags |

---

## 3. Product Two — Partner Product (Bolt)

### 3.1 Purpose

What a **local dealer / franchisee / store owner** uses after the brand invites them. Takes them from "you've been invited" to "campaigns are live" in ~10 minutes, then drops them into a 3-layer modular dashboard.

Sources: `Magicpatter_partner_bangkok_demo` for onboarding & dashboard; `spotlight-master-config-spec` Part V for subscription marketplace; Part VII for trial activation.

### 3.2 Persona

- **Audience:** local partners invited by a parent brand to run hyper-local lead-gen campaigns.
- **Demo persona:** Rohan @ Shree Hyundai — Andheri West, Mumbai. Vertical: Auto. Co-op: 60% brand / 40% partner. Freemium threshold: 15 leads.

### 3.3 Architecture in one line

A 6-screen onboarding (driven by an invite token from the brand) hands the partner into a 3-layer modular dashboard (Network / Velocity / Intent).

> **Visual reset:** the source demo PDF describes a beam-gold → void-purple "agent orb" aesthetic. Under the Spotlight design system (§1), the agent presence is reduced to:
> - A static brand-blue avatar circle as the topbar trigger.
> - A slide-in drawer (§1.6 Drawers) with the conversation thread inside.
> - Recommendation chips using the §1.6 AI-chip pattern (page-bg fill, dashed-blue accent).
> - No gradient or animation beyond the standard 80–150ms transitions.
> The conversational *content* (streamed greetings, recommendation chips) stays; the visual treatment changes.

### 3.4 Flow A — Partner Onboarding (6 screens)

| # | Screen | Goal | Key sections |
|---|---|---|---|
| 1 | **Landing** | Open the conversation; confirm invite | Streamed greeting addressing partner by name, invite card (brand logo, outlet name, locality, offer, co-op % if applicable), trust badges ("verified by brand", "secure", "~2 min to launch"), "Start setup" CTA |
| 2 | **Mobile OTP** | Identity verification | Masked pre-filled mobile, country code, 6-digit OTP entry, resend timer; auto-advance on complete |
| 3 | **WhatsApp Connect** | Lock the channel for leads, alerts, daily summaries, budget warnings | Why-it-matters card (24×7 lead alerts, low-balance pings), "Connect WhatsApp" CTA, confirmation chip |
| 4 | **Campaign Preview** | Show the *pre-built* campaign the brand + agent already prepared | "Pulled your outlet info from Hyundai", creative carousel (3 variants), sponsored chip, map mock with radius targeting, monthly budget + expected leads, VMN tracking number row, "Looks good" CTA |
| 5 | **Subscription / Tier** | Choose how the partner wants to run | Freemium card + Premium card + payment sheet (see §3.5) |
| 6 | **Launch** | Closing moment | Working state → "Campaigns are live" checkmark → summary tiles (campaigns activated, expected first-lead window, VMN provisioned) → "Open dashboard" CTA |

### 3.5 Flow B — Package Selection, Dealer Agreement & Payment

The commercial commitment moment. Two surfaces overlap — the partner-onboarding Screen 5 *and* the **Partner Subscription View** (master config Part V) which is the persistent marketplace any partner can return to.

#### Subscription marketplace (Part V)
Two-section page:
1. **Header strip** — partner name, brand they belong to, current subscription status (None / Trialing / Active / Expired), location count, wallet balance summary.
2. **Subscription marketplace** — grid of available packages.

#### Package card composition
- Highlight badge (e.g. "Most Popular").
- Package name + tagline.
- **Pricing block** — cadence toggle (M / Q / H / Y), base monthly equivalent, cadence discount, effective billed amount, any active discount code applied.
- **Inclusions** grouped by category (Campaigns / AI / Locations / Service).
- **Default-on add-ons** with consumption rates.
- **Eligible add-ons** the partner can attach.
- **Pack picker** if add-ons require token/currency packs.
- **CTAs:** "Subscribe" primary, "Try free" secondary (only if freemium-eligible and partner hasn't used a trial), "Talk to sales" for sales-led packages.

#### Dealer agreement
The dealer agreement uploaded by ops in Step 1.3 is surfaced here as a link in the checkout flow. The Trial Activation Modal (Part VII) includes a confirmation checklist:
- ☐ "I understand the trial expiry conditions above"
- ☐ "I agree to {brand}'s Terms & Conditions"
- ☐ "I agree to be billed automatically at expiry" *(if `default_action === 'convert'`)*

#### Payment
A modal/sheet (use §1.6 Modals pattern):
- Itemised total (subscription + add-ons + suggested wallet recharge).
- Payment methods — UPI / Card / Net Banking.
- Toggles — auto-refill, WhatsApp low-balance pings.
- **Co-op row** if brand contributes (e.g. "Hyundai 60% / You 40%").

Freemium: no subscription charge, just wallet recharge (e.g. ₹5,000 for ~250 leads).
Premium: subscription + add-on + suggested wallet (e.g. ₹4,999/mo + Intent ₹799/mo + ₹25,000 wallet).

### 3.6 Flow C — Wait for Activation → Dashboard

After payment, Screen 6 shows the working state → "Campaigns are live" → summary tiles → "Open dashboard".

The dashboard is built on a **3-layer activation model** controlling module visibility:

| Layer | Modules | When active |
|---|---|---|
| 🌐 **Network** *(infrastructure)* | Home · Wallet · Setup · Reports · Invoices · Notifications | Always on |
| 🚀 **Velocity** *(outbound)* | Studio · Campaigns · Landing Page | Unlocked when partner picks a tier |
| 🎯 **Intent** *(inbound)* | Leads · Voice Agent · Nurture | Unlocked separately (preview or full) |

**Shell:**
- **Desktop** — Topbar (brand × Spotlight, search, agent toggle, new campaign, notifications, profile) + left sidebar (grouped by layer eyebrows) + main content + right Agent panel drawer (closed by default).
- **Mobile** — Topbar + content + bottom tab bar + agent FAB → bottom-sheet chat.

**Modules:**
- 🏠 **Home** — agent briefing card, KPIs (Network Balance, Active Campaigns, Leads/mo, CPL, Conversion), live campaigns grid (if Velocity active), network-only fallback CTA.
- 📥 **Leads (Intent)** — filters (All / Hot / Warm / Cold / Missed / Unattended 24h+), lead cards with score, source pill, agent recommendation block (blurred behind PRO lock after 3 leads in freemium), Call + WhatsApp + overflow buttons, lead detail drawer.
- 📣 **Campaigns (Velocity)** — active and paused campaigns, performance per campaign (CPL, leads, spent), edit/pause/boost, agent recommendation chips at top.
- 🎤 **Voice Agent (Intent)** — header KPIs, active agent card, filter row, call cards with summary + recommendation (blurred for non-PRO calls beyond first 3), call detail drawer with waveform/transcript.
- 🎨 **Creative Studio (Velocity)** — see §3.7 below.
- 💰 Wallet, 📊 Reports, 🧾 Invoices, 🔔 Notifications, ⚙️ Setup — Network baseline modules.

### 3.7 Flow D — Partner / Dealer Creative AI Surface

Source: `CREATIVE_AI_USER_FLOWS` §3B (Dealer flow).

**Sidebar nav (Dealer in Creative AI mode):**
```
• Creative AI            ← the composer
• Library                ← personal saves
```

**Default landing:** `/studio-library`.

**The composer (`/studio`)** is the 6-step linear flow that's the *literal exemplar* of the §1.11 Studio Composer pattern.

```
HERO  → "Which model are you composing today?"
   1. Pick variant       (variant tiles per trim/colour)
   2. Pick background    (compact picker, tabs by curated label)
   3. Pick language      (10-language strip: English + Hindi,
                          Gujarati, Marathi, Bengali, Tamil,
                          Kannada, Telugu, Malayalam, Punjabi)
   4. Pick offer         (optional; % off / ₹ off / EMI /
                          down payment — localised per Step 3)
   5. Compose tagline    (pick from brand-approved tagline pool)
   6. Aspect ratios      (Square 1:1, Landscape 1200×628, Portrait 4:5)
      → Save to Library  → persists state_json
      → Download         → server renders PNG/SVG per aspect,
                          zips, fires /api/downloads audit log
```

**Library:** personal grid of saved compositions, dealer-scoped only. Click any card → reopens in the composer.

**Hard rules:** dealer cannot edit Product Master, Brand Template, or Backgrounds — only *picks* from the menu above them.

### 3.8 Design-pattern map (Partner Product)

| Screen | Pattern from §1 | Notes |
|---|---|---|
| Onboarding shell | §1.10 Auth-style shell | Use the radial-gradient page background for screens 1–6; centered card max-width 480px on desktop, full-width on mobile |
| Screen 1 — Landing | Page anatomy + §1.6 Cards | Streamed text inside `.sp-card`, invite card uses pale-blue `--bg-page` inner panel |
| Screen 2 — OTP | §1.6 Forms | 6 mono-spaced inputs in JetBrains Mono, focus ring per §1.8 |
| Screen 3 — WhatsApp Connect | Page anatomy + 1 primary CTA | Why-it-matters card uses `.sp-card`; success chip uses `.pill-done` |
| Screen 4 — Campaign Preview | §1.11 Studio composer (single-step variant) | Creative carousel = horizontal-scroll tile grid; map = right-rail sticky preview |
| Screen 5 — Subscription / Tier | §1.12 Data-rich list (small) + §1.6 Modal | Two package cards side-by-side; "Pay" opens payment modal |
| Payment modal | §1.6 Modals (`.lg = 640px`) | Itemised total in JetBrains Mono, payment-method tabs use `.filter-tabs` |
| Screen 6 — Launch | Page anatomy | Big checkmark icon (line-stroke, brand-blue), summary tiles in stats-banner style |
| Partner dashboard shell | §1.5 App shell | 220px indigo sidebar grouped by layer eyebrows (`.side-group-label` UPPERCASE) |
| Home module | §1.12 Data-rich list + stats banner | KPI tiles up top, campaigns grid below |
| Leads module | §1.12 Data-rich list + §1.6 Drawer | Filter tabs at top, lead card grid, detail opens drawer |
| Campaigns module | §1.12 Data-rich list | Cards show sparkline (line-stroke, brand-blue) |
| Voice Agent module | §1.12 Data-rich list + §1.6 Drawer | Call detail drawer with waveform (line stroke) |
| Creative Studio (Library) | §1.12 Data-rich list | Three-thumb row per card |
| Creative Studio (Composer) | §1.11 Studio composer (exemplar) | Numbered steps, sticky right-rail preview, hero collapse on Step 0 |
| Subscription marketplace | §1.12 Data-rich list | Header strip + package cards grid; pricing block uses JetBrains Mono |
| Trial Activation modal | §1.6 Modals | Confirmation checkboxes, link to brand T&Cs |
| Wallet / Invoices / Reports | §1.12 Data-rich list + `.sp-table` | Numeric cells in JetBrains Mono |
| Notifications inbox | §1.12 Data-rich list | Filter tabs by type, mark-read action |
| Agent panel (right drawer) | §1.6 Drawers | 400px width on desktop; suggestion chips per §1.6 AI chips |

---

## 4. Product Three — Brand Product

### 4.1 Purpose

What a **brand HQ POC** uses. Three jobs:
1. Configure brand DNA — identity, locations, intent, operating model.
2. Surface insights — performance, partner activation, co-op spend.
3. Control creatives at the brand level.

Sources: `Magicpatter_brand_bangkok_demo` for onboarding & platform modules; `spotlight-master-config-spec` Part VI for subscription view; `CREATIVE_AI_USER_FLOWS` §3A for brand creative.

> **Visual reset (same as partner):** ignore the void-purple/orb aesthetic and Playfair Display references in the source demo PDF. The brand product uses the Spotlight design system from §1. The "Spotlight Agent" presence becomes the right-side drawer with a brand-blue static avatar.

### 4.2 Architecture

State machine: **onboarding flow → authenticated platform shell**. Platform shell wraps a persistent Sidebar, TopBar, and switchable module area. `AgentChatPanel` slides in from the right.

### 4.3 Flow A — Brand Onboarding (6 screens with 4a branching)

| # | Screen | Purpose |
|---|---|---|
| 1 | **URL Input** | Prepopulated URL (LumenMotors.com); agent scrapes web presence to seed everything |
| 2 | **Brand Identity** | Agent presents discovered logo, palette, voice, category, tagline — all editable; confidence indicators per field |
| 3 | **Locations** | Map + list view; bulk import via CSV or partner-network detection |
| 4 | **Intent** | Brand picks primary commercial intent: leads / footfall / awareness / sales |
| 4a | **Operating Model** | Branches the experience — Company-owned / Franchise / Hybrid → routes to Screen 6 Franchise or Hybrid variants |
| 5 | **Setup** | Budget framing, partner invitation flow, autonomy level (Suggest / Approve / Auto) |
| 6 | **Launch** | Pre-launch summary — campaign cards, location count, projected reach, budget split → "Launch Campaign" CTA opens Payment Modal (Card / UPI / Net Banking, itemised total, "Pay Securely" → processing → confirmation → platform entry) |

### 4.4 Flow B — Platform Shell (post-onboarding)

**Sidebar** (persistent left rail) shows **all three products** (Network, Velocity, Intent) regardless of activation — inactive products show as locked / upsell. Each product expands to reveal its modules. **Autonomy toggle** at the bottom shows current mode ("Suggest mode") with upgrade CTA to unlock Approve / Auto (key monetisation surface).

**TopBar** — brand identity, global search, notifications, profile, Spotlight Agent drawer trigger.

**Agent layer** — `AgentChatPanel` (slide-in drawer), `AgentNarrationTicker` (passive narration strip — implement as a 1-line muted pill row at the top of the content), `AgentActivityLog`, `AgentSuggestionCard`, `AgentNotesPanel`.

### 4.5 Flow C — Brand Insights (modules)

#### 🏠 HomeModule
Daily operating dashboard.
- `LiveCampaignHero` — active campaign with live metrics.
- `PartnerActivationHero` / `HybridHero` — franchise/hybrid alternative.
- `QuickStatsRow` — top-line KPIs.
- `SetupProgressStrip` — checklist.
- `ProductHealthCards` — health per product.

#### 🌐 Network Product
- **NetworkModule** — location/partner graph, map + list with health scoring, filter by region/performance/status.
- **PartnersModule** — partner directory, activation status, last login, campaign participation, invitation flow.
- **CooptRulesModule** — co-op marketing rules: budget split brand vs partner, approval workflows, creative override permissions.

#### 🚀 Velocity Product
- **CampaignsModule** — lifecycle (Active / Scheduled / Draft / Ended), performance summary, launch new flow.
- **CreativeStudioModule** — see §4.6.
- **AnalyticsModule** — cross-campaign reporting, funnel views (impression → click → lead → conversion), partner leaderboards.
- **BillingModule** — budget allocation, invoices, payment methods, co-op spend reconciliation.

#### 🎯 Intent Product
- **LeadsModule** — captured leads, pipeline by partner/location, lead quality scoring, routing rules.
- **EngagementModule** — post-lead nurture, AI-assisted threads, engagement playbooks, handoff to partner CRM.

#### ⚙️ SettingsModule
Account, team, integrations, Brand DNA edits (loops back to Screen 2), autonomy level configuration.

### 4.6 Flow D — Brand-side Creative AI

Source: `CREATIVE_AI_USER_FLOWS` §3A + `CreativeStudioModule` from the brand demo doc.

**Sidebar nav (Brand in Creative AI mode):**
```
• Products               ← what dealers can compose against
• Backgrounds            ← consume Spotlight's library (read-only)
• Template               ← brand styling for ALL dealer creatives
• Creative AI (preview)  ← see the composer dealers will use
• Library                ← see what dealers have saved
```

**Brand admin's job:**
1. **Set up products** (`/studio-products`) — grid of vehicles; for each: name, category, variants (trim / colour), product images per variant per aspect ratio, **background-removed transparent version**.
2. **Configure brand template** (`/studio-template`) — logos, palette, typography, translate toggles, CTA labels per language, tagline copy pool. One active template per brand at a time.
3. **Browse backgrounds** (`/studio-backgrounds`) — read-only consumption from Spotlight's library.
4. **Preview composer** (`/studio`) — preview mode only, no save.
5. **Audit output** (`/studio-library`) — see dealer saves.

> Brand admin's job: **load the gun**. They never pull the trigger themselves.

### 4.7 Flow E — Brand Subscription View

Source: master config Part VI.

Two display modes:

**Mode A — Single-subscription brand (most brands):**
- Header card: brand name, status, contract dates, total partners, total wallet float.
- "Your subscription stack" — read-only summary cards per enabled package with footer stat "X of Y partners on this package".

**Mode B — Multi-subscription brand (enterprise / multi-region):**
- Configuration switcher at top (tabs: "North India · Velocity-only", "South India · Full stack", etc.).
- Summary strip — total partners, total active subscriptions, breakdown.

**Per-configuration detail** — three tabs:
- **Packages** — read-only grid + subscriber count + avg LTV, "Edit at brand level" → wizard Step 3.
- **Add-ons** — matrix: rows = add-ons, columns = subscribers, revenue, avg tokens, packs sold; → Step 5.
- **Discounts** — active codes, validity, redemption count; → Step 6.

**Operations strip** at bottom: Pause network signups, Force-renew expiring subscriptions, Bulk-message partners.

### 4.8 Design-pattern map (Brand Product)

| Screen | Pattern from §1 | Notes |
|---|---|---|
| Onboarding Screens 1–6 | §1.11 Studio composer | Numbered steps as `.sp-card`; right-rail preview when applicable (Locations map, brand identity palette) |
| Screen 1 — URL input | Auth-style hero | Use radial-gradient `--bg-page` background; large input, single CTA |
| Screen 2 — Brand identity | Studio composer + confidence chips | Confidence indicators use `.pill-pending` ("Agent inferred") → `.pill-done` ("Brand confirmed") |
| Screen 3 — Locations | Studio composer + map | Leaflet map in right rail; list in left card with `.sp-table` rows |
| Screen 4 — Intent | Numbered card with pill selector | Filter-tab pill group for intent choice |
| Screen 4a — Operating model | Numbered card with tile selector | Three large tiles (Company-owned / Franchise / Hybrid), outline-on-select |
| Screen 5 — Setup | Numbered card with form fields | Autonomy level = pill group |
| Screen 6 — Launch | Stats banner + payment modal | Summary tiles in JetBrains Mono; Launch Campaign opens payment modal |
| App shell | §1.5 Layout primitives | 220px indigo sidebar, all three product groups visible with locked states |
| Home module | §1.12 Data-rich list | Hero card + stats row + campaigns grid |
| Network module | §1.12 Data-rich list + map split | Map in right pane, list in left |
| Partners module | §1.12 Data-rich list + `.sp-table` | Open partner detail in drawer |
| Co-op rules module | Numbered `.sp-card` editor | Each rule a card with toggles |
| Campaigns module | §1.12 Data-rich list | Active/Scheduled/Draft/Ended filter tabs |
| Creative Studio (Visual / Text) | §1.12 Data-rich list with two top tabs | Top tabs = `.filter-tabs`, body = data-rich list |
| Text Creatives editor | §1.6 Drawer (split-screen builder) | Open detail drawer with `ComponentEditor` on left, live preview on right |
| Analytics module | Stats banner + chart cards | Charts use brand-blue strokes only, no gradients |
| Billing module | §1.12 Data-rich list + `.sp-table` | Invoice rows, co-op reconciliation in mono |
| Leads module (brand-level) | §1.12 Data-rich list + drawer | Pipeline view with filter tabs |
| Engagement module | Conversation threads list + drawer | Drawer opens thread detail |
| Settings module | Tabbed `.sp-card` | Sidebar of sections inside the page |
| Brand subscription view (Mode A) | §1.12 Data-rich list | Read-only cards |
| Brand subscription view (Mode B) | §1.12 Data-rich list + top tabs | Configuration switcher at top |
| Edit-config jump links | Inline `.btn-outline-xs` | Routes back into Spotlight Admin wizard step in edit mode |

---

## 5. Creative AI — Cross-Product Summary

One creative pipeline, three roles. Dependency is **one-way**:

```
 ┌───────────────┐                ┌──────────────────────┐
 │   SPOTLIGHT   │ ──uploads──▶   │  BACKGROUND LIBRARY  │
 │     team      │                │  (image_url + label  │
 └───────────────┘                │   + tags + aspects)  │
                                  └──────────┬───────────┘
                                             │ consumed by
                                             ▼
 ┌───────────────┐                ┌──────────────────────┐
 │ BRAND ADMIN   │ ──configures─▶ │  PRODUCT MASTER +    │
 │               │                │   BRAND TEMPLATE     │
 └───────────────┘                └──────────┬───────────┘
                                             │ feeds composer
                                             ▼
 ┌───────────────┐                ┌──────────────────────┐
 │    DEALER     │ ──composes──▶  │   /studio (6 steps)  │
 │               │                │  Output: PNG/SVG     │
 └───────────────┘                │  per aspect ratio    │
                                  └──────────┬───────────┘
                                             │ saves
                                             ▼
                                  ┌──────────────────────┐
                                  │  DEALER LIBRARY      │
                                  │  (state_json blob)   │
                                  └──────────────────────┘
```

### Capability matrix

| Capability | Spotlight | Brand admin | Dealer |
|---|:-:|:-:|:-:|
| Upload backgrounds | ✓ | — | — |
| View background library | ✓ | ✓ (read-only) | (sees them in composer) |
| Edit Product Master | — | ✓ | — |
| Configure Brand Template | — | ✓ | — |
| Preview composer | — | ✓ (preview only) | ✓ |
| Save creative to Library | — | — | ✓ |
| Download creative | — | — | ✓ |
| Switch product surface | ✓ | ✓ | ✓ |

---

# PART III — HANDOFF MATERIAL

## 6. Screen Inventory for Prototyping

A flat list of every screen to prototype, with its design pattern reference. Use this as the prototyping tool's task list.

### 6.1 Spotlight Admin
1. Login (§1.10 Auth shell)
2. Brands list (§1.12 Data-rich list)
3. Brand onboarding wizard — entry / shell (§1.11 Studio composer)
4. Step 1 — Brand setup direct form
5. Step 2 — Commercials setup
6. Step 3 — Packages config
7. Step 4 — Freemium config
8. Step 5 — Add-ons config
9. Step 6 — Discount codes config
10. Revenue view (§1.12 Data-rich list)
11. Media planning view (§1.12 Data-rich list)
12. Bulk campaign setup — entry / shell *(new flow, see Open Items)*
13. Bulk campaign setup — partner selection
14. Bulk campaign setup — creative + budget
15. Bulk campaign setup — review & schedule
16. Templates library (§1.12 Data-rich list)
17. Template preview drawer (§1.6 Drawers)
18. Package catalog list (§1.12 Data-rich list)
19. Package catalog detail / edit modal
20. Add-on catalog list (§1.12 Data-rich list)
21. Add-on catalog detail / edit modal
22. Backgrounds library (§1.12 Data-rich list)
23. Upload background modal (§1.6 Modals)

### 6.2 Partner Product
1. Onboarding Screen 1 — Landing
2. Onboarding Screen 2 — Mobile OTP
3. Onboarding Screen 3 — WhatsApp Connect
4. Onboarding Screen 4 — Campaign Preview
5. Onboarding Screen 5 — Subscription / Tier (with package cards)
6. Payment modal (§1.6 Modals `.lg`)
7. Onboarding Screen 6 — Launch / success
8. Dashboard — Home module
9. Wallet module
10. Setup module
11. Reports module
12. Invoices module
13. Notifications module
14. Campaigns module list
15. Campaign detail drawer
16. Creative Studio — Library (saved creatives)
17. Creative Studio — Composer (6-step) — exemplar of §1.11
18. Composer save-to-library / download modal
19. Landing Page module
20. Leads module list
21. Lead detail drawer
22. Voice Agent module list
23. Call detail drawer
24. Nurture module
25. Subscription marketplace (persistent, not just onboarding)
26. Trial Activation modal (§1.6 Modals)
27. Agent panel drawer

### 6.3 Brand Product
1. Onboarding Screen 1 — URL input (auth-style hero)
2. Onboarding Screen 2 — Brand Identity
3. Onboarding Screen 3 — Locations
4. Onboarding Screen 4 — Intent
5. Onboarding Screen 4a — Operating Model
6. Onboarding Screen 5 — Setup
7. Onboarding Screen 6 — Launch + payment modal
8. Home module
9. Network module (map + list)
10. Partners module list
11. Partner detail drawer
12. Co-op Rules module editor
13. Campaigns module list
14. Campaign launch flow
15. Creative Studio — Visual Creatives tab
16. Creative Studio — Text Creatives tab (with split-screen editor drawer)
17. Analytics module (funnel + leaderboards)
18. Billing module
19. Leads module
20. Engagement module (thread list + thread drawer)
21. Settings module
22. Creative AI — Products page
23. Creative AI — Backgrounds (read-only)
24. Creative AI — Template editor
25. Creative AI — Composer preview
26. Creative AI — Library audit view
27. Brand Subscription view — Mode A
28. Brand Subscription view — Mode B (with config switcher)

**Total: ~78 screens across the three products.**

## 7. Where Each Flow Comes From (source map)

| Flow | Lives in | Source doc |
|---|---|---|
| Brand onboarding wizard (6 steps) | Spotlight Admin | `spotlight-master-config-spec` Part II |
| Commercial setup | Spotlight Admin | `spotlight-master-config-spec` Parts II–IV |
| Revenue & media planning views | Spotlight Admin | `spotlight-master-config-spec` (derived) |
| Bulk campaign setup | Spotlight Admin | New flow — see Open Items |
| Backgrounds curation | Spotlight Admin → Creative AI | `CREATIVE_AI_USER_FLOWS` §2 |
| Partner onboarding (6 screens) | Partner Product | `Magicpatter_partner_bangkok_demo` §3 |
| Partner subscription marketplace + package card | Partner Product | `spotlight-master-config-spec` Part V |
| Trial activation + freemium gating | Partner Product | `spotlight-master-config-spec` Part VII |
| Partner dashboard (3-layer activation) | Partner Product | `Magicpatter_partner_bangkok_demo` §4–§5 |
| Dealer composer (Creative AI 6-step) | Partner Product → Creative AI | `CREATIVE_AI_USER_FLOWS` §3B |
| Brand onboarding (6 screens) | Brand Product | `Magicpatter_brand_bangkok_demo` §3 |
| Brand platform modules | Brand Product | `Magicpatter_brand_bangkok_demo` §5 |
| Brand subscription view | Brand Product | `spotlight-master-config-spec` Part VI |
| Brand product master + template | Brand Product → Creative AI | `CREATIVE_AI_USER_FLOWS` §3A |
| Visual language (all of the above) | All three products | `Spotlight_Design_Guidelines` |

## 8. Open Items to Resolve Before / During Prototyping

1. **Co-op payment** — third option in "who pays?" (Brand / Partner / Co-op). Logic not finalised (pre-payment vs post-payment, posting mechanics). **Decision for now: keep out of UI, mention verbally.**
2. **Brand Admin self-serve** — not yet a product. All onboarding is Spotlight Admin-assisted. Flag as a roadmap item.
3. **Bulk campaign setup UI** — defined here as a Spotlight Admin flow but the screens are not yet specified in any source doc. Needs its own design pass.
4. **Agent visual treatment without the orb** — the source demo PDFs lean heavily on an animated beam-gold → void-purple "agent orb". Under the Spotlight design system (§1), the agent presence is reduced to:
   - A static brand-blue avatar circle in the topbar trigger.
   - The slide-in drawer (§1.6) with conversation thread inside.
   - Recommendation chips using the §1.6 AI-chip pattern (page-bg fill, soft border, dashed-blue accent for `.btn-ai-outline` triggers).
   - No gradient, no animation beyond the standard 80–150ms transitions.
   - Confirm with stakeholders whether this is acceptable or whether a single "agent accent" colour should be added to the palette as a controlled exception.

---

*End of spec — ready for prototyping handoff.*
