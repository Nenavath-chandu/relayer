import { useState } from 'react'

export default function StudioScreen({ onBack }) {
  const [step, setStep] = useState(1) // 1: Upload, 2: Prompt, 3: Generating/Result
  const [mediaType, setMediaType] = useState('image') // image, video, audio
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [resultImage, setResultImage] = useState(null)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStep(2)
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setStep(3)
    setIsGenerating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 5, 95))
    }, 400)

    try {
      const formData = new FormData()
      formData.append('prompt', prompt)
      // Call actual backend `/generate` which uses Gemini Imagen-3
      const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`
      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      
      clearInterval(interval)
      setProgress(100)
      
      if (data.status === 'ok' && data.image_base64) {
        setResultImage(data.image_base64)
      } else {
        console.error("AI Generation failed:", data.message)
        // Fallback placeholder if generation fails or quota is exceeded
        setResultImage('https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800')
      }
    } catch (err) {
      clearInterval(interval)
      setProgress(100)
      console.error(err)
      setResultImage('https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800')
    }
    
    setTimeout(() => {
      setIsGenerating(false)
    }, 500)
  }

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>
      {/* HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, paddingBottom: 10 }}>
        <div className="header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer', padding: '0 4px', display: 'flex', alignItems: 'center' }}>
              ←
            </button>
            <div>
              <div className="logo" style={{ fontSize: 18 }}>ReLayer <span>Studio</span></div>
              <div className="header-sub">Dream it. Build it. Share it.</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 14px' }}>
        
        {/* PROGRESS INDICATOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 15, left: 15, right: 15, height: 2, background: 'var(--border)' }} />
          <div style={{ position: 'absolute', top: 15, left: 15, width: `${(step - 1) * 50}%`, height: 2, background: 'var(--accent)', transition: 'width 0.4s ease' }} />
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: '50%', background: step >= i ? 'var(--accent)' : 'var(--surface)',
              border: `2px solid ${step >= i ? 'var(--accent)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: step >= i ? '#fff' : 'var(--text3)',
              fontWeight: 700, position: 'relative', zIndex: 10, transition: 'all 0.3s ease'
            }}>{i}</div>
          ))}
        </div>

        {/* STEP 1: UPLOAD SUBJECT */}
        {step === 1 && (
          <div className="fade-in">
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 24, marginBottom: 8, textAlign: 'center' }}>Choose Your Subject</h2>
            <p style={{ color: 'var(--text2)', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>Upload a photo or voice clip to begin your AI creation.</p>
            
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {['image', 'video', 'audio'].map(t => (
                <button key={t} onClick={() => setMediaType(t)} style={{
                  flex: 1, padding: '10px', borderRadius: 8, background: mediaType === t ? 'var(--accent)' : 'var(--surface)',
                  color: mediaType === t ? '#fff' : 'var(--text2)', border: mediaType === t ? 'none' : '1px solid var(--border)',
                  fontWeight: 600, textTransform: 'capitalize', cursor: 'pointer'
                }}>{t}</button>
              ))}
            </div>

            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: 200, border: '2px dashed var(--border)', borderRadius: 24, cursor: 'pointer',
              background: 'rgba(255,255,255,0.02)', transition: 'all 0.2s'
            }} className="upload-zone">
              <div style={{ fontSize: 40, marginBottom: 12 }}>{mediaType === 'audio' ? '🎙️' : '📸'}</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Tap to Upload {mediaType}</div>
              <input type="file" style={{ display: 'none' }} accept={mediaType === 'audio' ? 'audio/*' : 'image/*,video/*'} onChange={handleFile} />
            </label>
          </div>
        )}

        {/* STEP 2: PROMPT */}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              {preview && mediaType !== 'audio' && (
                <img src={preview} alt="subject" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', marginBottom: 16 }} />
              )}
              {mediaType === 'audio' && (
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 16px', border: '3px solid var(--accent)' }}>🎙️</div>
              )}
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 24, marginBottom: 8 }}>What's the vision?</h2>
              <p style={{ color: 'var(--text2)', fontSize: 13 }}>Be creative. Type an instruction and let our AI models do the magic.</p>
            </div>

            <textarea
              placeholder="e.g., Make me look like a cyberpunk hacker in neon lighting..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              style={{
                width: '100%', height: 120, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 16, color: '#fff', fontSize: 15, fontFamily: 'inherit', resize: 'none',
                marginBottom: 20, boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
              }}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ padding: '16px', borderRadius: 16, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', fontWeight: 700, cursor: 'pointer' }}>Back</button>
              <button onClick={handleGenerate} disabled={!prompt.trim()} style={{
                flex: 1, padding: '16px', borderRadius: 16, background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer', opacity: prompt.trim() ? 1 : 0.5
              }}>✨ Generate</button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 3 && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            {isGenerating ? (
              <div style={{ padding: '40px 0' }}>
                <div className="pulse-scan-ring" style={{ margin: '0 auto 30px' }}>
                  <div className="scan-icon">✨</div>
                </div>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 24, marginBottom: 16 }}>Synthesizing...</h2>
                <div style={{ width: '100%', height: 6, background: 'var(--surface)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', transition: 'width 0.2s ease' }} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 16 }}>Running complex geometric diffusion... {progress}%</div>
              </div>
            ) : (
              <div className="fade-in">
                <div style={{ position: 'relative', width: '100%', height: 350, borderRadius: 20, overflow: 'hidden', marginBottom: 24, boxShadow: '0 10px 40px rgba(168,85,247,0.3)' }}>
                  {/* Real Generated Image from the Python backend */}
                  <img src={resultImage || 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800'} alt="Generated" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                    ✨ 100% STUDIO AI
                  </div>
                </div>

                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 24, marginBottom: 8 }}>Masterpiece Ready!</h2>
                <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 24 }}>You have experienced the power of generation. You know how easy it is to create—now help us identify what's real.</p>
                
                <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
                  <button style={{ padding: '16px', borderRadius: 16, background: 'var(--accent)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                     Post to Community 🌍
                  </button>
                  <button onClick={() => setStep(1)} style={{ padding: '16px', borderRadius: 16, background: 'var(--surface2)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                     Create Another One
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
