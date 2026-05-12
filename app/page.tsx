export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 100, padding: '8px 20px', marginBottom: 24, fontSize: 13, color: '#6366f1' }}>
          🏪 IT-S Merchant Portal
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(135deg,#ffffff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Accept IT-S Coin.<br />Grow Your Business.
        </h1>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
          Join IT-S Universe as a merchant. Accept ITS payments, manage settlements, and grow with transparent fees.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '14px 32px', borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>Register as Merchant</a>
          <a href="/dashboard" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '14px 32px', borderRadius: 14, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>Go to Dashboard</a>
        </div>
      </div>

      <div style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Merchant Tiers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { tier: 'Starter', range: '0–100K PKR/mo', fee: '1.5%', color: '#6366f1', features: ['Basic dashboard', 'API access', 'Webhook support'] },
            { tier: 'Growth', range: '100K–1M PKR/mo', fee: '1.0%', color: '#22d3ee', features: ['Advanced analytics', 'Priority support', 'Bulk settlements'] },
            { tier: 'Pro', range: '1M–10M PKR/mo', fee: '0.75%', color: '#22c55e', features: ['Custom integration', 'Dedicated support', 'Real-time reports'] },
            { tier: 'Enterprise', range: '10M+ PKR/mo', fee: '0.5%', color: '#f59e0b', features: ['Custom SLA', 'White-label option', 'Direct bank settlement'] },
          ].map(t => (
            <div key={t.tier} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.color}40`, borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: t.color, borderRadius: '20px 20px 0 0' }} />
              <div style={{ fontSize: 12, color: t.color, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{t.tier}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: t.color, marginBottom: 4 }}>{t.fee}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>{t.range}</div>
              {t.features.map(f => (
                <div key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'flex', gap: 8 }}>
                  <span style={{ color: t.color }}>✓</span> {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
