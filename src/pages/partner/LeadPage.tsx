import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LMSLeadList } from '../../components/shared/LMSLeadList';
import { PARTNER_LEADS } from '../../data/partnerLeads';
import { usePartnerLocation } from './PartnerShell';
export function LeadPage() {
  const [searchParams] = useSearchParams();
  const { selectedLocation } = usePartnerLocation();
  const leadType = searchParams.get('type') || 'sales';
  const getPageTitle = () => {
    switch (leadType) {
      case 'service':
        return 'Service Leads';
      case 'no-sales':
        return 'No Sales Leads';
      case 'feedback':
        return 'Feedback';
      case 'sales':
      default:
        return 'Sales Leads';
    }
  };
  const filteredLeads = PARTNER_LEADS.filter(
    (lead) => selectedLocation === 'all' || lead.dealer.id === selectedLocation
  );
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <LMSLeadList leads={filteredLeads} title={getPageTitle()} />
    </div>);

}