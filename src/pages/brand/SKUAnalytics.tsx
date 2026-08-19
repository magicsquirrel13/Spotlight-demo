import React from 'react';
import { GlobalFilters } from '../../components/brand/GlobalFilters';
import { Download } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
const modelData = [
{
  model: 'Galaxy S24 Ultra 5G',
  leads: 4
},
{
  model: 'Galaxy A55 5G',
  leads: 3
},
{
  model: 'Neo QLED 8K QN900D',
  leads: 2
},
{
  model: 'OTHERS',
  leads: 1
}];

export function SKUAnalytics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">SKU Analytics</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Product/Model-level lead analytics
        </div>
      </div>

      <GlobalFilters />

      {/* Lead by Model Chart */}
      <div className="sp-card">
        <div className="card-title mb-4">Lead by Model</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modelData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" />
            <XAxis
              type="number"
              tick={{
                fontSize: 12
              }} />
            
            <YAxis
              dataKey="model"
              type="category"
              tick={{
                fontSize: 12
              }} />
            
            <Tooltip />
            <Bar dataKey="leads" fill="#0070FC" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Model Level Lead Report */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Model Level Lead Report</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>State</th>
                <th>City</th>
                <th>RO</th>
                <th>Model</th>
                <th>Leads</th>
                <th>Attended Leads</th>
                <th>Unattended Leads</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                region: 'North',
                state: 'Delhi',
                city: 'New Delhi',
                ro: 'North RO',
                model: 'Galaxy S24 Ultra 5G',
                leads: 4,
                attended: 3,
                unattended: 1
              },
              {
                region: 'West',
                state: 'Maharashtra',
                city: 'Mumbai',
                ro: 'West RO',
                model: 'Galaxy A55 5G',
                leads: 3,
                attended: 2,
                unattended: 1
              },
              {
                region: 'South',
                state: 'Karnataka',
                city: 'Bangalore',
                ro: 'South RO',
                model: 'Neo QLED 8K QN900D',
                leads: 2,
                attended: 1,
                unattended: 1
              }].
              map((row, i) =>
              <tr key={i}>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td>{row.ro}</td>
                  <td className="font-medium">{row.model}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.attended}</td>
                  <td className="font-mono">{row.unattended}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads by Model at Dealer Level */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Leads by Model at Store Level</div>
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
                <th>RO</th>
                <th>City</th>
                <th>Model</th>
                <th>Leads</th>
                <th>Attended</th>
                <th>Unattended</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'MND-01',
                name: 'Samsung SmartPlaza – Sahil Electronics',
                region: 'North',
                state: 'Delhi',
                ro: 'North RO',
                city: 'New Delhi',
                model: 'Galaxy S24 Ultra 5G',
                leads: 2,
                attended: 2,
                unattended: 0
              },
              {
                code: 'MMW-12',
                name: 'Samsung SmartPlaza – Nexus Digital',
                region: 'West',
                state: 'Maharashtra',
                ro: 'West RO',
                city: 'Mumbai',
                model: 'Neo QLED 8K QN900D',
                leads: 2,
                attended: 1,
                unattended: 1
              },
              {
                code: 'MBN-05',
                name: 'Samsung SmartPlaza – Metro Digital',
                region: 'South',
                state: 'Karnataka',
                ro: 'South RO',
                city: 'Bangalore',
                model: 'Galaxy A55 5G',
                leads: 1,
                attended: 0,
                unattended: 1
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.ro}</td>
                  <td>{row.city}</td>
                  <td>{row.model}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.attended}</td>
                  <td className="font-mono">{row.unattended}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}