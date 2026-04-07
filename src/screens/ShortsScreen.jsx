import { useState, useRef } from 'react'
import { VIRAL_SHORTS } from '../data/mockData'

const CATEGORIES = ['All', 'Health', 'Science', 'Politics', 'Space', 'Technology', 'News']
const PLATFORMS = ['YouTube Shorts', 'Instagram Reels', 'Twitter/X', 'TikTok']

const VERDICT_COLORS = {
  FAKE: '#ef4444', MISLEADING: '#f59e0b',
  'AI-GENERATED': '#8b5cf6', REAL: '#10b981', UNKNOWN: '#64748b',
}

export default function ShortsScreen({ onAnalyze }) {
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('All')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()

  const filtered = category === 'All' ? VIRAL_SHORTS : VIRAL_SHORTS.filter(s => s.category === category)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    if (f.type.startsWith('video/')) setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>

      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, background: 'var(--bg)' }}>
        <div className="header-row">
          <div>
            <div className="logo">Shorts<span>Check</span></div>
            <div className="header-sub">Is this reel real? Find out instantly.</div>
          </div>
          <span style={{ fontSize: 22 }}>📱</span>
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div style={{ padding: '16px' }}>
        <div style={{
          padding: 18, background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 14,
          marginBottom: 16,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🔍 Check a Viral Reel or Short</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 14 }}>
            Paste a YouTube Shorts, Instagram Reels, or Twitter/X link — or upload your own clip
          </div>

          {/* URL Input */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Paste reel/short link here..."
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg)',
                color: 'var(--text)', fontSize: 13,
              }}
            />
            <button
              onClick={() => url.trim() && onAnalyze && onAnalyze(url)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: 'none',
                background: 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >Check</button>
          </div>

          {/* Platform Pills */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {PLATFORMS.map(p => (
              <span key={p} style={{
                fontSize: 11, padding: '3px 10px', borderRadius: 99,
                background: 'var(--bg)', border: '1px solid var(--border)',
                color: 'var(--text3)',
              }}>{p}</span>
            ))}
          </div>

          {/* Upload Video */}
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: '2px dashed var(--border)', borderRadius: 10, padding: 20,
              textAlign: 'center', cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            {preview ? (
              <video src={preview} controls style={{ width: '100%', borderRadius: 8, maxHeight: 200 }} />
            ) : (
              <>
                <div style={{ fontSize: 28, marginBottom: 6 }}>📹</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 4 }}>
                  Upload a clip to fact-check
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  MP4, MOV, WebM · max 100MB
                </div>
              </>
            )}
            <input ref={fileRef} type="file" accept="video/*" onChange={handleFile} hidden />
          </div>

          {file && (
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#10b981' }}>📁 {file.name}</span>
              <button onClick={() => onAnalyze && onAnalyze(null, file)} style={{
                padding: '8px 16px', borderRadius: 8, border: 'none',
                background: 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>Analyze Video</button>
            </div>
          )}
        </div>

        {/* CATEGORY FILTER */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 12 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 99, border: '1px solid',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: category === c ? 'var(--accent)' : 'var(--surface)',
              borderColor: category === c ? 'var(--accent)' : 'var(--border)',
              color: category === c ? '#fff' : 'var(--text2)',
            }}>{c}</button>
          ))}
        </div>

        {/* TRENDING SECTION HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 20, background: '#8b5cf6', borderRadius: 4 }} />
          <span style={{ fontWeight: 700, fontSize: 15 }}>🔥 Trending Viral Claims</span>
        </div>

        {/* SHORTS CARDS */}
        {filtered.map(short => {
          const verdictColor = VERDICT_COLORS[short.verdict] || '#64748b'
          return (
            <div key={short.id} style={{
              marginBottom: 14, padding: 14, background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                  background: verdictColor + '20', color: verdictColor,
                }}>{short.verdict}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>👁️ {short.views}</span>
              </div>

              <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.4, marginBottom: 6 }}>{short.title}</div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                marginBottom: 8,
              }}>
                {/* Mini trust bar */}
                <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{ width: `${short.trust_score}%`, height: '100%', background: verdictColor, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 11, color: verdictColor, fontWeight: 700, width: 32, textAlign: 'right' }}>{short.trust_score}%</span>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 8 }}>{short.summary}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)' }}>
                <span>📺 {short.platform}</span>
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 4,
                  background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 600,
                }}>{short.category}</span>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <div className="empty-title">No videos in this category</div>
          </div>
        )}

        {/* INFO BANNER */}
        <div style={{ padding: 14, background: 'rgba(139,92,246,0.08)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.2)', marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5, color: '#8b5cf6' }}>🤖 How it Works</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            Our AI analyzes visual artifacts, audio claims, metadata, and cross-references live web sources to determine if a video is real, AI-generated, or misleading.
          </div>
        </div>
      </div>
    </div>
  )
}
