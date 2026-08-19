# Landing Page Config — Auto mahindra (dev)

Source: `https://dev-app-admin.myspotlight.co/panel/landing-pages/config?id=69b0052897fcadc79a03626d`

Captured via authenticated browser session — the page is a Next.js SPA builder that
composes a dealer landing page from a tree of components, each with its own typed
config (toggles, colors, text, files). The page is a Mahindra dealer template named
`master-template` (Clientwise type, sub-template `default`), instance "Auto mahindra".

## 1. Top-level metadata

| Field | Value |
|---|---|
| Brand | Mahindra |
| Location | Auto mahindra |
| Template | master-template |
| Template type | Clientwise |
| Template name | default |
| Theme | mahindra |

Location options for this brand (other dealers using the same template):
Auto mahindra, Mahindra new, mahindra old, 241 SingleInterface, Golden Public School.

## 2. API surface (from network capture)

Base URL: `https://j4rpzbswyk.execute-api.ap-south-1.amazonaws.com/dev`

Endpoints observed:
- `GET /serviceadmin/v1/landing-page-configs/{id}` — returns full config (returned 503 during capture, but confirms the route shape).
- `GET /serviceadmin/v1/client-template-configs/landingpage-product-dropdown?cliententityid=2` — feeds the "Model Interested in" dropdown (Boler Neo, Scorpio N for this client).
- `GET /servicecore/v1/file/signed-url?key=...` — used to mint short-lived signed S3 URLs for hero banners and logos.

Assets live in `s3://spotlight-main-dev.s3.ap-south-1.amazonaws.com/` with these key prefixes:
- `<tenantId>/brand_mst_data/<uuid>.png` — brand-level master assets (logo).
- `<tenantId>/landing-page/cliententity/<n>/hero-banner/template/<templateId>/<uuid>.png` — hero banners scoped per template.

Captured tenantId on this URL: `0b49cf24-4a6f-4121-8d29-e58aa03e81fd`. Template id: `698461dde6c1a167e3995749`. Client entity id: `2`.

## 3. Component tree

Each top-level entry is an accordion in the Component Editor. Order in the editor is the order rendered on the page (top → bottom). `enabled` is a per-section toggle (most sections also have visibility flag for desktop/mobile).

```
theme
header
  ├ locationname
  ├ locationphone
  ├ textsubheading
  ├ logo
  └ backgroundcolor
hero (enabled, slidertime=4s)
  └ banners[] (1 item: "Banner 1")
form (enabled)
  ├ heading (title)
  ├ otp (toggle)
  ├ salutation, name, mobile, email, model, tnc, privacypolicy
  └ cta
locationdetail (enabled)
  └ detail
about
specifications (DISABLED, cardsinrow=4)
  ├ heading
  └ specs[] (1 item: "Specs 1")
tnc (sourcetype: locationwise)
privacypolicy (sourcetype: locationwise)
prefooter (DISABLED)
  ├ left
  └ right
footer1 (enabled)
  ├ left
  └ right
footer2 (enabled)
  ├ logo (size=13)
  ├ quickLinks (heading "Quick Links" → Privacypolicy, Tnc)
  └ social (heading "Social" → Facebook, Linkedin, Twitter, Instagram, Youtube)
mobile (mobile-only nav)
  ├ callusbtn
  └ getdirectionbtn
thankyoupage (DISABLED — preview shows it)
```

## 4. Per-component config

### 4.1 theme
- `theme`: `mahindra` (dropdown options observed: Acer, Ajmal, Lakme, Harley, Tata, Skoda, Mahindra, Mercedes, Kia)

### 4.2 header
- `backgroundcolor`: `#030303` (near-black bar at top)
- `color`: `#000000` (text on dark — actually rendered white via theme override)
- Sub-fields: locationname, locationphone, textsubheading ("Mahindra Authorized Dealer"), logo (image upload).
- Rendered: `mahindra<sup>Rise</sup>` logo on left; "Auto mahindra ✓  / Mahindra Authorized Dealer" on right.

Logo asset: `brand_mst_data/7e59f730-1c49-4858-97e3-30514b242a98.png` (210×69 PNG).

### 4.3 hero
- `enabled`: true
- `slidertime`: 4 (seconds per slide)
- `banners[0]`:
  - image: `hero-banner/template/698461dde6c1a167e3995749/23b61755-7f8f-4f1c-9dc9-4e1ed06f3a7e.png` (1366×500)
  - (second image referenced: `…/8c550ae5-511d-4c6c-b5d1-f60630ec8817.png` — likely mobile variant)
  - alt: "Slide 1"
- Rendered content: lineup of Mahindra Thar, BE 6, and pickup with overlay text "MAKING EXCEPTIONAL THE NEW NORM".

### 4.4 form
- `enabled`: true
- `type`: `onbanner` (overlays hero), `position`: `left`
- `heading.title`: "Schedule a Test Drive"
- `heading.color`: `#000000`
- `backgroundcolor`: `#ffffff` (white card)
- `otp`: toggle (currently on)
- Fields (each is a sub-toggle that can be on/off):
  - salutation, name, mobile (placeholder "Mobile*"), email, model (dropdown sourced from API — Boler Neo, Scorpio N), tnc, privacypolicy
- `cta.label`: "Book a Test Drive" (rendered as black pill button, full width)
- Privacy line: "I have read and agreed to the [Privacy Policy](/privacypolicy)"

### 4.5 locationdetail
- `enabled`: true
- `backgroundcolor`: `#ffffff`
- `headingcolor`: `#000000`
- `paracolor`: `#868686`
- Rendered: heading "Auto mahindra", line "443, Khandsa road, Panipat, Haryana, 122002".

### 4.6 about
- `backgroundcolor`: `#0e3a30` (dark green)
- `headingcolor`: `#f8f8f8`
- `paracolor`: `#ffffff`
- `heading`: "WELCOME TO {{l.name}}" (rendered: "WELCOME TO Auto mahindra")
- `description` (textarea, supports `{{variable}}` interpolation):

```
Your trusted Mahindra dealership located in {{l.a.line1}}, {{l.a.city}}, {{l.a.state}}

As an authorized Mahindra showroom, we bring you the latest SUVs like the XUV700,
Scorpio-N, Thar, Thar ROXX, Scorpio, Bolero, Bolero Neo and XUV 3XO, backed by
expert guidance and a seamless buying experience. Conveniently situated on the
{{l.name}}, {{l.a.city}}, {{l.a.state}}, {{l.a.pincode}}, we proudly serve
customers from across {{l.a.city}}  with end-to-end support—including personalized
car loan advice, easy finance options, vehicle registration assistance, and test
drives. Whether you're upgrading or buying your first car, visit {{l.name}}  for
the most reliable Mahindra dealership experience near {{l.a.line1}}, {{l.a.city}},
{{l.a.state}}, {{l.a.pincode}}.
```

Variable bindings (resolved from the selected location):
- `{{l.name}}` → location display name
- `{{l.a.line1}}` → address line 1
- `{{l.a.city}}` → city
- `{{l.a.state}}` → state
- `{{l.a.pincode}}` → postal code

### 4.7 specifications
- `enabled`: **false** (so this section is hidden in the rendered page)
- `cardsinrow`: 4
- `backgroundcolor`: `#ffffff`
- `headingcolor`: `#000000`
- `paracolor`: `#000000`
- `specs[0]`: "Specs 1" (single placeholder card)

### 4.8 tnc
- `enabled`: false
- `sourcetype`: `locationwise` (options: Brandwise / Locationwise)
- `showpreview`: toggle

### 4.9 privacypolicy
- `enabled`: false
- `sourcetype`: `locationwise`
- `showpreview`: toggle

### 4.10 prefooter
- `enabled`: false
- `backgroundcolor`: `#dd052b` (Mahindra red)
- `headingcolor`: `#ffffff`
- `paracolor`: `#ffffff`
- Two-column layout (`left`, `right`)

### 4.11 footer1
- `enabled`: true
- `backgroundcolor`: `#000000`
- `textcolor`: `#808080`
- Two-column layout (`left`, `right`)

### 4.12 footer2
- `enabled`: true
- `backgroundcolor`: `#000000`
- `headingcolor`: `#f8f8f8`
- `iconcolor`: `#ffffff`
- `logo`: dealer logo (same brand_mst_data PNG used in header), `size`: 13
- `quickLinks`:
  - heading: "Quick Links"
  - items: Privacypolicy → `/privacypolicy` ("Privacy Policy"), Tnc → `/tnc` ("Terms & Conditions")
- `social`:
  - heading: "Social"
  - Facebook: https://www.facebook.com/MahindraAutomotiveIndia/
  - Instagram: https://www.instagram.com/MahindraAutomotiveIndia//dealer_1
  - (Linkedin, Twitter, Youtube fields exist but no URL set in this instance)
- Below footer2: legal strip — "Copyright© 2025 Mahindra&Mahindra Ltd. All Rights Reserved" / "Powered by : SingleInterface"

### 4.13 mobile (mobile-only floating CTA bar)
- `callusbtn`: toggle (visible)
- `getdirectionbtn`: toggle (visible)

### 4.14 thankyoupage (post-submit screen)
- `enabled`: false (toggle), but preview-rendered:
  - heading: "Thank you for submitting your details"
  - subtitle: "To know more about Mahindra Automobiles, please visit our official website: www.mahindra.com/automotive"
  - image upload slot

## 5. Replication blueprint

To clone this for a demo:

1. **Layout shell** (top → bottom): fixed header bar (black) → hero banner with form overlay (left) → locationdetail strip → about (dark green) → footer1 (black, 2-col) → footer2 (black, logo + Quick Links + Social) → legal bar. Mobile gets an extra bottom CTA bar with Call / Get Directions.
2. **Theme tokens** to seed in CSS:
   - `--bg-header: #030303`
   - `--bg-card: #ffffff`
   - `--bg-about: #0e3a30`
   - `--bg-cta-strip: #dd052b`
   - `--bg-footer: #000000`
   - `--text-muted: #868686`
   - `--text-footer-muted: #808080`
   - `--text-on-dark: #f8f8f8`
3. **Sections to model as toggleable components**: theme, header, hero, form, locationdetail, about, specifications, tnc, privacypolicy, prefooter, footer1, footer2, mobile, thankyoupage. Each carries `enabled`, colors, and either content fields or a sub-list (banners, specs, footer columns).
4. **Variable interpolation**: support `{{l.name}}`, `{{l.a.line1}}`, `{{l.a.city}}`, `{{l.a.state}}`, `{{l.a.pincode}}` in any text field. Variables resolve from the selected location.
5. **External data**:
   - Hero banner images and dealer logo come from S3 with pre-signed GET URLs.
   - The "Model Interested in" dropdown is sourced from a separate API per `cliententityid` so dealers can't edit it.
   - Tnc / Privacy can be sourced brandwise (one for the whole brand) or locationwise (per dealer).
6. **Form behavior**: optional OTP step; form fields are individually toggleable (Salutation/Name/Mobile/Email/Model/Tnc/Privacy/CTA). Post-submit, swap canvas for the thankyoupage block.
7. **Devices**: page renders 3 device modes (desktop, tablet, mobile — toggle icons visible at top of preview).

## 6. Caveats / things I could not capture

- The `GET /landing-page-configs/69b0052897fcadc79a03626d` endpoint returned 503 during this capture, so I worked from the rendered DOM + editor inputs rather than the raw JSON payload. Some hidden defaults inside sub-accordions that weren't auto-expanded by the SPA are not in this doc.
- Image URLs include AWS signed query strings (`X-Amz-Signature`, expires in 30 min) — only the S3 object paths are persisted; the URLs themselves rotate on each load.
- A second hero image asset (`8c550ae5-…png`) was prefetched but not shown; likely the mobile-variant slot for Banner 1.
- The "type=hidden" form inputs `a` and `false` in the preview are likely anti-bot honeypot fields.
