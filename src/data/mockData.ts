// ============================================================
// Centralized mock data for the Spotlight platform
// ============================================================

export interface Dealer {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  contact: {name: string;phone: string;};
  status: 'live' | 'invited' | 'pending';
  stats: {campaigns: number;leads: number;};
}

export interface LandingPageTemplate {
  id: string;
  name: string;
  scope: 'clientwise' | 'brandwise';
  storesUsing: number;
  status: 'active' | 'draft';
}

export interface Partner {
  id: string;
  brandId: string;
  identity: {
    legalName: string;
    shortName: string;
    vertical: string;
    website: string;
  };
  socialWeb: {metaBrandPageId: string;websiteUrl: string;};
  compliance: {
    gstNumber: string;
    pan: string;
    contractStartDate: string | null;
    dealerAgreementUrl: string;
    contractDocUrl: string;
  };
  commercials: {
    whoPays: string;
    networkType: string;
    mediaFunding: string;
    mediaMoneyType: string;
    walletMode: string;
    mediaBillingCadence: string;
    velocityType: string;
    aiAddonsAllowed: boolean;
    dailyMaxBudget: number;
  };
  media: {intendedPlatforms: string[];};
  operations: {
    goLiveDate: string | null;
    expectedLocations: number;
    locationTypeLabel: string;
    statesOfOperation: string[];
  };
  poc: {name: string;email: string;phone: string;};
  package: {
    name: string;
    prices: {quarterly: number;halfYearly: number;yearly: number;};
    inclusions: string[];
    cadenceDiscounts: {quarterly: number;halfYearly: number;yearly: number;};
  };
  addons: {
    aiVoiceAgent: {enabled: boolean;costPerToken: number;packs: number[];};
  };
  status: 'live' | 'onboarding' | 'pending';
  stats: {
    activeLocations: number;
    liveCampaigns: number;
    leadsThisMonth: number;
    estMrr: number;
  };
  dealers: Dealer[];
  landingPageTemplates: LandingPageTemplate[];
}

export interface Brand {
  id: string;
  name: string;
  vertical: string;
  website: string;
  partners: Partner[];
}

export const BRANDS: Brand[] = [
{
  id: 'br_maruti',
  name: 'Samsung India',
  vertical: 'Consumer Electronics',
  website: 'https://samsung.com/in',
  partners: [
  {
    id: 'p_nexus',
    brandId: 'br_maruti',
    identity: {
      legalName: 'Nexus Digital Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Nexus Digital',
      vertical: 'Consumer Electronics',
      website: 'https://nexusdigital.in'
    },
    socialWeb: {
      metaBrandPageId: '104825619273841',
      websiteUrl: 'https://nexusdigital.in'
    },
    compliance: {
      gstNumber: '27AABCN1234R1Z5',
      pan: 'AABCN1234R',
      contractStartDate: '2023-11-10',
      dealerAgreementUrl: '/docs/nexus-digital-agreement.pdf',
      contractDocUrl: '/docs/nexus-digital-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 25000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2024-01-15',
      expectedLocations: 12,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Maharashtra', 'Gujarat']
    },
    poc: {
      name: 'Rohan Mehta',
      email: 'rohan.mehta@nexusdigital.in',
      phone: '+91 9810023411'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: {
        enabled: true,
        costPerToken: 2,
        packs: [100, 500, 2000]
      }
    },
    status: 'live',
    stats: {
      activeLocations: 5,
      liveCampaigns: 18,
      leadsThisMonth: 426,
      estMrr: 480000
    },
    dealers: [
    {
      id: 'd_nexus_andheri',
      name: 'Samsung SmartPlaza Nexus Andheri',
      code: 'MH101',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Rajesh Shah', phone: '+91 9823456789' },
      status: 'live',
      stats: { campaigns: 4, leads: 92 }
    },
    {
      id: 'd_nexus_bandra',
      name: 'Samsung SmartPlaza Nexus Bandra',
      code: 'MH102',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Sneha Patil', phone: '+91 9812345678' },
      status: 'live',
      stats: { campaigns: 3, leads: 71 }
    },
    {
      id: 'd_nexus_pune',
      name: 'Samsung SmartPlaza Nexus Pune Camp',
      code: 'MH201',
      city: 'Pune',
      state: 'Maharashtra',
      contact: { name: 'Amit Joshi', phone: '+91 9890011223' },
      status: 'live',
      stats: { campaigns: 4, leads: 86 }
    },
    {
      id: 'd_nexus_ahd',
      name: 'Samsung SmartPlaza Nexus Satellite',
      code: 'GJ101',
      city: 'Ahmedabad',
      state: 'Gujarat',
      contact: { name: 'Hiren Patel', phone: '+91 9879012345' },
      status: 'live',
      stats: { campaigns: 4, leads: 102 }
    },
    {
      id: 'd_nexus_surat',
      name: 'Samsung SmartPlaza Nexus Surat',
      code: 'GJ102',
      city: 'Surat',
      state: 'Gujarat',
      contact: { name: 'Kalpesh Mehta', phone: '+91 9879876543' },
      status: 'live',
      stats: { campaigns: 3, leads: 75 }
    },
    {
      id: 'd_nexus_thane',
      name: 'Samsung SmartPlaza Nexus Thane',
      code: 'MH103',
      city: 'Thane',
      state: 'Maharashtra',
      contact: { name: 'Suresh Kale', phone: '+91 9821123456' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_nexus_master',
      name: 'Nexus Master LP',
      scope: 'clientwise',
      storesUsing: 5,
      status: 'active'
    },
    {
      id: 't_nexus_festive',
      name: 'Festive Offer Variant',
      scope: 'brandwise',
      storesUsing: 3,
      status: 'active'
    }]

  },
  {
    id: 'p_pasco',
    brandId: 'br_maruti',
    identity: {
      legalName: 'Pasco Retail Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Pasco Retail',
      vertical: 'Consumer Electronics',
      website: 'https://pascoretail.com'
    },
    socialWeb: {
      metaBrandPageId: '104825619273842',
      websiteUrl: 'https://pascoretail.com'
    },
    compliance: {
      gstNumber: '07AAFCP9876L1Z3',
      pan: 'AAFCP9876L',
      contractStartDate: '2023-09-15',
      dealerAgreementUrl: '/docs/pasco-agreement.pdf',
      contractDocUrl: '/docs/pasco-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'hybrid',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 30000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2023-12-01',
      expectedLocations: 10,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Delhi', 'Haryana', 'Uttar Pradesh']
    },
    poc: {
      name: 'Vikram Singh',
      email: 'vikram.s@pascoretail.com',
      phone: '+91 9810076543'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 2, packs: [500, 2000] }
    },
    status: 'live',
    stats: {
      activeLocations: 4,
      liveCampaigns: 14,
      leadsThisMonth: 312,
      estMrr: 410000
    },
    dealers: [
    {
      id: 'd_pasco_cp',
      name: 'Samsung SmartPlaza Pasco Connaught Place',
      code: 'DL101',
      city: 'New Delhi',
      state: 'Delhi',
      contact: { name: 'Amit Verma', phone: '+91 9711234567' },
      status: 'live',
      stats: { campaigns: 5, leads: 118 }
    },
    {
      id: 'd_pasco_gurgaon',
      name: 'Samsung SmartPlaza Pasco Gurgaon',
      code: 'HR101',
      city: 'Gurgaon',
      state: 'Haryana',
      contact: { name: 'Prem Kumar', phone: '+91 9876547046' },
      status: 'live',
      stats: { campaigns: 4, leads: 88 }
    },
    {
      id: 'd_pasco_noida',
      name: 'Samsung SmartPlaza Pasco Noida 18',
      code: 'UP101',
      city: 'Noida',
      state: 'Uttar Pradesh',
      contact: { name: 'Ravi Gupta', phone: '+91 9650123456' },
      status: 'live',
      stats: { campaigns: 3, leads: 64 }
    },
    {
      id: 'd_pasco_lucknow',
      name: 'Samsung SmartPlaza Pasco Hazratganj',
      code: 'UP102',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      contact: { name: 'Anuj Mishra', phone: '+91 9415023456' },
      status: 'live',
      stats: { campaigns: 2, leads: 42 }
    },
    {
      id: 'd_pasco_faridabad',
      name: 'Samsung SmartPlaza Pasco Faridabad',
      code: 'HR102',
      city: 'Faridabad',
      state: 'Haryana',
      contact: { name: 'Mukesh Yadav', phone: '+91 9818234567' },
      status: 'pending',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_pasco_master',
      name: 'Pasco Master LP',
      scope: 'clientwise',
      storesUsing: 4,
      status: 'active'
    }]

  },
  {
    id: 'p_competent',
    brandId: 'br_maruti',
    identity: {
      legalName: 'Competent Digital Co. Ltd',
      shortName: 'Samsung SmartPlaza – Competent Digital',
      vertical: 'Consumer Electronics',
      website: 'https://competentdigital.com'
    },
    socialWeb: {
      metaBrandPageId: '104825619273843',
      websiteUrl: 'https://competentdigital.com'
    },
    compliance: {
      gstNumber: '07AAACC1112M1Z7',
      pan: 'AAACC1112M',
      contractStartDate: '2024-04-01',
      dealerAgreementUrl: '',
      contractDocUrl: ''
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'quarterly',
      velocityType: 'retail_boost',
      aiAddonsAllowed: false,
      dailyMaxBudget: 12000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: null,
      expectedLocations: 6,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Delhi', 'Punjab']
    },
    poc: {
      name: 'Harleen Kaur',
      email: 'harleen@competentdigital.com',
      phone: '+91 9818555012'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: false, costPerToken: 0, packs: [] }
    },
    status: 'onboarding',
    stats: {
      activeLocations: 0,
      liveCampaigns: 0,
      leadsThisMonth: 0,
      estMrr: 0
    },
    dealers: [],
    landingPageTemplates: []
  }]

},
{
  id: 'br_hyundai',
  name: 'LG Electronics India',
  vertical: 'Consumer Electronics',
  website: 'https://lg.com/in',
  partners: [
  {
    id: 'p_koncept',
    brandId: 'br_hyundai',
    identity: {
      legalName: 'Sahil Electronics Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Sahil Electronics',
      vertical: 'Consumer Electronics',
      website: 'https://sahilelectronics.com'
    },
    socialWeb: {
      metaBrandPageId: '112376409812345',
      websiteUrl: 'https://sahilelectronics.com'
    },
    compliance: {
      gstNumber: '06AAGCK5678L1Z2',
      pan: 'AAGCK5678L',
      contractStartDate: '2024-02-01',
      dealerAgreementUrl: '/docs/sahil-electronics-agreement.pdf',
      contractDocUrl: '/docs/sahil-electronics-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 28000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2024-02-01',
      expectedLocations: 8,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Delhi', 'Haryana', 'Uttar Pradesh']
    },
    poc: {
      name: 'Priya Khanna',
      email: 'priya.khanna@sahilelectronics.com',
      phone: '+91 9818234567'
    },
    package: {
      name: 'Premium Package',
      prices: { quarterly: 17999, halfYearly: 33999, yearly: 64999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 12 }
    },
    addons: {
      aiVoiceAgent: {
        enabled: true,
        costPerToken: 2.5,
        packs: [500, 2000]
      }
    },
    status: 'live',
    stats: {
      activeLocations: 4,
      liveCampaigns: 12,
      leadsThisMonth: 384,
      estMrr: 420000
    },
    dealers: [
    {
      id: 'd_koncept_gurgaon',
      name: 'Samsung SmartPlaza Sahil Gurgaon',
      code: 'HR201',
      city: 'Gurgaon',
      state: 'Haryana',
      contact: { name: 'Prem Kumar', phone: '+91 9876547046' },
      status: 'live',
      stats: { campaigns: 3, leads: 95 }
    },
    {
      id: 'd_koncept_cp',
      name: 'Samsung SmartPlaza – Sahil Electronics, Sarojini Nagar',
      code: 'DL069',
      city: 'New Delhi',
      state: 'Delhi',
      contact: { name: 'Rohit Khurana', phone: '+91 9818012345' },
      status: 'live',
      stats: { campaigns: 4, leads: 121 }
    },
    {
      id: 'd_koncept_noida',
      name: 'Samsung SmartPlaza Sahil Noida',
      code: 'UP201',
      city: 'Noida',
      state: 'Uttar Pradesh',
      contact: { name: 'Sanjeev Tyagi', phone: '+91 9818111222' },
      status: 'live',
      stats: { campaigns: 3, leads: 88 }
    },
    {
      id: 'd_koncept_faridabad',
      name: 'Samsung SmartPlaza Sahil Faridabad',
      code: 'HR202',
      city: 'Faridabad',
      state: 'Haryana',
      contact: { name: 'Mohit Bansal', phone: '+91 9899012345' },
      status: 'live',
      stats: { campaigns: 2, leads: 80 }
    },
    {
      id: 'd_koncept_meerut',
      name: 'Samsung SmartPlaza Sahil Meerut',
      code: 'UP202',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      contact: { name: 'Deepak Tomar', phone: '+91 9412012345' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_koncept_master',
      name: 'Sahil Master LP',
      scope: 'clientwise',
      storesUsing: 4,
      status: 'active'
    },
    {
      id: 't_koncept_creta',
      name: 'Galaxy S24 Ultra Launch Variant',
      scope: 'brandwise',
      storesUsing: 2,
      status: 'active'
    }]

  },
  {
    id: 'p_capital_hyundai',
    brandId: 'br_hyundai',
    identity: {
      legalName: 'Capital Electronics Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Capital Electronics',
      vertical: 'Consumer Electronics',
      website: 'https://capitalelectronics.in'
    },
    socialWeb: {
      metaBrandPageId: '112376409812346',
      websiteUrl: 'https://capitalelectronics.in'
    },
    compliance: {
      gstNumber: '03AAFCC9090K1Z4',
      pan: 'AAFCC9090K',
      contractStartDate: '2024-03-15',
      dealerAgreementUrl: '/docs/capital-agreement.pdf',
      contractDocUrl: '/docs/capital-contract.pdf'
    },
    commercials: {
      whoPays: 'brand',
      networkType: 'central',
      mediaFunding: 'brand',
      mediaMoneyType: 'postpaid',
      walletMode: 'po',
      mediaBillingCadence: 'quarterly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 22000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: '2024-03-15',
      expectedLocations: 6,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Punjab', 'Chandigarh', 'Himachal Pradesh']
    },
    poc: {
      name: 'Harpreet Singh',
      email: 'harpreet@capitalelectronics.in',
      phone: '+91 9888012345'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 2, packs: [100, 500] }
    },
    status: 'live',
    stats: {
      activeLocations: 3,
      liveCampaigns: 9,
      leadsThisMonth: 198,
      estMrr: 285000
    },
    dealers: [
    {
      id: 'd_capital_chd',
      name: 'Samsung SmartPlaza Capital Chandigarh',
      code: 'CH101',
      city: 'Chandigarh',
      state: 'Chandigarh',
      contact: { name: 'Gurpreet Kaur', phone: '+91 9876123450' },
      status: 'live',
      stats: { campaigns: 3, leads: 72 }
    },
    {
      id: 'd_capital_ldh',
      name: 'Samsung SmartPlaza Capital Ludhiana',
      code: 'PB101',
      city: 'Ludhiana',
      state: 'Punjab',
      contact: { name: 'Jasbir Singh', phone: '+91 9876234561' },
      status: 'live',
      stats: { campaigns: 3, leads: 64 }
    },
    {
      id: 'd_capital_amritsar',
      name: 'Samsung SmartPlaza Capital Amritsar',
      code: 'PB102',
      city: 'Amritsar',
      state: 'Punjab',
      contact: { name: 'Tarun Sidhu', phone: '+91 9876345672' },
      status: 'live',
      stats: { campaigns: 3, leads: 62 }
    },
    {
      id: 'd_capital_shimla',
      name: 'Samsung SmartPlaza Capital Shimla',
      code: 'HP101',
      city: 'Shimla',
      state: 'Himachal Pradesh',
      contact: { name: 'Yogesh Thakur', phone: '+91 9418012345' },
      status: 'pending',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_capital_master',
      name: 'Capital Master LP',
      scope: 'clientwise',
      storesUsing: 3,
      status: 'active'
    }]

  },
  {
    id: 'p_modi_hyundai',
    brandId: 'br_hyundai',
    identity: {
      legalName: 'Modi Electronics Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Modi Electronics',
      vertical: 'Consumer Electronics',
      website: 'https://modielectronics.com'
    },
    socialWeb: {
      metaBrandPageId: '112376409812347',
      websiteUrl: 'https://modielectronics.com'
    },
    compliance: {
      gstNumber: '27AAGCM4321P1Z9',
      pan: 'AAGCM4321P',
      contractStartDate: '2024-05-20',
      dealerAgreementUrl: '',
      contractDocUrl: ''
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: false,
      dailyMaxBudget: 18000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: null,
      expectedLocations: 5,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Maharashtra']
    },
    poc: {
      name: 'Niraj Modi',
      email: 'niraj@modielectronics.com',
      phone: '+91 9920012345'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: false, costPerToken: 0, packs: [] }
    },
    status: 'onboarding',
    stats: {
      activeLocations: 0,
      liveCampaigns: 0,
      leadsThisMonth: 0,
      estMrr: 0
    },
    dealers: [],
    landingPageTemplates: []
  }]

},
{
  id: 'br_tata',
  name: 'Sony India',
  vertical: 'Consumer Electronics',
  website: 'https://sony.co.in',
  partners: [
  {
    id: 'p_concorde',
    brandId: 'br_tata',
    identity: {
      legalName: 'Concorde Digital (India) Ltd',
      shortName: 'Samsung SmartPlaza – Concorde Digital',
      vertical: 'Consumer Electronics',
      website: 'https://concordedigital.in'
    },
    socialWeb: {
      metaBrandPageId: '118264503019283',
      websiteUrl: 'https://concordedigital.in'
    },
    compliance: {
      gstNumber: '29AAACC4567R1ZK',
      pan: 'AAACC4567R',
      contractStartDate: '2023-08-22',
      dealerAgreementUrl: '/docs/concorde-agreement.pdf',
      contractDocUrl: '/docs/concorde-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'hybrid',
      mediaMoneyType: 'credit',
      walletMode: 'partner_credit',
      mediaBillingCadence: 'monthly',
      velocityType: 'retail_boost',
      aiAddonsAllowed: false,
      dailyMaxBudget: 22000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2023-11-20',
      expectedLocations: 10,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Karnataka', 'Tamil Nadu', 'Telangana']
    },
    poc: {
      name: 'Lakshmi Narayanan',
      email: 'lakshmi.n@concordedigital.in',
      phone: '+91 9844012345'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: false, costPerToken: 0, packs: [] }
    },
    status: 'live',
    stats: {
      activeLocations: 5,
      liveCampaigns: 16,
      leadsThisMonth: 388,
      estMrr: 460000
    },
    dealers: [
    {
      id: 'd_concorde_kor',
      name: 'Samsung SmartPlaza Concorde Koramangala',
      code: 'KA301',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Vikram Rao', phone: '+91 9901234567' },
      status: 'live',
      stats: { campaigns: 4, leads: 102 }
    },
    {
      id: 'd_concorde_wf',
      name: 'Samsung SmartPlaza Concorde Whitefield',
      code: 'KA302',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Deepa Nair', phone: '+91 9845678901' },
      status: 'live',
      stats: { campaigns: 3, leads: 78 }
    },
    {
      id: 'd_concorde_chennai',
      name: 'Samsung SmartPlaza Concorde Velachery',
      code: 'TN301',
      city: 'Chennai',
      state: 'Tamil Nadu',
      contact: { name: 'Karthik Iyer', phone: '+91 9840012345' },
      status: 'live',
      stats: { campaigns: 3, leads: 71 }
    },
    {
      id: 'd_concorde_hyd',
      name: 'Samsung SmartPlaza Concorde Banjara Hills',
      code: 'TG301',
      city: 'Hyderabad',
      state: 'Telangana',
      contact: { name: 'Srinivas Reddy', phone: '+91 9849012345' },
      status: 'live',
      stats: { campaigns: 4, leads: 96 }
    },
    {
      id: 'd_concorde_mysore',
      name: 'Samsung SmartPlaza Concorde Mysore',
      code: 'KA303',
      city: 'Mysore',
      state: 'Karnataka',
      contact: { name: 'Manoj Acharya', phone: '+91 9844098765' },
      status: 'pending',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_concorde_master',
      name: 'Concorde Master LP',
      scope: 'clientwise',
      storesUsing: 4,
      status: 'active'
    },
    {
      id: 't_concorde_nexon',
      name: 'Neo QLED 4K Launch Variant',
      scope: 'brandwise',
      storesUsing: 2,
      status: 'active'
    }]

  },
  {
    id: 'p_lexicon',
    brandId: 'br_tata',
    identity: {
      legalName: 'Lexicon Retail Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Lexicon Retail',
      vertical: 'Consumer Electronics',
      website: 'https://lexiconretail.in'
    },
    socialWeb: {
      metaBrandPageId: '118264503019284',
      websiteUrl: 'https://lexiconretail.in'
    },
    compliance: {
      gstNumber: '27AALCL2233Q1Z1',
      pan: 'AALCL2233Q',
      contractStartDate: '2024-01-08',
      dealerAgreementUrl: '/docs/lexicon-agreement.pdf',
      contractDocUrl: '/docs/lexicon-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 18000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2024-01-08',
      expectedLocations: 7,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Maharashtra', 'Goa']
    },
    poc: {
      name: 'Sanjay Kulkarni',
      email: 'sanjay@lexiconretail.in',
      phone: '+91 9822098765'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 2, packs: [100, 500] }
    },
    status: 'live',
    stats: {
      activeLocations: 4,
      liveCampaigns: 11,
      leadsThisMonth: 272,
      estMrr: 340000
    },
    dealers: [
    {
      id: 'd_lexicon_pune',
      name: 'Samsung SmartPlaza Lexicon Baner',
      code: 'MH401',
      city: 'Pune',
      state: 'Maharashtra',
      contact: { name: 'Sachin Pawar', phone: '+91 9890234567' },
      status: 'live',
      stats: { campaigns: 3, leads: 68 }
    },
    {
      id: 'd_lexicon_pune2',
      name: 'Samsung SmartPlaza Lexicon Kothrud',
      code: 'MH402',
      city: 'Pune',
      state: 'Maharashtra',
      contact: { name: 'Mahesh Kale', phone: '+91 9890123456' },
      status: 'live',
      stats: { campaigns: 3, leads: 61 }
    },
    {
      id: 'd_lexicon_mumbai',
      name: 'Samsung SmartPlaza Lexicon Worli',
      code: 'MH403',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Deepak Naik', phone: '+91 9920123456' },
      status: 'live',
      stats: { campaigns: 3, leads: 82 }
    },
    {
      id: 'd_lexicon_nashik',
      name: 'Samsung SmartPlaza Lexicon Nashik',
      code: 'MH404',
      city: 'Nashik',
      state: 'Maharashtra',
      contact: { name: 'Pravin Patil', phone: '+91 9881023456' },
      status: 'live',
      stats: { campaigns: 2, leads: 41 }
    },
    {
      id: 'd_lexicon_goa',
      name: 'Samsung SmartPlaza Lexicon Panjim',
      code: 'GA101',
      city: 'Panjim',
      state: 'Goa',
      contact: { name: 'Rohan Fernandes', phone: '+91 9822123456' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_lexicon_master',
      name: 'Lexicon Master LP',
      scope: 'clientwise',
      storesUsing: 4,
      status: 'active'
    }]

  }]

},
{
  id: 'br_mahindra',
  name: 'Godrej Appliances',
  vertical: 'Consumer Electronics',
  website: 'https://godrejappliances.com',
  partners: [
  {
    id: 'p_cargo',
    brandId: 'br_mahindra',
    identity: {
      legalName: 'Metro Digital Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Metro Digital',
      vertical: 'Consumer Electronics',
      website: 'https://metrodigital.in'
    },
    socialWeb: {
      metaBrandPageId: '120938476510928',
      websiteUrl: 'https://metrodigital.in'
    },
    compliance: {
      gstNumber: '27AABCC9988P1Z4',
      pan: 'AABCC9988P',
      contractStartDate: '2024-03-10',
      dealerAgreementUrl: '/docs/metro-agreement.pdf',
      contractDocUrl: '/docs/metro-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 24000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2024-03-10',
      expectedLocations: 8,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Maharashtra', 'Gujarat']
    },
    poc: {
      name: 'Rohit Bhatia',
      email: 'rohit@metrodigital.in',
      phone: '+91 9920998877'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 2, packs: [100, 500] }
    },
    status: 'live',
    stats: {
      activeLocations: 4,
      liveCampaigns: 13,
      leadsThisMonth: 296,
      estMrr: 360000
    },
    dealers: [
    {
      id: 'd_cargo_mumbai',
      name: 'Samsung SmartPlaza Metro Lower Parel',
      code: 'MH601',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Prashant Gokhale', phone: '+91 9920123456' },
      status: 'live',
      stats: { campaigns: 3, leads: 72 }
    },
    {
      id: 'd_cargo_pune',
      name: 'Samsung SmartPlaza Metro Pune',
      code: 'MH602',
      city: 'Pune',
      state: 'Maharashtra',
      contact: { name: 'Mandar Joshi', phone: '+91 9890567890' },
      status: 'live',
      stats: { campaigns: 3, leads: 64 }
    },
    {
      id: 'd_cargo_ahd',
      name: 'Samsung SmartPlaza Metro Ahmedabad',
      code: 'GJ201',
      city: 'Ahmedabad',
      state: 'Gujarat',
      contact: { name: 'Bhavin Shah', phone: '+91 9824012345' },
      status: 'live',
      stats: { campaigns: 2, leads: 51 }
    },
    {
      id: 'd_cargo_surat',
      name: 'Samsung SmartPlaza Metro Surat',
      code: 'GJ202',
      city: 'Surat',
      state: 'Gujarat',
      contact: { name: 'Nirav Desai', phone: '+91 9824987654' },
      status: 'live',
      stats: { campaigns: 3, leads: 67 }
    },
    {
      id: 'd_cargo_nagpur',
      name: 'Samsung SmartPlaza Metro Nagpur',
      code: 'MH603',
      city: 'Nagpur',
      state: 'Maharashtra',
      contact: { name: 'Anil Deshmukh', phone: '+91 9881987654' },
      status: 'pending',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_cargo_master',
      name: 'Metro Master LP',
      scope: 'clientwise',
      storesUsing: 4,
      status: 'active'
    },
    {
      id: 't_cargo_xuv',
      name: 'Neo QLED 8K Showcase',
      scope: 'brandwise',
      storesUsing: 2,
      status: 'active'
    }]

  },
  {
    id: 'p_anant',
    brandId: 'br_mahindra',
    identity: {
      legalName: 'Anant Electronics Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Anant Electronics',
      vertical: 'Consumer Electronics',
      website: 'https://anantelectronics.com'
    },
    socialWeb: {
      metaBrandPageId: '120938476510929',
      websiteUrl: 'https://anantelectronics.com'
    },
    compliance: {
      gstNumber: '29AAFCA8765J1Z6',
      pan: 'AAFCA8765J',
      contractStartDate: '2024-04-12',
      dealerAgreementUrl: '/docs/anant-agreement.pdf',
      contractDocUrl: '/docs/anant-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 20000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: '2024-04-12',
      expectedLocations: 6,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Karnataka']
    },
    poc: {
      name: 'Suresh Hegde',
      email: 'suresh@anantelectronics.com',
      phone: '+91 9845123456'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 2, packs: [100, 500] }
    },
    status: 'live',
    stats: {
      activeLocations: 3,
      liveCampaigns: 8,
      leadsThisMonth: 184,
      estMrr: 240000
    },
    dealers: [
    {
      id: 'd_anant_kor',
      name: 'Samsung SmartPlaza Anant Koramangala',
      code: 'KA501',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Mohan Krishna', phone: '+91 9886012345' },
      status: 'live',
      stats: { campaigns: 3, leads: 71 }
    },
    {
      id: 'd_anant_wf',
      name: 'Samsung SmartPlaza Anant Whitefield',
      code: 'KA502',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Arvind Kumar', phone: '+91 9845987654' },
      status: 'live',
      stats: { campaigns: 3, leads: 64 }
    },
    {
      id: 'd_anant_mysore',
      name: 'Samsung SmartPlaza Anant Mysore',
      code: 'KA503',
      city: 'Mysore',
      state: 'Karnataka',
      contact: { name: 'Ravi Gowda', phone: '+91 9844123456' },
      status: 'live',
      stats: { campaigns: 2, leads: 49 }
    },
    {
      id: 'd_anant_mangalore',
      name: 'Samsung SmartPlaza Anant Mangalore',
      code: 'KA504',
      city: 'Mangalore',
      state: 'Karnataka',
      contact: { name: 'Ganesh Shenoy', phone: '+91 9844234567' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_anant_master',
      name: 'Anant Master LP',
      scope: 'clientwise',
      storesUsing: 3,
      status: 'active'
    }]

  }]

},
{
  id: 'br_toyota',
  name: 'Acer India',
  vertical: 'Consumer Electronics',
  website: 'https://acer.com/in',
  partners: [
  {
    id: 'p_lakozy',
    brandId: 'br_toyota',
    identity: {
      legalName: 'Lakozy Digital Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Lakozy Digital',
      vertical: 'Consumer Electronics',
      website: 'https://lakozydigital.com'
    },
    socialWeb: {
      metaBrandPageId: '131276450918273',
      websiteUrl: 'https://lakozydigital.com'
    },
    compliance: {
      gstNumber: '27AAACL5544N1Z5',
      pan: 'AAACL5544N',
      contractStartDate: '2024-04-05',
      dealerAgreementUrl: '/docs/lakozy-agreement.pdf',
      contractDocUrl: '/docs/lakozy-contract.pdf'
    },
    commercials: {
      whoPays: 'brand',
      networkType: 'central',
      mediaFunding: 'brand',
      mediaMoneyType: 'postpaid',
      walletMode: 'po',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 35000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: '2024-04-05',
      expectedLocations: 5,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Maharashtra']
    },
    poc: {
      name: 'Niraj Kothari',
      email: 'niraj@lakozydigital.com',
      phone: '+91 9930012345'
    },
    package: {
      name: 'Premium Package',
      prices: { quarterly: 17999, halfYearly: 33999, yearly: 64999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 6, yearly: 12 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 3, packs: [500, 2000] }
    },
    status: 'live',
    stats: {
      activeLocations: 3,
      liveCampaigns: 9,
      leadsThisMonth: 248,
      estMrr: 320000
    },
    dealers: [
    {
      id: 'd_lakozy_worli',
      name: 'Samsung SmartPlaza Lakozy Worli',
      code: 'MH501',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Niraj Kothari', phone: '+91 9930012345' },
      status: 'live',
      stats: { campaigns: 4, leads: 102 }
    },
    {
      id: 'd_lakozy_andheri',
      name: 'Samsung SmartPlaza Lakozy Andheri',
      code: 'MH502',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Vinod Karnik', phone: '+91 9920567890' },
      status: 'live',
      stats: { campaigns: 3, leads: 78 }
    },
    {
      id: 'd_lakozy_thane',
      name: 'Samsung SmartPlaza Lakozy Thane',
      code: 'MH503',
      city: 'Thane',
      state: 'Maharashtra',
      contact: { name: 'Sandeep Bhide', phone: '+91 9821987654' },
      status: 'live',
      stats: { campaigns: 2, leads: 68 }
    }],

    landingPageTemplates: [
    {
      id: 't_lakozy_master',
      name: 'Lakozy Master LP',
      scope: 'clientwise',
      storesUsing: 3,
      status: 'active'
    },
    {
      id: 't_lakozy_innova',
      name: 'Galaxy Book5 Pro Variant',
      scope: 'brandwise',
      storesUsing: 2,
      status: 'active'
    }]

  },
  {
    id: 'p_nandi',
    brandId: 'br_toyota',
    identity: {
      legalName: 'Nandi Electronics Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Nandi Electronics',
      vertical: 'Consumer Electronics',
      website: 'https://nandielectronics.in'
    },
    socialWeb: {
      metaBrandPageId: '131276450918274',
      websiteUrl: 'https://nandielectronics.in'
    },
    compliance: {
      gstNumber: '29AAACN3344E1Z8',
      pan: 'AAACN3344E',
      contractStartDate: '2024-05-22',
      dealerAgreementUrl: '/docs/nandi-agreement.pdf',
      contractDocUrl: '/docs/nandi-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'quarterly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 22000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2024-05-22',
      expectedLocations: 4,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Karnataka']
    },
    poc: {
      name: 'Aravind Kumar',
      email: 'aravind@nandielectronics.in',
      phone: '+91 9845987654'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: {
        enabled: true,
        costPerToken: 2.5,
        packs: [500, 2000]
      }
    },
    status: 'live',
    stats: {
      activeLocations: 2,
      liveCampaigns: 6,
      leadsThisMonth: 142,
      estMrr: 195000
    },
    dealers: [
    {
      id: 'd_nandi_indiranagar',
      name: 'Samsung SmartPlaza Nandi Indiranagar',
      code: 'KA601',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Aravind Kumar', phone: '+91 9845987654' },
      status: 'live',
      stats: { campaigns: 3, leads: 84 }
    },
    {
      id: 'd_nandi_jayanagar',
      name: 'Samsung SmartPlaza Nandi Jayanagar',
      code: 'KA602',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Shashank Murthy', phone: '+91 9844567890' },
      status: 'live',
      stats: { campaigns: 3, leads: 58 }
    },
    {
      id: 'd_nandi_hubli',
      name: 'Samsung SmartPlaza Nandi Hubli',
      code: 'KA603',
      city: 'Hubli',
      state: 'Karnataka',
      contact: { name: 'Mahesh Patil', phone: '+91 9844234561' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_nandi_master',
      name: 'Nandi Master LP',
      scope: 'clientwise',
      storesUsing: 2,
      status: 'active'
    }]

  }]

},
{
  id: 'br_kia',
  name: 'Haier India',
  vertical: 'Consumer Electronics',
  website: 'https://haier.com/in',
  partners: [
  {
    id: 'p_kun',
    brandId: 'br_kia',
    identity: {
      legalName: 'Kun Digital Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Kun Digital',
      vertical: 'Consumer Electronics',
      website: 'https://kundigital.in'
    },
    socialWeb: {
      metaBrandPageId: '142098374651029',
      websiteUrl: 'https://kundigital.in'
    },
    compliance: {
      gstNumber: '33AAFCK6543Q1Z6',
      pan: 'AAFCK6543Q',
      contractStartDate: '2024-05-12',
      dealerAgreementUrl: '/docs/kun-agreement.pdf',
      contractDocUrl: '/docs/kun-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'hybrid',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'quarterly',
      velocityType: 'retail_boost',
      aiAddonsAllowed: true,
      dailyMaxBudget: 20000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2024-05-12',
      expectedLocations: 6,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Tamil Nadu', 'Andhra Pradesh']
    },
    poc: {
      name: 'Senthil Murugan',
      email: 'senthil@kundigital.in',
      phone: '+91 9840234567'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: {
        enabled: true,
        costPerToken: 2,
        packs: [100, 500, 2000]
      }
    },
    status: 'live',
    stats: {
      activeLocations: 3,
      liveCampaigns: 9,
      leadsThisMonth: 212,
      estMrr: 280000
    },
    dealers: [
    {
      id: 'd_kun_chennai',
      name: 'Samsung SmartPlaza Kun Anna Nagar',
      code: 'TN601',
      city: 'Chennai',
      state: 'Tamil Nadu',
      contact: { name: 'Senthil Murugan', phone: '+91 9840234567' },
      status: 'live',
      stats: { campaigns: 3, leads: 71 }
    },
    {
      id: 'd_kun_coimbatore',
      name: 'Samsung SmartPlaza Kun Coimbatore',
      code: 'TN602',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      contact: { name: 'Saravana Pandian', phone: '+91 9842234567' },
      status: 'live',
      stats: { campaigns: 3, leads: 68 }
    },
    {
      id: 'd_kun_vijayawada',
      name: 'Samsung SmartPlaza Kun Vijayawada',
      code: 'AP201',
      city: 'Vijayawada',
      state: 'Andhra Pradesh',
      contact: { name: 'Krishna Mohan', phone: '+91 9866012345' },
      status: 'live',
      stats: { campaigns: 3, leads: 62 }
    },
    {
      id: 'd_kun_vizag',
      name: 'Samsung SmartPlaza Kun Vizag',
      code: 'AP202',
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      contact: { name: 'Naga Raju', phone: '+91 9908012345' },
      status: 'pending',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_kun_master',
      name: 'Kun Master LP',
      scope: 'clientwise',
      storesUsing: 3,
      status: 'active'
    },
    {
      id: 't_kun_seltos',
      name: 'The Frame Festive Variant',
      scope: 'brandwise',
      storesUsing: 1,
      status: 'draft'
    }]

  },
  {
    id: 'p_pinnacle_kia',
    brandId: 'br_kia',
    identity: {
      legalName: 'Pinnacle Retail Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Pinnacle Retail',
      vertical: 'Consumer Electronics',
      website: 'https://pinnacleretail.in'
    },
    socialWeb: {
      metaBrandPageId: '142098374651030',
      websiteUrl: 'https://pinnacleretail.in'
    },
    compliance: {
      gstNumber: '36AAGCP7788R1Z2',
      pan: 'AAGCP7788R',
      contractStartDate: null,
      dealerAgreementUrl: '',
      contractDocUrl: ''
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: false,
      dailyMaxBudget: 15000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: null,
      expectedLocations: 4,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Telangana']
    },
    poc: {
      name: 'Ramesh Babu',
      email: 'ramesh@pinnacleretail.in',
      phone: '+91 9912098765'
    },
    package: {
      name: 'Standard Package',
      prices: { quarterly: 13499, halfYearly: 25999, yearly: 49999 },
      inclusions: [],
      cadenceDiscounts: { quarterly: 0, halfYearly: 0, yearly: 0 }
    },
    addons: {
      aiVoiceAgent: { enabled: false, costPerToken: 0, packs: [] }
    },
    status: 'pending',
    stats: {
      activeLocations: 0,
      liveCampaigns: 0,
      leadsThisMonth: 0,
      estMrr: 0
    },
    dealers: [],
    landingPageTemplates: []
  }]

},
{
  id: 'br_mercedes',
  name: 'Bose India',
  vertical: 'Consumer Electronics',
  website: 'https://bose.in',
  partners: [
  {
    id: 'p_landmark',
    brandId: 'br_mercedes',
    identity: {
      legalName: 'Landmark Digital Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Landmark Premium',
      vertical: 'Consumer Electronics',
      website: 'https://landmarkdigital.com'
    },
    socialWeb: {
      metaBrandPageId: '153876209487123',
      websiteUrl: 'https://landmarkdigital.com'
    },
    compliance: {
      gstNumber: '27AAACL1122M1Z5',
      pan: 'AAACL1122M',
      contractStartDate: '2023-07-10',
      dealerAgreementUrl: '/docs/landmark-agreement.pdf',
      contractDocUrl: '/docs/landmark-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'hybrid',
      mediaMoneyType: 'postpaid',
      walletMode: 'po',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 50000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: '2023-09-01',
      expectedLocations: 12,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: [
      'Maharashtra',
      'Gujarat',
      'Delhi',
      'Karnataka',
      'Telangana']

    },
    poc: {
      name: 'Sanjay Thakker',
      email: 'sanjay.t@landmarkdigital.com',
      phone: '+91 9920777888'
    },
    package: {
      name: 'Premium Package',
      prices: { quarterly: 17999, halfYearly: 33999, yearly: 64999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 6, yearly: 12 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 3, packs: [500, 2000] }
    },
    status: 'live',
    stats: {
      activeLocations: 8,
      liveCampaigns: 22,
      leadsThisMonth: 612,
      estMrr: 920000
    },
    dealers: [
    {
      id: 'd_landmark_mumbai',
      name: 'Samsung SmartPlaza Landmark BKC',
      code: 'MH701',
      city: 'Mumbai',
      state: 'Maharashtra',
      contact: { name: 'Rahul Bajaj', phone: '+91 9920111222' },
      status: 'live',
      stats: { campaigns: 4, leads: 138 }
    },
    {
      id: 'd_landmark_thane',
      name: 'Samsung SmartPlaza Landmark Thane',
      code: 'MH702',
      city: 'Thane',
      state: 'Maharashtra',
      contact: { name: 'Vivek Khanna', phone: '+91 9821555666' },
      status: 'live',
      stats: { campaigns: 3, leads: 96 }
    },
    {
      id: 'd_landmark_ahd',
      name: 'Samsung SmartPlaza Landmark Ahmedabad',
      code: 'GJ301',
      city: 'Ahmedabad',
      state: 'Gujarat',
      contact: { name: 'Yash Trivedi', phone: '+91 9824567890' },
      status: 'live',
      stats: { campaigns: 3, leads: 78 }
    },
    {
      id: 'd_landmark_surat',
      name: 'Samsung SmartPlaza Landmark Surat',
      code: 'GJ302',
      city: 'Surat',
      state: 'Gujarat',
      contact: { name: 'Kunal Mehta', phone: '+91 9824123456' },
      status: 'live',
      stats: { campaigns: 2, leads: 54 }
    },
    {
      id: 'd_landmark_delhi',
      name: 'Samsung SmartPlaza Landmark Delhi',
      code: 'DL301',
      city: 'New Delhi',
      state: 'Delhi',
      contact: { name: 'Karan Malhotra', phone: '+91 9818777666' },
      status: 'live',
      stats: { campaigns: 4, leads: 124 }
    },
    {
      id: 'd_landmark_blr',
      name: 'Samsung SmartPlaza Landmark Bangalore',
      code: 'KA701',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Aditya Shankar', phone: '+91 9845123789' },
      status: 'live',
      stats: { campaigns: 3, leads: 88 }
    },
    {
      id: 'd_landmark_hyd',
      name: 'Samsung SmartPlaza Landmark Hyderabad',
      code: 'TG401',
      city: 'Hyderabad',
      state: 'Telangana',
      contact: { name: 'Vivek Reddy', phone: '+91 9849345678' },
      status: 'live',
      stats: { campaigns: 3, leads: 74 }
    },
    {
      id: 'd_landmark_pune',
      name: 'Samsung SmartPlaza Landmark Pune',
      code: 'MH703',
      city: 'Pune',
      state: 'Maharashtra',
      contact: { name: 'Nikhil Apte', phone: '+91 9890888777' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_landmark_master',
      name: 'Landmark Master LP',
      scope: 'clientwise',
      storesUsing: 7,
      status: 'active'
    },
    {
      id: 't_landmark_eqs',
      name: 'Galaxy Z Fold8 Launch Variant',
      scope: 'brandwise',
      storesUsing: 4,
      status: 'active'
    }]

  },
  {
    id: 'p_sundaram',
    brandId: 'br_mercedes',
    identity: {
      legalName: 'Sundaram Electronics Pvt Ltd',
      shortName: 'Samsung SmartPlaza – Sundaram Electronics',
      vertical: 'Consumer Electronics',
      website: 'https://sundaramelectronics.in'
    },
    socialWeb: {
      metaBrandPageId: '153876209487124',
      websiteUrl: 'https://sundaramelectronics.in'
    },
    compliance: {
      gstNumber: '33AAACS6789T1Z2',
      pan: 'AAACS6789T',
      contractStartDate: '2023-10-15',
      dealerAgreementUrl: '/docs/sundaram-agreement.pdf',
      contractDocUrl: '/docs/sundaram-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 40000
    },
    media: { intendedPlatforms: ['google', 'meta', 'whatsapp_ctwa'] },
    operations: {
      goLiveDate: '2023-11-15',
      expectedLocations: 6,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Tamil Nadu', 'Karnataka', 'Kerala']
    },
    poc: {
      name: 'Bharath Subramanian',
      email: 'bharath@sundaramelectronics.in',
      phone: '+91 9840098765'
    },
    package: {
      name: 'Premium Package',
      prices: { quarterly: 17999, halfYearly: 33999, yearly: 64999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics',
      'whatsapp_ctwa'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 6, yearly: 12 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 3, packs: [500, 2000] }
    },
    status: 'live',
    stats: {
      activeLocations: 4,
      liveCampaigns: 14,
      leadsThisMonth: 388,
      estMrr: 540000
    },
    dealers: [
    {
      id: 'd_sundaram_chennai',
      name: 'Samsung SmartPlaza Sundaram Chennai',
      code: 'TN701',
      city: 'Chennai',
      state: 'Tamil Nadu',
      contact: { name: 'Suresh Krishnan', phone: '+91 9840123456' },
      status: 'live',
      stats: { campaigns: 4, leads: 112 }
    },
    {
      id: 'd_sundaram_coimbatore',
      name: 'Samsung SmartPlaza Sundaram Coimbatore',
      code: 'TN702',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      contact: { name: 'Karthick Velu', phone: '+91 9842012345' },
      status: 'live',
      stats: { campaigns: 3, leads: 84 }
    },
    {
      id: 'd_sundaram_blr',
      name: 'Samsung SmartPlaza Sundaram Bangalore',
      code: 'KA702',
      city: 'Bangalore',
      state: 'Karnataka',
      contact: { name: 'Pradeep Hegde', phone: '+91 9844112233' },
      status: 'live',
      stats: { campaigns: 4, leads: 102 }
    },
    {
      id: 'd_sundaram_kochi',
      name: 'Samsung SmartPlaza Sundaram Kochi',
      code: 'KL301',
      city: 'Kochi',
      state: 'Kerala',
      contact: { name: 'Tony Mathew', phone: '+91 9847012345' },
      status: 'live',
      stats: { campaigns: 3, leads: 90 }
    },
    {
      id: 'd_sundaram_tvm',
      name: 'Samsung SmartPlaza Sundaram Trivandrum',
      code: 'KL302',
      city: 'Trivandrum',
      state: 'Kerala',
      contact: { name: 'Anoop Pillai', phone: '+91 9847234567' },
      status: 'invited',
      stats: { campaigns: 0, leads: 0 }
    }],

    landingPageTemplates: [
    {
      id: 't_sundaram_master',
      name: 'Sundaram Master LP',
      scope: 'clientwise',
      storesUsing: 4,
      status: 'active'
    }]

  },
  {
    id: 'p_tnt',
    brandId: 'br_mercedes',
    identity: {
      legalName: 'T&T Digital Ltd',
      shortName: 'Samsung SmartPlaza – T&T Digital',
      vertical: 'Consumer Electronics',
      website: 'https://tntdigital.in'
    },
    socialWeb: {
      metaBrandPageId: '153876209487125',
      websiteUrl: 'https://tntdigital.in'
    },
    compliance: {
      gstNumber: '07AAACT4455K1Z3',
      pan: 'AAACT4455K',
      contractStartDate: '2024-01-20',
      dealerAgreementUrl: '/docs/tnt-agreement.pdf',
      contractDocUrl: '/docs/tnt-contract.pdf'
    },
    commercials: {
      whoPays: 'partner',
      networkType: 'partner',
      mediaFunding: 'partner',
      mediaMoneyType: 'prepaid',
      walletMode: 'prepaid',
      mediaBillingCadence: 'monthly',
      velocityType: 'demand_gen',
      aiAddonsAllowed: true,
      dailyMaxBudget: 30000
    },
    media: { intendedPlatforms: ['google', 'meta'] },
    operations: {
      goLiveDate: '2024-01-20',
      expectedLocations: 1,
      locationTypeLabel: 'Retail Store',
      statesOfOperation: ['Delhi']
    },
    poc: {
      name: 'Tarun Talwar',
      email: 'tarun@tntdigital.in',
      phone: '+91 9810456789'
    },
    package: {
      name: 'Premium Package',
      prices: { quarterly: 17999, halfYearly: 33999, yearly: 64999 },
      inclusions: [
      'google_ads',
      'meta_ads',
      'landing_pages',
      'lead_capture',
      'analytics'],

      cadenceDiscounts: { quarterly: 0, halfYearly: 5, yearly: 10 }
    },
    addons: {
      aiVoiceAgent: { enabled: true, costPerToken: 2.5, packs: [500] }
    },
    status: 'live',
    stats: {
      activeLocations: 1,
      liveCampaigns: 4,
      leadsThisMonth: 96,
      estMrr: 170000
    },
    dealers: [
    {
      id: 'd_tnt_delhi',
      name: 'Samsung SmartPlaza T&T Mathura Road',
      code: 'DL401',
      city: 'New Delhi',
      state: 'Delhi',
      contact: { name: 'Tarun Talwar', phone: '+91 9810456789' },
      status: 'live',
      stats: { campaigns: 4, leads: 96 }
    }],

    landingPageTemplates: [
    {
      id: 't_tnt_master',
      name: 'T&T Master LP',
      scope: 'clientwise',
      storesUsing: 1,
      status: 'active'
    }]

  }]

}];


// ============================================================
// Helper functions
// ============================================================

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id);
}

export function getPartnerById(id: string): Partner | undefined {
  for (const brand of BRANDS) {
    const partner = brand.partners.find((p) => p.id === id);
    if (partner) return partner;
  }
  return undefined;
}

export function getAllPartners(): Partner[] {
  return BRANDS.flatMap((b) => b.partners);
}

export function getAllDealers(): Dealer[] {
  return getAllPartners().flatMap((p) => p.dealers);
}

export function getDealersForBrand(brandId: string): Dealer[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  return brand.partners.flatMap((p) => p.dealers);
}

export function getPartnersForBrand(brandId: string): Partner[] {
  const brand = getBrandById(brandId);
  return brand?.partners ?? [];
}

export function getBrandSummaryStats() {
  const allPartners = getAllPartners();
  return {
    totalBrands: BRANDS.length,
    livePartners: allPartners.filter((p) => p.status === 'live').length,
    onboardingPartners: allPartners.filter((p) => p.status === 'onboarding').
    length,
    pendingPartners: allPartners.filter((p) => p.status === 'pending').length,
    totalDealers: getAllDealers().length
  };
}

// Default contexts
export const DEFAULT_PARTNER_ID = 'p_koncept'; // Samsung SmartPlaza – Sahil Electronics
export const DEFAULT_BRAND_ID = 'br_maruti'; // Samsung India

export function getDefaultPartner(): Partner {
  return getPartnerById(DEFAULT_PARTNER_ID)!;
}

export function getDefaultBrand(): Brand {
  return getBrandById(DEFAULT_BRAND_ID)!;
}

export function getDefaultPartnerBrand(): Brand {
  return getBrandById('br_hyundai')!;
}
