import React from 'react';
import { Menu } from 'lucide-react';
import { ProductSwitcher } from '../shared/ProductSwitcher';
export function BrandTopbar() {
  return (
    <div className="h-[64px] px-[32px] flex items-center justify-between sticky top-0 bg-[var(--bg-page)]/80 backdrop-blur-md z-10 border-b border-[var(--border-soft)]">
      <div className="flex items-center gap-4">
        <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-[var(--brand-indigo)] flex items-center justify-center text-white font-bold text-sm">
            SI
          </div>
          <span className="font-semibold text-[15px]">Samsung India</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ProductSwitcher />
        <div className="w-8 h-8 rounded-full bg-[var(--brand-indigo)] flex items-center justify-center text-white text-xs font-medium">
          SI
        </div>
      </div>
    </div>);

}