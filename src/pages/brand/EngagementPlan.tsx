import React, { useState } from 'react';
import { GlobalFilters } from '../../components/brand/GlobalFilters';
import { Download } from 'lucide-react';
export function EngagementPlan() {
  const [engagementDateRange, setEngagementDateRange] = useState({
    start: '2026-05-01',
    end: '2026-05-05'
  });
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Engagement Plan</h1>
        <div className="text-[var(--text-muted)] text-sm">
          Store-level engagement, retainer/budget health, and subscription
          status
        </div>
      </div>

      <GlobalFilters />

      {/* Dealer Engagement Report */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Store Engagement Report</div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={engagementDateRange.start}
              onChange={(e) =>
              setEngagementDateRange({
                ...engagementDateRange,
                start: e.target.value
              })
              }
              className="text-xs h-[32px] px-2" />
            
            <span className="text-[var(--text-muted)] text-xs">—</span>
            <input
              type="date"
              value={engagementDateRange.end}
              onChange={(e) =>
              setEngagementDateRange({
                ...engagementDateRange,
                end: e.target.value
              })
              }
              className="text-xs h-[32px] px-2" />
            
            <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] ml-2">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>User-Email</th>
                <th>Last Login Date</th>
                <th>No Of Days</th>
                <th>Avg Session Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                email: 'store1@samsung.com',
                lastLogin: '2026-05-05',
                days: 15,
                duration: '12m 34s'
              },
              {
                email: 'store2@samsung.com',
                lastLogin: '2026-05-04',
                days: 22,
                duration: '8m 15s'
              },
              {
                email: 'store3@samsung.com',
                lastLogin: '2026-05-03',
                days: 18,
                duration: '15m 42s'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td>{row.email}</td>
                  <td className="font-mono">{row.lastLogin}</td>
                  <td className="font-mono">{row.days}</td>
                  <td className="font-mono">{row.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Wise Lead Count */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Stage Wise Lead Count</div>
          <button className="text-[var(--text-muted)] hover:text-[var(--brand-blue)]">
            <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Store Details</th>
                <th>Created</th>
                <th>Opened</th>
                <th>Saved</th>
                <th>Synced</th>
                <th>Enquiry</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                dealer: 'Samsung SmartPlaza – Sahil Electronics-MND-01',
                created: 45,
                opened: 42,
                saved: 38,
                synced: 35,
                enquiry: 32
              },
              {
                dealer: 'Samsung SmartPlaza – Nexus Digital-MMW-12',
                created: 38,
                opened: 35,
                saved: 30,
                synced: 28,
                enquiry: 25
              },
              {
                dealer: 'Samsung SmartPlaza – Metro Digital-MBN-05',
                created: 32,
                opened: 28,
                saved: 24,
                synced: 22,
                enquiry: 20
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-medium">{row.dealer}</td>
                  <td className="font-mono">{row.created}</td>
                  <td className="font-mono">{row.opened}</td>
                  <td className="font-mono">{row.saved}</td>
                  <td className="font-mono">{row.synced}</td>
                  <td className="font-mono">{row.enquiry}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Lifetime Stats */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">Store Lifetime Stats</div>
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
                <th>City</th>
                <th>Region</th>
                <th>State</th>
                <th>Lifetime Spend</th>
                <th>Lifetime Clicks</th>
                <th>Lifetime Leads</th>
                <th>Lifetime CPL</th>
                <th>Recent Top Up</th>
                <th>Recent Spend</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'MND-01',
                name: 'Samsung SmartPlaza – Sahil Electronics',
                city: 'New Delhi',
                region: 'North',
                state: 'Delhi',
                spend: 125000,
                clicks: 2450,
                leads: 185,
                cpl: 675.68,
                topUp: '2026-04-15',
                recentSpend: '2026-04-30'
              },
              {
                code: 'MMW-12',
                name: 'Samsung SmartPlaza – Nexus Digital',
                city: 'Mumbai',
                region: 'West',
                state: 'Maharashtra',
                spend: 98000,
                clicks: 1850,
                leads: 142,
                cpl: 690.14,
                topUp: '2026-04-10',
                recentSpend: '2026-04-28'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.city}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td className="font-mono">{row.spend.toLocaleString()}</td>
                  <td className="font-mono">{row.clicks}</td>
                  <td className="font-mono">{row.leads}</td>
                  <td className="font-mono">{row.cpl}</td>
                  <td className="font-mono">{row.topUp}</td>
                  <td className="font-mono">{row.recentSpend}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Media Budget - Budget below 0 */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">
            Stores who have exhausted budget (Budget below 0)
          </div>
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
                <th>Active Store</th>
                <th>Recent Top Up</th>
                <th>Recent Spend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-[var(--text-muted)]">
                  
                  No stores with exhausted budget
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Activation Plan Status */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">
            Store Activation Plan Status with SI
          </div>
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
                <th>Subscription Days Remaining</th>
                <th>Subscription Status</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'MND-01',
                name: 'Samsung SmartPlaza – Sahil Electronics',
                region: 'North',
                state: 'Delhi',
                city: 'New Delhi',
                daysRemaining: 45,
                status: 'Active'
              },
              {
                code: 'MMW-12',
                name: 'Samsung SmartPlaza – Nexus Digital',
                region: 'West',
                state: 'Maharashtra',
                city: 'Mumbai',
                daysRemaining: 12,
                status: 'Active'
              },
              {
                code: 'MBN-05',
                name: 'Samsung SmartPlaza – Metro Digital',
                region: 'South',
                state: 'Karnataka',
                city: 'Bangalore',
                daysRemaining: -5,
                status: 'Expired'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="font-mono">{row.daysRemaining}</td>
                  <td>
                    <span
                    className={`pill ${row.status === 'Active' ? 'pill-done' : 'pill-pending'}`}>
                    
                      {row.status}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Nearing Retainer Renewal */}
      <div className="sp-card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title">
            Stores Who are Nearing Their Retainer Renewal
          </div>
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
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                code: 'MMW-12',
                name: 'Samsung SmartPlaza – Nexus Digital',
                region: 'West',
                state: 'Maharashtra',
                city: 'Mumbai',
                endDate: '2026-05-17'
              },
              {
                code: 'MKL-08',
                name: 'Samsung SmartPlaza – Anand Electronics',
                region: 'East',
                state: 'West Bengal',
                city: 'Kolkata',
                endDate: '2026-05-22'
              }].
              map((row, i) =>
              <tr key={i}>
                  <td className="font-mono">{row.code}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="font-mono">{row.endDate}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}