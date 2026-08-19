import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Shield,
  Clock,
  ArrowRight,
  MessageCircle } from
'lucide-react';
export function Invite() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] to-[#E8EEFF] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* WhatsApp-style message bubble */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Message header */}
          <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                Spotlight by Samsung
              </div>
              <div className="text-white/70 text-xs">Business Invite</div>
            </div>
          </div>

          {/* Message body */}
          <div className="p-6">
            <div className="bg-[#DCF8C6] rounded-xl rounded-tl-none p-4 mb-6 relative">
              <div className="absolute -top-0 -left-2 w-0 h-0 border-t-[12px] border-t-[#DCF8C6] border-l-[12px] border-l-transparent"></div>
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                Hi <span className="font-semibold">Rohan Deshpande</span> 👋
              </p>
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                You've been invited by{' '}
                <span className="font-semibold">Samsung</span> to join
                Spotlight and start generating leads for your store.
              </p>
              <p className="text-xs text-gray-500 text-right">10:32 AM ✓✓</p>
            </div>

            {/* Invite Card */}
            <div className="border border-gray-200 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1428A0] flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Samsung</div>
                  <div className="text-sm text-gray-500">
                    Brand Partner Program
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Store</span>
                  <span className="text-sm font-medium text-gray-900">
                    Samsung SmartPlaza – Sahil Electronics
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Locality</span>
                  <span className="text-sm font-medium text-gray-900">
                    Sarojini Nagar, New Delhi
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Co-op</span>
                  <span className="text-sm font-semibold text-green-600">
                    50% on ad spend
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Setup time</span>
                  <span className="text-sm font-medium text-gray-900">
                    ~2 minutes
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle size={14} className="text-green-500" />
                  Verified by Samsung
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Shield size={14} className="text-blue-500" />
                  Secure
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={14} className="text-orange-500" />
                  ~2 min
                </div>
              </div>

              <button
                onClick={() => navigate('/partner/onboarding')}
                className="w-full py-3.5 rounded-xl bg-[var(--brand-indigo)] text-white font-semibold text-sm hover:bg-[#1a0a8a] transition-colors flex items-center justify-center gap-2">
                
                Accept Invite & Get Started
                <ArrowRight size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              This invite was sent via Spotlight Platform. If you didn't expect
              this, please ignore.
            </p>
          </div>
        </div>
      </div>
    </div>);

}