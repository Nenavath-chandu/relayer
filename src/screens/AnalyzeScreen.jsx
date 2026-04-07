import { useState } from 'react'
import { MOCK_POSTS } from '../data/mockData'
import { addToHistory } from "../data/history";

const PLATFORMS = [
  { id: 'WhatsApp',  icon: '💬', label: 'WhatsApp' },
  { id: 'Twitter/X', icon: '🐦', label: 'Twitter' },
  { id: 'Instagram', icon: '📷', label: 'Instagram' },
  { id: 'Facebook',  icon: '👥', label: 'Facebook' },
  { id: 'News',      icon: '📰', label: 'News' },
  { id: 'Other',     icon: '🔗', label: 'Other' },
]

function simulateAnalysis(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = MOCK_POSTS[Math.floor(Math.random() * MOCK_POSTS.length)]
      resolve({
        ...random,
        id: Date.now().toString(),
        content: text,
        timeAgo: 'Just now',
      })
    }, 3000)
  })
}

export default function AnalyzeScreen({ onBack, onResult }) {
  const [text, setText] = useState('')
  const [platform, setPlatform] = useState('WhatsApp')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dots, setDots] = useState('.')

  // ✅ ADDED: image states
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadMode, setUploadMode] = useState('text');


  function startDotAnimation() {
    let count = 1
    const interval = setInterval(() => {
      count = count >= 3 ? 1 : count + 1
      setDots('.'.repeat(count))
    }, 500)
    return interval
  }

  // ✅ ADDED: file handler
  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    if (selected.type.startsWith("image/") || selected.type.startsWith("video/")) {
      setPreview({ url: URL.createObjectURL(selected), type: selected.type });
    }
  }

  async function handleAnalyze() {
  if (!text.trim() && !file) return;

  setIsAnalyzing(true);

  try {
    let finalResult;

    // Prepare FormData for Backend
    const formData = new FormData();
    if (text.trim()) formData.append("text", text);
    if (file) formData.append("file", file);

    const res = await fetch(`http://${window.location.hostname}:8000/analyze`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    finalResult = {
      id: Date.now().toString(),
      content: file ? (text ? `[Media: ${file.name}] ` + text : `[Media: ${file.name}]`) : text,
      label: data.label || "UNKNOWN",
      trust_score: data.trust_score ?? 0,
      verdict_short: data.verdict_short || "Analysis complete",
      reasoning: data.reasoning || "No detailed reasoning provided.",
      analysis_breakdown: data.analysis_breakdown || {
        rhetorical_bias: "N/A",
        logical_fallacies: [],
        manipulation_tactics: []
      },
      x_ray_claims: data.x_ray_claims || [],
      platform: platform,
      timeAgo: "Just now",
    };

    setIsAnalyzing(false);
    setText("");
    setFile(null);
    setPreview(null);

      // SAVE HISTORY
      addToHistory({
        id: Date.now(),
        type: file && text ? "text+image" : file ? "image" : "text",
        content: text || file?.name,
        result: finalResult.label,
        timestamp: new Date().toISOString(),
      });

      onResult(finalResult);

    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      alert("API Error");
    }
  }

  return (
    <div className="screen">

      <div className="analyze-header">
        <div className="analyze-title">Check a Post</div>
        <div className="analyze-sub">Paste any text, news, or social media content below</div>
      </div>

      {isAnalyzing ? (
        <div className="analyzing-state">
          <div style={{ height: 48 }} />
          <div className="pulse-ring" />
          <div className="analyzing-text">Analyzing{dots}</div>
          <div className="analyzing-sub">Checking facts, detecting AI patterns</div>

          <div style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: '100%',
            padding: '0 20px',
          }}>
            {[
              'Scanning for factual claims...',
              'Cross-referencing fact databases...',
              'Detecting AI-generated patterns...'
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                fontSize: 13,
                color: 'var(--text3)',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent)',
                }} />
                {step}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="analyze-body">

          {/* UPLOAD MODE TABS */}
          <div style={{ marginBottom: 14 }}>
            <div className="input-label">What are you checking?</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'text', icon: '📝', label: 'Text / URL' },
                { id: 'image', icon: '🖼️', label: 'Image' },
                { id: 'video', icon: '📹', label: 'Video' },
                { id: 'reel', icon: '📱', label: 'Reel / Short' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setUploadMode(mode.id)}
                  style={{
                    padding: '8px 16px', borderRadius: 99, border: '1px solid',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: uploadMode === mode.id ? 'var(--accent)' : 'var(--surface)',
                    borderColor: uploadMode === mode.id ? 'var(--accent)' : 'var(--border)',
                    color: uploadMode === mode.id ? '#fff' : 'var(--text2)',
                    transition: 'all 0.2s',
                  }}
                >{mode.icon} {mode.label}</button>
              ))}
            </div>
          </div>

          {/* TEXT INPUT (shown for text/reel modes) */}
          {(uploadMode === 'text' || uploadMode === 'reel') && (
          <div>
            <div className="input-label">
              {uploadMode === 'reel' ? 'Paste reel/short URL to check' : 'Paste content to check'}
            </div>
            <textarea
              className="text-area"
              placeholder={
                uploadMode === 'reel'
                  ? 'Paste YouTube Shorts, Instagram Reels, or Twitter link...'
                  : 'Paste WhatsApp message, tweet, news headline, or any claim...'
              }
              value={text}
              onChange={e => setText(e.target.value)}
              rows={5}
            />
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const clipText = await navigator.clipboard.readText();
                    if (clipText && (clipText.startsWith('http') || clipText.includes('www.'))) {
                      setText(prev => prev ? prev + '\n' + clipText : clipText);
                      return;
                    }
                  } catch (e) {}
                  const link = prompt('Paste your link here:');
                  if (link) setText(prev => prev ? prev + '\n' + link : link);
                }}
                style={{
                  background: 'none', border: '1px solid var(--border)', borderRadius: 6,
                  padding: '4px 10px', fontSize: 11, color: 'var(--text3)', cursor: 'pointer',
                }}
              >🔗 Paste Link</button>
              <span>{text.length} characters</span>
            </div>
          </div>
          )}

          {/* IMAGE UPLOAD */}
          {uploadMode === 'image' && (
          <div>
            <div className="input-label">Upload an image to analyze</div>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed var(--border)', borderRadius: 12, padding: 24, cursor: 'pointer',
              background: 'var(--surface)', minHeight: 140,
            }}>
              {preview && preview.type.startsWith('image/') ? (
                <img src={preview.url} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
              ) : (
                <>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🖼️</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text2)' }}>Tap to upload image</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>JPG, PNG, WEBP · AI detection included</div>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            </label>
            {file && <div style={{ fontSize: 12, color: '#10b981', marginTop: 8 }}>✅ {file.name}</div>}
          </div>
          )}

          {/* VIDEO UPLOAD */}
          {uploadMode === 'video' && (
          <div>
            <div className="input-label">Upload a video to analyze</div>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed var(--border)', borderRadius: 12, padding: 24, cursor: 'pointer',
              background: 'var(--surface)', minHeight: 160,
            }}>
              {preview && preview.type.startsWith('video/') ? (
                <video src={preview.url} controls style={{ width: '100%', borderRadius: 8, maxHeight: 200 }} />
              ) : (
                <>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📹</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text2)' }}>Tap to upload video</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>MP4, MOV, WebM · max 100MB</div>
                </>
              )}
              <input type="file" accept="video/*" onChange={handleFileChange} hidden />
            </label>
            {file && <div style={{ fontSize: 12, color: '#10b981', marginTop: 8 }}>✅ {file.name}</div>}
          </div>
          )}

          {/* ALSO ADD TEXT for context in image/video modes */}
          {(uploadMode === 'image' || uploadMode === 'video') && (
          <div style={{ marginTop: 10 }}>
            <div className="input-label" style={{ marginBottom: 6 }}>Add context (optional)</div>
            <textarea
              className="text-area"
              placeholder="Describe what you want checked about this media..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={2}
            />
          </div>
          )}


          {/* PLATFORM SELECT (unchanged) */}
          <div>
            <div className="input-label">Source Platform</div>
            <div className="platform-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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

          {/* TIP BOX */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text2)', fontWeight: 500 }}>Tip:</strong> Copy a WhatsApp forward, Instagram caption, or news headline and paste it here. We'll analyze it in seconds.
            </div>
          </div>

          {/* ANALYZE BUTTON */}
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={!text.trim() && !file}
          >
            {text.trim() || file ? 'Analyze Now →' : 'Paste something above first'}
          </button>

          <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', lineHeight: 1.5 }}>
            Analysis takes 3–5 seconds · Results are saved to your feed · AI analysis may not be 100% accurate
          </div>

        </div>
      )}

    </div>
  )
}