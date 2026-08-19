import React from 'react';
import { Image, Download } from 'lucide-react';
export function Creatives() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Creatives</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Creative assets library for campaigns
        </div>
      </div>

      <div className="sp-card">
        <div className="flex items-center justify-between mb-6">
          <div className="card-title">Creative Assets</div>
          <button className="btn-primary-sm flex items-center gap-2">
            <Image size={14} /> Upload Creative
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
          {
            id: 'crv_001',
            name: 'Galaxy S24 Ultra 5G — Sarojini Nagar Creative 1',
            model: 'Galaxy S24 Ultra 5G',
            lang: 'English'
          },
          {
            id: 'crv_002',
            name: 'Galaxy Z Fold8 Ultra 5G — Festive Edit',
            model: 'Galaxy Z Fold8 Ultra 5G',
            lang: 'English'
          },
          {
            id: 'crv_003',
            name: 'Neo QLED 8K QN900D — Pune Hindi Creative',
            model: 'Neo QLED 8K QN900D',
            lang: 'Hindi'
          },
          {
            id: 'crv_004',
            name: 'Galaxy A55 5G — Gujarati Festive',
            model: 'Galaxy A55 5G',
            lang: 'Gujarati'
          },
          {
            id: 'crv_005',
            name: 'Galaxy Z Flip8 5G — Pune Marathi',
            model: 'Galaxy Z Flip8 5G',
            lang: 'Marathi'
          },
          {
            id: 'crv_006',
            name: 'Bespoke AI WindFree AC — Whitefield Launch',
            model: 'Bespoke AI WindFree AC',
            lang: 'English'
          }].
          map((c) =>
          <div
            key={c.id}
            className="border border-[var(--border-soft)] rounded-[8px] p-4 hover:border-[#1FB161] transition-colors">
            
              <div className="aspect-video bg-[var(--bg-page)] rounded-[8px] mb-3 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Image size={32} className="text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-700">
                  {c.lang}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div
                  className="font-medium text-sm mb-1 truncate max-w-[180px]"
                  title={c.name}>
                  
                    {c.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {c.model} · 1200x628 px
                  </div>
                </div>
                <button className="p-2 hover:bg-[var(--bg-page)] rounded transition-colors">
                  <Download size={16} className="text-[var(--text-muted)]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}