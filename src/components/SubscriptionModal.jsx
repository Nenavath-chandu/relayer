export default function SubscriptionModal({ onClose, feature = 'this feature' }) {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'forever',
      color: '#9997BB',
      features: [
        '5 AI fact-checks per day',
        'Text & image analysis',
        'Community feed access',
        'Basic trust score',
        'History (last 10 checks)',
      ],
      missing: [
        'Audio deepfake detection',
        'PDF investigation reports',
        'Bulk URL checking',
        'Priority AI queue',
        'API access',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹99',
      period: '/month',
      color: '#F4C430',
      popular: true,
      features: [
        'Unlimited AI fact-checks',
        'Text, image, video & audio',
        'Audio deepfake detection 🆕',
        'PDF investigation reports',
        'Bulk URL checking (up to 50)',
        'Priority AI queue (2× faster)',
        'Full history & analytics',
        'Verified creator badge',
        'ReLayer Pro community access',
      ],
    },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>

        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--surface2)', border: 'none', color: 'var(--text)', width: 32, height: 32, borderRadius: '50%', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ✕
        </button>

        {/* Handle */}
        <div style={{ width: 36, height: 4, background: 'var(--border2)', borderRadius: 2, margin: '0 auto 20px' }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🔐</div>
          <div style={{
            fontFamily: 'var(--font-head)',
            fontSize: 22,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 30%, var(--accent2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 6,
          }}>Unlock {feature}</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>
            Upgrade to <strong style={{ color: 'var(--gold)' }}>ReLayer Pro</strong> to access advanced AI capabilities
          </div>
        </div>

        {/* Plans */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? 'pro-glow' : ''}`}
              style={{ background: plan.popular ? 'rgba(244,196,48,0.06)' : 'var(--surface)' }}
            >
              {plan.popular && <div className="plan-popular-badge">⭐ MOST POPULAR</div>}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: plan.color }}>
                    {plan.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                    {plan.id === 'free' ? 'Get started for free' : 'Full AI power, zero limits'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 700, color: plan.color }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text3)' }}>{plan.period}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                    <span style={{ color: plan.popular ? '#F4C430' : '#00E676', fontSize: 14, flexShrink: 0 }}>✓</span>
                    {f}
                  </div>
                ))}
                {plan.missing && plan.missing.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text3)', opacity: 0.6 }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>✕</span>
                    {f}
                  </div>
                ))}
              </div>

              {plan.popular && (
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    padding: '13px',
                    background: 'linear-gradient(135deg, #F4C430, #FF8C00)',
                    border: 'none',
                    borderRadius: 12,
                    color: '#000',
                    fontFamily: 'var(--font-head)',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: 0.5,
                    boxShadow: '0 4px 16px rgba(244,196,48,0.3)',
                  }}
                >
                  Start Pro — ₹99/month →
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', lineHeight: 1.6 }}>
          Cancel anytime • No hidden fees • Secure payment via Razorpay<br />
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer', marginTop: 8, textDecoration: 'underline' }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
