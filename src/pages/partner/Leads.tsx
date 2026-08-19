
import React from 'react';
import { LMSLeadList } from '../../components/shared/LMSLeadList';
import { PARTNER_LEADS } from '../../data/partnerLeads';
import { usePartnerLocation } from './PartnerShell';
export function Leads() {
  const { selectedLocation } = usePartnerLocation();
  const filteredLeads = PARTNER_LEADS.filter(
    (lead) => selectedLocation === 'all' || lead.dealer.id === selectedLocation
  );
  return (
    <div className="min-h-screen">
      <LMSLeadList leads={filteredLeads} title="Leads" />
    </div>);

}