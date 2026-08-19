import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  TrendingUp,
  Users,
  Package,
  Target,
  BarChart3,
  UserCheck,
  Download } from
'lucide-react';
export function BrandSidebar() {
  const navItems = [
  {
    to: '/brand/growth-console',
    icon: LayoutGrid,
    label: 'Growth Console'
  },
  {
    to: '/brand/channel-summary',
    icon: TrendingUp,
    label: 'Channel Summary'
  },
  {
    to: '/brand/lead',
    icon: Users,
    label: 'Lead'
  },
  {
    to: '/brand/sku-analytics',
    icon: Package,
    label: 'SKU'
  },
  {
    to: '/brand/engagement-plan',
    icon: Target,
    label: 'Engagement Plan'
  },
  {
    to: '/brand/dealer-mis',
    icon: BarChart3,
    label: 'Store MIS'
  },
  {
    to: '/brand/lead-mis',
    icon: UserCheck,
    label: 'Lead MIS'
  },
  {
    to: '/brand/download',
    icon: Download,
    label: 'Downloads'
  }];

  return (
    <div className="w-[220px] fixed inset-y-0 left-0 bg-[var(--brand-indigo)] flex flex-col z-20">
      {/* Logo Area */}
      <div className="p-5 pb-6 flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070FC]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C158]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFF7E5]"></div>
        </div>
        <span className="brand-wordmark text-white text-lg">Spotlight</span>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto px-[14px] py-2 flex flex-col gap-1">
        {navItems.map((item) =>
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors
              ${isActive ? 'bg-[var(--brand-blue)] text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'}
            `}>
          
            <item.icon size={16} strokeWidth={1.5} />
            {item.label}
          </NavLink>
        )}
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">
            SI
          </div>
          <div>
            <div className="font-medium text-white">Samsung India</div>
            <div className="text-white/50">Brand Console</div>
          </div>
        </div>
      </div>
    </div>);

}