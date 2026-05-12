'use client'
import { useEffect, useState } from 'react'

export default function MerchantAdmin() {
  const [merchants, setMerchants] = useState<any[]>([])
  const [msg, setMsg] = useState('')

  const load = () => {
    fetch('/api/merchant/admin/list').then(r => r.json()).then(d => { if (d.data) setMerchants(d.data) })
  }

  useEffect(load, [])

  async function approve(id: string) {
    const res = await fetch('/api/merchant/admin/approve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ merchant_id: id }) })
    const data = await res.json()
    setMsg(data.message || 'Done')
    load()
    setTimeout(() => setMsg(''), 3000)
  }

  async function suspend(id: string) {
    const res = await fetch('/api/merchant/admin/suspend', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ merchant_id: id }) })
    const data = await res.json()
    setMsg(data.message || 'Done')
    load()
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32 }}>
        <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 10, padding: '6px 14px', fontSize: 12, color: '#ef4444', fontWeight: 700 }}>ADMIN</div>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Merchant Admin Panel</h1>
      </div>
      {msg && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '12px 16px', color: '#22c55e', marginBottom: 24 }}>{msg}</div>}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontWeight: 700 }}>All Merchants</div>
        {merchants.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No merchants yet</div>
        ) : merchants.map((m, i) => (
          <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 16, alignItems: 'center', padding: '14px 24px', borderBottom: i < merchants.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{m.business_name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{m.business_type}</div>
            </div>
            <div style={{ background: 'rgba(99,102,241,0.2)', color: '#6366f1', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{m.tier}</div>
            <div style={{ background: m.kyc_status === 'approved' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: m.kyc_status === 'approved' ? '#22c55e' : '#f59e0b', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>KYC: {m.kyc_status}</div>
            <div style={{ background: m.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: m.status === 'active' ? '#22c55e' : '#ef4444', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{m.status}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {m.status === 'pending' && <button onClick={() => approve(m.id)} style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>Approve</button>}
              {m.status === 'active' && <button onClick={() => suspend(m.id)} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>Suspend</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
