# Leads Management — Dealer Client Panel (dev)

Source: `https://www.dev-app.myspotlight.co/client/lead` (logged in as Kia India, role MA).

A dealer-facing lead inbox that ingests inquiries from multiple channels (Meta, Google, Auto Portal), groups them per dealership, surfaces calls and recordings, lets the dealer take notes and sync the lead status to a CRM, and shows an **AI Analytics** view per lead — the conversation a voice bot agent had with the customer.

## 1. App shell

- **Top bar**: brand logo (Kia chevron), brand display name ("kia India"), user avatar ("MA").
- **Left sidebar (dark navy `#0a0f3d`-ish)**, items in order:
  - Growth Console → `/client/growth-console`
  - Engagement Plan → `/client/engagement-plan`
  - SKU Analytics → `/client/sku-analytics`
  - Dealer MIS → `/client/dealer-mis`
  - Lead MIS → `/client/lead-mis`
  - Channel Summary → `/client/channel-summary`
  - **Leads** → `/client/lead` (selected — blue highlight)
  - Downloads → `/client/download`
- Hamburger collapses the sidebar.

## 2. Leads list page (`/client/lead`)

### 2.1 Header strip
- Title: "Leads"
- Filter bar with a blue `FILTERS` button, current date range chip ("May 1, 2026 → May 18, 2026"), and `REMOVE FILTERS` outline button (right).

### 2.2 Quick filter chips (dark pills, just below filter bar)
- Unattended Leads
- Follow Up Leads
- Missed Calls
- Unsynced Leads

### 2.3 List card
- Header row: "Total Count : 9" (left) · search box "Search by name, email, phone" (right) · download icon button.
- 4-column table:

| Column | Contents |
|---|---|
| Lead Details | Round avatar (initial), name, status tag pill (`Hot` / `Hot Cancelled` / `Cold` / `Not Available`), and a sub-row with stage tag (`Booking Cancel`, `Invoice`, `Appointed Enquiry`, `Appointed Enquiry Cancel`, `Invoice Cancel`) plus an optional red `Incomplete` chip. For AI-bot-handled leads, a small "Agent Icon" sits above the avatar. |
| Contact Informations | email line (✉ icon), phone line (📞 icon), and a sync-status chip (`Pending` shown in orange pill). |
| Dealer and Car Model | Dealer name + dealer code (e.g. `Lally Kia - PB310`, `Somya Kia - MP311`, `Incheon Kia - KL304`), car model below (`SYROS`, `All New SELTOS`, `CARENS CLAVIS`, or `Not Available`). Below that: either an HTML5 `<audio>` player with the call recording, or the text "Recording Not Available". |
| Actions | Three circular icon buttons (in this order): Activity Log (clock), Add TO-DO Note (doc+arrow), Edit Lead (pencil). A green `MULTI-VISITS` badge floats above this column for leads with multiple visits. |

- Footer: `Rows per page` selector (5/10/25/50), range text `1-9 of 9`, prev/page-number/next buttons.

### 2.4 Status-tag color legend (observed)
- `Hot` — light-blue pill
- `Hot Cancelled` — light-blue pill (same chip, suffix only)
- `Cold` — light-blue pill
- `Pending` (sync) — orange/yellow pill
- `Incomplete` — light-red pill (badge floats to the left, slightly outside the row)
- `MULTI-VISITS` — green pill with clock icon

## 3. Filters dialog

Clicking `FILTERS` opens a centered modal titled "FILTERS" with three columns:

**LEAD**
- Unattended Leads
- Follow Up Leads
- Lead Intent
- Lead Type
- Multi-visit Leads
- Lead Status
- Lead Media
- "Additional Filter +" link at the bottom

**CALL**
- Inbound Call
- Outbound Call
- Call Agent

**OTHERS**
- Period (date-range picker; current: `2026-05-01 — 2026-05-18`)
- Products
- Synced Leads
- Sync Error
- **Channels** (checkbox group): Meta, Google, Auto Portal

Footer: `Reset` (text button) and `Apply` (filled blue) at the bottom-right.

## 4. Activity Log side drawer

Triggered by the clock icon in the Actions column. Opens as a right-side panel (~480px) over a dimmed background.

- Header: "Activity Logs" + ✕.
- Lead summary block at top:
  - Name
  - Sync-status pill (e.g. `Pending`)
  - Lead-status pill (e.g. `Hot`, top-right)
  - Dealer + dealer code (line)
  - 📞 phone (line)
- Timeline list — each entry is a star-bullet row with the event text on the left and absolute timestamp on the right (`04 May 2026 11:18 AM`). Observed event copy:
  - "Customer email changed from NA to azhar@gmail.com"
  - "Notes changed to Customer is from NA to NA"
  - "product changed from SELTOS to All New SELTOS"
  - "Leads status changed from pending to Appointed Enquiry"

API: `GET /serviceclient/v1/lead-history/{leadId}` (host: `j4rpzbswyk.execute-api.ap-south-1.amazonaws.com/dev`).
Sample leadId observed: `69f4713d95049bbb7a1aa77b` (24-char Mongo ObjectId).

## 5. Lead Details side drawer

Triggered by the pencil (Edit Lead) icon. Same right-drawer pattern as Activity Log.

- Header: "Lead Details" + an outlined purple `Activity Log` button (jumps to the timeline above) + ✕.
- Tab bar: **Details** (default, blue underline) | **AI Analytics**.

### 5.1 Details tab (form)
Two-column form layout:

| Field | Type | Sample |
|---|---|---|
| Name | text input | "azhar" |
| Email | text input + helper "Email is Not mandatory" | "azhar@gmail.com" |
| Phone | text input | "9902492666" |
| Call Duration(s) | text input (readonly?) | "Not Available" |
| Lead Type | radio group (single column on the right side actually a 2×2 grid) | options: **Buy A kia Car** (selected), Service A Car, Feedback, Non Sale |
| Status | dropdown | "Appointed Enquiry" (other values seen elsewhere: Pending, Booking Cancel, Invoice, Appointed Enquiry Cancel, Invoice Cancel) |
| Notes | textarea | placeholder "Enter notes..." |

**Sync Status** progress strip — 5 segments (Created → Opened → Saved → Synced → Enquiry). Filled segments are blue, unfilled are light grey. For this lead 3 segments were filled (Created, Opened, Saved) so it sits at `Saved`.

Footer (full-width): outlined `Save` (left) + filled blue `Save And Sync` (right).

### 5.2 AI Analytics tab

Renders only when the lead was handled by the voice-bot agent (the "Agent Icon" indicator in the list). Two blocks:

**CALL DATA card** (light-blue background, ~`#eef4ff`):
- "CALL DATA" label with a small waveform icon.
- `Duration` — large number (`56` seconds for the sample).
- `Call Completion Status` — horizontal progress bar with the percentage on the right (e.g. `67%`, green fill).

**QUESTION/CONVERSATION BY VOICE BOT AGENT** (white card with chat-bubble icon):
- Ordered list of Q&A pairs the bot collected:
  - ❇ "What's your name" → 👤 "azhar"
  - ❇ "Which model you are looking for" → 👤 "Seltos"
  - ❇ "What is your email id" → 👤 *(empty / no answer)*
  - ❇ "Do you want to schedule a test drive" → 👤 "no"

Same `Save` / `Save And Sync` footer carries over from the Details tab.

## 6. Add TO-DO Note (middle action icon)

Document-with-up-arrow icon between Activity Log and Edit Lead. Click opens a note-creation flow (not opened during this capture — confirm visually later if needed).

## 7. Audio recordings

- Standard `<audio controls>` element embedded in the row's "Dealer and Car Model" cell.
- Source files live on S3: `s3.ap-south-1.amazonaws.com/waybeo-{bucket}/{shortId}.mp3`. Observed:
  - `waybeo-mahindra/eb1maOlLZ_jS1yspQtUeY.mp3`
  - `waybeo-pragya/fY-uBGKwtSNG48dllE5X7.mp3`
- "Waybeo" is a call-tracking SaaS — they likely host the recording + run the speech analytics that feeds the AI Analytics tab.

## 8. API surface (so far)

Base host: `https://j4rpzbswyk.execute-api.ap-south-1.amazonaws.com/dev`

| Method · Path | Purpose |
|---|---|
| `GET /serviceclient/v1/lead-history/{leadId}` | Activity Log timeline for a lead |

Inferred (not directly observed because requests fired before network capture):
- `GET /serviceclient/v1/leads?period=…&status=…&channel=…` — paginated list
- `GET /serviceclient/v1/leads/{leadId}` — single lead with details (powers Lead Details drawer)
- `GET /serviceclient/v1/leads/{leadId}/ai-analytics` — duration + Q&A pairs for the AI Analytics tab
- `PUT/PATCH /serviceclient/v1/leads/{leadId}` — Save (and Save-And-Sync triggers CRM push)
- `GET /serviceclient/v1/dealers`, `/products` — feed filter dropdowns

## 9. Data model — replication blueprint

A `Lead` record needs at minimum:
```
{
  id: string,                         // Mongo ObjectId
  name: string,
  email: string | null,
  phone: string,
  callDurationSec: number | null,
  type: 'buy' | 'service' | 'feedback' | 'nonsale',
  status: 'pending' | 'appointed_enquiry' | 'appointed_enquiry_cancel'
        | 'invoice' | 'invoice_cancel' | 'booking_cancel' | 'incomplete',
  tag: 'hot' | 'hot_cancelled' | 'cold' | null,
  channel: 'meta' | 'google' | 'auto_portal' | 'voicebot',
  multiVisits: number,               // > 1 shows MULTI-VISITS badge
  dealer: { id, name, code },        // e.g. { name: 'Incheon Kia', code: 'KL304' }
  product: { name } | null,          // e.g. 'All New SELTOS'
  recordingUrl: string | null,       // S3 .mp3
  syncState: 'created'|'opened'|'saved'|'synced'|'enquiry',
  syncError: string | null,
  notes: string,
  agent: { kind: 'human' | 'voicebot' },   // voicebot triggers AI Analytics tab
  aiAnalytics?: {
    durationSec: number,
    completionPct: number,
    qa: Array<{ question: string, answer: string | null }>
  },
  history: Array<{ event: string, at: ISOString }>,
  createdAt, updatedAt
}
```

### Replication checklist for the demo

1. **Shell**: dark-navy left rail (8 menu items + Leads selected), white top bar with brand logo and account avatar.
2. **List**: filter bar + date chip + 4 quick-filter pills + 4-column table with: avatar/name/tag, contact + sync pill, dealer + model + audio/no-recording, actions cluster. Floating `MULTI-VISITS` and `Incomplete` chips overlaid on the row edges.
3. **Filters modal**: 3-column LEAD/CALL/OTHERS layout with Reset + Apply.
4. **Activity Log drawer**: name + status + dealer + phone summary on top; star-bulleted timeline below. Open via the clock-icon action.
5. **Lead Details drawer**: 2-tab interface; tab 1 is a full edit form ending with a 5-step sync progress strip and Save / Save And Sync; tab 2 ("AI Analytics") shows a duration tile + completion-% bar followed by a chat-style Q&A list pulled from a voice-bot transcript.
6. **Audio**: each lead row can embed a tiny inline audio player when a recording exists, otherwise "Recording Not Available".
7. **Agent badge**: a small icon above the avatar marks bot-handled leads — these are the ones that show the AI Analytics tab populated.

## 10. Caveats

- The initial XHR responses for the lead list and the lead-detail GET were not captured (network panel started after they fired). Only the Activity Log endpoint is confirmed; other endpoints are inferred from the page shape.
- I only opened one Lead Details drawer (azhar's AI-handled lead). Non-AI leads probably still expose the `AI Analytics` tab — likely empty or hidden — confirm by clicking a row without the Agent Icon.
- The recording players didn't have a duration loaded by the time I inspected them (`duration: null`), so I couldn't read total length from the DOM; the figure would be in the underlying API.
- Sync progression beyond `Saved` isn't observed in any of the 9 rows — all show `Pending`. The `Synced` / `Enquiry` segments are inferred from the strip labels.
