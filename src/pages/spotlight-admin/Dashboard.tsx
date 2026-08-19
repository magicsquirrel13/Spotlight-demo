import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Building,
  Users,
  Wallet,
  Activity,
  Sparkles,
  Image as ImageIcon,
  LayoutTemplate } from
'lucide-react';
const KPIS = [
{
  label: 'Total Brands',
  value: '142',
  delta: '+8',
  deltaLabel: 'this month',
  trend: 'up',
  icon: Building
},
{
  label: 'Active Partners',
  value: '3,284',
  delta: '+12.4%',
  deltaLabel: 'vs last 30d',
  trend: 'up',
  icon: Users
},
{
  label: 'Net MRR',
  value: '₹1.84Cr',
  delta: '+₹14.2L',
  deltaLabel: 'vs last 30d',
  trend: 'up',
  icon: Wallet
},
{
  label: 'Live Campaigns',
  value: '1,047',
  delta: '−3.1%',
  deltaLabel: 'vs last 7d',
  trend: 'down',
  icon: Activity
}];

const RECENT_ACTIVITY = [
{
  brand: 'Samsung India',
  action: 'Completed Step 6 — Discount codes',
  time: '12m ago',
  status: 'done'
},
{
  brand: 'Sony India',
  action: 'Started commercials setup',
  time: '47m ago',
  status: 'submitted'
},
{
  brand: 'Apex Fitness',
  action: 'Awaiting store agreement upload',
  time: '2h ago',
  status: 'pending'
},
{
  brand: 'Zenith Real Estate',
  action: 'Invited 14 new partners',
  time: '3h ago',
  status: 'submitted'
},
{
  brand: 'Kaya Clinic',
  action: 'Add-on tokens replenished (+5,000)',
  time: '5h ago',
  status: 'done'
},
{
  brand: 'Urban Burger Co.',
  action: 'Discount code SUMMER25 expired',
  time: '8h ago',
  status: 'pending'
}];

const PIPELINE = [
{
  label: 'Pending',
  value: 5,
  color: 'pending',
  bar: '8%'
},
{
  label: 'In Onboarding',
  value: 9,
  color: 'submitted',
  bar: '14%'
},
{
  label: 'Live',
  value: 128,
  color: 'done',
  bar: '78%'
}];

const QUICK_ACTIONS = [
{
  label: 'Onboard new brand',
  icon: Plus,
  to: '/spotlight/brands/new',
  accent: true
},
{
  label: 'Browse templates',
  icon: LayoutTemplate,
  to: '/spotlight/templates'
},
{
  label: 'Upload background',
  icon: ImageIcon,
  to: '/spotlight/backgrounds'
},
{
  label: 'Curate AI catalog',
  icon: Sparkles,
  to: '/spotlight/addons'
}];

function StatusDot({ status }: {status: string;}) {
  const map: Record<string, string> = {
    done: '#00C158',
    submitted: '#0070FC',
    pending: '#9A6601'
  };
  return (
    <div
      className="w-[6px] h-[6px] rounded-full flex-shrink-0"
      style={{
        background: map[status] || '#657180'
      }} />);


}
// Simple inline sparkline as SVG path
function Sparkline({ trend }: {trend: 'up' | 'down';}) {
  const path =
  trend === 'up' ?
  'M0 24 L10 22 L20 18 L30 19 L40 14 L50 15 L60 10 L70 11 L80 5' :
  'M0 8 L10 10 L20 9 L30 14 L40 13 L50 17 L60 16 L70 21 L80 22';
  const color = trend === 'up' ? '#00C158' : '#D9342B';
  return (
    <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round" />
      
    </svg>);

}
export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      {/* Page Head */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <div className="text-[var(--text-muted)] text-sm">
            Welcome back — here's what's moving across the network today.
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline">View revenue</button>
          <button
            className="btn-primary-sm flex items-center gap-2"
            onClick={() => navigate('/spotlight/brands/new')}>
            
            <Plus size={16} /> Onboard new brand
          </button>
        </div>
      </div>

      {/* KPI Banner */}
      <div className="grid grid-cols-4 gap-4">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === 'up';
          return (
            <div key={kpi.label} className="sp-card">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)]">
                  <Icon size={17} strokeWidth={1.5} />
                </div>
                <Sparkline trend={kpi.trend as 'up' | 'down'} />
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)] mb-1">
                {kpi.label}
              </div>
              <div className="numeric-stat mb-2">{kpi.value}</div>
              <div className="flex items-center gap-1.5 text-[12px]">
                {isUp ?
                <TrendingUp
                  size={12}
                  className="text-[var(--accent-success)]" /> :


                <TrendingDown size={12} className="text-[var(--danger)]" />
                }
                <span
                  className={`font-mono font-medium ${isUp ? 'text-[var(--accent-success)]' : 'text-[var(--danger)]'}`}>
                  
                  {kpi.delta}
                </span>
                <span className="text-[var(--text-muted)]">
                  {kpi.deltaLabel}
                </span>
              </div>
            </div>);

        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Brand Pipeline */}
        <div className="sp-card col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="card-title">Brand pipeline</div>
              <div className="text-[12px] text-[var(--text-muted)] mt-0.5">
                Distribution of brands across onboarding stages.
              </div>
            </div>
            <button
              className="btn-outline-xs flex items-center gap-1"
              onClick={() => navigate('/spotlight/brands')}>
              
              View all <ArrowUpRight size={12} />
            </button>
          </div>

          {/* Stacked bar */}
          <div className="flex h-[10px] rounded-full overflow-hidden mb-5 border-[0.5px] border-[var(--border-soft)]">
            {PIPELINE.map((p) =>
            <div
              key={p.label}
              style={{
                width: p.bar,
                background:
                p.color === 'done' ?
                '#00C158' :
                p.color === 'submitted' ?
                '#0070FC' :
                '#F59E0B'
              }} />

            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {PIPELINE.map((p) =>
            <div
              key={p.label}
              className="border-l-2 pl-3"
              style={{
                borderColor:
                p.color === 'done' ?
                '#00C158' :
                p.color === 'submitted' ?
                '#0070FC' :
                '#F59E0B'
              }}>
              
                <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)] mb-1">
                  {p.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="numeric-stat text-[20px]">{p.value}</div>
                  <div className="text-[12px] text-[var(--text-muted)] font-mono">
                    {p.bar}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mini area chart placeholder */}
          <div className="mt-6 pt-5 border-t border-[var(--border-soft)]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
                Onboarding throughput · last 14 days
              </div>
              <div className="text-[12px] text-[var(--text-muted)] font-mono">
                avg 2.4 / day
              </div>
            </div>
            <svg
              viewBox="0 0 600 90"
              className="w-full h-[90px]"
              preserveAspectRatio="none">
              
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0070FC" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0070FC" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 70 L43 62 L86 65 L128 50 L171 55 L214 40 L257 45 L300 32 L343 38 L386 28 L428 35 L471 22 L514 30 L557 18 L600 24 L600 90 L0 90 Z"
                fill="url(#grad)" />
              
              <path
                d="M0 70 L43 62 L86 65 L128 50 L171 55 L214 40 L257 45 L300 32 L343 38 L386 28 L428 35 L471 22 L514 30 L557 18 L600 24"
                stroke="#0070FC"
                strokeWidth="1.5"
                fill="none" />
              
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="sp-card">
          <div className="card-title mb-1">Quick actions</div>
          <div className="text-[12px] text-[var(--text-muted)] mb-5">
            Common ops shortcuts.
          </div>
          <div className="flex flex-col gap-2">
            {QUICK_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  onClick={() => navigate(a.to)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] border-[0.5px] transition-colors text-left ${a.accent ? 'border-[var(--brand-blue)] bg-[#E5F1FF] hover:bg-[#D6E8FF]' : 'border-[var(--border-soft)] hover:bg-[var(--bg-page)]'}`}>
                  
                  <div
                    className={`w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 ${a.accent ? 'bg-[var(--brand-blue)] text-white' : 'bg-[var(--bg-page)] text-[var(--brand-blue)]'}`}>
                    
                    <Icon size={15} strokeWidth={1.75} />
                  </div>
                  <div
                    className={`text-[13px] font-medium flex-1 ${a.accent ? 'text-[var(--brand-indigo)]' : 'text-[var(--text)]'}`}>
                    
                    {a.label}
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-[var(--text-muted)]" />
                  
                </button>);

            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity + Top Brands */}
      <div className="grid grid-cols-3 gap-4">
        {/* Activity Feed */}
        <div className="sp-card col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="card-title">Recent activity</div>
              <div className="text-[12px] text-[var(--text-muted)] mt-0.5">
                Latest signals across onboarding and live brands.
              </div>
            </div>
            <button className="btn-outline-xs flex items-center gap-1">
              Full audit log <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="flex flex-col">
            {RECENT_ACTIVITY.map((a, i) =>
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-[var(--border-soft)] last:border-b-0 hover:bg-[var(--bg-page)] -mx-2 px-2 rounded-[6px] transition-colors cursor-pointer">
              
                <StatusDot status={a.status} />
                <div className="w-7 h-7 rounded-[6px] bg-[var(--bg-page)] border-[0.5px] border-[var(--border-soft)] flex items-center justify-center text-[var(--brand-blue)] text-[11px] font-semibold flex-shrink-0">
                  {a.brand.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[var(--text)] leading-tight">
                    {a.brand}
                  </div>
                  <div className="text-[12px] text-[var(--text-muted)] leading-tight mt-[2px]">
                    {a.action}
                  </div>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] font-mono flex-shrink-0">
                  {a.time}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top brands */}
        <div className="sp-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="card-title">Top brands · MRR</div>
              <div className="text-[12px] text-[var(--text-muted)] mt-0.5">
                This month
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            {[
            {
              name: 'Samsung India',
              mrr: '₹12.4L',
              pct: 100
            },
            {
              name: 'Urban Burger Co.',
              mrr: '₹8.9L',
              pct: 72
            },
            {
              name: 'Kaya Clinic',
              mrr: '₹6.1L',
              pct: 49
            },
            {
              name: 'LG Electronics India',
              mrr: '₹4.2L',
              pct: 34
            },
            {
              name: 'Apex Fitness',
              mrr: '₹2.8L',
              pct: 22
            }].
            map((b) =>
            <div key={b.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[13px] font-medium">{b.name}</div>
                  <div className="text-[12px] font-mono font-medium text-[var(--text)]">
                    {b.mrr}
                  </div>
                </div>
                <div className="h-[4px] bg-[var(--bg-page)] rounded-full overflow-hidden">
                  <div
                  className="h-full bg-[var(--brand-blue)] rounded-full"
                  style={{
                    width: `${b.pct}%`
                  }} />
                
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}