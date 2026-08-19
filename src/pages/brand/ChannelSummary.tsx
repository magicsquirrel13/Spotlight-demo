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
  date: 'Dec 15',
  clicks: 4,
  ctr: 0.48,
  cost: 79,
  cpl: 79,
  leads: 1
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
  date: 'Jan 15',
  clicks: 7,
  ctr: 0.58,
  cost: 162,
  cpl: 81,
  leads: 2
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
  date: 'Feb 15',
  clicks: 4,
  ctr: 0.49,
  cost: 83,
  cpl: 83,
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
  label: 'Clicks',
  value: '54'
},
{
  label: 'Paid Leads',
  value: '4'
},
{
  label: 'CTR',
  value: '0.58%'
},
{
  label: 'Paid CPL',
  value: '206.71'
}];

export function ChannelSummary() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMetrics = METRICS.slice(currentIndex, currentIndex + 5);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Channel Summary</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Performance summary by paid media channel
        </div>
      </div>

      <GlobalFilters />

      {/* Metric Carousel */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="p-2 rounded-full hover:bg-[var(--bg-page)] disabled:opacity-30 disabled:cursor-not-allowed">
          
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
          className="p-2 rounded-full hover:bg-[var(--bg-page)] disabled:opacity-30 disabled:cursor-not-allowed">
          
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Daily Summary - Clicks vs CTR */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Daily Summary (Clicks vs CTR)</div>
          <div className="flex gap-4 text-sm">
            <div>
              Click: <span className="font-mono font-medium">54</span>
            </div>
            <div>
              CTR: <span className="font-mono font-medium">0.58%</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
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

      {/* Daily Summary - Cost vs CPL */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Daily Summary (Cost vs CPL)</div>
          <div className="flex gap-4 text-sm">
            <div>
              Cost: <span className="font-mono font-medium">826.83</span>
            </div>
            <div>
              CPL: <span className="font-mono font-medium">82.68</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
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
              dataKey="cost"
              stroke="#0070FC"
              strokeWidth={2} />
            
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cpl"
              stroke="#00C158"
              strokeWidth={2} />
            
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Summary - Cost vs Leads */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Daily Summary (Cost vs Leads)</div>
          <div className="flex gap-4 text-sm">
            <div>
              Cost: <span className="font-mono font-medium">826.83</span>
            </div>
            <div>
              Leads: <span className="font-mono font-medium">10</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
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
              dataKey="cost"
              stroke="#0070FC"
              strokeWidth={2} />
            
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="leads"
              stroke="#00C158"
              strokeWidth={2} />
            
          </LineChart>
        </ResponsiveContainer>
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
                <th>Spend</th>
                <th>Spending Stores</th>
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
                ro: 'North RO',
                spend: 426.83,
                dealers: 12,
                impressions: '4.5K',
                clicks: 28,
                leads: 5,
                cpl: 85.37,
                ctr: '0.62%'
              },
              {
                ro: 'West RO',
                spend: 235.2,
                dealers: 8,
                impressions: '2.8K',
                clicks: 15,
                leads: 3,
                cpl: 78.4,
                ctr: '0.54%'
              },
              {
                ro: 'South RO',
                spend: 164.8,
                dealers: 6,
                impressions: '2.0K',
                clicks: 11,
                leads: 2,
                cpl: 82.4,
                ctr: '0.55%'
              }].
              map((row) =>
              <tr key={row.ro}>
                  <td className="font-medium">{row.ro}</td>
                  <td className="font-mono">{row.spend}</td>
                  <td className="font-mono">{row.dealers}</td>
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
    </div>);

}