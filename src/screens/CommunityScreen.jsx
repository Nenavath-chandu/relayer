import { useState } from 'react'
import { COMMUNITY_POSTS, LEADERBOARD } from '../data/mockData'

const FILTERS = ['All', 'FAKE', 'MISLEADING', 'REAL', 'AI-GENERATED']

const VERDICT_COLORS = {
  FAKE: '#FF4F6B', MISLEADING: '#FFB300', REAL: '#00E676', 'AI-GENERATED': '#C084FC',
}
const VERDICT_BG = {
  FAKE: 'rgba(255,79,107,0.08)', MISLEADING: 'rgba(255,179,0,0.08)',
  REAL: 'rgba(0,230,118,0.08)', 'AI-GENERATED': 'rgba(192,132,252,0.08)',
}

export default function CommunityScreen() {
  const [activeView, setActiveView] = useState('feed') // 'feed' | 'leaderboard'
  const [filter, setFilter] = useState('All')
  const [posts, setPosts] = useState(COMMUNITY_POSTS)

  const filtered = filter === 'All' ? posts : posts.filter(p => p.label === filter)

  function handleVote(postId, type) {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      const wasVotedUp = p.userVote === 'up'
      const wasVotedDown = p.userVote === 'down'
      if (type === 'up') {
        return {
          ...p,
          upvotes: wasVotedUp ? p.upvotes - 1 : p.upvotes + 1,
          downvotes: wasVotedDown ? p.downvotes - 1 : p.downvotes,
          userVote: wasVotedUp ? null : 'up',
        }
      } else {
        return {
          ...p,
          downvotes: wasVotedDown ? p.downvotes - 1 : p.downvotes + 1,
          upvotes: wasVotedUp ? p.upvotes - 1 : p.upvotes,
          userVote: wasVotedDown ? null : 'down',
        }
      }
    }))
  }

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>

      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200 }}>
        <div className="header-row">
          <div>
            <div className="logo">Creative<span>Space</span></div>
            <div className="header-sub">Social media for creative thinkers</div>
          </div>
          <span style={{
            fontSize: 10, padding: '4px 10px', borderRadius: 6,
            background: 'rgba(124,91,245,0.12)', color: 'var(--accent2)',
            fontWeight: 700, border: '1px solid rgba(124,91,245,0.2)',
          }}>✨ {posts.reduce((a, p) => a + p.upvotes, 0).toLocaleString()} Interactions</span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, paddingTop: 10 }}>
          {[
            { id: 'feed', label: '📰 Community Feed' },
            { id: 'leaderboard', label: '🏆 Leaderboard' },
          ].map(v => (
            <button key={v.id} onClick={() => setActiveView(v.id)} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 99, border: '1px solid',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: activeView === v.id ? 'var(--accent)' : 'var(--surface)',
              borderColor: activeView === v.id ? 'var(--accent)' : 'var(--border)',
              color: activeView === v.id ? '#fff' : 'var(--text2)',
              transition: 'all 0.2s', fontFamily: 'var(--font-body)',
            }}>{v.label}</button>
          ))}
        </div>
      </div>

      {/* ── COMMUNITY FEED ── */}
      {activeView === 'feed' && (
        <div style={{ padding: '12px 14px 0' }}>

          {/* Community Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8,
            marginBottom: 14,
          }}>
            {[
              { val: '12.4K', label: 'Checks Shared', color: '#00E676' },
              { val: '97.2%', label: 'Accuracy Rate', color: 'var(--accent2)' },
              { val: '4,821', label: 'Truth Defenders', color: '#FFB300' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-num" style={{ color: s.color }}>{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '12px 14px', marginBottom: 14,
            background: 'linear-gradient(135deg, rgba(124,91,245,0.08), rgba(192,132,252,0.05))',
            border: '1px solid rgba(124,91,245,0.15)', borderRadius: 12,
          }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--accent2)', marginBottom: 4 }}>
              💡 How CreativeSpace Works
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6 }}>
              Share your AI creations or discover what others are building. Explore limits, verify deepfakes, and build the future of content.
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                flexShrink: 0, padding: '5px 12px', borderRadius: 99, border: '1px solid',
                fontSize: 11, fontWeight: 600, cursor: 'pointer',
                background: filter === f ? 'var(--accent)' : 'var(--surface)',
                borderColor: filter === f ? 'var(--accent)' : 'var(--border)',
                color: filter === f ? '#fff' : 'var(--text2)',
                fontFamily: 'var(--font-body)',
              }}>{f === 'AI-GENERATED' ? 'AI-Gen' : f}</button>
            ))}
          </div>

          {/* Posts */}
          {filtered.map((post, idx) => {
            const vColor = VERDICT_COLORS[post.label] || '#64748b'
            const vBg = VERDICT_BG[post.label] || 'rgba(100,116,139,0.08)'
            return (
              <div key={post.id} className="community-post fade-in" style={{ marginBottom: 12, animationDelay: `${idx * 0.07}s` }}>

                {/* User Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--surface2)', border: '2px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    flexShrink: 0,
                  }}>{post.user.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{post.user.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{post.user.handle} · {post.timeAgo}</div>
                  </div>
                  <div style={{
                    fontSize: 9, fontWeight: 800, padding: '3px 7px', borderRadius: 6,
                    background: vBg, color: vColor, border: `1px solid ${vColor}30`, letterSpacing: 0.5,
                  }}>{post.label}</div>
                </div>

                {/* Reality Score pill */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                    background: post.user.score >= 80 ? 'rgba(124,91,245,0.12)' : 'rgba(255,179,0,0.1)',
                    color: post.user.score >= 80 ? 'var(--accent2)' : 'var(--amber)',
                    border: `1px solid ${post.user.score >= 80 ? 'rgba(124,91,245,0.2)' : 'rgba(255,179,0,0.2)'}`,
                  }}>⭐ Reality Score: {post.user.score}</span>
                </div>

                {/* Content */}
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
                  {post.content}
                </div>

                {/* Trust bar */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text3)' }}>AI Trust Score</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: vColor }}>{post.trust_score}%</span>
                  </div>
                  <div className="conf-track">
                    <div style={{
                      height: '100%', width: `${post.trust_score}%`,
                      background: vColor, borderRadius: 2,
                    }} className="animated-bar" />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <button
                    className={`vote-btn ${post.userVote === 'up' ? 'voted-up' : ''}`}
                    onClick={() => handleVote(post.id, 'up')}
                  >
                    👍 {post.upvotes}
                  </button>
                  <button
                    className={`vote-btn ${post.userVote === 'down' ? 'voted-down' : ''}`}
                    onClick={() => handleVote(post.id, 'down')}
                  >
                    👎 {post.downvotes}
                  </button>
                  <button className="vote-btn" style={{ marginLeft: 4 }}>💬 {post.comments}</button>
                  <button className="vote-btn" style={{ marginLeft: 'auto' }}>🔗 Share</button>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🕵️</div>
              <div className="empty-title">No posts with this filter</div>
            </div>
          )}
        </div>
      )}

      {/* ── LEADERBOARD ── */}
      {activeView === 'leaderboard' && (
        <div style={{ padding: '12px 14px 0' }}>

          {/* Hero */}
          <div style={{
            padding: 18, marginBottom: 16,
            background: 'linear-gradient(135deg, rgba(244,196,48,0.08), rgba(255,140,0,0.05))',
            border: '1px solid rgba(244,196,48,0.2)', borderRadius: 'var(--radius)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🏆</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: '#F4C430' }}>
              Top Creators
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
              The most influential AI creators this week
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LEADERBOARD.map((user, idx) => (
              <div key={user.rank} className="leaderboard-item fade-in" style={{ animationDelay: `${idx * 0.07}s` }}>
                <div className={`rank-badge ${user.rank <= 3 ? `rank-${user.rank}` : 'rank-other'}`}>
                  {user.rank <= 3 ? ['🥇','🥈','🥉'][user.rank-1] : user.rank}
                </div>

                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--surface2)', border: '2px solid var(--border2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>{user.avatar}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{user.handle}</div>
                  <div style={{ fontSize: 10, color: 'var(--accent2)', marginTop: 2 }}>
                    🏅 {user.badge}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700,
                    color: idx === 0 ? '#F4C430' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : 'var(--accent2)',
                  }}>{user.score}</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>{user.checks} checks</div>
                  <div style={{ fontSize: 10, color: 'var(--amber)', marginTop: 2 }}>{user.streak}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>🎨</div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Want to join the Leaderboard?</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>
              Generate, remix, and share viral content daily to climb the ranks.
            </div>
            <button style={{
              padding: '10px 24px', background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              border: 'none', borderRadius: 10, color: '#fff',
              fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px var(--accent-glow)',
            }}>Start Creating →</button>
          </div>
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  )
}
