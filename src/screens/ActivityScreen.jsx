import { useState } from 'react'
import { SOCIAL_FEED } from '../data/mockData'

export default function ActivityScreen({ onSelectPost }) {
  const [filter, setFilter] = useState('ALL')
  const history = SOCIAL_FEED

  const filteredHistory = filter === 'ALL' ? history : history.filter(h => h.label === filter)

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>
      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, paddingBottom: 10 }}>
        <div className="header-row">
          <div>
            <div className="logo" style={{ fontSize: 18 }}>Activity</div>
            <div className="header-sub">Your scans & creations</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 14, overflowX: 'auto', paddingBottom: 6 }}>
          {['ALL', 'AI CREATION', 'DEEPFAKE SCAM', 'AI-GENERATED'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer',
              background: filter === f ? 'var(--accent)' : 'var(--surface)',
              color: filter === f ? '#fff' : 'var(--text2)', border: 'none'
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 14px 0' }}>
        {filteredHistory.map((post, idx) => (
          <div key={post.id} className="history-scan-card fade-in" style={{ animationDelay: `${(idx + 1) * 0.05}s` }} onClick={() => onSelectPost && onSelectPost(post)}>
            <div className={`intel-status-stripe status-${post.label}`}></div>
            <div className="intel-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className={`intel-badge badge-${post.label}`}>{post.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Just now</span>
              </div>
              <div className="intel-headline">"{post.headline}"</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8 }}>
                 {post.content}
              </div>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 40, color: 'var(--text3)' }}>No activity found.</div>
        )}
      </div>
    </div>
  )
}
