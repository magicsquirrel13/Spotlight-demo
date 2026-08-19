import React from 'react';
import { Download as DownloadIcon } from 'lucide-react';
export function PartnerDownload() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Downloads</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Async export queue for table downloads
        </div>
      </div>

      <div className="sp-card">
        <div className="card-title mb-4">Downloads Table</div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Request Date & Time</th>
                <th>Period</th>
                <th>Status</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-page)] flex items-center justify-center">
                      <DownloadIcon
                        size={24}
                        className="text-[var(--text-muted)]" />
                      
                    </div>
                    <div className="text-[var(--text-muted)]">
                      No download requests found
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Export any table to see download history here
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}