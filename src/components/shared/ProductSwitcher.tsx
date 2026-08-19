import React, { useEffect, useState, useRef, Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Settings, Building2, Store, Check } from 'lucide-react';
type ProductKey = 'admin' | 'brand' | 'partner';
const PRODUCTS: {
  key: ProductKey;
  label: string;
  description: string;
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
  path: string;
  pathPrefix: string;
  accent: string;
}[] = [
{
  key: 'admin',
  label: 'Spotlight Admin',
  description: 'Internal ops & onboarding',
  icon: Settings,
  path: '/spotlight/brands',
  pathPrefix: '/spotlight',
  accent: '#0070FC'
},
{
  key: 'brand',
  label: 'Spotlight Brand',
  description: 'Brand HQ console',
  icon: Building2,
  path: '/brand',
  pathPrefix: '/brand',
  accent: '#0E0071'
},
{
  key: 'partner',
  label: 'Spotlight Partner',
  description: 'Local store portal',
  icon: Store,
  path: '/partner',
  pathPrefix: '/partner',
  accent: '#1FB161'
}];

export function ProductSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active =
  PRODUCTS.find((p) => location.pathname.startsWith(p.pathPrefix)) ||
  PRODUCTS[0];
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const ActiveIcon = active.icon;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 h-[36px] pl-2.5 pr-3 rounded-[8px] border-[0.5px] border-[var(--border-soft)] bg-white hover:bg-[var(--bg-page)] transition-colors">
        
        <div
          className="w-6 h-6 rounded-[6px] flex items-center justify-center text-white"
          style={{
            background: active.accent
          }}>
          
          <ActiveIcon size={13} strokeWidth={2} />
        </div>
        <div className="text-left leading-tight">
          <div className="text-[10px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Product
          </div>
          <div className="text-[12px] font-semibold text-[var(--text)] -mt-[1px]">
            {active.label}
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
        
      </button>

      {open &&
      <div
        className="absolute right-0 top-[calc(100%+6px)] w-[280px] bg-white rounded-[12px] border-[0.5px] border-[var(--border-soft)] py-1.5 z-50"
        style={{
          boxShadow: '0 10px 40px rgba(14,11,26,.18)'
        }}>
        
          <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.8px] text-[var(--text-muted)]">
            Switch Product
          </div>
          {PRODUCTS.map((p) => {
          const Icon = p.icon;
          const isActive = p.key === active.key;
          return (
            <button
              key={p.key}
              onClick={() => {
                setOpen(false);
                navigate(p.path);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--bg-page)] transition-colors text-left">
              
                <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-white flex-shrink-0"
                style={{
                  background: p.accent
                }}>
                
                  <Icon size={15} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[var(--text)] leading-tight">
                    {p.label}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] leading-tight mt-[2px]">
                    {p.description}
                  </div>
                </div>
                {isActive &&
              <Check
                size={14}
                className="text-[var(--brand-blue)] flex-shrink-0" />

              }
              </button>);

        })}
        </div>
      }
    </div>);

}