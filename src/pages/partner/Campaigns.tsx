import React, { useMemo, useState } from 'react';
import {
  Play,
  Pause,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Wallet,
  X,
  CheckCircle2,
  Info,
  Sparkles,
  Plus,
  Loader2,
  ArrowLeft,
  ChevronDown,
  Phone } from
'lucide-react';
import { usePartnerLocation } from './PartnerShell';
// Per-month scaling factor to make the channel breakup respond to the month picker
const MONTHS = [
{
  label: 'July 2026',
  factor: 1
},
{
  label: 'June 2026',
  factor: 0.92
},
{
  label: 'May 2026',
  factor: 0.84
},
{
  label: 'April 2026',
  factor: 0.78
}];

const CAMPAIGNS = [
{
  id: '1',
  dealerId: 'dlr_001',
  name: 'Galaxy S24 Ultra 5G — Sarojini Nagar Hyperlocal',
  platforms: ['Google', 'Meta'],
  product: 'Galaxy S24 Ultra 5G',
  objective: 'Lead Generation',
  audience: 'Sarojini Nagar + 8km · 25–45 · Premium phone intenders',
  placements: 'Search, Feed, Reels, Stories',
  startDate: '01 Jul',
  dailyBudget: 650,
  monthlyBudget: 19500,
  spent: 14820,
  impressions: 184200,
  clicks: 3120,
  ctr: 1.69,
  leads: 62,
  cpl: 239,
  cplDelta: -8.2,
  status: 'active',
  headline: 'Own The Galaxy S24 Ultra 5G',
  body: 'Book a demo at Samsung SmartPlaza – Sahil Electronics. Festive offers live now.',
  url: 'sahil-electronics.spotlight.co/galaxy-s24-ultra',
  displayUrl: 'www.samsung.com/in',
  googleHeadline:
  'Book A Demo At Samsung SmartPlaza Sarojini Nagar | Your Nearest Samsung Authorised SmartPlaza',
  googleDesc:
  'Book Store Demo — Visit the nearest Samsung SmartPlaza – Sahil Electronics at Shop No 69, Main Market, Sarojini Nagar, New Delhi–110023.',
  phone: '08071 037 019',
  metaCreative: "/samsung-s24-ultra.png"

},
{
  id: '2',
  dealerId: 'dlr_001',
  name: 'Galaxy Z Fold8 Ultra 5G — Festive Push',
  platforms: ['Meta'],
  product: 'Galaxy Z Fold8 Ultra 5G',
  objective: 'Lead Generation',
  audience: 'New Delhi · 25–45 · Premium & foldable enthusiasts',
  placements: 'Feed, Reels, Stories',
  startDate: '05 Jul',
  dailyBudget: 500,
  monthlyBudget: 15000,
  spent: 11200,
  impressions: 142800,
  clicks: 2440,
  ctr: 1.71,
  leads: 41,
  cpl: 273,
  cplDelta: -4.1,
  status: 'active',
  headline: 'Galaxy Z Fold8 — Open to Wonder',
  body: 'Experience the next-gen foldable. Visit Samsung SmartPlaza – Sahil Electronics.',
  url: 'sahil-electronics.spotlight.co/galaxy-z-fold8',
  displayUrl: 'www.samsung.com/in',
  googleHeadline:
  'Book A Demo At Samsung SmartPlaza Sarojini Nagar | Explore The New Galaxy Z Fold8 Ultra 5G',
  googleDesc:
  'Book Store Demo — Visit the nearest Samsung SmartPlaza – Sahil Electronics at Shop No 69, Main Market, Sarojini Nagar, New Delhi–110023.',
  phone: '08071 037 020',
  metaCreative: "/samsung-zfold8.png"

},
{
  id: '3',
  dealerId: 'dlr_002',
  name: 'Neo QLED 8K QN900D — Brand Awareness',
  platforms: ['Google'],
  product: 'Neo QLED 8K QN900D',
  objective: 'Awareness',
  audience: 'Pune · 30–55 · Premium TV lookalike',
  placements: 'Search, Display',
  startDate: '12 Jun',
  dailyBudget: 250,
  monthlyBudget: 7500,
  spent: 3100,
  impressions: 96400,
  clicks: 1180,
  ctr: 1.22,
  leads: 12,
  cpl: 258,
  cplDelta: 5,
  status: 'paused',
  headline: 'Neo QLED 8K — Redefine Home Cinema',
  body: 'Discover the Neo QLED 8K QN900D at your nearest Samsung SmartPlaza.',
  url: 'nexus-digital.spotlight.co/neo-qled-8k',
  displayUrl: 'www.samsung.com/in',
  googleHeadline:
  'Book A Demo At Samsung SmartPlaza Pune | Your Nearest Samsung Authorised SmartPlaza',
  googleDesc:
  'Book Store Demo — Visit the nearest Samsung SmartPlaza – Nexus Digital at FC Road, Shivajinagar, Pune, Maharashtra–411004.',
  phone: '08071 037 021',
  metaCreative: "/samsung-neo-qled.png"

}];

type Campaign = (typeof CAMPAIGNS)[number];
type ChannelFilter = 'all' | 'Google' | 'Meta';
// Next month recommended media plan by dealer
const NEXT_MONTH_PLANS = {
  all: {
    recommendedBudget: 48000,
    googleSplit: 60,
    metaSplit: 40,
    estLeads: 174,
    cpl: 276,
    breakdown: [
    {
      product: 'Galaxy S24 Ultra 5G — Sarojini Nagar Hyperlocal',
      budget: 22000,
      leads: 80,
      cpl: 275
    },
    {
      product: 'Galaxy Z Fold8 Ultra 5G — Festive Push',
      budget: 16000,
      leads: 58,
      cpl: 276
    },
    {
      product: 'Neo QLED 8K QN900D — Performance Refresh',
      budget: 10000,
      leads: 36,
      cpl: 278
    }]

  },
  dlr_001: {
    recommendedBudget: 38000,
    googleSplit: 65,
    metaSplit: 35,
    estLeads: 138,
    cpl: 275,
    breakdown: [
    {
      product: 'Galaxy S24 Ultra 5G — Sarojini Nagar Hyperlocal',
      budget: 22000,
      leads: 80,
      cpl: 275
    },
    {
      product: 'Galaxy Z Fold8 Ultra 5G — Festive Push',
      budget: 16000,
      leads: 58,
      cpl: 276
    }]

  },
  dlr_002: {
    recommendedBudget: 10000,
    googleSplit: 55,
    metaSplit: 45,
    estLeads: 36,
    cpl: 278,
    breakdown: [
    {
      product: 'Neo QLED 8K QN900D — Performance Refresh',
      budget: 10000,
      leads: 36,
      cpl: 278
    }]

  }
};
const MIN_RECOMMENDED_BUDGET = 15000;
export function Campaigns() {
  const { selectedLocation } = usePartnerLocation();
  const [tab, setTab] = useState<'active' | 'paused'>('active');
  const [channel, setChannel] = useState<ChannelFilter>('all');
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].label);
  const [campaignStates, setCampaignStates] = useState<Record<string, string>>(
    Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c.status]))
  );
  const [showMediaPlan, setShowMediaPlan] = useState(false);
  // Local wallet balance (would normally come from a shared store) — defaults match PartnerWallet
  const [walletBalance, setWalletBalance] = useState(32450);
  const [allocatedNextMonth, setAllocatedNextMonth] = useState<number | null>(
    null
  );
  const toggleCampaign = (id: string) => {
    setCampaignStates((prev) => ({
      ...prev,
      [id]: prev[id] === 'active' ? 'paused' : 'active'
    }));
  };
  const filtered = CAMPAIGNS.filter((c) => {
    if (selectedLocation !== 'all' && c.dealerId !== selectedLocation)
    return false;
    if (channel !== 'all' && !c.platforms.includes(channel)) return false;
    return tab === 'active' ?
    campaignStates[c.id] === 'active' :
    campaignStates[c.id] === 'paused';
  });
  // Budget summary — reflects the selected channel. When a single channel is
  // active, multi-platform budgets/spend are split evenly across their platforms.
  const summary = useMemo(() => {
    const inScope = CAMPAIGNS.filter(
      (c) => selectedLocation === 'all' || c.dealerId === selectedLocation
    );
    let allocated = 0;
    let spent = 0;
    if (channel === 'all') {
      allocated = inScope.reduce((s, c) => s + c.monthlyBudget, 0);
      spent = inScope.reduce((s, c) => s + c.spent, 0);
    } else {
      inScope.forEach((c) => {
        if (!c.platforms.includes(channel)) return;
        const n = c.platforms.length;
        allocated += Math.round(c.monthlyBudget / n);
        spent += Math.round(c.spent / n);
      });
    }
    const remaining = allocated - spent;
    const pctSpent = allocated > 0 ? spent / allocated * 100 : 0;
    return {
      allocated,
      spent,
      remaining,
      pctSpent
    };
  }, [selectedLocation, channel]);
  // Per-channel budget breakup (Google vs Meta), scaled by selected month.
  // Budget/spend for multi-platform campaigns is split evenly across platforms.
  const channelBreakup = useMemo(() => {
    const factor =
    MONTHS.find((m) => m.label === selectedMonth)?.factor ?? 1;
    const inScope = CAMPAIGNS.filter(
      (c) => selectedLocation === 'all' || c.dealerId === selectedLocation
    );
    const base: Record<'Google' | 'Meta', {added: number;spent: number;}> = {
      Google: {
        added: 0,
        spent: 0
      },
      Meta: {
        added: 0,
        spent: 0
      }
    };
    inScope.forEach((c) => {
      const n = c.platforms.length;
      c.platforms.forEach((p) => {
        if (p === 'Google' || p === 'Meta') {
          base[p].added += Math.round(c.monthlyBudget / n * factor);
          base[p].spent += Math.round(c.spent / n * factor);
        }
      });
    });
    return base;
  }, [selectedLocation, selectedMonth]);
  // Pick the right plan
  const plan =
  NEXT_MONTH_PLANS[selectedLocation as keyof typeof NEXT_MONTH_PLANS] ??
  NEXT_MONTH_PLANS.all;
  // Current month label, e.g. "July 2026"
  const currentMonthLabel = useMemo(
    () =>
    new Date().toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    }),
    []
  );
  // Next month label, e.g. "August 2026"
  const nextMonthLabel = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  }, []);
  // Media plan can be viewed for the current month (live) or the month ahead (forecast)
  const planMonthOptions = useMemo(
    () => [
    {
      key: 'current',
      label: currentMonthLabel,
      factor: 1,
      live: true
    },
    {
      key: 'ahead',
      label: nextMonthLabel,
      factor: 1.08,
      live: false
    }],

    [currentMonthLabel, nextMonthLabel]
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Campaigns</h1>
          <p className="text-sm text-gray-500">
            Manage your active and paused campaigns
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Channel toggle */}
          <div className="flex items-center p-1 rounded-full bg-gray-100 border border-gray-200">
            {(['all', 'Google', 'Meta'] as ChannelFilter[]).map((ch) =>
            <button
              key={ch}
              onClick={() => setChannel(ch)}
              className={`px-3.5 h-8 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${channel === ch ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              
                {ch === 'Google' &&
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              }
                {ch === 'Meta' &&
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              }
                {ch === 'all' ? 'All Channels' : ch}
              </button>
            )}
          </div>
          <button
            onClick={() => setShowMediaPlan(true)}
            className="h-10 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20">
            
            <Calendar size={16} /> View {currentMonthLabel.split(' ')[0]} Media
            Plan
          </button>
        </div>
      </div>

      {/* Budget summary strip */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
            Monthly budget allocated
          </div>
          <div className="text-2xl font-bold text-gray-900 font-mono">
            ₹{summary.allocated.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Across {filtered.length + (tab === 'active' ? 0 : 0)} campaigns
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
            Spent so far
          </div>
          <div className="text-2xl font-bold text-gray-900 font-mono">
            ₹{summary.spent.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            {summary.pctSpent.toFixed(1)}% of monthly budget
          </div>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/40 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1 flex items-center gap-1">
            <Sparkles size={10} /> Remaining budget
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-mono">
            ₹{summary.remaining.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{
                width: `${Math.min(100, 100 - summary.pctSpent)}%`
              }} />
            
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1 flex items-center gap-1">
            <Wallet size={10} /> Wallet balance
          </div>
          <div className="text-2xl font-bold text-gray-900 font-mono">
            ₹{walletBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Available for ad spend
          </div>
        </div>
      </div>

      {/* Channel budget breakup — Google vs Meta (only in All Channels view) */}
      {channel === 'all' &&
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-semibold text-gray-900">
              Budget by channel
            </div>
            <div className="text-xs text-gray-500">
              Added vs spent across Google &amp; Meta
            </div>
          </div>
          {/* Month selector */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none h-9 pl-3 pr-8 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-300 focus:border-blue-500 focus:outline-none cursor-pointer">
              
              {MONTHS.map((m) =>
              <option key={m.label} value={m.label}>
                  {m.label}
                </option>
              )}
            </select>
            <ChevronDown
              size={15}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(['Google', 'Meta'] as const).map((p) => {
            const data = channelBreakup[p];
            const remaining = data.added - data.spent;
            const pct = data.added > 0 ? data.spent / data.added * 100 : 0;
            const accent = p === 'Meta' ? 'violet' : 'blue';
            return (
              <div
                key={p}
                className="rounded-xl border border-gray-200 p-4 bg-gray-50/40">
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${p === 'Meta' ? 'bg-violet-500' : 'bg-blue-500'}`} />
                    
                    <span className="text-sm font-semibold text-gray-900">
                      {p}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {pct.toFixed(0)}% spent
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
                      Budget added
                    </div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      ₹{data.added.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
                      Spent
                    </div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      ₹{data.spent.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold mb-0.5">
                      Remaining
                    </div>
                    <div className="text-lg font-bold text-emerald-700 font-mono">
                      ₹{remaining.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${p === 'Meta' ? 'bg-violet-500' : 'bg-blue-500'}`}
                    style={{
                      width: `${Math.min(100, pct)}%`
                    }} />
                  
                </div>
              </div>);

          })}
        </div>
      </div>
      }

      {/* Next-month allocation confirmation banner */}
      {allocatedNextMonth !== null &&
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0" />
          <div className="flex-1 text-sm text-blue-900">
            ₹{allocatedNextMonth.toLocaleString('en-IN')} allocated for{' '}
            <span className="font-semibold">{nextMonthLabel}</span> media plan.
            Campaigns will go live on the 1st.
          </div>
          <button
          onClick={() => setAllocatedNextMonth(null)}
          className="text-blue-600 hover:bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center"
          aria-label="Dismiss">
          
            <X size={14} />
          </button>
        </div>
      }

      {/* Recommendation chips */}
      <div className="flex gap-3 flex-wrap">
        <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700 flex items-center gap-2">
          <Zap size={12} /> Scale Sarojini Nagar Hyperlocal — CPL is 12% below
          target
        </div>
        <div className="px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-xs font-medium text-orange-700 flex items-center gap-2">
          <Pause size={12} /> Consider pausing Neo QLED 8K — CPL trending up
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'active' ? 'bg-[var(--brand-indigo)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          
          Active
        </button>
        <button
          onClick={() => setTab('paused')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'paused' ? 'bg-[var(--brand-indigo)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          
          Paused
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-4">
        {filtered.length === 0 &&
        <div className="sp-card text-center py-12 text-gray-400">
            No {tab} campaigns
          </div>
        }
        {filtered.map((c) => {
          const remaining = c.monthlyBudget - c.spent;
          const showMetaCreative =
          c.platforms.includes('Meta') && (
          channel === 'all' || channel === 'Meta');
          const showGoogleAd =
          c.platforms.includes('Google') && (
          channel === 'all' || channel === 'Google');
          return (
            <div key={c.id} className="sp-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Zap size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{c.name}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {c.platforms.map((p) =>
                      <span
                        key={p}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 ${p === 'Meta' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                        
                          <span
                          className={`w-1.5 h-1.5 rounded-full ${p === 'Meta' ? 'bg-violet-500' : 'bg-blue-500'}`} />
                        
                          {p}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        · {c.product}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                        {c.objective}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${campaignStates[c.id] === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${campaignStates[c.id] === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    
                    {campaignStates[c.id] === 'active' ? 'Live' : 'Paused'}
                  </span>
                  <button
                    onClick={() => toggleCampaign(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${campaignStates[c.id] === 'active' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                    
                    {campaignStates[c.id] === 'active' ?
                    <>
                        <Pause size={12} /> Pause
                      </> :

                    <>
                        <Play size={12} /> Resume
                      </>
                    }
                  </button>
                </div>
              </div>

              {/* Targeting detail row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-gray-400" /> Started{' '}
                  {c.startDate}
                </span>
                <span>Audience · {c.audience}</span>
                <span>Placements · {c.placements}</span>
              </div>

              {/* Meta creative + preview + metrics */}
              <div
                className={`grid gap-4 ${showMetaCreative ? 'grid-cols-[132px_1fr]' : 'grid-cols-1'}`}>
                
                {showMetaCreative &&
                <div className="flex flex-col gap-1.5">
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                      <img
                      src={c.metaCreative}
                      alt={`${c.product} Meta creative`}
                      className="w-full h-full object-cover" />
                    
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-violet-600 text-white flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-white" /> Meta
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 text-center">
                      Active creative
                    </div>
                  </div>
                }

                <div className="flex flex-col gap-4 min-w-0">
                  {/* Metrics */}
                  <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-[11px] text-gray-500">Spent</div>
                      <div className="font-mono font-semibold text-sm">
                        ₹{c.spent.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        of ₹{c.monthlyBudget.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500">
                        Impressions
                      </div>
                      <div className="font-mono font-semibold text-sm">
                        {(c.impressions / 1000).toFixed(1)}K
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {c.clicks.toLocaleString()} clicks · {c.ctr}% CTR
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500">Leads</div>
                      <div className="font-mono font-semibold text-sm">
                        {c.leads}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium">
                        ₹{remaining.toLocaleString()} left
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500">CPL</div>
                      <div className="font-mono font-semibold text-sm flex items-center gap-1">
                        ₹{c.cpl}
                        <span
                          className={`text-[10px] flex items-center ${c.cplDelta < 0 ? 'text-green-600' : 'text-red-500'}`}>
                          
                          {c.cplDelta < 0 ?
                          <ArrowDownRight size={10} /> :

                          <ArrowUpRight size={10} />
                          }
                          {Math.abs(c.cplDelta)}%
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        vs last month
                      </div>
                    </div>
                  </div>

                  {/* Ad preview — Google search ad only. Meta is represented by its creative image, so no text ad copy is shown for Meta. */}
                  {showGoogleAd &&
                  <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Google Search Ad
                      </div>
                      {/* Advertiser row */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[#1428A0] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          S
                        </div>
                        <div className="leading-tight">
                          <div className="text-[13px] font-semibold text-gray-900">
                            Samsung
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {c.displayUrl}
                          </div>
                        </div>
                      </div>
                      {/* Headline */}
                      <a className="block text-[15px] leading-snug font-medium text-blue-700 hover:underline cursor-pointer mb-1">
                        {c.googleHeadline}
                      </a>
                      {/* Description */}
                      <div className="text-xs text-gray-600 mb-3">
                        {c.googleDesc}
                      </div>
                      <div className="border-t border-gray-100 pt-2.5 flex items-center gap-2 text-sm text-gray-800">
                        <Phone size={14} className="text-blue-600" />
                        <span className="font-medium">{c.phone}</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>);

        })}
      </div>

      {showMediaPlan &&
      <NextMonthMediaPlanModal
        plan={plan}
        monthOptions={planMonthOptions}
        walletBalance={walletBalance}
        onClose={() => setShowMediaPlan(false)}
        onTopUp={(amt) => setWalletBalance(walletBalance + amt)}
        onAllocate={(amt) => {
          setWalletBalance(walletBalance - amt);
          setAllocatedNextMonth(amt);
          setShowMediaPlan(false);
        }} />

      }
    </div>);

}
// ============================================================
// NEXT MONTH MEDIA PLAN MODAL
// ============================================================
type ModalStep = 'plan' | 'topup' | 'processing' | 'success';
type PlanMonthOption = {
  key: string;
  label: string;
  factor: number;
  live: boolean;
};
function NextMonthMediaPlanModal({
  plan,
  monthOptions,
  walletBalance,
  onClose,
  onTopUp,
  onAllocate







}: {plan: typeof NEXT_MONTH_PLANS.all;monthOptions: PlanMonthOption[];walletBalance: number;onClose: () => void;onTopUp: (amount: number) => void;onAllocate: (amount: number) => void;}) {
  const [step, setStep] = useState<ModalStep>('plan');
  const [activeMonthKey, setActiveMonthKey] = useState(monthOptions[0].key);
  const activeMonth =
  monthOptions.find((m) => m.key === activeMonthKey) ?? monthOptions[0];
  const monthLabel = activeMonth.label;
  // Plan figures scale with the selected month's factor
  const scaledRecommended = Math.round(plan.recommendedBudget * activeMonth.factor);
  const [budget, setBudget] = useState(scaledRecommended);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const switchMonth = (key: string) => {
    const m = monthOptions.find((o) => o.key === key);
    if (!m) return;
    setActiveMonthKey(key);
    setBudget(Math.round(plan.recommendedBudget * m.factor));
  };
  // Recompute leads + splits when budget changes; CPL constant
  const ratio = budget / scaledRecommended;
  const estLeads = Math.round(plan.estLeads * activeMonth.factor * ratio);
  const googleBudget = Math.round(budget * plan.googleSplit / 100);
  const metaBudget = budget - googleBudget;
  const googleLeads = Math.round(estLeads * plan.googleSplit / 100);
  const metaLeads = estLeads - googleLeads;
  const cpl = plan.cpl;
  const shortfall = Math.max(0, budget - walletBalance);
  const hasEnough = shortfall === 0;
  const isBelowRecommended = budget < MIN_RECOMMENDED_BUDGET;
  const handleAllocate = () => {
    if (!hasEnough) {
      setTopUpAmount(Math.max(shortfall, 5000));
      setStep('topup');
      return;
    }
    setStep('processing');
    setTimeout(() => {
      onAllocate(budget);
      setStep('success');
    }, 1200);
  };
  const handleTopUpAndAllocate = () => {
    setStep('processing');
    setTimeout(() => {
      onTopUp(topUpAmount);
      // After top-up, deduct allocation
      setTimeout(() => {
        onAllocate(budget);
        setStep('success');
      }, 100);
    }, 1500);
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={step === 'processing' ? undefined : onClose}>
      
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[760px] max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Calendar size={18} className="text-blue-500" />
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900">
                  {step === 'success' ?
                  'Budget allocated' :
                  `Media Plan · ${monthLabel}`}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {step === 'success' ?
                  `Your ${monthLabel} plan is locked in` :
                  activeMonth.live ?
                  'Live plan for the current month' :
                  'Forecast for the month ahead'}
                </div>
              </div>
            </div>
            {step !== 'processing' &&
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
              
                <X size={18} />
              </button>
            }
          </div>

          {/* Month selector — current month vs month ahead */}
          {(step === 'plan' || step === 'topup') &&
          <div className="flex items-center p-1 mt-4 rounded-full bg-gray-100 w-fit">
              {monthOptions.map((m) =>
            <button
              key={m.key}
              onClick={() => switchMonth(m.key)}
              className={`px-4 h-8 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${activeMonthKey === m.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              
                  {m.label.split(' ')[0]}
                  {m.live ?
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                      Live
                    </span> :

              <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold">
                      Ahead
                    </span>
              }
                </button>
            )}
            </div>
          }
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'plan' &&
          <div className="flex flex-col gap-5">
              {/* Headline KPIs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4">
                  <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Recommended budget
                  </div>
                  <div className="text-2xl font-bold font-mono">
                    ₹{budget.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-white/70 mt-1">
                    Suggested: ₹{scaledRecommended.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Estimated leads
                  </div>
                  <div className="text-2xl font-bold text-gray-900 font-mono">
                    {estLeads}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    Across all platforms
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Estimated CPL
                  </div>
                  <div className="text-2xl font-bold text-gray-900 font-mono">
                    ₹{cpl}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    Based on last 30 days
                  </div>
                </div>
              </div>

              {/* Budget editor */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Adjust budget
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Leads scale with budget. CPL stays at ₹{cpl} since
                      targeting is unchanged.
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ₹
                    </span>
                    <input
                    type="number"
                    value={budget || ''}
                    onChange={(e) =>
                    setBudget(Math.max(0, Number(e.target.value) || 0))
                    }
                    className="w-36 h-10 pl-6 pr-3 rounded-lg border border-gray-200 text-sm font-semibold text-right" />
                  
                  </div>
                </div>
                <input
                type="range"
                min={5000}
                max={scaledRecommended * 2}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-blue-500" />
              
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹5,000</span>
                  <span>
                    ₹{(scaledRecommended * 2).toLocaleString('en-IN')}
                  </span>
                </div>

                {isBelowRecommended &&
              <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <Info size={12} className="mt-0.5 flex-shrink-0" />
                    <span>
                      We recommend a minimum budget of ₹
                      {MIN_RECOMMENDED_BUDGET.toLocaleString('en-IN')} for
                      optimal results. You can still proceed.
                    </span>
                  </div>
              }
              </div>

              {/* Platform split */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Platform split
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Optimized per platform
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  {/* Stacked bar */}
                  <div className="flex h-2.5 w-full">
                    <div
                    className="bg-blue-500"
                    style={{
                      width: `${plan.googleSplit}%`
                    }} />
                  
                    <div
                    className="bg-violet-500"
                    style={{
                      width: `${plan.metaSplit}%`
                    }} />
                  
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-100">
                    <div className="p-3.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-xs font-semibold text-gray-900">
                            Google
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {plan.googleSplit}%
                        </span>
                      </div>
                      <div className="text-base font-bold text-gray-900 font-mono">
                        ₹{googleBudget.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        ~{googleLeads} leads
                      </div>
                    </div>
                    <div className="p-3.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-violet-500" />
                          <span className="text-xs font-semibold text-gray-900">
                            Meta
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {plan.metaSplit}%
                        </span>
                      </div>
                      <div className="text-base font-bold text-gray-900 font-mono">
                        ₹{metaBudget.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        ~{metaLeads} leads
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Per-campaign breakdown */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  By campaign
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                    <span>Campaign</span>
                    <span className="text-right">Budget</span>
                    <span className="text-right">Est. leads</span>
                    <span className="text-right">CPL</span>
                  </div>
                  {plan.breakdown.map((b) => {
                  const scaled = Math.round(
                    b.budget * activeMonth.factor * ratio
                  );
                  const scaledLeads = Math.round(
                    b.leads * activeMonth.factor * ratio
                  );
                  return (
                    <div
                      key={b.product}
                      className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 px-3 py-2.5 border-b border-gray-100 last:border-b-0 items-center text-xs">
                      
                        <span className="font-medium text-gray-900 truncate">
                          {b.product}
                        </span>
                        <span className="text-right font-mono text-gray-700">
                          ₹{scaled.toLocaleString('en-IN')}
                        </span>
                        <span className="text-right font-mono text-gray-700">
                          {scaledLeads}
                        </span>
                        <span className="text-right font-mono text-gray-500">
                          ₹{b.cpl}
                        </span>
                      </div>);

                })}
                </div>
              </div>
            </div>
          }

          {step === 'topup' &&
          <div className="flex flex-col gap-4">
              <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                <Info
                size={18}
                className="text-amber-600 mt-0.5 flex-shrink-0" />
              
                <div className="flex-1">
                  <div className="text-sm font-semibold text-amber-900 mb-1">
                    Add ₹{shortfall.toLocaleString('en-IN')} to wallet to
                    allocate this plan
                  </div>
                  <div className="text-xs text-amber-800">
                    Your wallet has ₹{walletBalance.toLocaleString('en-IN')} and
                    the plan needs ₹{budget.toLocaleString('en-IN')}. Top up the
                    difference (or more) and we'll allocate in one go.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Top-up amount
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                shortfall,
                shortfall + 5000,
                shortfall + 10000,
                shortfall + 25000].
                map((preset, i) => {
                  const selected = topUpAmount === preset;
                  return (
                    <button
                      key={i}
                      onClick={() => setTopUpAmount(preset)}
                      className={`py-2.5 rounded-lg border-2 text-xs font-semibold transition-all ${selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                      
                        ₹{preset.toLocaleString('en-IN')}
                        {i === 0 &&
                      <div className="text-[9px] font-medium text-gray-500 mt-0.5">
                            Exact
                          </div>
                      }
                      </button>);

                })}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    ₹
                  </span>
                  <input
                  type="number"
                  value={topUpAmount || ''}
                  onChange={(e) =>
                  setTopUpAmount(Math.max(0, Number(e.target.value) || 0))
                  }
                  className="w-full h-11 pl-7 pr-3 rounded-lg border border-gray-200 text-sm font-semibold"
                  placeholder="Custom amount" />
                
                </div>
              </div>

              {(() => {
              const topUpGst = Math.round(topUpAmount * 0.18);
              const topUpTds = Math.round(topUpAmount * 0.02);
              const payable = topUpAmount + topUpGst - topUpTds;
              return (
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-3.5 text-sm space-y-1.5">
                    <div className="flex justify-between text-gray-600">
                      <span>Wallet credit</span>
                      <span className="font-mono">
                        ₹{topUpAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST (18%)</span>
                      <span className="font-mono">
                        +₹{topUpGst.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        TDS (2%)
                        <span
                        title="TDS deducted at source under Section 194C. Form 16A certificate is shared at quarter end."
                        className="cursor-help text-gray-400">
                        
                          <Info size={11} />
                        </span>
                      </span>
                      <span className="font-mono text-emerald-700">
                        −₹{topUpTds.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-gray-900">
                      <span>Final payable today</span>
                      <span className="font-mono">
                        ₹{payable.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="pt-2 mt-1 border-t border-gray-200 text-[11px] text-gray-500 space-y-0.5">
                      <div className="flex justify-between">
                        <span>Wallet after top-up</span>
                        <span className="font-mono">
                          ₹
                          {(walletBalance + topUpAmount).toLocaleString(
                          'en-IN'
                        )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>− Allocate to {monthLabel}</span>
                        <span className="font-mono">
                          −₹{budget.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-700 pt-1">
                        <span>Wallet remaining</span>
                        <span className="font-mono">
                          ₹
                          {(
                        walletBalance +
                        topUpAmount -
                        budget).
                        toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>);

            })()}
            </div>
          }

          {step === 'processing' &&
          <div className="py-12 flex flex-col items-center text-center">
              <Loader2
              size={48}
              className="text-blue-500 animate-spin mb-4"
              strokeWidth={1.5} />
            
              <div className="text-base font-semibold text-gray-900 mb-1">
                Allocating budget…
              </div>
              <div className="text-sm text-gray-500">
                Reserving ₹{budget.toLocaleString('en-IN')} from your wallet
              </div>
            </div>
          }

          {step === 'success' &&
          <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 relative">
                <CheckCircle2 size={32} className="text-emerald-600" />
                <Sparkles
                size={14}
                className="absolute -top-1 -right-1 text-amber-400 fill-amber-400" />
              
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Budget allocated
              </div>
              <div className="text-sm text-gray-500 mb-5 max-w-[420px]">
                ₹{budget.toLocaleString('en-IN')} reserved for {monthLabel}.
                Your campaigns will go live on the 1st across Google and Meta.
              </div>
              <div className="w-full max-w-[420px] rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Plan</span>
                  <span className="font-medium text-gray-900">
                    {monthLabel}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Allocated</span>
                  <span className="font-mono text-gray-900">
                    ₹{budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated leads</span>
                  <span className="font-mono text-gray-900">{estLeads}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated CPL</span>
                  <span className="font-mono text-gray-900">₹{cpl}</span>
                </div>
              </div>
            </div>
          }
        </div>

        {/* Footer */}
        {step !== 'processing' &&
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            {step === 'success' ?
          <>
                <span className="text-xs text-gray-500">
                  You can adjust this anytime before the 1st.
                </span>
                <button
              onClick={onClose}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              
                  Done
                </button>
              </> :
          step === 'topup' ?
          <>
                <button
              onClick={() => setStep('plan')}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center gap-1.5">
              
                  <ArrowLeft size={14} /> Back
                </button>
                <button
              onClick={handleTopUpAndAllocate}
              disabled={topUpAmount < shortfall}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
              
                  <Plus size={14} /> Top up & allocate
                </button>
              </> :

          <>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Wallet size={12} />
                  Wallet · ₹{walletBalance.toLocaleString('en-IN')}
                  {!hasEnough &&
              <span className="text-amber-700 font-medium">
                      · short by ₹{shortfall.toLocaleString('en-IN')}
                    </span>
              }
                </div>
                <button
              onClick={handleAllocate}
              disabled={budget < 1000}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold transition-colors">
              
                  {hasEnough ?
              `Allocate ₹${budget.toLocaleString('en-IN')}` :
              'Add to wallet & allocate'}
                </button>
              </>
          }
          </div>
        }
      </div>
    </div>);

}