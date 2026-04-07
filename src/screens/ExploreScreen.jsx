import { useState } from 'react'
import { REGIONAL_FAKE_NEWS } from '../data/mockData'

const REGIONS = [
  { key: 'world', label: '🌍 World' },
  { key: 'india', label: '🇮🇳 India' },
  { key: 'state', label: '🗺️ State' },
  { key: 'city',  label: '🏙️ City' },
]

const SEVERITY_LEVELS = ['ALL', 'HIGH', 'MEDIUM']

export default function ExploreScreen() {
  const [region, setRegion] = useState('india')
  const [severity, setSeverity] = useState('ALL')

  const allFake = REGIONAL_FAKE_NEWS[region] || []
  const filtered = severity === 'ALL' ? allFake : allFake.filter(f => f.severity === severity.toLowerCase())

  // Count across all regions for the stats
  const totalDebunked = Object.values(REGIONAL_FAKE_NEWS).flat().length
  const totalHighRisk = Object.values(REGIONAL_FAKE_NEWS).flat().filter(f => f.severity === 'high').length

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>

      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, background: 'var(--bg)' }}>
        <div className="header-row">
          <div>
            <div className="logo">Explore<span>Map</span></div>
            <div className="header-sub">Misinformation spread in your region</div>
          </div>
          <span style={{
            fontSize: 11, padding: '4px 10px', borderRadius: 6,
            background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontWeight: 700,
          }}>🔴 {totalHighRisk} Active Threats</span>
        </div>
      </div>

      {/* GLOBAL STATS BANNER */}
      <div style={{ margin: '0 16px 8px', padding: 16, background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(245,158,11,0.1))', borderRadius: 12, border: '1px solid rgba(239,68,68,0.2)' }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: 'var(--text)' }}>📊 Active Misinformation Report</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { val: totalDebunked, label: 'Debunked', color: '#10b981' },
            { val: totalHighRisk, label: 'High Risk', color: '#ef4444' },
            { val: '47M+', label: 'Potential Reach', color: '#f59e0b' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 10, background: 'var(--surface)', borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REGION TABS */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0', overflowX: 'auto' }}>
        {REGIONS.map(r => (
          <button key={r.key} onClick={() => setRegion(r.key)} style={{
            flexShrink: 0, padding: '7px 16px', borderRadius: 99, border: '1px solid',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: region === r.key ? '#ef4444' : 'var(--surface)',
            borderColor: region === r.key ? '#ef4444' : 'var(--border)',
            color: region === r.key ? '#fff' : 'var(--text2)',
            transition: 'all 0.2s',
          }}>{r.label}</button>
        ))}
      </div>

      {/* SEVERITY FILTER */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px 12px', borderBottom: '1px solid var(--border)' }}>
        {SEVERITY_LEVELS.map(s => (
          <button key={s} onClick={() => setSeverity(s)} style={{
            flexShrink: 0, padding: '5px 12px', borderRadius: 6, border: '1px solid',
            fontSize: 11, fontWeight: 600, cursor: 'pointer',
            background: severity === s ? 'var(--accent)' : 'transparent',
            borderColor: severity === s ? 'var(--accent)' : 'var(--border)',
            color: severity === s ? '#fff' : 'var(--text3)',
          }}>{s}</button>
        ))}
      </div>

      {/* FAKE NEWS CARDS */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: 'var(--text2)' }}>
          {filtered.length} stories debunked in this region
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <div className="empty-title">No threats at this level!</div>
            <div className="empty-sub">Keep checking for your area's updates.</div>
          </div>
        )}

        {filtered.map(item => (
          <div key={item.id} style={{
            marginBottom: 14, padding: 16,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: `4px solid ${item.severity === 'high' ? '#ef4444' : '#f59e0b'}`,
            borderRadius: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>via {item.platform}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                background: item.severity === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                color: item.severity === 'high' ? '#ef4444' : '#f59e0b',
              }}>{item.severity === 'high' ? '🔴 HIGH RISK' : '🟡 MEDIUM'}</span>
            </div>

            <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.45, marginBottom: 10 }}>{item.headline}</div>

            <div style={{
              fontSize: 12, color: '#10b981', lineHeight: 1.5,
              background: 'rgba(16,185,129,0.08)', padding: '8px 12px', borderRadius: 8,
              marginBottom: 8, borderLeft: '3px solid #10b981',
            }}>
              <span style={{ fontWeight: 700 }}>✔ Reality Check: </span>{item.debunk}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text3)' }}>
              <span>🔁 {item.shares} shares</span>
              <button style={{
                background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: 'none',
                borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              }}>Share Fact</button>
            </div>
          </div>
        ))}
      </div>

      {/* AWARENESS TIP */}
      <div style={{ margin: '8px 16px 0', padding: 14, background: 'rgba(99,102,241,0.08)', borderRadius: 12, border: '1px solid rgba(99,102,241,0.2)' }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6, color: '#6366f1' }}>💡 How to Help</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
          If you receive suspicious content, use the <strong>Check</strong> tab to analyze it instantly. Share verified facts instead of unconfirmed news to protect your community.
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  )
}
