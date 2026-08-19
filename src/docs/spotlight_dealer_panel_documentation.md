# Spotlight Dealer Panel — Platform Documentation

**Source:** `https://www.dev-app.myspotlight.co/dealer/`
**Tenant explored:** Mahindra (account avatar `MA`)
**Documentation date:** 2026-05-05

This document maps every page of the Spotlight **Dealer Panel** (the dealer-facing app), every widget on each page, and every data field/column inside those widgets. Sample values from the dev environment are noted as examples (not the schema).

> Note: Most widgets sat in an empty state because the default filter window (May 1, 2026 → May 5, 2026) had no activity. The structures below are accurate regardless of whether numbers are populated. Pages where real data was visible (Subscription Invoice, Creatives) are documented with concrete examples.

---

## 1. Global UI Elements

These appear on every page of the Dealer Panel.

### 1.1 Top Bar
| Element | Description |
|---|---|
| Hamburger menu (left) | Collapses / expands the left navigation rail. |
| Brand logo | Tenant brand (e.g. Mahindra). |
| **Location selector (centered)** | Dropdown labelled "All Locations" — lets the dealer/multi-outlet account scope the entire app to one location. Distinct from the Client Panel; this is the dealer-side equivalent of the Region/State filter. |
| Tenant name | Right side; identifies the logged-in client (e.g. "Mahindra"). |
| User avatar | Initials badge for the logged-in user (e.g. `MA`). |

### 1.2 Left Sidebar Navigation
Eight pages in fixed order:
1. **Dashboard** — `/dealer/dashboard`
2. **Service Leads** — `/dealer/lead?type=service`
3. **No Sales Leads** — `/dealer/lead?type=no-sales`
4. **Feedback** — `/dealer/lead?type=feedback`
5. **Sales Leads** — `/dealer/lead?type=sales`
6. **Subscription Invoice** — `/dealer/subscription-orders`
7. **Downloads** — `/dealer/download`
8. **Creatives** — `/client/boost-creatives` (note: routed under `/client/`, shared with the Client Panel)

### 1.3 Global Filters Bar (on Dashboard and the four Lead pages)

| Field | Type | Description |
|---|---|---|
| **FILTERS** button | Modal trigger | Opens a multi-section filter dialog. |
| **Date range** | Date pickers (`Mon D, YYYY → Mon D, YYYY`) | Defaults to the current month-to-date window. |
| **REMOVE FILTERS** | Button | Resets all selections. |

Filter modal sections mirror the Client Panel pattern (Location → Period → Product Category → Channel), but Location is constrained by the dealer's accessible outlets.

### 1.4 Common Widget Controls
- **Info icon (ⓘ)** beside metric titles — hover to reveal the metric definition.
- **Download icon (⬇)** — exports the table to the Downloads queue.
- **Pagination bar:** `Rows per page: [5 / 10 / 25 / 50 / 100]` and `1-N of M` with prev/next page controls.
- **Carousel arrows** (`Previous slide` / `Next slide`) on metric card strips for paging through the metric library.

---

## 2. Page: Dashboard

**URL:** `/dealer/dashboard`
**Purpose:** Dealer-side performance dashboard — paid media KPIs, call performance, lead funnel and lead breakup at the dealer/location level.

### 2.1 KPI Card Carousel (top)
Horizontal carousel of 12 cards, with 5 visible at a time. `Previous slide` / `Next slide` arrows page through the strip. Each card has an info-icon tooltip.

| Card | Type | Notes |
|---|---|---|
| Clicks | Integer | AD/Media clicks. |
| Impressions | Integer | AD/Media impressions. |
| Leads | Integer | Total leads generated. |
| Call Leads | Integer | Leads from inbound call. |
| Call Lead Sync | Integer | Call leads synced to CRM. |
| Form Leads | Integer | Leads from web/app form. |
| Form Lead Sync | Integer | Form leads synced. |
| Agent Missed Calls | Integer | Calls the agent missed. |
| Lead Sync | Integer | Total leads synced. |
| CPL | Numeric | Cost-per-Lead. |
| Attended Leads | Integer | Leads contacted/dispositioned. |
| Service Leads | Integer | Leads of type "Service". |
| Unattended Leads | Integer | Leads not yet contacted. |

### 2.2 Gauge Card Section
Title **Gauge Card** — 4 semi-circular gauge charts side-by-side.

| Gauge | Format | Meaning |
|---|---|---|
| **Call Answered Ratio** | `XX%` + `actual/total` pill | % of inbound call leads that were answered. |
| **Call Leads With Status** | `XX%` + `actual/total` | % of call leads that have been tagged with a disposition. |
| **Call Leads Sync** | `XX%` + `actual/total` | % of call leads successfully synced to CRM/downstream. |
| **Enquiry to Booking Ratio** | `XX%` + `actual/total` | % of enquiries that converted into a booking. |

### 2.3 Performance Trend
Combined dual-axis time-series chart.

| Series | Type | Description |
|---|---|---|
| Leads | Bar/line, integer | Leads per day in the selected period. |
| CPL | Line, numeric | Cost-per-Lead per day. |
| X-axis | Date (daily) | E.g. `02 May → 05 May`. |

Header summary tiles: `Leads: 0`, `CPL: 0`.

### 2.4 Lead Source Breakup
Two-column widget split by acquisition channel.

| Group | Sub-row | Data |
|---|---|---|
| **Organic Leads** | Google Leads | Integer |
| **Paid Leads** | Facebook Leads | Integer |
| **Paid Leads** | Google Leads | Integer |

### 2.5 Lead Type Overview
Donut summary of leads by modality.

| Field | Type |
|---|---|
| Total Leads | Integer |
| Call Leads | Integer |
| Form Leads | Integer |
| Call Leads % | Percent |
| Form Leads % | Percent |

### 2.6 Lead Query Overview
Stacked time series of lead-query volumes split by type.

| Series | Description |
|---|---|
| Call Leads | Stacked count over time |
| Form Leads | Stacked count over time |
| Total | Header total |

### 2.7 Sales Lead Journey
4-stage funnel widget. Each stage card shows: total + Call/Form split + conversion %.

| Stage | Format |
|---|---|
| **Lead Generated** | total `\| Call \| Form` |
| **Opened On Dashboard** | `%` + total + Call/Form split |
| **Saved** | `%` + total + split |
| **Synced** | `%` + total + split |

Tabs: **Call Leads** / **Form Leads** to filter the funnel.

### 2.8 Call Details
Two side-by-side panels.

**CUSTOMER CALLS:**
| Status | Count + % |
|---|---|
| Answered | int + % |
| Missed | int + % |
| IVR Drop | int + % |
| Offline | int + % |

**AD FORM LINKED CALLS:**
| Status | Count + % |
|---|---|
| Answered | int + % |
| Agent Missed | int + % |
| Customer Missed | int + % |
| Offline | int + % |

### 2.9 Sales Lead Enquiry Overview
Two donut charts; toggle between Form Leads / Call Leads. Center text shows status share.

### 2.10 Lead Breakup (table)
| Column | Type |
|---|---|
| Dealer Code | String |
| Missed | Integer |
| Total Lead | Integer |
| Form Leads | Integer |
| Answered | Integer |
| Call Leads | Integer |
| Missed By Agent | Integer |
| Outbound Calls | Integer |
| Missed By Customer | Integer |

### 2.11 Your Performance (table)
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealer Name | String |
| Region | String |
| State | String |
| City | String |
| Campaign Name | String |
| Spend | Numeric |
| Impressions | Integer |
| Clicks | Integer |
| CTR | Percent |

### 2.12 Top Performance Ads
Tab group with **Google** and **Facebook** sub-tabs, listing the dealer's top-performing creatives per channel. Empty in this account.

---

## 3. Page: Service Leads

**URL:** `/dealer/lead?type=service`
**Purpose:** Operational inbox for Service-type leads (after-sales / service enquiries).

### 3.1 Status Tabs
| Tab | Description |
|---|---|
| **Unattended Leads** | Not yet contacted/dispositioned. |
| **Follow Up Leads** | Scheduled for follow-up. |
| **Missed Calls** | Inbound calls that were missed. |
| **Unsynced Leads** | Not yet synced to CRM/downstream. |

### 3.2 Lead Toolbar
| Element | Description |
|---|---|
| Total Count | Aggregate count for the selected tab. |
| Search box | Free-text search by name, email, phone. |

### 3.3 Lead List Table
| Column | Sub-fields | Type |
|---|---|---|
| **Lead Details** | Avatar (initials), Lead name, location/availability badge | Composite |
| **Contact Information** | Email, Phone, Sync status (`Pending` / `Synced`) | Composite |
| **Dealer and Car Model** | Dealer name + dealer code, Car model, Recording status | Composite |
| **Actions** | Timeline / Sync / forward icons | Buttons |

---

## 4. Page: No Sales Leads

**URL:** `/dealer/lead?type=no-sales`
**Purpose:** Inbox for leads marked as **non-sales** (e.g. enquiries that didn't convert / aren't sales-qualified).

Schema is identical to §3 (same status tabs, toolbar, and Lead List table) — only the lead `type` filter differs.

---

## 5. Page: Feedback

**URL:** `/dealer/lead?type=feedback`
**Purpose:** Inbox for leads of type "feedback" (customer feedback / NPS / post-interaction comments).

Schema is identical to §3.

---

## 6. Page: Sales Leads

**URL:** `/dealer/lead?type=sales`
**Purpose:** Inbox for **Sales-qualified** leads — the primary working queue for the dealer's sales team.

Schema is identical to §3.

> **Cross-cutting note for the four Lead pages (3–6):** They share one underlying React route (`/dealer/lead`) parameterised by `?type=<service | no-sales | feedback | sales>`. Same UI template, just a different lead-type slice each.

---

## 7. Page: Subscription Invoice

**URL:** `/dealer/subscription-orders`
**Purpose:** Lists the dealer's Spotlight subscription orders with payment/invoice details.

### 7.1 Toolbar
| Element | Description |
|---|---|
| Search input | Free-text search across the order list. |
| Download (⬇) button | Exports the orders table. |

### 7.2 Subscription Details Table
| Column | Type | Example |
|---|---|---|
| **Order Id** | Integer | `1`, `2`, `3` |
| **Location Name** | String | `Gurgaon`, `Delhi`, `Mumbai` |
| **Amount** | Numeric (currency) | `1500`, `2200`, `3000` |
| **Location Store Code** | String | `STR001`, `STR002`, `STR003` |
| **Subscription Duration** | String (months) | `12 Months`, `6 Months`, `3 Months` |
| **Payment Status** | Enum | `Paid`, `Pending`, `Failed` |
| **Order Date** | Date | `2025-09-01` |
| **Receipt** | String / link | E.g. `RCP-1001` (link to receipt file) |
| **Invoice** | String / link | E.g. `INV-1001` (link to invoice file) |

---

## 8. Page: Downloads

**URL:** `/dealer/download`
**Purpose:** Async export queue. When the dealer clicks ⬇ on any table, an export job is created and listed here for download.

### 8.1 Downloads Table
| Column | Type | Notes |
|---|---|---|
| Module | String | Source page/widget for the export. |
| Request Date & Time | Datetime | When the export was requested. |
| Period | Date range | Data window the export covers. |
| Status | Enum | E.g. queued, generating, ready, failed. |
| Download | Button | Available when Status is ready. |

(Empty for this account — table renders "No data found.")

---

## 9. Page: Creatives

**URL:** `/client/boost-creatives`
**Purpose:** Creative gallery for boosting/launching campaigns. Shows the brand's available creatives with channel availability and a one-click "Boost" CTA.

### 9.1 Page Header
| Element | Description | Example |
|---|---|---|
| Title | Page name (with lightning bolt icon) | `⚡ Creatives` |
| Subtitle | Dealer scope + helper copy | `Mahindra – Andheri West · Select a creative to launch a campaign` |
| **Budget remaining** badge | Pill on top-right showing remaining boost budget for this dealer | `₹86K` (currency in INR) |

### 9.2 Filter Tabs
| Tab | Description |
|---|---|
| **All** (default) | Shows every available creative |
| (Type-specific tabs may appear, e.g. by ad format) | Filter by creative format |

A right-aligned counter shows the total (e.g. `6 creatives`).

### 9.3 Creative Card Grid
2-column grid of creative cards. Each card has the following data points:

| Field | Type | Example |
|---|---|---|
| **Format badge** (top-left) | Enum: `Video Ad`, `Carousel`, `Reel`, `Feed Post`, `Story`, `Brand Film` | `Video Ad` |
| **Channel availability badges** (top-right) | Icon set: `G` (Google), `f` (Facebook/Meta) | Some creatives are Google+Meta, some Meta-only |
| **Hero image / preview** | Image (or video poster) | Vehicle hero shot |
| **Tagline** (overlaid bottom-left of image) | String | `Born for the wild` |
| **Model name** (card title) | String | `Mahindra Thar Roxx` |
| **Feature tags** (chips) | Array of strings | `4×4 Off-Road`, `Petrol & Diesel`, `5-Door` |
| **Boost This Creative** | Primary CTA button | Launches the boost flow for this creative |

### 9.4 Sample Creatives Captured
| # | Format | Channels | Title | Tagline | Tags |
|---|---|---|---|---|---|
| 1 | Video Ad | Google + Meta | Mahindra Thar Roxx | Born for the wild | 4×4 Off-Road; Petrol & Diesel; 5-Door |
| 2 | Carousel | Meta | XUV 3XO | Bold. Connected. Ready. | Compact SUV; ADAS Safety; Sunroof |
| 3 | Reel | Google + Meta | Mahindra BE 6 | Born Electric. Born Bold. | Pure EV; 450km Range; Fast Charge |
| 4 | Feed Post | Google + Meta | XUV700 | The game changer | 7-Seater; AdrenoX; Panoramic Roof |
| 5 | Story | Meta | Scorpio N | Big Daddy is back | True 4WD; Leather Interior; Off-Road |
| 6 | Brand Film | Google + Meta | Mahindra XEV 9e | Flagship EV. Redefined. | Flagship EV; 800V Arch; Luxury |

---

## 10. Cross-cutting Notes

- **Routing pattern:** Most lead-related pages share one route `/dealer/lead` parameterised by `?type=`. Other pages have unique paths.
- **Shared route with Client Panel:** The **Creatives** page is served from `/client/boost-creatives` — the same module is reused by the dealer view, just scoped to the dealer's location and budget.
- **Default date window:** Pages with date filters default to the current calendar month-to-date.
- **Number formatting:** Counts auto-abbreviate (`9.31K`); currency uses `₹` prefix and `K` for thousands (`₹86K`); rates use `XX.XX%`.
- **Lead taxonomy:** Service / No-Sales / Feedback / Sales (lead type) × Unattended / Follow Up / Missed Calls / Unsynced (workflow status).
- **Channel coverage:** Google + Meta (with Facebook surfaced for Meta leads/clicks) is the consistent paid model — same as the Client Panel.
- **Empty-state behaviour:** Tables render `No data found.` and KPI tiles show `0` / `0.00%`. The Subscription Invoice and Creatives pages had real data and are documented with sample values.
- **Pages I could not fully validate:**
  - Lead row Action icons (timeline / sync) — exact behaviour and any modal contents weren't opened to avoid taking actions on real data.
  - "Top Performance Ads" Google/Facebook sub-tabs were empty for this account — column schema couldn't be observed.
  - Carousel arrows on the dashboard KPI strip were present but with the visible 5 cards already covering the metric set, additional hidden cards (if any) were inferred from the page-text dump.
