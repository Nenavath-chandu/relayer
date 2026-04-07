import { useState, useEffect } from 'react'
import { REAL_NEWS, REGIONAL_FAKE_NEWS } from '../data/mockData'

const REGIONS = [
  { key: 'world', label: '🌍 World' },
  { key: 'india', label: '🇮🇳 India' },
  { key: 'state', label: '🗺️ State' },
  { key: 'city',  label: '🏙️ City' },
]

const CATEGORY_COLORS = {
  Technology: '#6366f1', Climate: '#10b981', Economy: '#f59e0b',
  Space: '#8b5cf6', Finance: '#3b82f6', Infrastructure: '#14b8a6',
  Environment: '#22c55e', Education: '#f97316', Civic: '#64748b',
  Health: '#ec4899',
}

const API_BASE = `http://${window.location.hostname}:8000`

export default function FeedScreen({ onSelectPost }) {
  const [region, setRegion] = useState('india')
  const [liveNews, setLiveNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [hasNewsAPI, setHasNewsAPI] = useState(false)

  // Fetch real news from backend whenever region changes
  useEffect(() => {
    setNewsLoading(true)
    fetch(`${API_BASE}/news?region=${region}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok' && data.articles.length > 0) {
          setLiveNews(data.articles)
          setHasNewsAPI(true)
        } else {
          setLiveNews([])
          setHasNewsAPI(false)
        }
      })
      .catch(() => {
        setLiveNews([])
        setHasNewsAPI(false)
      })
      .finally(() => setNewsLoading(false))
  }, [region])

  // Use live news if available, else fall back to mock
  const realNews = hasNewsAPI ? liveNews : (REAL_NEWS[region] || [])
  const fakeNews = REGIONAL_FAKE_NEWS[region] || []

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>

      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, background: 'var(--bg)' }}>
        <div className="header-row">
          <div>
            <div className="logo">Reality<span>Layer</span></div>
            <div className="header-sub">AI-Powered Truth Intelligence</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#10b981', boxShadow: '0 0 6px #10b981',
            }} />
            <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>LIVE</span>
          </div>
        </div>

        {/* Region Tabs */}
        <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'auto', borderBottom: '1px solid var(--border)' }}>
          {REGIONS.map(r => (
            <button key={r.key} onClick={() => setRegion(r.key)} style={{
              flexShrink: 0, padding: '7px 16px', borderRadius: 99, border: '1px solid',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: region === r.key ? 'var(--accent)' : 'var(--surface)',
              borderColor: region === r.key ? 'var(--accent)' : 'var(--border)',
              color: region === r.key ? '#fff' : 'var(--text2)',
              transition: 'all 0.2s',
            }}>{r.label}</button>
          ))}
        </div>
      </div>

      {/* VERIFIED REAL NEWS */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 20, background: '#10b981', borderRadius: 4 }} />
          <span style={{ fontWeight: 700, fontSize: 15 }}>✅ Verified Real News</span>
          <span style={{
            fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700, marginLeft: 4,
            background: hasNewsAPI ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
            color: hasNewsAPI ? '#10b981' : '#f59e0b',
          }}>{hasNewsAPI ? '🔴 LIVE' : '📦 DEMO'}</span>
          {newsLoading && <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 'auto' }}>Loading...</span>}
        </div>

        {realNews.map(item => (
          <div key={item.id} className="section-card" style={{ marginBottom: 12, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                background: CATEGORY_COLORS[item.category] ? CATEGORY_COLORS[item.category] + '22' : '#6366f122',
                color: CATEGORY_COLORS[item.category] || '#6366f1',
              }}>{item.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#10b98122',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: '#10b981',
                }}>{item.trust_score}</div>
              </div>
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.4, marginBottom: 6 }}>{item.headline}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 8 }}>{item.summary}</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text3)' }}>
              <span>📰 {item.source}</span>
              <span>🕐 {item.timeAgo}</span>
            </div>
          </div>
        ))}

        {realNews.length === 0 && (
          <div className="empty-state"><div className="empty-icon">📭</div><div className="empty-title">No data for this region yet</div></div>
        )}
      </div>

      {/* DEBUNKED LOCAL FAKE NEWS */}
      {fakeNews.length > 0 && (
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 20, background: '#ef4444', borderRadius: 4 }} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>🚨 Debunked In Your Area</span>
          </div>

          {fakeNews.map(item => (
            <div key={item.id} style={{
              marginBottom: 12, padding: 14,
              background: 'rgba(239,68,68,0.05)',
              border: `1px solid ${item.severity === 'high' ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.4)'}`,
              borderRadius: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                  background: item.severity === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                  color: item.severity === 'high' ? '#ef4444' : '#f59e0b',
                }}>{item.severity === 'high' ? '⚠️ HIGH RISK' : '⚡ MEDIUM RISK'}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>🔁 {item.shares} shares</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.4, marginBottom: 6, color: 'var(--text)' }}>{item.headline}</div>
              <div style={{ fontSize: 12, color: '#10b981', lineHeight: 1.5, background: 'rgba(16,185,129,0.08)', padding: '6px 10px', borderRadius: 6 }}>
                ✔ Fact: {item.debunk}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>via {item.platform}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  )
}