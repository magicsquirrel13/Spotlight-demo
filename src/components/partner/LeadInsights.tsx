

import React, { useState } from 'react';
import { Info, Phone, FileText } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer } from
'recharts';

// Everything on this dashboard is derived from a single total of 184 sales leads.
const TOTAL_LEADS = 184;
// Lead Query Overview split: Sales 85%, Service / Feedback / Non Sale 5% each.
const QUERY_SEGMENTS = [
{
  key: 'SALES',
  name: 'SALES',
  value: 157,
  color: '#1E1B6B'
},
{
  key: 'SERVICE',
  name: 'SERVICE',
  value: 9,
  color: '#22C55E'
},
{
  key: 'FEEDBACK',
  name: 'FEEDBACK',
  value: 9,
  color: '#C0392B'
},
{
  key: 'NON SALE',
  name: 'NON SALE',
  value: 9,
  color: '#F59E0B'
}] as
const;

type SegmentKey = (typeof QUERY_SEGMENTS)[number]['key'];

// Status breakdown revealed when a donut segment is selected. Each set sums to its segment total.
const STATUS_BY_SEGMENT: Record<
  SegmentKey,
  {name: string;value: number;}[]> =
{
  SALES: [
  {
    name: 'LEAD',
    value: 52
  },
  {
    name: 'ENQUIRY FOLLOW UP',
    value: 40
  },
  {
    name: 'APPOINTED ENQUIRY',
    value: 18
  },
  {
    name: 'ASSIGNMENT',
    value: 12
  },
  {
    name: 'BOOKING',
    value: 12
  },
  {
    name: 'ENQUIRY CANCEL',
    value: 15
  },
  {
    name: 'RETAIL',
    value: 8
  }],

  SERVICE: [
  {
    name: 'ENQUIRY FOLLOW UP',
    value: 3
  },
  {
    name: 'CUSTOMER MEETING',
    value: 1
  },
  {
    name: 'SERVICE SCHEDULED',
    value: 3
  },
  {
    name: 'SERVICING DONE',
    value: 1
  },
  {
    name: 'ENQUIRY CANCEL',
    value: 1
  }],

  FEEDBACK: [
  {
    name: 'POSITIVE',
    value: 3
  },
  {
    name: 'NEUTRAL',
    value: 2
  },
  {
    name: 'NEGATIVE',
    value: 2
  },
  {
    name: 'ESCALATED',
    value: 1
  },
  {
    name: 'RESOLVED',
    value: 1
  }],

  'NON SALE': [
  {
    name: 'OUT OF TERRITORY',
    value: 2
  },
  {
    name: 'INCORRECT CUSTOMER INFORMATION',
    value: 2
  },
  {
    name: 'JOB QUERY',
    value: 1
  },
  {
    name: 'SPAM',
    value: 2
  },
  {
    name: 'NOT CONTACTABLE',
    value: 2
  }]

};

// Sales Lead Journey funnel — top stage is the 157 sales leads (85% of 184).
// Within each stage, calls are 70% and forms 30% (matching the 129 / 55 overall split).
const CALL_SHARE = 0.7;
const JOURNEY_BASE = [
{
  stage: 'Lead Generated',
  value: 157
},
{
  stage: 'Opened On Dashboard',
  value: 122
},
{
  stage: 'Saved',
  value: 109
},
{
  stage: 'Synced',
  value: 86
},
{
  stage: 'Enquiry',
  value: 62
},
{
  stage: 'Booking',
  value: 12
}];

const TOP = JOURNEY_BASE[0].value;
const JOURNEY_STAGES = JOURNEY_BASE.map((s, i) => {
  const call = Math.round(s.value * CALL_SHARE);
  return {
    stage: s.stage,
    value: String(s.value),
    pct: i === 0 ? null : `${(s.value / TOP * 100).toFixed(1)}%`,
    call: String(call),
    form: String(s.value - call)
  };
});
const JOURNEY_COLORS = [
'#5B8DEF',
'#3B6FE0',
'#2E5AD6',
'#2645BE',
'#1F3599',
'#1A1F6B'];

// Overall call / form counts: 70% and 30% of the 184 total leads.
const CALL_LEADS = Math.round(TOTAL_LEADS * 0.7); // 129
const FORM_LEADS = TOTAL_LEADS - CALL_LEADS; // 55

// Call Details — customer calls scale off the 129 call leads, ad-form calls off the 55 form leads.
const CUSTOMER_CALLS = [
{
  status: 'Answered',
  count: 68,
  pct: '52.6%'
},
{
  status: 'Missed',
  count: 28,
  pct: '21.7%'
},
{
  status: 'IVR Drop',
  count: 28,
  pct: '22.3%'
},
{
  status: 'Offline',
  count: 5,
  pct: '3.4%'
}];

const AD_FORM_CALLS = [
{
  status: 'Answered',
  count: 10,
  pct: '17.6%'
},
{
  status: 'Agent Missed',
  count: 12,
  pct: '22.1%'
},
{
  status: 'Customer Missed',
  count: 14,
  pct: '24.7%'
},
{
  status: 'Offline',
  count: 19,
  pct: '35.6%'
}];


const ENQUIRY_LEGEND = [
{
  label: 'Cold',
  value: 14,
  color: '#EA4E2C'
},
{
  label: 'Hot Cancelled',
  value: 1,
  color: '#38BDF8'
},
{
  label: 'Sale',
  value: 1,
  color: '#1E3A8A'
},
{
  label: 'Warm',
  value: 98,
  color: '#7C3AED'
},
{
  label: 'Hot',
  value: 12,
  color: '#F59E0B'
},
{
  label: 'Other',
  value: 1,
  color: '#0EA5A0'
},
{
  label: 'Unattended',
  value: 30,
  color: '#AAC7B8'
}];

function CardTitle({ children }: {children: React.ReactNode;}) {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <div className="card-title">{children}</div>
      <Info size={13} className="text-[var(--text-muted)]" />
    </div>);

}

function HalfGauge({ label, percent }: {label: string;percent: number;}) {
  const data = [
  {
    name: 'value',
    value: percent,
    color: '#7C3AED'
  },
  {
    name: 'rest',
    value: 100 - percent,
    color: '#EDE9FE'
  }];

  return (
    <div className="flex-1 rounded-xl bg-[var(--bg-page)]/60 p-4 flex items-center justify-center">
      <div className="relative w-full max-w-[220px] h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={58}
              outerRadius={92}
              dataKey="value"
              stroke="none">
              
              {data.map((d) =>
              <Cell key={d.name} fill={d.color} />
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-x-0 top-9 text-center text-lg font-bold text-white">
          {percent}%
        </div>
        <div className="absolute inset-x-0 bottom-1 text-center text-sm font-semibold text-[var(--brand-blue)]">
          {label}
        </div>
      </div>
    </div>);

}

export function LeadInsights() {
  const [showCall, setShowCall] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<SegmentKey>('SALES');
  const active =
  QUERY_SEGMENTS.find((s) => s.key === selectedSegment) ?? QUERY_SEGMENTS[0];
  const statusBars = STATUS_BY_SEGMENT[selectedSegment];
  return (
    <div className="flex flex-col gap-6">
      {/* Lead Query Overview */}
      <div className="sp-card">
        <CardTitle>Lead Query Overview</CardTitle>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {QUERY_SEGMENTS.map((s) =>
            <button
              key={s.key}
              onClick={() => setSelectedSegment(s.key)}
              className={`flex items-center gap-2 rounded-lg px-2 py-1 transition-colors ${selectedSegment === s.key ? 'bg-gray-100 ring-1 ring-gray-200' : 'hover:bg-gray-50'}`}>
              
                <span
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: s.color
                }} />
              
                <span className="text-xs font-semibold text-gray-700">
                  {s.name}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  {s.value.toLocaleString()}
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showCall}
                onChange={(e) => setShowCall(e.target.checked)}
                className="accent-blue-600" />
              
              Call Leads
            </label>
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showForm}
                onChange={(e) => setShowForm(e.target.checked)}
                className="accent-blue-600" />
              
              Form Leads
            </label>
          </div>
        </div>
        <div className="grid grid-cols-[300px_1fr] gap-6 items-center">
          {/* Donut — click a segment to drill into its statuses */}
          <div className="relative h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={QUERY_SEGMENTS as any}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={110}
                  paddingAngle={1}
                  dataKey="value"
                  stroke="none">
                  
                  {QUERY_SEGMENTS.map((s) =>
                  <Cell
                    key={s.key}
                    fill={s.color}
                    opacity={selectedSegment === s.key ? 1 : 0.45}
                    className="cursor-pointer outline-none"
                    onClick={() => setSelectedSegment(s.key)} />

                  )}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span
                className="text-sm font-semibold"
                style={{
                  color: active.color
                }}>
                
                {active.name}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {active.value.toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5">
                of {TOTAL_LEADS} leads
              </span>
            </div>
          </div>
          {/* Status bars for the selected segment */}
          <div className="h-[260px]">
            <div className="text-xs font-semibold text-gray-500 mb-1">
              {active.name} · statuses
            </div>
            <ResponsiveContainer width="100%" height="92%">
              <BarChart
                data={statusBars}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 70
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#EEF2F6"
                  vertical={false} />
                
                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 9
                  }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={70} />
                
                <YAxis
                  tick={{
                    fontSize: 10
                  }}
                  allowDecimals={false} />
                
                <Tooltip formatter={(v: number) => v.toLocaleString()} />
                <Bar dataKey="value" fill={active.color} radius={[3, 3, 0, 0]}>
                  <LabelList dataKey="value" position="top" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Lead Journey */}
      <div className="sp-card">
        <CardTitle>Sales Lead Journey</CardTitle>
        <div className="flex overflow-hidden rounded-xl">
          {JOURNEY_STAGES.map((s, i) =>
          <div
            key={s.stage}
            className="flex-1 px-5 py-5 text-white text-center relative"
            style={{
              backgroundColor: JOURNEY_COLORS[i],
              clipPath:
              i === 0 ?
              'polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)' :
              i === JOURNEY_STAGES.length - 1 ?
              'polygon(0 0, 100% 0, 100% 100%, 0 100%, 18px 50%)' :
              'polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)',
              marginLeft: i === 0 ? 0 : -18,
              paddingLeft: i === 0 ? 20 : 30
            }}>
            
              <div className="text-sm font-semibold mb-1.5">{s.stage}</div>
              {s.pct &&
            <div className="inline-block px-2 py-0.5 rounded bg-white/20 text-[10px] font-medium mb-1.5">
                  {s.pct}
                </div>
            }
              <div className="text-xl font-bold mb-2">{s.value}</div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/15 text-[10px] font-mono">
                <Phone size={9} /> {s.call}
                <span className="opacity-40">|</span>
                <FileText size={9} /> {s.form}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600">
            <Phone size={12} /> Call Leads
            <span className="font-mono font-semibold text-gray-900">
              {CALL_LEADS}
            </span>
            <span className="text-gray-400">(70%)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600">
            <FileText size={12} /> Form Leads
            <span className="font-mono font-semibold text-gray-900">
              {FORM_LEADS}
            </span>
            <span className="text-gray-400">(30%)</span>
          </span>
        </div>
      </div>

      {/* Call Details + Sales Lead Enquiry Overview */}
      <div className="grid grid-cols-2 gap-6">
        {/* Call Details */}
        <div className="sp-card">
          <CardTitle>Call Details</CardTitle>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <Phone size={14} /> CUSTOMER CALLS
          </div>
          <div className="grid grid-cols-4 gap-3 p-3 rounded-lg bg-blue-50/60 mb-5">
            {CUSTOMER_CALLS.map((c) =>
            <div key={c.status}>
                <div className="text-[11px] text-gray-500 mb-1">{c.status}</div>
                <div className="text-base font-bold text-gray-900">
                  {c.count}
                </div>
                <div className="text-[11px] text-gray-400">{c.pct}</div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-700 mb-2">
            <Phone size={14} /> AD FORM LINKED CALLS
          </div>
          <div className="grid grid-cols-4 gap-3 p-3 rounded-lg bg-violet-50/60">
            {AD_FORM_CALLS.map((c) =>
            <div key={c.status}>
                <div className="text-[11px] text-gray-500 mb-1">{c.status}</div>
                <div className="text-base font-bold text-gray-900">
                  {c.count}
                </div>
                <div className="text-[11px] text-gray-400">{c.pct}</div>
              </div>
            )}
          </div>
        </div>

        {/* Sales Lead Enquiry Overview */}
        <div className="sp-card">
          <CardTitle>Sales Lead Enquiry Overview</CardTitle>
          <div className="flex gap-3 mb-4">
            <HalfGauge label="Form Leads" percent={30} />
            <HalfGauge label="Call Leads" percent={70} />
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {ENQUIRY_LEGEND.map((l) =>
            <div
              key={l.label}
              className="flex items-center justify-between text-sm">
              
                <span className="flex items-center gap-2 text-gray-600">
                  <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: l.color
                  }} />
                
                  {l.label}
                </span>
                <span className="font-mono font-medium text-gray-800">
                  {l.value}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}