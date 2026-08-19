import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Wallet,
  BarChart3,
  FileText,
  CreditCard,
  Megaphone,
  Palette,
  Users,
  Mic } from
'lucide-react';
const NAV_GROUPS = [
{
  label: null,
  items: [
  {
    to: '/partner/home',
    icon: Home,
    label: 'Home'
  }]

},
{
  label: 'VELOCITY',
  emoji: '🚀',
  items: [
  {
    to: '/partner/campaigns',
    icon: Megaphone,
    label: 'Campaigns'
  },
  {
    to: '/partner/studio',
    icon: Palette,
    label: 'Creative Studio'
  }]

},
{
  label: 'INTENT',
  emoji: '🎯',
  items: [
  {
    to: '/partner/leads',
    icon: Users,
    label: 'Leads'
  },
  {
    to: '/partner/voice-agent',
    icon: Mic,
    label: 'Voice Agent'
  }]

},
{
  label: 'NETWORK',
  emoji: '🌐',
  items: [
  {
    to: '/partner/wallet',
    icon: Wallet,
    label: 'Wallet'
  },
  {
    to: '/partner/reports',
    icon: BarChart3,
    label: 'Reports'
  },
  {
    to: '/partner/invoices',
    icon: FileText,
    label: 'Invoices'
  },
  {
    to: '/partner/subscription',
    icon: CreditCard,
    label: 'Subscription'
  }]

}];

export function PartnerSidebar() {
  return (
    <div className="w-[220px] fixed inset-y-0 left-0 bg-[var(--brand-indigo)] flex flex-col z-20">
      {/* Logo */}
      <div className="p-5 pb-4 flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070FC]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C158]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFF7E5]"></div>
        </div>
        <span className="brand-wordmark text-white text-lg">Spotlight</span>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto px-[14px] py-2 flex flex-col gap-4">
        {NAV_GROUPS.map((group, gi) =>
        <div key={gi}>
            {group.label &&
          <div className="flex items-center gap-1.5 px-3 mb-2">
                <span className="text-[10px]">{group.emoji}</span>
                <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                  {group.label}
                </span>
              </div>
          }
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors ${isActive ? 'bg-[var(--brand-blue)] text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`
              }>
              
                  <item.icon size={16} strokeWidth={1.5} />
                  {item.label}
                </NavLink>
            )}
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">
            RD
          </div>
          <div>
            <div className="font-medium text-white">Rohan Deshpande</div>
            <div className="text-white/50">Samsung SmartPlaza</div>
          </div>
        </div>
      </div>
    </div>);

}