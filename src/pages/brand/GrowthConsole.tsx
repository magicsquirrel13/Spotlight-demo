import React, { useState } from 'react';
import { GlobalFilters } from '../../components/brand/GlobalFilters';
import { KPICard } from '../../components/brand/KPICard';
import { Download, Info } from 'lucide-react';
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
const performanceTrendData = [
{
  date: 'Nov 1',
  leads: 2,
  cpl: 95
},
{
  date: 'Nov 15',
  leads: 1,
  cpl: 88
},
{
  date: 'Dec 1',
  leads: 3,
  cpl: 82
},
{
  date: 'Dec 15',
  leads: 2,
  cpl: 79
},
{
  date: 'Jan 1',
  leads: 1,
  cpl: 85
},
{
  date: 'Jan 15',
  leads: 2,
  cpl: 81
},
{
  date: 'Feb 1',
  leads: 3,
  cpl: 76
},
{
  date: 'Feb 15',
  leads: 2,
  cpl: 83
},
{
  date: 'Mar 1',
  leads: 4,
  cpl: 78
},
{
  date: 'Mar 15',
  leads: 2,
  cpl: 82
},
{
  date: 'Apr 1',
  leads: 3,
  cpl: 80
},
{
  date: 'Apr 15',
  leads: 2,
  cpl: 84
}];

const leadQueryData = [
{
  date: 'Nov',
  callLeads: 1,
  formLeads: 4
},
{
  date: 'Dec',
  callLeads: 0,
  formLeads: 2
},
{
  date: 'Jan',
  callLeads: 1,
  formLeads: 1
},
{
  date: 'Feb',
  callLeads: 0,
  formLeads: 2
},
{
  date: 'Mar',
  callLeads: 0,
  formLeads: 0
},
{
  date: 'Apr',
  callLeads: 0,
  formLeads: 1
}];

export function GrowthConsole() {
  const [funnelTab, setFunnelTab] = useState<'call' | 'form'>('call');
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Growth Console</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Top-level performance dashboard for brand network insights
        </div>
      </div>

      <GlobalFilters />

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <KPICard defaultMetric="Clicks" value="54" tooltip="AD/Media Clicks" />
        <KPICard
          defaultMetric="Impressions"
          value="9.31K"
          tooltip="AD/Media Impressions" />
        
        <KPICard
          defaultMetric="Spend"
          value="826.83"
          tooltip="AD/Media Spend" />
        
        <KPICard
          defaultMetric="Leads"
          value="10"
          tooltip="Total Number of Lead Generated" />
        
        <KPICard
          defaultMetric="Google Impressions"
          value="1.12K"
          tooltip="Total Impressions on Google Ads" />
        
      </div>

      {/* Gauge Cards */}
      <div className="sp-card">
        <div className="card-title mb-5">Gauge Card</div>
        <div className="grid grid-cols-3 gap-6">
          {[
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
                    {(gauge.value / gauge.total * 100).toFixed(2)}%
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

      {/* Lead Query Overview */}
      <div className="sp-card">
        <div className="card-title mb-4">Lead Query Overview</div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={leadQueryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" />
            <XAxis
              dataKey="date"
              tick={{
                fontSize: 12
              }} />
            
            <YAxis
              tick={{
                fontSize: 12
              }} />
            
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="callLeads"
              stackId="1"
              stroke="#0070FC"
              fill="#0070FC" />
            
            <Area
              type="monotone"
              dataKey="formLeads"
              stackId="1"
              stroke="#00C158"
              fill="#00C158" />
            
          </AreaChart>
        </ResponsiveContainer>
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

      {/* Call Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="sp-card">
          <div className="card-title mb-4">Customer Calls</div>
          <div className="flex flex-col gap-2">
            {[
            {
              status: 'Answered',
              count: 0,
              pct: 0
            },
            {
              status: 'Missed',
              count: 2,
              pct: 100
            },
            {
              status: 'IVR Drop',
              count: 0,
              pct: 0
            },
            {
              status: 'Offline',
              count: 0,
              pct: 0
            }].
            map((item) =>
            <div
              key={item.status}
              className="flex justify-between items-center p-2 bg-[var(--bg-page)] rounded">
              
                <span className="text-sm">{item.status}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">{item.count}</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    ({item.pct}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sp-card">
          <div className="card-title mb-4">Ad Form Linked Calls</div>
          <div className="flex flex-col gap-2">
            {[
            {
              status: 'Answered',
              count: 0,
              pct: 0
            },
            {
              status: 'Agent Missed',
              count: 0,
              pct: 0
            },
            {
              status: 'Customer Missed',
              count: 0,
              pct: 0
            },
            {
              status: 'Offline',
              count: 0,
              pct: 0
            }].
            map((item) =>
            <div
              key={item.status}
              className="flex justify-between items-center p-2 bg-[var(--bg-page)] rounded">
              
                <span className="text-sm">{item.status}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">{item.count}</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    ({item.pct}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Outlet Snapshot */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Outlet Snapshot</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Total</th>
                <th>Onboarded</th>
                <th>Retainer Active</th>
                <th>Wallet Sufficient</th>
                <th>No Active Campaign</th>
                <th>No Spend (7d)</th>
                <th>No Leads (7d)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono">142</td>
                <td className="font-mono">128</td>
                <td className="font-mono">115</td>
                <td className="font-mono">98</td>
                <td className="font-mono">12</td>
                <td className="font-mono">8</td>
                <td className="font-mono">15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Movers and Shakers */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Movers and Shakers</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>CPL</th>
                <th>Spend</th>
                <th>Impressions</th>
                <th>Leads</th>
                <th>Clicks</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                region: 'North',
                cpl: 85.2,
                spend: 426.83,
                impressions: '4.5K',
                leads: 5,
                clicks: 28,
                ctr: '0.62%'
              },
              {
                region: 'West',
                cpl: 78.4,
                spend: 235.2,
                impressions: '2.8K',
                leads: 3,
                clicks: 15,
                ctr: '0.54%'
              },
              {
                region: 'South',
                cpl: 92.1,
                spend: 184.2,
                impressions: '2.0K',
                leads: 2,
                clicks: 11,
                ctr: '0.55%'
              }].
              map((row) =>
              <tr key={row.region}>
                  <td className="font-medium">{row.region}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.spend}</td>
                  <td className="font-mono">{row.impressions}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.ctr}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}