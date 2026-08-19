import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
export function GlobalFilters() {
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2025-11-01',
    end: '2026-04-30'
  });
  return (
    <>
      <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-[8px] border border-[var(--border-soft)]">
        <button
          onClick={() => setShowModal(true)}
          className="btn-outline-xs flex items-center gap-2">
          
          <Filter size={14} /> FILTERS
        </button>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
            setDateRange({
              ...dateRange,
              start: e.target.value
            })
            }
            className="text-xs h-[32px] px-2" />
          
          <span className="text-[var(--text-muted)] text-xs">—</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
            setDateRange({
              ...dateRange,
              end: e.target.value
            })
            }
            className="text-xs h-[32px] px-2" />
          
        </div>

        <button className="btn-outline-xs flex items-center gap-1 ml-auto">
          <X size={12} /> REMOVE FILTERS
        </button>
      </div>

      {showModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border-soft)] flex items-center justify-between">
              <h2 className="card-title">Filters</h2>
              <button
              onClick={() => setShowModal(false)}
              className="text-[var(--text-muted)] hover:text-[var(--text)]">
              
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Location */}
              <div>
                <div className="section-label mb-3">Location</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="field-label">Region</label>
                    <select>
                      <option>All Regions</option>
                      <option>North</option>
                      <option>South</option>
                      <option>East</option>
                      <option>West</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="field-label">State</label>
                    <select>
                      <option>All States</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="field-label">City</label>
                    <select>
                      <option>All Cities</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="field-label">RO</label>
                    <select>
                      <option>All ROs</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="field-label">Store Code</label>
                    <input type="text" placeholder="Enter store code" />
                  </div>
                </div>
              </div>

              {/* Product Category */}
              <div>
                <div className="section-label mb-3">Product Category</div>
                <select>
                  <option>All Categories</option>
                  <option>Galaxy S24 Ultra 5G (SM-S928B)</option>
                  <option>Galaxy A55 5G (SM-A556E)</option>
                  <option>Neo QLED 8K QN900D (QA85QN900D)</option>
                </select>
              </div>

              {/* Channel */}
              <div>
                <div className="section-label mb-3">Channel</div>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Google</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Meta</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Marketplace</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[var(--border-soft)] flex gap-3 justify-end">
              <button className="btn-outline">Reset</button>
              <button
              className="btn-primary"
              onClick={() => setShowModal(false)}>
              
                Apply
              </button>
            </div>
          </div>
        </div>
      }
    </>);

}