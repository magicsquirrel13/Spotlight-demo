import React from 'react';
import { LMSLeadList } from '../../components/shared/LMSLeadList';
const MOCK_LEADS = [
{
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@gmail.com',
  phone: '+91 7019722046',
  stage: 'Store Demo',
  status: 'hot' as const,
  statusLabel: 'Completed',
  syncStatus: 'pending' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Sahil Electronics',
    code: 'DL069',
    city: 'New Delhi',
    state: 'Delhi'
  },
  model: 'Galaxy Z Fold8 Ultra 5G',
  category: 'Mobiles',
  subcategory: 'Foldables',
  priceRange: '₹1,64,999 - ₹1,84,999',
  recordingUrl: '/samsung-galaxy-call.m4a',
  callDuration: '0:00 / 0:56',
  callDurationSec: 56,
  multiVisits: true,
  isAiHandled: true,
  aiAnalytics: {
    durationSec: 56,
    completionPct: 90,
    duration: '0:56',
    sentiment: 'positive' as const,
    callBackReason: 'Wants to confirm Galaxy AI features and exchange value before store visit',
    intent: {
      reason: 'Upgrade from Galaxy Z Fold5',
      purpose: 'Purchase within 7 days'
    },
    productInterest: {
      product: 'Samsung Galaxy Z Fold8 Ultra 5G (SM-F958B)',
      budget: '₹1.6L – ₹1.9L',
      preferences: ['512GB storage', 'Phantom Black', 'Galaxy AI', 'Exchange old Fold5']
    },
    qa: [
    {
      question: "What's your name",
      answer: 'Rahul Sharma'
    },
    {
      question: 'Which product are you looking for',
      answer: 'Samsung Galaxy Z Fold8 Ultra 5G'
    },
    {
      question: 'Which storage variant do you prefer',
      answer: '512GB, Phantom Black'
    },
    {
      question: 'Are you exchanging an old device',
      answer: 'Yes, Galaxy Z Fold5'
    },
    {
      question: 'What is your email id',
      answer: 'rahul.sharma@gmail.com'
    }]

  }
},
{
  id: '2',
  name: 'Sunil Yadav',
  email: 'sunil.yadav@gmail.com',
  phone: '+91 9773696968',
  stage: 'Invoice',
  status: 'warm' as const,
  syncStatus: 'pending' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Sahil Electronics',
    code: 'DL069',
    city: 'New Delhi',
    state: 'Delhi'
  },
  model: 'Neo QLED 8K QN900D',
  category: 'Televisions',
  subcategory: 'Neo QLED',
  priceRange: '₹3,29,990 - ₹4,49,990',
  recordingUrl: '/samsung-tv-call.m4a',
  callDuration: '0:00 / 0:58',
  isAiHandled: true,
  aiAnalytics: {
    durationSec: 32,
    completionPct: 85,
    sentiment: 'positive' as const,
    productInterest: {
      product: 'Samsung Neo QLED 8K QN900D (QA85QN900D)',
      budget: '₹3.3L – ₹4.5L',
      preferences: ['85 inch', '8K', 'Wall mount']
    },
    qa: [
    {
      question: "What's your name",
      answer: 'Sunil Yadav'
    },
    {
      question: 'Which product are you looking for',
      answer: 'Neo QLED 8K QN900D (85")'
    }]

  }
},
{
  id: '3',
  name: 'Vijay Sagarkar',
  email: 'vijay.sagarkar@gmail.com',
  phone: '+91 9773696968',
  stage: 'Demo Scheduled',
  status: 'cold' as const,
  statusLabel: 'Completed',
  syncStatus: 'pending' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Sahil Electronics',
    code: 'DL069',
    city: 'New Delhi',
    state: 'Delhi'
  },
  model: 'Bespoke French Door RF57DG',
  category: 'Refrigerators',
  subcategory: 'Bespoke French Door',
  priceRange: '₹1,09,990 - ₹1,29,990',
  recordingUrl: '/samsung-fridge-call.m4a',
  callDuration: '0:00 / 0:55',
  isAiHandled: true,
  aiAnalytics: {
    durationSec: 45,
    completionPct: 90,
    sentiment: 'neutral' as const,
    productInterest: {
      product: 'Samsung Bespoke French Door RF57DG (RF57DG29A3S9)',
      budget: '₹1.1L – ₹1.3L',
      preferences: ['580L', 'Glam Navy', 'AI Family Hub']
    },
    qa: [
    {
      question: "What's your name",
      answer: 'Vijay Sagarkar'
    },
    {
      question: 'Which product are you looking for',
      answer: 'Bespoke French Door RF57DG'
    },
    {
      question: 'Budget range',
      answer: '₹1.1 – 1.3 lakhs'
    }]

  }
}];

export function Lead() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <LMSLeadList leads={MOCK_LEADS} title="Leads" />
    </div>);

}