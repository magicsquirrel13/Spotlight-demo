import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { SpotlightAdminShell } from './pages/spotlight-admin/SpotlightAdminShell';
import { Dashboard } from './pages/spotlight-admin/Dashboard';
import { BrandsList } from './pages/spotlight-admin/BrandsList';
import { BrandOnboarding } from './pages/spotlight-admin/BrandOnboarding';
import { BrandSnapshot } from './pages/spotlight-admin/BrandSnapshot';
import { CampaignLauncher } from './pages/spotlight-admin/CampaignLauncher';
import { LandingPageBuilder } from './pages/spotlight-admin/LandingPageBuilder';
import { DealerLandingPage } from './pages/landing/DealerLandingPage';
import { PartnerShell } from './pages/partner/PartnerShell';
import { BrandShell } from './pages/brand/BrandShell';
import { GrowthConsole } from './pages/brand/GrowthConsole';
import { ChannelSummary } from './pages/brand/ChannelSummary';
import { Lead } from './pages/brand/Lead';
import { SKUAnalytics } from './pages/brand/SKUAnalytics';
import { EngagementPlan } from './pages/brand/EngagementPlan';
import { DealerMIS } from './pages/brand/DealerMIS';
import { LeadMIS } from './pages/brand/LeadMIS';
import { Download } from './pages/brand/Download';
import { MediaPlans } from './pages/spotlight-admin/MediaPlans';
import { Invite } from './pages/partner/Invite';
import { Onboarding } from './pages/partner/Onboarding';
import { Home } from './pages/partner/Home';
import { Campaigns } from './pages/partner/Campaigns';
import { VoiceAgent } from './pages/partner/VoiceAgent';
import { PartnerWallet } from './pages/partner/PartnerWallet';
import { Reports } from './pages/partner/Reports';
import { Invoices } from './pages/partner/Invoices';
import { Subscription } from './pages/partner/Subscription';
import { Studio } from './pages/partner/Studio';
import { Leads } from './pages/partner/Leads';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Spotlight Admin Routes */}
        <Route path="/spotlight" element={<SpotlightAdminShell />}>
          <Route index element={<Navigate to="/spotlight/brands" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="brands" element={<BrandsList />} />
          <Route path="brands/new" element={<BrandOnboarding />} />
          <Route path="brands/:brandId/edit" element={<BrandOnboarding />} />
          <Route path="brands/:brandId" element={<BrandSnapshot />} />
          <Route path="brands/:brandId/media-plans" element={<MediaPlans />} />
          <Route
            path="brands/:brandId/landing-pages/:templateId"
            element={<LandingPageBuilder />} />
          
          <Route path="campaigns" element={<CampaignLauncher />} />
          <Route
            path="templates"
            element={<div className="sp-card">Templates (Coming next)</div>} />
          
          <Route
            path="packages"
            element={
            <div className="sp-card">Package Catalog (Coming next)</div>
            } />
          
          <Route
            path="addons"
            element={
            <div className="sp-card">Add-on Catalog (Coming next)</div>
            } />
          
          <Route
            path="backgrounds"
            element={<div className="sp-card">Backgrounds (Coming next)</div>} />
          
        </Route>

        {/* Brand Routes */}
        <Route path="/brand" element={<BrandShell />}>
          <Route
            index
            element={<Navigate to="/brand/growth-console" replace />} />
          
          <Route path="growth-console" element={<GrowthConsole />} />
          <Route path="channel-summary" element={<ChannelSummary />} />
          <Route path="lead" element={<Lead />} />
          <Route path="sku-analytics" element={<SKUAnalytics />} />
          <Route path="engagement-plan" element={<EngagementPlan />} />
          <Route path="dealer-mis" element={<DealerMIS />} />
          <Route path="lead-mis" element={<LeadMIS />} />
          <Route path="download" element={<Download />} />
        </Route>

        {/* Partner — Standalone (no shell) */}
        <Route path="/partner/invite" element={<Invite />} />
        <Route path="/partner/onboarding" element={<Onboarding />} />

        {/* Partner — Dashboard (with shell) */}
        <Route path="/partner" element={<PartnerShell />}>
          <Route index element={<Navigate to="/partner/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="wallet" element={<PartnerWallet />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="studio" element={<Studio />} />
          <Route path="leads" element={<Leads />} />
          <Route path="voice-agent" element={<VoiceAgent />} />
        </Route>

        {/* Standalone Dealer Landing Page Preview */}
        <Route path="/landing/:dealerId" element={<DealerLandingPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>);

}