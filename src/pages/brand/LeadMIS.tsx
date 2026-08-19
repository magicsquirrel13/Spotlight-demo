import React, { useState } from 'react';
import { GlobalFilters } from '../../components/brand/GlobalFilters';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
const METRICS = [
{
  label: 'Attended Leads',
  value: '7'
},
{
  label: 'Unattended Leads',
  value: '3'
},
{
  label: 'Leads with Calls',
  value: '2'
},
{
  label: 'Answered',
  value: '0'
},
{
  label: 'Missed By Agent',
  value: '0'
},
{
  label: 'Missed By Customer',
  value: '2'
},
{
  label: 'Average Call Duration',
  value: '0m 0s'
},
{
  label: 'NON Syncable Leads',
  value: '0'
}];

export function LeadMIS() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMetrics = METRICS.slice(currentIndex, currentIndex + 5);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Lead MIS</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Operational MIS for inbound leads — call attendance and metrics
        </div>
      </div>

      <GlobalFilters />

      {/* Metric Carousel */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="p-2 rounded-full hover:bg-[var(--bg-page)] disabled:opacity-30">
          
          <ChevronLeft size={20} />
        </button>

        <div className="flex-1 grid grid-cols-5 gap-4">
          {visibleMetrics.map((metric) =>
          <div key={metric.label} className="sp-card">
              <div className="text-[11px] font-medium uppercase tracking-[0.66px] text-[var(--text-muted)] mb-2">
                {metric.label}
              </div>
              <div className="numeric-stat">{metric.value}</div>
            </div>
          )}
        </div>

        <button
          onClick={() =>
          setCurrentIndex(Math.min(METRICS.length - 5, currentIndex + 1))
          }
          disabled={currentIndex >= METRICS.length - 5}
          className="p-2 rounded-full hover:bg-[var(--bg-page)] disabled:opacity-30">
          
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Region Based Report */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Region Based Report</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Total Leads</th>
                <th>Form Leads</th>
                <th>Call Leads</th>
                <th>Answered</th>
                <th>Missed</th>
                <th>CPL</th>
                <th>Avg Call Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                region: 'North',
                total: 5,
                form: 4,
                call: 1,
                answered: 0,
                missed: 1,
                cpl: 85.37,
                duration: '0m 0s'
              },
              {
                region: 'West',
                total: 3,
                form: 2,
                call: 1,
                answered: 0,
                missed: 1,
                cpl: 78.4,
                duration: '0m 0s'
              },
              {
                region: 'South',
                total: 2,
                form: 2,
                call: 0,
                answered: 0,
                missed: 0,
                cpl: 82.4,
                duration: '—'
              }].
              map((row) =>
              <tr key={row.region}>
                  <td className="font-medium">{row.region}</td>
                  <td className="font-mono">{row.total}</td>
                  <td className="font-mono">{row.form}</td>
                  <td className="font-mono">{row.call}</td>
                  <td className="font-mono">{row.answered}</td>
                  <td className="font-mono">{row.missed}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* State Based Report */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">State Based Report</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Total Leads</th>
                <th>Form Leads</th>
                <th>Call Leads</th>
                <th>Answered</th>
                <th>Missed</th>
                <th>CPL</th>
                <th>Avg Call Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                state: 'Delhi',
                total: 2,
                form: 2,
                call: 0,
                answered: 0,
                missed: 0,
                cpl: 107.7,
                duration: '—'
              },
              {
                state: 'Maharashtra',
                total: 3,
                form: 2,
                call: 1,
                answered: 0,
                missed: 1,
                cpl: 78.4,
                duration: '0m 0s'
              }].
              map((row) =>
              <tr key={row.state}>
                  <td className="font-medium">{row.state}</td>
                  <td className="font-mono">{row.total}</td>
                  <td className="font-mono">{row.form}</td>
                  <td className="font-mono">{row.call}</td>
                  <td className="font-mono">{row.answered}</td>
                  <td className="font-mono">{row.missed}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* City Based Report */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">City Based Report</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>City</th>
                <th>State</th>
                <th>Total Leads</th>
                <th>Form Leads</th>
                <th>Call Leads</th>
                <th>Answered</th>
                <th>Missed</th>
                <th>CPL</th>
                <th>Avg Call Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                city: 'New Delhi',
                state: 'Delhi',
                total: 2,
                form: 2,
                call: 0,
                answered: 0,
                missed: 0,
                cpl: 107.7,
                duration: '—'
              },
              {
                city: 'Mumbai',
                state: 'Maharashtra',
                total: 2,
                form: 1,
                call: 1,
                answered: 0,
                missed: 1,
                cpl: 78.4,
                duration: '0m 0s'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-medium">{row.city}</td>
                  <td>{row.state}</td>
                  <td className="font-mono">{row.total}</td>
                  <td className="font-mono">{row.form}</td>
                  <td className="font-mono">{row.call}</td>
                  <td className="font-mono">{row.answered}</td>
                  <td className="font-mono">{row.missed}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RO Based Report */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">RO Based Report</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>RO</th>
                <th>State</th>
                <th>Total Leads</th>
                <th>Form Leads</th>
                <th>Call Leads</th>
                <th>Answered</th>
                <th>Missed</th>
                <th>CPL</th>
                <th>Avg Call Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                ro: 'North RO',
                state: 'Delhi',
                total: 5,
                form: 4,
                call: 1,
                answered: 0,
                missed: 1,
                cpl: 85.37,
                duration: '0m 0s'
              },
              {
                ro: 'West RO',
                state: 'Maharashtra',
                total: 3,
                form: 2,
                call: 1,
                answered: 0,
                missed: 1,
                cpl: 78.4,
                duration: '0m 0s'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-medium">{row.ro}</td>
                  <td>{row.state}</td>
                  <td className="font-mono">{row.total}</td>
                  <td className="font-mono">{row.form}</td>
                  <td className="font-mono">{row.call}</td>
                  <td className="font-mono">{row.answered}</td>
                  <td className="font-mono">{row.missed}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Funnel Metrics */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Lead Funnel Metrics</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Store Code</th>
                <th>Store Name</th>
                <th>Region</th>
                <th>State</th>
                <th>City</th>
                <th>Form Leads</th>
                <th>Call Leads</th>
                <th>Total Leads</th>
                <th>Answered</th>
                <th>Missed</th>
                <th>Avg Call Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'DL069',
                name: 'Samsung SmartPlaza – Sahil Electronics',
                region: 'North',
                state: 'Delhi',
                city: 'New Delhi',
                form: 2,
                call: 0,
                total: 2,
                answered: 0,
                missed: 0,
                duration: '—'
              },
              {
                code: 'MH412',
                name: 'Samsung SmartPlaza – Pasco Retail',
                region: 'West',
                state: 'Maharashtra',
                city: 'Mumbai',
                form: 1,
                call: 1,
                total: 2,
                answered: 0,
                missed: 1,
                duration: '0m 0s'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="font-mono">{row.form}</td>
                  <td className="font-mono">{row.call}</td>
                  <td className="font-mono">{row.total}</td>
                  <td className="font-mono">{row.answered}</td>
                  <td className="font-mono">{row.missed}</td>
                  <td className="font-mono">{row.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}