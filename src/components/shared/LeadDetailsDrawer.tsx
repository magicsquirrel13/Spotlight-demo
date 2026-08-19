import React, { useState } from 'react';
import {
  X,
  Clock,
  Sparkles,
  PhoneIncoming,
  AlertCircle,
  ChevronDown,
  RefreshCw } from
'lucide-react';
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  callDuration?: string;
  callDurationSec?: number;
  isAiHandled?: boolean;
  dealer?: {
    name: string;
    code: string;
    city?: string;
    state?: string;
  };
  model?: string;
  category?: string;
  subcategory?: string;
  leadCreatedOn?: string;
  aiAnalytics?: {
    durationSec: number;
    completionPct: number;
    sentiment?: 'positive' | 'negative' | 'neutral';
    callBackReason?: string;
    intent?: {
      reason: string;
      purpose: string;
    };
    productInterest?: {
      product: string;
      budget: string;
      preferences: string[];
    };
    qa: Array<{
      question: string;
      answer: string | null;
    }>;
  };
}
interface LeadDetailsDrawerProps {
  lead: Lead;
  onClose: () => void;
  onOpenActivityLog: () => void;
}
export function LeadDetailsDrawer({
  lead,
  onClose,
  onOpenActivityLog
}: LeadDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'ai'>('details');
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    leadType: 'buy',
    buyStatus: '',
    notes: '',
    model: '',
    dealerCode: lead.dealer?.code || 'DL069',
    dealerName: lead.dealer?.name || 'Samsung SmartPlaza – Sahil Electronics',
    dealerCity: lead.dealer?.city || 'New Delhi',
    dealerState: lead.dealer?.state || 'Delhi'
  });
  const syncSteps = [
  {
    label: 'CREATED',
    completed: true
  },
  {
    label: 'OPENED',
    completed: true
  },
  {
    label: 'SAVED',
    completed: true
  },
  {
    label: 'SYNCED',
    completed: true,
    active: true
  },
  {
    label: 'ENQURIY',
    completed: false
  }];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[640px] bg-[#F5F7FA] shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-blue-500 fill-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Lead Details
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenActivityLog}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors text-xs font-semibold tracking-wide">
              
              <Clock size={14} />
              ACTIVITY LOGS
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-1 py-3 mr-8 text-sm font-semibold tracking-wide border-b-2 transition-colors ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              
              DETAILS
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-1 py-3 text-sm font-semibold tracking-wide border-b-2 transition-colors ${activeTab === 'ai' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              
              AI ANALYTICS
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === 'details' ?
          <div className="space-y-5">
              {/* Info Banner */}
              <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <PhoneIncoming size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-700">
                  Call routed to dealer and answered.
                </span>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Name
                  </label>
                  <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Email
                  </label>
                  <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
              </div>

              {/* Phone Number & Call Duration & Lead Type */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-6 items-end">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Phone Number
                  </label>
                  <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Call Duration
                  </label>
                  <div className="flex items-center gap-1.5 py-2.5">
                    <Clock size={14} className="text-blue-500" />
                    <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                      {lead.callDuration || '12:21 Sec'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Lead Type
                  </label>
                  <div className="flex items-center gap-1.5 py-2.5">
                    <span>😐</span>
                    <span className="text-sm font-semibold text-blue-600">
                      Cold
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Status Radio Group */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-3">
                  Lead Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                {
                  value: 'buy',
                  label: 'BUY A SAMSUNG PRODUCT'
                },
                {
                  value: 'service',
                  label: 'SERVICE / SUPPORT'
                },
                {
                  value: 'feedback',
                  label: 'FEEDBACK'
                },
                {
                  value: 'nonsale',
                  label: 'NON SALE'
                }].
                map((option) =>
                <label
                  key={option.value}
                  className="flex items-center gap-2.5 cursor-pointer">
                  
                      <div className="relative w-5 h-5 flex-shrink-0">
                        <input
                      type="radio"
                      name="leadType"
                      value={option.value}
                      checked={formData.leadType === option.value}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadType: e.target.value
                      })
                      }
                      className="sr-only peer" />
                    
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-500"></div>
                        <div
                      className={`absolute inset-1 rounded-full ${formData.leadType === option.value ? 'bg-blue-500' : ''}`}>
                    </div>
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-gray-700">
                        {option.label}
                      </span>
                    </label>
                )}
                </div>
              </div>

              {/* Purchase Status Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Purchase Status
                </label>
                <div className="relative">
                  <select
                  value={formData.buyStatus}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    buyStatus: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm appearance-none pr-10">
                  
                    <option value="">Select Status</option>
                    <option value="appointed">Appointed Enquiry</option>
                    <option value="booking">Booking</option>
                    <option value="invoice">Invoice</option>
                    <option value="booking_cancel">Booking Cancel</option>
                    <option value="invoice_cancel">Invoice Cancel</option>
                  </select>
                  <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Notes
                </label>
                <textarea
                rows={3}
                placeholder="Enter Details"
                value={formData.notes}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value
                })
                }
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm resize-none" />
              
              </div>

              {/* Sync State */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  Sync State
                </div>
                <div className="flex items-center mb-2">
                  {syncSteps.map((step, index) =>
                <div
                  key={step.label}
                  className="flex-1 flex flex-col items-center relative">
                  
                      <div
                    className={`text-[10px] font-bold tracking-wider mb-1.5 ${step.active ? 'text-blue-600' : step.completed ? 'text-gray-700' : 'text-gray-400'}`}>
                    
                        {step.label}
                      </div>
                      <div className="w-full relative h-3">
                        {/* Arrow shape */}
                        <svg
                      className="w-full h-full"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none">
                      
                          <polygon
                        points={
                        index === 0 ?
                        '0,0 90,0 100,6 90,12 0,12' :
                        index === syncSteps.length - 1 ?
                        '0,0 10,6 0,12 100,12 100,0' :
                        '0,0 90,0 100,6 90,12 0,12 10,6'
                        }
                        fill={step.completed ? '#1E3A8A' : '#D1D5DB'} />
                      
                        </svg>
                      </div>
                    </div>
                )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <AlertCircle size={14} className="text-orange-500" />
                  <span className="text-xs text-gray-600">
                    Syncing Failed on 15 Nov 2024
                  </span>
                </div>
              </div>

              {/* Product */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Product
                </label>
                <div className="relative">
                  <select
                  value={formData.model}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    model: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm appearance-none pr-10">

                    <option value="">Select product</option>
                    <option value="zfold8">Galaxy Z Fold8 Ultra 5G (SM-F958B)</option>
                    <option value="s24ultra">Galaxy S24 Ultra 5G (SM-S928B)</option>
                    <option value="qn900d">Neo QLED 8K QN900D</option>
                    <option value="rf57dg">Bespoke French Door RF57DG</option>
                    <option value="ww11dg">Bespoke AI Washer WW11DG</option>
                  </select>
                  <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                
                </div>
              </div>

              {/* Lead Created on */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Lead Created on
                </label>
                <input
                type="text"
                value={lead.leadCreatedOn || '15 Nov 2024'}
                readOnly
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600" />
              
              </div>

              {/* Dealer Code & Dealer Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Dealer Code
                  </label>
                  <input
                  type="text"
                  value={formData.dealerCode}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    dealerCode: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Dealer Name
                  </label>
                  <input
                  type="text"
                  value={formData.dealerName}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    dealerName: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
              </div>

              {/* Dealer City & Dealer State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Dealer City
                  </label>
                  <input
                  type="text"
                  value={formData.dealerCity}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    dealerCity: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Dealer State
                  </label>
                  <input
                  type="text"
                  value={formData.dealerState}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    dealerState: e.target.value
                  })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm" />
                
                </div>
              </div>
            </div> :

          <div className="space-y-5">
              {/* Call Data Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                    d="M3 10h2l2-6 4 12 2-6 2 4h2"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                  
                  </svg>
                  <span className="text-sm font-bold tracking-wide text-gray-700">
                    CALL DATA
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Duration</div>
                  <div className="text-4xl font-bold text-gray-900">
                    {lead.aiAnalytics?.durationSec || 56}
                    <span className="text-base text-gray-500 ml-2 font-normal">
                      seconds
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-600">
                      Call Completion Status
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      {lead.aiAnalytics?.completionPct || 67}%
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${lead.aiAnalytics?.completionPct || 67}%`
                    }} />
                  
                  </div>
                </div>
              </div>

              {/* Product Interest Card — reflects the product discussed on the call */}
              {lead.aiAnalytics?.productInterest &&
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-blue-500 fill-blue-500" />
                    <span className="text-sm font-bold tracking-wide text-gray-700">
                      PRODUCT DISCUSSED ON CALL
                    </span>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 text-white mb-3">
                    <div className="text-[11px] uppercase tracking-wider text-blue-100">
                      Product
                    </div>
                    <div className="text-base font-bold leading-snug">
                      {lead.aiAnalytics.productInterest.product}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-gray-400">
                        Budget
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {lead.aiAnalytics.productInterest.budget}
                      </div>
                    </div>
                    {lead.aiAnalytics.sentiment &&
                  <div>
                        <div className="text-[11px] uppercase tracking-wider text-gray-400">
                          Sentiment
                        </div>
                        <div
                      className={`text-sm font-semibold capitalize ${lead.aiAnalytics.sentiment === 'positive' ? 'text-green-600' : lead.aiAnalytics.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                          {lead.aiAnalytics.sentiment}
                        </div>
                      </div>
                  }
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lead.aiAnalytics.productInterest.preferences.map((p) =>
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                        {p}
                      </span>
                  )}
                  </div>
                  {lead.aiAnalytics.callBackReason &&
                <div className="mt-3 text-xs text-gray-500">
                      <span className="font-semibold text-gray-600">AI summary:</span>{' '}
                      {lead.aiAnalytics.callBackReason}
                    </div>
                }
                </div>
              }

              {/* Q&A Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                    d="M3 4h14v10H8l-5 4V4z"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinejoin="round" />
                  
                  </svg>
                  <span className="text-sm font-bold tracking-wide text-gray-700">
                    QUESTION/CONVERSATION BY VOICE BOT AGENT
                  </span>
                </div>
                <div className="space-y-4">
                  {(lead.aiAnalytics?.qa || []).map((item, index) =>
                <div key={index} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Sparkles
                      size={14}
                      className="text-blue-500 mt-0.5 flex-shrink-0" />
                    
                        <span className="text-sm text-gray-700">
                          {item.question}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs flex-shrink-0">
                          👤
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {item.answer ||
                      <span className="text-gray-400 italic font-normal">
                              No answer
                            </span>
                      }
                        </span>
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          }
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between flex-shrink-0">
          <button className="px-6 py-2.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors text-sm font-semibold tracking-wide">
            SAVE LEAD
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-[#1E1B4B] text-white hover:bg-[#2D2A6B] transition-colors text-sm font-semibold tracking-wide flex items-center gap-2">
            <RefreshCw size={14} />
            SYNC & SAVE
          </button>
        </div>
      </div>
    </>);

}