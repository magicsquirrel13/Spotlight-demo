import React, { useState } from 'react';
import { Clock, FileText, Pencil, Play, Pause } from 'lucide-react';
import { ActivityLogDrawer } from './ActivityLogDrawer';
import { LeadDetailsDrawer } from './LeadDetailsDrawer';
import { AddNoteModal } from './AddNoteModal';
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'hot' | 'cold' | 'hot_cancelled';
  stage?: string;
  incomplete?: boolean;
  syncStatus: 'pending' | 'synced';
  dealer: {
    name: string;
    code: string;
  };
  model?: string;
  recordingUrl?: string;
  multiVisits?: number;
  isAiHandled?: boolean;
  callDuration?: number;
  aiAnalytics?: {
    durationSec: number;
    completionPct: number;
    qa: Array<{
      question: string;
      answer: string | null;
    }>;
  };
}
interface LeadListItemProps {
  lead: Lead;
}
export function LeadListItem({ lead }: LeadListItemProps) {
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const getStatusPill = (status: string) => {
    const baseClass = 'pill text-xs';
    switch (status) {
      case 'hot':
        return <span className={`${baseClass} pill-submitted`}>Hot</span>;
      case 'cold':
        return <span className={`${baseClass} pill-submitted`}>Cold</span>;
      case 'hot_cancelled':
        return (
          <span className={`${baseClass} pill-submitted`}>Hot Cancelled</span>);

      default:
        return null;
    }
  };
  const getStagePill = (stage?: string) => {
    if (!stage) return null;
    return <span className="pill pill-muted text-xs">{stage}</span>;
  };
  return (
    <>
      <div className="flex items-center gap-4 p-4 border border-[var(--border-soft)] rounded-[8px] hover:border-[var(--brand-blue)] transition-colors relative">
        {/* Incomplete badge */}
        {lead.incomplete &&
        <div className="absolute -left-2 top-1/2 -translate-y-1/2">
            <span className="pill text-xs bg-red-100 text-red-700">
              Incomplete
            </span>
          </div>
        }

        {/* Multi-visits badge */}
        {lead.multiVisits && lead.multiVisits > 1 &&
        <div className="absolute -right-2 -top-2">
            <span className="pill pill-done text-xs flex items-center gap-1">
              <Clock size={10} /> MULTI-VISITS
            </span>
          </div>
        }

        {/* Lead Details */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[var(--brand-indigo)] text-white flex items-center justify-center font-medium flex-shrink-0">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            {lead.isAiHandled &&
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--brand-blue)] flex items-center justify-center">
                <span className="text-[8px] text-white">🤖</span>
              </div>
            }
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{lead.name}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {getStatusPill(lead.status)}
              {getStagePill(lead.stage)}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="text-[var(--text-muted)]">✉</span>
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="text-[var(--text-muted)]">📞</span>
            <span>{lead.phone}</span>
          </div>
          <span
            className={`pill text-xs ${lead.syncStatus === 'synced' ? 'pill-done' : 'pill-pending'}`}>
            
            {lead.syncStatus === 'synced' ? 'Synced' : 'Pending'}
          </span>
        </div>

        {/* Store and Product */}
        <div className="flex-1 min-w-0">
          <div className="text-sm mb-1">
            {lead.dealer.name} - {lead.dealer.code}
          </div>
          <div className="text-sm font-medium mb-2">
            {lead.model || 'Not Available'}
          </div>
          {lead.recordingUrl ?
          <div className="flex items-center gap-2">
              <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-6 h-6 rounded-full bg-[var(--brand-blue)] text-white flex items-center justify-center hover:bg-[var(--brand-indigo)] transition-colors">
              
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              </button>
              <div className="flex-1 h-1 bg-[var(--bg-page)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--brand-blue)] w-1/3"></div>
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                {lead.callDuration || 0}s
              </span>
            </div> :

          <div className="text-xs text-[var(--text-muted)]">
              Recording Not Available
            </div>
          }
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setShowActivityLog(true)}
            className="w-8 h-8 rounded-full hover:bg-[var(--bg-page)] flex items-center justify-center transition-colors"
            title="Activity Log">
            
            <Clock size={16} className="text-[var(--text-muted)]" />
          </button>
          <button
            onClick={() => setShowAddNote(true)}
            className="w-8 h-8 rounded-full hover:bg-[var(--bg-page)] flex items-center justify-center transition-colors"
            title="Add TO-DO Note">
            
            <FileText size={16} className="text-[var(--text-muted)]" />
          </button>
          <button
            onClick={() => setShowLeadDetails(true)}
            className="w-8 h-8 rounded-full hover:bg-[var(--bg-page)] flex items-center justify-center transition-colors"
            title="Edit Lead">
            
            <Pencil size={16} className="text-[var(--text-muted)]" />
          </button>
        </div>
      </div>

      {showActivityLog &&
      <ActivityLogDrawer
        lead={lead}
        onClose={() => setShowActivityLog(false)} />

      }

      {showLeadDetails &&
      <LeadDetailsDrawer
        lead={lead}
        onClose={() => setShowLeadDetails(false)}
        onOpenActivityLog={() => {
          setShowLeadDetails(false);
          setShowActivityLog(true);
        }} />

      }

      {showAddNote &&
      <AddNoteModal lead={lead} onClose={() => setShowAddNote(false)} />
      }
    </>);

}