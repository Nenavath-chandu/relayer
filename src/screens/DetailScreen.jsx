import React from 'react';

const LABEL_EMOJI = {
  'REAL':         '✅',
  'FAKE':         '🚨',
  'MISLEADING':   '⚠️',
  'AI-GENERATED': '🤖',
  'ERROR':        '❌',
  'UNKNOWN':      '❓',
}

export default function DetailScreen({ post, onBack, onRemix }) {
  if (!post) return null

  const emoji = LABEL_EMOJI[post.label] || '🔍';
  
  // Provide reliable default props from old runs or errors
  const trustScore = post.trust_score ?? post.confidence ?? 0;
  const analysis = post.analysis_breakdown || {};
  const x_ray = post.x_ray_claims || [];

  const Circumference = 2 * Math.PI * 40;
  const strokeDashoffset = Circumference - (trustScore / 100) * Circumference;
  
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 40) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };
  const scoreColor = getScoreColor(trustScore);

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="screen cyber-dashboard">

      <div className="detail-header print-hide">
        <button className="back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600 }}>
            Intelligence Brief
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 1 }}>
            {post.platform} · {post.timeAgo}
          </div>
        </div>
      </div>

      <div className="detail-body">

        <div className={`verdict-banner verdict-banner-${post.label}`}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
          <div className={`verdict-label-big verdict-label-${post.label}`}>
             {post.label}
          </div>
          <div className="verdict-short">{post.verdict_short}</div>
        </div>

        {/* Dashboard Ring */}
        <div className="section-card dashboard-matrix">
           <div className="ring-container">
             <svg width="120" height="120" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="6" fill="none" />
               <circle cx="50" cy="50" r="40" stroke={scoreColor} strokeWidth="6" fill="none" 
                       strokeDasharray={Circumference} strokeDashoffset={strokeDashoffset} 
                       strokeLinecap="round" transform="rotate(-90 50 50)" 
                       style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}/>
               <text x="50" y="55" fontSize="22" fontWeight="bold" fill="var(--text)" textAnchor="middle">{trustScore}</text>
             </svg>
             <div className="ring-label">REALITY SCORE</div>
           </div>
           
           <div className="breakdown-list">
             <div className="bd-item">
                <span className="bd-title">Rhetorical Bias</span>
                <span className="bd-val">{analysis.rhetorical_bias || "None detected"}</span>
             </div>
             <div className="bd-item">
                <span className="bd-title">Logic Fallacies</span>
                <span className="bd-val">{(analysis.logical_fallacies || []).length > 0 ? analysis.logical_fallacies.join(", ") : "Clear"}</span>
             </div>
             <div className="bd-item">
                <span className="bd-title">Manipulation</span>
                <span className="bd-val">{(analysis.manipulation_tactics || []).length > 0 ? analysis.manipulation_tactics.join(", ") : "None detected"}</span>
             </div>
           </div>
        </div>

        {/* X-Ray Analysis */}
        {x_ray.length > 0 && (
           <div className="section-card">
              <div className="section-title">X-Ray Claim Analysis</div>
              <div className="xray-grid">
                {x_ray.map((cl, i) => (
                   <div key={i} className="xray-card">
                      <div className={`xray-claim`}>"{cl.claim}"</div>
                      <div className={`xray-verdict xray-${cl.verdict}`}>{cl.verdict}</div>
                      <div className="xray-correction">{cl.correction}</div>
                   </div>
                ))}
              </div>
           </div>
        )}

        <div className="section-card">
          <div className="section-title">Global Reasoning</div>
          <p className="reasoning-text">{post.reasoning}</p>
        </div>

        <div className="original-content-card">
          <div className="section-title" style={{ marginBottom: 8 }}>Source Material</div>
          <p className="original-content-text">{post.content}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Conditional Remix Button */}
          {(post.label === 'AI-GENERATED' || post.label === 'FAKE' || post.label === 'DEEPFAKE SCAM') && (
            <button
              className="print-hide"
              onClick={onRemix}
              style={{
                width: '100%', padding: '16px', background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                borderRadius: 'var(--radius)', color: '#fff', fontFamily: 'var(--font-head)',
                fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 10px 30px rgba(168,85,247,0.3)', border: 'none'
              }}
            >
              <span style={{ fontSize: 20 }}>🎭</span> Try it yourself - Remix with ReLayer AI
            </button>
          )}

          <button
            className="print-hide export-btn"
            onClick={handleExportPDF}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--surface)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius)',
              color: 'var(--accent2)',
              fontFamily: 'var(--font-head)',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
               <polyline points="7 10 12 15 17 10"></polyline>
               <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Intelligence Brief (PDF)
          </button>
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}