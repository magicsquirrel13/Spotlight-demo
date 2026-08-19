import React, { useState } from 'react';
import { GlobalFilters } from '../../components/brand/GlobalFilters';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from
'recharts';
const METRICS = [
{
  label: 'Clicks',
  value: '54'
},
{
  label: 'Impressions',
  value: '9.31K'
},
{
  label: 'Leads',
  value: '10'
},
{
  label: 'Call Leads',
  value: '2'
},
{
  label: 'Call Lead Sync',
  value: '0'
},
{
  label: 'Form Leads',
  value: '8'
},
{
  label: 'Form Lead Sync',
  value: '2'
},
{
  label: 'Agent Missed Calls',
  value: '2'
},
{
  label: 'Lead Sync',
  value: '2'
},
{
  label: 'CPL',
  value: '82.68'
},
{
  label: 'Attended Leads',
  value: '7'
},
{
  label: 'Service Leads',
  value: '0'
}];

const performanceTrendData = [
{
  date: 'May 2',
  leads: 0,
  cpl: 0
},
{
  date: 'May 3',
  leads: 2,
  cpl: 95
},
{
  date: 'May 4',
  leads: 3,
  cpl: 82
},
{
  date: 'May 5',
  leads: 5,
  cpl: 78
}];

import { usePartnerLocation } from './PartnerShell';
export function Dashboard() {
  const { selectedLocation } = usePartnerLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [funnelTab, setFunnelTab] = useState<'call' | 'form'>('call');
  const visibleMetrics = METRICS.slice(currentIndex, currentIndex + 5);
  const performanceData = [
  {
    dealerId: 'dlr_001',
    code: 'DL069',
    name: 'Samsung SmartPlaza – Sahil Electronics',
    region: 'North',
    state: 'Delhi',
    city: 'New Delhi',
    campaign: 'Galaxy S24 Ultra Launch',
    spend: '826.83',
    impressions: '9.31K',
    clicks: '54',
    ctr: '0.58%'
  },
  {
    dealerId: 'dlr_002',
    code: 'MH412',
    name: 'Samsung SmartPlaza – Nexus Digital',
    region: 'West',
    state: 'Maharashtra',
    city: 'Pune',
    campaign: 'Neo QLED 8K Festive',
    spend: '650.00',
    impressions: '7.2K',
    clicks: '42',
    ctr: '0.58%'
  }];

  const filteredPerformance = performanceData.filter(
    (d) => selectedLocation === 'all' || d.dealerId === selectedLocation
  );
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Store-side performance dashboard
        </div>
      </div>

      <GlobalFilters />

      {/* KPI Carousel */}
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

      {/* Gauge Cards */}
      <div className="sp-card">
        <div className="card-title mb-5">Gauge Card</div>
        <div className="grid grid-cols-4 gap-6">
          {[
          {
            label: 'Call Answered Ratio',
            value: 0,
            total: 2
          },
          {
            label: 'Call Leads With Status',
            value: 0,
            total: 2
          },
          {
            label: 'Call Leads Sync',
            value: 0,
            total: 2
          },
          {
            label: 'Enquiry to Booking Ratio',
            value: 0,
            total: 10
          }].
          map((gauge) =>
          <div key={gauge.label} className="text-center">
              <div className="relative w-32 h-16 mx-auto mb-3">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path
                  d="M 10 45 A 40 40 0 0 1 90 45"
                  fill="none"
                  stroke="#EEF2F6"
                  strokeWidth="8" />
                
                  <path
                  d="M 10 45 A 40 40 0 0 1 10 45"
                  fill="none"
                  stroke="#0070FC"
                  strokeWidth="8"
                  strokeLinecap="round" />
                
                </svg>
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <span className="text-xl font-bold">
                    {(gauge.value / gauge.total * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] mb-1">
                {gauge.label}
              </div>
              <div className="inline-block px-2 py-1 bg-[var(--bg-page)] rounded text-xs font-mono">
                {gauge.value}/{gauge.total}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performance Trend */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Performance Trend</div>
          <div className="flex gap-4 text-sm">
            <div>
              Leads: <span className="font-mono font-medium">10</span>
            </div>
            <div>
              CPL: <span className="font-mono font-medium">82.68</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceTrendData}>
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
            <Bar yAxisId="left" dataKey="leads" fill="#0070FC" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cpl"
              stroke="#00C158"
              strokeWidth={2} />
            
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Lead Source Breakup */}
        <div className="sp-card">
          <div className="card-title mb-4">Lead Source Breakup</div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-xs text-[var(--text-muted)] mb-2">
                Organic Leads
              </div>
              <div className="flex justify-between items-center p-2 bg-[var(--bg-page)] rounded">
                <span className="text-sm">Google Leads</span>
                <span className="font-mono font-medium">6</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] mb-2">
                Paid Leads
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 bg-[var(--bg-page)] rounded">
                  <span className="text-sm">Facebook Leads</span>
                  <span className="font-mono font-medium">0</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[var(--bg-page)] rounded">
                  <span className="text-sm">Google Leads</span>
                  <span className="font-mono font-medium">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Type Overview */}
        <div className="sp-card">
          <div className="card-title mb-4">Lead Type Overview</div>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                    {
                      name: 'Call Leads',
                      value: 20
                    },
                    {
                      name: 'Form Leads',
                      value: 80
                    }]
                    }
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value">
                    
                    <Cell fill="#0070FC" />
                    <Cell fill="#00C158" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Leads</span>
                <span className="font-mono font-medium">10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Call Leads</span>
                <span className="font-mono font-medium">2 (20%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Form Leads</span>
                <span className="font-mono font-medium">8 (80%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Lead Journey */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Sales Lead Journey</div>
          <div className="filter-tabs">
            <button
              className={`tab ${funnelTab === 'call' ? 'active' : ''}`}
              onClick={() => setFunnelTab('call')}>
              
              Call Leads
            </button>
            <button
              className={`tab ${funnelTab === 'form' ? 'active' : ''}`}
              onClick={() => setFunnelTab('form')}>
              
              Form Leads
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
          {
            stage: 'Lead Generated',
            total: 10,
            call: 2,
            form: 8,
            pct: 100
          },
          {
            stage: 'Opened On Dashboard',
            total: 8,
            call: 2,
            form: 6,
            pct: 80
          },
          {
            stage: 'Saved',
            total: 5,
            call: 1,
            form: 4,
            pct: 50
          },
          {
            stage: 'Synced',
            total: 2,
            call: 0,
            form: 2,
            pct: 20
          }].
          map((stage) =>
          <div
            key={stage.stage}
            className="border border-[var(--border-soft)] rounded-[8px] p-4">
            
              <div className="text-xs text-[var(--text-muted)] mb-2">
                {stage.stage}
              </div>
              <div className="numeric-stat text-[20px] mb-2">{stage.total}</div>
              <div className="text-xs text-[var(--text-muted)] mb-1">
                {stage.pct}% of generated
              </div>
              <div className="text-xs font-mono">
                Call: {stage.call} | Form: {stage.form}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead Breakup Table */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Lead Breakup</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Store Code</th>
                <th>Total Lead</th>
                <th>Form Leads</th>
                <th>Call Leads</th>
                <th>Answered</th>
                <th>Missed</th>
                <th>Missed By Agent</th>
                <th>Outbound Calls</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono">DL069</td>
                <td className="font-mono">10</td>
                <td className="font-mono">8</td>
                <td className="font-mono">2</td>
                <td className="font-mono">0</td>
                <td className="font-mono">2</td>
                <td className="font-mono">2</td>
                <td className="font-mono">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Performance Table */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Your Performance</div>
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
                <th>Campaign Name</th>
                <th>Spend</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {filteredPerformance.map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td>{row.campaign}</td>
                  <td className="font-mono">{row.spend}</td>
                  <td className="font-mono">{row.impressions}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.ctr}</td>
                </tr>
              )}
              {filteredPerformance.length === 0 &&
              <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500">
                    No performance data for selected location
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performance Ads */}
      <div className="sp-card">
        <div className="card-title mb-4">Top Performance Ads</div>
        <div className="filter-tabs mb-4">
          <button className="tab active">Google</button>
          <button className="tab">Facebook</button>
        </div>
        <div className="text-center py-12 text-[var(--text-muted)]">
          No ads data available
        </div>
      </div>
    </div>);

}