'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Header
    home: "Home",
    preview: "Preview",

    // Hero
    eventDate: "Sat, Feb 7, 2:00 PM - 3:00 PM",
    churchName: "Romanian Orthodox Church of St Gregory the Theologian in Schiedam",
    rsvpButton: "RSVP to Ceremony",

    // Host Note
    hostTitle: "Kaya Family",
    hostSubtitle: "Host Note",
    hostDear: "Dear family and friends,",
    hostMessage1: "We are blessed to invite you to witness the holy baptism of our beloved son,",
    hostMessage2: "Join us for this sacred ceremony as Matteo receives his Christian name and becomes a member of the Orthodox Church. Your presence and prayers mean everything to us. 🕊️",

    // Nași & Gifts
    nasiTitle: "Nași & Gifts",
    nasiSubtitle: "Bless Matteo & Unlock Achievements",
    fundingGoal: "Funding Goal",
    fundingHelp: "Help us reach our goal for Matteo's future!",
    everyGift: "Every gift unlocks a unique badge & title! ✨",

    // Gift Tiers
    tier50: "Friend of Family",
    tier100: "Supporter",
    tier150: "Honorary Godparent",
    tier250: "Holy Protector",
    tier500: "Guardian Angel",
    popular: "Popular",

    // Leaderboard
    leaderboardTitle: "Top 5 Nași",
    leaderboardSubtitle: "Hall of Fame",
    beFirst: "Be the first Naș!",
    beAmong: "Be among the first to support Matteo! 🎉",

    // Achievements
    achievementsTitle: "🎖️ Achievements to Unlock",
    achFirst: "First Naș",
    achHalf: "Halfway!",
    achGoal: "Goal Reached",
    achTop: "Top Naș",

    // Weather
    weatherTitle: "Weather",
    weatherSubtitle: "On the Day",
    partlyCloudy: "Partly Cloudy",

    // Maps
    mapsTitle: "Maps",
    getDirections: "Get Directions →",

    // Photos
    photosTitle: "Photos",
    sharedAlbum: "Shared Album",
    addPhotos: "Add Photos",

    // Event Details
    detailsTitle: "Event Details",
    detailsSubtitle: "What to Know",
    dateTime: "Date & Time",
    church: "Church",
    dressCode: "Dress Code",
    dressCodeValue: "Smart Casual / Semi-Formal",

    // Contact
    contactTitle: "Contact",
    contactSubtitle: "Get in Touch",
    guestOfHonor: "Guest of Honor 👶",
    questions: "Questions? Reach out to us!",

    // Footer
    footerLove: "With love from the Kaya & Botez Family",
    footerBless: "✝ God Bless Matteo ✝",
  },
  nl: {
    // Header
    home: "Home",
    preview: "Voorbeeld",

    // Hero
    eventDate: "Za, 7 feb, 14:00 - 15:00",
    churchName: "Roemeens-Orthodoxe Kerk van H. Gregorius de Theoloog in Schiedam",
    rsvpButton: "Bevestig Aanwezigheid",

    // Host Note
    hostTitle: "Familie Kaya",
    hostSubtitle: "Bericht van de Gastheer",
    hostDear: "Lieve familie en vrienden,",
    hostMessage1: "Wij zijn gezegend om u uit te nodigen om getuige te zijn van de heilige doop van onze geliefde zoon,",
    hostMessage2: "Sluit u bij ons aan voor deze heilige ceremonie wanneer Matteo zijn christelijke naam ontvangt en lid wordt van de Orthodoxe Kerk. Uw aanwezigheid en gebeden betekenen alles voor ons. 🕊️",

    // Nași & Gifts
    nasiTitle: "Nași & Cadeaus",
    nasiSubtitle: "Zegen Matteo & Ontgrendel Prestaties",
    fundingGoal: "Doel",
    fundingHelp: "Help ons het doel te bereiken voor Matteo's toekomst!",
    everyGift: "Elk cadeau ontgrendelt een unieke badge & titel! ✨",

    // Gift Tiers
    tier50: "Vriend van de Familie",
    tier100: "Ondersteuner",
    tier150: "Eredoopouder",
    tier250: "Heilige Beschermer",
    tier500: "Beschermengel",
    popular: "Populair",

    // Leaderboard
    leaderboardTitle: "Top 5 Nași",
    leaderboardSubtitle: "Hall of Fame",
    beFirst: "Wees de eerste Naș!",
    beAmong: "Wees een van de eersten om Matteo te steunen! 🎉",

    // Achievements
    achievementsTitle: "🎖️ Prestaties om te Ontgrendelen",
    achFirst: "Eerste Naș",
    achHalf: "Halverwege!",
    achGoal: "Doel Bereikt",
    achTop: "Top Naș",

    // Weather
    weatherTitle: "Weer",
    weatherSubtitle: "Op de Dag",
    partlyCloudy: "Gedeeltelijk Bewolkt",

    // Maps
    mapsTitle: "Kaarten",
    getDirections: "Routebeschrijving →",

    // Photos
    photosTitle: "Foto's",
    sharedAlbum: "Gedeeld Album",
    addPhotos: "Foto's Toevoegen",

    // Event Details
    detailsTitle: "Evenement Details",
    detailsSubtitle: "Wat te Weten",
    dateTime: "Datum & Tijd",
    church: "Kerk",
    dressCode: "Dresscode",
    dressCodeValue: "Smart Casual / Semi-Formeel",

    // Contact
    contactTitle: "Contact",
    contactSubtitle: "Neem Contact Op",
    guestOfHonor: "Eregast 👶",
    questions: "Vragen? Neem contact met ons op!",

    // Footer
    footerLove: "Met liefde van de Familie Kaya & Botez",
    footerBless: "✝ God Zegene Matteo ✝",
  },
  ro: {
    // Header
    home: "Acasă",
    preview: "Previzualizare",

    // Hero
    eventDate: "Sâm, 7 Feb, 14:00 - 15:00",
    churchName: "Biserica Ortodoxă Română Sf. Grigorie Teologul din Schiedam",
    rsvpButton: "Confirmă Participarea",

    // Host Note
    hostTitle: "Familia Kaya",
    hostSubtitle: "Mesaj de la Gazdă",
    hostDear: "Dragă familie și prieteni,",
    hostMessage1: "Suntem binecuvântați să vă invităm să fiți martori la sfântul botez al iubitului nostru fiu,",
    hostMessage2: "Alăturați-vă nouă pentru această ceremonie sfântă când Matteo își primește numele creștin și devine membru al Bisericii Ortodoxe. Prezența și rugăciunile voastre înseamnă totul pentru noi. 🕊️",

    // Nași & Gifts
    nasiTitle: "Nași & Daruri",
    nasiSubtitle: "Binecuvântează-l pe Matteo & Deblochează Realizări",
    fundingGoal: "Obiectiv",
    fundingHelp: "Ajută-ne să atingem obiectivul pentru viitorul lui Matteo!",
    everyGift: "Fiecare dar deblochează o insignă și un titlu unic! ✨",

    // Gift Tiers
    tier50: "Prieten al Familiei",
    tier100: "Susținător",
    tier150: "Naș Onorific",
    tier250: "Protector Sfânt",
    tier500: "Înger Păzitor",
    popular: "Popular",

    // Leaderboard
    leaderboardTitle: "Top 5 Nași",
    leaderboardSubtitle: "Sala Faimei",
    beFirst: "Fii primul Naș!",
    beAmong: "Fii printre primii care îl susțin pe Matteo! 🎉",

    // Achievements
    achievementsTitle: "🎖️ Realizări de Deblocat",
    achFirst: "Primul Naș",
    achHalf: "Jumătate!",
    achGoal: "Obiectiv Atins",
    achTop: "Top Naș",

    // Weather
    weatherTitle: "Vremea",
    weatherSubtitle: "În Ziua Evenimentului",
    partlyCloudy: "Parțial Înnorat",

    // Maps
    mapsTitle: "Hartă",
    getDirections: "Obține Direcții →",

    // Photos
    photosTitle: "Fotografii",
    sharedAlbum: "Album Partajat",
    addPhotos: "Adaugă Fotografii",

    // Event Details
    detailsTitle: "Detalii Eveniment",
    detailsSubtitle: "Ce Trebuie Să Știi",
    dateTime: "Data & Ora",
    church: "Biserica",
    dressCode: "Cod Vestimentar",
    dressCodeValue: "Smart Casual / Semi-Formal",

    // Contact
    contactTitle: "Contact",
    contactSubtitle: "Ia Legătura",
    guestOfHonor: "Oaspete de Onoare 👶",
    questions: "Întrebări? Contactează-ne!",

    // Footer
    footerLove: "Cu dragoste de la Familia Kaya & Botez",
    footerBless: "✝ Dumnezeu să-l Binecuvânteze pe Matteo ✝",
  },
};

// Gift tiers with achievements and badges
const GIFT_TIERS = [
  {
    amount: 50,
    label: "€50",
    emoji: "🙏",
    badge: "Binecuvântare",
    badgeColor: "#cd7f32",
    titleKey: "tier50",
    paymentLink: "https://pay.glodinasfinance.com/b/cNifZi2w8gqwevp5Xjgbm0f"
  },
  {
    amount: 100,
    label: "€100",
    emoji: "💝",
    badge: "Dar de Suflet",
    badgeColor: "#c0c0c0",
    titleKey: "tier100",
    paymentLink: "https://pay.glodinasfinance.com/b/cNifZi2w8gqwevp5Xjgbm0f"
  },
  {
    amount: 150,
    label: "€150",
    emoji: "⭐",
    badge: "Naș de Aur",
    badgeColor: "#ffd700",
    titleKey: "tier150",
    popular: true,
    paymentLink: "https://pay.glodinasfinance.com/b/cNifZi2w8gqwevp5Xjgbm0f"
  },
  {
    amount: 250,
    label: "€250",
    emoji: "👑",
    badge: "Protector",
    badgeColor: "#9966cc",
    titleKey: "tier250",
    paymentLink: "https://pay.glodinasfinance.com/b/cNifZi2w8gqwevp5Xjgbm0f"
  },
  {
    amount: 500,
    label: "€500",
    emoji: "💎",
    badge: "Înger Păzitor",
    badgeColor: "#00d4ff",
    titleKey: "tier500",
    paymentLink: "https://pay.glodinasfinance.com/b/cNifZi2w8gqwevp5Xjgbm0f"
  },
];

// Top Nași leaderboard with achievements
const TOP_NASI: Array<{
  rank: number;
  name: string;
  amount: number | null;
  badge: string | null;
  badgeColor: string | null;
  title: string | null;
  isNew?: boolean;
}> = [
    { rank: 1, name: "", amount: null, badge: null, badgeColor: null, title: null },
    { rank: 2, name: "—", amount: null, badge: null, badgeColor: null, title: null },
    { rank: 3, name: "—", amount: null, badge: null, badgeColor: null, title: null },
    { rank: 4, name: "—", amount: null, badge: null, badgeColor: null, title: null },
    { rank: 5, name: "—", amount: null, badge: null, badgeColor: null, title: null },
  ];

// Funding goal
const FUNDING_GOAL = 1000;
const CURRENT_FUNDING = 0;

type Language = 'en' | 'nl' | 'ro';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const fundingPercentage = Math.min((CURRENT_FUNDING / FUNDING_GOAL) * 100, 100);

  const t = translations[lang];

  // Confetti effect when hovering popular tier
  const handleTierHover = (amount: number) => {
    if (amount >= 150) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  // Language flags
  const flags: Record<Language, string> = {
    en: '🇬🇧',
    nl: '🇳🇱',
    ro: '🇷🇴',
  };

  // Achievements with translations
  const achievements = [
    { icon: "🥇", nameKey: "achFirst" as const, unlocked: false },
    { icon: "🎯", nameKey: "achHalf" as const, unlocked: false },
    { icon: "🏆", nameKey: "achGoal" as const, unlocked: false },
    { icon: "👑", nameKey: "achTop" as const, unlocked: false },
  ];

  return (
    <>
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d'][Math.floor(Math.random() * 5)]
            }} />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="site-header">
        <div className="logo">
          <span className="logo-icon">✝</span>
          <span>Botez Invites</span>
        </div>
        <div className="nav-tabs">
          <div className="nav-tab active">{t.home}</div>
        </div>
        <div className="header-actions">
          {/* Language Switcher */}
          <div className="language-switcher">
            {(Object.keys(flags) as Language[]).map((langKey) => (
              <button
                key={langKey}
                onClick={() => setLang(langKey)}
                className={`lang-btn ${lang === langKey ? 'active' : ''}`}
                title={langKey.toUpperCase()}
              >
                {flags[langKey]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid-container">
        {/* Hero Card - Main Event */}
        <section className="hero-section animate-in">
          <div className="glass-card hero-card">
            <div className="hero-image-container">
              <div className="hosting-badge">
                <span>✝</span>
                <span>Botez</span>
              </div>
              <Image
                src="/baby-matteo.png"
                alt="Matteo Kaya Botez"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="event-info">
              <h1 className="event-title">Matteo Kaya Botez</h1>
              <p className="event-date">{t.eventDate}</p>
              <div className="location-pill">
                {t.churchName}
              </div>
              <button className="rsvp-btn">
                <span>🙏</span>
                {t.rsvpButton}
              </button>
            </div>
          </div>
        </section>

        {/* Host Note Card */}
        <div className="glass-card info-card animate-in delay-1">
          <div className="card-header">
            <div className="card-icon host">
              <span>👨‍👩‍👦</span>
            </div>
            <div>
              <div className="card-title">{t.hostTitle}</div>
              <div className="card-subtitle">{t.hostSubtitle}</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '12px' }}>
              {t.hostDear}
            </p>
            <p style={{ marginBottom: '12px' }}>
              {t.hostMessage1}
              <strong style={{ color: '#d4a853' }}> Matteo Kaya Botez</strong>.
            </p>
            <p>
              {t.hostMessage2}
            </p>
          </div>
        </div>

        {/* Gamified Nași Gift Section */}
        <div className="glass-card info-card nasi-card animate-in delay-2">
          <div className="card-header">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #d4a853, #b8943f)' }}>
              <span>🎁</span>
            </div>
            <div>
              <div className="card-title">{t.nasiTitle}</div>
              <div className="card-subtitle">{t.nasiSubtitle}</div>
            </div>
          </div>

          {/* Funding Goal Progress */}
          <div className="funding-goal">
            <div className="funding-header">
              <span className="funding-label">🎯 {t.fundingGoal}</span>
              <span className="funding-amount">€{CURRENT_FUNDING} / €{FUNDING_GOAL}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${fundingPercentage}%` }}
              />
              <div className="progress-milestones">
                <div className="milestone" style={{ left: '25%' }}>
                  <span className="milestone-icon">🌟</span>
                </div>
                <div className="milestone" style={{ left: '50%' }}>
                  <span className="milestone-icon">⭐</span>
                </div>
                <div className="milestone" style={{ left: '75%' }}>
                  <span className="milestone-icon">🏆</span>
                </div>
                <div className="milestone" style={{ left: '100%' }}>
                  <span className="milestone-icon">👑</span>
                </div>
              </div>
            </div>
            <p className="funding-subtitle">{t.fundingHelp}</p>
          </div>

          {/* Gift Amount Options with Badges */}
          <div className="gift-tiers-gamified">
            {GIFT_TIERS.map((tier) => (
              <a
                key={tier.amount}
                href={tier.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`gift-tier-gamified ${tier.popular ? 'popular' : ''} ${selectedTier === tier.amount ? 'selected' : ''}`}
                onMouseEnter={() => handleTierHover(tier.amount)}
                onClick={() => setSelectedTier(tier.amount)}
              >
                <div className="tier-badge" style={{ backgroundColor: tier.badgeColor }}>
                  {tier.badge}
                </div>
                <span className="gift-emoji-large">{tier.emoji}</span>
                <span className="gift-amount-large">{tier.label}</span>
                <span className="tier-title">{t[tier.titleKey as keyof typeof t]}</span>
                {tier.popular && <span className="popular-badge-animated">🔥 {t.popular}</span>}
              </a>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textAlign: 'center', marginTop: '16px' }}>
            {t.everyGift}
          </p>
        </div>

        {/* Gamified Leaderboard */}
        <div className="glass-card info-card leaderboard-card animate-in delay-3">
          <div className="card-header">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #ffd700, #ffb800)' }}>
              <span>🏆</span>
            </div>
            <div>
              <div className="card-title">{t.leaderboardTitle}</div>
              <div className="card-subtitle">{t.leaderboardSubtitle}</div>
            </div>
          </div>

          <div className="leaderboard-gamified">
            {TOP_NASI.map((nasi, index) => (
              <div
                key={nasi.rank}
                className={`leaderboard-row ${nasi.rank <= 3 ? 'top-three' : ''} ${nasi.isNew ? 'new-entry' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="rank-medal">
                  {nasi.rank === 1 && '🥇'}
                  {nasi.rank === 2 && '🥈'}
                  {nasi.rank === 3 && '🥉'}
                  {nasi.rank > 3 && <span className="rank-number">{nasi.rank}</span>}
                </div>
                <div className="nasi-info">
                  <span className="nasi-name">{nasi.name || t.beFirst}</span>
                  {nasi.title && (
                    <span className="nasi-title" style={{ color: nasi.badgeColor || '#d4a853' }}>
                      {nasi.title}
                    </span>
                  )}
                </div>
                <div className="nasi-amount-badge">
                  {nasi.badge && (
                    <span className="mini-badge" style={{ backgroundColor: nasi.badgeColor || '#d4a853' }}>
                      {nasi.badge}
                    </span>
                  )}
                  <span className="amount-value">
                    {nasi.amount ? `€${nasi.amount}` : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement Badges */}
          <div className="achievements-section">
            <div className="achievements-header">{t.achievementsTitle}</div>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <span className="achievement-icon">{achievement.icon}</span>
                  <span className="achievement-name">{t[achievement.nameKey]}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
            {t.beAmong}
          </p>
        </div>

        {/* Weather Card */}
        <div className="glass-card info-card animate-in delay-4">
          <div className="card-header">
            <div className="card-icon weather">
              <span>🌤️</span>
            </div>
            <div>
              <div className="card-title">{t.weatherTitle}</div>
              <div className="card-subtitle">{t.weatherSubtitle}</div>
            </div>
          </div>
          <div className="weather-display">
            <div>
              <div className="weather-location">Schiedam</div>
              <div className="weather-temp">8°</div>
            </div>
            <div className="weather-condition">
              <div>☁️</div>
              <div className="weather-status">{t.partlyCloudy}</div>
              <div className="weather-hi-lo">H: 10° L: 5°</div>
            </div>
          </div>
          <div className="hourly-forecast">
            <div className="hour-item">
              <span>14:00</span>
              <span className="hour-icon">⛅</span>
              <span>8°</span>
            </div>
            <div className="hour-item">
              <span>14:30</span>
              <span className="hour-icon">☁️</span>
              <span>8°</span>
            </div>
            <div className="hour-item">
              <span>15:00</span>
              <span className="hour-icon">⛅</span>
              <span>7°</span>
            </div>
            <div className="hour-item">
              <span>15:30</span>
              <span className="hour-icon">☁️</span>
              <span>7°</span>
            </div>
            <div className="hour-item">
              <span>16:00</span>
              <span className="hour-icon">🌙</span>
              <span>6°</span>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className="glass-card info-card animate-in delay-5">
          <div className="card-header">
            <div className="card-icon map">
              <span>📍</span>
            </div>
            <div>
              <div className="card-title">{t.mapsTitle}</div>
              <div className="card-subtitle">{t.churchName.substring(0, 40)}...</div>
            </div>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2460.8!2d4.3892!3d51.9244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c43c38b7c7f8b7%3A0x8b7c7f8b7c7f8b7c!2sVlaardingerdijk%2050%2C%203117%20EW%20Schiedam!5e0!3m2!1sen!2snl!4v1"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location"
            />
          </div>
          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Vlaardingerdijk 50</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>3117 EW Schiedam, Netherlands</div>
            <a
              href="https://maps.google.com/?q=Vlaardingerdijk+50,+3117+EW+Schiedam"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '8px',
                color: '#0a84ff',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              {t.getDirections}
            </a>
          </div>
        </div>

        {/* Photos Card */}
        <div className="glass-card info-card animate-in delay-6">
          <div className="card-header">
            <div className="card-icon photos">
              <span>📸</span>
            </div>
            <div>
              <div className="card-title">{t.photosTitle}</div>
              <div className="card-subtitle">{t.sharedAlbum}</div>
            </div>
          </div>
          <div className="photos-grid">
            <div className="photo-placeholder">🖼️</div>
            <div className="photo-placeholder">📷</div>
            <div className="photo-placeholder">👪</div>
          </div>
          <div className="add-photos-btn">
            <span>•••</span>
            <span>{t.addPhotos}</span>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="glass-card info-card animate-in delay-6">
          <div className="card-header">
            <div className="card-icon link">
              <span>📋</span>
            </div>
            <div>
              <div className="card-title">{t.detailsTitle}</div>
              <div className="card-subtitle">{t.detailsSubtitle}</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '1.7' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: '#d4a853', marginBottom: '4px' }}>📅 {t.dateTime}</div>
              <div>{lang === 'en' ? 'Saturday, February 7, 2026' : lang === 'nl' ? 'Zaterdag, 7 februari 2026' : 'Sâmbătă, 7 Februarie 2026'}</div>
              <div>14:00 - 15:00</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: '#d4a853', marginBottom: '4px' }}>⛪ {t.church}</div>
              <div>{lang === 'en' ? 'Romanian Orthodox Church' : lang === 'nl' ? 'Roemeens-Orthodoxe Kerk' : 'Biserica Ortodoxă Română'}</div>
              <div>{lang === 'en' ? 'St Gregory the Theologian' : lang === 'nl' ? 'H. Gregorius de Theoloog' : 'Sf. Grigorie Teologul'}</div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#d4a853', marginBottom: '4px' }}>👔 {t.dressCode}</div>
              <div>{t.dressCodeValue}</div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="glass-card info-card animate-in delay-6">
          <div className="card-header">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #5856d6, #af52de)' }}>
              <span>💌</span>
            </div>
            <div>
              <div className="card-title">{t.contactTitle}</div>
              <div className="card-subtitle">{t.contactSubtitle}</div>
            </div>
          </div>
          <div className="link-preview">
            <div className="link-avatar">M</div>
            <div>
              <div style={{ fontWeight: '500' }}>Matteo Kaya Botez</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{t.guestOfHonor}</div>
            </div>
          </div>
          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '12px' }}>
              {t.questions}
            </p>
            <a
              href="mailto:cihat@glodinasfinance.com"
              style={{
                color: '#0a84ff',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              cihat@glodinasfinance.com
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 20px',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '13px'
      }}>
        <p style={{ marginBottom: '8px' }}>{t.footerLove}</p>
        <p>{t.footerBless}</p>
      </footer>
    </>
  );
}
