import React, { useMemo, useState } from 'react';
import {
  X,
  Users,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Check } from
'lucide-react';
import { PRODUCT_TAXONOMY } from './LMSLeadList';
import type { Lead } from './LMSLeadList';

// ------------------------------------------------------------------
// Filter model
// ------------------------------------------------------------------
export interface LeadFilters {
  datePreset: string;
  dateFrom: string; // yyyy-mm-dd
  dateTo: string;
  leadType: string[]; // Hot / Warm / Cold
  stage: string[];
  source: string[]; // Meta / Google / WhatsApp / Walk-in  (display)
  callAgent: string[]; // AI Voice Agent / Store Executive
  inbound: string[]; // display only
  outbound: string[]; // display only
  products: string[];
  synced: string[]; // Synced / Pending
  syncError: string[]; // display only
  region: string[];
  state: string[];
  city: string[];
  dealerCode: string[];
}

export const EMPTY_FILTERS: LeadFilters = {
  datePreset: '',
  dateFrom: '',
  dateTo: '',
  leadType: [],
  stage: [],
  source: [],
  callAgent: [],
  inbound: [],
  outbound: [],
  products: [],
  synced: [],
  syncError: [],
  region: [],
  state: [],
  city: [],
  dealerCode: []
};

const STATE_REGION: Record<string, string> = {
  Delhi: 'North',
  Haryana: 'North',
  Punjab: 'North',
  'Uttar Pradesh': 'North',
  Maharashtra: 'West',
  Gujarat: 'West',
  Rajasthan: 'West',
  Karnataka: 'South',
  Telangana: 'South',
  'Tamil Nadu': 'South',
  'West Bengal': 'East'
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function parseLeadDate(s?: string): Date | null {
  if (!s) return null;
  const p = s.trim().split(/\s+/);
  if (p.length !== 3) return null;
  const d = parseInt(p[0], 10);
  const m = MONTHS.indexOf(p[1].slice(0, 3));
  const y = parseInt(p[2], 10);
  if (isNaN(d) || m < 0 || isNaN(y)) return null;
  return new Date(y, m, d);
}

// Which groups actually narrow the result set (vs. display-only chips)
const FUNCTIONAL_KEYS: (keyof LeadFilters)[] = [
  'leadType',
  'stage',
  'callAgent',
  'products',
  'synced',
  'region',
  'state',
  'city',
  'dealerCode'];


export function applyLeadFilters(leads: Lead[], f: LeadFilters): Lead[] {
  const from = f.dateFrom ? new Date(f.dateFrom) : null;
  const to = f.dateTo ? new Date(f.dateTo) : null;
  return leads.filter((l) => {
    if (f.leadType.length && !f.leadType.map((s) => s.toLowerCase()).includes(l.status)) return false;
    if (f.stage.length && !f.stage.includes(l.stage)) return false;
    if (f.products.length && !f.products.includes(l.model)) return false;
    if (f.synced.length) {
      const want = f.synced.map((s) => s.toLowerCase());
      if (!want.includes(l.syncStatus)) return false;
    }
    if (f.callAgent.length) {
      const ai = f.callAgent.includes('AI Voice Agent');
      const manual = f.callAgent.includes('Store Executive');
      if (ai && !manual && !l.isAiHandled) return false;
      if (manual && !ai && l.isAiHandled) return false;
    }
    if (f.state.length && !f.state.includes(l.dealer.state || '')) return false;
    if (f.city.length && !f.city.includes(l.dealer.city || '')) return false;
    if (f.dealerCode.length && !f.dealerCode.includes(l.dealer.code)) return false;
    if (f.region.length) {
      const r = STATE_REGION[l.dealer.state || ''] || '—';
      if (!f.region.includes(r)) return false;
    }
    if (from || to) {
      const d = parseLeadDate(l.leadCreatedOn);
      if (d) {
        if (from && d < from) return false;
        if (to && d > to) return false;
      }
    }
    return true;
  });
}

export function countFilters(f: LeadFilters): number {
  let n = 0;
  (Object.keys(f) as (keyof LeadFilters)[]).forEach((k) => {
    const v = f[k];
    if (Array.isArray(v)) n += v.length;
  });
  if (f.dateFrom || f.dateTo || f.datePreset) n += 1;
  return n;
}

// ------------------------------------------------------------------
// Small reusable multi-select dropdown
// ------------------------------------------------------------------
function MultiSelect({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (opt: string) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));else
    onChange([...value, opt]);
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full h-11 px-3.5 rounded-lg border bg-white text-sm flex items-center justify-between transition-colors ${value.length ? 'border-blue-400 text-gray-800' : 'border-gray-200 text-gray-500'} hover:border-blue-300`}>

        <span className="truncate">
          {value.length ? `${label} · ${value.length}` : label}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open &&
      <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg py-1">
            {options.length === 0 &&
          <div className="px-3 py-2 text-xs text-gray-400">No options</div>
          }
            {options.map((opt) =>
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-blue-50 text-left">

                <span
              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${value.includes(opt) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>

                  {value.includes(opt) && <Check size={11} className="text-white" />}
                </span>
                <span className="truncate">{opt}</span>
              </button>
          )}
          </div>
        </>
      }
    </div>);

}

const DATE_PRESETS = [
'Today',
'Yesterday',
'Last 7 Days',
'Current Month',
'Last Month',
'Last 3 Months',
'Last 6 Months'];


function presetRange(preset: string): {from: string;to: string;} {
  const now = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const start = new Date(now);
  let from = new Date(now);
  const to = new Date(now);
  switch (preset) {
    case 'Today':
      break;
    case 'Yesterday':
      from.setDate(now.getDate() - 1);
      to.setDate(now.getDate() - 1);
      break;
    case 'Last 7 Days':
      from.setDate(now.getDate() - 6);
      break;
    case 'Current Month':
      from = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'Last Month':
      from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      to.setTime(new Date(now.getFullYear(), now.getMonth(), 0).getTime());
      break;
    case 'Last 3 Months':
      from = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      break;
    case 'Last 6 Months':
      from = new Date(now.getFullYear(), now.getMonth() - 6, 1);
      break;
    default:
      return { from: '', to: '' };
  }
  return { from: iso(from), to: iso(to) };
}

// ------------------------------------------------------------------
// Main modal
// ------------------------------------------------------------------
type Tab = 'Lead' | 'CALL' | 'OTHERS' | 'Additional Filters';

export function FiltersModal({
  leads,
  initial,
  onApply,
  onClose
}: {
  leads: Lead[];
  initial: LeadFilters;
  onApply: (f: LeadFilters) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>('Lead');
  const [f, setF] = useState<LeadFilters>(initial);
  const set = (patch: Partial<LeadFilters>) => setF((prev) => ({ ...prev, ...patch }));

  // option lists derived from the live data
  const opts = useMemo(() => {
    const uniq = (arr: (string | undefined)[]) =>
    Array.from(new Set(arr.filter(Boolean) as string[])).sort();
    return {
      stage: uniq(leads.map((l) => l.stage)),
      products: uniq(leads.map((l) => l.model)),
      state: uniq(leads.map((l) => l.dealer.state)),
      city: uniq(leads.map((l) => l.dealer.city)),
      dealerCode: uniq(leads.map((l) => l.dealer.code)),
      region: uniq(leads.map((l) => STATE_REGION[l.dealer.state || ''] || undefined))
    };
  }, [leads]);

  const allProducts = useMemo(
    () =>
    Array.from(
      new Set(
        Object.values(PRODUCT_TAXONOMY).flatMap((sub) => Object.values(sub).flat())
      )
    ),
    []
  );

  const total = countFilters(f);

  // chips for the right rail
  const chips: {group: string;label: string;onRemove: () => void;}[] = [];
  if (f.dateFrom || f.dateTo) {
    chips.push({
      group: 'OTHERS',
      label: `${f.dateFrom || '…'} → ${f.dateTo || '…'}`,
      onRemove: () => set({ dateFrom: '', dateTo: '', datePreset: '' })
    });
  }
  const pushMany = (group: string, key: keyof LeadFilters) => {
    (f[key] as string[]).forEach((v) =>
    chips.push({
      group,
      label: v,
      onRemove: () => set({ [key]: (f[key] as string[]).filter((x) => x !== v) } as any)
    })
    );
  };
  pushMany('LEAD', 'leadType');
  pushMany('LEAD', 'stage');
  pushMany('LEAD', 'source');
  pushMany('CALL', 'callAgent');
  pushMany('CALL', 'inbound');
  pushMany('CALL', 'outbound');
  pushMany('OTHERS', 'products');
  pushMany('OTHERS', 'synced');
  pushMany('OTHERS', 'syncError');
  pushMany('LOCATIONS', 'region');
  pushMany('LOCATIONS', 'state');
  pushMany('LOCATIONS', 'city');
  pushMany('LOCATIONS', 'dealerCode');

  const navItems: {key: Tab;label: string;icon: React.ReactNode;count?: number;}[] = [
  { key: 'Lead', label: 'Lead', icon: <Users size={16} />, count: f.leadType.length + f.stage.length + f.source.length },
  { key: 'CALL', label: 'CALL', icon: <Search size={16} />, count: f.callAgent.length + f.inbound.length + f.outbound.length },
  { key: 'OTHERS', label: 'OTHERS', icon: <Search size={16} />, count: f.products.length + f.synced.length + f.syncError.length + (f.dateFrom || f.dateTo ? 1 : 0) },
  { key: 'Additional Filters', label: 'Additional Filters', icon: <SlidersHorizontal size={16} />, count: f.region.length + f.state.length + f.city.length + f.dealerCode.length }];


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[1040px] h-[640px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <p className="text-xs text-gray-400 mt-0.5">{total} filters applied</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Body: 3 columns */}
        <div className="flex-1 grid grid-cols-[220px_1fr_280px] min-h-0">
          {/* Left nav */}
          <div className="border-r border-gray-100 py-5 px-3">
            <div className="text-[11px] font-semibold text-gray-400 tracking-wider px-3 mb-2">
              FILTER BY
            </div>
            {navItems.map((it) =>
            <button
              key={it.key}
              onClick={() => setTab(it.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${tab === it.key ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>

                <span className={tab === it.key ? 'text-blue-600' : 'text-gray-400'}>{it.icon}</span>
                <span className="flex-1 text-left">{it.label}</span>
                {!!it.count &&
              <span className="text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 min-w-[18px] text-center">
                    {it.count}
                  </span>
              }
              </button>
            )}
          </div>

          {/* Middle panel */}
          <div className="py-5 px-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <Search size={16} className="text-blue-500" />
              <span className="text-sm font-bold tracking-wide text-gray-800 uppercase">{tab}</span>
            </div>

            {tab === 'Lead' &&
            <div className="rounded-xl border border-gray-200 p-5 space-y-4">
                <div className="text-[11px] font-semibold text-gray-400 tracking-wider">LEAD</div>
                <MultiSelect label="LEAD TYPE" options={['Hot', 'Warm', 'Cold']} value={f.leadType} onChange={(v) => set({ leadType: v })} />
                <MultiSelect label="LEAD STAGE" options={opts.stage} value={f.stage} onChange={(v) => set({ stage: v })} />
                <MultiSelect label="LEAD SOURCE" options={['Meta', 'Google', 'WhatsApp', 'Walk-in']} value={f.source} onChange={(v) => set({ source: v })} />
              </div>
            }

            {tab === 'CALL' &&
            <div className="rounded-xl border border-gray-200 p-5 space-y-4">
                <div className="text-[11px] font-semibold text-gray-400 tracking-wider">CALL</div>
                <MultiSelect label="INBOUND CALL" options={['Answered', 'Missed', 'Not Connected']} value={f.inbound} onChange={(v) => set({ inbound: v })} />
                <MultiSelect label="OUTBOUND CALL" options={['Connected', 'No Answer', 'Call Back']} value={f.outbound} onChange={(v) => set({ outbound: v })} />
                <MultiSelect label="CALL AGENT" options={['AI Voice Agent', 'Store Executive']} value={f.callAgent} onChange={(v) => set({ callAgent: v })} />
              </div>
            }

            {tab === 'OTHERS' &&
            <div className="rounded-xl border border-gray-200 p-5 space-y-5">
                <div className="text-[11px] font-semibold text-gray-400 tracking-wider">OTHERS</div>
                <div className="flex flex-wrap gap-2">
                  {DATE_PRESETS.map((p) =>
                <button
                  key={p}
                  onClick={() => {
                    const r = presetRange(p);
                    set({ datePreset: p, dateFrom: r.from, dateTo: r.to });
                  }}
                  className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${f.datePreset === p ? 'border-blue-500 text-blue-600 bg-blue-50 font-medium' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>

                      {p}
                    </button>
                )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[11px] font-semibold text-gray-400 tracking-wider">OR EXACT DATES</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="flex items-center gap-3">
                  <input
                  type="date"
                  value={f.dateFrom}
                  onChange={(e) => set({ dateFrom: e.target.value, datePreset: '' })}
                  className="flex-1 h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500" />

                  <span className="text-blue-400">→</span>
                  <input
                  type="date"
                  value={f.dateTo}
                  onChange={(e) => set({ dateTo: e.target.value, datePreset: '' })}
                  className="flex-1 h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500" />

                </div>
                <p className="text-xs text-gray-400">Some metrics may lag up to 3 days due to reporting guidelines.</p>
                <MultiSelect label="PRODUCTS" options={allProducts} value={f.products} onChange={(v) => set({ products: v })} />
                <MultiSelect label="SYNCED LEADS" options={['Synced', 'Pending']} value={f.synced} onChange={(v) => set({ synced: v })} />
                <MultiSelect label="SYNC ERROR" options={['None', 'CRM Timeout', 'Duplicate Lead', 'Invalid Number']} value={f.syncError} onChange={(v) => set({ syncError: v })} />
              </div>
            }

            {tab === 'Additional Filters' &&
            <div className="rounded-xl border border-gray-200 p-5 space-y-4">
                <div className="text-[11px] font-semibold text-gray-400 tracking-wider">LOCATIONS</div>
                <div className="grid grid-cols-2 gap-3">
                  <MultiSelect label="REGION" options={opts.region} value={f.region} onChange={(v) => set({ region: v })} />
                  <MultiSelect label="STATE" options={opts.state} value={f.state} onChange={(v) => set({ state: v })} />
                  <MultiSelect label="CITY" options={opts.city} value={f.city} onChange={(v) => set({ city: v })} />
                  <MultiSelect label="DEALER CODE" options={opts.dealerCode} value={f.dealerCode} onChange={(v) => set({ dealerCode: v })} />
                </div>
              </div>
            }
          </div>

          {/* Right rail */}
          <div className="border-l border-gray-100 py-5 px-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">Selected Filters</span>
                <span className="text-[11px] bg-blue-100 text-blue-700 rounded-full px-1.5 min-w-[18px] text-center">{total}</span>
              </div>
              <button onClick={() => setF(EMPTY_FILTERS)} className="text-sm text-blue-600 font-medium hover:underline">
                Clear all
              </button>
            </div>
            {['LEAD', 'CALL', 'OTHERS', 'LOCATIONS'].map((group) => {
              const g = chips.filter((c) => c.group === group);
              if (!g.length) return null;
              return (
                <div key={group} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-gray-400 tracking-wider">{group}</span>
                    <span className="text-[11px] text-gray-400">{g.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.map((c, i) =>
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-700">
                        {c.label}
                        <button onClick={c.onRemove} className="text-gray-400 hover:text-gray-700">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>);

            })}
            {!chips.length &&
            <p className="text-xs text-gray-400">No filters selected yet.</p>
            }
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            onClick={() => setF(EMPTY_FILTERS)}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100">

            Reset
          </button>
          <button
            onClick={() => onApply(f)}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-500/20">

            Apply ({total})
          </button>
        </div>
      </div>
    </div>);

}
