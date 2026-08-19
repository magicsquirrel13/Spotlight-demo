export const PARTNER_LEADS = [
{
  id: 'ld_001',
  name: 'Vansh Agarwal',
  email: 'vansh.agarwal@gmail.com',
  phone: '+91 9819234567',
  stage: 'Store Demo',
  status: 'hot' as const,
  statusLabel: 'Completed',
  syncStatus: 'synced' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Sahil Electronics',
    code: 'DL069',
    city: 'New Delhi',
    state: 'Delhi',
    id: 'dlr_001'
  },
  model: 'Galaxy Z Flip8 5G',
  category: 'Mobiles',
  subcategory: 'Foldables',
  priceRange: '₹99,999 - ₹1,09,999',
  recordingUrl: "/samsung-flip-call.m4a",

  callDuration: '0:00 / 0:52',
  multiVisits: true,
  isAiHandled: true,
  leadCreatedOn: '17 May 2026',
  aiAnalytics: {
    durationSec: 184,
    completionPct: 100,
    duration: '03:04',
    sentiment: 'positive' as const,
    intent: {
      reason: 'Purchase Intent',
      purpose:
      'Inquiring about Galaxy Z Flip8 512GB variant and a live store demo.'
    },
    productInterest: {
      product: 'Samsung Galaxy Z Flip8 5G (SM-F748B)',
      budget: '₹1.05L',
      preferences: ['512GB', 'Mint', 'Galaxy AI', 'FlexWindow']
    },
    qa: [
    { question: "What's your name", answer: 'Vansh Agarwal' },
    { question: 'Which product', answer: 'Galaxy Z Flip8 512GB' }]

  }
},
{
  id: 'ld_002',
  name: 'Meera Nair',
  email: 'meera.nair@yahoo.in',
  phone: '+91 9869123456',
  stage: 'Quotation',
  status: 'warm' as const,
  syncStatus: 'pending' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Nexus Digital',
    code: 'DL142',
    city: 'New Delhi',
    state: 'Delhi',
    id: 'dlr_001'
  },
  model: 'Galaxy Z Fold8 Ultra 5G',
  category: 'Mobiles',
  subcategory: 'Foldables',
  priceRange: '₹1,64,999 - ₹1,84,999',
  recordingUrl: '/samsung-galaxy-call.m4a',
  callDuration: '0:00 / 0:56',
  multiVisits: false,
  isAiHandled: true,
  leadCreatedOn: '17 May 2026',
  aiAnalytics: {
    durationSec: 142,
    completionPct: 85,
    duration: '02:22',
    sentiment: 'neutral' as const,
    intent: {
      reason: 'Price Enquiry',
      purpose: 'Asking about best price and No Cost EMI options.'
    },
    productInterest: {
      product: 'Samsung Galaxy Z Fold8 Ultra 5G (SM-F958B)',
      budget: '₹1.7L',
      preferences: ['1TB', 'Phantom Black', 'No Cost EMI']
    },
    qa: [
    { question: "What's your name", answer: 'Meera Nair' },
    { question: 'Which product', answer: 'Galaxy Z Fold8 Ultra 1TB' }]

  }
},
{
  id: 'ld_003',
  name: 'Saurabh Gokhale',
  email: 'saurabh.gokhale@outlook.com',
  phone: '+91 9822345678',
  stage: 'Store Demo',
  status: 'hot' as const,
  statusLabel: 'Completed',
  syncStatus: 'synced' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Pasco Retail',
    code: 'MH412',
    city: 'Pune',
    state: 'Maharashtra',
    id: 'dlr_002'
  },
  model: 'Neo QLED 8K QN900D',
  category: 'Televisions',
  subcategory: 'Neo QLED',
  priceRange: '₹3,29,990 - ₹4,49,990',
  recordingUrl: '/samsung-tv-call.m4a',
  callDuration: '0:00 / 0:58',
  multiVisits: true,
  isAiHandled: true,
  leadCreatedOn: '16 May 2026',
  aiAnalytics: {
    durationSec: 226,
    completionPct: 95,
    duration: '03:46',
    sentiment: 'positive' as const,
    intent: {
      reason: 'Store Demo',
      purpose: 'Comparing 85" vs 75", wants an in-store demo.'
    },
    productInterest: {
      product: 'Samsung Neo QLED 8K QN900D (QA85QN900D)',
      budget: '₹3.5L',
      preferences: ['85 inch', '8K', 'Wall mount']
    },
    qa: [
    { question: "What's your name", answer: 'Saurabh Gokhale' },
    { question: 'Which product', answer: 'Neo QLED 8K QN900D 85"' }]

  }
},
{
  id: 'ld_004',
  name: 'Ramesh Bhonsle',
  email: 'ramesh.b@gmail.com',
  phone: '+91 9823456789',
  stage: 'Demo Scheduled',
  status: 'cold' as const,
  syncStatus: 'pending' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Pasco Retail',
    code: 'MH412',
    city: 'Pune',
    state: 'Maharashtra',
    id: 'dlr_002'
  },
  model: 'Galaxy A55 5G',
  category: 'Mobiles',
  subcategory: 'Galaxy A Series',
  priceRange: '₹39,999 - ₹45,999',
  multiVisits: false,
  isAiHandled: false,
  leadCreatedOn: '16 May 2026'
},
{
  id: 'ld_006',
  name: 'Hiren Mehta',
  email: 'hiren.mehta@gmail.com',
  phone: '+91 9824567812',
  stage: 'Invoice',
  status: 'hot' as const,
  statusLabel: 'Completed',
  syncStatus: 'synced' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Metro Digital',
    code: 'GJ201',
    city: 'Ahmedabad',
    state: 'Gujarat',
    id: 'dlr_003'
  },
  model: 'Bespoke French Door RF57DG',
  category: 'Refrigerators',
  subcategory: 'Bespoke French Door',
  priceRange: '₹1,09,990 - ₹1,29,990',
  recordingUrl: '/samsung-fridge-call.m4a',
  callDuration: '0:00 / 0:55',
  multiVisits: true,
  isAiHandled: true,
  leadCreatedOn: '15 May 2026',
  aiAnalytics: {
    durationSec: 196,
    completionPct: 100,
    duration: '03:16',
    sentiment: 'positive' as const,
    productInterest: {
      product: 'Samsung Bespoke French Door RF57DG (RF57DG29A3S9)',
      budget: '₹1.2L',
      preferences: ['580L', 'Glam Navy', 'AI Family Hub']
    },
    qa: [{ question: "What's your name", answer: 'Hiren Mehta' }]
  }
},
{
  id: 'ld_008',
  name: 'Bhavesh Chauhan',
  email: 'bhavesh.chauhan@gmail.com',
  phone: '+91 9925678234',
  stage: 'Demo Scheduled',
  status: 'warm' as const,
  syncStatus: 'pending' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Metro Digital',
    code: 'GJ304',
    city: 'Surat',
    state: 'Gujarat',
    id: 'dlr_004'
  },
  model: 'Galaxy S24 Ultra 5G',
  category: 'Mobiles',
  subcategory: 'Galaxy S Series',
  priceRange: '₹1,29,999 - ₹1,44,999',
  recordingUrl: '/samsung-s24-call.m4a',
  callDuration: '0:00 / 0:54',
  multiVisits: false,
  isAiHandled: true,
  leadCreatedOn: '14 May 2026',
  aiAnalytics: {
    durationSec: 132,
    completionPct: 80,
    duration: '02:12',
    sentiment: 'neutral' as const,
    productInterest: {
      product: 'Samsung Galaxy S24 Ultra 5G (SM-S928B)',
      budget: '₹1.3L',
      preferences: ['256GB', 'Titanium Gray', 'S Pen']
    },
    qa: [{ question: "What's your name", answer: 'Bhavesh Chauhan' }]
  }
},
{
  id: 'ld_010',
  name: 'Lakshmi Narayanan',
  email: 'lakshmi.n@gmail.com',
  phone: '+91 9886234567',
  stage: 'Store Demo',
  status: 'hot' as const,
  statusLabel: 'Completed',
  syncStatus: 'synced' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Capital Electronics',
    code: 'KA501',
    city: 'Bangalore',
    state: 'Karnataka',
    id: 'dlr_005'
  },
  model: 'Bespoke AI WindFree AR18DY',
  category: 'Air Conditioners',
  subcategory: 'Split AC',
  priceRange: '₹54,990 - ₹64,990',
  recordingUrl: '/samsung-ac-call.m4a',
  callDuration: '0:00 / 0:53',
  multiVisits: true,
  isAiHandled: true,
  leadCreatedOn: '13 May 2026',
  aiAnalytics: {
    durationSec: 218,
    completionPct: 100,
    duration: '03:38',
    sentiment: 'positive' as const,
    productInterest: {
      product: 'Samsung Bespoke AI WindFree AR18DY (AR18DY5YBTZ)',
      budget: '₹60,000',
      preferences: ['1.5 Ton', 'WindFree', 'AI Auto Cool']
    },
    qa: [{ question: "What's your name", answer: 'Lakshmi Narayanan' }]
  }
},
{
  id: 'ld_013',
  name: 'Venkatesh Naidu',
  email: 'venkatesh.naidu@gmail.com',
  phone: '+91 9701456789',
  stage: 'Store Demo',
  status: 'warm' as const,
  statusLabel: 'Completed',
  syncStatus: 'synced' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Anant Electronics',
    code: 'TS702',
    city: 'Hyderabad',
    state: 'Telangana',
    id: 'dlr_006'
  },
  model: 'Neo QLED 4K QN90D',
  category: 'Televisions',
  subcategory: 'Neo QLED',
  priceRange: '₹1,49,990 - ₹1,99,990',
  recordingUrl: '/samsung-tv-call.m4a',
  callDuration: '0:00 / 0:58',
  multiVisits: false,
  isAiHandled: true,
  leadCreatedOn: '11 May 2026',
  aiAnalytics: {
    durationSec: 172,
    completionPct: 90,
    duration: '02:52',
    sentiment: 'positive' as const,
    productInterest: {
      product: 'Samsung Neo QLED 4K QN90D (QA65QN90D)',
      budget: '₹1.7L',
      preferences: ['65 inch', '4K', 'Gaming Hub']
    },
    qa: [{ question: "What's your name", answer: 'Venkatesh Naidu' }]
  }
},
{
  id: 'ld_016',
  name: 'Harpreet Sandhu',
  email: 'harpreet.sandhu@gmail.com',
  phone: '+91 9811234567',
  stage: 'Store Demo',
  status: 'hot' as const,
  statusLabel: 'Completed',
  syncStatus: 'synced' as const,
  dealer: {
    name: 'Samsung SmartPlaza – Sahil Electronics',
    code: 'DL069',
    city: 'New Delhi',
    state: 'Delhi',
    id: 'dlr_007'
  },
  model: 'Galaxy S24 Ultra 5G',
  category: 'Mobiles',
  subcategory: 'Galaxy S Series',
  priceRange: '₹1,29,999 - ₹1,44,999',
  recordingUrl: '/samsung-s24-call.m4a',
  callDuration: '0:00 / 0:54',
  multiVisits: true,
  isAiHandled: true,
  leadCreatedOn: '10 May 2026',
  aiAnalytics: {
    durationSec: 208,
    completionPct: 100,
    duration: '03:28',
    sentiment: 'positive' as const,
    productInterest: {
      product: 'Samsung Galaxy S24 Ultra 5G (SM-S928B)',
      budget: '₹1.4L',
      preferences: ['512GB', 'Titanium Violet', 'Galaxy AI']
    },
    qa: [{ question: "What's your name", answer: 'Harpreet Sandhu' }]
  }
}];
