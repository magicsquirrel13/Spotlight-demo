import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  CreditCard,
  Smartphone,
  Loader2,
  Play,
  Pause,
  Zap,
  Star } from
'lucide-react';
import { getActiveBrandProfile } from '../../data/brandProfiles';
const CAMPAIGN_TEMPLATES = [
{
  suffix: 'Hyperlocal',
  platforms: ['Google', 'Meta'],
  budget: '₹500/day'
},
{
  suffix: 'Store Demo Leads',
  platforms: ['Meta'],
  budget: '₹350/day'
},
{
  suffix: 'Brand Awareness',
  platforms: ['Google'],
  budget: '₹250/day'
}];

const STEPS = [
'Welcome',
'Verify',
'Agreement',
'Plan',
'Activation',
'Campaigns'];

export function Onboarding() {
  const navigate = useNavigate();
  // Everything the partner sees is linked to the brand chosen in the admin.
  const brand = getActiveBrandProfile();
  const brandInitial = brand.name.charAt(0).toUpperCase();
  const brandCampaigns = CAMPAIGN_TEMPLATES.map((t, i) => ({
    name: `${brand.models[i] ?? brand.models[0]} — ${t.suffix}`,
    platforms: t.platforms,
    product: brand.models[i] ?? brand.models[0],
    budget: t.budget,
    status: 'Ready'
  }));
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('pro');
  const [cadence, setCadence] = useState('half-yearly');
  const [activationStep, setActivationStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, 5));
  // Auto-focus first OTP input when entering verify step
  useEffect(() => {
    if (step === 1) {
      setOtp(['', '', '', '', '', '']);
      setOtpVerifying(false);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  }, [step]);
  // Auto-verify when all 6 digits are filled
  useEffect(() => {
    if (step === 1 && otp.every((d) => d !== '') && !otpVerifying) {
      setOtpVerifying(true);
      otpRefs.current.forEach((el) => el?.blur());
      setTimeout(() => next(), 600);
    }
  }, [otp, step]);
  const handleOtpChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) {
      // cleared
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }
    const newOtp = [...otp];
    if (digits.length === 1) {
      newOtp[index] = digits;
      setOtp(newOtp);
      if (index < 5) otpRefs.current[index + 1]?.focus();
    } else {
      // pasted multiple digits — distribute across inputs
      const chars = digits.slice(0, 6 - index).split('');
      chars.forEach((c, i) => {
        newOtp[index + i] = c;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + chars.length, 5);
      otpRefs.current[nextIndex]?.focus();
    }
  };
  const handleOtpKeyDown = (
  index: number,
  e: React.KeyboardEvent<HTMLInputElement>) =>
  {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };
  // Activation animation
  useEffect(() => {
    if (step === 4) {
      const steps = [0, 1, 2, 3];
      steps.forEach((s, i) => {
        setTimeout(() => setActivationStep(s + 1), (i + 1) * 1200);
      });
      setTimeout(() => next(), 5500);
    }
  }, [step]);
  const slideVariants = {
    enter: {
      opacity: 0,
      x: 60
    },
    center: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -60
    }
  };
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Top bar */}
      <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0070FC]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C158]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]"></div>
          </div>
          <span className="font-semibold text-gray-900">Spotlight</span>
        </div>
        <div className="text-sm text-gray-500">Partner Onboarding</div>
      </div>

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {STEPS.map((label, i) =>
          <Fragment key={label}>
              <div className="flex items-center gap-2">
                <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-[var(--brand-indigo)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span
                className={`text-xs font-medium hidden sm:block ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>
                
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 &&
            <div
              className={`flex-1 h-0.5 ${i < step ? 'bg-green-500' : 'bg-gray-200'}`} />

            }
            </Fragment>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3
            }}
            className="w-full max-w-2xl">
            
            {/* Screen 1 — Landing */}
            {step === 0 &&
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome, Rohan Deshpande! 👋
                  </h1>
                  <p className="text-gray-500">
                    You've been invited by{' '}
                    <span className="font-semibold text-gray-700">
                      {brand.name}
                    </span>{' '}
                    to join Spotlight
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#1428A0] flex items-center justify-center text-white font-bold text-xl">
                      {brandInitial}
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-gray-900">
                        Samsung SmartPlaza – Sahil Electronics
                      </div>
                      <div className="text-sm text-gray-500">
                        Sarojini Nagar, New Delhi
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-700">
                        50%
                      </div>
                      <div className="text-xs text-green-600">
                        Co-op on ad spend
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-700">
                        ~2 min
                      </div>
                      <div className="text-xs text-blue-600">
                        To launch campaigns
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CheckCircle size={14} className="text-green-500" />{' '}
                    Verified by {brand.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Shield size={14} className="text-blue-500" /> Secure &
                    encrypted
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={14} className="text-orange-500" /> ~2 min to
                    launch
                  </div>
                </div>

                <button
                onClick={next}
                className="w-full py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold hover:bg-[#1a0a8a] transition-colors flex items-center justify-center gap-2">
                
                  Start Setup <ArrowRight size={16} />
                </button>
              </div>
            }

            {/* Screen 2 — OTP */}
            {step === 1 &&
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={28} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Verify your identity
                  </h2>
                  <p className="text-gray-500 text-sm">
                    We've sent a 6-digit code to{' '}
                    <span className="font-medium">+91 ●●●●●●7046</span>
                  </p>
                </div>

                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, i) =>
                <input
                  key={i}
                  ref={(el) => otpRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  disabled={otpVerifying}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onFocus={(e) => e.target.select()}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-lg border-2 transition-all outline-none ${otpVerifying ? 'border-green-500 bg-green-50 text-green-700' : digit ? 'border-blue-500 bg-blue-50' : 'border-gray-200 focus:border-blue-500'}`} />

                )}
                </div>

                <p className="text-center text-sm text-gray-400 mb-6 h-5">
                  {otpVerifying ?
                <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                      <Loader2 size={14} className="animate-spin" />
                      Verifying...
                    </span> :

                <>
                      Resend OTP in{' '}
                      <span className="font-medium text-gray-600">0:30</span>
                    </>
                }
                </p>

                <button
                onClick={next}
                disabled={otpVerifying || otp.some((d) => !d)}
                className="w-full py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold hover:bg-[#1a0a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                
                  Verify & Continue
                </button>
              </div>
            }

            {/* Screen 3 — Agreement */}
            {step === 2 &&
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Retail Partner Agreement
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Please review and accept the retail partner agreement to
                  continue.
                </p>

                <div className="h-[320px] overflow-y-auto border border-gray-200 rounded-xl p-5 mb-6 text-sm text-gray-600 leading-relaxed">
                  <h3 className="font-bold text-gray-900 mb-3">
                    SPOTLIGHT RETAIL PARTNER AGREEMENT
                  </h3>
                  <p className="mb-3">
                    This Retail Partner Agreement ("Agreement") is entered
                    into between Spotlight Technologies Pvt. Ltd. ("Spotlight")
                    and the Retail Partner ("Partner") identified during the
                    onboarding process.
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    1. SCOPE OF SERVICES
                  </h4>
                  <p className="mb-3">
                    Spotlight shall provide the Partner with access to its
                    digital marketing platform, including but not limited to:
                    (a) Hyperlocal lead generation campaigns across Google and
                    Meta platforms; (b) AI-powered voice agent for inbound call
                    handling; (c) Lead Management System (LMS) for lead
                    qualification and tracking; (d) Creative AI tools for
                    generating marketing collateral.
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    2. PARTNER OBLIGATIONS
                  </h4>
                  <p className="mb-3">
                    The Partner agrees to: (a) Provide accurate business
                    information during onboarding; (b) Maintain sufficient
                    wallet balance for campaign operations; (c) Respond to
                    qualified leads within 24 hours; (d) Comply with brand
                    guidelines provided by the parent brand.
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    3. DATA USAGE & PRIVACY
                  </h4>
                  <p className="mb-3">
                    All lead data generated through the platform is jointly
                    owned by the Partner and the Brand. Spotlight acts as a data
                    processor. Personal data is handled in compliance with
                    applicable data protection laws.
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    4. CAMPAIGN MANAGEMENT
                  </h4>
                  <p className="mb-3">
                    Campaigns are created and managed by Spotlight on behalf of
                    the Brand. The Partner may pause or resume campaigns but
                    cannot modify campaign creatives or targeting without Brand
                    approval.
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    5. BILLING & PAYMENTS
                  </h4>
                  <p className="mb-3">
                    Subscription fees are billed according to the selected
                    cadence. Ad spend is deducted from the Partner's wallet.
                    Co-op contributions from the Brand are applied
                    automatically.
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    6. TERM & TERMINATION
                  </h4>
                  <p>
                    This Agreement is effective from the date of acceptance and
                    continues until terminated by either party with 30 days
                    written notice.
                  </p>
                </div>

                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300" />
                
                  <span className="text-sm text-gray-700">
                    I have read and agree to the Retail Partner Agreement
                  </span>
                </label>

                <button
                onClick={next}
                disabled={!agreedToTerms}
                className="w-full py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold hover:bg-[#1a0a8a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                
                  Accept & Continue
                </button>
              </div>
            }

            {/* Screen 4 — Subscription */}
            {step === 3 &&
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Choose your plan duration
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  One plan, everything included. Pick the duration that works
                  for you.
                </p>

                {/* Duration cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                {
                  id: '3',
                  label: '3 Months',
                  price: 15000,
                  discount: 0
                },
                {
                  id: '6',
                  label: '6 Months',
                  price: 12750,
                  discount: 15,
                  badge: 'Most Popular'
                },
                {
                  id: '12',
                  label: '12 Months',
                  price: 12000,
                  discount: 20,
                  badge: 'Best Value'
                }].
                map((c) =>
                <button
                  key={c.id}
                  onClick={() => setCadence(c.id)}
                  className={`relative p-5 rounded-xl border-2 text-center transition-all ${cadence === c.id ? 'border-[var(--brand-indigo)] bg-[#F5F3FF] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  
                      {c.badge &&
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold rounded-full whitespace-nowrap ${c.badge === 'Most Popular' ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'}`}>
                    
                          {c.badge}
                        </span>
                  }
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        {c.label}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{c.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        per month
                      </div>
                      {c.discount > 0 ?
                  <div className="flex flex-col items-center gap-0.5">
                          <span className="text-xs text-gray-400 line-through">
                            ₹15,000/mo
                          </span>
                          <span className="text-xs font-semibold text-green-600">
                            Save {c.discount}%
                          </span>
                        </div> :

                  <div className="text-xs text-gray-400">
                          Standard rate
                        </div>
                  }
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{(c.price * parseInt(c.id)).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          billed once
                        </div>
                      </div>
                    </button>
                )}
                </div>

                {/* What's included */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-xs font-semibold text-gray-500 mb-3">
                    EVERYTHING INCLUDED
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                  'Unlimited leads',
                  'Google + Meta campaigns',
                  'AI Voice Agent',
                  'Full AI Analytics',
                  'Creative AI composer',
                  'Unlimited locations',
                  'Dedicated account manager',
                  '₹25,000 suggested wallet'].
                  map((item) =>
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-gray-600">
                    
                        <CheckCircle
                      size={12}
                      className="text-green-500 flex-shrink-0" />
                    {' '}
                        {item}
                      </div>
                  )}
                  </div>
                </div>

                {/* Payment mock */}
                <div className="border border-gray-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Payment Method
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {['UPI', 'Card', 'Net Banking'].map((m) =>
                  <button
                    key={m}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 first:bg-blue-50 first:border-blue-200 first:text-blue-600">
                    
                        {m}
                      </button>
                  )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded" />
                    
                      <span className="text-gray-600">Auto-refill wallet</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded" />
                    
                      <span className="text-gray-600">
                        WhatsApp low-balance alert
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                  onClick={next}
                  className="flex-1 py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold hover:bg-[#1a0a8a] transition-colors">
                  
                    Subscribe & Continue
                  </button>
                </div>
              </div>
            }

            {/* Screen 5 — Activation */}
            {step === 4 &&
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                  <Loader2 size={32} className="text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Setting up your dashboard
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  This will only take a moment...
                </p>

                <div className="space-y-4 text-left">
                  {[
                'Creating your store workspace...',
                'Setting up Google & Meta campaigns...',
                'Configuring AI Voice Agent...',
                'Almost ready!'].
                map((label, i) =>
                <div key={label} className="flex items-center gap-3">
                      {activationStep > i ?
                  <CheckCircle size={20} className="text-green-500" /> :
                  activationStep === i ?
                  <Loader2
                    size={20}
                    className="text-blue-500 animate-spin" /> :


                  <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                  }
                      <span
                    className={`text-sm ${activationStep > i ? 'text-green-700 font-medium' : activationStep === i ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                    
                        {label}
                      </span>
                    </div>
                )}
                </div>
              </div>
            }

            {/* Screen 6 — Campaign Preview */}
            {step === 5 &&
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your campaigns are ready!
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {brand.name} has pre-built these campaigns for you.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {brandCampaigns.map((campaign) =>
                <div
                  key={campaign.name}
                  className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Zap size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {campaign.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {campaign.platforms.map((p) =>
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                          
                                {p}
                              </span>
                        )}
                            <span className="text-xs text-gray-400">
                              {campaign.budget}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          {campaign.status}
                        </span>
                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                          <Pause size={14} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                )}
                </div>

                <button
                onClick={() => navigate('/partner/home')}
                className="w-full py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold hover:bg-[#1a0a8a] transition-colors flex items-center justify-center gap-2">
                
                  Go to Dashboard <ArrowRight size={16} />
                </button>
              </div>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}