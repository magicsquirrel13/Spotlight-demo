import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Upload,
  Download,
  ExternalLink,
  TrendingUp,
  Phone,
  Mail,
  Activity,
  DollarSign,
  Users,
  Globe,
  Plus,
  CheckCircle,
  X,
  Loader2,
  Send,
  FileSpreadsheet,
  Search } from
'lucide-react';
import {
  BRANDS,
  getBrandById,
  getDealersForBrand,
  getPartnersForBrand } from
'../../data/mockData';
export function BrandSnapshot() {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [activeTab, setActiveTab] = useState('onboarding');
  const [selectedLocations, setSelectedLocations] = useState<Set<number>>(
    new Set()
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGMBModal, setShowGMBModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [gmbStep, setGmbStep] = useState<'connect' | 'fetching' | 'done'>(
    'connect'
  );
  const [inviteChannel, setInviteChannel] = useState<'email' | 'whatsapp'>(
    'whatsapp'
  );
  const [inviteSent, setInviteSent] = useState(false);
  const brandData = getBrandById(brandId || '');
  const partners = getPartnersForBrand(brandId || '');
  const firstPartner = partners[0];
  const allDealers = getDealersForBrand(brandId || '');
  const brand = {
    name: brandData?.name || 'Unknown Brand',
    vertical: brandData?.vertical || 'Consumer Electronics',
    status: partners.some((p) => p.status === 'live') ? 'live' : 'onboarding',
    goLive:
    partners.
    map((p) => p.operations.goLiveDate).
    filter(Boolean).
    sort()[0] || '—',
    locations: allDealers.length
  };
  const totalLeads = partners.reduce((s, p) => s + p.stats.leadsThisMonth, 0);
  const totalCampaigns = partners.reduce((s, p) => s + p.stats.liveCampaigns, 0);
  const totalMrr = partners.reduce((s, p) => s + p.stats.estMrr, 0);
  const LOCATIONS = allDealers.map((d, i) => {
    // Find which partner this dealer belongs to
    const parentPartner = partners.find((p) =>
    p.dealers.some((dl) => dl.id === d.id)
    );
    return {
      id: i,
      name: d.name,
      code: d.code,
      city: d.city,
      state: d.state,
      partner: parentPartner?.identity.shortName || '',
      contact: d.contact.name,
      phone: d.contact.phone,
      email: `${d.contact.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      status: d.status,
      campaigns: d.stats.campaigns,
      leads: d.stats.leads
    };
  });
  const allTemplates = partners.flatMap((p) => p.landingPageTemplates);
  const toggleLocation = (id: number) => {
    const next = new Set(selectedLocations);
    if (next.has(id)) next.delete(id);else
    next.add(id);
    setSelectedLocations(next);
  };
  const toggleAll = () => {
    if (selectedLocations.size === LOCATIONS.length) {
      setSelectedLocations(new Set());
    } else {
      setSelectedLocations(new Set(LOCATIONS.map((l) => l.id)));
    }
  };
  const getStatusPill = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="pill pill-done">Live</span>;
      case 'invited':
        return <span className="pill pill-submitted">Invited</span>;
      case 'pending':
        return <span className="pill pill-pending">Pending</span>;
      case 'onboarding':
        return <span className="pill pill-muted">Onboarding</span>;
      default:
        return <span className="pill pill-muted">{status}</span>;
    }
  };
  const tabs = [
  {
    id: 'onboarding',
    label: 'Onboarding Details'
  },
  {
    id: 'locations',
    label: 'Locations'
  },
  {
    id: 'landing',
    label: 'Landing Pages'
  },
  {
    id: 'campaigns',
    label: 'Campaigns'
  }];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Head */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
            <button
              onClick={() => navigate('/spotlight/brands')}
              className="hover:text-[var(--brand-blue)]">
              
              Brands
            </button>
            <span>/</span>
            <span>{brand.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="page-title">{brand.name}</h1>
            <span className="pill pill-done">Live</span>
          </div>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <ExternalLink size={14} /> View Partner Portal
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="sp-card py-4 px-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)]">
              <MapPin size={15} strokeWidth={1.5} />
            </div>
            <div className="numeric-stat text-[18px]">{brand.locations}</div>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Active Locations
          </div>
        </div>
        <div className="sp-card py-4 px-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)]">
              <Activity size={15} strokeWidth={1.5} />
            </div>
            <div className="numeric-stat text-[18px]">{totalCampaigns}</div>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Live Campaigns
          </div>
        </div>
        <div className="sp-card py-4 px-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)]">
              <Users size={15} strokeWidth={1.5} />
            </div>
            <div className="numeric-stat text-[18px]">
              {totalLeads.toLocaleString()}
            </div>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Leads This Month
          </div>
        </div>
        <div className="sp-card py-4 px-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)]">
              <DollarSign size={15} strokeWidth={1.5} />
            </div>
            <div className="numeric-stat text-[18px]">
              ₹{(totalMrr / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
            Est. MRR
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border-soft)]">
        <div className="filter-tabs">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            
              {tab.label}
            </button>
          )}
        </div>
      </div>

      {/* ===== ONBOARDING TAB ===== */}
      {activeTab === 'onboarding' &&
      <div className="sp-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="card-title">Onboarding Details</h2>
            <button
            onClick={() => navigate(`/spotlight/brands/${brandId}/edit`)}
            className="btn-outline-xs">
            
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <div className="field-label mb-1">Legal Name</div>
                <div className="text-sm">
                  {firstPartner?.identity.legalName || brand.name}
                </div>
              </div>
              <div>
                <div className="field-label mb-1">Vertical</div>
                <div className="text-sm">{brand.vertical}</div>
              </div>
              <div>
                <div className="field-label mb-1">Website</div>
                <div className="text-sm text-[var(--brand-blue)]">
                  {brandData?.website || '—'}
                </div>
              </div>
              <div>
                <div className="field-label mb-1">Go-Live Date</div>
                <div className="text-sm font-mono">{brand.goLive}</div>
              </div>
            </div>
            <div className="h-[1px] bg-[var(--border-soft)]"></div>
            <div>
              <div className="field-label mb-3">Commercials</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--bg-page)] p-3 rounded-[8px]">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    Who Pays
                  </div>
                  <div className="text-sm font-medium capitalize">
                    {firstPartner?.commercials.whoPays || 'Partner'}
                  </div>
                </div>
                <div className="bg-[var(--bg-page)] p-3 rounded-[8px]">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    Wallet Mode
                  </div>
                  <div className="text-sm font-medium capitalize">
                    {firstPartner?.commercials.walletMode || 'Prepaid'}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-[var(--border-soft)]"></div>
            <div>
              <div className="field-label mb-3">Package Configuration</div>
              <div className="bg-[var(--bg-page)] p-4 rounded-[8px]">
                <div className="font-medium mb-2">
                  {firstPartner?.package.name || 'Standard Package'}
                </div>
                <div className="text-sm text-[var(--text-muted)] mb-3">
                  Quarterly: ₹
                  {firstPartner?.package.prices.quarterly.toLocaleString() ||
                '13,499'}{' '}
                  · Half-yearly: ₹
                  {firstPartner?.package.prices.halfYearly.toLocaleString() ||
                '25,999'}{' '}
                  · Yearly: ₹
                  {firstPartner?.package.prices.yearly.toLocaleString() ||
                '49,999'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(
                firstPartner?.package.inclusions || [
                'google_ads',
                'meta_ads',
                'landing_pages',
                'lead_capture']).

                map((inc) =>
                <span
                  key={inc}
                  className="text-xs px-2 py-1 bg-white rounded-full border border-[var(--border-soft)] capitalize">
                  
                      {inc.replace(/_/g, ' ')}
                    </span>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {/* ===== LOCATIONS TAB (ENHANCED) ===== */}
      {activeTab === 'locations' &&
      <div className="flex flex-col gap-4">
          {/* Bulk Action Bar */}
          {selectedLocations.size > 0 &&
        <div className="bg-[var(--brand-indigo)] text-white rounded-[8px] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">
                  {selectedLocations.size} location
                  {selectedLocations.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 rounded-lg bg-white text-[var(--brand-indigo)] text-sm font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
              
                  <Send size={14} /> Invite for Onboarding
                </button>
                <button
              onClick={() => setSelectedLocations(new Set())}
              className="text-white/70 hover:text-white">
              
                  <X size={16} />
                </button>
              </div>
            </div>
        }

          <div className="sp-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="card-title">Locations</h2>
                <div className="text-sm text-[var(--text-muted)] mt-1">
                  {LOCATIONS.length} locations ·{' '}
                  {LOCATIONS.filter((l) => l.status === 'live').length} live ·{' '}
                  {LOCATIONS.filter((l) => l.status === 'pending').length}{' '}
                  pending
                </div>
              </div>
              <div className="flex gap-2">
                <button
                onClick={() => {
                  setGmbStep('connect');
                  setShowGMBModal(true);
                }}
                className="btn-outline flex items-center gap-2">
                
                  <Globe size={14} /> Fetch from GMB
                </button>
                <button
                onClick={() => setShowUploadModal(true)}
                className="btn-outline flex items-center gap-2">
                
                  <Upload size={14} /> Upload CSV
                </button>
                <button className="btn-primary-sm flex items-center gap-2">
                  <Plus size={14} /> Add Manually
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4 max-w-sm">
              <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            
              <input
              type="text"
              placeholder="Search locations..."
              className="h-[36px] w-full"
              style={{
                paddingLeft: '40px'
              }} />
            
            </div>

            <div className="border border-[var(--border-soft)] rounded-[8px] overflow-hidden">
              <table className="sp-table">
                <thead className="bg-[var(--bg-page)]">
                  <tr>
                    <th className="w-10">
                      <input
                      type="checkbox"
                      checked={selectedLocations.size === LOCATIONS.length}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded" />
                    
                    </th>
                    <th>Location Name</th>
                    <th>Partner</th>
                    <th>Code</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Campaigns</th>
                    <th>Leads</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {LOCATIONS.map((loc) =>
                <tr
                  key={loc.id}
                  className={
                  selectedLocations.has(loc.id) ? 'bg-blue-50/50' : ''
                  }>
                  
                      <td>
                        <input
                      type="checkbox"
                      checked={selectedLocations.has(loc.id)}
                      onChange={() => toggleLocation(loc.id)}
                      className="w-4 h-4 rounded" />
                    
                      </td>
                      <td className="font-medium">{loc.name}</td>
                      <td className="text-sm text-[var(--text-muted)]">
                        {loc.partner}
                      </td>
                      <td className="font-mono text-xs">{loc.code}</td>
                      <td>{loc.city}</td>
                      <td>{loc.state}</td>
                      <td>
                        <div className="text-sm">{loc.contact}</div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {loc.phone}
                        </div>
                      </td>
                      <td>{getStatusPill(loc.status)}</td>
                      <td className="font-mono">{loc.campaigns}</td>
                      <td className="font-mono">{loc.leads}</td>
                      <td>
                        <button
                      className="btn-outline-xs"
                      onClick={() => navigate('/partner/onboarding')}>
                      
                          View
                        </button>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }

      {/* ===== LANDING PAGES TAB ===== */}
      {activeTab === 'landing' &&
      <div className="sp-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="card-title">Landing Page Templates</h2>
              <div className="text-sm text-[var(--text-muted)] mt-1">
                Configure templates for location landing pages
              </div>
            </div>
            <button className="btn-primary-sm flex items-center gap-2">
              <Plus size={14} /> New Template
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {allTemplates.map((template) =>
          <div
            key={template.id}
            className="border border-[var(--border-soft)] rounded-[8px] p-4 hover:border-[var(--brand-blue)] transition-colors cursor-pointer">
            
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium mb-1">{template.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {template.storesUsing} stores using this ·{' '}
                      {template.scope === 'clientwise' ?
                  'Clientwise' :
                  'Brandwise'}
                    </div>
                  </div>
                  <span
                className={`pill ${template.status === 'active' ? 'pill-done' : 'pill-muted'}`}>
                
                    {template.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                onClick={() => {
                  const firstDealer = allDealers[0];
                  const dealerId = firstDealer ?
                  firstDealer.id :
                  'demo-dealer';
                  window.open(
                    `/landing/${dealerId}?brand=${brandId}`,
                    '_blank'
                  );
                }}
                className="btn-outline-xs flex items-center gap-1">
                
                    <Globe size={12} /> Preview
                  </button>
                  <button
                onClick={() =>
                navigate(
                  `/spotlight/brands/${brandId}/landing-pages/${template.id}`
                )
                }
                className="btn-primary-xs">
                
                    Edit Template
                  </button>
                </div>
              </div>
          )}
            {allTemplates.length === 0 &&
          <div className="col-span-2 empty">
                No landing page templates configured yet.
              </div>
          }
          </div>
        </div>
      }

      {/* ===== CAMPAIGNS TAB ===== */}
      {activeTab === 'campaigns' &&
      <div className="flex flex-col gap-4">
          <div className="sp-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="card-title">Campaigns Setup</h2>
                <div className="text-sm text-[var(--text-muted)] mt-1">
                  Media budget planning and campaign creation
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[var(--border-soft)] rounded-[8px] p-5">
                <div className="w-10 h-10 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)] mb-4">
                  <TrendingUp size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Media Budget Planning</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  The "magical science" of media plan creation across locations.
                </p>
                <button
                onClick={() =>
                navigate(`/spotlight/brands/${brandId}/media-plans`)
                }
                className="btn-primary-sm flex items-center gap-2">
                
                  <TrendingUp size={14} /> View Media Plans
                </button>
              </div>
              <div className="border border-[var(--border-soft)] rounded-[8px] p-5">
                <div className="w-10 h-10 rounded-[8px] bg-[var(--bg-page)] flex items-center justify-center text-[var(--brand-blue)] mb-4">
                  <Activity size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-medium mb-2">Campaign Creation</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Templatized ads creation for Meta and Google across locations.
                </p>
                <button
                onClick={() =>
                navigate(`/spotlight/campaigns?brandId=${brandId}`)
                }
                className="btn-primary-sm flex items-center gap-2">
                
                  <Plus size={14} /> Launch Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {/* ===== UPLOAD CSV MODAL ===== */}
      {showUploadModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg">Upload Locations CSV</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-5 hover:border-blue-300 transition-colors cursor-pointer">
              <FileSpreadsheet
              size={40}
              className="text-gray-300 mx-auto mb-3" />
            
              <div className="text-sm font-medium text-gray-700 mb-1">
                Drop your CSV file here or click to browse
              </div>
              <div className="text-xs text-gray-400">
                Supports .csv and .xlsx files
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-5">
              <div className="text-xs font-semibold text-gray-500 mb-2">
                REQUIRED COLUMNS
              </div>
              <div className="flex flex-wrap gap-2">
                {[
              'Location Name',
              'Store Code',
              'City',
              'State',
              'Contact Name',
              'Phone',
              'Email'].
              map((col) =>
              <span
                key={col}
                className="px-2 py-1 bg-white rounded text-xs font-mono border border-gray-200">
                
                    {col}
                  </span>
              )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <Download size={12} /> Download template
              </button>
              <div className="flex gap-2">
                <button
                onClick={() => setShowUploadModal(false)}
                className="btn-outline">
                
                  Cancel
                </button>
                <button
                onClick={() => setShowUploadModal(false)}
                className="btn-primary">
                
                  Upload & Import
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {/* ===== FETCH FROM GMB MODAL ===== */}
      {showGMBModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg">
                Fetch from Google My Business
              </h3>
              <button onClick={() => setShowGMBModal(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {gmbStep === 'connect' &&
          <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Globe size={28} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Connect Google My Business
                </h4>
                <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                  Authorize Spotlight to fetch your brand's business locations
                  from Google My Business.
                </p>
                <button
              onClick={() => {
                setGmbStep('fetching');
                setTimeout(() => setGmbStep('done'), 3000);
              }}
              className="btn-primary flex items-center gap-2 mx-auto">
              
                  <Globe size={14} /> Connect & Fetch Locations
                </button>
              </div>
          }

            {gmbStep === 'fetching' &&
          <div className="text-center py-10">
                <Loader2
              size={40}
              className="text-blue-500 animate-spin mx-auto mb-4" />
            
                <h4 className="font-semibold text-gray-900 mb-1">
                  Fetching locations...
                </h4>
                <p className="text-sm text-gray-500">
                  Pulling business profiles from Google My Business
                </p>
              </div>
          }

            {gmbStep === 'done' &&
          <div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-5">
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Found 12 locations from GMB
                  </span>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-5 max-h-[240px] overflow-y-auto">
                  <table className="sp-table">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th>Location</th>
                        <th>City</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                  'Samsung SmartPlaza – Sahil Electronics - Gurgoan',
                  'Samsung SmartPlaza – Metro Digital - Delhi',
                  'Samsung SmartPlaza – Nexus Digital - Noida',
                  'Samsung SmartPlaza – Prime Retail - Jaipur',
                  'Samsung SmartPlaza – Star Digital - Chandigarh'].
                  map((loc, i) =>
                  <tr key={i}>
                          <td className="font-medium text-sm">{loc}</td>
                          <td className="text-sm">{loc.split(' - ')[1]}</td>
                          <td>
                            <span className="pill pill-done text-xs">New</span>
                          </td>
                        </tr>
                  )}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                onClick={() => setShowGMBModal(false)}
                className="btn-outline">
                
                    Cancel
                  </button>
                  <button
                onClick={() => setShowGMBModal(false)}
                className="btn-primary">
                
                    Import All Locations
                  </button>
                </div>
              </div>
          }
          </div>
        </div>
      }

      {/* ===== INVITE MODAL ===== */}
      {showInviteModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg">
                Invite Partners for Onboarding
              </h3>
              <button
              onClick={() => {
                setShowInviteModal(false);
                setInviteSent(false);
              }}>
              
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {!inviteSent ?
          <>
                <div className="bg-blue-50 rounded-lg p-4 mb-5">
                  <div className="text-sm font-medium text-blue-700 mb-1">
                    {selectedLocations.size} location
                    {selectedLocations.size > 1 ? 's' : ''} selected
                  </div>
                  <div className="text-xs text-blue-600">
                    {Array.from(selectedLocations).
                map((id) => LOCATIONS.find((l) => l.id === id)?.name).
                join(', ')}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="field-label mb-2">Invite Channel</div>
                  <div className="flex gap-3">
                    <button
                  onClick={() => setInviteChannel('whatsapp')}
                  className={`flex-1 p-3 rounded-lg border-2 text-center transition-colors ${inviteChannel === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  
                      <div className="text-lg mb-1">💬</div>
                      <div className="text-sm font-medium">WhatsApp</div>
                      <div className="text-xs text-gray-500">
                        Higher open rate
                      </div>
                    </button>
                    <button
                  onClick={() => setInviteChannel('email')}
                  className={`flex-1 p-3 rounded-lg border-2 text-center transition-colors ${inviteChannel === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  
                      <div className="text-lg mb-1">📧</div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-gray-500">Formal invite</div>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-5">
                  <div className="text-xs font-semibold text-gray-500 mb-2">
                    INVITE PREVIEW
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm text-gray-700">
                    <p className="mb-2">
                      Hi <span className="font-semibold">[Partner Name]</span>,
                    </p>
                    <p className="mb-2">
                      You've been invited by{' '}
                      <span className="font-semibold">{brand.name}</span> to
                      join Spotlight and start generating leads for your
                      store.
                    </p>
                    <p className="mb-2">
                      🎯 50% co-op on ad spend
                      <br />⚡ Launch in ~2 minutes
                      <br />
                      🤖 AI-powered lead qualification
                    </p>
                    <p className="text-blue-600 underline">
                      Click here to get started →
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                onClick={() => {
                  setShowInviteModal(false);
                  setInviteSent(false);
                }}
                className="btn-outline">
                
                    Cancel
                  </button>
                  <button
                onClick={() => setInviteSent(true)}
                className="btn-primary flex items-center gap-2">
                
                    <Send size={14} /> Send {selectedLocations.size} Invite
                    {selectedLocations.size > 1 ? 's' : ''}
                  </button>
                </div>
              </> :

          <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">
                  Invites Sent!
                </h4>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedLocations.size} invite
                  {selectedLocations.size > 1 ? 's' : ''} sent via{' '}
                  {inviteChannel === 'whatsapp' ? 'WhatsApp' : 'Email'}.
                  Partners will receive the onboarding link shortly.
                </p>
                <button
              onClick={() => {
                setShowInviteModal(false);
                setInviteSent(false);
                setSelectedLocations(new Set());
              }}
              className="btn-primary">
              
                  Done
                </button>
              </div>
          }
          </div>
        </div>
      }
    </div>);

}