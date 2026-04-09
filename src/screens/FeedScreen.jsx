import { useState } from 'react'
import SubscriptionModal from '../components/SubscriptionModal'

export default function FeedScreen({ onSelectPost }) {
  const [shareInput, setShareInput] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallFeature, setPaywallFeature] = useState('')

  return (
    <div className="screen" style={{ overflowY: 'auto', paddingBottom: 90 }}>
      {showPaywall && <SubscriptionModal feature={paywallFeature} onClose={() => setShowPaywall(false)} />}
      
      {/* BRAND HEADER */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 200, paddingBottom: 10 }}>
        <div className="header-row">
          <div>
            <div className="logo" style={{ fontSize: 24 }}>Re<span>Layer</span></div>
            <div className="header-sub" style={{ fontSize: 13 }}>Command Center</div>
          </div>
          <button style={{
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            borderRadius: 20, width: 36, height: 36, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>👤</button>
        </div>
      </div>

      <div style={{ padding: '16px 14px' }}>
        
        {/* PILLAR 1: Omni-Share Hub */}
        <div className="fade-in" style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24,
          padding: '24px 20px', marginBottom: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, marginBottom: 8 }}>1. Share & Explore</h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 16, lineHeight: 1.4 }}>
            Share any social media link or content with us. We instantly break it down to check for Reality, or let you Remix it into your own creation.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              type="text" 
              placeholder="Paste Instagram/X/YouTube link here..." 
              value={shareInput}
              onChange={(e) => setShareInput(e.target.value)}
              style={{
                flex: 1, background: 'var(--bg)', border: '1px solid var(--border2)',
                borderRadius: 12, padding: '0 16px', color: '#fff', fontSize: 14,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))', border: 'none',
              borderRadius: 12, padding: '14px 20px', color: '#fff', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
            }}>
              Explore →
            </button>
          </div>
        </div>

        {/* PILLAR 2: News-to-Creator Engine (Premium) */}
        <div className="fade-in" style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(99,102,241,0.05))',
          border: '1px solid rgba(168,85,247,0.3)', borderRadius: 24, padding: '24px 20px',
          marginBottom: 20, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,179,0,0.2)', color: 'var(--amber)', padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 800, border: '1px solid rgba(255,179,0,0.4)', letterSpacing: 1 }}>PREMIUM</div>
          
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, marginBottom: 8, color: '#fff' }}>2. Global Creator Engine</h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 16, lineHeight: 1.4 }}>
            Curious about creating content on popular news from local to globe? We pull trusted sources, structure the script, and generate an undetectable AI video using your voice and face.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button 
              onClick={() => { setPaywallFeature('Global News Engine'); setShowPaywall(true); }}
              style={{
                background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 12, padding: '12px',
                color: '#fff', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center'
              }}>🌍 Fetch Global News</button>
            <button 
              onClick={() => { setPaywallFeature('AI Persona Training'); setShowPaywall(true); }}
              style={{
                background: 'linear-gradient(135deg, #FF4B2B, #FF416C)', border: 'none', borderRadius: 12, padding: '12px',
                color: '#fff', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(255,65,108,0.3)'
              }}>🎙️ Train My AI Persona</button>
          </div>
        </div>

        {/* PILLAR 3: Live Social Monitor (Premium) */}
        <div className="fade-in" style={{
          background: 'linear-gradient(135deg, rgba(0,230,118,0.05), rgba(0,230,118,0.02))',
          border: '1px solid rgba(0,230,118,0.2)', borderRadius: 24, padding: '24px 20px',
          marginBottom: 20, position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,179,0,0.2)', color: 'var(--amber)', padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 800, border: '1px solid rgba(255,179,0,0.4)', letterSpacing: 1 }}>PREMIUM</div>
          
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, marginBottom: 8, color: '#00E676' }}>3. Dynamic Social Monitor</h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 16, lineHeight: 1.4 }}>
            Want to check your social apps dynamically? We monitor and extract real intelligence live over your apps, keeping you safe while you scroll.
          </p>
          <button 
            onClick={() => { setPaywallFeature('Live Social Monitor'); setShowPaywall(true); }}
            style={{
              width: '100%', background: 'rgba(0,230,118,0.1)', border: '1px solid #00E676', borderRadius: 12, padding: '14px',
              color: '#00E676', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center'
            }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E676', boxShadow: '0 0 10px #00E676' }}></div>
            Activate Live Overlay Module
          </button>
        </div>

        {/* PILLAR 4: Reality Seal Protocol (Visionary) */}
        <div className="fade-in" style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: '24px 20px',
          marginBottom: 20, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', right: -20, bottom: -20, width: 100, height: 100, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), transparent)', filter: 'blur(30px)', opacity: 0.5
          }}></div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, marginBottom: 8 }}>4. The Reality Protocol</h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 0, lineHeight: 1.4 }}>
            Protect your digital identity. Every creation generated in ReLayer is cryptographically watermarked. By sealing your content, no one can successfully steal your persona without raising a Reality Alert. 
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
             <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.1)', color: 'var(--text2)', fontWeight: 700, border: '1px solid var(--border2)' }}>
               🛡️ IDENTITY SECURED
             </span>
          </div>
        </div>

      </div>
    </div>
  )
}