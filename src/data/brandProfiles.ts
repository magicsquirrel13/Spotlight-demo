// ============================================================
// Brand visual + copy profiles used by the landing-page builder
// and the public DealerLandingPage. Keyed by brandId so the same
// dealer URL renders correctly for whichever brand owns it.
// ============================================================

export interface BrandProfile {
  id: string;
  name: string;
  // Wordmark in the header (e.g. "SAMSUNG"). Optional accentWord is
  // rendered in the brand's accent color (e.g. "GALAXY").
  wordmark: string;
  accentWord?: string;
  // Tagline shown next to the store name in the header.
  subheading: string;
  // Primary brand accent (hex). Used for tagline color, accent word, CTA fills.
  accent: string;
  // Hero headline + supporting copy for the landing page.
  heroTagline: string;
  heroSupport: string;
  // Gradient classes for the hero section background.
  heroGradient: string;
  // Header & footer background colors.
  headerBg: string;
  footerBg: string;
  // "About" section background.
  aboutBg: string;
  // Product dropdown options.
  models: string[];
  // About section description (uses {{dealer}} and {{city}} placeholders).
  aboutDescription: string;
  // Footer copyright line.
  copyright: string;
  // Brand official website (linked from the thank-you message).
  websiteLabel: string;
  websiteUrl: string;
}

export const BRAND_PROFILES: Record<string, BrandProfile> = {
  br_maruti: {
    id: 'br_maruti',
    name: 'Samsung',
    wordmark: 'SAMSUNG',
    accentWord: 'GALAXY',
    subheading: 'Samsung Authorized SmartPlaza Partner',
    accent: '#1428A0',
    heroTagline: 'GALAXY AI\nIS HERE',
    heroSupport:
    'Discover the Galaxy Z Fold8 Ultra 5G, Galaxy S24 Ultra and the entire Samsung range at {{dealer}}.',
    heroGradient: 'from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a3a]',
    headerBg: '#030303',
    footerBg: '#000000',
    aboutBg: '#0e1a30',
    models: [
    'Galaxy Z Fold8 Ultra 5G (SM-F958B)',
    'Galaxy S24 Ultra 5G (SM-S928B)',
    'Galaxy Z Flip8 5G (SM-F748B)',
    'Galaxy A55 5G (SM-A556E)',
    'Neo QLED 8K QN900D (QA85QN900D)',
    'Neo QLED 4K QN90D (QA65QN90D)',
    'Bespoke French Door RF57DG (RF57DG29A3S9)',
    'Bespoke AI Front Load WW11DG (WW11DG6B25AB)'],

    aboutDescription:
    'As an authorized Samsung SmartPlaza partner, we bring you the latest Galaxy devices like the Galaxy Z Fold8 Ultra 5G, Galaxy S24 Ultra, Neo QLED 8K QN900D and Bespoke home appliances, backed by expert guidance and a seamless shopping experience.',
    copyright:
    'Copyright © 2026 Samsung India Electronics Pvt Ltd. All Rights Reserved',
    websiteLabel: 'www.samsung.com/in',
    websiteUrl: 'https://www.samsung.com/in'
  },
  br_hyundai: {
    id: 'br_hyundai',
    name: 'LG Electronics',
    wordmark: 'LG',
    subheading: 'LG Authorized Store',
    accent: '#A50034',
    heroTagline: 'LIFE\u2019S GOOD\nWITH LG AI',
    heroSupport:
    'Experience the OLED evo G4, InstaView refrigerators and the full LG range at {{dealer}}.',
    heroGradient: 'from-[#0b1b30] via-[#10243f] to-[#0b1b30]',
    headerBg: '#A50034',
    footerBg: '#0a1a2e',
    aboutBg: '#0e2547',
    models: [
    'OLED evo G4 4K (OLED65G4)',
    'QNED 4K QNED85 (65QNED85)',
    'InstaView Door-in-Door Fridge (GL-X257)',
    'AI Direct Drive Front Load (FHM1408BDW)',
    'WashTower (WT-D200)',
    'gram 16 Laptop (16Z90S)',
    'Dual Inverter Split AC (PS-Q19YNZE)',
    'Soundbar S95TR'],

    aboutDescription:
    'As an authorized LG store, we bring you the OLED evo G4, QNED TVs, InstaView refrigerators and AI Direct Drive washers \u2014 with expert guidance, easy finance, and a complete shopping experience.',
    copyright:
    'Copyright © 2026 LG Electronics India Pvt Ltd. All Rights Reserved',
    websiteLabel: 'www.lg.com/in',
    websiteUrl: 'https://www.lg.com/in'
  },
  br_tata: {
    id: 'br_tata',
    name: 'Sony',
    wordmark: 'SONY',
    accentWord: 'BRAVIA',
    subheading: 'Sony Authorized Store',
    accent: '#1e40af',
    heroTagline: 'BE MOVED',
    heroSupport:
    'Explore the BRAVIA 9, WH-1000XM5, PlayStation 5 and the full Sony range at {{dealer}}.',
    heroGradient: 'from-[#0b1530] via-[#16223f] to-[#0b1530]',
    headerBg: '#0b1530',
    footerBg: '#020617',
    aboutBg: '#101e3f',
    models: [
    'BRAVIA 9 XR 4K (K-85XR90)',
    'BRAVIA 8 OLED 4K (K-65XR80)',
    'WH-1000XM5 Headphones',
    'WF-1000XM5 Earbuds',
    'PlayStation 5 Pro',
    'Alpha 7 IV Camera (ILCE-7M4)',
    'BRAVIA Theatre Bar 9',
    'Xperia 1 VI 5G'],

    aboutDescription:
    'As an authorized Sony store, we offer the BRAVIA 9 and BRAVIA 8 OLED TVs, WH-1000XM5 headphones, PlayStation 5 Pro and the full Sony lineup \u2014 with demos, easy finance and after-sales service support.',
    copyright: 'Copyright © 2026 Sony India Pvt Ltd. All Rights Reserved',
    websiteLabel: 'www.sony.co.in',
    websiteUrl: 'https://www.sony.co.in'
  },
  br_mahindra: {
    id: 'br_mahindra',
    name: 'Godrej Appliances',
    wordmark: 'GODREJ',
    subheading: 'Godrej Authorized Store',
    accent: '#00853F',
    heroTagline: 'BRIGHTER\nLIVING',
    heroSupport:
    'Discover Eon Vogue refrigerators, WenderLux washers and the entire Godrej appliance range at {{dealer}}.',
    heroGradient: 'from-[#1a1a1a] via-[#2a1a1a] to-[#1a0a0a]',
    headerBg: '#030303',
    footerBg: '#000000',
    aboutBg: '#0e3a30',
    models: [
    'Eon Vogue French Door Fridge (RF EON 470)',
    'Insignia Frost Free Fridge (RT EON 328)',
    'WenderLux Front Load Washer (WF EON 8014)',
    '5-in-1 Convertible Split AC (AC 183 IHX)',
    'Personal Air Cooler (Rio 60)',
    'Convection Microwave (GME 725)',
    'Deep Freezer (DH EPenta 225)',
    'Bottom Mount Fridge (RB EON 260)'],

    aboutDescription:
    'Your trusted Godrej appliance store. Latest home appliances \u2014 Eon Vogue refrigerators, WenderLux washers, convertible ACs and more \u2014 with end-to-end finance, installation and after-sales service support.',
    copyright:
    'Copyright © 2026 Godrej & Boyce Mfg. Co. Ltd. All Rights Reserved',
    websiteLabel: 'www.godrejappliances.com',
    websiteUrl: 'https://www.godrejappliances.com'
  },
  br_toyota: {
    id: 'br_toyota',
    name: 'Acer',
    wordmark: 'ACER',
    subheading: 'Acer Authorized Store',
    accent: '#83B81A',
    heroTagline: 'BUILT TO\nPERFORM',
    heroSupport:
    'Discover the Predator Helios 16, Swift Go, Aspire and the full Acer range at {{dealer}}.',
    heroGradient: 'from-[#1a1a1a] via-[#2b1414] to-[#1a0a0a]',
    headerBg: '#000000',
    footerBg: '#000000',
    aboutBg: '#1a1a1a',
    models: [
    'Predator Helios 16 (PH16-72)',
    'Swift Go 14 (SFG14-73)',
    'Aspire 7 (A715-76G)',
    'Nitro V 15 (ANV15-51)',
    'Predator X27U Monitor',
    'Chromebook Plus 515 (CB515)',
    'Aspire C24 All-in-One'],

    aboutDescription:
    'As an authorized Acer store, we offer the Predator Helios 16, Swift Go, Aspire laptops, gaming monitors and the entire Acer lineup \u2014 backed by Acer\u2019s trusted reliability and service.',
    copyright: 'Copyright © 2026 Acer India Pvt Ltd. All Rights Reserved',
    websiteLabel: 'www.acer.com/in',
    websiteUrl: 'https://www.acer.com/in'
  },
  br_kia: {
    id: 'br_kia',
    name: 'Haier',
    wordmark: 'HAIER',
    subheading: 'Haier Authorized Store',
    accent: '#004EA2',
    heroTagline: 'INSPIRED\nLIVING',
    heroSupport:
    'Experience the 4K Google TV, convertible refrigerators and the full Haier appliance range at {{dealer}}.',
    heroGradient: 'from-[#000000] via-[#0a0a0a] to-[#1a1a1a]',
    headerBg: '#05141F',
    footerBg: '#000000',
    aboutBg: '#0e0e0e',
    models: [
    'Google TV 4K QLED (65S800QT)',
    'Bottom Mount Fridge (HEB-25TDS)',
    'Front Load Washer (HW80-IM12929)',
    'Convertible Split AC (HSU19C-TXS5BN)',
    'Chest Freezer (HCF-320)'],
    aboutDescription:
    'As an authorized Haier store, we offer 4K Google TVs, convertible refrigerators, front-load washers and the full Haier lineup \u2014 with a stylish, technology-first ownership experience.',
    copyright:
    'Copyright © 2026 Haier Appliances India Pvt Ltd. All Rights Reserved',
    websiteLabel: 'www.haier.com/in',
    websiteUrl: 'https://www.haier.com/in'
  },
  br_mercedes: {
    id: 'br_mercedes',
    name: 'Bose',
    wordmark: 'BOSE',
    subheading: 'Bose Authorized Store',
    accent: '#9aa0a6',
    heroTagline: 'SOUND IS\nEVERYTHING',
    heroSupport:
    'Step into the world of QuietComfort Ultra, Smart Soundbars and the full Bose lineup at {{dealer}}.',
    heroGradient: 'from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]',
    headerBg: '#000000',
    footerBg: '#000000',
    aboutBg: '#111111',
    models: [
    'QuietComfort Ultra Headphones',
    'QuietComfort Ultra Earbuds',
    'Smart Soundbar 900',
    'Bose Home Speaker 500',
    'SoundLink Max Portable Speaker',
    'Bass Module 700',
    'Surround Speakers 700',
    'Bose Music Amplifier'],

    aboutDescription:
    'As an authorized Bose store, we offer QuietComfort Ultra headphones and earbuds, Smart Soundbars, home speakers and the full Bose range \u2014 with personalized demos and concierge service.',
    copyright:
    'Copyright © 2026 Bose Corporation India Pvt Ltd. All Rights Reserved',
    websiteLabel: 'www.bose.in',
    websiteUrl: 'https://www.bose.in'
  }
};

export const DEFAULT_BRAND_ID = 'br_maruti';

export function getBrandProfile(brandId?: string | null): BrandProfile {
  if (brandId && BRAND_PROFILES[brandId]) return BRAND_PROFILES[brandId];
  return BRAND_PROFILES[DEFAULT_BRAND_ID];
}

// ------------------------------------------------------------------
// Active brand — the brand chosen/onboarded in the Spotlight admin.
// Persisted so the partner-facing flows (onboarding, dashboard) stay
// linked to whichever brand was set up. Defaults to Samsung.
// ------------------------------------------------------------------
const ACTIVE_BRAND_KEY = 'spotlight.activeBrandId';
export const FALLBACK_ACTIVE_BRAND_ID = 'br_maruti';

export function setActiveBrandId(brandId: string) {
  if (!brandId || !BRAND_PROFILES[brandId]) return;
  try {
    window.localStorage.setItem(ACTIVE_BRAND_KEY, brandId);
  } catch {

    /* ignore storage errors */}
}

export function getActiveBrandId(): string {
  try {
    const stored = window.localStorage.getItem(ACTIVE_BRAND_KEY);
    if (stored && BRAND_PROFILES[stored]) return stored;
  } catch {

    /* ignore storage errors */}
  return FALLBACK_ACTIVE_BRAND_ID;
}

export function getActiveBrandProfile(): BrandProfile {
  return getBrandProfile(getActiveBrandId());
}