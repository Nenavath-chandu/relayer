import { useState } from 'react'
import { MOCK_POSTS } from '../data/mockData'
import { addToHistory } from '../data/history'
import SubscriptionModal from '../components/SubscriptionModal'

const PLATFORMS = [
  { id: 'WhatsApp',   icon: '💬', label: 'WhatsApp' },
  { id: 'Twitter/X',  icon: '🐦', label: 'Twitter' },
  { id: 'Instagram',  icon: '📷', label: 'Instagram' },
  { id: 'Facebook',   icon: '👥', label: 'Facebook' },
  { id: 'News',       icon: '📰', label: 'News' },
  { id: 'Other',      icon: '🔗', label: 'Other' },
]

const DOMAINS = [
  { id: 'general',   icon: '🔍', label: 'General' },
  { id: 'health',    icon: '🏥', label: 'Health' },
  { id: 'finance',   icon: '💰', label: 'Finance' },
  { id: 'politics',  icon: '🏛️', label: 'Politics' },
  { id: 'tech',      icon: '🤖', label: 'Tech' },
  { id: 'legal',     icon: '⚖️', label: 'Legal' },
]

const UPLOAD_MODES = [
  { id: 'text',  icon: '📝', label: 'Text/URL' },
  { id: 'image', icon: '🖼️', label: 'Image' },
  { id: 'video', icon: '📹', label: 'Video' },
  { id: 'audio', icon: '🎙️', label: 'Audio', premium: true },
  { id: 'reel',  icon: '📱', label: 'Reel' },
]

const STEPS = [
  'Scanning for factual claims…',
  'Cross-referencing fact databases…',
  'Detecting AI-generated patterns…',
  'Checking rhetorical manipulation…',
  'Generating trust score…',
]

export default function AnalyzeScreen({ onBack, onResult }) {
  const [text, setText] = useState('')
  const [platform, setPlatform] = useState('WhatsApp')
  const [domain, setDomain] = useState('general')
  const [uploadMode, setUploadMode] = useState('text')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [ringPct, setRingPct] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)

  function handleFileChange(e) {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    if (selected.type.startsWith('image/') || selected.type.startsWith('video/') || selected.type.startsWith('audio/')) {
      setPreview({ url: URL.createObjectURL(selected), type: selected.type })
    }
  }

  function handleModeSelect(mode) {
    if (mode.premium) { setShowPaywall(true); return }
    setUploadMode(mode.id)
  }

  async function handleAnalyze() {
    if (!text.trim() && !file) return
    setIsAnalyzing(true)
    setStepIdx(0)
    setRingPct(0)

    // Animate steps
    const stepInterval = setInterval(() => {
      setStepIdx(i => Math.min(i + 1, STEPS.length - 1))
      setRingPct(p => Math.min(p + 20, 95))
    }, 700)

    try {
      const formData = new FormData()
      if (text.trim()) formData.append('text', text)
      if (file) formData.append('file', file)

      const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`
      const res = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      clearInterval(stepInterval)
      setRingPct(100)

      const finalResult = {
        id: Date.now().toString(),
        content: file ? (text ? `[Media: ${file.name}] ` + text : `[Media: ${file.name}]`) : text,
        label: data.label || 'UNKNOWN',
        trust_score: data.trust_score ?? 0,
        verdict_short: data.verdict_short || 'Analysis complete',
        reasoning: data.reasoning || 'No detailed reasoning provided.',
        analysis_breakdown: data.analysis_breakdown || { rhetorical_bias: 'N/A', logical_fallacies: [], manipulation_tactics: [] },
        x_ray_claims: data.x_ray_claims || [],
        platform,
        domain,
        timeAgo: 'Just now',
      }

      addToHistory({
        id: Date.now(),
        type: file && text ? 'text+media' : file ? 'media' : 'text',
        content: text || file?.name,
        result: finalResult.label,
        timestamp: new Date().toISOString(),
      })

      setTimeout(() => {
        setIsAnalyzing(false)
        setText('')
        setFile(null)
        setPreview(null)
        onResult(finalResult)
      }, 600)

    } catch (err) {
      console.error(err)
      clearInterval(stepInterval)
      setIsAnalyzing(false)
      alert('Backend not reachable. Make sure the Python server is running.')
    }
  }

  const circumference = 2 * Math.PI * 38
  const dash = circumference - (circumference * ringPct) / 100

  return (
    <div className="screen">
      {showPaywall && <SubscriptionModal feature="Audio Deepfake Detection" onClose={() => setShowPaywall(false)} />}

      <div className="analyze-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer', padding: '0 4px', display: 'flex', alignItems: 'center' }}>
            ←
          </button>
          <div className="analyze-title">Fact Check</div>
          <span style={{
            fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 700,
            background: 'rgba(124,91,245,0.12)', color: 'var(--accent2)',
            border: '1px solid rgba(124,91,245,0.2)',
          }}>AI POWERED</span>
        </div>
        <div className="analyze-sub" style={{ paddingLeft: 34 }}>Paste text, upload image/video, or share a link to verify</div>
      </div>

      {isAnalyzing ? (
        <div className="analyzing-state">
          <div style={{ height: 32 }} />

          {/* Animated ring */}
          <div className="trust-ring-container" style={{ width: 100, height: 100 }}>
            <svg width="100" height="100" viewBox="0 0 100 100" className="reality-score-ring">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--surface2)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="38" fill="none"
                stroke="var(--accent2)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dash}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <div className="trust-ring-label">
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--accent2)' }}>
                {ringPct}%
              </div>
              <div style={{ fontSize: 9, color: 'var(--text3)' }}>SCANNING</div>
            </div>
          </div>

          <div className="analyzing-text">Analyzing Content</div>
          <div className="analyzing-sub">ReLayer AI is verifying your content</div>

          <div style={{ width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STEPS.map((step, i) => (
              <div key={i} className="analysis-step" style={{
                animationDelay: `${i * 0.15}s`,
                opacity: i <= stepIdx ? 1 : 0.3,
                borderColor: i === stepIdx ? 'var(--accent)' : 'var(--border)',
              }}>
                <div className="step-dot" style={{ background: i < stepIdx ? '#00E676' : i === stepIdx ? 'var(--accent2)' : 'var(--text3)' }} />
                <span style={{ color: i <= stepIdx ? 'var(--text2)' : 'var(--text3)' }}>{step}</span>
                {i < stepIdx && <span style={{ marginLeft: 'auto', color: '#00E676', fontSize: 12 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="analyze-body">

          {/* Upload Mode Tabs */}
          <div>
            <div className="input-label">What are you checking?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6 }}>
              {UPLOAD_MODES.map(mode => (
                <button
                  key={mode.id}
                  className={`analyze-mode-tab ${uploadMode === mode.id ? 'active' : ''}`}
                  onClick={() => handleModeSelect(mode)}
                  style={{ position: 'relative' }}
                >
                  <span style={{ fontSize: 18 }}>{mode.icon}</span>
                  <span>{mode.label}</span>
                  {mode.premium && (
                    <span style={{
                      position: 'absolute', top: -4, right: -4,
                      background: 'linear-gradient(135deg, #F4C430, #FF8C00)',
                      color: '#000', fontSize: 7, fontWeight: 800,
                      padding: '1px 4px', borderRadius: 4,
                    }}>PRO</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Domain Selector */}
          <div>
            <div className="input-label">Content Domain</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {DOMAINS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setDomain(d.id)}
                  style={{
                    padding: '8px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid',
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    background: domain === d.id ? 'rgba(124,91,245,0.12)' : 'var(--surface)',
                    borderColor: domain === d.id ? 'var(--accent)' : 'var(--border)',
                    color: domain === d.id ? 'var(--accent2)' : 'var(--text2)',
                    fontFamily: 'var(--font-body)', transition: 'all 0.15s',
                  }}
                >
                  {d.icon} {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          {(uploadMode === 'text' || uploadMode === 'reel') && (
            <div>
              <div className="input-label">
                {uploadMode === 'reel' ? 'Paste reel/short URL to check' : 'Paste content to check'}
              </div>
              <textarea
                className="text-area"
                placeholder={
                  uploadMode === 'reel'
                    ? 'Paste YouTube Shorts, Instagram Reels, or Twitter link…'
                    : 'Paste WhatsApp forward, tweet, news headline, or any claim…'
                }
                value={text}
                onChange={e => setText(e.target.value)}
                rows={5}
              />
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const clipText = await navigator.clipboard.readText()
                      if (clipText) { setText(clipText); return }
                    } catch (e) {}
                    const link = prompt('Paste your content here:')
                    if (link) setText(link)
                  }}
                  style={{
                    background: 'none', border: '1px solid var(--border)', borderRadius: 6,
                    padding: '4px 10px', fontSize: 11, color: 'var(--text2)', cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >📋 Paste from clipboard</button>
                <span>{text.length} chars</span>
              </div>
            </div>
          )}

          {/* Image Upload */}
          {uploadMode === 'image' && (
            <div>
              <div className="input-label">Upload image to analyze</div>
              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed var(--border2)', borderRadius: 14, padding: 24, cursor: 'pointer',
                background: 'var(--surface)', minHeight: 140, transition: 'border-color 0.2s',
              }}>
                {preview && preview.type.startsWith('image/') ? (
                  <img src={preview.url} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 10 }} />
                ) : (
                  <>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>🖼️</div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text2)' }}>Tap to upload image</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>JPG, PNG, WEBP · AI detection included</div>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              </label>
              {file && <div style={{ fontSize: 12, color: '#00E676', marginTop: 8 }}>✅ {file.name}</div>}
            </div>
          )}

          {/* Video Upload */}
          {uploadMode === 'video' && (
            <div>
              <div className="input-label">Upload video to analyze</div>
              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed var(--border2)', borderRadius: 14, padding: 24, cursor: 'pointer',
                background: 'var(--surface)', minHeight: 140,
              }}>
                {preview && preview.type.startsWith('video/') ? (
                  <video src={preview.url} controls style={{ width: '100%', borderRadius: 10, maxHeight: 200 }} />
                ) : (
                  <>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>📹</div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text2)' }}>Tap to upload video</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>MP4, MOV, WebM · max 100MB</div>
                  </>
                )}
                <input type="file" accept="video/*" onChange={handleFileChange} hidden />
              </label>
              {file && <div style={{ fontSize: 12, color: '#00E676', marginTop: 8 }}>✅ {file.name}</div>}
            </div>
          )}

          {/* Optional context for media modes */}
          {(uploadMode === 'image' || uploadMode === 'video') && (
            <div>
              <div className="input-label" style={{ marginBottom: 6 }}>Add context (optional)</div>
              <textarea
                className="text-area"
                placeholder="Describe what you want checked about this media…"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={2}
              />
            </div>
          )}

          {/* Platform Select */}
          <div>
            <div className="input-label">Source Platform</div>
            <div className="platform-grid">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  className={`platform-btn ${platform === p.id ? 'selected' : ''}`}
                  onClick={() => setPlatform(p.id)}
                >
                  <span className="platform-icon">{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '12px 14px',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.55 }}>
              <strong style={{ color: 'var(--text2)', fontWeight: 500 }}>Tip:</strong> Copy any WhatsApp forward, Instagram caption, or news headline and paste it here. ReLayer AI will analyze it in seconds using multi-source verification.
            </div>
          </div>

          {/* Analyze Button */}
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={!text.trim() && !file}
          >
            {text.trim() || file ? '🔍 Analyze Now →' : 'Paste something above first'}
          </button>

          <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', lineHeight: 1.6 }}>
            Analysis takes 3–5 seconds · Results saved to your history · AI analysis may not be 100% accurate
          </div>
        </div>
      )}
    </div>
  )
}