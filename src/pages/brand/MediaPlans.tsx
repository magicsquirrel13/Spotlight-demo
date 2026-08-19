import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Sparkles,
  Loader2,
  Mail,
  ArrowRight,
  FileText,
  Target,
  Zap,
  Download,
  ChevronRight,
  Filter,
  Search } from
'lucide-react';
// Pre-generated media plan data
const EXISTING_PLANS = [
{
  id: 'mp_apr26_v1',
  period: 'April 2026',
  state: 'locked',
  totalBudget: 41900000,
  brandFunded: 3720000,
  dealerFunded: 38180000,
  expectedLeads: 11240,
  blendedCpl: 372,
  dealers: 309,
  needsAttention: 38,
  createdAt: '25 Mar 2026, 02:13 IST',
  lockedAt: '28 Mar 2026, 16:45 IST'
},
{
  id: 'mp_mar26_v2',
  period: 'March 2026',
  state: 'live',
  totalBudget: 39200000,
  brandFunded: 3580000,
  dealerFunded: 35620000,
  expectedLeads: 10580,
  blendedCpl: 389,
  dealers: 305,
  needsAttention: 24,
  createdAt: '25 Feb 2026, 02:08 IST',
  lockedAt: '27 Feb 2026, 11:20 IST'
},
{
  id: 'mp_feb26_v1',
  period: 'February 2026',
  state: 'live',
  totalBudget: 36400000,
  brandFunded: 3290000,
  dealerFunded: 33110000,
  expectedLeads: 9820,
  blendedCpl: 401,
  dealers: 301,
  needsAttention: 18,
  createdAt: '25 Jan 2026, 02:11 IST',
  lockedAt: '26 Jan 2026, 14:32 IST'
}];

const GENERATION_STEPS = [
{
  id: 1,
  label: 'Resolving scope',
  desc: 'Identifying dealers and validating cohorts'
},
{
  id: 2,
  label: 'Loading context',
  desc: 'Pulling brand config, zone floors, historical CPL, wallet states'
},
{
  id: 3,
  label: 'Applying overrides',
  desc: 'Merging brand defaults, zone modifiers, and dealer-specific rules'
},
{
  id: 4,
  label: 'Running AI model',
  desc: 'Computing baseline, platform splits, and CPL targets per dealer'
},
{
  id: 5,
  label: 'Decomposing co-op',
  desc: 'Splitting brand-funded and dealer-funded portions'
},
{
  id: 6,
  label: 'Detecting risk flags',
  desc: 'Flagging rising CPL, wallet-critical, and cohort outliers'
},
{
  id: 7,
  label: 'Finalising plan',
  desc: 'Generating roll-up metrics and approval queue'
}];

export function MediaPlans() {
  const [showWizard, setShowWizard] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [viewingPlan, setViewingPlan] = useState<
    (typeof EXISTING_PLANS)[0] | null>(
    null);
  // Wizard state
  const [period, setPeriod] = useState('May 2026');
  const [scope, setScope] = useState('all_active');
  const [includeNew, setIncludeNew] = useState(true);
  const [budgetCap, setBudgetCap] = useState('4,00,00,000');
  const [coopCap, setCoopCap] = useState('40,00,000');
  // Trigger loader animation
  useEffect(() => {
    if (showLoader) {
      setActiveStep(0);
      GENERATION_STEPS.forEach((_, i) => {
        setTimeout(() => setActiveStep(i + 1), (i + 1) * 1100);
      });
      setTimeout(
        () => {
          setShowLoader(false);
          setShowSuccess(true);
        },
        GENERATION_STEPS.length * 1100 + 500
      );
    }
  }, [showLoader]);
  const handleSubmit = () => {
    setShowWizard(false);
    setTimeout(() => setShowLoader(true), 200);
  };
  const getStateBadge = (state: string) => {
    switch (state) {
      case 'locked':
        return (
          <span className="pill pill-submitted text-xs">Locked · Upcoming</span>);

      case 'live':
        return <span className="pill pill-done text-xs">Live</span>;
      case 'draft':
        return <span className="pill pill-pending text-xs">Draft</span>;
      default:
        return <span className="pill pill-muted text-xs">{state}</span>;
    }
  };
  // PLAN DETAIL VIEW
  if (viewingPlan) {
    return (
      <PlanDetailView plan={viewingPlan} onBack={() => setViewingPlan(null)} />);

  }
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Media Plans</h1>
          <p className="text-sm text-[var(--text-muted)]">
            AI-generated monthly media plans across your store network
          </p>
        </div>
        <button
          onClick={() => setShowWizard(true)}
          className="btn-primary flex items-center gap-2">
          
          <Sparkles size={14} /> Create New Plan
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
        {
          label: 'Current Month Spend',
          value: '₹39.2L',
          sub: 'March 2026',
          icon: DollarSign,
          color: 'text-blue-600 bg-blue-100'
        },
        {
          label: 'Active Stores',
          value: '305',
          sub: 'out of 312',
          icon: Users,
          color: 'text-green-600 bg-green-100'
        },
        {
          label: 'Expected Leads',
          value: '11.2K',
          sub: 'April 2026',
          icon: TrendingUp,
          color: 'text-orange-600 bg-orange-100'
        },
        {
          label: 'Brand Co-op Used',
          value: '97.9%',
          sub: '₹37.2L / ₹38L',
          icon: Target,
          color: 'text-purple-600 bg-purple-100'
        }].
        map((kpi) =>
        <div key={kpi.label} className="sp-card flex items-center gap-4">
            <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color}`}>
            
              <kpi.icon size={20} />
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)]">
                {kpi.label}
              </div>
              <div className="text-xl font-bold">{kpi.value}</div>
              <div className="text-[10px] text-[var(--text-muted)]">
                {kpi.sub}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plans List */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">All Plans</h2>
          <div className="flex gap-2">
            <button className="btn-outline-xs flex items-center gap-1.5">
              <Filter size={12} /> Filter
            </button>
          </div>
        </div>

        <table className="sp-table">
          <thead>
            <tr>
              <th>Plan ID</th>
              <th>Period</th>
              <th>Status</th>
              <th>Stores</th>
              <th>Total Budget</th>
              <th>Brand Co-op</th>
              <th>Est. Leads</th>
              <th>Blended CPL</th>
              <th>Flagged</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {EXISTING_PLANS.map((plan) =>
            <tr
              key={plan.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setViewingPlan(plan)}>
              
                <td className="font-mono text-xs text-[var(--brand-blue)]">
                  {plan.id}
                </td>
                <td className="font-medium">{plan.period}</td>
                <td>{getStateBadge(plan.state)}</td>
                <td className="font-mono">{plan.dealers}</td>
                <td className="font-mono">
                  ₹{(plan.totalBudget / 10000000).toFixed(2)} Cr
                </td>
                <td className="font-mono">
                  ₹{(plan.brandFunded / 100000).toFixed(1)} L
                </td>
                <td className="font-mono">
                  {plan.expectedLeads.toLocaleString()}
                </td>
                <td className="font-mono">₹{plan.blendedCpl}</td>
                <td>
                  {plan.needsAttention > 0 ?
                <span className="inline-flex items-center gap-1 text-orange-600 text-xs font-medium">
                      <AlertTriangle size={11} /> {plan.needsAttention}
                    </span> :

                <span className="text-xs text-gray-400">—</span>
                }
                </td>
                <td>
                  <ChevronRight size={14} className="text-gray-400" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ============ WIZARD MODAL ============ */}
      {showWizard &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-indigo)] flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Create New Media Plan</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    AI-powered planning across your store network
                  </p>
                </div>
              </div>
              <button onClick={() => setShowWizard(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Period */}
              <div>
                <label className="field-label mb-1.5">Planning Period</label>
                <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full">
                
                  <option>May 2026</option>
                  <option>June 2026</option>
                  <option>July 2026</option>
                  <option>Custom range...</option>
                </select>
              </div>

              {/* Scope */}
              <div>
                <label className="field-label mb-2">Store Scope</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                {
                  id: 'all_active',
                  label: 'All active stores',
                  desc: '305 stores'
                },
                {
                  id: 'by_zone',
                  label: 'By zone',
                  desc: 'North / South / East / West'
                },
                {
                  id: 'by_state',
                  label: 'By state',
                  desc: 'Pick specific states'
                },
                {
                  id: 'specific',
                  label: 'Specific stores',
                  desc: 'Custom selection'
                }].
                map((opt) =>
                <button
                  key={opt.id}
                  onClick={() => setScope(opt.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${scope === opt.id ? 'border-[var(--brand-blue)] bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  
                      <div className="text-sm font-medium">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </button>
                )}
                </div>
              </div>

              {/* Budget caps */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label mb-1.5">
                    Total Budget Cap (₹)
                  </label>
                  <input
                  type="text"
                  value={budgetCap}
                  onChange={(e) => setBudgetCap(e.target.value)}
                  className="w-full" />
                
                  <div className="text-[10px] text-[var(--text-muted)] mt-1">
                    Monthly hard ceiling across all dealers
                  </div>
                </div>
                <div>
                  <label className="field-label mb-1.5">
                    Brand Co-op Pool (₹)
                  </label>
                  <input
                  type="text"
                  value={coopCap}
                  onChange={(e) => setCoopCap(e.target.value)}
                  className="w-full" />
                
                  <div className="text-[10px] text-[var(--text-muted)] mt-1">
                    Brand-funded portion across plan
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                  type="checkbox"
                  checked={includeNew}
                  onChange={(e) => setIncludeNew(e.target.checked)}
                  className="w-4 h-4 rounded" />
                
                  <span className="text-sm">
                    Include new stores (&lt;30 days) with cohort-median
                    fallback
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded" />
                
                  <span className="text-sm">
                    Apply seasonal modifier (Festive +12% for North zone)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded" />
                
                  <span className="text-sm">
                    Auto-rebalance if Meta CPL exceeds 2× Search
                  </span>
                </label>
              </div>

              {/* AI hint */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
                <Sparkles
                size={16}
                className="text-blue-600 mt-0.5 flex-shrink-0" />
              
                <div className="text-xs text-blue-700">
                  Spotlight AI will run a 7-stage planning algorithm across all
                  selected stores, using historical CPL data, zone floors,
                  wallet states, and co-op rules. Estimated time:{' '}
                  <strong>~30 seconds for 305 stores</strong>.
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
              <button
              onClick={() => setShowWizard(false)}
              className="btn-outline">
              
                Cancel
              </button>
              <button
              onClick={handleSubmit}
              className="btn-primary flex items-center gap-2">
              
                <Sparkles size={14} /> Generate Plan
              </button>
            </div>
          </div>
        </div>
      }

      {/* ============ LOADER MODAL ============ */}
      {showLoader &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 relative">
                <Sparkles size={28} className="text-blue-600" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                AI is generating your media plan
              </h3>
              <p className="text-sm text-gray-500">
                {period} · 305 stores · Running 7-stage algorithm
              </p>
            </div>

            <div className="space-y-3">
              {GENERATION_STEPS.map((step, i) =>
            <motion.div
              key={step.id}
              initial={{
                opacity: 0.3
              }}
              animate={{
                opacity: activeStep > i ? 1 : activeStep === i ? 1 : 0.3
              }}
              className="flex items-start gap-3">
              
                  {activeStep > i ?
              <CheckCircle
                size={18}
                className="text-green-500 flex-shrink-0 mt-0.5" /> :

              activeStep === i ?
              <Loader2
                size={18}
                className="text-blue-500 animate-spin flex-shrink-0 mt-0.5" /> :


              <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200 flex-shrink-0 mt-0.5" />
              }
                  <div>
                    <div
                  className={`text-sm font-medium ${activeStep > i ? 'text-green-700' : activeStep === i ? 'text-blue-700' : 'text-gray-400'}`}>
                  
                      Stage {step.id}: {step.label}
                    </div>
                    <div className="text-xs text-gray-500">{step.desc}</div>
                  </div>
                </motion.div>
            )}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <div className="text-xs text-gray-500">
                You can close this window. We'll <strong>email you</strong> when
                the plan is ready.
              </div>
            </div>
          </div>
        </div>
      }

      {/* ============ SUCCESS MODAL ============ */}
      {showSuccess &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Media Plan Generated! 🎉
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Your {period} plan is ready for review.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-5 flex items-start gap-2">
              <Mail size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-700 text-left">
                A detailed summary email has been sent to{' '}
                <strong>admin@samsung.com</strong> with the roll-up metrics and
                approval queue link.
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-base">305</div>
                <div className="text-[10px] text-gray-500">Stores</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-base">₹4.2 Cr</div>
                <div className="text-[10px] text-gray-500">Total Budget</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-base">11.4K</div>
                <div className="text-[10px] text-gray-500">Est. Leads</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
              onClick={() => setShowSuccess(false)}
              className="btn-outline flex-1">
              
                Close
              </button>
              <button
              onClick={() => {
                setShowSuccess(false);
                setViewingPlan(EXISTING_PLANS[0]);
              }}
              className="btn-primary flex-1 flex items-center justify-center gap-2">
              
                Review Plan <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}
// ===================== PLAN DETAIL VIEW =====================
function PlanDetailView({
  plan,
  onBack



}: {plan: (typeof EXISTING_PLANS)[0];onBack: () => void;}) {
  const FLAGS = [
  {
    name: 'Rising CPL (≥10% MoM)',
    count: 17,
    action: 'Review creative refresh',
    severity: 'orange'
  },
  {
    name: 'Meta CPL > 2× Search',
    count: 9,
    action: 'Auto-rebalance applied',
    severity: 'blue'
  },
  {
    name: 'Cold start (new store)',
    count: 5,
    action: 'Approve estimate or set manual baseline',
    severity: 'purple'
  },
  {
    name: 'Floor hit (CPL clamped)',
    count: 4,
    action: 'Review for historical anomaly',
    severity: 'yellow'
  },
  {
    name: 'Wallet critical (<2d runway)',
    count: 2,
    action: 'Notify store to top up',
    severity: 'red'
  },
  {
    name: 'Co-op cap near (>95%)',
    count: 1,
    action: 'Reserve last 2% for mid-month',
    severity: 'gray'
  }];

  const SAMPLE_DEALERS = [
  {
    name: 'Samsung SmartPlaza – Capital Electronics',
    city: 'Mumbai',
    zone: 'West',
    budget: 142000,
    brand: 12800,
    dealer: 129200,
    cpl: 348,
    leads: 408,
    flags: ['rising_cpl']
  },
  {
    name: 'Samsung SmartPlaza – Sahil Electronics',
    city: 'Gurgoan',
    zone: 'North',
    budget: 165000,
    brand: 14850,
    dealer: 150150,
    cpl: 312,
    leads: 528,
    flags: []
  },
  {
    name: 'Samsung SmartPlaza – Metro Digital',
    city: 'Bangalore',
    zone: 'South',
    budget: 138000,
    brand: 12420,
    dealer: 125580,
    cpl: 379,
    leads: 364,
    flags: ['meta_over_2x']
  },
  {
    name: 'Samsung SmartPlaza – Star Digital',
    city: 'Chennai',
    zone: 'South',
    budget: 128000,
    brand: 11520,
    dealer: 116480,
    cpl: 401,
    leads: 319,
    flags: []
  },
  {
    name: 'Samsung SmartPlaza – Prime Retail',
    city: 'Pune',
    zone: 'West',
    budget: 119000,
    brand: 10710,
    dealer: 108290,
    cpl: 388,
    leads: 307,
    flags: ['floor_hit']
  },
  {
    name: 'Samsung SmartPlaza – Nexus Digital',
    city: 'Jaipur',
    zone: 'North',
    budget: 95000,
    brand: 8550,
    dealer: 86450,
    cpl: 425,
    leads: 224,
    flags: ['cold_start']
  }];

  const severityColors: Record<string, string> = {
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200'
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-[var(--brand-blue)] hover:underline mb-1">
            
            ← Back to Media Plans
          </button>
          <div className="flex items-center gap-3">
            <h1 className="page-title">{plan.period} Media Plan</h1>
            <span className="pill pill-submitted">Locked · Upcoming</span>
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">
            <span className="font-mono">{plan.id}</span> · Created{' '}
            {plan.createdAt} · Locked {plan.lockedAt}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download size={14} /> Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            Approve & Ship
          </button>
        </div>
      </div>

      {/* Roll-up Metrics */}
      <div className="sp-card">
        <h2 className="card-title mb-4">Roll-up Metrics</h2>
        <div className="grid grid-cols-6 gap-3">
          {[
          {
            label: 'Total Budget',
            value: `₹${(plan.totalBudget / 10000000).toFixed(2)} Cr`,
            color: 'text-gray-900'
          },
          {
            label: 'Brand-Funded',
            value: `₹${(plan.brandFunded / 100000).toFixed(1)} L`,
            sub: '97.9% of cap',
            color: 'text-blue-600'
          },
          {
            label: 'Store-Funded',
            value: `₹${(plan.dealerFunded / 10000000).toFixed(2)} Cr`,
            color: 'text-gray-900'
          },
          {
            label: 'Expected Leads',
            value: plan.expectedLeads.toLocaleString(),
            color: 'text-green-600'
          },
          {
            label: 'Blended CPL',
            value: `₹${plan.blendedCpl}`,
            color: 'text-gray-900'
          },
          {
            label: 'Need Attention',
            value: `${plan.needsAttention} / ${plan.dealers}`,
            color: 'text-orange-600'
          }].
          map((m) =>
          <div key={m.label} className="bg-gray-50 rounded-lg p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                {m.label}
              </div>
              <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
              {m.sub &&
            <div className="text-[10px] text-[var(--text-muted)]">
                  {m.sub}
                </div>
            }
            </div>
          )}
        </div>
      </div>

      {/* Flag Grouping */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">Flagged Stores — Grouped by Reason</h2>
          <span className="text-xs text-[var(--text-muted)]">
            {plan.needsAttention} stores across 6 categories
          </span>
        </div>
        <div className="space-y-2">
          {FLAGS.map((f) =>
          <div
            key={f.name}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            
              <div className="flex items-center gap-3">
                <div
                className={`px-2.5 py-1 rounded-md text-xs font-bold border ${severityColors[f.severity]}`}>
                
                  {f.count}
                </div>
                <div>
                  <div className="text-sm font-medium">{f.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {f.action}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-outline-xs">Review</button>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Approval Queue */}
      <div className="grid grid-cols-2 gap-4">
        <div className="sp-card bg-green-50 border-green-200">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle size={20} className="text-green-600 mt-0.5" />
            <div>
              <div className="font-semibold text-green-900">
                Auto-Approve Eligible
              </div>
              <div className="text-sm text-green-700 mt-1">
                271 plans below the threshold — one click approves all
              </div>
            </div>
          </div>
          <button className="btn-primary-sm bg-green-600 hover:bg-green-700 w-full">
            Approve All 271
          </button>
        </div>
        <div className="sp-card bg-orange-50 border-orange-200">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={20} className="text-orange-600 mt-0.5" />
            <div>
              <div className="font-semibold text-orange-900">
                Pending Manual Review
              </div>
              <div className="text-sm text-orange-700 mt-1">
                38 plans above threshold or flagged — each needs a human OK
              </div>
            </div>
          </div>
          <button className="btn-primary-sm bg-orange-600 hover:bg-orange-700 w-full">
            Review Queue
          </button>
        </div>
      </div>

      {/* Sample Dealer Plans */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">Sample Store Plans</h2>
          <div className="relative">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            
            <input
              placeholder="Search store..."
              className="h-[32px] text-xs"
              style={{
                paddingLeft: '36px'
              }} />
            
          </div>
        </div>
        <table className="sp-table">
          <thead>
            <tr>
              <th>Store</th>
              <th>City · Zone</th>
              <th>Budget</th>
              <th>Brand-Funded</th>
              <th>Store-Funded</th>
              <th>Target CPL</th>
              <th>Expected Leads</th>
              <th>Flags</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DEALERS.map((d) =>
            <tr key={d.name}>
                <td className="font-medium">{d.name}</td>
                <td className="text-sm">
                  {d.city} · {d.zone}
                </td>
                <td className="font-mono">₹{d.budget.toLocaleString()}</td>
                <td className="font-mono text-blue-600">
                  ₹{d.brand.toLocaleString()}
                </td>
                <td className="font-mono">₹{d.dealer.toLocaleString()}</td>
                <td className="font-mono">₹{d.cpl}</td>
                <td className="font-mono">{d.leads}</td>
                <td>
                  {d.flags.length > 0 ?
                <div className="flex gap-1">
                      {d.flags.map((f) =>
                  <span
                    key={f}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200">
                    
                          {f.replace('_', ' ')}
                        </span>
                  )}
                    </div> :

                <span className="text-xs text-gray-400">—</span>
                }
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-xs text-[var(--text-muted)] mt-3 text-center">
          Showing 6 of 305 store plans
        </div>
      </div>
    </div>);

}