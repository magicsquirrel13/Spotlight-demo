import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Phone,
  MapPin,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ArrowLeft } from
'lucide-react';
import { getAllDealers } from '../../data/mockData';
import { getBrandProfile } from '../../data/brandProfiles';
const DEFAULT_DEALER_KEY = 'nexus-maruti-andheri';
export function DealerLandingPage() {
  const { dealerId = DEFAULT_DEALER_KEY } = useParams();
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get('brand');
  const navigate = useNavigate();
  const allDealers = getAllDealers();
  const foundDealer = allDealers.find((d) => d.id === dealerId);
  // Fallback dealer if not found
  const dealer = foundDealer || {
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
  const profile = getBrandProfile(brandId);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Floating back to builder bar */}
      <div className="fixed top-3 left-3 z-50">
        <button
          onClick={() => navigate('/spotlight/landing-pages')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur text-white text-xs hover:bg-black/85">
          
          <ArrowLeft size={12} /> Back to builder
        </button>
      </div>

      {/* Header */}
      <header
        style={{
          backgroundColor: profile.headerBg
        }}
        className="text-white">
        
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
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
            <div className="text-sm font-semibold flex items-center gap-1.5 justify-end">
              {dealer.name} <span className="text-green-400 text-xs">✓</span>
            </div>
            <div className="text-[11px] text-gray-400">
              {profile.subheading}
            </div>
          </div>
        </div>
      </header>

      {/* Hero with overlay form */}
      <section
        className={`relative bg-gradient-to-br ${profile.heroGradient} overflow-hidden`}>
        
        <div className="absolute inset-0 opacity-30 bg-[url('/processed_efad80ac-68c1-43ce-a0bd-f5ccf5cd2bfa.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
          {/* Form */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full">
            {!submitted ?
            <>
                <h2 className="text-2xl font-bold mb-5 text-black">
                  Book a Store Demo
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <select className="col-span-1 h-11 rounded-lg border border-gray-200 px-3 text-sm">
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </select>
                    <input
                    className="col-span-2 h-11 rounded-lg border border-gray-200 px-3 text-sm"
                    placeholder="Full Name*" />
                  
                  </div>
                  <input
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm"
                  placeholder="Mobile*" />
                
                  <input
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm"
                  placeholder="Email" />
                
                  <select className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm">
                    <option value="" disabled selected>
                      Product Interested in*
                    </option>
                    {profile.models.map((m) =>
                  <option key={m} value={m}>
                        {m}
                      </option>
                  )}
                  </select>
                  <label className="flex items-start gap-2 text-xs text-gray-600 pt-1">
                    <input type="checkbox" defaultChecked className="mt-0.5" />I
                    agree to the Terms & Conditions
                  </label>
                  <label className="flex items-start gap-2 text-xs text-gray-600">
                    <input type="checkbox" defaultChecked className="mt-0.5" />I
                    have read and agreed to the{' '}
                    <a className="text-blue-600 underline" href="#">
                      Privacy Policy
                    </a>
                  </label>
                  <button
                  onClick={() => setSubmitted(true)}
                  style={{
                    backgroundColor: profile.accent
                  }}
                  className="w-full h-12 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                  
                    Book a Demo
                  </button>
                </div>
              </> :

            <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7" />
                  
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">
                  Thank you for submitting your details
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  To know more about {profile.name}, please visit our official
                  website:{' '}
                  <a
                  href={profile.websiteUrl}
                  className="text-blue-600 underline">
                  
                    {profile.websiteLabel}
                  </a>
                </p>
                <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-gray-500 underline">
                
                  Submit another inquiry
                </button>
              </div>
            }
          </div>

          {/* Hero copy */}
          <div className="text-white order-first lg:order-last">
            <div
              className="text-xs tracking-widest font-semibold mb-3 uppercase"
              style={{
                color: profile.accent
              }}>
              
              {profile.name} · {dealer.city.toUpperCase()}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 whitespace-pre-line">
              {profile.heroTagline}
            </h1>
            <p className="text-lg text-gray-300">
              {profile.heroSupport.replace('{{dealer}}', dealer.name)}
            </p>
          </div>
        </div>
      </section>

      {/* Location Detail */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-black">{dealer.name}</h2>
          <p className="text-[#868686] text-sm flex items-center justify-center gap-2">
            <MapPin size={14} /> {dealer.city}, {dealer.state}
          </p>
        </div>
      </section>

      {/* About */}
      <section
        style={{
          backgroundColor: profile.aboutBg
        }}
        className="text-white py-16">
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 tracking-wide">
            WELCOME TO {dealer.name.toUpperCase()}
          </h2>
          <p className="text-base leading-relaxed text-gray-100">
            {profile.aboutDescription}
            <br />
            <br />
            Conveniently situated in {dealer.city}, {dealer.state}, we proudly
            serve customers from across {dealer.city} with end-to-end support —
            including personalized product recommendations, easy EMI and
            exchange options, doorstep delivery, installation and in-store
            product demos.
            <br />
            <br />
            Whether you're upgrading or buying your first device, visit{' '}
            {dealer.name} for the most reliable {profile.name} store experience
            near {dealer.city}.
          </p>
        </div>
      </section>

      {/* Footer 1 */}
      <section
        style={{
          backgroundColor: profile.footerBg
        }}
        className="text-[#808080] py-10">
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="text-white font-semibold mb-3">Visit Us</h4>
            <p>{dealer.name}</p>
            <p>
              {dealer.city}, {dealer.state}
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Phone size={12} /> {dealer.contact.phone}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Hours</h4>
            <p>Mon – Sat: 9:00 AM – 8:00 PM</p>
            <p>Sunday: 10:00 AM – 6:00 PM</p>
          </div>
        </div>
      </section>

      {/* Footer 2 */}
      <footer
        style={{
          backgroundColor: profile.footerBg
        }}
        className="text-white py-10 border-t border-white/10">
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold mb-2">
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
            <p className="text-xs text-gray-400">{profile.subheading}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              <a href="#" className="block hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white">
                Terms & Conditions
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Social</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
                (Icon, i) =>
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                  
                    <Icon size={14} />
                  </a>

              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Legal */}
      <div
        style={{
          backgroundColor: profile.footerBg
        }}
        className="border-t border-white/10 py-3 text-center">
        
        <p className="text-[11px] text-gray-500">
          {profile.copyright} · Powered by Spotlight
        </p>
      </div>

      {/* Mobile floating CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 grid grid-cols-2 z-30">
        <a
          href={`tel:${dealer.contact.phone}`}
          className="py-3 text-center text-white text-sm font-semibold flex items-center justify-center gap-2">
          
          <Phone size={14} /> Call Us
        </a>
        <a
          href="#"
          style={{
            backgroundColor: profile.accent
          }}
          className="py-3 text-center text-white text-sm font-semibold flex items-center justify-center gap-2">
          
          <MapPin size={14} /> Get Directions
        </a>
      </div>
    </div>);

}