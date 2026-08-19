import React, { useState } from 'react';
import {
  Plus,
  Download,
  Sparkles,
  Image as ImageIcon,
  Heart,
  Copy,
  ArrowLeft,
  Check,
  Wand2 } from
'lucide-react';
// ============================================================
// DATA
// ============================================================
const MODELS = [
{
  id: 'zfold8',
  name: 'Galaxy Z Fold8 Ultra 5G',
  tagline: 'SM-F958B · 7.6" Foldable · Galaxy AI',
  img: "/samsung-zfold8.png",
  variants: [
  {
    id: 'phantom-black',
    name: 'Phantom Black',
    hex: '#1B1B1F',
    img: "/samsung-zfold8.png"
  },
  {
    id: 'silver-shadow',
    name: 'Silver Shadow',
    hex: '#B8BCC4',
    img: "/samsung-zfold8.png"
  }]

},
{
  id: 's24-ultra',
  name: 'Galaxy S24 Ultra 5G',
  tagline: 'SM-S928B · 6.8" · 200MP · S Pen',
  img: "/samsung-s24-ultra.png",
  variants: [
  {
    id: 'titanium-gray',
    name: 'Titanium Gray',
    hex: '#5C5E63',
    img: "/samsung-s24-ultra.png"
  }]

},
{
  id: 'neo-qled',
  name: 'Neo QLED 8K QN900D',
  tagline: 'QA85QN900D · 85" · 8K AI Upscaling',
  img: "/samsung-neo-qled.png",
  variants: [
  {
    id: 'graphite-black',
    name: 'Graphite Black',
    hex: '#16181C',
    img: "/samsung-neo-qled.png"
  }]

},
{
  id: 'bespoke-fridge',
  name: 'Bespoke French Door RF57DG',
  tagline: 'RF57DG29A3S9 · 580L · AI Family Hub',
  img: "/samsung-bespoke-fridge.png",
  variants: [
  {
    id: 'glam-navy',
    name: 'Glam Navy + Steel',
    hex: '#46587E',
    img: "/samsung-bespoke-fridge.png"
  }]

},
{
  id: 'bespoke-washer',
  name: 'Bespoke AI Washer WW11DG',
  tagline: 'WW11DG6B25AB · 11kg · AI EcoBubble',
  img: "/samsung-washer.png",
  variants: [
  {
    id: 'silver',
    name: 'Silver Steel',
    hex: '#C4C8D0',
    img: "/samsung-washer.png"
  }]

},
{
  id: 'galaxy-book',
  name: 'Galaxy Book5 Pro',
  tagline: 'NP940XGK · 16" · Intel Core Ultra 7',
  img: "/samsung-galaxy-book.png",
  variants: [
  {
    id: 'moonstone-gray',
    name: 'Moonstone Gray',
    hex: '#7C808A',
    img: "/samsung-galaxy-book.png"
  }]

}];

const BACKGROUNDS = [
{
  id: 'studio',
  name: 'Studio',
  img: "/processed_086facd3-85fb-439e-8fcc-f2c8b1d585f1.jpg"
},
{
  id: 'winter',
  name: 'Winter',
  img: "/processed_05286867-9851-47df-b47e-213cc86011d1.jpg"
},
{
  id: 'hill-road',
  name: 'Hill Road',
  img: "/processed_0797f88f-b8c8-4b13-9fa6-08d996f5d62d.jpg"
},
{
  id: 'festive-night',
  name: 'Festive Night',
  img: "/processed_e12edcab-b493-4477-962a-992b47aaad82.jpg"
},
{
  id: 'desert-dunes',
  name: 'Desert Dunes',
  img: "/processed_4b573394-8b62-48b7-a511-f9c316993134.jpg"
},
{
  id: 'city-blue-hour',
  name: 'City Blue Hour',
  img: "/processed_efad80ac-68c1-43ce-a0bd-f5ccf5cd2bfa.jpg"
}];

const LANGUAGES = [
'English',
'Hindi',
'Gujarati',
'Marathi',
'Bengali',
'Tamil',
'Kannada',
'Telugu',
'Malayalam',
'Punjabi'];

const OFFERS = [
'Festive ₹8,000 Cashback',
'No Cost EMI from ₹2,999/mo',
'Free Galaxy Buds Worth ₹9,999',
'Exchange Bonus up to ₹15,000',
'3-Year Warranty Free',
'Zero Down Payment'];

const TITLES = [
'Galaxy AI is Here',
'Open to Wonder',
'Do the Bespoke Life',
'Experience the Extraordinary',
'Own Now at SmartPlaza',
'Innovation for Every Home'];

// ============================================================
// TRANSLATIONS
// ============================================================
const TRANSLATIONS = {
  offers: {
    'Festive ₹50,000 Off': {
      English: 'Festive ₹50,000 Off',
      Hindi: 'त्योहारी ₹50,000 की छूट',
      Gujarati: 'તહેવારી ₹50,000 છૂટ',
      Marathi: 'सणाची ₹50,000 सूट',
      Bengali: 'উৎসবে ₹50,000 ছাড়',
      Tamil: 'பண்டிகை ₹50,000 தள்ளுபடி',
      Kannada: 'ಹಬ್ಬದ ₹50,000 ರಿಯಾಯಿತಿ',
      Telugu: 'పండుగ ₹50,000 తగ్గింపు',
      Malayalam: 'ഉത്സവ ₹50,000 കിഴിവ്',
      Punjabi: 'ਤਿਉਹਾਰ ਦੀ ₹50,000 ਛੋਟ'
    },
    'EMI from ₹15,999': {
      English: 'EMI from ₹15,999',
      Hindi: 'EMI ₹15,999 से शुरू',
      Gujarati: 'EMI ₹15,999 થી',
      Marathi: 'EMI ₹15,999 पासून',
      Bengali: 'EMI ₹15,999 থেকে',
      Tamil: 'EMI ₹15,999 முதல்',
      Kannada: 'EMI ₹15,999 ರಿಂದ',
      Telugu: 'EMI ₹15,999 నుండి',
      Malayalam: 'EMI ₹15,999 മുതൽ',
      Punjabi: 'EMI ₹15,999 ਤੋਂ'
    },
    '₹99,000 Down Payment': {
      English: '₹99,000 Down Payment',
      Hindi: '₹99,000 डाउन पेमेंट',
      Gujarati: '₹99,000 ડાઉન પેમેન્ટ',
      Marathi: '₹99,000 डाउन पेमेंट',
      Bengali: '₹99,000 ডাউন পেমেন্ট',
      Tamil: '₹99,000 முன்பணம்',
      Kannada: '₹99,000 ಮುಂಗಡ ಹಣ',
      Telugu: '₹99,000 ముందస్తు చెల్లింపు',
      Malayalam: '₹99,000 മുൻകൂർ പണം',
      Punjabi: '₹99,000 ਐਡਵਾਂਸ ਭੁਗਤਾਨ'
    },
    'Free Accessories Worth ₹35,000': {
      English: 'Free Accessories Worth ₹35,000',
      Hindi: '₹35,000 के मुफ्त एक्सेसरीज',
      Gujarati: '₹35,000 ની મફત એક્સેસરીઝ',
      Marathi: '₹35,000 च्या मोफत अॅक्सेसरीज',
      Bengali: '₹35,000 মূল্যের বিনামূল্যে আনুষাঙ্গিক',
      Tamil: '₹35,000 மதிப்புள்ள இலவச பாகங்கள்',
      Kannada: '₹35,000 ಮೌಲ್ಯದ ಉಚಿತ ಪರಿಕರಗಳು',
      Telugu: '₹35,000 విలువైన ఉచిత ఉపకరణాలు',
      Malayalam: '₹35,000 വിലയുള്ള സൗജന്യ ആക്സസറികൾ',
      Punjabi: '₹35,000 ਦੀਆਂ ਮੁਫਤ ਐਕਸੈਸਰੀਜ਼'
    },
    'Exchange Bonus ₹25,000': {
      English: 'Exchange Bonus ₹25,000',
      Hindi: 'एक्सचेंज बोनस ₹25,000',
      Gujarati: 'એક્સચેન્જ બોનસ ₹25,000',
      Marathi: 'एक्सचेंज बोनस ₹25,000',
      Bengali: 'এক্সচেঞ্জ বোনাস ₹25,000',
      Tamil: 'பரிமாற்ற போனஸ் ₹25,000',
      Kannada: 'ವಿನಿಮಯ ಬೋನಸ್ ₹25,000',
      Telugu: 'మార్పిడి బోనస్ ₹25,000',
      Malayalam: 'എക്സ്ചേഞ്ച് ബോണസ് ₹25,000',
      Punjabi: 'ਐਕਸਚੇਂਜ ਬੋਨਸ ₹25,000'
    },
    'Zero Processing Fee': {
      English: 'Zero Processing Fee',
      Hindi: 'शून्य प्रोसेसिंग शुल्क',
      Gujarati: 'શૂન્ય પ્રોસેસિંગ ફી',
      Marathi: 'शून्य प्रोसेसिंग फी',
      Bengali: 'শূন্য প্রসেসিং ফি',
      Tamil: 'பூஜ்ய செயலாக்க கட்டணம்',
      Kannada: 'ಶೂನ್ಯ ಪ್ರಕ್ರಿಯೆ ಶುಲ್ಕ',
      Telugu: 'జీరో ప్రాసెసింగ్ ఫీజు',
      Malayalam: 'സീറോ പ്രോസസ്സിംഗ് ഫീസ്',
      Punjabi: 'ਜ਼ੀਰੋ ਪ੍ਰੋਸੈਸਿੰਗ ਫੀਸ'
    }
  },
  titles: {
    'Drive Your Ambition': {
      English: 'Drive Your Ambition',
      Hindi: 'अपनी महत्वाकांक्षा को चलाएं',
      Gujarati: 'તમારી મહત્વાકાંક્ષા ચલાવો',
      Marathi: 'तुमची महत्त्वाकांक्षा चालवा',
      Bengali: 'আপনার উচ্চাকাঙ্ক্ষা চালান',
      Tamil: 'உங்கள் லட்சியத்தை ஓட்டுங்கள்',
      Kannada: 'ನಿಮ್ಮ ಮಹತ್ತ್ವಾಕಾಂಕ್ಷೆಯನ್ನು ಓಡಿಸಿ',
      Telugu: 'మీ ఆశయాన్ని నడపండి',
      Malayalam: 'നിങ്ങളുടെ അഭിലാഷം ഓടിക്കുക',
      Punjabi: 'ਆਪਣੀ ਅਭਿਲਾਸ਼ਾ ਨੂੰ ਚਲਾਓ'
    },
    'Born to Explore': {
      English: 'Born to Explore',
      Hindi: 'खोज के लिए जन्मे',
      Gujarati: 'શોધવા માટે જન્મેલા',
      Marathi: 'शोधण्यासाठी जन्मलेले',
      Bengali: 'অন্বেষণের জন্য জন্মগ্রহণ',
      Tamil: 'ஆராய பிறந்தவர்',
      Kannada: 'ಅನ್ವೇಷಿಸಲು ಹುಟ್ಟಿದವರು',
      Telugu: 'అన్వేషించడానికి పుట్టారు',
      Malayalam: 'പര്യവേക്ഷണത്തിനായി ജനിച്ചവർ',
      Punjabi: 'ਖੋਜ ਲਈ ਜਨਮੇ'
    },
    'Redefine the Road': {
      English: 'Redefine the Road',
      Hindi: 'सड़क को फिर से परिभाषित करें',
      Gujarati: 'રસ્તાને ફરીથી વ્યાખ્યાયિત કરો',
      Marathi: 'रस्त्याची पुनर्व्याख्या करा',
      Bengali: 'রাস্তা পুনর্সংজ্ঞায়িত করুন',
      Tamil: 'சாலையை மறுவரையறை செய்யுங்கள்',
      Kannada: 'ರಸ್ತೆಯನ್ನು ಮರುವ್ಯಾಖ್ಯಾನಿಸಿ',
      Telugu: 'రహదారిని పునర్నిర్వచించండి',
      Malayalam: 'റോഡ് പുനർനിർവചിക്കുക',
      Punjabi: 'ਸੜਕ ਨੂੰ ਮੁੜ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ'
    },
    'Power Meets Style': {
      English: 'Power Meets Style',
      Hindi: 'शक्ति शैली से मिलती है',
      Gujarati: 'શક્તિ શૈલીને મળે છે',
      Marathi: 'शक्ती शैलीला भेटते',
      Bengali: 'শক্তি শৈলীর সাথে মিলিত হয়',
      Tamil: 'சக்தி பாணியை சந்திக்கிறது',
      Kannada: 'ಶಕ್ತಿ ಶೈಲಿಯನ್ನು ಭೇಟಿಯಾಗುತ್ತದೆ',
      Telugu: 'శక్తి శైలిని కలుస్తుంది',
      Malayalam: 'ശക്തി ശൈലിയെ കണ്ടുമുട്ടുന്നു',
      Punjabi: 'ਸ਼ਕਤੀ ਸ਼ੈਲੀ ਨੂੰ ਮਿਲਦੀ ਹੈ'
    },
    'The Road Awaits': {
      English: 'The Road Awaits',
      Hindi: 'सड़क इंतजार कर रही है',
      Gujarati: 'રસ્તો રાહ જુએ છે',
      Marathi: 'रस्ता वाट पाहत आहे',
      Bengali: 'রাস্তা অপেক্ষা করছে',
      Tamil: 'சாலை காத்திருக்கிறது',
      Kannada: 'ರಸ್ತೆ ಕಾಯುತ್ತಿದೆ',
      Telugu: 'రహదారి వేచి ఉంది',
      Malayalam: 'റോഡ് കാത്തിരിക്കുന്നു',
      Punjabi: 'ਸੜਕ ਉਡੀਕ ਕਰ ਰਹੀ ਹੈ'
    },
    'Built Without Compromise': {
      English: 'Built Without Compromise',
      Hindi: 'बिना समझौता किए बनाया गया',
      Gujarati: 'સમાધાન વિના બનાવેલ',
      Marathi: 'तडजोड न करता बांधले',
      Bengali: 'আপস ছাড়াই নির্মিত',
      Tamil: 'சமரசம் இல்லாமல் கட்டப்பட்டது',
      Kannada: 'ರಾಜಿ ಇಲ್ಲದೆ ನಿರ್ಮಿಸಲಾಗಿದೆ',
      Telugu: 'రాజీ లేకుండా నిర్మించబడింది',
      Malayalam: 'വിട്ടുവീഴ്ച ഇല്ലാതെ നിർമ്മിച്ചത്',
      Punjabi: 'ਸਮਝੌਤਾ ਕੀਤੇ ਬਿਨਾਂ ਬਣਾਇਆ ਗਿਆ'
    }
  },
  dealer: {
    English: 'Samsung SmartPlaza – Sahil Electronics',
    Hindi: 'सैमसंग स्मार्टप्लाज़ा – साहिल इलेक्ट्रॉनिक्स',
    Gujarati: 'સેમસંગ સ્માર્ટપ્લાઝા – સાહિલ ઇલેક્ટ્રોનિક્સ',
    Marathi: 'सॅमसंग स्मार्टप्लाझा – साहिल इलेक्ट्रॉनिक्स',
    Bengali: 'স্যামসাং স্মার্টপ্লাজা – সাহিল ইলেকট্রনিক্স',
    Tamil: 'சாம்சங் ஸ்மார்ட்பிளாசா – சாஹில் எலக்ட்ரானிக்ஸ்',
    Kannada: 'ಸ್ಯಾಮ್‌ಸಂಗ್ ಸ್ಮಾರ್ಟ್‌ಪ್ಲಾಜಾ – ಸಾಹಿಲ್ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
    Telugu: 'సామ్‌సంగ్ స్మార్ట్‌ప్లాజా – సాహిల్ ఎలక్ట్రానిక్స్',
    Malayalam: 'സാംസങ് സ്മാർട്ട്‌പ്ലാസ – സാഹിൽ ഇലക്ട്രോണിക്സ്',
    Punjabi: 'ਸੈਮਸੰਗ ਸਮਾਰਟਪਲਾਜ਼ਾ – ਸਾਹਿਲ ਇਲੈਕਟ੍ਰਾਨਿਕਸ'
  }
};
function translate(
text: string,
language: string,
type: 'offers' | 'titles' | 'dealer')
: string {
  if (type === 'dealer') {
    return (
      TRANSLATIONS.dealer[language as keyof typeof TRANSLATIONS.dealer] || text);

  }
  const dict = TRANSLATIONS[type] as Record<string, Record<string, string>>;
  return dict[text]?.[language] || text;
}
// ============================================================
// LIBRARY (pre-built finished creatives)
// ============================================================
const LIBRARY_CREATIVES = [
{
  id: 'lib-1',
  model: 'Galaxy Z Fold8 Ultra 5G',
  variant: 'Phantom Black',
  bg: BACKGROUNDS[0].img,
  car: MODELS[0].variants[0].img,
  title: 'Galaxy AI is Here',
  offer: 'No Cost EMI from ₹2,999/mo',
  language: 'English',
  size: '1200×628',
  createdOn: '12 May',
  status: 'In use'
},
{
  id: 'lib-2',
  model: 'Neo QLED 8K QN900D',
  variant: 'Graphite Black',
  bg: BACKGROUNDS[1].img,
  car: MODELS[2].variants[0].img,
  title: 'Open to Wonder',
  offer: 'Exchange Bonus up to ₹15,000',
  language: 'Hindi',
  size: '1080×1080',
  createdOn: '08 May',
  status: 'In use'
},
{
  id: 'lib-3',
  model: 'Bespoke French Door RF57DG',
  variant: 'Glam Navy + Steel',
  bg: BACKGROUNDS[2].img,
  car: MODELS[3].variants[0].img,
  title: 'Do the Bespoke Life',
  offer: 'Festive ₹8,000 Cashback',
  language: 'English',
  size: '1200×628',
  createdOn: '02 May',
  status: 'Draft'
},
{
  id: 'lib-4',
  model: 'Galaxy S24 Ultra 5G',
  variant: 'Titanium Gray',
  bg: BACKGROUNDS[4].img,
  car: MODELS[1].variants[0].img,
  title: 'Experience the Extraordinary',
  offer: 'Free Galaxy Buds Worth ₹9,999',
  language: 'Marathi',
  size: '1080×1080',
  createdOn: '28 Apr',
  status: 'In use'
},
{
  id: 'lib-5',
  model: 'Bespoke AI Washer WW11DG',
  variant: 'Silver Steel',
  bg: BACKGROUNDS[2].img,
  car: MODELS[4].variants[0].img,
  title: 'Innovation for Every Home',
  offer: '3-Year Warranty Free',
  language: 'English',
  size: '1080×1080',
  createdOn: '22 Apr',
  status: 'In use'
}];

const DEALER = {
  name: 'Samsung SmartPlaza – Sahil Electronics',
  branch: 'Sarojini Nagar, New Delhi',
  phone: '+91 98765 43210'
};
// ============================================================
// MAIN COMPONENT
// ============================================================
export function Studio() {
  const [view, setView] = useState<'library' | 'composer'>('library');
  if (view === 'library') return <Library onNew={() => setView('composer')} />;
  return <Composer onBack={() => setView('library')} />;
}
// ============================================================
// LIBRARY VIEW
// ============================================================
function Library({ onNew }: {onNew: () => void;}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Creative Studio</h1>
          <p className="text-sm text-gray-500">
            Your published and draft campaign creatives
          </p>
        </div>
        <button
          onClick={onNew}
          className="h-10 px-5 rounded-full bg-[var(--brand-indigo)] hover:bg-[#1a0a8a] text-white text-sm font-semibold flex items-center gap-2 transition-colors">
          
          <Plus size={16} /> Create new
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {LIBRARY_CREATIVES.map((c) =>
        <CreativeCard key={c.id} creative={c} onClick={onNew} />
        )}
        <button
          onClick={onNew}
          className="sp-card border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center py-16 text-gray-500 hover:text-blue-600">
          
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <Plus size={20} />
          </div>
          <span className="text-sm font-semibold">Create new creative</span>
          <span className="text-xs text-gray-400 mt-1">
            Product → Colour → Background → Copy
          </span>
        </button>
      </div>
    </div>);

}
function CreativeCard({
  creative,
  onClick



}: {creative: (typeof LIBRARY_CREATIVES)[number];onClick: () => void;}) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-md transition-all bg-white group">
      
      <div className="aspect-square relative overflow-hidden">
        {/* Background — square, fills the canvas */}
        <img
          src={creative.bg}
          alt={creative.model}
          className="absolute inset-0 w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Car cutout — same square dimensions as background, overlaid 1:1.
             Transparent areas of the car PNG reveal the background underneath. */}
        <img
          src={creative.car}
          alt={creative.variant}
          className="absolute inset-0 w-full h-full object-cover drop-shadow-2xl" />
        

        {/* Offer pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-md">
          {creative.offer}
        </div>

        {/* Status pill */}
        <div
          className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ${creative.status === 'In use' ? 'bg-emerald-500 text-white' : 'bg-white/90 text-gray-700'}`}>
          
          {creative.status}
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white font-bold text-lg leading-tight drop-shadow-lg">
            {creative.title}
          </div>
          <div className="text-white/90 text-[10px] mt-1 drop-shadow">
            {DEALER.name} · {DEALER.branch}
          </div>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {creative.model} · {creative.variant}
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">
            {creative.size} · {creative.language} · {creative.createdOn}
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={(e) => e.stopPropagation()}
            title="Duplicate"
            className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
            
            <Copy size={13} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            title="Download"
            className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
            
            <Download size={13} />
          </button>
        </div>
      </div>
    </div>);

}
// ============================================================
// COMPOSER VIEW
// ============================================================
type Selection = {
  modelId: string;
  variantId: string;
  backgroundId: string;
  language: string;
  offer: string;
  title: string;
};
function Composer({ onBack }: {onBack: () => void;}) {
  const [sel, setSel] = useState<Selection>({
    modelId: 'zfold8',
    variantId: '',
    backgroundId: '',
    language: 'English',
    offer: '',
    title: ''
  });
  const [saved, setSaved] = useState(false);
  const model = MODELS.find((m) => m.id === sel.modelId)!;
  const variant = model.variants.find((v) => v.id === sel.variantId);
  const background = BACKGROUNDS.find((b) => b.id === sel.backgroundId);
  const showPreview = !!background; // Preview only after background pick
  const update = (patch: Partial<Selection>) =>
  setSel({
    ...sel,
    ...patch
  });
  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-blue-600 hover:underline mb-1 flex items-center gap-1">
            
            <ArrowLeft size={14} /> Back to Library
          </button>
          <h1 className="page-title">Create new creative</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={!showPreview || !sel.title || !sel.offer}
          className="h-10 px-5 rounded-full bg-[var(--brand-indigo)] hover:bg-[#1a0a8a] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-2 transition-colors">
          
          <Download size={14} /> Save & Download
        </button>
      </div>

      {/* Saved toast */}
      {saved &&
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 text-white shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
          </div>
          <div className="text-sm font-semibold">Creative Saved</div>
        </div>
      }

      <div className="grid grid-cols-[1fr_460px] gap-5 items-start">
        {/* Left — selectors */}
        <div className="flex flex-col gap-4">
          <Section title="1 · Product" icon={<ImageIcon size={14} />}>
            <div className="grid grid-cols-3 gap-3">
              {MODELS.map((m) =>
              <button
                key={m.id}
                onClick={() =>
                update({
                  modelId: m.id,
                  variantId: ''
                })
                }
                className={`p-3 rounded-xl border-2 text-left transition-all overflow-hidden ${sel.modelId === m.id ? 'border-blue-500 bg-blue-50/40' : 'border-gray-200 hover:border-gray-300'}`}>
                
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-contain" />
                  
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {m.name}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {m.tagline}
                  </div>
                </button>
              )}
            </div>
          </Section>

          <Section
            title={`2 · Colour / Variant${variant ? ` · ${variant.name}` : ''}`}>
            
            <div className="grid grid-cols-4 gap-3">
              {model.variants.map((v) =>
              <button
                key={v.id}
                onClick={() =>
                update({
                  variantId: v.id
                })
                }
                className={`p-2.5 rounded-xl border-2 text-left transition-all ${sel.variantId === v.id ? 'border-blue-500 bg-blue-50/40' : 'border-gray-200 hover:border-gray-300'}`}>
                
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 relative">
                    <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-contain" />
                  
                    <div
                    className="absolute bottom-1 left-1 w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{
                      backgroundColor: v.hex
                    }} />
                  
                  </div>
                  <div className="text-xs font-medium text-gray-900 truncate">
                    {v.name}
                  </div>
                </button>
              )}
            </div>
          </Section>

          <Section title="3 · Background">
            <div className="grid grid-cols-3 gap-3">
              {BACKGROUNDS.map((b) =>
              <button
                key={b.id}
                onClick={() =>
                update({
                  backgroundId: b.id
                })
                }
                className={`rounded-xl border-2 overflow-hidden text-left transition-all relative ${sel.backgroundId === b.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}>
                
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                    src={b.img}
                    alt={b.name}
                    className="w-full h-full object-cover" />
                  
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-[11px] font-medium text-white">
                    {b.name}
                  </div>
                  {sel.backgroundId === b.id &&
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                }
                </button>
              )}
            </div>
          </Section>

          <Section title="4 · Offer">
            <div className="flex flex-wrap gap-2 mb-2.5">
              {OFFERS.map((offer) =>
              <button
                key={offer}
                onClick={() =>
                update({
                  offer
                })
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${sel.offer === offer ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                
                  {offer}
                </button>
              )}
            </div>
            <input
              value={sel.offer}
              onChange={(e) =>
              update({
                offer: e.target.value
              })
              }
              placeholder="…or type a custom offer"
              className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:outline-none" />
            
          </Section>

          <Section title="5 · Title">
            <div className="grid grid-cols-2 gap-2 mb-2.5">
              {TITLES.map((t) =>
              <button
                key={t}
                onClick={() =>
                update({
                  title: t
                })
                }
                className={`px-3.5 py-2 rounded-lg text-left text-sm font-medium border transition-colors ${sel.title === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                
                  {t}
                </button>
              )}
            </div>
            <input
              value={sel.title}
              onChange={(e) =>
              update({
                title: e.target.value
              })
              }
              placeholder="…or write your own title"
              className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:outline-none" />
            
            <button className="mt-2 text-xs text-purple-600 hover:underline flex items-center gap-1 font-medium">
              <Wand2 size={11} /> Generate with AI
            </button>
          </Section>

          <Section title="6 · Language">
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) =>
              <button
                key={lang}
                onClick={() =>
                update({
                  language: lang
                })
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${sel.language === lang ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                
                  {lang}
                </button>
              )}
            </div>
          </Section>
        </div>

        {/* Right — Live preview */}
        <div className="sticky top-24">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Live preview
              </div>
              {showPreview &&
              <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Updating live
                </div>
              }
            </div>

            <div className="p-4">
              {!showPreview ?
              <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                    <Sparkles size={22} className="text-gray-400" />
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    Preview will appear here
                  </div>
                  <div className="text-xs text-gray-500 max-w-[260px]">
                    {!sel.variantId ?
                  'Pick a product and colour variant, then choose a background to see your creative come to life.' :
                  'Pick a background to start the preview.'}
                  </div>

                  {/* Progress checklist */}
                  <div className="mt-5 w-full max-w-[240px] space-y-1.5 text-left">
                    <Step done={!!sel.modelId} label="Product" />
                    <Step done={!!sel.variantId} label="Colour variant" />
                    <Step done={!!sel.backgroundId} label="Background" />
                  </div>
                </div> :

              <PreviewCard
                bg={background!.img}
                car={variant?.img || model.variants[0].img}
                carName={`${model.name} · ${variant?.name || ''}`}
                title={sel.title}
                offer={sel.offer}
                language={sel.language} />

              }
            </div>

            {showPreview &&
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between text-[11px] text-gray-500">
                <span>1200×1200 · Square + Story sizes auto-generated</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Heart size={13} />
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}
// ============================================================
// HELPERS
// ============================================================
function Section({
  title,
  icon,
  children




}: {title: string;icon?: React.ReactNode;children: React.ReactNode;}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-700">
          {title}
        </div>
      </div>
      {children}
    </div>);

}
function Step({ done, label }: {done: boolean;label: string;}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
        
        {done ?
        <Check size={9} strokeWidth={3.5} /> :

        <span className="w-1 h-1 rounded-full bg-current" />
        }
      </div>
      <span className={done ? 'text-gray-700 font-medium' : 'text-gray-400'}>
        {label}
      </span>
    </div>);

}
function PreviewCard({
  bg,
  car,
  carName,
  title,
  offer,
  language







}: {bg: string;car: string;carName: string;title: string;offer: string;language: string;}) {
  const translatedOffer = translate(offer, language, 'offers');
  const translatedTitle = translate(title, language, 'titles');
  const translatedDealer = translate(DEALER.name, language, 'dealer');
  return (
    <div className="aspect-square rounded-xl overflow-hidden relative shadow-lg">
      {/* Background — square, fills the canvas */}
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />

      {/* Car cutout — same square dimensions as background, overlaid 1:1.
                                           Transparent areas of the car PNG reveal the background underneath. */}
      <img
        src={car}
        alt={carName}
        className="absolute inset-0 w-full h-full object-cover drop-shadow-2xl" />
      

      {/* Offer pill */}
      {offer &&
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg animate-in fade-in slide-in-from-top-2 z-10">
          {translatedOffer}
        </div>
      }

      {/* Language pill */}
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-semibold text-gray-700 z-10">
        {language}
      </div>

      {/* Title + dealer */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
        <div className="font-extrabold text-2xl leading-tight drop-shadow-lg">
          {translatedTitle || 'Your Title Here'}
        </div>
        <div className="text-xs text-white/80 mt-1">{carName}</div>
        <div className="h-px bg-white/30 my-3" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#1428A0] flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <div className="text-[11px] leading-tight">
            <div className="font-bold">{translatedDealer}</div>
            <div className="text-white/70">
              {DEALER.branch} · {DEALER.phone}
            </div>
          </div>
        </div>
      </div>
    </div>);

}