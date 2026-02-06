import Image from "next/image";

// Gift tiers with Stripe prices
const GIFT_TIERS = [
  { amount: 50, label: "€50", emoji: "🙏", priceId: "price_1SxulmKopO2jXhaHuHuAHucM" },
  { amount: 100, label: "€100", emoji: "💝", priceId: "price_1SxulmKopO2jXhaHvUvDx45u" },
  { amount: 150, label: "€150", emoji: "⭐", priceId: "price_1SxulnKopO2jXhaHU55nfbyj", popular: true },
  { amount: 250, label: "€250", emoji: "👑", priceId: "price_1SxuloKopO2jXhaHqNhSSVeD" },
  { amount: 500, label: "€500", emoji: "💎", priceId: "price_1SxuloKopO2jXhaHSP9GOZRv" },
];

// Top Nași leaderboard (can be updated manually after payments)
const TOP_NASI = [
  { rank: 1, name: "Be the first Naș!", amount: null, emoji: "🥇" },
  { rank: 2, name: "—", amount: null, emoji: "🥈" },
  { rank: 3, name: "—", amount: null, emoji: "🥉" },
  { rank: 4, name: "—", amount: null, emoji: "4️⃣" },
  { rank: 5, name: "—", amount: null, emoji: "5️⃣" },
];

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="logo">
          <span className="logo-icon">✝</span>
          <span>Botez Invites</span>
        </div>
        <div className="nav-tabs">
          <div className="nav-tab active">Home</div>
        </div>
        <div className="header-actions">
          <button className="preview-btn">Preview</button>
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
              <p className="event-date">Sat, Feb 7, 2:00 PM - 3:00 PM</p>
              <div className="location-pill">
                Romanian Orthodox Church of St Gregory the Theologian in Schiedam
              </div>
              <button className="rsvp-btn">
                <span>🙏</span>
                RSVP to Ceremony
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
              <div className="card-title">Kaya Family</div>
              <div className="card-subtitle">Host Note</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '12px' }}>
              Dear family and friends,
            </p>
            <p style={{ marginBottom: '12px' }}>
              We are blessed to invite you to witness the holy baptism of our beloved son,
              <strong style={{ color: '#d4a853' }}> Matteo Kaya Botez</strong>.
            </p>
            <p>
              Join us for this sacred ceremony as Matteo receives his Christian name and
              becomes a member of the Orthodox Church. Your presence and prayers mean
              everything to us. 🕊️
            </p>
          </div>
        </div>

        {/* Nași Gift Section - NEW */}
        <div className="glass-card info-card nasi-card animate-in delay-2">
          <div className="card-header">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #d4a853, #b8943f)' }}>
              <span>🎁</span>
            </div>
            <div>
              <div className="card-title">Nași & Gifts</div>
              <div className="card-subtitle">Bless Matteo with a Gift</div>
            </div>
          </div>

          {/* Gift Amount Options */}
          <div className="gift-tiers">
            {GIFT_TIERS.map((tier) => (
              <a
                key={tier.amount}
                href={`https://pay.glodinasfinance.com/b/cNifZi2w8gqwevp5Xjgbm0f`}
                target="_blank"
                rel="noopener noreferrer"
                className={`gift-tier ${tier.popular ? 'popular' : ''}`}
              >
                <span className="gift-emoji">{tier.emoji}</span>
                <span className="gift-amount">{tier.label}</span>
                {tier.popular && <span className="popular-badge">Popular</span>}
              </a>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textAlign: 'center', marginTop: '12px' }}>
            Your blessing gift will help Matteo's future ✨
          </p>
        </div>

        {/* Top Nași Leaderboard - NEW */}
        <div className="glass-card info-card animate-in delay-3">
          <div className="card-header">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #ffd700, #ffb800)' }}>
              <span>🏆</span>
            </div>
            <div>
              <div className="card-title">Top 5 Nași</div>
              <div className="card-subtitle">Leaderboard</div>
            </div>
          </div>

          <div className="leaderboard">
            {TOP_NASI.map((nasi) => (
              <div key={nasi.rank} className={`leaderboard-item ${nasi.rank <= 3 ? 'top-three' : ''}`}>
                <span className="leaderboard-rank">{nasi.emoji}</span>
                <span className="leaderboard-name">{nasi.name}</span>
                <span className="leaderboard-amount">
                  {nasi.amount ? `€${nasi.amount}` : '—'}
                </span>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center', marginTop: '12px' }}>
            Be among the first to support Matteo! 🎉
          </p>
        </div>

        {/* Weather Card */}
        <div className="glass-card info-card animate-in delay-4">
          <div className="card-header">
            <div className="card-icon weather">
              <span>🌤️</span>
            </div>
            <div>
              <div className="card-title">Weather</div>
              <div className="card-subtitle">On the Day</div>
            </div>
          </div>
          <div className="weather-display">
            <div>
              <div className="weather-location">Schiedam</div>
              <div className="weather-temp">8°</div>
            </div>
            <div className="weather-condition">
              <div>☁️</div>
              <div className="weather-status">Partly Cloudy</div>
              <div className="weather-hi-lo">H: 10° L: 5°</div>
            </div>
          </div>
          <div className="hourly-forecast">
            <div className="hour-item">
              <span>2 PM</span>
              <span className="hour-icon">⛅</span>
              <span>8°</span>
            </div>
            <div className="hour-item">
              <span>2:30</span>
              <span className="hour-icon">☁️</span>
              <span>8°</span>
            </div>
            <div className="hour-item">
              <span>3 PM</span>
              <span className="hour-icon">⛅</span>
              <span>7°</span>
            </div>
            <div className="hour-item">
              <span>3:30</span>
              <span className="hour-icon">☁️</span>
              <span>7°</span>
            </div>
            <div className="hour-item">
              <span>4 PM</span>
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
              <div className="card-title">Maps</div>
              <div className="card-subtitle">Romanian Orthodox Church of St Gregory...</div>
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
              Get Directions →
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
              <div className="card-title">Photos</div>
              <div className="card-subtitle">Shared Album</div>
            </div>
          </div>
          <div className="photos-grid">
            <div className="photo-placeholder">🖼️</div>
            <div className="photo-placeholder">📷</div>
            <div className="photo-placeholder">👪</div>
          </div>
          <div className="add-photos-btn">
            <span>•••</span>
            <span>Add Photos</span>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="glass-card info-card animate-in delay-6">
          <div className="card-header">
            <div className="card-icon link">
              <span>📋</span>
            </div>
            <div>
              <div className="card-title">Event Details</div>
              <div className="card-subtitle">What to Know</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '1.7' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: '#d4a853', marginBottom: '4px' }}>📅 Date & Time</div>
              <div>Saturday, February 7, 2026</div>
              <div>2:00 PM - 3:00 PM</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: '#d4a853', marginBottom: '4px' }}>⛪ Church</div>
              <div>Romanian Orthodox Church</div>
              <div>St Gregory the Theologian</div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#d4a853', marginBottom: '4px' }}>👔 Dress Code</div>
              <div>Smart Casual / Semi-Formal</div>
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
              <div className="card-title">Contact</div>
              <div className="card-subtitle">Get in Touch</div>
            </div>
          </div>
          <div className="link-preview">
            <div className="link-avatar">M</div>
            <div>
              <div style={{ fontWeight: '500' }}>Matteo Kaya Botez</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Guest of Honor 👶</div>
            </div>
          </div>
          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '12px' }}>
              Questions? Reach out to us!
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
        <p style={{ marginBottom: '8px' }}>With love from the Kaya & Botez Family</p>
        <p>✝ God Bless Matteo ✝</p>
      </footer>
    </>
  );
}
