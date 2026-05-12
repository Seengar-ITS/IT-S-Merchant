'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([])
  const [merchant, setMerchant] = useState<any>(null)
  const [keyName, setKeyName] = useState('')
  const [newKey, setNewKey] = useState<any>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const dashRes = await fetch(`/api/merchant/dashboard?user_id=${user.id}`)
      const dashData = await dashRes.json()
      if (dashData.merchant) {
        setMerchant(dashData.merchant)
        const keysRes = await fetch(`/api/merchant/keys?merchant_id=${dashData.merchant.id}`)
        const keysData = await keysRes.json()
        if (keysData.data) setKeys(keysData.data)
      }
    }
    load()
  }, [])

  async function generate(e: React.FormEvent) {
    e.preventDefault()
    if (!merchant || !keyName) return
    const res = await fetch('/api/merchant/keys/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ merchant_id: merchant.id, key_name: keyName, permissions: ['read', 'write'] }) })
    const data = await res.json()
    if (data.data) { setNewKey(data.data); setKeys(prev => [data.data, ...prev]); setKeyName('') }
  }

  function mask(k: string) { return k.slice(0, 12) + '...' + k.slice(-6) }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>🔑 API Keys</h1>
      {newKey && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#22c55e', marginBottom: 12 }}>⚠️ Save these keys now — they won't be shown again!</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>API Key</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '10px 14px', color: '#22d3ee' }}>{newKey.api_key}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Secret Key</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '10px 14px', color: '#f59e0b' }}>{newKey.secret_key}</div>
          </div>
        </div>
      )}
      <form onSubmit={generate} style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <input type="text" placeholder="Key name (e.g. Production, Testing)" value={keyName} onChange={e => setKeyName(e.target.value)}
          style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 16px', color: 'white', outline: 'none', fontSize: 15 }} required />
        <button type="submit" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '12px 24px', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Generate Key</button>
      </form>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
        {keys.length === 0 ? <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No API keys yet</div>
          : keys.map((k, i) => (
          <div key={k.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 16, alignItems: 'center', padding: '16px 24px', borderBottom: i < keys.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{k.key_name}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{mask(k.api_key)}</div>
            </div>
            <div style={{ background: k.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: k.status === 'active' ? '#22c55e' : '#ef4444', padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{k.status}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{new Date(k.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
