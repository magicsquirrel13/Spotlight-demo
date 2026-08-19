import React, { useState } from 'react';
import { GlobalFilters } from '../../components/brand/GlobalFilters';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from
'recharts';
const dailyData = [
{
  date: 'Nov 1',
  clicks: 3,
  ctr: 0.45,
  cost: 45,
  cpl: 95,
  leads: 0
},
{
  date: 'Nov 15',
  clicks: 5,
  ctr: 0.52,
  cost: 88,
  cpl: 88,
  leads: 1
},
{
  date: 'Dec 1',
  clicks: 8,
  ctr: 0.61,
  cost: 156,
  cpl: 82,
  leads: 2
},
{
  date: 'Jan 1',
  clicks: 6,
  ctr: 0.55,
  cost: 102,
  cpl: 85,
  leads: 1
},
{
  date: 'Feb 1',
  clicks: 5,
  ctr: 0.51,
  cost: 114,
  cpl: 76,
  leads: 1
},
{
  date: 'Mar 1',
  clicks: 6,
  ctr: 0.56,
  cost: 124,
  cpl: 78,
  leads: 2
},
{
  date: 'Apr 1',
  clicks: 6,
  ctr: 0.54,
  cost: 160,
  cpl: 80,
  leads: 2
}];

const METRICS = [
{
  label: 'Impressions',
  value: '9.31K'
},
{
  label: 'Spend',
  value: '826.83'
},
{
  label: 'Clicks',
  value: '54'
},
{
  label: 'CTR',
  value: '0.58%'
},
{
  label: 'Paid Call Lead Sync',
  value: '2'
}];

export function DealerMIS() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMetrics = METRICS.slice(currentIndex, currentIndex + 5);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Store MIS</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Store-centric MIS — paid media + lead performance
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

      {/* Daily Summary Charts */}
      <div className="sp-card">
        <div className="card-title mb-4">Daily Summary (Clicks vs CTR)</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" />
            <XAxis
              dataKey="date"
              tick={{
                fontSize: 12
              }} />
            
            <YAxis
              yAxisId="left"
              tick={{
                fontSize: 12
              }} />
            
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{
                fontSize: 12
              }} />
            
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="clicks"
              stroke="#0070FC"
              strokeWidth={2} />
            
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="ctr"
              stroke="#00C158"
              strokeWidth={2} />
            
          </LineChart>
        </ResponsiveContainer>
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
                <th>Spending Stores</th>
                <th>Cost</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Leads</th>
                <th>CPL</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                region: 'North',
                dealers: 12,
                cost: 426.83,
                impressions: '4.5K',
                clicks: 28,
                leads: 5,
                cpl: 85.37,
                ctr: '0.62%'
              },
              {
                region: 'West',
                dealers: 8,
                cost: 235.2,
                impressions: '2.8K',
                clicks: 15,
                leads: 3,
                cpl: 78.4,
                ctr: '0.54%'
              },
              {
                region: 'South',
                dealers: 6,
                cost: 164.8,
                impressions: '2.0K',
                clicks: 11,
                leads: 2,
                cpl: 82.4,
                ctr: '0.55%'
              }].
              map((row) =>
              <tr key={row.region}>
                  <td className="font-medium">{row.region}</td>
                  <td className="font-mono">{row.dealers}</td>
                  <td className="font-mono">{row.cost}</td>
                  <td className="font-mono">{row.impressions}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.ctr}</td>
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
                <th>Spending Stores</th>
                <th>Cost</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Leads</th>
                <th>CPL</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                state: 'Delhi',
                dealers: 5,
                cost: 215.4,
                impressions: '2.1K',
                clicks: 14,
                leads: 2,
                cpl: 107.7,
                ctr: '0.67%'
              },
              {
                state: 'Maharashtra',
                dealers: 8,
                cost: 235.2,
                impressions: '2.8K',
                clicks: 15,
                leads: 3,
                cpl: 78.4,
                ctr: '0.54%'
              }].
              map((row) =>
              <tr key={row.state}>
                  <td className="font-medium">{row.state}</td>
                  <td className="font-mono">{row.dealers}</td>
                  <td className="font-mono">{row.cost}</td>
                  <td className="font-mono">{row.impressions}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.ctr}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Performance */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Store Performance</div>
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
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Leads</th>
                <th>CPL</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'MH101',
                name: 'Samsung SmartPlaza – Nexus Digital Andheri',
                region: 'West',
                state: 'Maharashtra',
                city: 'Mumbai',
                impressions: '1.8K',
                clicks: 12,
                leads: 4,
                cpl: 82.5,
                ctr: '0.67%'
              },
              {
                code: 'DL101',
                name: 'Samsung SmartPlaza – Sahil Electronics',
                region: 'North',
                state: 'Delhi',
                city: 'New Delhi',
                impressions: '2.1K',
                clicks: 14,
                leads: 5,
                cpl: 78.4,
                ctr: '0.67%'
              },
              {
                code: 'GJ101',
                name: 'Samsung SmartPlaza – Nexus Digital Satellite',
                region: 'West',
                state: 'Gujarat',
                city: 'Ahmedabad',
                impressions: '1.5K',
                clicks: 9,
                leads: 3,
                cpl: 88.2,
                ctr: '0.60%'
              },
              {
                code: 'MH201',
                name: 'Samsung SmartPlaza – Nexus Digital Pune Camp',
                region: 'West',
                state: 'Maharashtra',
                city: 'Pune',
                impressions: '1.4K',
                clicks: 8,
                leads: 2,
                cpl: 95.1,
                ctr: '0.57%'
              },
              {
                code: 'HR101',
                name: 'Samsung SmartPlaza – Pasco Retail Gurgaon',
                region: 'North',
                state: 'Haryana',
                city: 'Gurgaon',
                impressions: '1.6K',
                clicks: 11,
                leads: 3,
                cpl: 76.8,
                ctr: '0.69%'
              }].
              map((row) =>
              <tr key={row.code}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="font-mono">{row.impressions}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.ctr}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Campaign Performance Report</div>
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
                <th>Campaign Name</th>
                <th>Region</th>
                <th>State</th>
                <th>City</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Leads</th>
                <th>CTR</th>
                <th>Spends</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'MH101',
                name: 'Samsung SmartPlaza – Nexus Digital Andheri',
                campaign: 'Galaxy S24 Ultra Launch',
                region: 'West',
                state: 'Maharashtra',
                city: 'Mumbai',
                impressions: '1.1K',
                clicks: 7,
                leads: 2,
                ctr: '0.64%',
                spends: 142.8
              },
              {
                code: 'DL101',
                name: 'Samsung SmartPlaza – Sahil Electronics',
                campaign: 'Neo QLED Festive Offer',
                region: 'North',
                state: 'Delhi',
                city: 'New Delhi',
                impressions: '850',
                clicks: 5,
                leads: 1,
                ctr: '0.59%',
                spends: 95.5
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.campaign}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="font-mono">{row.impressions}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.ctr}</td>
                  <td className="font-mono">{row.spends}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}