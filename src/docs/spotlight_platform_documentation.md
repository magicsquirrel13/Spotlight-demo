# Spotlight Client Panel — Platform Documentation

**Source:** `https://www.dev-app.myspotlight.co/client/`
**Tenant explored:** Mahindra (account avatar `MA`)
**Date range used for live data capture:** Nov 1, 2025 → Apr 30, 2026
**Documentation date:** 2026-05-05

This document maps every page of the Spotlight Client Panel, every widget on each page, and every data field/column inside those widgets. Where actual sample values were observed, they are noted as examples (not the schema).

---

## 1. Global UI Elements

These appear on every analytics page.

### 1.1 Top Bar
| Element | Description |
|---|---|
| Hamburger menu (left) | Collapses / expands the left navigation rail. |
| Brand logo | Tenant brand (e.g. Mahindra). |
| Tenant name | Right side; identifies the logged-in client (e.g. "Mahindra"). |
| User avatar | Initials badge for the logged-in user (e.g. `MA`). |

### 1.2 Left Sidebar Navigation
Eight pages in fixed order:
1. **Growth Console** — `/client/growth-console`
2. **Channel Summary** — `/client/channel-summary`
3. **Lead** — `/client/lead`
4. **SKU** — `/client/sku-analytics`
5. **Engagement Plan** — `/client/engagement-plan`
6. **Dealer MIS** — `/client/dealer-mis`
7. **Lead MIS** — `/client/lead-mis`
8. **Downloads** — `/client/download`

### 1.3 Global Filters Bar (present on every analytics page)

| Field | Type | Description |
|---|---|---|
| **FILTERS** button | Modal trigger | Opens a multi-section filter dialog. |
| **Date range** | Date pickers (period: `YYYY-MM-DD — YYYY-MM-DD`) | Default seems to be the current month-to-date. |
| **REMOVE FILTERS** | Button | Resets all selections. |

#### Filter modal sections
| Section | Sub-fields | Type |
|---|---|---|
| **LOCATION** | Region, State, City, RO, Dealer Code | Cascading dropdowns |
| **PERIOD** | period (date range) | Date picker |
| **PRODUCT CATEGORY** | (category list) | Dropdown |
| **CHANNEL** | Google, Meta, Auto Portal | Checkbox set |
| Actions | Reset / Apply | Buttons |

### 1.4 Common widget controls
- **Info icon (ⓘ)** next to widget/metric titles — hover reveals a short tooltip describing the metric.
- **Download icon (⬇)** on the top-right of tables — exports the table as a file (request appears in the Downloads page).
- **Pagination bar** on every table: `Rows per page: [5 / 10 / 25 / 50 / 100]` and `1-N of M` with prev/next page controls.

---

## 2. Page: Growth Console

**URL:** `/client/growth-console`
**Purpose:** Top-level performance dashboard for the brand — paid + organic media KPIs, lead funnel, and outlet/dealer health snapshot.

### 2.1 KPI Card Strip (top, switchable metrics)

A horizontal row of 5 cards. Each card has a **dropdown selector** and an info tooltip — the user can swap the displayed KPI from the master metric library.

**Defaults shown:** Clicks, Impressions, Spend, Leads, Google Impressions

**Tooltip definitions captured:**
| Metric | Tooltip |
|---|---|
| Clicks | AD/Media Clicks |
| Impressions | AD/Media Impressions |
| Spend | AD/Media Spend |
| Leads | Total Number of Lead Generated |
| Google Impressions | Total Impressions on Google Ads |

**Full metric library available in the dropdown** (any card can switch to any of these):
Clicks · Impressions · Spend · Leads · Google Impressions · Google Clicks · Google Leads · Meta Impressions · Meta Clicks · Meta Leads · Meta CTR · Google CTR · CTR · CPL · CPC · Attended Leads · Unattended Leads · Google CPL · Google CPC · Meta CPL · Meta CPC · Call Leads · Form Leads · Call Lead Sync · Paid CPL · Form Lead Sync · Conversion Rate · Google Conversion Rate · Meta Conversion Rate

**Data types:**
- Counts (Clicks, Impressions, Leads): integer; auto-abbreviated (e.g. `9.31K`).
- Spend / cost metrics: numeric, 2 decimals (currency unit not labelled in UI).
- Rates (CTR, Conversion Rate): percentage with 2 decimals.

### 2.2 Gauge Card Section
Title: **Gauge Card** — 3 semi-circular gauge charts side-by-side.

| Gauge | Format | Meaning |
|---|---|---|
| **Call Leads With Status** | `XX.XX%` with `actual/total` pill (e.g. `0/2`) | % of call leads that have been tagged with a disposition status. |
| **Call Leads Sync** | `XX.XX%` with `actual/total` pill | % of call leads successfully synced to downstream/CRM systems. |
| **Enquiry to Booking Ratio** | `X%` with `actual/total` pill | % of enquiries (leads) that converted into a booking. |

### 2.3 Lead Source Breakup
Two-column widget showing organic vs. paid leads by channel.

| Group | Sub-row | Data |
|---|---|---|
| **Organic Leads** | Google Leads | Integer (e.g. 6) |
| **Paid Leads** | Facebook Leads | Integer (e.g. 0) |
| **Paid Leads** | Google Leads | Integer (e.g. 4) |

### 2.4 Lead Type Overview
Donut/pie summary of lead modality.

| Field | Type | Example |
|---|---|---|
| Total Leads | Integer | 10 |
| Call Leads | Integer | 2 |
| Form Leads | Integer | 8 |
| Call Leads % | Percent | 20.00% |
| Form Leads % | Percent | 80.00% |

### 2.5 Performance Trend
Combined dual-axis time-series chart.

| Series | Type | Description |
|---|---|---|
| Leads | Bar/line, integer | Lead volume per day in the selected period. |
| CPL | Line, numeric | Cost-per-Lead per day. |
| X-axis | Date (daily ticks) | E.g. `Nov '25 → Apr '26`. |

Header summary tiles: `Leads: 10`, `CPL: 82.68`.

### 2.6 Lead Query Overview
Stacked area chart of lead-query volumes split by type.

| Series | Description |
|---|---|
| Call Leads | Stacked count over time |
| Form Leads | Stacked count over time |
| Total | Header showing aggregate |

### 2.7 Sales Lead Journey
Funnel widget with 4 stages. Each stage card shows: stage total + Call/Form split + conversion %.

| Stage | Format |
|---|---|
| **Lead Generated** | total `\| Call \| Form` (e.g. `10 \| 2 \| 8`) |
| **Opened On Dashboard** | `%` of generated + total + Call/Form split |
| **Saved** | `%` + total + split |
| **Synced** | `%` + total + split |

Tabs: **Call Leads** / **Form Leads** to filter the funnel view.

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
Two donut charts (toggle between Form Leads / Call Leads).

| Element | Data |
|---|---|
| Form Leads donut | Percentage breakup (e.g. 100.0% Form Leads) |
| Call Leads donut | Same structure for call leads |
| Center text | Status share (e.g. "Unattended 10") |

### 2.10 Outlet Snapshot
Compact horizontal table — single row with status counts across many dealer-state buckets.

**Columns (Status row → integer count row):**
| Bucket | Type |
|---|---|
| Total | Integer |
| Onboarded | Integer |
| Retainer Expired | Integer |
| Retainer Active | Integer |
| Wallet Balance Sufficient | Integer |
| Wallet Balance Exhausted | Integer |
| No Active Campaign | Integer |
| No Spend in Last 7 Days | Integer |
| No Spend in Last 7 Days on Google | Integer |
| No Spend in Last 7 Days on Meta | Integer |
| No Leads in Last 7 Days | Integer |
| No Leads in Last 7 Days from Google | Integer |
| No Leads in Last 7 Days from Meta | Integer |
| Platform Subscription Active Once | Integer |
| Platform Subscription Not Active Once | Integer |
| Platform Subscription Not Active Due 15 Days | Integer |
| Platform Subscription Not Active for More Than 15 Days | Integer |
| Yet to Do First Wallet Top Up | Integer |
| Yet to Activate First Google Campaign | Integer |
| Yet to Activate First Meta Campaign | Integer |
| No Spend in Last 15 Days | Integer |
| No Spend in Last 15 Days on Google | Integer |
| No Spend in Last 15 Days on Meta | Integer |
| No Leads in Last 15 Days | Integer |
| No Leads in Last 15 Days from Google | Integer |
| No Leads in Last 15 Days from Meta | Integer |

### 2.11 Movers and Shakers
Region-level performance comparison table (downloadable).

| Column | Type | Notes |
|---|---|---|
| Region | String | E.g. `Indi-North`, `North`, `West`, `TEST regiott`, `TEST 1`, `Total` (footer row). |
| CPL | Numeric | Cost per Lead. |
| Spend | Numeric | Total spend. |
| Impressions | Integer / abbrev. | E.g. `1.12K`, `9.31K`. |
| Leads | Integer | |
| Clicks | Integer | |
| CPC | Numeric | Cost per Click. |
| Paid CPL | Numeric | |
| CTR | Percent | |
| Attended Leads | Integer | |
| Hot Attended Leads | Integer | |
| Warm Attended Leads | Integer | |
| Cold Attended Leads | Integer | |
| Unattended Leads | Integer | |
| Google Spend | Numeric | |
| Google Impressions | Integer | |
| Google Clicks | Integer | |
| Google Leads | Integer | |
| Google CPC | Numeric | |
| Google CPL | Numeric | |
| Google CTR | Percent | |
| Meta Spend | Numeric | |
| Facebook Clicks | Integer | |
| Meta CPC | Numeric | |
| Meta CPL | Numeric | |
| Meta CTR | Percent | |
| Meta Impressions | Integer | |
| Facebook Leads | Integer | |

### 2.12 KPI Report
Dealer-level KPI scorecard.

| Column | Type |
|---|---|
| Dealer Code | String |
| Call Answered | Percent |
| Call Leads with Status | Percent |
| Enquiry To Booking | Percent |
| Call Sync | Percent |

---

## 3. Page: Channel Summary

**URL:** `/client/channel-summary`
**Purpose:** Performance summary by paid media channel (carousel of paid metrics + cost/CPL trends + RO breakdown).

### 3.1 Metric Card Carousel
Horizontal carousel with prev/next arrows. Five visible cards (default):

| Card | Type | Example |
|---|---|---|
| Impressions | Integer (abbrev.) | 9.31K |
| Clicks | Integer | 54 |
| Paid Leads | Integer | 4 |
| CTR | Percent | 0.58% |
| Paid CPL | Numeric | 206.71 |

(Carousel may include additional channel-specific metrics on swipe; the visible default set focuses on paid performance.)

### 3.2 Daily Summary (Clicks vs CTR)
Dual-axis line chart.

| Series | Type | Header |
|---|---|---|
| Clicks (left axis) | Integer | `Click : 54` |
| CTR (right axis) | Percent | `CTR : 0.58%` |
| X-axis | Date (daily) | |

### 3.3 Daily Summary (Cost vs CPL)
Dual-axis chart.

| Series | Type | Header |
|---|---|---|
| Cost (left) | Numeric | `Cost : 826.83` |
| CPL (right) | Numeric | `CPL : 82.68` |

### 3.4 Daily Summary (Cost vs Leads)
Dual-axis chart.

| Series | Type | Header |
|---|---|---|
| Cost (left) | Numeric | `Cost : 826.83` |
| Leads (right) | Integer | `Leads : 10` |

### 3.5 RO Based Report
Downloadable table grouped by RO (Regional Office).

| Column | Type |
|---|---|
| RO | String (e.g. `Other`) |
| Spend | Numeric |
| Spending Dealers | Integer |
| Impressions | Integer (abbrev.) |
| Clicks | Integer |
| Leads | Integer |
| CPL | Numeric |
| CTR | Percent |

---

## 4. Page: Lead

**URL:** `/client/lead`
**Purpose:** Operational lead inbox for the call/form leads with action affordances (callback, sync, recording).

### 4.1 Status Tabs (top of content area)
| Tab | Description |
|---|---|
| **Unattended Leads** | Leads not yet contacted/dispositioned. |
| **Follow Up Leads** | Leads scheduled for follow-up. |
| **Missed Calls** | Inbound calls that were missed. |
| **Unsynced Leads** | Leads not yet synced to CRM/downstream. |

### 4.2 Lead Toolbar
| Element | Description |
|---|---|
| **Total Count** | Aggregate count for the selected tab (e.g. `Total Count : 10`). |
| **Search box** | Free-text search by name, email, phone. |
| **Download (⬇)** | Export current list. |

### 4.3 Lead List Table
| Column | Sub-fields | Type |
|---|---|---|
| **Lead Details** | Avatar (initials), Lead name, "Not Available" badge if location/data missing | Composite |
| **Contact Information** | Email, Phone, Sync status badge (`Pending` / `Synced`) | Composite |
| **Dealer and Car Model** | Dealer name + dealer code (e.g. `Mahindra new - g40`), Car model (e.g. `Boler Neo`, `Scorpio N`), Recording status (e.g. `Recording Not Available`) | Composite |
| **Actions** | History/timeline icon, Sync/forward icon | Buttons |

Sample row content: `testing lead` / `pathania1170@gmail.com` / `8976366543` / Pending / `Mahindra new - g40` / `Boler Neo` / Recording Not Available.

---

## 5. Page: SKU

**URL:** `/client/sku-analytics`
**Purpose:** Product/Model-level lead analytics — by model, region/dealer, and dealer-model crosstab.

### 5.1 Lead by Model (chart)
Horizontal bar chart.

| Field | Type |
|---|---|
| Model | String (e.g. `OTHERS`, `Boler Neo`, `Scorpio N`) |
| Lead count | Integer (bar value) |

### 5.2 Model Level Lead Report (table)
| Column | Type |
|---|---|
| Region | String |
| State | String |
| City | String |
| RO | String |
| Model | String |
| Leads | Integer |
| Attended Leads | Integer |
| Unattended Leads | Integer |

### 5.3 Leads by Model at Dealer Level (table)
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealer Name | String |
| Region | String |
| State | String |
| RO | String |
| City | String |
| Model | String |
| Leads | Integer |
| Attended Leads | Integer |
| Unattended Leads | Integer |

---

## 6. Page: Engagement Plan

**URL:** `/client/engagement-plan`
**Purpose:** Dealer-level engagement, retainer/budget health, subscription status, and platform usage stats. Multiple stacked tables, mostly downloadable.

### 6.1 Dealer Engagement Report
Has its own **Date Range** picker (independent of the global filter; default `2026-05-01 — 2026-05-05`).

| Column | Type |
|---|---|
| Avg Session Duration | Duration (e.g. minutes) |
| User-Email | String |
| Last Login Date | Date |
| No Of Days | Integer (active days) |

### 6.2 Stage Wise Lead Count
| Column | Type |
|---|---|
| Dealer Details | String (`<Dealer Name>-<Code>`) |
| Created | Integer |
| Opened | Integer |
| Saved | Integer |
| Synced | Integer |
| Enquiry | Integer |

### 6.3 Dealer Lifetime Stats
| Column | Type |
|---|---|
| Dealer Code | String |
| City | String |
| Dealer Name | String |
| Region | String |
| State | String |
| Lifetime Spend | Numeric |
| Lifetime Clicks | Integer |
| Lifetime Leads | Integer |
| Lifetime CPL | Numeric |
| Recent Top Up Date | Date |
| Recent Spend Date | Date |

### 6.4 Dealer Media Budget (group of 3 sub-tables)
Three thresholds, identical schema. Downloadable.

#### 6.4.1 Dealer who have exhausted budget (Budget below 0)
#### 6.4.2 Dealer who have exhausted budget (Budget below 3000)
#### 6.4.3 Dealer who have exhausted budget (Budget below 5000)

| Column | Type |
|---|---|
| Dealer Code | String |
| Dealer Name | String |
| Region | String |
| State | String |
| City | String |
| Active Dealer | Boolean (`Yes` / `No`) |
| Recent Top Up Date | Date |
| Recent Spend Date | Date |

### 6.5 Dealer Activation Plan Status with SI
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealer Name | String |
| Region | String |
| State | String |
| City | String |
| Subscription Days Remaining | Integer |
| Subscription Status | Enum (`Expired`, `Active`, etc.) |

### 6.6 Dealer Who are Nearing Their Retainer Renewal
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealer Name | String |
| Region | String |
| State | String |
| City | String |
| End Date | Date |

---

## 7. Page: Dealer MIS

**URL:** `/client/dealer-mis`
**Purpose:** Dealer-centric MIS — paid media + lead performance broken down by Region/State/City/RO/Dealer/Campaign.

### 7.1 Metric Card Carousel
Default visible cards:

| Card | Type |
|---|---|
| Impressions | Integer |
| Spend | Numeric |
| Clicks | Integer |
| CTR | Percent |
| Paid Call Lead Sync | Integer |

Carousel `Previous slide / Next slide` arrows reveal additional metrics in the same family.

### 7.2 Daily Summary (Clicks vs CTR)
Same dual-axis chart structure as Channel Summary §3.2 (Click count + CTR%).

### 7.3 Daily Summary (Cost vs CPL)
Same dual-axis (Cost numeric + CPL numeric).

### 7.4 Daily Summary (Cost vs Leads)
Same dual-axis (Cost numeric + Leads integer).

### 7.5 Region Based Report
| Column | Type |
|---|---|
| Region | String |
| Spending Dealers | Integer |
| Cost | Numeric |
| Impressions | Integer |
| Clicks | Integer |
| Leads | Integer |
| CPL | Numeric |
| CTR | Percent |

### 7.6 State Based Report
Same schema as 7.5 but grouped by **State**.

### 7.7 City Based Report
Same schema with extra `state` column.
| Column | Type |
|---|---|
| City | String |
| state | String |
| Spending Dealers | Integer |
| Cost | Numeric |
| Impressions | Integer |
| Clicks | Integer |
| Leads | Integer |
| CPL | Numeric |
| CTR | Percent |

### 7.8 RO Based Report
| Column | Type |
|---|---|
| RO | String |
| state | String |
| Spending Dealers | Integer |
| Cost | Numeric |
| Impressions | Integer |
| Clicks | Integer |
| Leads | Integer |
| CPL | Numeric |
| CTR | Percent |

### 7.9 Dealer Performance
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealers Name | String |
| Region | String |
| State | String |
| City | String |
| Impressions | Integer |
| Clicks | Integer |
| Leads | Integer |
| CPL | Numeric |
| CTR | Percent |

### 7.10 Campaign Performance Report
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealers Name | String |
| Region | String |
| State | String |
| City | String |
| Impressions | Integer |
| Campaign Name | String |
| Clicks | Integer |
| Leads | Integer |
| CTR | Percent |
| Spends | Numeric |

---

## 8. Page: Lead MIS

**URL:** `/client/lead-mis`
**Purpose:** Operational MIS for inbound leads — call attendance, missed/answered metrics by geography & dealer.

### 8.1 Metric Card Carousel
| Card | Type |
|---|---|
| Attended Leads | Integer |
| Unattended Leads | Integer |
| Leads with Calls | Integer |
| Answered | Integer |
| Missed By Agent | Integer |
| Missed By Customer | Integer |
| Average Call Duration | Duration |
| NON Syncable Leads | Integer |

(All accessible via prev/next slide arrows.)

### 8.2 Region Based Report
| Column | Type |
|---|---|
| Region | String |
| Total Leads | Integer |
| Form Leads | Integer |
| Call Leads | Integer |
| Answered | Integer |
| Missed | Integer |
| CPL | Numeric |
| Average Call Duration | Duration |

### 8.3 State Based Report — same schema as 8.2 grouped by **State**.

### 8.4 City Based Report
Same schema + extra `state` column.

### 8.5 RO Based Report
Same schema + extra `state` column, grouped by **RO**.

### 8.6 Lead Funnel Metrics
| Column | Type |
|---|---|
| Dealer Code | String |
| Dealer Name | String |
| Region | String |
| State | String |
| City | String |
| Form Leads | Integer |
| Call Leads | Integer |
| Total Leads | Integer |
| Answered | Integer |
| Missed | Integer |
| Avg. Call Duration | Duration |

---

## 9. Page: Downloads

**URL:** `/client/download`
**Purpose:** Async export queue. When a user clicks the ⬇ button on any table, an export job is created here.

### 9.1 Downloads Table
| Column | Type | Notes |
|---|---|---|
| Module | String | Source page/widget for the export. |
| Request Date & Time | Datetime | When the export was requested. |
| Period | Date range | The data window the export covers. |
| Status | Enum | E.g. queued, generating, ready, failed. |
| Download | Button | Available when Status is ready. |

(No download history was present during exploration — table shows "No data found.")

---

## 10. Cross-cutting Notes

- **Date range scope:** Most pages share a global date filter, but the **Engagement Plan → Dealer Engagement Report** has its own independent date range; **Dealer MIS / Lead MIS / Downloads** revert to the page-default (current month) when navigated to fresh.
- **Number formatting:** Large counts auto-abbreviate (e.g. `9.31K`); currency/cost fields use 2 decimals; rates use `XX.XX%`.
- **Empty data states:** Tables render `No data found.` and KPI tiles show `0` / `0.00%`. With a wider date range the data populates as expected.
- **Channel coverage:** The platform consistently models three channels — **Google**, **Meta** (with Facebook surfaced for Meta-leads/clicks), and **Auto Portal**. Channel-specific metrics are prefixed accordingly (`Google Spend`, `Meta CPL`, `Facebook Clicks`, etc.).
- **Lead types:** Leads are classified as **Call Leads** vs **Form Leads** (modality), and as **Attended / Unattended** (engagement state). Attended leads are further sub-classified as **Hot / Warm / Cold** in the Movers and Shakers table.
- **Dealer health hierarchy:** Region → State → City → RO → Dealer Code. Most MIS tables can be sliced at any of these levels.
