export default function CreateScreen({ onScan, onRemix, onBack }) {
  return (
    <div className="screen fade-in" style={{ paddingBottom: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}>

      <button onClick={onBack} style={{ position: 'absolute', top: 30, right: 20, background: 'var(--surface2)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ✕
      </button>
      
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 32, marginBottom: 8 }}>What's next?</h2>
        <p style={{ color: 'var(--text2)', fontSize: 15 }}>Choose your AI path</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', padding: '0 20px' }}>
        
        {/* SHIELD: Verify */}
        <button onClick={onScan} style={{
          display: 'flex', alignItems: 'center', gap: 20, padding: '24px', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 24, cursor: 'pointer', transition: 'transform 0.2s',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', textAlign: 'left'
        }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>🛡️</div>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Verify Content</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>Scan a post, image, or video to detect deepfakes or scams.</div>
          </div>
        </button>

        {/* MAGIC: Create */}
        <button onClick={onRemix} style={{
          display: 'flex', alignItems: 'center', gap: 20, padding: '24px', background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.15))',
          border: '1px solid rgba(168,85,247,0.3)', borderRadius: 24, cursor: 'pointer', transition: 'transform 0.2s',
          boxShadow: '0 10px 30px rgba(168,85,247,0.1)', width: '100%', textAlign: 'left'
        }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>✨</div>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Create & Remix</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>Generate your own AI content or put yourself in a video.</div>
          </div>
        </button>

      </div>
    </div>
  )
}
