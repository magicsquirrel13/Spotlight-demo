import React, { useState } from 'react';
import {
  CheckCircle,
  Star,
  Shield,
  Zap,
  Mic,
  BarChart3,
  Palette,
  MapPin,
  Headphones,
  X,
  CreditCard,
  Smartphone,
  Building2,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Info,
  Download,
  Wallet,
  Coins,
  Plus,
  PhoneCall } from
'lucide-react';
const BASE_MONTHLY = 12000;
const CADENCES = [
{
  id: '3',
  label: '3 Months',
  months: 3,
  price: BASE_MONTHLY,
  discount: 0
},
{
  id: '6',
  label: '6 Months',
  months: 6,
  price: Math.round(BASE_MONTHLY * 0.85),
  discount: 15,
  badge: 'Most Popular'
},
{
  id: '12',
  label: '12 Months',
  months: 12,
  price: Math.round(BASE_MONTHLY * 0.8),
  discount: 20,
  badge: 'Best Value'
}];

const INCLUSIONS = [
{
  category: 'Campaigns',
  icon: Zap,
  items: [
  'Unlimited active campaigns',
  'Google + Meta + Retail Portal',
  'AI-optimised budget allocation',
  'Hyperlocal targeting']

},
{
  category: 'AI & Automation',
  icon: Mic,
  items: [
  'AI Voice Agent for inbound calls',
  'AI-powered lead qualification',
  'Creative AI composer',
  'Smart recommendations']

},
{
  category: 'Analytics & Reporting',
  icon: BarChart3,
  items: [
  'Full AI Analytics dashboard',
  'Cross-campaign reporting',
  'Lead scoring & insights',
  'Monthly performance summaries']

},
{
  category: 'Locations & Service',
  icon: MapPin,
  items: [
  'Unlimited locations',
  'Dedicated account manager',
  'Priority support',
  'Onboarding assistance']

}];

const COST_PER_TOKEN = 2;
const TOKEN_PACKS = [
{
  tokens: 100,
  popular: false
},
{
  tokens: 500,
  popular: true
},
{
  tokens: 2000,
  popular: false
}];

export function Subscription() {
  const [selectedCadence, setSelectedCadence] = useState('6');
  const [activePlan, setActivePlan] = useState<{
    cadenceId: string;
    renewsOn: string;
  }>({
    cadenceId: '6',
    renewsOn: '15 Nov 2026'
  });
  const [showPayment, setShowPayment] = useState(false);
  // Add-on state
  const [tokenBalance, setTokenBalance] = useState(1247);
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const current = CADENCES.find((c) => c.id === selectedCadence)!;
  const activePlanCadence = CADENCES.find((c) => c.id === activePlan.cadenceId)!;
  const totalPrice = current.price * current.months;
  const baseTotal = BASE_MONTHLY * current.months;
  const savings = baseTotal - totalPrice;
  const handleSubscriptionSuccess = () => {
    // Compute new renewal date
    const renew = new Date();
    renew.setMonth(renew.getMonth() + current.months);
    const renewLabel = renew.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    setActivePlan({
      cadenceId: selectedCadence,
      renewsOn: renewLabel
    });
  };
  const handleTokenPurchase = (pack: number) => {
    setTokenBalance(tokenBalance + pack);
    setSelectedPack(null);
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Subscription</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Manage your Spotlight subscription
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="sp-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--brand-indigo)] flex items-center justify-center">
              <Star size={20} className="text-white" fill="white" />
            </div>
            <div>
              <div className="text-xs text-blue-600 font-semibold tracking-wide mb-0.5">
                CURRENT PLAN
              </div>
              <div className="text-lg font-bold text-gray-900">
                Spotlight Velocity Pro
              </div>
              <div className="text-sm text-gray-500">
                ₹{activePlanCadence.price.toLocaleString()}/mo ·{' '}
                {activePlanCadence.label.toLowerCase()} plan · Renews{' '}
                {activePlan.renewsOn}
              </div>
            </div>
          </div>
          <span className="pill pill-done">Active</span>
        </div>
      </div>

      {/* Single Package Card with Duration Toggle */}
      <div className="sp-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand-indigo)] flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Spotlight Velocity Pro
            </h2>
            <p className="text-sm text-gray-500">
              Full-stack hyperlocal lead generation for your retail store
            </p>
          </div>
        </div>

        {/* Duration Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {CADENCES.map((c) =>
          <button
            key={c.id}
            onClick={() => setSelectedCadence(c.id)}
            className={`relative p-5 rounded-xl border-2 text-center transition-all ${selectedCadence === c.id ? 'border-[var(--brand-indigo)] bg-[#F5F3FF] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
            
              {c.badge &&
            <span
              className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold rounded-full whitespace-nowrap ${c.badge === 'Most Popular' ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'}`}>
              
                  {c.badge}
                </span>
            }
              <div className="text-sm font-semibold text-gray-700 mb-2">
                {c.label}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                ₹{c.price.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mb-2">per month</div>
              {c.discount > 0 ?
            <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400 line-through">
                    ₹{BASE_MONTHLY.toLocaleString()}/mo
                  </span>
                  <span className="text-xs font-semibold text-green-600">
                    Save {c.discount}%
                  </span>
                </div> :

            <div className="text-xs text-gray-400">No discount</div>
            }
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm font-semibold text-gray-900">
                  ₹{(c.price * c.months).toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-500">billed once</div>
              </div>
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Plan</span>
            <span className="text-sm font-medium">
              Velocity Pro · {current.label}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Monthly rate</span>
            <span className="text-sm font-medium">
              ₹{current.price.toLocaleString()}/mo
            </span>
          </div>
          {savings > 0 &&
          <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">You save</span>
              <span className="text-sm font-semibold text-green-600">
                ₹{savings.toLocaleString()}
              </span>
            </div>
          }
          <div className="h-px bg-gray-200 my-3"></div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">
              Total (billed once)
            </span>
            <span className="text-lg font-bold text-gray-900">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-400 text-right">
            + GST as applicable
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setShowPayment(true)}
          className="w-full py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold hover:bg-[#1a0a8a] transition-colors text-sm">
          
          Subscribe — ₹{totalPrice.toLocaleString()} for {current.months} months
        </button>
      </div>

      {/* What's Included */}
      <div className="sp-card">
        <h3 className="card-title mb-6">Everything included in your plan</h3>
        <div className="grid grid-cols-2 gap-6">
          {INCLUSIONS.map((group) =>
          <div key={group.category}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <group.icon size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {group.category}
                </span>
              </div>
              <div className="space-y-2 pl-10">
                {group.items.map((item) =>
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-gray-600">
                
                    <CheckCircle
                  size={14}
                  className="text-green-500 flex-shrink-0" />
                
                    {item}
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add-ons */}
      <div className="sp-card">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="card-title">Add-ons</h3>
            <p className="text-xs text-gray-500 mt-1">
              Boost your plan with optional capabilities. Pay-as-you-go.
            </p>
          </div>
        </div>

        {/* AI Voice Agent add-on */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-start justify-between p-5 bg-gradient-to-r from-purple-50/50 to-white">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                <Mic size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-base font-bold text-gray-900">
                    AI Voice Agent
                  </div>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 border border-purple-200 rounded-full px-2 py-0.5">
                    ACTIVE
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 max-w-[520px]">
                  Auto-qualifies inbound leads with natural voice conversations.
                  Buy token packs to scale usage — 1 token ≈ 1 call-minute.
                </p>
              </div>
            </div>
          </div>

          {/* Balance + history strip */}
          <div className="border-t border-gray-100 bg-purple-50/30 p-5">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-5">
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-purple-700 mb-1.5">
                  Token balance
                </div>
                <div className="flex items-baseline gap-1.5">
                  <div className="text-2xl font-bold text-gray-900 font-mono">
                    {tokenBalance.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    / {(tokenBalance + 253).toLocaleString()} tokens
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, tokenBalance / (tokenBalance + 253) * 100)}%`
                    }} />
                  
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  253 tokens used this cycle · ~{tokenBalance.toLocaleString()}{' '}
                  call-minutes left
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                  Last top-up
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  500 tokens
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  on 02 May 2026
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  ₹1,000 · UPI
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                  Active since
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  15 Mar 2026
                </div>
                <div className="text-xs text-gray-500 mt-0.5">2 months ago</div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 mb-1.5">
                  Tokens expire
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  02 May 2027
                </div>
                <div className="text-xs text-gray-500 mt-0.5">in 11 months</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Coins size={11} className="text-purple-500" />
                <span>₹{COST_PER_TOKEN} per token + GST</span>
                <span className="text-gray-300">·</span>
                <span>Tokens valid for 12 months from purchase</span>
              </div>
              <button className="text-purple-600 hover:underline font-medium">
                View all purchases →
              </button>
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Top up tokens
            </div>
            <div className="grid grid-cols-3 gap-3">
              {TOKEN_PACKS.map((pack) => {
                const price = pack.tokens * COST_PER_TOKEN;
                const pricePerToken = COST_PER_TOKEN;
                return (
                  <div
                    key={pack.tokens}
                    className={`relative rounded-xl border-2 p-4 transition-all ${pack.popular ? 'border-purple-500 bg-purple-50/40' : 'border-gray-200'}`}>
                    
                    {pack.popular &&
                    <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-600 text-white">
                        Most Popular
                      </span>
                    }
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-bold text-gray-900">
                        Pack of {pack.tokens.toLocaleString()}
                      </div>
                      <Coins size={14} className="text-purple-500" />
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {pack.tokens.toLocaleString()} tokens ≈{' '}
                      {pack.tokens.toLocaleString()} call-minutes
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <div className="text-2xl font-bold text-gray-900 font-mono">
                        ₹{price.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-400 mb-3">
                      ₹{pricePerToken}/token · + GST
                    </div>
                    <button
                      onClick={() => setSelectedPack(pack.tokens)}
                      className={`w-full h-9 rounded-full text-xs font-semibold transition-colors ${pack.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'}`}>
                      
                      Buy this pack
                    </button>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>

      {showPayment &&
      <SubscriptionPaymentModal
        cadence={current}
        totalPrice={totalPrice}
        savings={savings}
        onClose={() => setShowPayment(false)}
        onSuccess={handleSubscriptionSuccess} />

      }

      {selectedPack !== null &&
      <AddOnPaymentModal
        tokens={selectedPack}
        costPerToken={COST_PER_TOKEN}
        onClose={() => setSelectedPack(null)}
        onSuccess={handleTokenPurchase} />

      }
    </div>);

}
// ============================================================
// Add-on Payment Modal — Token packs for AI Voice Agent
// ============================================================
function AddOnPaymentModal({
  tokens,
  costPerToken,
  onClose,
  onSuccess





}: {tokens: number;costPerToken: number;onClose: () => void;onSuccess: (tokens: number) => void;}) {
  const [step, setStep] = useState<PayStep>('review');
  const [method, setMethod] = useState<PayMethod>('upi');
  const subtotal = tokens * costPerToken;
  const gst = Math.round(subtotal * 0.18);
  const tds = Math.round(subtotal * 0.02);
  const grandTotal = subtotal + gst - tds;
  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      onSuccess(tokens);
      setStep('success');
    }, 1400);
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={step === 'processing' ? undefined : onClose}>
      
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
              <Mic size={16} className="text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {step === 'success' ?
                `${tokens} tokens added` :
                'Buy AI Voice tokens'}
              </div>
              <div className="text-xs text-gray-500">
                Pack of {tokens.toLocaleString()} · ₹{costPerToken}/token
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'review' &&
          <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Coins size={18} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">
                    Pack of {tokens.toLocaleString()} tokens
                  </div>
                  <div className="text-xs text-gray-500">
                    ~{tokens.toLocaleString()} inbound call-minutes
                  </div>
                </div>
                <div className="text-base font-bold text-gray-900 font-mono">
                  ₹{subtotal.toLocaleString()}
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="font-mono">+₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    TDS (2%)
                    <span
                    title="TDS deducted at source under Section 194J. Form 16A certificate is shared at quarter end."
                    className="cursor-help text-gray-400">
                    
                      <Info size={11} />
                    </span>
                  </span>
                  <span className="font-mono text-emerald-700">
                    −₹{tds.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-gray-900">
                  <span>You pay today</span>
                  <span className="font-mono">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-purple-50 border border-purple-100 p-3 text-xs text-purple-800 flex items-start gap-2">
                <Info size={12} className="mt-0.5 flex-shrink-0" />
                <span>
                  Tokens never expire. They'll be added to your wallet
                  immediately after payment.
                </span>
              </div>
            </div>
          }

          {step === 'method' &&
          <div className="flex flex-col gap-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">
                Choose payment method
              </div>
              {[
            {
              id: 'upi' as const,
              icon: <Smartphone size={18} />,
              label: 'UPI',
              description: 'HDFC ****4521 · Default',
              badge: 'Instant'
            },
            {
              id: 'card' as const,
              icon: <CreditCard size={18} />,
              label: 'Credit / Debit Card',
              description: 'ICICI ****8836',
              badge: null
            },
            {
              id: 'netbanking' as const,
              icon: <Building2 size={18} />,
              label: 'Net Banking',
              description: '30+ banks supported',
              badge: null
            }].
            map((m) => {
              const selected = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${selected ? 'border-purple-500 bg-purple-50/40' : 'border-gray-200 hover:border-gray-300'}`}>
                  
                    <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${selected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    
                      {m.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-gray-900">
                        {m.label}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {m.description}
                      </span>
                    </span>
                    {m.badge &&
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        {m.badge}
                      </span>
                  }
                    {selected &&
                  <CheckCircle2 size={18} className="text-purple-600" />
                  }
                  </button>);

            })}
            </div>
          }

          {step === 'processing' &&
          <div className="py-12 flex flex-col items-center text-center">
              <Loader2
              size={48}
              className="text-purple-600 animate-spin mb-4"
              strokeWidth={1.5} />
            
              <div className="text-base font-semibold text-gray-900 mb-1">
                Processing your payment
              </div>
              <div className="text-sm text-gray-500">
                Charging ₹{grandTotal.toLocaleString()}. Don't close this
                window.
              </div>
            </div>
          }

          {step === 'success' &&
          <div className="py-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 relative">
                <CheckCircle2 size={32} className="text-emerald-600" />
                <Sparkles
                size={14}
                className="absolute -top-1 -right-1 text-amber-400 fill-amber-400" />
              
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {tokens.toLocaleString()} tokens added
              </div>
              <div className="text-sm text-gray-500 mb-5 max-w-[380px]">
                Your AI Voice Agent is ready to handle more inbound calls. A GST
                invoice has been emailed to your account.
              </div>
              <div className="w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Add-on</span>
                  <span className="font-medium text-gray-900">
                    AI Voice Agent · {tokens.toLocaleString()} tokens
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transaction ID</span>
                  <span className="font-mono text-gray-900">
                    AOT{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Method</span>
                  <span className="font-medium text-gray-900">
                    {method === 'upi' ?
                  'UPI · HDFC ****4521' :
                  method === 'card' ?
                  'Card · ICICI ****8836' :
                  'NetBanking · SBI'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Amount charged</span>
                  <span className="font-mono text-gray-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>
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
                <button className="text-xs font-medium text-purple-600 hover:underline flex items-center gap-1">
                  <Download size={12} /> Download invoice
                </button>
                <button
              onClick={onClose}
              className="h-9 px-5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors">
              
                  Done
                </button>
              </> :
          step === 'method' ?
          <>
                <button
              onClick={() => setStep('review')}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center gap-1.5">
              
                  <ArrowLeft size={14} /> Back
                </button>
                <button
              onClick={handlePay}
              className="h-9 px-5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors">
              
                  Pay ₹{grandTotal.toLocaleString()}
                </button>
              </> :

          <>
                <button
              onClick={onClose}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium">
              
                  Cancel
                </button>
                <button
              onClick={() => setStep('method')}
              className="h-9 px-5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors">
              
                  Continue to payment
                </button>
              </>
          }
          </div>
        }
      </div>
    </div>);

}
// ============================================================
// Subscription Payment Modal
// ============================================================
type PayStep = 'review' | 'method' | 'processing' | 'success';
type PayMethod = 'upi' | 'card' | 'netbanking';
function SubscriptionPaymentModal({
  cadence,
  totalPrice,
  savings,
  onClose,
  onSuccess






}: {cadence: (typeof CADENCES)[number];totalPrice: number;savings: number;onClose: () => void;onSuccess: () => void;}) {
  const [step, setStep] = useState<PayStep>('review');
  const [method, setMethod] = useState<PayMethod>('upi');
  const gst = Math.round(totalPrice * 0.18);
  const tds = Math.round(totalPrice * 0.02);
  const grandTotal = totalPrice + gst - tds;
  const renewLabel = new Date(
    Date.now() + cadence.months * 30 * 86400000
  ).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      onSuccess();
      setStep('success');
    }, 1600);
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={step === 'processing' ? undefined : onClose}>
      
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[540px] max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <Star size={16} className="text-blue-500" fill="currentColor" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {step === 'success' ?
                'Subscription activated' :
                'Subscribe to Velocity Pro'}
              </div>
              <div className="text-xs text-gray-500">
                {cadence.label} · ₹{cadence.price.toLocaleString()}/mo
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'review' &&
          <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
                  Plan summary
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Spotlight Velocity Pro
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {cadence.label}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Monthly rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{cadence.price.toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Renews on</span>
                  <span className="text-sm font-medium text-gray-900">
                    {renewLabel}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                {savings > 0 &&
              <div className="flex justify-between text-emerald-700">
                    <span>Multi-month discount ({cadence.discount}%)</span>
                    <span className="font-mono">
                      −₹{savings.toLocaleString()} already applied
                    </span>
                  </div>
              }
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="font-mono">+₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    TDS (2%)
                    <span
                    title="TDS deducted at source under Section 194J. Form 16A certificate is shared at quarter end."
                    className="cursor-help text-gray-400">
                    
                      <Info size={11} />
                    </span>
                  </span>
                  <span className="font-mono text-emerald-700">
                    −₹{tds.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-gray-900">
                  <span>You pay today</span>
                  <span className="font-mono">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700 flex items-start gap-2">
                <Info size={12} className="mt-0.5 flex-shrink-0" />
                <span>
                  One-time payment for the full {cadence.months}-month term.
                  Cancel anytime before renewal — no recurring auto-charge.
                </span>
              </div>
            </div>
          }

          {step === 'method' &&
          <div className="flex flex-col gap-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">
                Choose payment method
              </div>
              {[
            {
              id: 'upi' as const,
              icon: <Smartphone size={18} />,
              label: 'UPI',
              description: 'HDFC ****4521 · Default',
              badge: 'Instant'
            },
            {
              id: 'card' as const,
              icon: <CreditCard size={18} />,
              label: 'Credit / Debit Card',
              description: 'ICICI ****8836',
              badge: null
            },
            {
              id: 'netbanking' as const,
              icon: <Building2 size={18} />,
              label: 'Net Banking',
              description: '30+ banks supported',
              badge: null
            }].
            map((m) => {
              const selected = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${selected ? 'border-blue-500 bg-blue-50/40' : 'border-gray-200 hover:border-gray-300'}`}>
                  
                    <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    
                      {m.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-gray-900">
                        {m.label}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {m.description}
                      </span>
                    </span>
                    {m.badge &&
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        {m.badge}
                      </span>
                  }
                    {selected &&
                  <CheckCircle2 size={18} className="text-blue-500" />
                  }
                  </button>);

            })}
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 mt-1 text-xs text-gray-600 flex items-start gap-2">
                <Shield
                size={12}
                className="mt-0.5 flex-shrink-0 text-gray-400" />
              
                <span>
                  Secured by Spotlight Pay. Your card details are never stored
                  on our servers.
                </span>
              </div>
            </div>
          }

          {step === 'processing' &&
          <div className="py-12 flex flex-col items-center text-center">
              <Loader2
              size={48}
              className="text-blue-500 animate-spin mb-4"
              strokeWidth={1.5} />
            
              <div className="text-base font-semibold text-gray-900 mb-1">
                Processing your payment
              </div>
              <div className="text-sm text-gray-500">
                Charging ₹{grandTotal.toLocaleString()} via{' '}
                {method === 'upi' ?
              'UPI' :
              method === 'card' ?
              'Card' :
              'Net Banking'}
                . Don't close this window.
              </div>
            </div>
          }

          {step === 'success' &&
          <div className="py-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 relative">
                <CheckCircle2 size={32} className="text-emerald-600" />
                <Sparkles
                size={14}
                className="absolute -top-1 -right-1 text-amber-400 fill-amber-400" />
              
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                You're subscribed!
              </div>
              <div className="text-sm text-gray-500 mb-5 max-w-[380px]">
                Spotlight Velocity Pro is now active until{' '}
                <span className="font-medium text-gray-900">{renewLabel}</span>.
                A GST invoice has been emailed to your account.
              </div>
              <div className="w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Plan</span>
                  <span className="font-medium text-gray-900">
                    Velocity Pro · {cadence.label}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transaction ID</span>
                  <span className="font-mono text-gray-900">
                    SUB{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Method</span>
                  <span className="font-medium text-gray-900">
                    {method === 'upi' ?
                  'UPI · HDFC ****4521' :
                  method === 'card' ?
                  'Card · ICICI ****8836' :
                  'NetBanking · SBI'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Amount charged</span>
                  <span className="font-mono text-gray-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>
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
                <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  <Download size={12} /> Download invoice
                </button>
                <button
              onClick={onClose}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              
                  Done
                </button>
              </> :
          step === 'method' ?
          <>
                <button
              onClick={() => setStep('review')}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center gap-1.5">
              
                  <ArrowLeft size={14} /> Back
                </button>
                <button
              onClick={handlePay}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              
                  Pay ₹{grandTotal.toLocaleString()}
                </button>
              </> :

          <>
                <button
              onClick={onClose}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium">
              
                  Cancel
                </button>
                <button
              onClick={() => setStep('method')}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              
                  Continue to payment
                </button>
              </>
          }
          </div>
        }
      </div>
    </div>);

}