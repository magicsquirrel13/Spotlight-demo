import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { getBrandById } from '../../data/mockData';
import { setActiveBrandId } from '../../data/brandProfiles';
export function BrandOnboarding() {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const isEditMode = !!brandId;
  // Persist the brand being onboarded so partner flows stay linked to it.
  useEffect(() => {
    if (brandId) setActiveBrandId(brandId);
  }, [brandId]);
  const brand = brandId ? getBrandById(brandId) : undefined;
  const firstPartner = brand?.partners?.[0];
  // Helper to capitalize commercial values stored lowercase in data
  const cap = (v?: string) => v ? v.charAt(0).toUpperCase() + v.slice(1) : '';
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    isEditMode ? [1, 2, 3, 4] : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form State — prefilled in edit mode
  const [brandName, setBrandName] = useState(
    isEditMode ? firstPartner?.identity.shortName || brand?.name || '' : ''
  );
  const [whoPays, setWhoPays] = useState(
    isEditMode ?
    cap(firstPartner?.commercials.whoPays) || 'Partner' :
    'Partner'
  );
  const [networkType, setNetworkType] = useState(
    isEditMode ?
    cap(firstPartner?.commercials.networkType) || 'Partner' :
    'Partner'
  );
  const [mediaFunding, setMediaFunding] = useState(
    isEditMode ?
    cap(firstPartner?.commercials.mediaFunding) || 'Partner' :
    'Partner'
  );
  const [walletMode, setWalletMode] = useState(
    isEditMode ?
    cap(firstPartner?.commercials.walletMode) || 'Prepaid' :
    'Prepaid'
  );
  const [aiAddonsEnabled, setAiAddonsEnabled] = useState(
    isEditMode ? firstPartner?.addons?.aiVoiceAgent?.enabled ?? true : true
  );
  // Update dependent fields when "Who Pays?" changes
  const handleWhoPaysChange = (value: 'Brand' | 'Partner') => {
    setWhoPays(value);
    if (value === 'Brand') {
      setNetworkType('Central');
      setMediaFunding('Brand');
      setWalletMode('Brand Credit Line');
    } else {
      setNetworkType('Partner');
      setMediaFunding('Partner');
      setWalletMode('Partner Credit Line');
    }
  };
  const handleNext = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
    window.scrollTo(0, 0);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo(0, 0);
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (isEditMode && brandId) {
        navigate(`/spotlight/brands/${brandId}`);
      } else {
        alert('Brand onboarded successfully!');
        navigate('/spotlight/brands');
      }
    }, 800);
  };
  const StepHeader = ({
    num,
    title,
    summary




  }: {num: number;title: string;summary?: string;}) => {
    const isCompleted = completedSteps.includes(num) && activeStep !== num;
    const isActive = activeStep === num;
    if (isCompleted) {
      return (
        <div
          className="flex items-center justify-between p-4 bg-[var(--bg-page)] rounded-[8px] border border-[var(--border-soft)] cursor-pointer hover:border-[var(--brand-blue)] transition-colors"
          onClick={() => setActiveStep(num)}>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D0FEE5] text-[#003F1D] flex items-center justify-center">
              <Check size={16} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)]">
                Step {num}
              </div>
              <div className="font-medium">{title}</div>
            </div>
          </div>
          {summary &&
          <div className="text-sm text-[var(--text-muted)] bg-white px-3 py-1 rounded-full border border-[var(--border-soft)]">
              {summary}
            </div>
          }
        </div>);

    }
    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`studio-step-num ${isActive ? '' : 'opacity-50 bg-[var(--text-muted)]'}`}>
            
            {num}
          </div>
          <div
            className="section-label"
            style={{
              fontSize: '15px',
              textTransform: 'none',
              letterSpacing: '0'
            }}>
            
            {num} · {title}
          </div>
        </div>
      </div>);

  };
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
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
            {isEditMode && brand ?
            <>
                <button
                onClick={() => navigate(`/spotlight/brands/${brandId}`)}
                className="hover:text-[var(--brand-blue)]">
                
                  {brand.name}
                </button>
                <span>/</span>
                <span>Edit</span>
              </> :

            <span>New Onboarding</span>
            }
          </div>
          <h1 className="page-title">
            {isEditMode && brand ? `Edit ${brand.name}` : 'Onboard New Brand'}
          </h1>
          {isEditMode && brand &&
          <p className="text-sm text-[var(--text-muted)] mt-1">
              Update brand identity, commercials, packages and add-ons. Changes
              apply to all partners and dealers under this brand.
            </p>
          }
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Main Content Column */}
        <div className="flex flex-col gap-4">
          {/* STEP 1: Brand Setup */}
          {activeStep === 1 || completedSteps.includes(1) ?
          <div className={activeStep === 1 ? 'sp-card' : ''}>
              <StepHeader
              num={1}
              title="Brand Setup"
              summary={brandName || 'Draft'} />
            

              {activeStep === 1 &&
            <div className="flex flex-col gap-8 mt-6">
                  {/* Brand Identity */}
                  <div className="flex flex-col gap-4">
                    <div className="section-label">Brand Identity</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Legal Name</label>
                        <input
                      type="text"
                      placeholder="e.g. Samsung India Electronics Pvt Ltd"
                      defaultValue={firstPartner?.identity.legalName || ''} />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Brand Short Name</label>
                        <input
                      type="text"
                      placeholder="e.g. Samsung"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)} />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Vertical</label>
                        <select defaultValue={brand?.vertical || 'Consumer Electronics'}>
                          <option>Consumer Electronics</option>
                          <option>Real Estate</option>
                          <option>Health & Wellness</option>
                          <option>F&B</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Website</label>
                        <input
                      type="url"
                      placeholder="https://"
                      defaultValue={brand?.website || ''} />
                    
                      </div>
                    </div>
                  </div>

                  {/* Social & Web Presence */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border-soft)]">
                    <div className="section-label">Social & Web Presence</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">
                          Meta Brand Page ID
                        </label>
                        <input
                      type="text"
                      placeholder="123456789"
                      defaultValue={
                      firstPartner?.socialWeb?.metaBrandPageId || ''
                      } />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Website URL</label>
                        <input
                      type="url"
                      placeholder="https://"
                      defaultValue={
                      firstPartner?.socialWeb?.websiteUrl || ''
                      } />
                    
                      </div>
                    </div>
                  </div>

                  {/* Compliance & Legal */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border-soft)]">
                    <div className="section-label">Compliance & Legal</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">GST Number</label>
                        <input
                      type="text"
                      placeholder="22AAAAA0000A1Z5"
                      defaultValue={
                      firstPartner?.compliance?.gstNumber || ''
                      } />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">PAN</label>
                        <input
                      type="text"
                      placeholder="AAAAA0000A"
                      defaultValue={firstPartner?.compliance?.pan || ''} />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">
                          Contract Start Date
                        </label>
                        <input
                      type="date"
                      defaultValue={
                      firstPartner?.compliance?.contractStartDate || ''
                      } />
                    
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-dashed border-[var(--brand-blue)] bg-[var(--bg-page)] rounded-[8px] p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#E5F1FF] transition-colors">
                        <Upload
                      size={20}
                      className="text-[var(--brand-blue)] mb-2" />
                    
                        <div className="text-sm font-medium text-[var(--brand-blue)]">
                          Upload Store Agreement
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-1">
                          PDF up to 5MB
                        </div>
                      </div>
                      <div className="border border-dashed border-[var(--border-soft)] bg-[var(--bg-page)] rounded-[8px] p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#E5F1FF] transition-colors">
                        <Upload
                      size={20}
                      className="text-[var(--text-muted)] mb-2" />
                    
                        <div className="text-sm font-medium text-[var(--text-muted)]">
                          Upload Contract Doc
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-1">
                          PDF up to 10MB
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commercial & Media */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border-soft)]">
                    <div className="section-label">Commercial & Media</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Media Money Type</label>
                        <select
                      defaultValue={
                      cap(firstPartner?.commercials.mediaMoneyType) ||
                      'Prepaid'
                      }>
                      
                          <option>Prepaid</option>
                          <option>Postpaid</option>
                          <option>Credit</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Daily Max Budget</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                            ₹
                          </div>
                          <input
                        type="number"
                        className="font-mono"
                        style={{
                          paddingLeft: '36px'
                        }}
                        placeholder="10000"
                        defaultValue={
                        firstPartner?.commercials?.dailyMaxBudget || ''
                        } />
                      
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="field-label">
                        Intended Media Platforms
                      </label>
                      <div className="filter-tabs">
                        <button className="tab active">Google</button>
                        <button className="tab active">Meta</button>
                        <button className="tab active">WhatsApp CTWA</button>
                      </div>
                    </div>
                  </div>

                  {/* Operational Setup */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border-soft)]">
                    <div className="section-label">Operational Setup</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Go-Live Date</label>
                        <input
                      type="date"
                      defaultValue={
                      firstPartner?.operations?.goLiveDate || ''
                      } />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">
                          Expected # of Locations
                        </label>
                        <input
                      type="number"
                      className="font-mono"
                      placeholder="25"
                      defaultValue={
                      firstPartner?.operations?.expectedLocations || ''
                      } />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">
                          Location Type Label
                        </label>
                        <input
                      type="text"
                      placeholder="e.g. Retail Store"
                      defaultValue={
                      firstPartner?.operations?.locationTypeLabel || ''
                      } />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">
                          States of Operation
                        </label>
                        <input
                      type="text"
                      placeholder="e.g. Maharashtra, Karnataka"
                      defaultValue={
                      firstPartner?.operations?.statesOfOperation?.join(
                        ', '
                      ) || ''
                      } />
                    
                      </div>
                    </div>
                  </div>

                  {/* Brand-side POC */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border-soft)]">
                    <div className="section-label">Brand-side POC</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Name</label>
                        <input
                      type="text"
                      placeholder="Full name"
                      defaultValue={firstPartner?.poc?.name || ''} />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Email</label>
                        <input
                      type="email"
                      placeholder="name@brand.com"
                      defaultValue={firstPartner?.poc?.email || ''} />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Phone</label>
                        <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      defaultValue={firstPartner?.poc?.phone || ''} />
                    
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-[var(--border-soft)]">
                    <button
                  className="btn-primary flex items-center gap-2"
                  onClick={handleNext}>
                  
                      {isEditMode ? 'Continue' : 'Next Step'}{' '}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
            }
            </div> :
          null}

          {/* STEP 2: Commercials Setup */}
          {activeStep === 2 || completedSteps.includes(2) ?
          <div className={activeStep === 2 ? 'sp-card' : ''}>
              <StepHeader
              num={2}
              title="Commercials Setup"
              summary={whoPays + ' Pays'} />
            

              {activeStep === 2 &&
            <div className="flex flex-col gap-8 mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="field-label">Who Pays?</label>
                      <div className="filter-tabs">
                        <button
                      className={`tab ${whoPays === 'Brand' ? 'active' : ''}`}
                      onClick={() => handleWhoPaysChange('Brand')}>
                      
                          Brand
                        </button>
                        <button
                      className={`tab ${whoPays === 'Partner' ? 'active' : ''}`}
                      onClick={() => handleWhoPaysChange('Partner')}>
                      
                          Partner
                        </button>
                      </div>
                      <div className="field-help mt-1">
                        In the demo, click "Partner pays" (typical path).
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Network Type</label>
                        <select
                      value={networkType}
                      onChange={(e) => setNetworkType(e.target.value)}>
                      
                          <option>Partner</option>
                          <option>Central</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Media Funding</label>
                        <select
                      value={mediaFunding}
                      onChange={(e) => setMediaFunding(e.target.value)}>
                      
                          <option>Partner</option>
                          <option>Brand</option>
                          <option>Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Wallet Mode</label>
                        <select
                      value={walletMode}
                      onChange={(e) => setWalletMode(e.target.value)}>
                      
                          <option>Prepaid</option>
                          <option>PO</option>
                          {whoPays === 'Brand' &&
                      <option>Brand Credit Line</option>
                      }
                          {whoPays === 'Partner' &&
                      <option>Partner Credit Line</option>
                      }
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">
                          Media Billing Cadence
                        </label>
                        <select>
                          <option>Monthly</option>
                          <option>Quarterly</option>
                          <option>Per Campaign</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Velocity Type</label>
                        <select>
                          <option>Demand Gen</option>
                          <option>Retail Boost</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">AI Add-ons</label>
                        <div className="flex items-center gap-3 h-[38px]">
                          <div
                        className={`w-[34px] h-[20px] rounded-full p-[2px] cursor-pointer transition-colors ${aiAddonsEnabled ? 'bg-[var(--brand-blue)]' : 'bg-[#CBD5E1]'}`}
                        onClick={() => setAiAddonsEnabled(!aiAddonsEnabled)}>
                        
                            <div
                          className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform ${aiAddonsEnabled ? 'translate-x-[14px]' : 'translate-x-0'}`}>
                        </div>
                          </div>
                          <span className="text-sm">
                            {aiAddonsEnabled ? 'Allowed' : 'Not allowed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[var(--border-soft)]">
                    <button
                  className="btn-outline flex items-center gap-2"
                  onClick={handleBack}>
                  
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                  className="btn-primary flex items-center gap-2"
                  onClick={handleNext}>
                  
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
            }
            </div> :

          <div className="opacity-50 pointer-events-none">
              <StepHeader num={2} title="Commercials Setup" />
            </div>
          }

          {/* STEP 3: Configure Packages */}
          {activeStep === 3 || completedSteps.includes(3) ?
          <div className={activeStep === 3 ? 'sp-card' : ''}>
              <StepHeader
              num={3}
              title="Configure Packages"
              summary="1 Package Type" />
            

              {activeStep === 3 &&
            <div className="flex flex-col gap-6 mt-6">
                  <p className="text-sm text-[var(--text-muted)]">
                    One package type with three cadence options: Quarterly,
                    Half-yearly, Yearly.
                  </p>

                  <div className="border border-[var(--border-soft)] rounded-[8px] overflow-hidden">
                    <table className="sp-table">
                      <thead className="bg-[var(--bg-page)]">
                        <tr>
                          <th>Package</th>
                          <th>Quarterly (₹)</th>
                          <th>Half-yearly (₹)</th>
                          <th>Yearly (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#F2F8FF]/30">
                          <td className="font-medium">Standard Package</td>
                          <td className="font-mono text-[13px]">13,499</td>
                          <td className="font-mono text-[13px]">25,999</td>
                          <td className="font-mono text-[13px]">49,999</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border-soft)]">
                    <div className="section-label">Inclusions</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                  'Google Ads',
                  'Meta Ads',
                  'Landing Pages',
                  'Lead Capture',
                  'Analytics Dashboard',
                  'WhatsApp CTWA'].
                  map((inc) =>
                  <label
                    key={inc}
                    className="flex items-center gap-2 cursor-pointer">
                    
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">{inc}</span>
                        </label>
                  )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border-soft)]">
                    <div className="section-label">Cadence Discounts</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Quarterly (%)</label>
                        <input
                      type="number"
                      className="font-mono"
                      placeholder="0" />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Half-yearly (%)</label>
                        <input
                      type="number"
                      className="font-mono"
                      placeholder="5" />
                    
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="field-label">Yearly (%)</label>
                        <input
                      type="number"
                      className="font-mono"
                      placeholder="10" />
                    
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[var(--border-soft)]">
                    <button
                  className="btn-outline flex items-center gap-2"
                  onClick={handleBack}>
                  
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                  className="btn-primary flex items-center gap-2"
                  onClick={handleNext}>
                  
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
            }
            </div> :

          <div className="opacity-50 pointer-events-none">
              <StepHeader num={3} title="Configure Packages" />
            </div>
          }

          {/* STEP 4: Add-ons */}
          {activeStep === 4 || completedSteps.includes(4) ?
          <div className={activeStep === 4 ? 'sp-card' : ''}>
              <StepHeader
              num={4}
              title="Add-ons"
              summary={aiAddonsEnabled ? 'AI Voice Agent' : 'None'} />
            

              {activeStep === 4 &&
            <div className="flex flex-col gap-6 mt-6">
                  <div className="border border-[var(--border-soft)] rounded-[8px] p-4 bg-[var(--bg-page)]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-medium text-[var(--brand-blue)]">
                          AI Voice Agent
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-1">
                          The only add-on type for this brand.
                        </div>
                      </div>
                      <div
                    className={`w-[34px] h-[20px] rounded-full p-[2px] cursor-pointer transition-colors ${aiAddonsEnabled ? 'bg-[var(--brand-blue)]' : 'bg-[#CBD5E1]'}`}
                    onClick={() => setAiAddonsEnabled(!aiAddonsEnabled)}>
                    
                        <div
                      className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform ${aiAddonsEnabled ? 'translate-x-[14px]' : 'translate-x-0'}`}>
                    </div>
                      </div>
                    </div>

                    {aiAddonsEnabled &&
                <div className="flex flex-col gap-4 pt-4 border-t border-[var(--border-soft)]">
                        <div className="flex flex-col gap-1.5">
                          <label className="field-label">Cost Per Token</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                              ₹
                            </div>
                            <input
                        type="number"
                        className="font-mono"
                        style={{
                          paddingLeft: '36px'
                        }}
                        defaultValue={2}
                        step="0.1" />
                      
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="field-label">
                            Token Pack Denominations
                          </label>
                          <div className="grid grid-cols-4 gap-3">
                            {[
                      {
                        label: 'Pack 100',
                        value: 100
                      },
                      {
                        label: 'Pack 500',
                        value: 500
                      },
                      {
                        label: 'Pack 2000',
                        value: 2000
                      },
                      {
                        label: 'Custom',
                        value: 0
                      }].
                      map((pack) =>
                      <div
                        key={pack.label}
                        className="border border-[var(--border-soft)] rounded-[8px] p-3 text-center cursor-pointer hover:border-[var(--brand-blue)] transition-colors">
                        
                                <div className="text-sm font-medium">
                                  {pack.label}
                                </div>
                                {pack.value > 0 &&
                        <div className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                                    ₹{pack.value * 2}
                                  </div>
                        }
                              </div>
                      )}
                          </div>
                        </div>
                      </div>
                }
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[var(--border-soft)]">
                    <button
                  className="btn-outline flex items-center gap-2"
                  onClick={handleBack}>
                  
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                  className="btn-success flex items-center gap-2"
                  onClick={handleSubmit}
                  disabled={isSubmitting}>
                  
                      {isSubmitting ?
                  'Saving...' :
                  isEditMode ?
                  'Save Changes' :
                  'Complete Onboarding'}{' '}
                      <Check size={16} />
                    </button>
                  </div>
                </div>
            }
            </div> :

          <div className="opacity-50 pointer-events-none">
              <StepHeader num={4} title="Add-ons" />
            </div>
          }
        </div>

        {/* Right Rail: Live Preview / Summary */}
        <div className="sticky top-[88px] flex flex-col gap-4">
          <div className="sp-card bg-[var(--brand-indigo)] text-white border-none">
            <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-white/50 mb-4">
              Live Summary
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <div className="text-white/50 text-xs mb-1">Brand</div>
                <div className="font-medium text-lg">
                  {brandName || 'Untitled Brand'}
                </div>
              </div>

              <div className="h-[1px] bg-white/10"></div>

              <div>
                <div className="text-white/50 text-xs mb-1">Commercials</div>
                <div className="font-medium">{whoPays} Pays</div>
                {activeStep > 2 &&
                <div className="text-sm text-white/80 mt-1">
                    Prepaid Wallet
                  </div>
                }
              </div>

              {activeStep > 3 &&
              <>
                  <div className="h-[1px] bg-white/10"></div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">Package</div>
                    <div className="font-medium">Standard Package</div>
                    <div className="text-sm text-white/80 mt-1">
                      Q / H / Y Cadences
                    </div>
                  </div>
                </>
              }

              {activeStep > 4 &&
              <>
                  <div className="h-[1px] bg-white/10"></div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">Add-ons</div>
                    <div className="font-medium">
                      {aiAddonsEnabled ? 'AI Voice Agent' : 'None'}
                    </div>
                  </div>
                </>
              }
            </div>
          </div>

          <div className="sp-card bg-transparent border-dashed border-[var(--border-soft)] shadow-none text-center p-6">
            <div className="w-10 h-10 rounded-full bg-white border border-[var(--border-soft)] flex items-center justify-center mx-auto mb-3 text-[var(--brand-blue)]">
              <Check size={20} />
            </div>
            <div className="text-sm font-medium mb-1">Auto-saving draft</div>
            <div className="text-xs text-[var(--text-muted)]">
              You can leave and resume this setup later.
            </div>
          </div>
        </div>
      </div>
    </div>);

}