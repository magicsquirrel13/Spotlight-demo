import React, { useState } from 'react';
import {
  Mic,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle } from
'lucide-react';
import { usePartnerLocation } from './PartnerShell';
const CALLS = [
{
  id: '1',
  dealerId: 'dlr_001',
  caller: 'Aditya Joshi',
  time: '10:24 AM',
  duration: '3:04',
  direction: 'inbound',
  outcome: 'qualified',
  summary:
  'Interested in Galaxy S24 Ultra 5G (512GB), wants a store demo this weekend at Sarojini Nagar. Budget confirmed at ₹1.4L.',
  probability: 88
},
{
  id: '2',
  dealerId: 'dlr_002',
  caller: 'Saurabh Gokhale',
  time: '09:42 AM',
  duration: '3:46',
  direction: 'inbound',
  outcome: 'qualified',
  summary:
  'Wants Neo QLED 8K QN900D 85", comparing with an LG model. Store demo booked for Saturday at Pune store.',
  probability: 92
},
{
  id: '3',
  dealerId: 'dlr_005',
  caller: 'Lakshmi Narayanan',
  time: '11:54 AM',
  duration: '3:38',
  direction: 'inbound',
  outcome: 'qualified',
  summary:
  'Strong interest in Bespoke AI WindFree AC. Asking about home installation. Multi-visit lead.',
  probability: 85
},
{
  id: '4',
  dealerId: 'dlr_003',
  caller: 'Devang Trivedi',
  time: '10:08 AM',
  duration: '1:04',
  direction: 'inbound',
  outcome: 'not_qualified',
  summary:
  'Casual enquiry about Galaxy A55 5G pricing. No timeline shared. Will call back later.',
  probability: 22
},
{
  id: '5',
  dealerId: 'dlr_007',
  caller: 'Manjeet Yadav',
  time: '02:50 PM',
  duration: '0:00',
  direction: 'outbound',
  outcome: 'missed',
  summary:
  'Outbound follow-up call — customer did not pick up. Reattempt scheduled.',
  probability: 35
}];

export function VoiceAgent() {
  const { selectedLocation } = usePartnerLocation();
  const [filter, setFilter] = useState('all');
  const [agentActive, setAgentActive] = useState(true);
  const filtered = CALLS.filter((c) => {
    if (selectedLocation !== 'all' && c.dealerId !== selectedLocation)
    return false;
    if (filter === 'all') return true;
    if (filter === 'qualified') return c.outcome === 'qualified';
    if (filter === 'missed') return c.outcome === 'missed';
    if (filter === 'ai') return c.outcome !== 'missed';
    return true;
  });
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Voice Agent</h1>
        <p className="text-sm text-gray-500">
          AI-powered call handling and qualification
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
        {
          label: 'Calls Today',
          value: '47',
          delta: '+6',
          color: 'text-blue-600 bg-blue-100'
        },
        {
          label: 'AI-Qualified',
          value: '31',
          delta: '+4',
          color: 'text-green-600 bg-green-100'
        },
        {
          label: 'Avg Duration',
          value: '2:48',
          delta: '',
          color: 'text-orange-600 bg-orange-100'
        },
        {
          label: 'Conversion',
          value: '22.4%',
          delta: '+3.1%',
          color: 'text-purple-600 bg-purple-100'
        }].
        map((kpi) =>
        <div key={kpi.label} className="sp-card">
            <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {kpi.value}
              </span>
              {kpi.delta &&
            <span className="text-xs font-medium text-green-600 mb-1">
                  {kpi.delta}
                </span>
            }
            </div>
          </div>
        )}
      </div>

      {/* Agent Card */}
      <div className="sp-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${agentActive ? 'bg-green-100' : 'bg-gray-100'}`}>
            
            <Mic
              size={24}
              className={agentActive ? 'text-green-600' : 'text-gray-400'} />
            
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              Spotlight Voice Agent
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${agentActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}>
              </span>
              <span className="text-sm text-gray-500">
                {agentActive ? 'Active — handling calls' : 'Paused'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAgentActive(!agentActive)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${agentActive ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
            
            {agentActive ?
            <>
                <Pause size={14} /> Pause
              </> :

            <>
                <Play size={14} /> Resume
              </>
            }
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
            <Settings size={14} /> Configure
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
        {
          id: 'all',
          label: 'All'
        },
        {
          id: 'ai',
          label: 'AI-handled'
        },
        {
          id: 'missed',
          label: 'Missed'
        },
        {
          id: 'qualified',
          label: 'Qualified'
        }].
        map((f) =>
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f.id ? 'bg-[var(--brand-indigo)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          
            {f.label}
          </button>
        )}
      </div>

      {/* Call Cards */}
      <div className="space-y-3">
        {filtered.map((call) =>
        <div key={call.id} className="sp-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${call.outcome === 'qualified' ? 'bg-green-100' : call.outcome === 'missed' ? 'bg-red-100' : 'bg-gray-100'}`}>
                
                  {call.direction === 'inbound' ?
                <PhoneIncoming
                  size={18}
                  className={
                  call.outcome === 'missed' ?
                  'text-red-500' :
                  'text-green-600'
                  } /> :


                <PhoneOutgoing size={18} className="text-blue-600" />
                }
                </div>
                <div>
                  <div className="font-medium text-gray-900">{call.caller}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span>{call.time}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {call.duration}
                    </span>
                    <span className="capitalize">{call.direction}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${call.outcome === 'qualified' ? 'bg-green-100 text-green-700' : call.outcome === 'missed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                
                  {call.outcome === 'qualified' ?
                'Qualified' :
                call.outcome === 'missed' ?
                'Missed' :
                'Not Qualified'}
                </span>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">{call.summary}</div>
            {call.probability > 0 &&
          <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">
                    Qualification probability
                  </span>
                  <span className="font-medium">{call.probability}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                className={`h-full rounded-full ${call.probability > 70 ? 'bg-green-500' : call.probability > 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                style={{
                  width: `${call.probability}%`
                }} />
              
                </div>
              </div>
          }
          </div>
        )}
      </div>
    </div>);

}