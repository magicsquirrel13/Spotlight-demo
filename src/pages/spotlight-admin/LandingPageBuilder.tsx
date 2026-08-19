import React, { useState, Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Palette,
  FileText,
  MapPin,
  Info,
  Layers,
  Phone,
  Globe,
  Save,
  Settings,
  ToggleLeft,
  Type,
  Layout } from
'lucide-react';
import { getBrandById, getDealersForBrand } from '../../data/mockData';
import { getBrandProfile } from '../../data/brandProfiles';
type Device = 'desktop' | 'tablet' | 'mobile';
const SECTIONS = [
{
  id: 'theme',
  icon: Palette,
  label: 'Theme',
  defaultEnabled: true
},
{
  id: 'header',
  icon: Layout,
  label: 'Header',
  defaultEnabled: true
},
{
  id: 'hero',
  icon: ImageIcon,
  label: 'Hero Banner',
  defaultEnabled: true
},
{
  id: 'form',
  icon: FileText,
  label: 'Lead Form',
  defaultEnabled: true
},
{
  id: 'locationdetail',
  icon: MapPin,
  label: 'Location Detail',
  defaultEnabled: true
},
{
  id: 'about',
  icon: Info,
  label: 'About',
  defaultEnabled: true
},
{
  id: 'specifications',
  icon: Layers,
  label: 'Specifications',
  defaultEnabled: false
},
{
  id: 'tnc',
  icon: FileText,
  label: 'Terms & Conditions',
  defaultEnabled: false
},
{
  id: 'privacypolicy',
  icon: FileText,
  label: 'Privacy Policy',
  defaultEnabled: false
},
{
  id: 'prefooter',
  icon: Layout,
  label: 'Pre-Footer CTA',
  defaultEnabled: false
},
{
  id: 'footer1',
  icon: Layout,
  label: 'Footer 1',
  defaultEnabled: true
},
{
  id: 'footer2',
  icon: Layout,
  label: 'Footer 2',
  defaultEnabled: true
},
{
  id: 'mobile',
  icon: Smartphone,
  label: 'Mobile Floating Bar',
  defaultEnabled: true
}];

export function LandingPageBuilder() {
  const navigate = useNavigate();
  const { brandId, templateId } = useParams();
  const brand = getBrandById(brandId || '');
  const profile = getBrandProfile(brandId);
  const dealers = getDealersForBrand(brandId || '');
  // Fallback dealer if none exist
  const fallbackDealer = {
    id: 'demo-dealer',
    name: 'Demo Dealer',
    code: 'DEMO01',
    city: 'Mumbai',
    state: 'Maharashtra',
    contact: {
      name: 'Demo',
      phone: '+91 9999999999'
    },
    status: 'live' as const,
    stats: {
      campaigns: 0,
      leads: 0
    }
  };
  const availableDealers = dealers.length > 0 ? dealers : [fallbackDealer];
  const [device, setDevice] = useState<Device>('desktop');
  const [openSection, setOpenSection] = useState<string>('hero');
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTIONS.map((s) => [s.id, s.defaultEnabled]))
  );
  const [selectedDealer, setSelectedDealer] = useState(availableDealers[0].id);
  const [config, setConfig] = useState({
    theme: profile.name.toLowerCase(),
    headerBg: profile.headerBg,
    heroSubheading: profile.subheading,
    heroHeadline: profile.heroTagline,
    formTitle: 'Book a Store Demo',
    formCta: 'Book a Demo',
    aboutBg: profile.aboutBg,
    aboutHeading: 'WELCOME TO {{l.name}}',
    footerBg: profile.footerBg
  });
  const dealer =
  availableDealers.find((d) => d.id === selectedDealer) || availableDealers[0];
  const deviceWidth =
  device === 'desktop' ?
  'w-full max-w-[1100px]' :
  device === 'tablet' ?
  'w-[768px]' :
  'w-[375px]';
  const updateConfig = (key: string, value: string) =>
  setConfig({
    ...config,
    [key]: value
  });
  return (
    <div className="-mx-8 -mt-6 -mb-10 flex flex-col h-[calc(100vh-60px)]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[var(--border-soft)] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <div className="text-xs text-[var(--text-muted)]">
            Spotlight Admin · Landing Pages
          </div>
          <div className="font-semibold text-sm">
            {profile.name} · Master Template
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Dealer preview selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">
              Preview as:
            </span>
            <select
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              className="text-xs h-8 py-0">
              
              {availableDealers.map((d) =>
              <option key={d.id} value={d.id}>
                  {d.name} · {d.city}
                </option>
              )}
            </select>
          </div>

          {/* Device toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {[
            {
              id: 'desktop' as Device,
              icon: Monitor
            },
            {
              id: 'tablet' as Device,
              icon: Tablet
            },
            {
              id: 'mobile' as Device,
              icon: Smartphone
            }].
            map((d) =>
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              className={`px-2.5 py-1 rounded-md transition-colors ${device === d.id ? 'bg-white shadow-sm text-[var(--brand-blue)]' : 'text-gray-500'}`}>
              
                <d.icon size={14} />
              </button>
            )}
          </div>

          <button className="btn-outline-xs flex items-center gap-1.5">
            <Save size={12} /> Save
          </button>
          <button
            onClick={() =>
            window.open(
              `/landing/${selectedDealer}?brand=${brandId}`,
              '_blank'
            )
            }
            className="btn-primary-sm flex items-center gap-2">
            
            <ExternalLink size={14} /> Preview for {dealer.name}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left — Component Editor */}
        <div className="w-[340px] flex-shrink-0 border-r border-[var(--border-soft)] bg-white overflow-y-auto">
          <div className="p-4 border-b border-[var(--border-soft)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Component Tree
            </div>
            <div className="text-xs text-gray-400">
              Click a section to edit, toggle to enable/disable
            </div>
          </div>

          <div className="p-2">
            {SECTIONS.map((s) => {
              const isOpen = openSection === s.id;
              return (
                <div key={s.id} className="mb-1">
                  <div
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    
                    <button
                      onClick={() => setOpenSection(isOpen ? '' : s.id)}
                      className="flex items-center gap-2 flex-1 text-left">
                      
                      <s.icon
                        size={14}
                        className={isOpen ? 'text-blue-600' : 'text-gray-400'} />
                      
                      <span
                        className={`text-xs font-medium ${isOpen ? 'text-blue-700' : 'text-gray-700'}`}>
                        
                        {s.label}
                      </span>
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled[s.id]}
                        onChange={(e) =>
                        setEnabled({
                          ...enabled,
                          [s.id]: e.target.checked
                        })
                        }
                        className="sr-only peer" />
                      
                      <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[var(--brand-blue)] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                    </label>
                    {isOpen ?
                    <ChevronUp size={12} className="text-gray-400" /> :

                    <ChevronDown size={12} className="text-gray-400" />
                    }
                  </div>

                  {/* Section editor */}
                  {isOpen &&
                  <div className="ml-6 mr-2 mt-1 mb-2 p-3 bg-gray-50 rounded-lg space-y-3">
                      {s.id === 'theme' &&
                    <>
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                              Theme
                            </label>
                            <select
                          value={config.theme}
                          onChange={(e) =>
                          updateConfig('theme', e.target.value)
                          }
                          className="w-full h-8 text-xs mt-1">
                          
                              {[
                          'samsung',
                          'lg electronics',
                          'sony',
                          'godrej appliances',
                          'acer',
                          'haier',
                          'bose'].
                          map((t) =>
                          <option key={t} value={t.toLowerCase()}>
                                  {t}
                                </option>
                          )}
                            </select>
                          </div>
                        </>
                    }
                      {s.id === 'header' &&
                    <>
                          <ColorField
                        label="Background"
                        value={config.headerBg}
                        onChange={(v) => updateConfig('headerBg', v)} />
                      
                          <TextField
                        label="Subheading"
                        value={config.heroSubheading}
                        onChange={(v) => updateConfig('heroSubheading', v)} />
                      
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                              Logo
                            </label>
                            <button className="mt-1 w-full h-9 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:border-gray-400 flex items-center justify-center gap-1.5">
                              <ImageIcon size={12} /> Upload Logo
                            </button>
                          </div>
                        </>
                    }
                      {s.id === 'hero' &&
                    <>
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                              Banner Image
                            </label>
                            <button className="mt-1 w-full h-16 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:border-gray-400 flex items-center justify-center gap-1.5">
                              <ImageIcon size={14} /> Upload Banner
                            </button>
                          </div>
                          <TextField
                        label="Headline"
                        value={config.heroHeadline}
                        onChange={(v) => updateConfig('heroHeadline', v)} />
                      
                          <NumberField
                        label="Slider Time (sec)"
                        defaultValue={4} />
                      
                        </>
                    }
                      {s.id === 'form' &&
                    <>
                          <TextField
                        label="Form Title"
                        value={config.formTitle}
                        onChange={(v) => updateConfig('formTitle', v)} />
                      
                          <TextField
                        label="CTA Label"
                        value={config.formCta}
                        onChange={(v) => updateConfig('formCta', v)} />
                      
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                              Fields
                            </label>
                            <div className="space-y-1">
                              {[
                          'Salutation',
                          'Name',
                          'Mobile',
                          'Email',
                          'Product',
                          'OTP',
                          'T&C',
                          'Privacy'].
                          map((f) =>
                          <label
                            key={f}
                            className="flex items-center gap-2 text-xs">
                            
                                  <input
                              type="checkbox"
                              defaultChecked={
                              f !== 'OTP' && f !== 'Salutation'
                              }
                              className="w-3.5 h-3.5 rounded" />
                            
                                  <span className="text-gray-600">{f}</span>
                                </label>
                          )}
                            </div>
                          </div>
                        </>
                    }
                      {s.id === 'about' &&
                    <>
                          <ColorField
                        label="Background"
                        value={config.aboutBg}
                        onChange={(v) => updateConfig('aboutBg', v)} />
                      
                          <TextField
                        label="Heading"
                        value={config.aboutHeading}
                        onChange={(v) => updateConfig('aboutHeading', v)} />
                      
                          <div className="text-[10px] text-gray-500 italic">
                            Variables: {'{{l.name}}'}, {'{{l.a.city}}'},{' '}
                            {'{{l.a.state}}'}
                          </div>
                        </>
                    }
                      {s.id === 'locationdetail' &&
                    <div className="text-[10px] text-gray-500">
                          Auto-populated from dealer data:
                          <div className="mt-1 p-2 bg-white rounded border border-gray-200 font-mono">
                            {'{{l.name}}'}
                            <br />
                            {'{{l.a.line1}}, {{l.a.city}}, {{l.a.state}}'}
                          </div>
                        </div>
                    }
                      {s.id === 'specifications' &&
                    <>
                          <NumberField label="Cards in row" defaultValue={4} />
                          <button className="w-full h-8 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-white">
                            + Add Spec Card
                          </button>
                        </>
                    }
                      {(s.id === 'tnc' || s.id === 'privacypolicy') &&
                    <>
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                              Source Type
                            </label>
                            <select className="w-full h-8 text-xs mt-1">
                              <option>Locationwise</option>
                              <option>Brandwise</option>
                            </select>
                          </div>
                        </>
                    }
                      {s.id === 'footer1' &&
                    <>
                          <ColorField
                        label="Background"
                        value={config.footerBg}
                        onChange={(v) => updateConfig('footerBg', v)} />
                      
                          <TextField
                        label="Left column heading"
                        defaultValue="Visit Us" />
                      
                          <TextField
                        label="Right column heading"
                        defaultValue="Hours" />
                      
                        </>
                    }
                      {s.id === 'footer2' &&
                    <>
                          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                            Quick Links
                          </div>
                          <div className="space-y-1">
                            {['Privacy Policy', 'Terms & Conditions'].map(
                          (l) =>
                          <div
                            key={l}
                            className="flex items-center gap-1.5 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                            
                                  {l}
                                </div>

                        )}
                          </div>
                          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-2">
                            Social
                          </div>
                          <div className="space-y-1">
                            {[
                        'Facebook',
                        'Instagram',
                        'Twitter',
                        'LinkedIn',
                        'YouTube'].
                        map((l) =>
                        <label
                          key={l}
                          className="flex items-center gap-2 text-xs">
                          
                                <input
                            type="checkbox"
                            defaultChecked={[
                            'Facebook',
                            'Instagram'].
                            includes(l)}
                            className="w-3.5 h-3.5 rounded" />
                          
                                <span className="text-gray-600">{l}</span>
                              </label>
                        )}
                          </div>
                        </>
                    }
                      {s.id === 'mobile' &&
                    <>
                          <label className="flex items-center gap-2 text-xs">
                            <input
                          type="checkbox"
                          defaultChecked
                          className="w-3.5 h-3.5 rounded" />
                        {' '}
                            Call Us button
                          </label>
                          <label className="flex items-center gap-2 text-xs">
                            <input
                          type="checkbox"
                          defaultChecked
                          className="w-3.5 h-3.5 rounded" />
                        {' '}
                            Get Directions button
                          </label>
                        </>
                    }
                      {s.id === 'prefooter' &&
                    <>
                          <ColorField
                        label="Background"
                        defaultValue="#dd052b" />
                      
                          <TextField
                        label="Left heading"
                        defaultValue="Need help?" />
                      
                          <TextField
                        label="Right heading"
                        defaultValue="Visit Store" />
                      
                        </>
                    }
                    </div>
                  }
                </div>);

            })}
          </div>
        </div>

        {/* Right — Live Preview */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Visibility toggle bar — sticky above scroll area */}
          <div className="flex-shrink-0 bg-white border-b border-[var(--border-soft)] px-6 py-2.5 flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mr-1 pr-2 border-r border-gray-200">
              <Eye size={12} /> Visible Sections
            </div>
            {SECTIONS.filter((s) => s.id !== 'theme').map((s) =>
            <button
              key={s.id}
              onClick={() =>
              setEnabled({
                ...enabled,
                [s.id]: !enabled[s.id]
              })
              }
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${enabled[s.id] ? 'bg-[var(--brand-blue)] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              
                <s.icon size={10} />
                {s.label}
              </button>
            )}
          </div>

          {/* Scrollable preview area */}
          <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
            <div
              className={`${deviceWidth} mx-auto h-fit bg-white shadow-lg transition-all duration-300 ${device !== 'desktop' ? 'rounded-2xl border-8 border-gray-800' : 'rounded-lg border border-gray-200 overflow-hidden'}`}>
              
              {device === 'desktop' &&
              <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-0.5 text-[10px] font-mono text-gray-500 max-w-md mx-auto">
                    https://{selectedDealer}.spotlight.co
                  </div>
                </div>
              }
              <MiniPreview
                config={config}
                enabled={enabled}
                dealer={dealer}
                device={device} />
              
            </div>
          </div>
        </div>
      </div>
    </div>);

}
// ============= Helpers =============
function ColorField({
  label,
  value,
  defaultValue,
  onChange





}: {label: string;value?: string;defaultValue?: string;onChange?: (v: string) => void;}) {
  const [val, setVal] = useState(value ?? defaultValue ?? '#000000');
  return (
    <div>
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-1.5 mt-1">
        <input
          type="color"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          className="w-9 h-8 rounded border border-gray-200 cursor-pointer" />
        
        <input
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          className="flex-1 h-8 text-xs font-mono" />
        
      </div>
    </div>);

}
function TextField({
  label,
  value,
  defaultValue,
  onChange





}: {label: string;value?: string;defaultValue?: string;onChange?: (v: string) => void;}) {
  const [val, setVal] = useState(value ?? defaultValue ?? '');
  return (
    <div>
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          onChange?.(e.target.value);
        }}
        className="w-full h-8 text-xs mt-1" />
      
    </div>);

}
function NumberField({
  label,
  defaultValue



}: {label: string;defaultValue: number;}) {
  return (
    <div>
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="number"
        defaultValue={defaultValue}
        className="w-full h-8 text-xs mt-1" />
      
    </div>);

}
// ============= Mini Live Preview =============
function MiniPreview({ config, enabled, dealer, device }: any) {
  const isMobile = device === 'mobile';
  const { brandId } = useParams();
  const profile = getBrandProfile(brandId);
  return (
    <div className="overflow-hidden">
      {/* Header */}
      {enabled.header &&
      <div
        style={{
          background: config.headerBg
        }}
        className="text-white px-4 py-2 flex items-center justify-between text-xs">
        
          <div className="font-bold">
            {profile.wordmark}
            {profile.accentWord &&
          <span
            style={{
              color: profile.accent
            }}>
            
                {' '}
                {profile.accentWord}
              </span>
          }
          </div>
          <div className="text-right">
            <div className="font-semibold text-[10px]">{dealer.name} ✓</div>
            <div className="text-[8px] text-gray-400">
              {config.heroSubheading}
            </div>
          </div>
        </div>
      }

      {/* Hero + Form */}
      {enabled.hero &&
      <div
        className={`relative bg-gradient-to-br ${profile.heroGradient} text-white px-6 py-10 lg:px-10 lg:py-14`}>
        
          <div
          className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 lg:gap-8 items-center`}>
          
            {enabled.form &&
          <div className="bg-white text-black rounded-2xl p-4 lg:p-5 shadow-2xl max-w-[280px] w-full order-2 lg:order-1">
                <div className="text-base font-bold mb-3">
                  {config.formTitle}
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="col-span-1 h-8 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-400 flex items-center px-2">
                      Mr.
                    </div>
                    <div className="col-span-2 h-8 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-400 flex items-center px-2">
                      Full Name*
                    </div>
                  </div>
                  <div className="h-8 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-400 flex items-center px-2">
                    Mobile*
                  </div>
                  <div className="h-8 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-400 flex items-center px-2">
                    Email
                  </div>
                  <select className="w-full h-8 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-600 px-2 outline-none">
                    <option value="" disabled selected>
                      Product Interested in*
                    </option>
                    {profile.models.map((m) =>
                <option key={m} value={m}>
                        {m}
                      </option>
                )}
                  </select>
                  <div className="text-[9px] text-gray-500 pt-0.5 leading-tight">
                    ☑ I agree to the Terms & Conditions
                  </div>
                  <div className="text-[9px] text-gray-500 leading-tight">
                    ☑ I have read and agreed to the Privacy Policy
                  </div>
                  <div
                className="h-9 text-white text-[11px] font-semibold rounded-full flex items-center justify-center mt-1"
                style={{
                  backgroundColor: profile.accent
                }}>
                
                    {config.formCta}
                  </div>
                </div>
              </div>
          }
            <div className={`${isMobile ? 'order-1' : 'order-2'}`}>
              <div
              className="text-[10px] font-semibold mb-2 tracking-[0.18em] uppercase"
              style={{
                color: profile.accent
              }}>
              
                {profile.name} · {dealer.city.toUpperCase()}
              </div>
              <div className="text-2xl lg:text-3xl font-bold leading-[1.1] mb-3 whitespace-pre-line">
                {config.heroHeadline}
              </div>
              <div className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                {profile.heroSupport.replace('{{dealer}}', dealer.name)}
              </div>
            </div>
          </div>
        </div>
      }

      {/* Location */}
      {enabled.locationdetail &&
      <div className="px-4 py-4 text-center border-b border-gray-100">
          <div className="font-bold text-sm">{dealer.name}</div>
          <div className="text-[10px] text-[#868686]">
            {dealer.city}, {dealer.state}
          </div>
        </div>
      }

      {/* About */}
      {enabled.about &&
      <div
        style={{
          background: config.aboutBg
        }}
        className="text-white px-4 py-6 text-center">
        
          <div className="text-sm font-bold mb-2">
            {config.aboutHeading.replace(
            '{{l.name}}',
            dealer.name.toUpperCase()
          )}
          </div>
          <div className="text-[10px] text-gray-200 leading-relaxed">
            {profile.aboutDescription}
          </div>
        </div>
      }

      {/* Specifications */}
      {enabled.specifications &&
      <div className="bg-white px-4 py-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) =>
        <div
          key={i}
          className="aspect-square bg-gray-100 rounded flex items-center justify-center text-[9px] text-gray-400">
          
              Spec {i}
            </div>
        )}
        </div>
      }

      {/* Pre-footer */}
      {enabled.prefooter &&
      <div className="bg-red-600 text-white px-4 py-4 grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="font-bold text-xs">Need help?</div>
            <div className="text-[9px]">Call our experts</div>
          </div>
          <div>
            <div className="font-bold text-xs">Visit Store</div>
            <div className="text-[9px]">Get directions</div>
          </div>
        </div>
      }

      {/* Footer 1 */}
      {enabled.footer1 &&
      <div
        style={{
          background: config.footerBg
        }}
        className="text-gray-400 px-4 py-4 grid grid-cols-2 gap-2 text-[10px]">
        
          <div>
            <div className="text-white font-semibold mb-1">Visit Us</div>
            <div>{dealer.name}</div>
            <div>{dealer.city}, Haryana</div>
          </div>
          <div>
            <div className="text-white font-semibold mb-1">Hours</div>
            <div>Mon – Sat: 9–8</div>
            <div>Sunday: 10–6</div>
          </div>
        </div>
      }

      {/* Footer 2 */}
      {enabled.footer2 &&
      <div
        style={{
          background: config.footerBg
        }}
        className="text-white px-4 py-4 border-t border-white/10 grid grid-cols-3 gap-2 text-[10px]">
        
          <div className="font-bold">
            {profile.wordmark}
            {profile.accentWord &&
          <span
            style={{
              color: profile.accent
            }}>
            
                {' '}
                {profile.accentWord}
              </span>
          }
          </div>
          <div>
            <div className="font-semibold mb-1">Quick Links</div>
            <div className="text-gray-400">Privacy</div>
            <div className="text-gray-400">T&C</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Social</div>
            <div className="flex gap-1">
              {['F', 'I', 'T', 'L', 'Y'].map((s) =>
            <span
              key={s}
              className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[7px]">
              
                  {s}
                </span>
            )}
            </div>
          </div>
        </div>
      }

      {/* Legal */}
      <div
        style={{
          background: config.footerBg
        }}
        className="text-gray-500 px-4 py-2 text-center text-[8px] border-t border-white/10">
        
        {profile.copyright} · Powered by Spotlight
      </div>

      {/* Mobile floating bar */}
      {enabled.mobile && isMobile &&
      <div className="bg-black grid grid-cols-2 border-t border-white/10">
          <div className="py-2 text-center text-white text-[10px] font-semibold">
            📞 Call Us
          </div>
          <div
          className="py-2 text-center text-white text-[10px] font-semibold"
          style={{
            backgroundColor: profile.accent
          }}>
          
            📍 Get Directions
          </div>
        </div>
      }
    </div>);

}