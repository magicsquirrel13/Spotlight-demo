import React, { useEffect, useMemo, useState } from 'react';
import {
  Wallet,
  Plus,
  RefreshCw,
  TrendingDown,
  Calendar,
  CheckCircle2,
  X,
  CreditCard,
  Smartphone,
  Building2,
  Search,
  Download,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  Loader2,
  Info } from
'lucide-react';
import { usePartnerLocation } from './PartnerShell';
interface Transaction {
  id: string;
  date: string;
  type: 'Top-up' | 'Ad Spend' | 'Refund' | 'AI Voice';
  description: string;
  amount: number;
  balance: number;
}
const INITIAL_TRANSACTIONS: Transaction[] = [
{
  id: 't_001',
  date: '18 May 2026',
  type: 'Ad Spend',
  description: 'Galaxy S24 Ultra Sarojini Nagar Hyperlocal',
  amount: -3240,
  balance: 32450
},
{
  id: 't_002',
  date: '17 May 2026',
  type: 'Ad Spend',
  description: 'Galaxy Z Fold8 Festive Push',
  amount: -2980,
  balance: 35690
},
{
  id: 't_003',
  date: '15 May 2026',
  type: 'AI Voice',
  description: 'Voice Agent tokens (50 calls)',
  amount: -1500,
  balance: 38670
},
{
  id: 't_004',
  date: '12 May 2026',
  type: 'Top-up',
  description: 'UPI · HDFC ****4521',
  amount: 25000,
  balance: 40170
},
{
  id: 't_005',
  date: '10 May 2026',
  type: 'Ad Spend',
  description: 'Neo QLED 8K Performance Push',
  amount: -2860,
  balance: 15170
},
{
  id: 't_006',
  date: '06 May 2026',
  type: 'Ad Spend',
  description: 'Galaxy A55 Hindi Belt',
  amount: -3050,
  balance: 18030
},
{
  id: 't_007',
  date: '03 May 2026',
  type: 'Refund',
  description: 'Meta ads credit refund',
  amount: 1240,
  balance: 21080
},
{
  id: 't_008',
  date: '01 May 2026',
  type: 'Top-up',
  description: 'Card · ICICI ****8836',
  amount: 20000,
  balance: 19840
}];

type PaymentMethod = 'upi' | 'card' | 'netbanking';
type FlowStep = 'amount' | 'method' | 'processing' | 'success';
export function PartnerWallet() {
  const { selectedLocation } = usePartnerLocation();
  const isAll = selectedLocation === 'all';
  const [balance, setBalance] = useState(isAll ? 32450 : 12400);
  const [autoRefill, setAutoRefill] = useState(true);
  const [refillThreshold, setRefillThreshold] = useState(10000);
  const [transactions, setTransactions] =
  useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [filter, setFilter] = useState<'all' | 'spend' | 'topup'>('all');
  const [search, setSearch] = useState('');
  // Sync balance when location switches
  useEffect(() => {
    setBalance(isAll ? 32450 : 12400);
  }, [isAll]);
  // Derived: spend stats
  const stats = useMemo(() => {
    const monthSpend = transactions.
    filter((t) => t.amount < 0).
    reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const avgDaily = Math.round(monthSpend / 18); // 18 days into month
    const daysRunway = avgDaily > 0 ? Math.floor(balance / avgDaily) : 99;
    const lastTopUp = transactions.find((t) => t.type === 'Top-up');
    return {
      monthSpend,
      avgDaily,
      daysRunway,
      lastTopUp
    };
  }, [transactions, balance]);
  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filter === 'spend' && t.amount >= 0) return false;
      if (filter === 'topup' && t.type !== 'Top-up' && t.type !== 'Refund')
      return false;
      if (search) {
        const q = search.toLowerCase();
        if (
        !t.description.toLowerCase().includes(q) &&
        !t.type.toLowerCase().includes(q))

        return false;
      }
      return true;
    });
  }, [transactions, filter, search]);
  const handleAddFunds = (amount: number, method: PaymentMethod) => {
    const methodLabel =
    method === 'upi' ?
    'UPI · HDFC ****4521' :
    method === 'card' ?
    'Card · ICICI ****8836' :
    'NetBanking · SBI';
    const newBalance = balance + amount;
    const newTx: Transaction = {
      id: `t_${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      type: 'Top-up',
      description: methodLabel,
      amount,
      balance: newBalance
    };
    setBalance(newBalance);
    setTransactions([newTx, ...transactions]);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Wallet</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage ad-spend and AI Voice Agent balance
          </p>
        </div>
        <button
          onClick={() => setShowAddFunds(true)}
          className="h-10 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20">
          
          <Plus size={16} /> Add Funds
        </button>
      </div>

      {/* Top row: Balance card + Stats */}
      <div className="grid grid-cols-3 gap-5">
        {/* Balance card — primary */}
        <div className="col-span-2 relative overflow-hidden rounded-2xl p-7 text-white bg-gradient-to-br from-[var(--brand-indigo)] via-[#231aa8] to-[#0d0560]">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-2">
                <Wallet size={14} /> Current Balance
              </div>
              <div className="text-5xl font-bold tracking-tight">
                ₹{balance.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-3 mt-3 text-white/80 text-xs">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${autoRefill ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                  
                  {autoRefill ?
                  `Auto-refill ON · triggers at ₹${refillThreshold.toLocaleString('en-IN')}` :
                  'Auto-refill OFF'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowAddFunds(true)}
              className="h-9 px-4 rounded-full bg-white text-[var(--brand-indigo)] text-xs font-semibold flex items-center gap-1.5 hover:bg-white/90 transition-colors">
              
              <Plus size={14} /> Top Up
            </button>
          </div>

          <div className="relative mt-6 grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 mb-0.5">
                Days runway
              </div>
              <div className="text-lg font-semibold">
                {stats.daysRunway} days
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 mb-0.5">
                Avg daily spend
              </div>
              <div className="text-lg font-semibold">
                ₹{stats.avgDaily.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 mb-0.5">
                Last top-up
              </div>
              <div className="text-lg font-semibold">
                {stats.lastTopUp ?
                `₹${stats.lastTopUp.amount.toLocaleString('en-IN')}` :
                '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Auto-refill card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-1">
                <RefreshCw size={12} /> Auto-refill
              </div>
              <div className="text-sm text-gray-900 font-semibold">
                Never run out of budget
              </div>
            </div>
            <button
              onClick={() => setAutoRefill(!autoRefill)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${autoRefill ? 'bg-emerald-500' : 'bg-gray-300'}`}
              style={{
                height: '22px',
                width: '40px'
              }}
              aria-label="Toggle auto-refill">
              
              <span
                className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white transition-transform ${autoRefill ? 'translate-x-[18px]' : ''}`} />
              
            </button>
          </div>

          <div className="mt-4 flex-1">
            <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Refill when balance falls below
            </label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                ₹
              </span>
              <input
                type="number"
                value={refillThreshold}
                onChange={(e) => setRefillThreshold(Number(e.target.value))}
                disabled={!autoRefill}
                className="w-full h-10 pl-7 pr-3 rounded-lg border border-gray-200 text-sm font-medium disabled:bg-gray-50 disabled:text-gray-400" />
              
            </div>
            <div className="text-[10px] text-gray-400 mt-1.5">
              Auto-tops up with ₹25,000 from default method
            </div>
          </div>
        </div>
      </div>

      {/* Insight banner */}
      {stats.daysRunway < 10 &&
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
          <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-amber-900">
              Low runway — only {stats.daysRunway} days of spend left
            </div>
            <div className="text-xs text-amber-700 mt-0.5">
              At your current pace of ₹{stats.avgDaily.toLocaleString('en-IN')}
              /day, your balance will run out by{' '}
              {new Date(
              Date.now() + stats.daysRunway * 86400000
            ).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short'
            })}
              . Top up to keep campaigns running.
            </div>
          </div>
          <button
          onClick={() => setShowAddFunds(true)}
          className="text-xs font-semibold text-amber-900 hover:underline whitespace-nowrap">
          
            Top up now →
          </button>
        </div>
      }

      {/* Transaction History */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="card-title">Transaction History</div>
            <div className="text-xs text-gray-500 mt-0.5">
              {filteredTransactions.length} of {transactions.length}{' '}
              transactions
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              
              <input
                type="text"
                placeholder="Search transactions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 pr-3 rounded-full border border-gray-200 text-xs w-56" />
              
            </div>
            <div className="flex bg-gray-100 rounded-full p-0.5">
              {[
              {
                id: 'all' as const,
                label: 'All'
              },
              {
                id: 'spend' as const,
                label: 'Spend'
              },
              {
                id: 'topup' as const,
                label: 'Credits'
              }].
              map((f) =>
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 h-8 rounded-full text-xs font-medium transition-colors ${filter === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                
                  {f.label}
                </button>
              )}
            </div>
            <button className="h-9 px-3 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5">
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {filteredTransactions.length === 0 ?
        <div className="py-12 text-center text-sm text-gray-500">
            No transactions match your filters.
          </div> :

        <div className="overflow-hidden rounded-lg border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                  <th className="text-left font-semibold py-2.5 px-4">Date</th>
                  <th className="text-left font-semibold py-2.5 px-4">Type</th>
                  <th className="text-left font-semibold py-2.5 px-4">
                    Description
                  </th>
                  <th className="text-right font-semibold py-2.5 px-4">
                    Amount
                  </th>
                  <th className="text-right font-semibold py-2.5 px-4">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((tx) => {
                const isCredit = tx.amount > 0;
                const pillStyles =
                tx.type === 'Top-up' ?
                'bg-emerald-50 text-emerald-700 border-emerald-200' :
                tx.type === 'Refund' ?
                'bg-blue-50 text-blue-700 border-blue-200' :
                tx.type === 'AI Voice' ?
                'bg-purple-50 text-purple-700 border-purple-200' :
                'bg-gray-50 text-gray-700 border-gray-200';
                return (
                  <tr key={tx.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-mono text-xs text-gray-700">
                        {tx.date}
                      </td>
                      <td className="py-3 px-4">
                        <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${pillStyles}`}>
                        
                          {isCredit ?
                        <ArrowDownRight size={10} /> :

                        <ArrowUpRight size={10} />
                        }
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-700">
                        {tx.description}
                      </td>
                      <td
                      className={`py-3 px-4 font-mono font-semibold text-right ${isCredit ? 'text-emerald-600' : 'text-gray-900'}`}>
                      
                        {isCredit ? '+' : '−'}₹
                        {Math.abs(tx.amount).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-gray-500 text-right">
                        ₹{tx.balance.toLocaleString('en-IN')}
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </div>
        }
      </div>

      {showAddFunds &&
      <AddFundsModal
        onClose={() => setShowAddFunds(false)}
        onSuccess={(amount, method) => handleAddFunds(amount, method)}
        currentBalance={balance} />

      }
    </div>);

}
// ============================================================
// Add Funds Modal — functional payment flow
// ============================================================
function AddFundsModal({
  onClose,
  onSuccess,
  currentBalance




}: {onClose: () => void;onSuccess: (amount: number, method: PaymentMethod) => void;currentBalance: number;}) {
  const [step, setStep] = useState<FlowStep>('amount');
  const [amount, setAmount] = useState<number>(10000);
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const gst = Math.round(amount * 0.18);
  const tds = Math.round(amount * 0.02);
  const total = amount + gst - tds;
  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      onSuccess(amount, method);
      setStep('success');
    }, 1500);
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={step === 'processing' ? undefined : onClose}>
      
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <Wallet size={16} className="text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {step === 'success' ?
                'Payment successful' :
                'Add Funds to Wallet'}
              </div>
              <div className="text-xs text-gray-500">
                Current balance · ₹{currentBalance.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          {step !== 'processing' &&
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            
              <X size={18} />
            </button>
          }
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {step === 'amount' &&
          <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                  Quick amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5000, 10000, 25000, 50000].map((preset) => {
                  const selected = amount === preset;
                  return (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                      
                        ₹{(preset / 1000).toFixed(0)}K
                      </button>);

                })}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                  Custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  placeholder="Enter amount"
                  className="w-full h-14 pl-10 pr-4 rounded-xl border-2 border-gray-200 text-2xl font-bold text-gray-900 focus:border-blue-500 focus:outline-none" />
                
                </div>
                <div className="text-[11px] text-gray-400 mt-1.5">
                  Min ₹1,000 · Max ₹5,00,000 per transaction
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3.5 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Wallet credit</span>
                  <span className="font-mono">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="font-mono">
                    +₹{gst.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    TDS (2%)
                    <span
                    title="TDS deducted at source under Section 194C. You'll get a TDS certificate (Form 16A) at quarter end."
                    className="cursor-help text-gray-400">
                    
                      <Info size={11} />
                    </span>
                  </span>
                  <span className="font-mono text-emerald-700">
                    −₹{tds.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-gray-900">
                  <span>Final payable</span>
                  <span className="font-mono">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-gray-400 -mt-2">
                Net wallet credit ₹{amount.toLocaleString('en-IN')} · TDS
                deposited on your behalf.
              </div>
            </div>
          }

          {step === 'method' &&
          <div className="flex flex-col gap-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">
                Payment method
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

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700 flex items-start gap-2 mt-2">
                <Info size={12} className="mt-0.5 flex-shrink-0" />
                <span>
                  You'll be charged ₹{total.toLocaleString('en-IN')} including
                  18% GST. A GST invoice will be emailed within 24 hours.
                </span>
              </div>
            </div>
          }

          {step === 'processing' &&
          <div className="py-10 flex flex-col items-center text-center">
              <div className="relative w-16 h-16 mb-5">
                <Loader2
                size={64}
                className="text-blue-500 animate-spin"
                strokeWidth={1.5} />
              
              </div>
              <div className="text-base font-semibold text-gray-900 mb-1">
                Processing your payment
              </div>
              <div className="text-sm text-gray-500">
                Don't close this window — this takes a few seconds.
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
                ₹{amount.toLocaleString('en-IN')} added
              </div>
              <div className="text-sm text-gray-500 mb-5">
                Your wallet is now ₹
                {(currentBalance + amount).toLocaleString('en-IN')}
              </div>
              <div className="w-full rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Transaction ID</span>
                  <span className="font-mono text-gray-900">
                    TXN{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Method</span>
                  <span className="font-medium text-gray-900 capitalize">
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
                    ₹{total.toLocaleString('en-IN')}
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
                <button className="text-xs font-medium text-blue-600 hover:underline">
                  Download receipt
                </button>
                <button
              onClick={onClose}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              
                  Done
                </button>
              </> :

          <>
                <button
              onClick={
              step === 'amount' ? onClose : () => setStep('amount')
              }
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors">
              
                  {step === 'amount' ? 'Cancel' : 'Back'}
                </button>
                <button
              onClick={() => {
                if (step === 'amount') {
                  if (amount >= 1000) setStep('method');
                } else {
                  handleConfirm();
                }
              }}
              disabled={step === 'amount' && amount < 1000}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors">
              
                  {step === 'amount' ?
              'Continue' :
              `Pay ₹${total.toLocaleString('en-IN')}`}
                </button>
              </>
          }
          </div>
        }
      </div>
    </div>);

}