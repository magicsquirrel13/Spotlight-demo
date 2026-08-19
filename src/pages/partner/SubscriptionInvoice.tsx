import React from 'react';
import { Download } from 'lucide-react';
export function SubscriptionInvoice() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Subscription Invoice</h1>
        <div className="text-[var(--text-muted)] text-sm">
          View and download subscription invoices
        </div>
      </div>

      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Invoice List</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                id: 'INV-2026-001',
                date: '2026-05-01',
                period: 'Apr 2026',
                amount: '₹4,249',
                status: 'paid'
              },
              {
                id: 'INV-2026-002',
                date: '2026-04-01',
                period: 'Mar 2026',
                amount: '₹4,249',
                status: 'paid'
              },
              {
                id: 'INV-2026-003',
                date: '2026-03-01',
                period: 'Feb 2026',
                amount: '₹4,249',
                status: 'paid'
              }].
              map((invoice) =>
              <tr key={invoice.id}>
                  <td className="font-mono">{invoice.id}</td>
                  <td className="font-mono">{invoice.date}</td>
                  <td>{invoice.period}</td>
                  <td className="font-mono">{invoice.amount}</td>
                  <td>
                    <span className="pill pill-done">
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button className="btn-outline-xs flex items-center gap-1">
                      <Download size={12} /> Download
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}