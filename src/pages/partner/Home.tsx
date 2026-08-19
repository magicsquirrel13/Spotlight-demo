import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Megaphone,
  Wallet,
  ArrowUpRight,
  Plus } from
'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { LeadInsights } from '../../components/partner/LeadInsights';
import { getActiveBrandProfile } from '../../data/brandProfiles';
const perfData = [
{
  date: 'Nov 1',
  leads: 12,
  spend: 2400
},
{
  date: 'Nov 8',
  leads: 18,
  spend: 3200
},
{
  date: 'Nov 15',
  leads: 24,
  spend: 4100
},
{
  date: 'Nov 22',
  leads: 20,
  spend: 3800
},
{
  date: 'Dec 1',
  leads: 32,
  spend: 5200
},
{
  date: 'Dec 8',
  leads: 28,
  spend: 4800
},
{
  date: 'Dec 15',
  leads: 35,
  spend: 5600
}];

import { usePartnerLocation } from './PartnerShell';
export function Home() {
  const navigate = useNavigate();
  const { selectedLocation } = usePartnerLocation();
  const brand = getActiveBrandProfile();
  const getKpis = () => {
    if (selectedLocation === 'all') {
      return {
        leads: '184',
        campaigns: '9',
        spend: '₹1.42L',
        wallet: '₹32,450'
      };
    }
    if (selectedLocation === 'dlr_001') {
      return {
        leads: '38',
        campaigns: '2',
        spend: '₹28.4K',
        wallet: '₹32,450'
      };
    }
    if (selectedLocation === 'dlr_002') {
      return {
        leads: '31',
        campaigns: '2',
        spend: '₹24.6K',
        wallet: '₹32,450'
      };
    }
    return {
      leads: '18',
      campaigns: '1',
      spend: '₹16.6K',
      wallet: '₹32,450'
    };
  };
  const kpis = getKpis();
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-[var(--brand-indigo)] to-[#1a0a8a] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, Rohan Deshpande 👋
            </h1>
            <p className="text-white/70 text-sm">
              Samsung SmartPlaza – Sahil Electronics · DL069 · Powered by
              Samsung
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/partner/wallet')}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors flex items-center gap-2">
              
              <Plus size={14} /> Top up wallet
            </button>
            <button
              onClick={() => navigate('/partner/leads')}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors flex items-center gap-2">
              
              <Users size={14} /> View leads
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
        {
          label: 'Total Leads',
          value: kpis.leads,
          delta: '+12.4%',
          icon: Users,
          color: 'text-blue-600 bg-blue-100'
        },
        {
          label: 'Active Campaigns',
          value: kpis.campaigns,
          delta: '+2',
          icon: Megaphone,
          color: 'text-green-600 bg-green-100'
        },
        {
          label: 'Ad Spend',
          value: kpis.spend,
          delta: '+8.7%',
          icon: TrendingUp,
          color: 'text-orange-600 bg-orange-100'
        },
        {
          label: 'Wallet Balance',
          value: kpis.wallet,
          delta: '',
          icon: Wallet,
          color: 'text-purple-600 bg-purple-100'
        }].
        map((kpi) =>
        <div key={kpi.label} className="sp-card flex items-center gap-4">
            <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color}`}>
            
              <kpi.icon size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">{kpi.label}</div>
              <div className="text-xl font-bold text-gray-900">{kpi.value}</div>
              {kpi.delta &&
            <div
              className={`text-xs font-medium ${kpi.delta.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
              
                  {kpi.delta} vs last month
                </div>
            }
            </div>
          </div>
        )}
      </div>

      {/* Performance Chart */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Campaign Performance</div>
          <button
            className="text-xs text-blue-600 font-medium flex items-center gap-1"
            onClick={() => navigate('/partner/reports')}>
            
            View Reports <ArrowUpRight size={12} />
          </button>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={perfData}>
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
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#0070FC"
              strokeWidth={2}
              dot={false} />
            
            <Line
              type="monotone"
              dataKey="spend"
              stroke="#00C158"
              strokeWidth={2}
              dot={false} />
            
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Lead insights — Lead Query Overview, Sales Lead Journey, Call Details, Enquiry Overview */}
      <LeadInsights />

      {/* Recent Leads */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Recent Leads</div>
          <button
            className="text-xs text-blue-600 font-medium flex items-center gap-1"
            onClick={() => navigate('/partner/leads')}>
            
            View all <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {[
          {
            name: 'Rahul Sharma',
            model: brand.models[0],
            status: 'Warm',
            time: '1h ago'
          },
          {
            name: 'Neha Gupta',
            model: brand.models[1] ?? brand.models[0],
            status: 'Cold',
            time: '3h ago'
          },
          {
            name: 'Amit Tiwari',
            model: brand.models[2] ?? brand.models[0],
            status: 'Warm',
            time: '5h ago'
          }].
          map((lead) =>
          <div
            key={lead.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                  {lead.name.
                split(' ').
                map((n) => n[0]).
                join('').
                slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {lead.name}
                  </div>
                  <div className="text-xs text-gray-500">{lead.model}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                className={`pill text-xs ${lead.status === 'Warm' ? 'pill-pending' : 'pill-submitted'}`}>
                
                  {lead.status}
                </span>
                <span className="text-xs text-gray-400">{lead.time}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}