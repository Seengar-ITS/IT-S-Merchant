'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MerchantDashboard() {
  const [merchant, setMerchant] = useState<any>(null)
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0, total_txns: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/register'; return }
      const res = await fetch(`/api/merchant/dashboard?user_id=${user.id}`)
      const data = await res.json()
      if (data.merchant) setMerchant(data.merchant)
      if (data.stats) setStats(data.stats)
      setLoading(false)
    }
    load()
  }, [])

  const tierColor = (t: string) => ({ starter: '#6366f1', growth: '#22d3ee', pro: '#22c55e', enterprise: '#f59e0b' }[t] || '#6366f1')

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.5)' }}>Loading dashboard...</div>

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>{merchant?.business_name || 'Merchant Dashboard'}</h1>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <span style={{ background: `${tierColor(merchant?.tier || 'starter')}25`, color: tierColor(merchant?.tier || 'starter'), border: `1px solid ${tierColor(merchant?.tier || 'starter')}50`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{merchant?.tier || 'Starter'}</span>
            <span style={{ background: merchant?.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: merchant?.status === 'active' ? '#22c55e' : '#f59e0b', padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{merchant?.status || 'pending'}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: "Today's Revenue", value: `${stats.today.toLocaleString()} ITS`, color: '#22c55e' },
          { label: 'This Week', value: `${stats.week.toLocaleString()} ITS`, color: '#6366f1' },
          { label: 'This Month', value: `${stats.month.toLocaleString()} ITS`, color: '#22d3ee' },
          { label: 'Total Transactions', value: stats.total_txns, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        {[
          { icon: '💳', label: 'Transactions', href: '/dashboard/transactions' },
          { icon: '💰', label: 'Settlements', href: '/dashboard/settlements' },
          { icon: '🔑', label: 'API Keys', href: '/dashboard/api-keys' },
          { icon: '🔔', label: 'Webhooks', href: '/dashboard/webhooks' },
          { icon: '📊', label: 'Analytics', href: '/dashboard/analytics' },
          { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
        ].map(a => (
          <a key={a.href} href={a.href} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{a.label}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
