import React, { useState } from 'react';
import {
  Search,
  Clock,
  FileText,
  Pencil,
  Play,
  Volume2,
  Sparkles,
  Upload } from
'lucide-react';
import { ActivityLogDrawer } from './ActivityLogDrawer';
import { LeadDetailsDrawer } from './LeadDetailsDrawer';
import { AddNoteModal } from './AddNoteModal';
import { WhatsAppDrawer } from './WhatsAppDrawer';
import { RecordingPlayerModal } from './RecordingPlayerModal';
import { UploadLeadsModal } from './UploadLeadsModal';
import {
  FiltersModal,
  EMPTY_FILTERS,
  applyLeadFilters,
  countFilters } from
'./FiltersModal';
import type { LeadFilters } from './FiltersModal';
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  status: 'cold' | 'warm' | 'hot';
  statusLabel?: string;
  syncStatus: 'pending' | 'synced';
  dealer: {
    name: string;
    code: string;
    city?: string;
    state?: string;
  };
  model: string;
  category?: string;
  subcategory?: string;
  priceRange?: string;
  recordingUrl?: string;
  callDuration?: string;
  callDurationSec?: number;
  multiVisits?: boolean;
  isAiHandled: boolean;
  leadCreatedOn?: string;
  aiAnalytics?: {
    durationSec: number;
    completionPct: number;
    qa: Array<{
      question: string;
      answer: string | null;
    }>;
    callBackReason?: string;
    duration?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    intent?: {
      reason: string;
      purpose: string;
    };
    productInterest?: {
      product: string;
      budget: string;
      preferences: string[];
    };
  };
}
interface LMSLeadListProps {
  leads: Lead[];
  title?: string;
}
// Samsung consumer-electronics product taxonomy for the Lead filters
export const PRODUCT_TAXONOMY: Record<string, Record<string, string[]>> = {
  Mobiles: {
    Foldables: ['Galaxy Z Fold8 Ultra 5G', 'Galaxy Z Flip8 5G'],
    'Galaxy S Series': ['Galaxy S24 Ultra 5G', 'Galaxy S24+ 5G'],
    'Galaxy A Series': ['Galaxy A55 5G', 'Galaxy A35 5G']
  },
  Televisions: {
    'Neo QLED': ['Neo QLED 8K QN900D', 'Neo QLED 4K QN90D'],
    'The Frame': ['The Frame LS03D'],
    'Crystal UHD': ['Crystal UHD DU7700']
  },
  Refrigerators: {
    'Bespoke French Door': ['Bespoke French Door RF57DG'],
    'Side-by-Side': ['Bespoke Side-by-Side RS76CG8']
  },
  'Washing Machines': {
    'Front Load': ['Bespoke AI Front Load WW11DG', 'EcoBubble Front Load WW80T']
  },
  'Air Conditioners': {
    'Split AC': ['Bespoke AI WindFree AR18DY']
  },
  Laptops: {
    'Galaxy Book': ['Galaxy Book5 Pro NP940XGK']
  }
};
// Shared column template so header and rows align identically
const COLS = 'grid-cols-[60px_1.2fr_1fr_1.2fr_240px]';
export function LMSLeadList({
  leads,
  title = 'Sales Leads'
}: LMSLeadListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [showUpload, setShowUpload] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<LeadFilters>(EMPTY_FILTERS);
  const filterCount = countFilters(filters);
  // Cascading product filters: Category → Sub-category → Product
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [product, setProduct] = useState('');
  const subcatOptions = category ? Object.keys(PRODUCT_TAXONOMY[category] || {}) : [];
  const productOptions =
  category && subcategory ? PRODUCT_TAXONOMY[category]?.[subcategory] || [] : [];
  const filteredLeads = applyLeadFilters(leads, filters).filter((l) => {
    if (product && l.model !== product) return false;
    if (subcategory && l.subcategory && l.subcategory !== subcategory) return false;
    if (category && l.category && l.category !== category) return false;
    if (
    searchQuery &&
    !`${l.name} ${l.email} ${l.phone} ${l.model}`.
    toLowerCase().
    includes(searchQuery.toLowerCase()))
    return false;
    return true;
  });
  const [activeDrawer, setActiveDrawer] = useState<{
    type: 'activity' | 'details' | 'note' | 'whatsapp' | 'recording' | null;
    lead: Lead | null;
  }>({
    type: null,
    lead: null
  });
  const toggleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };
  const getStatusPillColor = (status: string) => {
    switch (status) {
      case 'cold':
        return 'bg-white text-blue-600 border-blue-200';
      case 'warm':
        return 'bg-white text-orange-600 border-orange-200';
      case 'hot':
        return 'bg-white text-red-600 border-red-200';
      default:
        return 'bg-white text-gray-600 border-gray-200';
    }
  };
  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'cold':
        return '😐';
      case 'warm':
        return '😊';
      case 'hot':
        return '🔥';
      default:
        return '😐';
    }
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-[420px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
              <input
                type="text"
                placeholder="Search by Name, Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] pr-4 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-blue-500 text-sm"
                style={{
                  paddingLeft: '56px'
                }} />
              
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className={`h-[48px] px-5 rounded-full border flex items-center gap-2 text-sm font-medium transition-colors ${filterCount ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600' : 'border-blue-500 bg-white hover:bg-blue-50 text-blue-600'}`}>

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M4 8h8M6 12h4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round" />

              </svg>
              Filters
              {filterCount > 0 &&
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-blue-600 text-xs font-semibold">
                  {filterCount}
                </span>
              }
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="h-[48px] px-5 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center gap-2 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20"
              title="Import leads from CSV, Excel, Facebook, or other CRMs">
              
              <Upload size={16} />
              Upload Leads
            </button>
          </div>
        </div>

        {/* Product filters — Category → Sub-category → Product */}
        <div className="flex flex-wrap items-end gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory('');
                setProduct('');
              }}
              className="h-10 min-w-[200px] px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-500">

              <option value="">All Categories</option>
              {Object.keys(PRODUCT_TAXONOMY).map((c) =>
              <option key={c} value={c}>
                  {c}
                </option>
              )}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Sub-category
            </label>
            <select
              value={subcategory}
              disabled={!category}
              onChange={(e) => {
                setSubcategory(e.target.value);
                setProduct('');
              }}
              className="h-10 min-w-[200px] px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400">

              <option value="">All Sub-categories</option>
              {subcatOptions.map((s) =>
              <option key={s} value={s}>
                  {s}
                </option>
              )}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Product
            </label>
            <select
              value={product}
              disabled={!subcategory}
              onChange={(e) => setProduct(e.target.value)}
              className="h-10 min-w-[240px] px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400">

              <option value="">All Products</option>
              {productOptions.map((p) =>
              <option key={p} value={p}>
                  {p}
                </option>
              )}
            </select>
          </div>
          {(category || subcategory || product) &&
          <button
            onClick={() => {
              setCategory('');
              setSubcategory('');
              setProduct('');
            }}
            className="h-10 px-4 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">

              Clear
            </button>
          }
          <div className="ml-auto text-sm text-gray-500 self-center">
            Showing <span className="font-semibold text-gray-800">{filteredLeads.length}</span> of{' '}
            {leads.length} leads
          </div>
        </div>

        {/* Table Container — symmetric grid using divide-y for rows */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header Row */}
          <div
            className={`grid ${COLS} bg-gray-50 border-b border-gray-200 divide-x divide-gray-200`}>
            
            <div className="px-4 py-4 flex items-center justify-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLeads(new Set(filteredLeads.map((l) => l.id)));
                  } else {
                    setSelectedLeads(new Set());
                  }
                }} />
              
            </div>
            <div className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
              LEAD DETAILS
            </div>
            <div className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
              CONTACT INFORMATION
            </div>
            <div className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
              STORE & PRODUCT
            </div>
            <div className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
              ACTIONS
            </div>
          </div>

          {/* Body Rows — divide-y for horizontal lines, divide-x inside each row for vertical lines */}
          <div className="divide-y divide-gray-200">
            {filteredLeads.map((lead) =>
            <div
              key={lead.id}
              className={`grid ${COLS} divide-x divide-gray-200 hover:bg-gray-50/50 transition-colors`}>
              
                {/* Checkbox */}
                <div className="px-4 py-6 flex items-start justify-center">
                  <input
                  type="checkbox"
                  checked={selectedLeads.has(lead.id)}
                  onChange={() => toggleSelectLead(lead.id)}
                  className="w-4 h-4 rounded border-gray-300 mt-1" />
                
                </div>

                {/* Lead Details */}
                <div className="px-6 py-6">
                  <div className="flex flex-col gap-3">
                    {lead.isAiHandled &&
                  <div className="flex items-center gap-1.5">
                        <Sparkles
                      size={14}
                      className="text-blue-500 fill-blue-500" />
                    
                        <span className="text-xs font-semibold text-blue-500 tracking-wide">
                          AI
                        </span>
                      </div>
                  }
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base font-semibold flex-shrink-0">
                        {lead.name.
                      split(' ').
                      map((n) => n[0]).
                      join('').
                      toUpperCase().
                      slice(0, 2)}
                      </div>
                      <div className="flex flex-col gap-1 pt-1">
                        <div className="font-semibold text-gray-900 text-base">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.stage}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusPillColor(lead.status)}`}>
                      
                        <span>{getStatusEmoji(lead.status)}</span>
                        {lead.status.charAt(0).toUpperCase() +
                      lead.status.slice(1)}
                      </span>
                      {lead.statusLabel &&
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-green-600 border border-green-200">
                          {lead.statusLabel}
                        </span>
                    }
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="px-6 py-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400 flex-shrink-0">
                      
                        <rect
                        x="2"
                        y="3"
                        width="12"
                        height="10"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none" />
                      
                        <path
                        d="M2 5l6 4 6-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none" />
                      
                      </svg>
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400 flex-shrink-0">
                      
                        <path
                        d="M3 2h3l1 3-1 2a8 8 0 004 4l2-1 3 1v3a2 2 0 01-2 2C6.5 16 1 10.5 1 4a2 2 0 012-2z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none" />
                      
                      </svg>
                      <span>{lead.phone}</span>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-orange-600 border border-orange-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {lead.syncStatus === 'pending' ? 'Pending' : 'Synced'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dealer & Car Model */}
                <div className="px-6 py-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400 flex-shrink-0">
                      
                        <rect
                        x="2"
                        y="4"
                        width="12"
                        height="8"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none" />
                      
                        <path
                        d="M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none" />
                      
                      </svg>
                      <span className="text-gray-900 font-medium">
                        {lead.dealer.name} -{' '}
                        <span className="font-bold">{lead.dealer.code}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400 flex-shrink-0">
                      
                        <path
                        d="M2 10h12M3 6l1-2h8l1 2M4 10v2M12 10v2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round" />
                      
                      </svg>
                      <span className="text-gray-700">{lead.model}</span>
                    </div>
                    {lead.priceRange &&
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400 flex-shrink-0">
                      
                          <rect
                        x="2"
                        y="3"
                        width="12"
                        height="10"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none" />
                      
                        </svg>
                        <span>{lead.priceRange}</span>
                      </div>
                  }
                    {lead.recordingUrl ?
                  <button
                    onClick={() =>
                    setActiveDrawer({
                      type: 'recording',
                      lead
                    })
                    }
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors w-full text-left"
                    title="Play recording">
                    
                        <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                          <Play size={10} fill="white" />
                        </span>
                        <span className="flex-1 h-1 bg-blue-200 rounded-full overflow-hidden min-w-[40px]">
                          <span className="block h-full bg-blue-500 w-0"></span>
                        </span>
                        <span className="text-xs text-gray-600 font-mono whitespace-nowrap">
                          {lead.callDuration || '0:00 / 0:32'}
                        </span>
                        <Volume2
                      size={12}
                      className="text-gray-400 flex-shrink-0" />
                    
                      </button> :

                  <div className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-500 text-center">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                          Recording Not Available
                        </span>
                      </div>
                  }
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-6 flex flex-col items-center justify-center gap-3 relative">
                  {lead.multiVisits &&
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 self-end">
                      <Clock size={12} />
                      MULTI-VISITS
                    </span>
                }
                  <div className="flex items-center gap-3">
                    <button
                    onClick={() =>
                    setActiveDrawer({
                      type: 'whatsapp',
                      lead
                    })
                    }
                    className="w-11 h-11 rounded-full border border-green-200 bg-white hover:bg-green-50 flex items-center justify-center transition-colors relative"
                    title="WhatsApp Conversation">
                    
                      <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#25D366">
                      
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                    </button>
                    <button
                    onClick={() =>
                    setActiveDrawer({
                      type: 'activity',
                      lead
                    })
                    }
                    className="w-11 h-11 rounded-full border border-blue-200 bg-white hover:bg-blue-50 flex items-center justify-center transition-colors"
                    title="Activity Log">
                    
                      <Clock size={18} className="text-blue-500" />
                    </button>
                    <button
                    onClick={() =>
                    setActiveDrawer({
                      type: 'note',
                      lead
                    })
                    }
                    className="w-11 h-11 rounded-full border border-blue-200 bg-white hover:bg-blue-50 flex items-center justify-center transition-colors"
                    title="Add Note">
                    
                      <FileText size={18} className="text-blue-500" />
                    </button>
                    <button
                    onClick={() =>
                    setActiveDrawer({
                      type: 'details',
                      lead
                    })
                    }
                    className="w-11 h-11 rounded-full border border-blue-200 bg-white hover:bg-blue-50 flex items-center justify-center transition-colors"
                    title="Edit Lead">
                    
                      <Pencil size={18} className="text-blue-500" />
                    </button>
                  </div>
                  {lead.isAiHandled &&
                <span className="text-xs text-gray-500">
                      Answered By AI
                    </span>
                }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawers */}
      {activeDrawer.type === 'activity' && activeDrawer.lead &&
      <ActivityLogDrawer
        lead={activeDrawer.lead}
        onClose={() =>
        setActiveDrawer({
          type: null,
          lead: null
        })
        } />

      }

      {activeDrawer.type === 'details' && activeDrawer.lead &&
      <LeadDetailsDrawer
        lead={activeDrawer.lead}
        onClose={() =>
        setActiveDrawer({
          type: null,
          lead: null
        })
        }
        onOpenActivityLog={() =>
        setActiveDrawer({
          type: 'activity',
          lead: activeDrawer.lead
        })
        } />

      }

      {activeDrawer.type === 'note' && activeDrawer.lead &&
      <AddNoteModal
        lead={activeDrawer.lead}
        onClose={() =>
        setActiveDrawer({
          type: null,
          lead: null
        })
        } />

      }

      {activeDrawer.type === 'whatsapp' && activeDrawer.lead &&
      <WhatsAppDrawer
        lead={activeDrawer.lead}
        onClose={() =>
        setActiveDrawer({
          type: null,
          lead: null
        })
        } />

      }

      {activeDrawer.type === 'recording' &&
      activeDrawer.lead &&
      activeDrawer.lead.recordingUrl &&
      <RecordingPlayerModal
        url={activeDrawer.lead.recordingUrl}
        leadName={activeDrawer.lead.name}
        model={activeDrawer.lead.model}
        onClose={() =>
        setActiveDrawer({
          type: null,
          lead: null
        })
        } />

      }

      {showUpload && <UploadLeadsModal onClose={() => setShowUpload(false)} />}

      {showFilters &&
      <FiltersModal
        leads={leads}
        initial={filters}
        onApply={(f) => {
          setFilters(f);
          setShowFilters(false);
        }}
        onClose={() => setShowFilters(false)} />
      }
    </>);

}