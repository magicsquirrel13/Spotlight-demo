import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, ExternalLink } from 'lucide-react';
import { BRANDS, getBrandSummaryStats } from '../../data/mockData';
const summary = getBrandSummaryStats();
const BRAND_CARDS = BRANDS.map((brand) => {
  const allPartners = brand.partners;
  const livePartners = allPartners.filter((p) => p.status === 'live');
  const totalDealers = allPartners.reduce((sum, p) => sum + p.dealers.length, 0);
  const goLiveDates = allPartners.
  map((p) => p.operations.goLiveDate).
  filter(Boolean) as string[];
  const earliestGoLive = goLiveDates.length > 0 ? goLiveDates.sort()[0] : null;
  // Determine brand-level status from partners
  let status: 'live' | 'in-onboarding' | 'pending' = 'pending';
  if (livePartners.length > 0) status = 'live';else
  if (allPartners.some((p) => p.status === 'onboarding'))
  status = 'in-onboarding';
  return {
    id: brand.id,
    name: brand.name,
    vertical: brand.vertical,
    status,
    partners: allPartners.length,
    locations: totalDealers,
    goLive: earliestGoLive || '—'
  };
});
export function BrandsList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const getStatusPill = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="pill pill-done">Live</span>;
      case 'in-onboarding':
        return <span className="pill pill-submitted">Onboarding</span>;
      case 'pending':
        return <span className="pill pill-pending">Pending</span>;
      default:
        return <span className="pill pill-muted">{status}</span>;
    }
  };
  const filteredBrands =
  activeTab === 'all' ?
  BRAND_CARDS :
  BRAND_CARDS.filter(
    (b) =>
    b.status === (
    activeTab === 'onboarding' ? 'in-onboarding' : activeTab)
  );
  const liveCount = BRAND_CARDS.filter((b) => b.status === 'live').length;
  const onboardingCount = BRAND_CARDS.filter(
    (b) => b.status === 'in-onboarding'
  ).length;
  const pendingCount = BRAND_CARDS.filter((b) => b.status === 'pending').length;
  return (
    <div className="flex flex-col gap-6">
      {/* Page Head */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Brands</h1>
          <div className="text-[var(--text-muted)] text-sm">
            Manage brand onboarding and configurations
          </div>
        </div>
        <button
          className="btn-primary-sm flex items-center gap-2"
          onClick={() => navigate('/spotlight/brands/new')}>
          
          <Plus size={16} /> Onboard new brand
        </button>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-4 gap-4">
        <div className="sp-card py-4 px-5">
          <div className="numeric-stat mb-1">{BRANDS.length}</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Total Brands
          </div>
        </div>
        <div className="sp-card py-4 px-5 border-l-4 border-l-[var(--accent-success)]">
          <div className="numeric-stat mb-1">{summary.livePartners}</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Live Partners
          </div>
        </div>
        <div className="sp-card py-4 px-5 border-l-4 border-l-[var(--brand-blue)]">
          <div className="numeric-stat mb-1">{summary.onboardingPartners}</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            In Onboarding
          </div>
        </div>
        <div className="sp-card py-4 px-5 border-l-4 border-l-[#F59E0B]">
          <div className="numeric-stat mb-1">{summary.pendingPartners}</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Pending Setup
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-2">
        <div className="relative w-full max-w-[360px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-[var(--text-muted)]" />
          </div>
          <input
            type="text"
            placeholder="Search brands by name or vertical..."
            className="h-[38px]"
            style={{
              paddingLeft: '40px'
            }} />
          
        </div>

        <div className="filter-tabs">
          <button
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}>
            
            All <span className="ml-1 opacity-70">{BRANDS.length}</span>
          </button>
          <button
            className={`tab ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}>
            
            Live <span className="ml-1 opacity-70">{liveCount}</span>
          </button>
          <button
            className={`tab ${activeTab === 'onboarding' ? 'active' : ''}`}
            onClick={() => setActiveTab('onboarding')}>
            
            Onboarding{' '}
            <span className="ml-1 opacity-70">{onboardingCount}</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))'
        }}>
        
        {filteredBrands.map((brand) =>
        <div
          key={brand.id}
          className="bg-white border-[0.5px] border-[var(--border-soft)] rounded-[12px] p-5 hover:-translate-y-[1px] hover:shadow-[var(--shadow-card)] transition-all cursor-pointer group"
          onClick={() => navigate(`/spotlight/brands/${brand.id}`)}>
          
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-[var(--bg-page)] border border-[var(--border-soft)] flex items-center justify-center text-[var(--brand-blue)] font-bold text-lg">
                  {brand.name.charAt(0)}
                </div>
                <div>
                  <h3 className="card-title text-[15px] leading-tight mb-1 group-hover:text-[var(--brand-blue)] transition-colors">
                    {brand.name}
                  </h3>
                  <div className="text-[12px] text-[var(--text-muted)]">
                    {brand.vertical} · {brand.partners} partners
                  </div>
                </div>
              </div>
              <div>{getStatusPill(brand.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4 pt-3 border-t border-[var(--border-soft)]">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)] mb-1">
                  Stores
                </div>
                <div className="numeric-stat text-[16px]">
                  {brand.locations}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)] mb-1">
                  Go-Live
                </div>
                <div className="text-[13px] font-medium">{brand.goLive}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-soft)]">
              <div className="text-[12px] text-[var(--text-muted)]">
                {brand.status === 'live' ?
              'Active' :
              brand.status === 'in-onboarding' ?
              'Setup in progress' :
              'Awaiting setup'}
              </div>
              <div className="flex gap-2">
                <button className="btn-outline-xs flex items-center gap-1">
                  <ExternalLink size={12} /> View
                </button>
                <button className="p-1 text-[var(--text-muted)] hover:text-[var(--brand-blue)] rounded">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}