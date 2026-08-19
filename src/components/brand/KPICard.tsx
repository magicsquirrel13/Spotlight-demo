import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
const METRICS = [
'Clicks',
'Impressions',
'Spend',
'Leads',
'Google Impressions',
'Google Clicks',
'Google Leads',
'Meta Impressions',
'Meta Clicks',
'Meta Leads',
'Meta CTR',
'Google CTR',
'CTR',
'CPL',
'CPC',
'Attended Leads',
'Unattended Leads',
'Google CPL',
'Google CPC',
'Meta CPL',
'Meta CPC',
'Call Leads',
'Form Leads'];

interface KPICardProps {
  defaultMetric: string;
  value: string | number;
  tooltip?: string;
}
export function KPICard({ defaultMetric, value, tooltip }: KPICardProps) {
  const [metric, setMetric] = useState(defaultMetric);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="sp-card relative">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">
          
          {metric}
          <ChevronDown size={12} />
        </button>
        {tooltip &&
        <div className="group relative">
            <Info size={14} className="text-[var(--text-muted)]" />
            <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--text)] text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
              {tooltip}
            </div>
          </div>
        }
      </div>
      <div className="numeric-stat">{value}</div>

      {showDropdown &&
      <>
          <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDropdown(false)} />
        
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-[8px] border border-[var(--border-soft)] shadow-lg max-h-64 overflow-y-auto z-20">
            {METRICS.map((m) =>
          <button
            key={m}
            onClick={() => {
              setMetric(m);
              setShowDropdown(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-page)] transition-colors">
            
                {m}
              </button>
          )}
          </div>
        </>
      }
    </div>);

}