import React from 'react';
import {
  LineChart,
  Line,
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
const trendData = [
{
  month: 'Nov',
  leads: 142,
  spend: 118400,
  cpl: 286
},
{
  month: 'Dec',
  leads: 156,
  spend: 124200,
  cpl: 271
},
{
  month: 'Jan',
  leads: 138,
  spend: 121800,
  cpl: 295
},
{
  month: 'Feb',
  leads: 161,
  spend: 129600,
  cpl: 268
},
{
  month: 'Mar',
  leads: 173,
  spend: 136500,
  cpl: 277
},
{
  month: 'Apr',
  leads: 184,
  spend: 142800,
  cpl: 276
}];

const channelData = [
{
  name: 'Google',
  value: 46
},
{
  name: 'Meta',
  value: 39
},
{
  name: 'Direct',
  value: 15
}];

import { usePartnerLocation } from './PartnerShell';
export function Reports() {
  const { selectedLocation } = usePartnerLocation();
  const getKpis = () => {
    if (selectedLocation === 'all') {
      return {
        leads: '184',
        spend: '₹1.42L',
        cpl: '₹276',
        conv: '18.6%'
      };
    }
    if (selectedLocation === 'dlr_001') {
      return {
        leads: '38',
        spend: '₹28.4K',
        cpl: '₹239',
        conv: '21.2%'
      };
    }
    return {
      leads: '18',
      spend: '₹16.6K',
      cpl: '₹319',
      conv: '15.4%'
    };
  };
  const kpis = getKpis();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">Reports</h1>

      {/* Monthly Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
        {
          label: 'Total Leads',
          value: kpis.leads
        },
        {
          label: 'Total Spend',
          value: kpis.spend
        },
        {
          label: 'Avg CPL',
          value: kpis.cpl
        },
        {
          label: 'Conversion Rate',
          value: kpis.conv
        }].
        map((m) =>
        <div key={m.label} className="sp-card">
            <div className="text-xs text-gray-500 mb-1">{m.label}</div>
            <div className="text-2xl font-bold">{m.value}</div>
          </div>
        )}
      </div>

      {/* Performance Over Time */}
      <div className="sp-card">
        <div className="card-title mb-4">Performance Over Time</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" />
            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12
              }} />
            
            <YAxis
              tick={{
                fontSize: 12
              }} />
            
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#0070FC"
              strokeWidth={2} />
            
            <Line
              type="monotone"
              dataKey="cpl"
              stroke="#00C158"
              strokeWidth={2} />
            
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Channel Breakdown */}
        <div className="sp-card">
          <div className="card-title mb-4">Channel Breakdown</div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value">
                  
                  <Cell fill="#0070FC" />
                  <Cell fill="#1877F2" />
                  <Cell fill="#00C158" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {channelData.map((c, i) =>
              <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                    className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-[#0070FC]' : i === 1 ? 'bg-[#1877F2]' : 'bg-[#00C158]'}`} />
                  
                    <span className="text-sm">{c.name}</span>
                  </div>
                  <span className="font-mono font-medium">{c.value}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="sp-card">
          <div className="card-title mb-4">Monthly Performance</div>
          <table className="sp-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Leads</th>
                <th>Spend</th>
                <th>CPL</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((r) =>
              <tr key={r.month}>
                  <td className="font-medium">{r.month}</td>
                  <td className="font-mono">{r.leads}</td>
                  <td className="font-mono">₹{r.spend.toLocaleString()}</td>
                  <td className="font-mono">₹{r.cpl}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}