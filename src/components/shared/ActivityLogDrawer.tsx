import React from 'react';
import { X } from 'lucide-react';
interface Lead {
  id: string;
  name: string;
  status: string;
  syncStatus: string;
  dealer: {
    name: string;
    code: string;
  };
  phone: string;
}
interface ActivityLogDrawerProps {
  lead: Lead;
  onClose: () => void;
}
const MOCK_ACTIVITIES = [
{
  event: 'Customer email changed from NA to azhar@gmail.com',
  timestamp: '04 May 2026 11:18 AM'
},
{
  event: 'Notes changed to Customer is from NA to NA',
  timestamp: '04 May 2026 11:15 AM'
},
{
  event: 'product changed from SELTOS to All New SELTOS',
  timestamp: '04 May 2026 10:42 AM'
},
{
  event: 'Leads status changed from pending to Appointed Enquiry',
  timestamp: '04 May 2026 10:30 AM'
},
{
  event: 'Lead created',
  timestamp: '04 May 2026 09:15 AM'
}];

export function ActivityLogDrawer({ lead, onClose }: ActivityLogDrawerProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-soft)] flex items-center justify-between">
          <h2 className="card-title">Activity Logs</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text)]">
            
            <X size={20} />
          </button>
        </div>

        {/* Lead Summary */}
        <div className="p-6 border-b border-[var(--border-soft)] bg-[var(--bg-page)]">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg mb-1">{lead.name}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`pill text-xs ${lead.syncStatus === 'synced' ? 'pill-done' : 'pill-pending'}`}>
                  
                  {lead.syncStatus === 'synced' ? 'Synced' : 'Pending'}
                </span>
              </div>
            </div>
            <span className="pill pill-submitted text-xs">{lead.status}</span>
          </div>
          <div className="text-sm text-[var(--text-muted)] space-y-1">
            <div>
              {lead.dealer.name} - {lead.dealer.code}
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>{lead.phone}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity, index) =>
            <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--brand-blue)] mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{activity.event}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>);

}