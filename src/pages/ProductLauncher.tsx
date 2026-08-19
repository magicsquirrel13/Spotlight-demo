import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Store, Building2, ArrowRight } from 'lucide-react';
export function ProductLauncher() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center bg-[var(--brand-indigo)] mb-6"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px'
            }}>
            
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0070FC]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C158]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFF7E5]"></div>
            </div>
          </div>
          <h1 className="page-title mb-3">Welcome to Spotlight</h1>
          <p className="text-[var(--text-muted)] text-lg">
            Select a product environment to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spotlight Admin */}
          <div
            className="sp-card cursor-pointer hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full relative overflow-hidden group"
            onClick={() => navigate('/spotlight')}>
            
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--brand-blue)]"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E5F1FF] flex items-center justify-center text-[var(--brand-blue)]">
                <Settings size={24} strokeWidth={1.5} />
              </div>
              <div className="pill pill-done">Active</div>
            </div>
            <h2 className="card-title mb-2">Spotlight Admin</h2>
            <p className="text-[var(--text-muted)] text-sm mb-6 flex-grow">
              Internal ops portal. Onboard brands, configure commercials, and
              manage the creative AI library.
            </p>
            <div className="flex items-center text-[var(--brand-blue)] font-medium text-sm group-hover:translate-x-1 transition-transform">
              Enter Admin <ArrowRight size={16} className="ml-1" />
            </div>
          </div>

          {/* Brand Product */}
          <div
            className="sp-card cursor-pointer hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full relative group"
            onClick={() => navigate('/brand')}>
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-[#EEF2F6] flex items-center justify-center text-[var(--text-muted)]">
                <Building2 size={24} strokeWidth={1.5} />
              </div>
              <div className="pill pill-muted">Coming Next</div>
            </div>
            <h2 className="card-title mb-2">Brand Product</h2>
            <p className="text-[var(--text-muted)] text-sm mb-6 flex-grow">
              Brand HQ portal. Configure brand DNA, view network performance,
              and control creative templates.
            </p>
            <div className="flex items-center text-[var(--text-muted)] font-medium text-sm group-hover:translate-x-1 transition-transform">
              Preview <ArrowRight size={16} className="ml-1" />
            </div>
          </div>

          {/* Partner Product */}
          <div
            className="sp-card cursor-pointer hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full relative group"
            onClick={() => navigate('/partner')}>
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-[#EEF2F6] flex items-center justify-center text-[var(--text-muted)]">
                <Store size={24} strokeWidth={1.5} />
              </div>
              <div className="pill pill-muted">Coming Next</div>
            </div>
            <h2 className="card-title mb-2">Partner Product</h2>
            <p className="text-[var(--text-muted)] text-sm mb-6 flex-grow">
              Local store portal. Launch campaigns, manage leads, and compose
              local creatives.
            </p>
            <div className="flex items-center text-[var(--text-muted)] font-medium text-sm group-hover:translate-x-1 transition-transform">
              Preview <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>);

}