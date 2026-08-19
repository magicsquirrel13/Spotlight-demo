import React, { useEffect, useMemo, useState, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  Image,
  MapPin,
  Monitor,
  Phone,
  MessageCircle,
  Globe,
  Zap,
  Target,
  Palette,
  FileText,
  Rocket,
  X,
  Eye,
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  Search,
  Languages,
  User,
  Sparkles } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRANDS as ALL_BRANDS, getBrandById } from '../../data/mockData';
import { setActiveBrandId } from '../../data/brandProfiles';
type Platform = 'meta' | 'google';
type GoogleSub = 'pmax' | 'search';
const STEPS = [
'Setup',
'Campaign Template',
'Targeting Templates',
'Creative & Copy',
'Conversion Setup',
'Review & Launch'];

const BRANDS = ALL_BRANDS.map((b) => b.name);
// Brand-aware helpers
const STATE_LANGUAGE_MAP: Record<string, string> = {
  Maharashtra: 'Marathi',
  Gujarat: 'Gujarati',
  Karnataka: 'Kannada',
  'Tamil Nadu': 'Tamil',
  Kerala: 'Malayalam',
  Telangana: 'Telugu',
  'Andhra Pradesh': 'Telugu',
  Delhi: 'Hindi',
  Haryana: 'Hindi',
  'Uttar Pradesh': 'Hindi',
  Punjab: 'Punjabi',
  Chandigarh: 'Hindi',
  'Himachal Pradesh': 'Hindi',
  Goa: 'English'
};
const BRAND_FLAGSHIP_MODEL: Record<
  string,
  {
    model: string;
    slug: string;
  }> =
{
  br_maruti: {
    model: 'Galaxy Z Fold8 Ultra 5G',
    slug: 'galaxy-z-fold8'
  },
  br_hyundai: {
    model: 'Neo QLED 4K QN90D',
    slug: 'neo-qled-qn90d'
  },
  br_tata: {
    model: 'Galaxy S24 Ultra 5G',
    slug: 'galaxy-s24-ultra'
  },
  br_mahindra: {
    model: 'Galaxy S24 Ultra 5G',
    slug: 'galaxy-s24-ultra'
  },
  br_toyota: {
    model: 'Galaxy Book5 Pro',
    slug: 'galaxy-book5-pro'
  },
  br_kia: {
    model: 'The Frame LS03D',
    slug: 'the-frame-ls03d'
  },
  br_mercedes: {
    model: 'Neo QLED 8K QN900D',
    slug: 'neo-qled-8k-qn900d'
  }
};
const TRANSLATED_BY_LANGUAGE: Record<
  string,
  {
    tagline: string;
    offer: string;
  }> =
{
  Hindi: {
    tagline: 'नया Galaxy अनुभव करें',
    offer: 'त्योहारी ऑफर ₹50,000 तक की छूट'
  },
  Marathi: {
    tagline: 'नवीन Galaxy अनुभवा',
    offer: 'सणासुदीला ₹50,000 पर्यंत सूट'
  },
  Gujarati: {
    tagline: 'નવું Galaxy અનુભવો',
    offer: 'તહેવારી ઓફર ₹50,000 સુધી ડિસ્કાઉન્ટ'
  },
  Kannada: {
    tagline: 'ಹೊಸ Galaxy ಅನುಭವಿಸಿ',
    offer: 'ಹಬ್ಬದ ಕೊಡುಗೆ ₹50,000 ರಿಯಾಯಿತಿ'
  },
  Tamil: {
    tagline: 'புதிய Galaxy-ஐ அனுபவியுங்கள்',
    offer: 'திருவிழா ஆஃபர் ₹50,000 வரை'
  },
  Telugu: {
    tagline: 'కొత్త Galaxy అనుభవించండి',
    offer: 'పండుగ ఆఫర్ ₹50,000 వరకు'
  },
  Malayalam: {
    tagline: 'പുതിയ Galaxy അനുഭവിക്കൂ',
    offer: 'ഉത്സവ ഓഫർ ₹50,000 വരെ'
  },
  Punjabi: {
    tagline: 'ਨਵਾਂ Galaxy ਅਨੁਭਵ ਕਰੋ',
    offer: 'ਤਿਉਹਾਰੀ ਆਫਰ ₹50,000 ਤੱਕ ਛੂਟ'
  },
  English: {
    tagline: 'Experience the All-New',
    offer: 'Festive offer up to ₹50,000 off'
  }
};
const CAMPAIGN_TEMPLATES = [
{
  id: 't1',
  name: 'Festive Lead Gen',
  objective: 'Leads',
  bidding: 'Max Conversions',
  budget: '₹3,500/day',
  schedule: 'Oct 15 – Nov 15',
  language: 'Hindi + English',
  source: 'Brand'
},
{
  id: 't2',
  name: 'Always-On Awareness',
  objective: 'Awareness',
  bidding: 'Reach',
  budget: '₹2,000/day',
  schedule: 'Ongoing',
  language: 'English',
  source: 'Global'
},
{
  id: 't3',
  name: 'Store Demo Leads',
  objective: 'Leads',
  bidding: 'Target CPA',
  budget: '₹5,000/day',
  schedule: 'Nov 1 – Dec 31',
  language: 'English',
  source: 'Brand'
},
{
  id: 't4',
  name: 'Custom Q4 Push',
  objective: 'Traffic',
  bidding: 'Max Clicks',
  budget: '₹1,500/day',
  schedule: 'Dec 1 – Dec 31',
  language: 'Regional',
  source: 'Custom'
}];

const TARGETING_TEMPLATES = [
{
  id: 'a1',
  name: 'In-Market Electronics Buyers',
  desc: 'Age 25–45, interested in premium phones & TVs, within 15km radius',
  type: 'Broad',
  keywords: 'galaxy, store demo, new smartphone'
},
{
  id: 'a2',
  name: 'Competitor Conquesting',
  desc: 'People researching LG, Sony, Apple models',
  type: 'Focused',
  keywords: 'iphone 15, sony bravia'
},
{
  id: 'a3',
  name: 'Service & Accessories',
  desc: 'Existing owners, warranty due, accessory interest',
  type: 'Retargeting',
  keywords: 'device service, galaxy buds'
},
{
  id: 'a4',
  name: 'Festive Shoppers',
  desc: 'Diwali/Navratri intent, No Cost EMI seekers',
  type: 'Seasonal',
  keywords: 'diwali offer, no cost emi'
},
{
  id: 'a5',
  name: 'Young Professionals',
  desc: 'Age 22–32, first-time buyers, urban',
  type: 'Demographic',
  keywords: 'first smartphone, budget galaxy'
}];

const IMAGES = [
{
  id: 'i1',
  label: 'Galaxy Z Fold8 Ultra 5G',
  ratio: '1:1',
  url: '/samsung-zfold8.png'
},
{
  id: 'i2',
  label: 'Neo QLED 8K QN900D',
  ratio: '16:9',
  url: '/samsung-neo-qled.png'
},
{
  id: 'i3',
  label: 'Galaxy S24 Ultra 5G',
  ratio: '1:1',
  url: '/samsung-s24-ultra.png'
},
{
  id: 'i4',
  label: 'Bespoke French Door RF57DG',
  ratio: '9:16',
  url: '/samsung-bespoke-fridge.png'
},
{
  id: 'i5',
  label: 'Galaxy Book5 Pro',
  ratio: '1:1',
  url: '/samsung-galaxy-book.png'
},
{
  id: 'i6',
  label: 'Bespoke AI Washing Machine WW11DG',
  ratio: '9:16',
  url: '/samsung-washer.png'
},
{
  id: 'i7',
  label: 'Neo QLED 4K QN90D',
  ratio: '16:9',
  url: '/samsung-neo-qled.png'
},
{
  id: 'i8',
  label: 'Galaxy S24 Ultra 5G',
  ratio: '1:1',
  url: '/samsung-s24-ultra.png'
}];

export function CampaignLauncher() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brandIdParam = searchParams.get('brandId');
  // Link the partner-facing experience to whichever brand is being set up here.
  useEffect(() => {
    if (brandIdParam) setActiveBrandId(brandIdParam);
  }, [brandIdParam]);
  const resolvedBrand = brandIdParam ? getBrandById(brandIdParam) : undefined;
  const defaultBrandName = resolvedBrand?.name || 'Samsung India';
  const flagship =
  BRAND_FLAGSHIP_MODEL[resolvedBrand?.id || 'br_maruti'] ||
  BRAND_FLAGSHIP_MODEL.br_maruti;
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>('meta');
  const [googleSub, setGoogleSub] = useState<GoogleSub>('pmax');
  const [brand, setBrand] = useState(defaultBrandName);
  const [processName, setProcessName] = useState('Festive Q4 Lead Gen');
  // Compute LOCATIONS dynamically based on selected brand
  const LOCATIONS = useMemo(() => {
    const selectedBrand = ALL_BRANDS.find((b) => b.name === brand);
    if (!selectedBrand) return [];
    // Group dealers by city
    const cityMap = new Map<
      string,
      {
        city: string;
        partner: string;
        count: number;
      }>(
    );
    selectedBrand.partners.forEach((p) => {
      p.dealers.forEach((d) => {
        const existing = cityMap.get(d.city);
        if (existing) {
          existing.count += 1;
        } else {
          cityMap.set(d.city, {
            city: d.city,
            partner: p.identity.shortName,
            count: 1
          });
        }
      });
    });
    return Array.from(cityMap.entries()).map(([city, info]) => ({
      id: city.toLowerCase().replace(/\s+/g, '-').slice(0, 6),
      label: `${city} (${info.count} dealer${info.count > 1 ? 's' : ''})`,
      city: info.city,
      partner: info.partner,
      count: info.count
    }));
  }, [brand]);
  // Compute SAMPLE_DEALERS dynamically based on selected brand
  const SAMPLE_DEALERS = useMemo(() => {
    const selectedBrand = ALL_BRANDS.find((b) => b.name === brand);
    if (!selectedBrand) return [];
    const allDealers = selectedBrand.partners.flatMap((p) =>
    p.dealers.filter((d) => d.status === 'live')
    );
    return allDealers.slice(0, 3).map((d, i) => {
      const language = STATE_LANGUAGE_MAP[d.state] || 'English';
      const translation =
      TRANSLATED_BY_LANGUAGE[language] || TRANSLATED_BY_LANGUAGE.English;
      return {
        id: `d${i + 1}`,
        name: d.name,
        city: d.city,
        language,
        phone: d.contact.phone,
        address: `${d.city}, ${d.state}`,
        translatedTagline: `${translation.tagline} ${flagship.model}`,
        translatedOffer: translation.offer
      };
    });
  }, [brand, flagship.model]);
  // Dealers list for the per-dealer resolution table
  const RESOLUTION_DEALERS = useMemo(() => {
    const selectedBrand = ALL_BRANDS.find((b) => b.name === brand);
    if (!selectedBrand) return [];
    const dealers = selectedBrand.partners.flatMap((p) =>
    p.dealers.filter((d) => d.status === 'live')
    );
    return dealers.slice(0, 3).map((d) => ({
      dealer: d.name,
      city: d.city,
      slug: d.name.
      toLowerCase().
      replace(/\s+/g, '-').
      replace(/[^a-z0-9-]/g, '')
    }));
  }, [brand]);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(
    new Set()
  );
  // Auto-select first 2 locations when brand changes
  useEffect(() => {
    if (LOCATIONS.length > 0) {
      setSelectedLocations(new Set(LOCATIONS.slice(0, 2).map((l) => l.id)));
    } else {
      setSelectedLocations(new Set());
    }
  }, [LOCATIONS]);
  const [selectedTemplate, setSelectedTemplate] = useState('t1');
  const [selectedTargeting, setSelectedTargeting] = useState<Set<string>>(
    new Set(['a1', 'a2', 'a4'])
  );
  const [headlines, setHeadlines] = useState([
  'Experience the All-New {Model} in {City}',
  'Book Your Store Demo Today',
  '{Store} — Festive Offers Live']
  );
  const [descriptions, setDescriptions] = useState([
  'Visit {Store} in {City}. Exclusive festive offers on {Model}. Book now!',
  'No Cost EMI from ₹2,999/mo. Free Galaxy Buds worth ₹9,999.']
  );
  const [selectedImages, setSelectedImages] = useState<Set<string>>(
    new Set(['i1', 'i2', 'i5'])
  );
  const [imageFilter, setImageFilter] = useState('All');
  // Brand Personalization Rules
  const [dealerInfoAllowed, setDealerInfoAllowed] = useState({
    name: true,
    phone: true,
    address: false
  });
  const [regionalLanguageAllowed, setRegionalLanguageAllowed] = useState(true);
  const [offerText, setOfferText] = useState('Festive offers up to ₹50,000 off');
  const [tagline, setTagline] = useState(`Experience the All-New ${flagship.model}`);
  // Update tagline when brand changes
  useEffect(() => {
    const selectedBrand = ALL_BRANDS.find((b) => b.name === brand);
    const f =
    BRAND_FLAGSHIP_MODEL[selectedBrand?.id || 'br_maruti'] ||
    BRAND_FLAGSHIP_MODEL.br_maruti;
    setTagline(`Experience the All-New ${f.model}`);
  }, [brand]);
  const [previewDealerId, setPreviewDealerId] = useState('d1');
  const [cta, setCta] = useState('Book Now');
  const [conversionMethods, setConversionMethods] = useState<Set<string>>(
    new Set(['lead-form', 'landing'])
  );
  const [showLaunchSuccess, setShowLaunchSuccess] = useState(false);
  const [showPreviewOverlay, setShowPreviewOverlay] = useState(false);
  const [previewLocation, setPreviewLocation] = useState('Mumbai');
  const [templateSourceTab, setTemplateSourceTab] = useState('all');
  const totalLocations = Array.from(selectedLocations).reduce(
    (sum, id) => sum + (LOCATIONS.find((l) => l.id === id)?.count || 0),
    0
  );
  const totalAdGroups = totalLocations * selectedTargeting.size;
  const dailyBudget = totalLocations * 3500;
  const estLeads = Math.round(totalAdGroups * 4.2);
  const platformLabel =
  platform === 'meta' ?
  'Meta' :
  googleSub === 'pmax' ?
  'Google PMax' :
  'Google Search';
  const targetingSubtitle =
  platform === 'meta' ?
  'Each becomes an Ad Set' :
  googleSub === 'pmax' ?
  'Each becomes an Asset Group' :
  'Each becomes an Ad Group';
  const toggleSet = (set: Set<string>, id: string) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  };
  const filteredImages =
  imageFilter === 'All' ?
  IMAGES :
  IMAGES.filter((i) => i.ratio === imageFilter);
  return (
    <div className="flex flex-col gap-0 -m-[24px_32px_40px] -mt-6 -mx-8 -mb-10">
      {/* Top Bar — Compact */}
      <div className="bg-white border-b border-[var(--border-soft)] px-5 py-1.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/spotlight/brands')}
            className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-[var(--text-muted)]">
              Campaign Launcher
            </div>
            <div className="w-px h-3 bg-[var(--border-soft)]"></div>
            <div className="font-semibold text-xs">
              {brand} — {processName || 'New Process'}
            </div>
          </div>
        </div>

        {/* Platform Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <button
              onClick={() => setPlatform('meta')}
              className={`px-3 py-1 rounded text-[10px] font-semibold transition-colors ${platform === 'meta' ? 'bg-[#1877F2] text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              
              Meta
            </button>
            <button
              onClick={() => setPlatform('google')}
              className={`px-3 py-1 rounded text-[10px] font-semibold transition-colors ${platform === 'google' ? 'bg-[#4285F4] text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              
              Google
            </button>
          </div>
          {platform === 'google' &&
          <div className="flex bg-gray-100 rounded-md p-0.5">
              <button
              onClick={() => setGoogleSub('pmax')}
              className={`px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${googleSub === 'pmax' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
              
                PMax
              </button>
              <button
              onClick={() => setGoogleSub('search')}
              className={`px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${googleSub === 'search' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
              
                Search
              </button>
            </div>
          }
        </div>
      </div>

      {/* Step Indicator — Compact */}
      <div className="bg-white border-b border-[var(--border-soft)] px-5 py-1.5">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) =>
          <Fragment key={s}>
              <button
              onClick={() => i <= step && setStep(i)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${i === step ? 'bg-[var(--brand-indigo)] text-white' : i < step ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              
                {i < step ?
              <Check size={9} /> :

              <span className="w-3.5 text-center">{i + 1}</span>
              }
                <span className="hidden xl:inline">{s}</span>
              </button>
              {i < STEPS.length - 1 &&
            <div
              className={`flex-1 h-0.5 min-w-[8px] ${i < step ? 'bg-green-300' : 'bg-gray-200'}`} />

            }
            </Fragment>
          )}
        </div>
      </div>

      {/* Main Content + Right Rail */}
      <div className="flex gap-5 p-6 min-h-[calc(100vh-180px)]">
        {/* Left — Step Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.2
              }}>
              
              {/* STEP 1 — Setup */}
              {step === 0 &&
              <div className="sp-card">
                  <h2 className="card-title mb-1">Setup</h2>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Configure the basics for your campaign batch.
                  </p>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="field-label mb-1.5">Brand</label>
                      <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full">
                      
                        {BRANDS.map((b) =>
                      <option key={b}>{b}</option>
                      )}
                      </select>
                    </div>
                    <div>
                      <label className="field-label mb-1.5">Process Name</label>
                      <input
                      type="text"
                      value={processName}
                      onChange={(e) => setProcessName(e.target.value)}
                      className="w-full" />
                    
                    </div>
                    <div>
                      <label className="field-label mb-1.5">
                        Ad Account / Customer ID
                      </label>
                      <select className="w-full">
                        <option>
                          {platform === 'meta' ?
                        'Meta — act_123456789' :
                        'Google — 123-456-7890'}
                        </option>
                      </select>
                    </div>
                    {platform === 'google' &&
                  <div>
                        <label className="field-label mb-1.5">
                          Product / Data Source
                        </label>
                        <select className="w-full">
                          <option>Galaxy S24 Ultra 5G (SM-S928B) — Product Feed</option>
                          <option>Galaxy Z Fold8 Ultra 5G (SM-F958B) — Product Feed</option>
                          <option>Neo QLED 8K QN900D (QA85QN900D) — Product Feed</option>
                        </select>
                      </div>
                  }
                  </div>

                  <div className="mt-6">
                    <label className="field-label mb-3">Locations</label>
                    <div className="grid grid-cols-2 gap-2">
                      {LOCATIONS.map((loc) =>
                    <label
                      key={loc.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedLocations.has(loc.id) ? 'border-[var(--brand-blue)] bg-blue-50/50' : 'border-[var(--border-soft)] hover:border-gray-300'}`}>
                      
                          <input
                        type="checkbox"
                        checked={selectedLocations.has(loc.id)}
                        onChange={() =>
                        setSelectedLocations(
                          toggleSet(selectedLocations, loc.id)
                        )
                        }
                        className="w-4 h-4 rounded" />
                      
                          <div>
                            <div className="text-sm font-medium">
                              {loc.label}
                            </div>
                            <div className="text-xs text-[var(--text-muted)]">
                              {loc.city}
                            </div>
                          </div>
                        </label>
                    )}
                    </div>
                    <div className="mt-2 text-xs text-[var(--text-muted)]">
                      {selectedLocations.size} groups · {totalLocations}{' '}
                      locations selected
                    </div>
                  </div>
                </div>
              }

              {/* STEP 2 — Campaign Template */}
              {step === 1 &&
              <div className="sp-card">
                  <h2 className="card-title mb-1">Campaign Template</h2>
                  <p className="text-sm text-[var(--text-muted)] mb-5">
                    Pick a campaign template. Fields adapt to {platformLabel}.
                  </p>

                  <div className="filter-tabs mb-5">
                    {[
                  {
                    id: 'all',
                    label: 'All',
                    count: 4
                  },
                  {
                    id: 'Brand',
                    label: 'Brand',
                    count: 2
                  },
                  {
                    id: 'Global',
                    label: 'Global',
                    count: 1
                  },
                  {
                    id: 'Custom',
                    label: 'Custom',
                    count: 1
                  }].
                  map((t) =>
                  <button
                    key={t.id}
                    className={`tab ${templateSourceTab === t.id ? 'active' : ''}`}
                    onClick={() => setTemplateSourceTab(t.id)}>
                    
                        {t.label}{' '}
                        <span className="ml-1 text-[10px] opacity-60">
                          {t.count}
                        </span>
                      </button>
                  )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {CAMPAIGN_TEMPLATES.filter(
                    (t) =>
                    templateSourceTab === 'all' ||
                    t.source === templateSourceTab
                  ).map((t) =>
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`text-left p-4 rounded-lg border-2 transition-colors ${selectedTemplate === t.id ? 'border-[var(--brand-blue)] bg-blue-50/40' : 'border-[var(--border-soft)] hover:border-gray-300'}`}>
                    
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{t.name}</span>
                          <span
                        className={`pill text-[10px] ${t.source === 'Brand' ? 'pill-done' : t.source === 'Global' ? 'pill-submitted' : 'pill-pending'}`}>
                        
                            {t.source}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                          <div>
                            Objective:{' '}
                            <span className="text-gray-700">{t.objective}</span>
                          </div>
                          <div>
                            Bidding:{' '}
                            <span className="text-gray-700">{t.bidding}</span>
                          </div>
                          <div>
                            Budget:{' '}
                            <span className="text-gray-700">{t.budget}</span>
                          </div>
                          <div>
                            Schedule:{' '}
                            <span className="text-gray-700">{t.schedule}</span>
                          </div>
                        </div>
                      </button>
                  )}
                  </div>
                </div>
              }

              {/* STEP 3 — Targeting Templates */}
              {step === 2 &&
              <div className="sp-card">
                  <h2 className="card-title mb-1">Targeting Templates</h2>
                  <p className="text-sm text-[var(--text-muted)] mb-5">
                    {platformLabel} · {targetingSubtitle}. Select 1–5 templates.
                  </p>

                  <div className="space-y-3">
                    {TARGETING_TEMPLATES.map((t) =>
                  <button
                    key={t.id}
                    onClick={() =>
                    setSelectedTargeting(
                      toggleSet(selectedTargeting, t.id)
                    )
                    }
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors flex items-start gap-3 ${selectedTargeting.has(t.id) ? 'border-[var(--brand-blue)] bg-blue-50/40' : 'border-[var(--border-soft)] hover:border-gray-300'}`}>
                    
                        <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedTargeting.has(t.id) ? 'bg-[var(--brand-blue)] border-[var(--brand-blue)]' : 'border-gray-300'}`}>
                      
                          {selectedTargeting.has(t.id) &&
                      <Check size={12} className="text-white" />
                      }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {t.name}
                            </span>
                            <span className="pill pill-muted text-[10px]">
                              {t.type}
                            </span>
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {t.desc}
                          </div>
                          {platform === 'google' &&
                      <div className="text-xs text-[var(--text-muted)] mt-1">
                              Keywords: {t.keywords}
                            </div>
                      }
                        </div>
                      </button>
                  )}
                  </div>
                  <div className="mt-3 text-xs text-[var(--text-muted)]">
                    {selectedTargeting.size} of 5 selected
                  </div>
                </div>
              }

              {/* STEP 4 — Creative & Copy */}
              {step === 3 &&
              <div className="flex flex-col gap-5">
                  {/* A. Headlines & Descriptions */}
                  <div className="sp-card">
                    <h3 className="card-title mb-1">
                      A · Headlines & Descriptions
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      Use {'{Store}'}, {'{City}'}, {'{Model}'} as placeholders.
                    </p>
                    <div className="space-y-3 mb-4">
                      {headlines.map((h, i) =>
                    <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <label className="field-label">
                              Headline {i + 1}
                            </label>
                            <span className="text-[10px] text-[var(--text-muted)]">
                              {h.length}/30
                            </span>
                          </div>
                          <input
                        type="text"
                        value={h}
                        onChange={(e) => {
                          const n = [...headlines];
                          n[i] = e.target.value;
                          setHeadlines(n);
                        }}
                        className="w-full" />
                      
                        </div>
                    )}
                    </div>
                    <div className="space-y-3">
                      {descriptions.map((d, i) =>
                    <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <label className="field-label">
                              Description {i + 1}
                            </label>
                            <span className="text-[10px] text-[var(--text-muted)]">
                              {d.length}/90
                            </span>
                          </div>
                          <textarea
                        value={d}
                        onChange={(e) => {
                          const n = [...descriptions];
                          n[i] = e.target.value;
                          setDescriptions(n);
                        }}
                        className="w-full"
                        rows={2} />
                      
                        </div>
                    )}
                    </div>
                  </div>

                  {/* B. Visual Assets (hidden for Search) */}
                  {!(platform === 'google' && googleSub === 'search') &&
                <div className="sp-card">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="card-title mb-1">B · Visual Assets</h3>
                          <p className="text-xs text-[var(--text-muted)]">
                            Brand-approved templates. Personalized per dealer at
                            launch.
                          </p>
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-page)] px-2 py-1 rounded">
                          {selectedImages.size} selected
                        </div>
                      </div>

                      {/* Filter Chips */}
                      <div className="flex gap-2 mb-3 mt-4">
                        {['All', '1:1', '9:16', '16:9'].map((f) =>
                    <button
                      key={f}
                      onClick={() => setImageFilter(f)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${imageFilter === f ? 'bg-[var(--brand-blue)] text-white border-[var(--brand-blue)]' : 'border-[var(--border-soft)] text-gray-600 hover:border-gray-400'}`}>
                      
                            {f}
                          </button>
                    )}
                      </div>

                      {/* Image Grid with Samsung Product Photos */}
                      <div className="grid grid-cols-4 gap-3">
                        {filteredImages.map((img) => {
                      const isSelected = selectedImages.has(img.id);
                      return (
                        <button
                          key={img.id}
                          onClick={() =>
                          setSelectedImages(
                            toggleSet(selectedImages, img.id)
                          )
                          }
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${isSelected ? 'border-[var(--brand-blue)] ring-2 ring-[var(--brand-blue)]/20' : 'border-transparent hover:border-gray-300'}`}>
                          
                              <img
                            src={img.url}
                            alt={img.label}
                            className="absolute inset-0 w-full h-full object-cover" />
                          
                              {/* Selected overlay */}
                              {isSelected &&
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[var(--brand-blue)] flex items-center justify-center shadow-md z-10">
                                  <Check
                              size={12}
                              className="text-white"
                              strokeWidth={3} />
                            
                                </div>
                          }
                              {/* Ratio badge */}
                              <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded backdrop-blur-sm">
                                {img.ratio}
                              </div>
                              {/* Label gradient */}
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-4 pb-1.5 text-[10px] font-medium text-white text-left leading-tight">
                                {img.label}
                              </div>
                            </button>);

                    })}
                      </div>

                      {/* Brand Personalization Rules Sub-Panel */}
                      <div className="mt-5 border border-[var(--border-soft)] bg-[var(--bg-page)] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles
                        size={14}
                        className="text-[var(--brand-blue)]" />
                      
                          <h4 className="text-sm font-semibold">
                            Brand Personalization Rules
                          </h4>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] mb-4">
                          Define what store-specific information is layered
                          onto each creative at campaign launch.
                        </p>

                        {/* Dealer Info Overlay Toggles */}
                        <div className="mb-4">
                          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)] mb-2 font-medium">
                            Store Info Overlay
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {[
                        {
                          key: 'name',
                          label: 'Store Name',
                          icon: User
                        },
                        {
                          key: 'phone',
                          label: 'Phone Number',
                          icon: Phone
                        },
                        {
                          key: 'address',
                          label: 'Address',
                          icon: MapPin
                        }].
                        map((item) => {
                          const Icon = item.icon;
                          const isAllowed =
                          dealerInfoAllowed[
                          item.key as keyof typeof dealerInfoAllowed];

                          return (
                            <button
                              key={item.key}
                              onClick={() =>
                              setDealerInfoAllowed({
                                ...dealerInfoAllowed,
                                [item.key]: !isAllowed
                              })
                              }
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${isAllowed ? 'bg-[var(--brand-blue)] text-white border-[var(--brand-blue)]' : 'bg-white border-[var(--border-soft)] text-gray-600 hover:border-gray-400'}`}>
                              
                                  <Icon size={12} />
                                  {item.label}
                                  {isAllowed &&
                              <Check size={12} strokeWidth={3} />
                              }
                                </button>);

                        })}
                          </div>
                        </div>

                        {/* Regional Language Toggle */}
                        <div className="mb-4 p-3 bg-white rounded-md border border-[var(--border-soft)]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Languages
                            size={14}
                            className="text-[var(--brand-blue)]" />
                          
                              <div>
                                <div className="text-xs font-medium">
                                  Regional Language Translation
                                </div>
                                {regionalLanguageAllowed &&
                            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                                    Offer text and taglines auto-translate to
                                    dealer's configured language
                                  </div>
                            }
                              </div>
                            </div>
                            <div
                          className={`w-[34px] h-[20px] rounded-full p-[2px] cursor-pointer transition-colors flex-shrink-0 ${regionalLanguageAllowed ? 'bg-[var(--brand-blue)]' : 'bg-[#CBD5E1]'}`}
                          onClick={() =>
                          setRegionalLanguageAllowed(
                            !regionalLanguageAllowed
                          )
                          }>
                          
                              <div
                            className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform ${regionalLanguageAllowed ? 'translate-x-[14px]' : 'translate-x-0'}`}>
                          </div>
                            </div>
                          </div>
                        </div>

                        {/* Editable Text Fields */}
                        <div className="space-y-2.5">
                          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)] font-medium">
                            Brand-Approved Text
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-[11px] text-[var(--text-muted)] w-16 flex-shrink-0">
                              Tagline
                            </label>
                            <div className="relative flex-1">
                              <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            className="text-xs h-[32px] bg-white"
                            style={{
                              paddingLeft: regionalLanguageAllowed ?
                              '32px' :
                              '10px'
                            }} />
                          
                              {regionalLanguageAllowed &&
                          <Globe
                            size={12}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--brand-blue)]" />

                          }
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-[11px] text-[var(--text-muted)] w-16 flex-shrink-0">
                              Offer
                            </label>
                            <div className="relative flex-1">
                              <input
                            type="text"
                            value={offerText}
                            onChange={(e) => setOfferText(e.target.value)}
                            className="text-xs h-[32px] bg-white"
                            style={{
                              paddingLeft: regionalLanguageAllowed ?
                              '32px' :
                              '10px'
                            }} />
                          
                              {regionalLanguageAllowed &&
                          <Globe
                            size={12}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--brand-blue)]" />

                          }
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sample Dealer Preview Chip */}
                      <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-[var(--brand-blue)]/5 border border-[var(--brand-blue)]/20 rounded-md">
                        <Eye
                      size={13}
                      className="text-[var(--brand-blue)] flex-shrink-0" />
                    
                        <span className="text-[11px] text-[var(--text-muted)]">
                          Preview as:
                        </span>
                        <select
                      value={previewDealerId}
                      onChange={(e) => setPreviewDealerId(e.target.value)}
                      className="text-[11px] py-0.5 px-2 bg-white border border-[var(--border-soft)] rounded font-medium flex-1">
                      
                          {SAMPLE_DEALERS.map((d) =>
                      <option key={d.id} value={d.id}>
                              {d.name}, {d.city} ({d.language})
                            </option>
                      )}
                        </select>
                      </div>
                    </div>
                }

                  {/* C. CTAs & Extensions */}
                  <div className="sp-card">
                    <h3 className="card-title mb-1">C · CTAs & Extensions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="field-label mb-1.5">
                          Call to Action
                        </label>
                        <select
                        value={cta}
                        onChange={(e) => setCta(e.target.value)}
                        className="w-full">
                        
                          {[
                        'Book Now',
                        'Learn More',
                        'Get Quote',
                        'Call Now',
                        'Sign Up'].
                        map((c) =>
                        <option key={c}>{c}</option>
                        )}
                        </select>
                      </div>
                      {platform === 'google' &&
                    <div>
                          <label className="field-label mb-1.5">
                            Sitelink 1
                          </label>
                          <input
                        type="text"
                        defaultValue="View Models"
                        className="w-full" />
                      
                        </div>
                    }
                    </div>
                  </div>
                </div>
              }

              {/* STEP 5 — Conversion Setup */}
              {step === 4 &&
              <div className="sp-card">
                  <h2 className="card-title mb-1">Conversion Setup</h2>
                  <p className="text-sm text-[var(--text-muted)] mb-5">
                    How will you capture leads? Pick one or more methods.
                  </p>

                  <div className="space-y-3">
                    {[
                  {
                    id: 'lead-form',
                    icon: FileText,
                    title: 'Instant Lead Form',
                    desc: 'Native lead form on the platform',
                    fields: ['Name', 'Phone', 'Email', 'City']
                  },
                  {
                    id: 'landing',
                    icon: Globe,
                    title: 'Landing Page',
                    desc: 'Redirect to a custom landing page',
                    url: 'https://{dealer_slug}.spotlight.co/{product}'
                  },
                  {
                    id: 'call',
                    icon: Phone,
                    title: 'Call (VMN)',
                    desc: 'Virtual mobile number for call tracking',
                    vmn: '+91 1800-XXX-XXXX'
                  },
                  ...(platform === 'meta' ?
                  [
                  {
                    id: 'whatsapp',
                    icon: MessageCircle,
                    title: 'WhatsApp',
                    desc: 'Direct WhatsApp conversation',
                    number: '+91 98765 43210'
                  }] :

                  [])].
                  map((method) =>
                  <button
                    key={method.id}
                    onClick={() =>
                    setConversionMethods(
                      toggleSet(conversionMethods, method.id)
                    )
                    }
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${conversionMethods.has(method.id) ? 'border-[var(--brand-blue)] bg-blue-50/40' : 'border-[var(--border-soft)] hover:border-gray-300'}`}>
                    
                        <div className="flex items-start gap-3">
                          <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${conversionMethods.has(method.id) ? 'bg-[var(--brand-blue)] border-[var(--brand-blue)]' : 'border-gray-300'}`}>
                        
                            {conversionMethods.has(method.id) &&
                        <Check size={12} className="text-white" />
                        }
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <method.icon
                            size={14}
                            className="text-[var(--brand-blue)]" />
                          
                              <span className="font-medium text-sm">
                                {method.title}
                              </span>
                            </div>
                            <div className="text-xs text-[var(--text-muted)]">
                              {method.desc}
                            </div>
                            {conversionMethods.has(method.id) &&
                        method.id === 'lead-form' &&
                        <div className="flex gap-2 mt-3">
                                  {(method as any).fields?.map((f: string) =>
                          <label
                            key={f}
                            className="flex items-center gap-1.5 text-xs">
                            
                                      <input
                              type="checkbox"
                              defaultChecked
                              className="w-3.5 h-3.5 rounded" />
                            {' '}
                                      {f}
                                    </label>
                          )}
                                </div>
                        }
                            {conversionMethods.has(method.id) &&
                        method.id === 'landing' &&
                        <input
                          type="text"
                          defaultValue={(method as any).url}
                          className="w-full mt-3 text-xs" />

                        }
                          </div>
                        </div>
                      </button>
                  )}
                  </div>
                </div>
              }

              {/* STEP 6 — Review & Launch */}
              {step === 5 &&
              <div className="flex flex-col gap-5">
                  {/* Big Numbers */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                  {
                    label: 'Locations',
                    value: totalLocations,
                    icon: MapPin
                  },
                  {
                    label: 'Ad Groups',
                    value: totalAdGroups,
                    icon: Target
                  },
                  {
                    label: 'Daily Budget',
                    value: `₹${dailyBudget.toLocaleString()}`,
                    icon: DollarSign
                  },
                  {
                    label: 'Est. Leads/Week',
                    value: `~${estLeads}`,
                    icon: Users
                  }].
                  map((m) =>
                  <div key={m.label} className="sp-card py-4 px-4">
                        <div className="flex items-center gap-2 mb-1">
                          <m.icon
                        size={14}
                        className="text-[var(--brand-blue)]" />
                      
                          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                            {m.label}
                          </span>
                        </div>
                        <div className="numeric-stat text-xl">{m.value}</div>
                      </div>
                  )}
                  </div>

                  {/* Template Stack */}
                  <div className="sp-card">
                    <h3 className="card-title mb-3">Template Stack</h3>
                    <table className="sp-table">
                      <thead>
                        <tr>
                          <th>Layer</th>
                          <th>Template</th>
                          <th>Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-medium">Campaign</td>
                          <td>
                            {
                          CAMPAIGN_TEMPLATES.find(
                            (t) => t.id === selectedTemplate
                          )?.name
                          }
                          </td>
                          <td>
                            <span className="pill pill-done text-[10px]">
                              {
                            CAMPAIGN_TEMPLATES.find(
                              (t) => t.id === selectedTemplate
                            )?.source
                            }
                            </span>
                          </td>
                        </tr>
                        {Array.from(selectedTargeting).map((id) => {
                        const t = TARGETING_TEMPLATES.find((x) => x.id === id);
                        return (
                          <tr key={id}>
                              <td className="font-medium">Targeting</td>
                              <td>{t?.name}</td>
                              <td>
                                <span className="pill pill-submitted text-[10px]">
                                  {t?.type}
                                </span>
                              </td>
                            </tr>);

                      })}
                      </tbody>
                    </table>
                  </div>

                  {/* Per-dealer Resolution */}
                  <div className="sp-card">
                    <h3 className="card-title mb-3">Per-Store Resolution</h3>
                    <table className="sp-table">
                      <thead>
                        <tr>
                          <th>Store</th>
                          <th>City</th>
                          <th>Headline 1 (resolved)</th>
                          <th>Landing URL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RESOLUTION_DEALERS.map((d) => {
                        const selectedBrand = ALL_BRANDS.find(
                          (b) => b.name === brand
                        );
                        const f =
                        BRAND_FLAGSHIP_MODEL[
                        selectedBrand?.id || 'br_maruti'] ||
                        BRAND_FLAGSHIP_MODEL.br_maruti;
                        return (
                          <tr key={d.dealer}>
                              <td className="font-medium">{d.dealer}</td>
                              <td>{d.city}</td>
                              <td className="text-sm">
                                Experience the All-New {f.model} in {d.city}
                              </td>
                              <td className="text-xs font-mono text-[var(--brand-blue)]">
                                https://{d.slug}.spotlight.co/{f.slug}
                              </td>
                            </tr>);

                      })}
                      </tbody>
                    </table>
                  </div>

                  {/* Multi-format Preview */}
                  <div className="sp-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="card-title">Multi-Format Preview</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 rounded-lg p-0.5">
                          {(platform === 'meta' ?
                        ['Feed', 'Story', 'Reel'] :
                        ['Search', 'Display', 'YouTube']).
                        map((f) =>
                        <button
                          key={f}
                          className="px-3 py-1 rounded-md text-[11px] font-medium first:bg-white first:shadow-sm text-gray-600">
                          
                              {f}
                            </button>
                        )}
                        </div>
                        <select
                        className="text-xs py-1"
                        value={previewLocation}
                        onChange={(e) => setPreviewLocation(e.target.value)}>
                        
                          {LOCATIONS.length > 0 ?
                        LOCATIONS.map((l) =>
                        <option key={l.id} value={l.city}>
                                {l.city}
                              </option>
                        ) :

                        <option>Mumbai</option>
                        }
                        </select>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-6 flex justify-center">
                      <div className="w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="aspect-[4/3] bg-blue-200 flex items-center justify-center">
                          <Image size={40} className="text-blue-400" />
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-gray-400 mb-1">
                            Sponsored · {platformLabel}
                          </div>
                          <div className="font-semibold text-sm mb-1">
                            {tagline} in {previewLocation}
                          </div>
                          <div className="text-xs text-gray-600 mb-3">
                            Visit your nearest {brand} store in{' '}
                            {previewLocation}. Exclusive festive offers. Book
                            now!
                          </div>
                          <button className="w-full py-2 rounded-lg bg-[var(--brand-blue)] text-white text-xs font-semibold">
                            {cta}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Launch Button */}
                  <button
                  onClick={() => setShowLaunchSuccess(true)}
                  className="w-full py-4 rounded-xl bg-[var(--brand-indigo)] text-white font-bold text-base hover:bg-[#1a0a8a] transition-colors flex items-center justify-center gap-2">
                  
                    <Rocket size={18} /> Launch {totalAdGroups} Campaigns
                  </button>
                </div>
              }
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 5 &&
          <div className="flex items-center justify-between mt-5">
              <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-outline flex items-center gap-2 disabled:opacity-30">
              
                <ArrowLeft size={14} /> Back
              </button>
              <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="btn-primary flex items-center gap-2">
              
                Next <ArrowRight size={14} />
              </button>
            </div>
          }
        </div>

        {/* Right Rail */}
        <div className="w-[320px] flex-shrink-0 flex flex-col gap-3">
          {/* Campaign Overview — Combined Scale + Summary */}
          <div className="sp-card overflow-hidden p-0">
            {/* Hero — Campaigns + Spend */}
            <div className="bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-indigo)] px-3 py-2.5 text-white">
              <div className="text-[9px] uppercase tracking-wider opacity-70 mb-1.5">
                Campaign Overview
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold leading-none">
                    {totalAdGroups}
                  </div>
                  <div className="text-[9px] opacity-75 mt-0.5">
                    {totalLocations} loc × {selectedTargeting.size} tpl
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold leading-none">
                    ₹{(dailyBudget * 30).toLocaleString()}
                  </div>
                  <div className="text-[9px] opacity-75 mt-0.5">
                    ₹{dailyBudget.toLocaleString()}/day · ~{estLeads} leads/wk
                  </div>
                </div>
              </div>
            </div>
            {/* Config */}
            <div className="px-3 py-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
              <div className="text-[var(--text-muted)]">Brand</div>
              <div className="font-medium text-right">{brand}</div>
              <div className="text-[var(--text-muted)]">Platform</div>
              <div className="font-medium text-right">{platformLabel}</div>
              <div className="text-[var(--text-muted)]">Targeting</div>
              <div className="font-medium text-right">
                {selectedTargeting.size} templates
              </div>
              <div className="text-[var(--text-muted)]">Creative</div>
              <div className="font-medium text-right">
                {selectedImages.size} images
              </div>
            </div>
          </div>

          {/* Live Ad Preview - Sticky */}
          {(() => {
            const dealer =
            SAMPLE_DEALERS.find((d) => d.id === previewDealerId) ||
            SAMPLE_DEALERS[0];
            const firstSelectedImg =
            IMAGES.find((i) => selectedImages.has(i.id)) || IMAGES[0];
            const displayTagline = regionalLanguageAllowed ?
            dealer.translatedTagline :
            tagline;
            const displayOffer = regionalLanguageAllowed ?
            dealer.translatedOffer :
            offerText;
            return (
              <div className="sp-card sticky top-[88px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="card-title text-xs">Live Preview</div>
                  {regionalLanguageAllowed &&
                  <div className="flex items-center gap-1 text-[9px] text-[var(--brand-blue)] bg-[var(--brand-blue)]/10 px-1.5 py-0.5 rounded font-medium">
                      <Languages size={10} />
                      {dealer.language}
                    </div>
                  }
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  {!(platform === 'google' && googleSub === 'search') &&
                  <div className="aspect-video relative bg-gray-100 overflow-hidden">
                      <img
                      src={firstSelectedImg.url}
                      alt="ad preview"
                      className="absolute inset-0 w-full h-full object-cover" />
                    
                      {/* Tagline + Offer overlay on image */}
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent px-2.5 pt-2 pb-6">
                        <div className="text-[11px] font-bold text-white leading-tight drop-shadow-md">
                          {displayTagline}
                        </div>
                        <div className="text-[9px] text-white/90 leading-tight mt-0.5 drop-shadow-md">
                          {displayOffer}
                        </div>
                      </div>
                      {/* Dealer info overlay at bottom */}
                      {(dealerInfoAllowed.name ||
                    dealerInfoAllowed.phone ||
                    dealerInfoAllowed.address) &&
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-2.5 pt-5 pb-1.5">
                          {dealerInfoAllowed.name &&
                      <div className="text-[10px] font-bold text-white leading-tight mb-0.5">
                              {dealer.name}
                            </div>
                      }
                          <div className="flex items-center gap-2 text-[8px] text-white/90 leading-tight flex-wrap">
                            {dealerInfoAllowed.phone &&
                        <span className="flex items-center gap-0.5">
                                <Phone size={7} /> {dealer.phone}
                              </span>
                        }
                            {dealerInfoAllowed.address &&
                        <span className="flex items-center gap-0.5">
                                <MapPin size={7} /> {dealer.address}
                              </span>
                        }
                          </div>
                        </div>
                    }
                    </div>
                  }
                  <div className="p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">
                      Sponsored
                    </div>
                    <div className="font-semibold text-[11px] mb-0.5 leading-tight">
                      {brand} — {dealer.city}
                    </div>
                    <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">
                      Visit {dealer.name} in {dealer.city}. {cta}!
                    </div>
                    <div className="text-[10px] font-semibold text-[var(--brand-blue)]">
                      {cta} →
                    </div>
                  </div>
                </div>
                {/* CTA to open full preview overlay */}
                <button
                  onClick={() => setShowPreviewOverlay(true)}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-[var(--brand-blue)]/30 bg-[var(--brand-blue)]/5 text-[var(--brand-blue)] text-[10px] font-medium hover:bg-[var(--brand-blue)]/10 transition-colors">
                  
                  <Eye size={12} />
                  View All Store Previews
                </button>
              </div>);

          })()}
        </div>
      </div>

      {/* Dealer Previews Overlay */}
      {showPreviewOverlay &&
      <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl w-full max-w-5xl mx-4 overflow-hidden">
            {/* Overlay Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-soft)]">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Store-Specific Ad Previews
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {selectedImages.size} creatives × {SAMPLE_DEALERS.length}{' '}
                  stores — showing how each ad personalizes per location
                </p>
              </div>
              <button
              onClick={() => setShowPreviewOverlay(false)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            {/* Preview Grid */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4">
                {(() => {
                const selectedImgs = IMAGES.filter((i) =>
                selectedImages.has(i.id)
                );
                const previews: {
                  img: (typeof IMAGES)[0];
                  dealer: (typeof SAMPLE_DEALERS)[0];
                }[] = [];
                // Generate up to 8 combinations: cycle through dealers for each selected image
                for (
                let i = 0;
                i <
                Math.min(8, selectedImgs.length * SAMPLE_DEALERS.length);
                i++)
                {
                  const img = selectedImgs[i % selectedImgs.length];
                  const dealer = SAMPLE_DEALERS[i % SAMPLE_DEALERS.length];
                  previews.push({
                    img,
                    dealer
                  });
                }
                return previews.map((p, idx) => {
                  const dTagline = regionalLanguageAllowed ?
                  p.dealer.translatedTagline :
                  tagline;
                  const dOffer = regionalLanguageAllowed ?
                  p.dealer.translatedOffer :
                  offerText;
                  return (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      
                        <div className="aspect-video relative bg-gray-100 overflow-hidden">
                          <img
                          src={p.img.url}
                          alt={p.img.label}
                          className="absolute inset-0 w-full h-full object-cover" />
                        
                          {/* Tagline + Offer on image */}
                          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent px-2 pt-1.5 pb-5">
                            <div className="text-[10px] font-bold text-white leading-tight drop-shadow-md">
                              {dTagline}
                            </div>
                            <div className="text-[8px] text-white/90 leading-tight mt-0.5 drop-shadow-md">
                              {dOffer}
                            </div>
                          </div>
                          {/* Dealer info at bottom */}
                          {(dealerInfoAllowed.name ||
                        dealerInfoAllowed.phone ||
                        dealerInfoAllowed.address) &&
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-2 pt-4 pb-1">
                              {dealerInfoAllowed.name &&
                          <div className="text-[9px] font-bold text-white leading-tight mb-0.5">
                                  {p.dealer.name}
                                </div>
                          }
                              <div className="flex items-center gap-1.5 text-[7px] text-white/90 leading-tight flex-wrap">
                                {dealerInfoAllowed.phone &&
                            <span className="flex items-center gap-0.5">
                                    <Phone size={6} /> {p.dealer.phone}
                                  </span>
                            }
                                {dealerInfoAllowed.address &&
                            <span className="flex items-center gap-0.5">
                                    <MapPin size={6} /> {p.dealer.address}
                                  </span>
                            }
                              </div>
                            </div>
                        }
                        </div>
                        <div className="p-2">
                          <div className="text-[9px] text-gray-400">
                            Sponsored
                          </div>
                          <div className="font-semibold text-[10px] leading-tight">
                            {brand} — {p.dealer.city}
                          </div>
                          <div className="text-[9px] text-gray-500 leading-tight mt-0.5">
                            Visit {p.dealer.name} in {p.dealer.city}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-[9px] font-semibold text-[var(--brand-blue)]">
                              {cta} →
                            </div>
                            {regionalLanguageAllowed &&
                          <div className="flex items-center gap-0.5 text-[8px] text-[var(--brand-blue)]/70">
                                <Languages size={8} />
                                {p.dealer.language}
                              </div>
                          }
                          </div>
                        </div>
                      </div>);

                });
              })()}
              </div>
            </div>

            {/* Overlay Footer */}
            <div className="px-6 py-3 border-t border-[var(--border-soft)] bg-gray-50 flex items-center justify-between">
              <div className="text-xs text-[var(--text-muted)]">
                Each creative auto-personalizes with store name, contact info
                {regionalLanguageAllowed ? ', and regional language' : ''} at
                launch.
              </div>
              <button
              onClick={() => setShowPreviewOverlay(false)}
              className="btn-primary text-xs px-4 py-1.5">
              
                Close
              </button>
            </div>
          </div>
        </div>
      }

      {/* Launch Success Modal */}
      {showLaunchSuccess &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Campaigns Launched! 🚀
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {totalAdGroups} campaigns across {totalLocations} locations are
              now live on {platformLabel}.
            </p>
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-bold text-lg">{totalLocations}</div>
                <div className="text-[10px] text-gray-500">Locations</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-bold text-lg">{totalAdGroups}</div>
                <div className="text-[10px] text-gray-500">Campaigns</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-bold text-lg">~{estLeads}</div>
                <div className="text-[10px] text-gray-500">Est. Leads/wk</div>
              </div>
            </div>
            <button
            onClick={() => {
              setShowLaunchSuccess(false);
              navigate('/spotlight/brands');
            }}
            className="btn-primary w-full">
            
              Done — Back to Brands
            </button>
          </div>
        </div>
      }
    </div>);

}