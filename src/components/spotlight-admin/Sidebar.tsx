import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Building,
  LayoutTemplate,
  Package,
  Puzzle,
  Image as ImageIcon,
  Megaphone,
  Globe } from
'lucide-react';
export function Sidebar() {
  const navigate = useNavigate();
  const navItems = [
  {
    to: '/spotlight/brands',
    icon: Building,
    label: 'Brands'
  },
  {
    to: '/spotlight/campaigns',
    icon: Megaphone,
    label: 'Campaigns'
  },
  {
    to: '/spotlight/templates',
    icon: LayoutTemplate,
    label: 'Templates'
  },
  {
    to: '/spotlight/packages',
    icon: Package,
    label: 'Package catalog'
  },
  {
    to: '/spotlight/addons',
    icon: Puzzle,
    label: 'Add-on catalog'
  }];

  const creativeItems = [
  {
    to: '/spotlight/backgrounds',
    icon: ImageIcon,
    label: 'Backgrounds'
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
      <div className="flex-1 overflow-y-auto px-[14px] py-2 flex flex-col gap-[18px]">
        {/* Core Group */}
        <div className="flex flex-col gap-1">
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

        {/* Divider */}
        <div className="h-[1px] bg-white/10 mx-3 my-1"></div>

        {/* Creative AI Group */}
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 side-group-label">Creative AI</div>
          {creativeItems.map((item) =>
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
      </div>

      {/* User Area / Bottom — click to go to Dashboard */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => navigate('/spotlight/dashboard')}
          className="w-full flex items-center gap-3 text-white/80 text-xs rounded-[8px] px-2 py-2 hover:bg-white/5 transition-colors cursor-pointer">
          
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium flex-shrink-0">
            SA
          </div>
          <div className="text-left">
            <div className="font-medium text-white">Spotlight Admin</div>
            <div className="text-white/50">Dashboard & Profile</div>
          </div>
        </button>
      </div>
    </div>);

}