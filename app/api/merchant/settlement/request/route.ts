import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { merchant_id, amount_its, period_start, period_end } = await req.json()
  if (!merchant_id || !amount_its) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const { data: coin } = await supabaseAdmin.from('its_coins').select('rate_pkr').single()
  const rate = coin?.rate_pkr || 1
  const fee_pct = 0.005
  const amount_pkr = amount_its * rate * (1 - fee_pct)
  const fee_pkr = amount_its * rate * fee_pct
  const { data, error } = await supabaseAdmin.from('merchant_settlements').insert({
    merchant_id, amount_its, amount_pkr, fee_pkr, status: 'pending', period_start, period_end
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
