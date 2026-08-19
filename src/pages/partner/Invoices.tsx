import React from 'react';
import { Download } from 'lucide-react';
export function Invoices() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">Invoices</h1>

      <div className="sp-card">
        <div className="card-title mb-4">Billing History</div>
        <table className="sp-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Period</th>
              <th>Subscription</th>
              <th>Ad Spend</th>
              <th>Voice Agent</th>
              <th>GST</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
            {
              id: 'INV-2026-05',
              period: 'May 2026',
              sub: 4249,
              ad: 142800,
              voice: 2999,
              gst: 27009,
              total: 177057,
              status: 'Due'
            },
            {
              id: 'INV-2026-04',
              period: 'Apr 2026',
              sub: 4249,
              ad: 136500,
              voice: 2999,
              gst: 25876,
              total: 169624,
              status: 'Paid'
            },
            {
              id: 'INV-2026-03',
              period: 'Mar 2026',
              sub: 4249,
              ad: 129600,
              voice: 2999,
              gst: 24634,
              total: 161482,
              status: 'Paid'
            },
            {
              id: 'INV-2026-02',
              period: 'Feb 2026',
              sub: 4249,
              ad: 121800,
              voice: 2999,
              gst: 23230,
              total: 152278,
              status: 'Paid'
            },
            {
              id: 'INV-2026-01',
              period: 'Jan 2026',
              sub: 4249,
              ad: 124200,
              voice: 2999,
              gst: 23662,
              total: 155110,
              status: 'Paid'
            }].
            map((inv) =>
            <tr key={inv.id}>
                <td className="font-mono text-sm">{inv.id}</td>
                <td>{inv.period}</td>
                <td className="font-mono">₹{inv.sub.toLocaleString()}</td>
                <td className="font-mono">₹{inv.ad.toLocaleString()}</td>
                <td className="font-mono">₹{inv.voice.toLocaleString()}</td>
                <td className="font-mono">₹{inv.gst.toLocaleString()}</td>
                <td className="font-mono font-semibold">
                  ₹{inv.total.toLocaleString()}
                </td>
                <td>
                  <span
                  className={`pill text-xs ${inv.status === 'Paid' ? 'pill-done' : 'pill-pending'}`}>
                  
                    {inv.status}
                  </span>
                </td>
                <td>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Download size={14} className="text-gray-400" />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}