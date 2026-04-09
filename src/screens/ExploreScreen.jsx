import { useState, useEffect } from 'react'

const MOCK_MONITOR_FEED = [
  { id: '1', user: '@crypto_king', platform: 'Instagram', content: 'Elon Musk launching new Quantum Coin this Friday! Guaranteed 100x returns! 🚀', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=400', isFake: true, overlay: 'DEEPFAKE SCAM DETECTED' },
  { id: '2', user: '@nature_daily', platform: 'Instagram', content: 'Beautiful sunset over the Swiss Alps today.', image: 'https://images.unsplash.com/photo-1506744626753-1fa44df31c7f?auto=format&fit=crop&q=80&w=400', isFake: false, overlay: 'VERIFIED CONTENT' },
  { id: '3', user: '@political_insider', platform: 'X', content: 'Shocking photo from the debates last night!', image: 'https://images.unsplash.com/photo-1605335697204-edcf04b78ae6?auto=format&fit=crop&q=80&w=400', isFake: true, overlay: 'AI GENERATED IMAGE' },
  { id: '4', user: '@dancecraze_101', platform: 'TikTok', content: 'This new choreography is impossible to do! 🤯🕺', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=400', isFake: false, overlay: 'REMIXABLE AI TEMPLATE' },
  { id: '5', user: '@tech_reviewer', platform: 'YouTube', content: 'Do NOT buy the new iPhone until you watch this leaked footage.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400', isFake: true, overlay: 'CLICKBAIT LLM SCRIPT' },
  { id: '6', user: 'u/stock_bets', platform: 'Reddit', content: 'Insiders say the CEO is stepping down tomorrow. Sell now.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400', isFake: true, overlay: 'UNVERIFIED RUMOR' }
]

const PLATFORMS = [
  { id: 'instagram', label: 'IG', color: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' },
  { id: 'x', label: 'X', color: '#111' },
  { id: 'tiktok', label: 'TikTok', color: 'linear-gradient(135deg, #00f2fe, #fe0979)' },
  { id: 'youtube', label: 'YT', color: '#FF0000' },
  { id: 'reddit', label: 'Reddit', color: '#FF4500' }
]

export default function ExploreScreen() {
  const [platform, setPlatform] = useState('x')
  const [liveFeed, setLiveFeed] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`
    fetch(`${API_URL}/news?region=world`)
      .then(r => r.json())
      .then(d => {
         if (d.articles && d.articles.length > 0) {
            const mapped = d.articles.map((a, i) => ({
                id: a.id || String(i),
                user: `@${a.source.replace(/\s+/g, '').toLowerCase()}`,
                platform: ['Instagram', 'X', 'TikTok', 'YouTube', 'Reddit'][i % 5],
                content: a.headline,
                image: a.image || 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=400',
                isFake: i % 3 === 0,
                overlay: i % 3 === 0 ? 'UNVERIFIED / THREAT CAUGHT' : 'VERIFIED SOURCE'
            }))
            setLiveFeed(mapped)
         } else {
            setLiveFeed(MOCK_MONITOR_FEED)
         }
         setIsLoading(false)
      })
      .catch(() => {
         setLiveFeed(MOCK_MONITOR_FEED)
         setIsLoading(false)
      })
  }, [])

  const feed = liveFeed.filter(p => p.platform.toLowerCase() === platform.toLowerCase())

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>
      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, paddingBottom: 10 }}>
        <div className="header-row" style={{ marginBottom: 12 }}>
          <div>
            <div className="logo" style={{ fontSize: 20 }}>Live <span>Monitor</span></div>
            <div className="header-sub">Dynamic Social Overlay Dashboard</div>
          </div>
        </div>
        
        {/* Filter Scroll Row */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
          {PLATFORMS.map(p => (
            <button key={p.id} onClick={() => setPlatform(p.id)} style={{
              background: platform === p.id ? p.color : 'var(--surface2)',
              color: '#fff', border: platform === p.id ? 'none' : '1px solid var(--border)', 
              padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              flexShrink: 0, transition: 'all 0.2s ease',
              boxShadow: platform === p.id ? '0 4px 10px rgba(0,0,0,0.3)' : 'none'
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 14px 0' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(0,230,118,0.1), rgba(0,230,118,0.02))', 
          border: '1px solid rgba(0,230,118,0.3)', borderRadius: 16, padding: 16, marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
             <div style={{ fontSize: 14, color: '#00E676', fontWeight: 700, marginBottom: 4 }}>ReLayer Shield Active</div>
             <div style={{ fontSize: 11, color: 'var(--text3)' }}>Monitoring {platform.charAt(0).toUpperCase() + platform.slice(1)} feed in real-time...</div>
          </div>
          <div style={{ padding: 4, background: 'rgba(0,230,118,0.2)', borderRadius: '50%' }}>
            <div style={{ width: 12, height: 12, background: '#00E676', borderRadius: '50%', boxShadow: '0 0 12px #00E676', animation: 'pulseDot 1.5s infinite' }} />
          </div>
        </div>

        {/* FEED SIMULATION */}
        <div className="secure-feed-container">
          {feed.map((post, i) => (
            <div key={post.id} className="simulated-post fade-in" style={{ animationDelay: `${i * 0.1}s`, position: 'relative', marginBottom: 24, borderRadius: 16, overflow: 'hidden', border: `2px solid ${post.isFake ? 'var(--red)' : '#00E676'}`, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              
              {/* Overlay Badge */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, padding: 10, textAlign: 'center',
                background: post.isFake ? 'rgba(255,23,68,0.9)' : 'rgba(0,230,118,0.9)',
                color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: 1, zIndex: 10,
                backdropFilter: 'blur(8px)', borderBottom: `1px solid ${post.isFake ? 'var(--red)' : '#00E676'}`
              }}>
                {post.overlay}
              </div>

              {/* Header */}
              <div style={{ padding: '44px 14px 10px', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{post.user.charAt(1)}</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{post.user}</div>
                </div>
              </div>

              {/* Image */}
              <div style={{ width: '100%', height: 320, backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                {post.isFake && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,23,68,0.2)' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ padding: 14, background: 'var(--surface)', fontSize: 13, lineHeight: 1.4 }}>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{post.user}</span> <span style={{ color: 'var(--text2)' }}>{post.content}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: post.isFake ? '1fr' : '1fr 1fr', padding: 0 }}>
                {post.isFake ? (
                  <button style={{
                    width: '100%', background: 'var(--red)', color: '#fff', border: 'none', padding: 16,
                    fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-head)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}>
                    🛡️ Open Threat Report ❯
                  </button>
                ) : (
                  <>
                    <button style={{
                      background: 'var(--surface2)', color: '#fff', border: 'none', borderRight: '1px solid var(--border)', padding: 16,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer'
                    }}>
                      💬 Discuss
                    </button>
                    <button style={{
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', border: 'none', padding: 16,
                      fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                    }}>
                      ✨ Remix this
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
             <div className="fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 30, height: 30, border: '3px solid #00E676', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                <div style={{ color: '#00E676', fontSize: 14, fontWeight: 600 }}>Intercepting global feeds...</div>
             </div>
          )}

          {!isLoading && feed.length === 0 && (
             <div className="fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🛡️</div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-head)', marginBottom: 8, color: '#00E676' }}>No active threats detected</div>
                <div style={{ color: 'var(--text3)', fontSize: 14, lineHeight: 1.5 }}>ReLayer is currently scanning {platform.charAt(0).toUpperCase() + platform.slice(1)}. We will notify you if any campaigns appear.</div>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
