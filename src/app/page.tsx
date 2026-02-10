'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import PhotoGallery from './components/PhotoGallery'
import MusicSection from './components/MusicSection'

// Translations — 3-language support
const translations = {
  en: {
    // Nav
    home: 'Home',
    navGallery: 'Gallery',
    navBlessings: 'Blessings',
    donate: 'Donate',

    // Hero
    eventDate: 'December 29, 2025',
    heroSubtitle: 'First year of blessings',

    // Countdown Labels
    days: 'Days',
    hrs: 'Hours',
    min: 'Minutes',
    sec: 'Seconds',

    // Gratitude
    hostTitle: 'Letter of Gratitude',
    hostSubtitle: 'From Our Hearts',
    hostDear: 'Dear Family & Friends,',
    hostMessage1: 'We are overwhelmed with joy as we celebrate the first year of our precious son,',
    hostMessage2: 'Your love and support have been the greatest gift. We are so grateful for your presence in his life 💛',

    // Blessings / Gifts
    nasiTitle: 'Virtual Blessings',
    nasiSubtitle: 'Send a Gift',
    fundingGoal: 'Blessings Fund',
    fundingHelp: 'Every gift is a beautiful blessing for Matteo\'s future',
    tier50: 'Blessing',
    tier100: 'Heartfelt Gift',
    tier150: 'Golden Godparent',
    tier250: 'Protector',
    tier500: 'Guardian Angel',
    popular: 'Popular',
    everyGift: '🔒 Secure payments via Stripe. Every gift goes to Matteo\'s future.',

    // Leaderboard
    leaderboardTitle: 'Top Supporters',
    leaderboardSubtitle: 'Hall of Blessings',
    beAmong: 'Be among Matteo\'s first supporters 🏆',

    // Achievements
    achievementsTitle: 'Community Achievements',
    achFirst: 'First Gift',
    achHalf: 'Halfway',
    achGoal: 'Goal!',
    achTop: 'Champion',

    // Timeline
    timelinePreTitle: 'Milestones',
    timelineTitle: 'A Year of Firsts',
    milestoneBirth: 'Hello World',
    milestoneBirthDate: 'Dec 29, 2024',
    milestoneBirthQuote: 'The day our world changed forever. Born at 3.4kg of pure joy.',
    milestoneSmile: 'First Smile',
    milestoneSmileDate: 'Feb 12, 2025',
    milestoneSmileQuote: 'That first real smile that melted our hearts completely.',
    milestoneFood: 'First Solid Food',
    milestoneFoodDate: 'Jun 10, 2025',
    milestoneFoodQuote: 'Discovering new flavors, creating the cutest mess.',
    milestoneSteps: 'First Steps',
    milestoneStepsDate: 'Sep 24, 2025',
    milestoneStepsQuote: 'Wobbly but determined — our little explorer.',
    milestoneWord: 'First Word',
    milestoneWordDate: 'Oct 5, 2025',
    milestoneWordQuote: '"Mama" — the sweetest sound in the world.',
    milestoneNext: 'Next Chapter',
    milestoneNextDate: 'Coming Soon...',
    milestoneNextQuote: 'The adventure continues...',

    // Gallery
    photosTitle: 'Photo Gallery',
    photosSubtitle: 'Cherished Moments',

    // Videos
    videosTitle: 'Sweet Moments',
    videosSubtitle: "Matteo's Videos",

    // Music
    musicTitle: 'Music for the Soul',
    musicSubtitle: 'Hymns & Lullabies',

    // Contact
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Contact',
    guestOfHonor: 'Our Little Star 🌟',
    questions: 'Questions? Contact us!',

    // Footer
    footerLove: 'With love from the Kaya & Botez Family',
    footerBless: '† God Bless Matteo †',
  },
  nl: {
    home: 'Home',
    navGallery: 'Galerie',
    navBlessings: 'Zegeningen',
    donate: 'Doneer',
    eventDate: '29 December 2025',
    heroSubtitle: 'Eerste jaar van zegeningen',
    days: 'Dagen',
    hrs: 'Uren',
    min: 'Minuten',
    sec: 'Seconden',
    hostTitle: 'Dankbrief',
    hostSubtitle: 'Vanuit Ons Hart',
    hostDear: 'Lieve Familie & Vrienden,',
    hostMessage1: 'We zijn overweldigd van vreugde terwijl we het eerste jaar van onze dierbare zoon vieren,',
    hostMessage2: 'Jullie liefde en steun zijn het grootste cadeau. We zijn zo dankbaar voor jullie aanwezigheid in zijn leven 💛',
    nasiTitle: 'Virtuele Zegeningen',
    nasiSubtitle: 'Stuur een Cadeau',
    fundingGoal: 'Zegeningen Fonds',
    fundingHelp: 'Elk cadeau is een mooie zegen voor Matteo\'s toekomst',
    tier50: 'Zegen',
    tier100: 'Cadeau van het Hart',
    tier150: 'Gouden Peetouder',
    tier250: 'Beschermer',
    tier500: 'Beschermengel',
    popular: 'Populair',
    everyGift: '🔒 Veilige betalingen via Stripe. Elk cadeau gaat naar Matteo\'s toekomst.',
    leaderboardTitle: 'Top Supporters',
    leaderboardSubtitle: 'Zal der Zegeningen',
    beAmong: 'Wees bij Matteo\'s eerste supporters 🏆',
    achievementsTitle: 'Community Achievements',
    achFirst: 'Eerste Cadeau',
    achHalf: 'Halverwege',
    achGoal: 'Doel!',
    achTop: 'Kampioen',
    timelinePreTitle: 'Mijlpalen',
    timelineTitle: 'Een Jaar van Eersten',
    milestoneBirth: 'Hallo Wereld',
    milestoneBirthDate: '29 dec 2024',
    milestoneBirthQuote: 'De dag dat onze wereld voor altijd veranderde. Geboren met 3,4 kg pure vreugde.',
    milestoneSmile: 'Eerste Lach',
    milestoneSmileDate: '12 feb 2025',
    milestoneSmileQuote: 'Die eerste echte lach die ons hart volledig deed smelten.',
    milestoneFood: 'Eerste Vaste Voeding',
    milestoneFoodDate: '10 jun 2025',
    milestoneFoodQuote: 'Nieuwe smaken ontdekken, de liefste rommel maken.',
    milestoneSteps: 'Eerste Stapjes',
    milestoneStepsDate: '24 sep 2025',
    milestoneStepsQuote: 'Wiebelend maar vastberaden — onze kleine ontdekker.',
    milestoneWord: 'Eerste Woordje',
    milestoneWordDate: '5 okt 2025',
    milestoneWordQuote: '"Mama" — het liefste geluid ter wereld.',
    milestoneNext: 'Volgend Hoofdstuk',
    milestoneNextDate: 'Binnenkort...',
    milestoneNextQuote: 'Het avontuur gaat door...',
    photosTitle: 'Fotogalerie',
    photosSubtitle: 'Gekoesterde Momenten',
    videosTitle: 'Lieve Momentjes',
    videosSubtitle: "Matteo's Video's",
    musicTitle: 'Muziek voor de Ziel',
    musicSubtitle: 'Psalmen & Slaapliedjes',
    contactTitle: 'Neem Contact Op',
    contactSubtitle: 'Contact',
    guestOfHonor: 'Ons Sterretje 🌟',
    questions: 'Vragen? Neem contact op!',
    footerLove: 'Met liefde van de Familie Kaya & Botez',
    footerBless: '† God Zegene Matteo †',
  },
  ro: {
    home: 'Acasă',
    navGallery: 'Galerie',
    navBlessings: 'Binecuvântări',
    donate: 'Donează',
    eventDate: '29 Decembrie 2025',
    heroSubtitle: 'Primul an de binecuvântări',
    days: 'Zile',
    hrs: 'Ore',
    min: 'Minute',
    sec: 'Secunde',
    hostTitle: 'Scrisoare de Recunoștință',
    hostSubtitle: 'Din Inimile Noastre',
    hostDear: 'Dragă Familie și Prieteni,',
    hostMessage1: 'Suntem copleșiți de bucurie în timp ce sărbătorim primul an al prețiosului nostru fiu,',
    hostMessage2: 'Dragostea și sprijinul vostru au fost cel mai mare dar. Vă suntem recunoscători pentru prezența voastră în viața lui 💛',
    nasiTitle: 'Binecuvântări Virtuale',
    nasiSubtitle: 'Trimite un Cadou',
    fundingGoal: 'Fondul de Binecuvântări',
    fundingHelp: 'Fiecare dar este o binecuvântare pentru viitorul lui Matteo',
    tier50: 'Binecuvântare',
    tier100: 'Dar de Suflet',
    tier150: 'Naș de Aur',
    tier250: 'Protector',
    tier500: 'Înger Păzitor',
    popular: 'Popular',
    everyGift: '🔒 Plăți sigure prin Stripe. Fiecare dar este pentru viitorul lui Matteo.',
    leaderboardTitle: 'Top Susținători',
    leaderboardSubtitle: 'Sala Binecuvântărilor',
    beAmong: 'Fii printre primii susținători ai lui Matteo 🏆',
    achievementsTitle: 'Realizări Comunitate',
    achFirst: 'Primul Dar',
    achHalf: 'Jumătate',
    achGoal: 'Obiectiv!',
    achTop: 'Campion',
    timelinePreTitle: 'Etape',
    timelineTitle: 'Un An de Premiere',
    milestoneBirth: 'Bun Venit pe Lume',
    milestoneBirthDate: '29 dec 2024',
    milestoneBirthQuote: 'Ziua în care lumea noastră s-a schimbat pentru totdeauna. Născut cu 3,4 kg de bucurie pură.',
    milestoneSmile: 'Primul Zâmbet',
    milestoneSmileDate: '12 feb 2025',
    milestoneSmileQuote: 'Primul zâmbet adevărat care ne-a topit inimile.',
    milestoneFood: 'Prima Mâncare Solidă',
    milestoneFoodDate: '10 iun 2025',
    milestoneFoodQuote: 'Descoperind arome noi, creând cele mai drăguțe dezordini.',
    milestoneSteps: 'Primii Pași',
    milestoneStepsDate: '24 sep 2025',
    milestoneStepsQuote: 'Tremurând dar hotărât — micul nostru explorator.',
    milestoneWord: 'Primul Cuvânt',
    milestoneWordDate: '5 oct 2025',
    milestoneWordQuote: '"Mama" — cel mai dulce sunet din lume.',
    milestoneNext: 'Următorul Capitol',
    milestoneNextDate: 'În curând...',
    milestoneNextQuote: 'Aventura continuă...',
    photosTitle: 'Galerie Foto',
    photosSubtitle: 'Momente Prețioase',
    videosTitle: 'Momente Drăguțe',
    videosSubtitle: 'Filmulețe cu Matteo',
    musicTitle: 'Muzică pentru Suflet',
    musicSubtitle: 'Pricesne și Cântări',
    contactTitle: 'Contact',
    contactSubtitle: 'Ia Legătura',
    guestOfHonor: 'Steluța Noastră 🌟',
    questions: 'Întrebări? Contactează-ne!',
    footerLove: 'Cu dragoste de la Familia Kaya & Botez',
    footerBless: '† Dumnezeu să-l Binecuvânteze pe Matteo †',
  },
};

// Gift tiers with Stripe payment links
const GIFT_TIERS = [
  { amount: 50, label: '€50', icon: 'volunteer_activism', titleKey: 'tier50', paymentLink: 'https://pay.glodinasfinance.com/b/00w6oIb2E1vCcnh5Xjgbm0g' },
  { amount: 100, label: '€100', icon: 'favorite', titleKey: 'tier100', paymentLink: 'https://pay.glodinasfinance.com/b/4gM4gAfiUcagdrl3Pbgbm0h' },
  { amount: 150, label: '€150', icon: 'star', titleKey: 'tier150', popular: true, paymentLink: 'https://pay.glodinasfinance.com/b/4gM28s2w8b6c1ID0CZgbm0i' },
  { amount: 250, label: '€250', icon: 'shield', titleKey: 'tier250', paymentLink: 'https://pay.glodinasfinance.com/b/9B6aEY8Uw0ry3QL99vgbm0j' },
  { amount: 500, label: '€500', icon: 'diamond', titleKey: 'tier500', paymentLink: 'https://pay.glodinasfinance.com/b/dRm9AU1s45LS8715Xjgbm0k' },
];

const FUNDING_GOAL = 1000;

type Language = 'en' | 'nl' | 'ro';

interface LeaderboardEntry {
  rank: number;
  name: string;
  amount: number | null;
  badge: string | null;
  badgeColor: string | null;
  title: string | null;
}

const getBadgeForAmount = (amount: number) => {
  if (amount >= 500) return { badge: 'Înger Păzitor', color: '#00d4ff', title: 'tier500' };
  if (amount >= 250) return { badge: 'Protector', color: '#9966cc', title: 'tier250' };
  if (amount >= 150) return { badge: 'Naș de Aur', color: '#ffd700', title: 'tier150' };
  if (amount >= 100) return { badge: 'Dar de Suflet', color: '#c0c0c0', title: 'tier100' };
  if (amount >= 50) return { badge: 'Binecuvântare', color: '#cd7f32', title: 'tier50' };
  return { badge: 'Supporter', color: '#888', title: null };
};

const emptyLeaders: LeaderboardEntry[] = Array.from({ length: 5 }, (_, i) => ({
  rank: i + 1, name: '—', amount: null, badge: null, badgeColor: null, title: null
}));

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Countdown
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Blessings / Leaderboard
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>(emptyLeaders);
  const [totalFunding, setTotalFunding] = useState(0);
  const fundingPercentage = Math.min((totalFunding / FUNDING_GOAL) * 100, 100);

  // Claim Modal
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimForm, setClaimForm] = useState({ name: '', message: '', tier: 150, isAnonymous: false });
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const t = translations[lang];

  // Language persistence
  useEffect(() => {
    const saved = localStorage.getItem('matteo-lang') as Language | null;
    if (saved && ['en', 'nl', 'ro'].includes(saved)) setLang(saved);
  }, []);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('matteo-lang', newLang);
  };

  // Back to top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const eventDate = new Date('2026-12-29T00:00:00+01:00').getTime();
    const update = () => {
      const d = eventDate - Date.now();
      if (d > 0) {
        setCountdown({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch leaderboard + check payment success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success') === 'true') {
      setShowClaimModal(true);
      window.history.replaceState({}, '', '/');
    }

    (async () => {
      try {
        const res = await fetch('/api/rsvp');
        const data = await res.json() as { rsvps: any[] };
        if (!data.rsvps) return;

        const donors = data.rsvps
          .filter((r: any) => r.donation_tier && r.donation_tier > 0)
          .sort((a: any, b: any) => b.donation_tier - a.donation_tier);

        setTotalFunding(donors.reduce((s: number, d: any) => s + (d.donation_tier || 0), 0));

        const newLeaders: LeaderboardEntry[] = [];
        for (let i = 0; i < 5; i++) {
          if (donors[i]) {
            const d = donors[i];
            const b = getBadgeForAmount(d.donation_tier);
            newLeaders.push({ rank: i + 1, name: d.name, amount: d.donation_tier, badge: b.badge, badgeColor: b.color, title: b.title });
          } else {
            newLeaders.push({ rank: i + 1, name: '—', amount: null, badge: null, badgeColor: null, title: null });
          }
        }
        setLeaders(newLeaders);
      } catch { }
    })();
  }, []);

  // Claim submit
  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClaimLoading(true);
    const anonymousName = lang === 'nl' ? 'Anoniem' : lang === 'ro' ? 'Anonim' : 'Anonymous';
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: claimForm.isAnonymous ? anonymousName : claimForm.name,
          role: 'onlinesupporter',
          donation_tier: claimForm.tier,
          num_guests: 0,
          message: claimForm.message,
        }),
      });
      if (!res.ok) throw new Error();
      setClaimSuccess(true);
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setClaimLoading(false);
    }
  };

  // Share handler
  const shareInvite = async () => {
    const shareData = {
      title: "Matteo's Journey | 1st Birthday",
      text: lang === 'nl' ? 'Vier Matteo\'s eerste verjaardag!' : lang === 'ro' ? 'Sărbătorește prima aniversare a lui Matteo!' : "Celebrate Matteo's first birthday!",
      url: 'https://matteokaya.com',
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { }
    } else {
      navigator.clipboard.writeText('https://matteokaya.com');
      alert(lang === 'nl' ? 'Link gekopieerd!' : lang === 'ro' ? 'Link copiat!' : 'Link copied!');
    }
  };

  // Confetti
  const handleTierHover = (amount: number) => {
    if (amount >= 150) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  // Flags
  const flags: Record<Language, string> = { en: '🇬🇧', nl: '🇳🇱', ro: '🇷🇴' };

  // Achievements
  const achievements = [
    { icon: 'emoji_events', nameKey: 'achFirst' as const, unlocked: totalFunding >= 50 },
    { icon: 'target', nameKey: 'achHalf' as const, unlocked: totalFunding >= FUNDING_GOAL / 2 },
    { icon: 'workspace_premium', nameKey: 'achGoal' as const, unlocked: totalFunding >= FUNDING_GOAL },
    { icon: 'crown', nameKey: 'achTop' as const, unlocked: leaders[0]?.name !== '—' },
  ];

  // Timeline data
  const milestones = [
    { titleKey: 'milestoneBirth', dateKey: 'milestoneBirthDate', quoteKey: 'milestoneBirthQuote', icon: 'child_care', done: true },
    { titleKey: 'milestoneSmile', dateKey: 'milestoneSmileDate', quoteKey: 'milestoneSmileQuote', icon: 'mood', done: true },
    { titleKey: 'milestoneFood', dateKey: 'milestoneFoodDate', quoteKey: 'milestoneFoodQuote', icon: 'restaurant', done: true },
    { titleKey: 'milestoneSteps', dateKey: 'milestoneStepsDate', quoteKey: 'milestoneStepsQuote', icon: 'directions_walk', done: true },
    { titleKey: 'milestoneWord', dateKey: 'milestoneWordDate', quoteKey: 'milestoneWordQuote', icon: 'chat_bubble', done: true },
    { titleKey: 'milestoneNext', dateKey: 'milestoneNextDate', quoteKey: 'milestoneNextQuote', icon: 'auto_awesome', done: false },
  ];

  return (
    <>
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d'][Math.floor(Math.random() * 5)],
            }} />
          ))}
        </div>
      )}

      {/* ========== FIXED NAV ========== */}
      <nav className="site-nav">
        <div className="nav-brand">
          <span className="material-symbols-outlined">cake</span>
          <span>Matteo&apos;s Journey</span>
        </div>
        <div className="nav-links">
          <a onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>{t.home}</a>
          <a onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>{t.navGallery}</a>
          <a onClick={() => document.getElementById('blessings')?.scrollIntoView({ behavior: 'smooth' })}>{t.navBlessings}</a>
        </div>
        <div className="nav-actions">
          <div className="language-switcher">
            {(Object.keys(flags) as Language[]).map((lk) => (
              <button key={lk} onClick={() => handleLangChange(lk)} className={`lang-btn ${lang === lk ? 'active' : ''}`}>
                {flags[lk]}
              </button>
            ))}
          </div>
          <button className="nav-cta" onClick={() => document.getElementById('blessings')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.donate}
          </button>
        </div>
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <div className="main-content">

        {/* ========== HERO GRID ========== */}
        <section id="hero" className="hero-grid animate-in">
          {/* LEFT — Photo */}
          <div className="hero-photo-card">
            <div className="hero-photo-inner">
              <div className="hero-image-wrapper">
                <Image src="/baby-matteo.png" alt="Matteo Kaya Botez" fill style={{ objectFit: 'cover' }} priority />
                <div className="hero-image-overlay" />
                <div className="hero-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>cake</span>
                  1st Birthday
                </div>
                <div className="hero-bottom-content">
                  <h1>Matteo Kaya</h1>
                  <div className="hero-date-line">
                    <div className="divider" />
                    <p>{t.eventDate}</p>
                    <div className="divider" />
                  </div>

                  {/* Countdown */}
                  <div className="hero-countdown">
                    {[
                      { val: countdown.days, lbl: t.days },
                      { val: countdown.hours, lbl: t.hrs },
                      { val: countdown.minutes, lbl: t.min },
                      { val: countdown.seconds, lbl: t.sec },
                    ].map((c, i) => (
                      <div key={i} className="countdown-cell">
                        <div className="value">{c.val}</div>
                        <div className="label">{c.lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* Share */}
                  <button onClick={shareInvite} className="hero-share-btn">
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>share</span>
                    Share the Joy
                    <div className="shimmer-overlay" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Gratitude + Blessings */}
          <div className="hero-right-grid">
            <div className="hero-right-top">
              {/* Gratitude Card */}
              <div className="stitch-card animate-in delay-1">
                <div className="card-glow" style={{ top: '-2rem', right: '-2rem' }} />
                <div className="card-header-row">
                  <div className="card-icon-box">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <div>
                    <div className="title">{t.hostTitle}</div>
                    <div className="subtitle">{t.hostSubtitle}</div>
                  </div>
                </div>
                <div className="gratitude-quote">
                  <span className="big-quote">&ldquo;</span>
                  <p>
                    {t.hostDear}<br /><br />
                    {t.hostMessage1} <span className="highlight">Matteo Kaya Botez</span>.<br /><br />
                    {t.hostMessage2}
                  </p>
                </div>
                <div className="gratitude-divider">
                  <div className="line" />
                  <span className="emoji">✝</span>
                  <div className="line" />
                </div>
              </div>

              {/* Blessings Card */}
              <div id="blessings" className="stitch-card blessings-card animate-in delay-2">
                <div className="card-glow" />
                <div className="card-header-row">
                  <div className="card-icon-box">
                    <span className="material-symbols-outlined">redeem</span>
                  </div>
                  <div>
                    <div className="title">{t.nasiTitle}</div>
                    <div className="subtitle">{t.nasiSubtitle}</div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="funding-progress">
                  <div className="funding-header">
                    <div className="label">
                      <span className="material-symbols-outlined">flag</span>
                      {t.fundingGoal}
                    </div>
                    <div className="amount">€{totalFunding} / €{FUNDING_GOAL}</div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${fundingPercentage}%` }} />
                  </div>
                </div>

                {/* Gift Tiers — First 3 in grid */}
                <div className="gift-tier-grid">
                  {GIFT_TIERS.slice(0, 3).map((tier) => (
                    <a
                      key={tier.amount}
                      href={tier.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`gift-tier-btn ${tier.popular ? 'popular' : ''}`}
                      onMouseEnter={() => handleTierHover(tier.amount)}
                    >
                      {tier.popular && <span className="popular-tag">🔥 {t.popular}</span>}
                      <span className="material-symbols-outlined">{tier.icon}</span>
                      <span className="tier-amount">{tier.label}</span>
                      <span className="tier-name">{t[tier.titleKey as keyof typeof t]}</span>
                    </a>
                  ))}
                </div>

                {/* Remaining tiers below */}
                <div className="gift-tier-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '0.75rem' }}>
                  {GIFT_TIERS.slice(3).map((tier) => (
                    <a
                      key={tier.amount}
                      href={tier.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gift-tier-btn"
                      onMouseEnter={() => handleTierHover(tier.amount)}
                    >
                      <span className="material-symbols-outlined">{tier.icon}</span>
                      <span className="tier-amount">{tier.label}</span>
                      <span className="tier-name">{t[tier.titleKey as keyof typeof t]}</span>
                    </a>
                  ))}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textAlign: 'center', marginTop: '1rem' }}>
                  {t.everyGift}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== LEADERBOARD + ACHIEVEMENTS (Split Card) ========== */}
        <div className="split-card animate-in delay-3" style={{ marginBottom: '5rem' }}>
          <div className="split-card-grid">
            {/* LEFT — Leaderboard */}
            <div className="split-left">
              <div className="card-header-row">
                <div className="card-icon-box">
                  <span className="material-symbols-outlined">social_leaderboard</span>
                </div>
                <div>
                  <div className="title">{t.leaderboardTitle}</div>
                  <div className="subtitle">{t.leaderboardSubtitle}</div>
                </div>
              </div>

              {leaders.map((l) => (
                <div key={l.rank} className="leader-row">
                  <div className="leader-left">
                    <div className={`leader-rank ${l.rank === 1 ? 'gold' : 'silver'}`}>{l.rank}</div>
                    <div>
                      <div className="leader-name">{l.name || '—'}</div>
                      {l.badge && (
                        <div className="leader-badge">{l.badge}{l.amount ? ` • €${l.amount}` : ''}</div>
                      )}
                    </div>
                  </div>
                  {l.name && l.name !== '—' && (
                    <span className="leader-verified material-symbols-outlined">verified</span>
                  )}
                </div>
              ))}

              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem' }}>
                {t.beAmong}
              </p>
            </div>

            {/* RIGHT — Achievements */}
            <div className="split-right" style={{ alignItems: 'center' }}>
              <div className="card-header-row" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div>
                  <div className="subtitle" style={{ marginBottom: '0.5rem' }}>{t.achievementsTitle}</div>
                </div>
              </div>

              <div className="achievements-grid">
                {achievements.map((a, i) => (
                  <div key={i} className={`achievement-item ${a.unlocked ? 'unlocked' : ''}`}>
                    <div className={`achievement-circle ${a.unlocked ? 'unlocked' : 'locked'}`}>
                      <span className="material-symbols-outlined">{a.icon}</span>
                    </div>
                    <div className="achievement-name">{t[a.nameKey]}</div>
                  </div>
                ))}
              </div>

              <p className="achievements-quote">
                &ldquo;Every blessing plants a seed for Matteo&apos;s future.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ========== TIMELINE — A Year of Firsts ========== */}
        <section className="timeline-section">
          <div className="timeline-header animate-in">
            <div className="pre-title">{t.timelinePreTitle}</div>
            <h2>{t.timelineTitle}</h2>
          </div>

          <div className="timeline-track">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 !== 0 ? 'reverse' : ''} animate-in delay-${Math.min(i + 1, 6)}`} style={i % 2 !== 0 ? { flexDirection: 'row-reverse' } : {}}>
                <div className="timeline-left">
                  <div className="timeline-milestone-title">{t[m.titleKey as keyof typeof t]}</div>
                  <div className="timeline-milestone-date">{t[m.dateKey as keyof typeof t]}</div>
                </div>
                <div className={`timeline-dot ${m.done ? '' : 'inactive'}`} />
                <div className="timeline-right">
                  <div className="timeline-quote-card">
                    <span className="material-symbols-outlined">{m.icon}</span>
                    <p>{t[m.quoteKey as keyof typeof t]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="timeline-continues">
            <div className="timeline-continues-pill">
              <div className="pulse-dot" />
              The journey continues...
            </div>
          </div>
        </section>

        {/* ========== GALLERY ========== */}
        <section id="gallery" className="gallery-section animate-in">
          <PhotoGallery
            title={t.photosTitle}
            subtitle={t.photosSubtitle}
          />
        </section>

        {/* ========== VIDEOS ========== */}
        <section className="videos-section animate-in">
          <div className="card-header-row" style={{ marginBottom: '2rem' }}>
            <div className="card-icon-box" style={{ background: 'linear-gradient(135deg, rgba(255,0,80,0.2), transparent)' }}>
              <span className="material-symbols-outlined" style={{ color: '#ff4081' }}>movie</span>
            </div>
            <div>
              <div className="title">{t.videosTitle}</div>
              <div className="subtitle">{t.videosSubtitle}</div>
            </div>
          </div>

          <div className="video-gallery">
            <div className="video-card">
              <div className="video-container">
                <iframe
                  id="video1"
                  src="https://www.youtube.com/embed/YvSe2ZJ5PT0?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=YvSe2ZJ5PT0&playsinline=1&enablejsapi=1"
                  title="Matteo Moment 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                <button
                  className="unmute-btn"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    const iframe = document.getElementById('video1') as HTMLIFrameElement;
                    if (iframe) {
                      const isMuted = iframe.src.includes('mute=1');
                      iframe.src = isMuted ? iframe.src.replace('mute=1', 'mute=0') : iframe.src.replace('mute=0', 'mute=1');
                      btn.textContent = isMuted ? '🔊' : '🔇';
                    }
                  }}
                >🔇</button>
              </div>
              <div className="video-label">💕 Sweet Dreams</div>
            </div>

            <div className="video-card">
              <div className="video-container">
                <iframe
                  id="video2"
                  src="https://www.youtube.com/embed/qwfpDCZIuOE?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=qwfpDCZIuOE&playsinline=1&enablejsapi=1"
                  title="Matteo Moment 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                <button
                  className="unmute-btn"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    const iframe = document.getElementById('video2') as HTMLIFrameElement;
                    if (iframe) {
                      const isMuted = iframe.src.includes('mute=1');
                      iframe.src = isMuted ? iframe.src.replace('mute=1', 'mute=0') : iframe.src.replace('mute=0', 'mute=1');
                      btn.textContent = isMuted ? '🔊' : '🔇';
                    }
                  }}
                >🔇</button>
              </div>
              <div className="video-label">🌟 Little Angel</div>
            </div>
          </div>
        </section>

        {/* ========== CONTENT GRID: Contact ========== */}
        <div className="content-grid">
          <div className="stitch-card contact-card animate-in delay-4">
            <div className="card-header-row">
              <div className="card-icon-box">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <div className="title">{t.contactTitle}</div>
                <div className="subtitle">{t.contactSubtitle}</div>
              </div>
            </div>
            <div className="link-preview">
              <div className="link-avatar">M</div>
              <div>
                <div className="link-name">Matteo Kaya Botez</div>
                <div className="link-role">{t.guestOfHonor}</div>
              </div>
            </div>
            <div className="email-box">
              <p>{t.questions}</p>
              <a href="mailto:cihat@glodinasfinance.com">cihat@glodinasfinance.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MUSIC (Full Width) ========== */}
      <div className="music-wrapper">
        <MusicSection title={t.musicTitle} subtitle={t.musicSubtitle} />
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="site-footer">
        <div className="footer-glow" />
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="material-symbols-outlined">cake</span>
            <span>Matteo&apos;s Journey</span>
          </div>
          <p className="footer-message">{t.footerLove}</p>
          <div className="footer-social">
            <a onClick={shareInvite} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="mailto:cihat@glodinasfinance.com">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
          <p className="footer-blessing">{t.footerBless}</p>
        </div>
      </footer>

      {/* ========== CLAIM MODAL ========== */}
      {showClaimModal && (
        <div className="modal-overlay">
          <div className="claim-modal" onClick={(e) => e.stopPropagation()}>
            {claimSuccess ? (
              <div className="claim-success">
                <div className="emoji">🎉</div>
                <h3>{lang === 'ro' ? 'Mulțumim din suflet!' : 'Thank You!'}</h3>
                <p>
                  {lang === 'ro'
                    ? 'Donația ta apare acum pe lista susținătorilor.'
                    : 'Your donation now appears on the supporter list.'}
                </p>
                <div className="spinner" />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Refreshing...</p>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit}>
                <h2>{lang === 'ro' ? 'Revendică-ți Locul' : 'Claim Your Spot'} 👑</h2>
                <p className="subtitle">
                  {lang === 'ro'
                    ? 'Mulțumim pentru donație! Completează detaliile pentru a apărea în top.'
                    : 'Thank you for your donation! Fill in details to appear on the leaderboard.'}
                </p>

                <div className="form-group">
                  <label>{lang === 'nl' ? 'Naam *' : lang === 'ro' ? 'Nume *' : 'Name *'}</label>
                  <input
                    type="text"
                    required={!claimForm.isAnonymous}
                    disabled={claimForm.isAnonymous}
                    autoFocus
                    value={claimForm.name}
                    onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                  <div className="anon-row">
                    <input
                      type="checkbox"
                      id="anon-check"
                      checked={claimForm.isAnonymous}
                      onChange={(e) => setClaimForm({ ...claimForm, isAnonymous: e.target.checked })}
                    />
                    <label htmlFor="anon-check">
                      {lang === 'nl' ? 'Blijf Anoniem' : lang === 'ro' ? 'Rămâi Anonim' : 'Stay Anonymous'}
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>{lang === 'ro' ? 'Nivel Donație' : 'Donation Amount'}</label>
                  <select
                    value={claimForm.tier}
                    onChange={(e) => setClaimForm({ ...claimForm, tier: Number(e.target.value) })}
                  >
                    {GIFT_TIERS.map((t) => (
                      <option key={t.amount} value={t.amount}>€{t.amount}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{lang === 'ro' ? 'Mesaj (Opțional)' : 'Message (Optional)'}</label>
                  <textarea
                    value={claimForm.message}
                    onChange={(e) => setClaimForm({ ...claimForm, message: e.target.value })}
                    placeholder={lang === 'ro' ? 'Un gând bun...' : 'Leave a message...'}
                  />
                </div>

                <button type="submit" disabled={claimLoading} className="claim-submit-btn">
                  {claimLoading ? 'Saving...' : lang === 'ro' ? 'Publică pe Listă' : 'Publish to Board'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
