import { useState } from 'react'
import SubscriptionModal from '../components/SubscriptionModal'

const USER = {
  name: 'Chandu Nenavath',
  handle: '@chandu_rl',
  avatar: '🧑‍💻',
  plan: 'free',
  realityScore: 67,
  checksTotal: 23,
  fakeCaught: 11,
  aiDetected: 4,
  streak: 3,
  joinedDays: 12,
}

const BADGES = [
  { icon: '🛡️', name: 'Truth Defender', desc: 'Caught 10+ fake posts', earned: true, color: '#6366f1' },
  { icon: '🤖', name: 'AI Detector', desc: 'Detected 3+ AI-generated content', earned: true, color: '#8b5cf6' },
  { icon: '🔥', name: 'Streak Master', desc: '7-day check streak', earned: false, color: '#f59e0b' },
  { icon: '🌍', name: 'Global Watcher', desc: 'Checked content from 3+ regions', earned: false, color: '#10b981' },
  { icon: '⚡', name: 'Speed Checker', desc: 'First 100 checks completed', earned: false, color: '#ec4899' },
  { icon: '🏆', name: 'Community Hero', desc: 'Top 10 in leaderboard', earned: false, color: '#F4C430' },
]

const RECENT_CHECKS = [
  { label: 'FAKE', content: 'WhatsApp message about UPI tax', timeAgo: '2 hr ago', score: 4 },
  { label: 'REAL', content: 'ISRO Chandrayaan-4 launch news', timeAgo: '1 day ago', score: 94 },
  { label: 'AI-GENERATED', content: 'Viral image of politician', timeAgo: '2 days ago', score: 9 },
  { label: 'MISLEADING', content: 'Rice causes diabetes study', timeAgo: '3 days ago', score: 38 },
]

const LABEL_COLOR = {
  FAKE: 'var(--red)', REAL: 'var(--green)', MISLEADING: 'var(--amber)', 'AI-GENERATED': 'var(--purple)',
}
const LABEL_BG = {
  FAKE: 'var(--red-bg)', REAL: 'var(--green-bg)', MISLEADING: 'var(--amber-bg)', 'AI-GENERATED': 'var(--purple-bg)',
}

export default function ProfileScreen() {
  const [showPaywall, setShowPaywall] = useState(false)
  const circumference = 2 * Math.PI * 38
  const dash = circumference - (circumference * USER.realityScore) / 100

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>
      {showPaywall && <SubscriptionModal feature="ReLayer Pro" onClose={() => setShowPaywall(false)} />}

      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200 }}>
        <div className="header-row">
          <div>
            <div className="logo">My<span>Profile</span></div>
            <div className="header-sub">Your truth intelligence hub</div>
          </div>
          <button style={{
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12,
            color: 'var(--text2)', fontFamily: 'var(--font-body)', fontWeight: 600,
          }}>⚙️ Settings</button>
        </div>
      </div>

      <div style={{ padding: '16px 14px 0' }}>

        {/* Profile Card */}
        <div style={{
          padding: 20, marginBottom: 14,
          background: 'linear-gradient(135deg, rgba(124,91,245,0.1), rgba(192,132,252,0.05))',
          border: '1px solid rgba(124,91,245,0.2)', borderRadius: 'var(--radius)',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--surface2)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, flexShrink: 0,
          }}>{USER.avatar}</div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{USER.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>{USER.handle}</div>

            {/* Plan Badge */}
            <span style={{
              fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 99,
              background: USER.plan === 'free' ? 'var(--surface2)' : 'linear-gradient(135deg, #F4C430, #FF8C00)',
              color: USER.plan === 'free' ? 'var(--text3)' : '#000',
              border: USER.plan === 'free' ? '1px solid var(--border2)' : 'none',
              letterSpacing: 0.5,
            }}>
              {USER.plan === 'free' ? '🔓 FREE PLAN' : '⭐ PRO PLAN'}
            </span>
          </div>

          {/* Reality Score Ring */}
          <div className="trust-ring-container" style={{ width: 80, height: 80, flexShrink: 0 }}>
            <svg width="80" height="80" viewBox="0 0 100 100" className="reality-score-ring">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--surface2)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="38" fill="none"
                stroke="var(--accent2)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dash}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="trust-ring-label">
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--accent2)' }}>
                {USER.realityScore}
              </div>
              <div style={{ fontSize: 8, color: 'var(--text3)' }}>REALITY<br/>SCORE</div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA for free users */}
        {USER.plan === 'free' && (
          <button
            onClick={() => setShowPaywall(true)}
            style={{
              width: '100%', marginBottom: 14, padding: '14px',
              background: 'linear-gradient(135deg, #F4C430, #FF8C00)',
              border: 'none', borderRadius: 'var(--radius)',
              color: '#000', fontFamily: 'var(--font-head)',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(244,196,48,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            ⭐ Upgrade to Pro — ₹99/month
          </button>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { val: USER.checksTotal, label: 'Total Checks', color: 'var(--accent2)', icon: '🔍' },
            { val: USER.fakeCaught, label: 'Fake Caught', color: 'var(--red)', icon: '🚫' },
            { val: USER.aiDetected, label: 'AI Detected', color: 'var(--purple)', icon: '🤖' },
            { val: `${USER.streak} days`, label: 'Check Streak', color: 'var(--amber)', icon: '🔥' },
          ].map((s, i) => (
            <div key={i} className="stat-card fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
              <div className="stat-num" style={{ color: s.color }}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 18, background: 'var(--accent)', borderRadius: 4 }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>🏅 Your Badges</span>
            <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 'auto' }}>
              {BADGES.filter(b => b.earned).length}/{BADGES.length} earned
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {BADGES.map((badge, idx) => (
              <div key={badge.name} className="fade-in" style={{
                padding: 12, borderRadius: 12, textAlign: 'center',
                background: badge.earned ? `${badge.color}12` : 'var(--surface)',
                border: `1px solid ${badge.earned ? badge.color + '30' : 'var(--border)'}`,
                opacity: badge.earned ? 1 : 0.45, animationDelay: `${idx * 0.06}s`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{badge.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: badge.earned ? badge.color : 'var(--text3)', lineHeight: 1.3 }}>
                  {badge.name}
                </div>
                {!badge.earned && (
                  <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 3 }}>{badge.desc}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 18, background: 'var(--text3)', borderRadius: 4 }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>🕒 Recent Checks</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RECENT_CHECKS.map((check, idx) => (
              <div key={idx} className="fade-in" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderLeft: `3px solid ${LABEL_COLOR[check.label]}`, borderRadius: 10,
                animationDelay: `${idx * 0.06}s`,
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                  background: LABEL_BG[check.label], color: LABEL_COLOR[check.label],
                  letterSpacing: 0.5, flexShrink: 0,
                }}>{check.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text2)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {check.content}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text3)', flexShrink: 0 }}>{check.timeAgo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform info */}
        <div style={{
          padding: 16, background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', marginBottom: 14, textAlign: 'center',
        }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🌐</div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Help Build ReLayer</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 12 }}>
            Every check you do trains the ReLayer AI to be better. You're helping protect millions from misinformation.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {['Share App', 'Give Feedback', 'Report Bug'].map(a => (
              <button key={a} style={{
                padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border2)',
                background: 'var(--surface2)', color: 'var(--text2)', fontSize: 11,
                fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
              }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
