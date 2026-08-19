import React, { useState } from 'react';
import { Menu, MapPin, ChevronDown, Mic, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductSwitcher } from '../shared/ProductSwitcher';
import { usePartnerLocation } from '../../pages/partner/PartnerShell';
export function PartnerTopbar() {
  const navigate = useNavigate();
  const { selectedLocation, setSelectedLocation } = usePartnerLocation();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  // Mock balances — shared shape with Subscription/Campaigns pages
  const tokenBalance = 1247;
  const campaignBalance = 28430;
  const locations = [
  {
    id: 'all',
    name: 'All Locations'
  },
  {
    id: 'dlr_001',
    name: 'Samsung SmartPlaza – Sahil Electronics'
  },
  {
    id: 'dlr_002',
    name: 'Samsung SmartPlaza – Nexus Digital'
  },
  {
    id: 'dlr_003',
    name: 'Samsung SmartPlaza – Pasco Retail'
  },
  {
    id: 'dlr_004',
    name: 'Samsung SmartPlaza – Capital Electronics'
  },
  {
    id: 'dlr_005',
    name: 'Samsung SmartPlaza – Metro Digital'
  },
  {
    id: 'dlr_006',
    name: 'Samsung SmartPlaza – Anand Electronics'
  },
  {
    id: 'dlr_007',
    name: 'Samsung SmartPlaza – Gurgaon Digital'
  }];

  return (
    <div className="h-[64px] px-[32px] flex items-center justify-between sticky top-0 bg-[var(--bg-page)]/80 backdrop-blur-md z-10 border-b border-[var(--border-soft)]">
      <div className="flex items-center gap-4">
        <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-[#1428A0] flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="font-semibold text-[15px]">Samsung</span>
        </div>

        <div className="h-6 w-px bg-[var(--border-soft)]" />

        {/* Location Selector — inline with brand */}
        <div className="relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-[8px] border border-[var(--border-soft)] bg-white hover:bg-[var(--bg-page)] transition-colors">
            
            <MapPin size={14} className="text-[var(--brand-blue)]" />
            <span className="text-sm font-medium truncate max-w-[220px]">
              {locations.find((l) => l.id === selectedLocation)?.name}
            </span>
            <ChevronDown size={14} className="text-[var(--text-muted)]" />
          </button>

          {showLocationDropdown &&
          <>
              <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLocationDropdown(false)} />
            
              <div className="absolute top-full mt-2 left-0 min-w-[280px] bg-white rounded-[8px] border border-[var(--border-soft)] shadow-lg z-20 overflow-hidden">
                {locations.map((loc) =>
              <button
                key={loc.id}
                onClick={() => {
                  setSelectedLocation(loc.id);
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-page)] transition-colors">
                
                    {loc.name}
                  </button>
              )}
              </div>
            </>
          }
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/partner/subscription')}
          title="AI Voice Agent token balance"
          className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-full bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors">
          
          <Mic size={13} className="text-purple-600" />
          <span className="text-xs font-semibold text-purple-700 font-mono">
            {tokenBalance.toLocaleString()}
          </span>
          <span className="text-[10px] text-purple-500 uppercase tracking-wider font-medium">
            tokens
          </span>
        </button>

        <button
          onClick={() => navigate('/partner/campaigns')}
          title="This month's remaining campaign balance"
          className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-full bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors">
          
          <Wallet size={13} className="text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700 font-mono">
            ₹{campaignBalance.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-500 uppercase tracking-wider font-medium">
            this mo
          </span>
        </button>

        <ProductSwitcher />
        <div className="w-8 h-8 rounded-full bg-[var(--brand-indigo)] flex items-center justify-center text-white text-xs font-medium">
          DL
        </div>
      </div>
    </div>);

}