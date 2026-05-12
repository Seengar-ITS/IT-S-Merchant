'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [form, setForm] = useState({ business_name: '', business_type: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Please sign in first'); setLoading(false); return }
    const res = await fetch('/api/merchant/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, user_id: user.id }) })
    const data = await res.json()
    if (data.error) { setError(data.error); setLoading(false); return }
    setResult(data.data); setLoading(false)
  }

  if (result) return (
    <div style={{ maxWidth: 480, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 24, padding: 48 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#22c55e' }}>Application Submitted!</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, marginBottom: 24 }}>Your merchant application is under review. KYC verification typically takes 1-2 business days.</p>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Merchant ID</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#22d3ee' }}>{result.id}</div>
        </div>
        <a href="/dashboard" style={{ display: 'block', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '14px', borderRadius: 14, textDecoration: 'none', fontWeight: 700 }}>Go to Dashboard</a>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 24px' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 24, padding: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Merchant Registration</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontSize: 14 }}>Accept IT-S Coin payments for your business</p>
        <form onSubmit={handleRegister}>
          {[
            { key: 'business_name', label: 'Business Name', placeholder: 'Your business name', type: 'text' },
            { key: 'business_type', label: 'Business Type', placeholder: 'e.g. E-commerce, Services, Retail', type: 'text' },
            { key: 'description', label: 'Description', placeholder: 'What does your business do?', type: 'text' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 8 }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '14px 16px', color: 'white', width: '100%', outline: 'none', fontSize: 15, boxSizing: 'border-box' }} required />
            </div>
          ))}
          {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', color: '#ef4444', fontSize: 14, marginBottom: 20 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '16px', borderRadius: 14, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}
