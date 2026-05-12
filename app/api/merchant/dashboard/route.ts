import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get('user_id')
  if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })
  const { data: merchant } = await supabaseAdmin.from('merchants').select('*').eq('user_id', user_id).single()
  if (!merchant) return NextResponse.json({ error: 'Merchant not found' }, { status: 404 })
  const { data: payments } = await supabaseAdmin.from('payments').select('amount_its, created_at').eq('merchant_id', merchant.id).eq('status', 'completed')
  const now = new Date()
  const today = payments?.filter(p => new Date(p.created_at).toDateString() === now.toDateString()).reduce((s, p) => s + Number(p.amount_its), 0) || 0
  const week = payments?.filter(p => (now.getTime() - new Date(p.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000).reduce((s, p) => s + Number(p.amount_its), 0) || 0
  const month = payments?.filter(p => new Date(p.created_at).getMonth() === now.getMonth()).reduce((s, p) => s + Number(p.amount_its), 0) || 0
  return NextResponse.json({ merchant, stats: { today, week, month, total_txns: payments?.length || 0 } })
}
