import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { ProductSwitcher } from '../shared/ProductSwitcher';
export function Topbar() {
  const navigate = useNavigate();
  return (
    <div className="h-[64px] px-[32px] flex items-center justify-between sticky top-0 bg-[var(--bg-page)]/80 backdrop-blur-md z-10 border-b border-[var(--border-soft)]">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-[var(--text-muted)]" />
          </div>
          <input
            type="text"
            placeholder="Search brands, templates, or packages..."
            className="bg-white w-full text-[13px] h-[36px]"
            style={{
              paddingLeft: '40px'
            }} />
          
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors relative">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--danger)] rounded-full border border-white"></span>
        </button>

        <div className="h-6 w-[1px] bg-[var(--border-soft)] mx-1"></div>

        <ProductSwitcher />

        <button
          onClick={() => navigate('/spotlight/dashboard')}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          
          <div className="w-8 h-8 rounded-full bg-[var(--brand-indigo)] flex items-center justify-center text-white text-xs font-medium">
            SA
          </div>
        </button>
      </div>
    </div>);

}