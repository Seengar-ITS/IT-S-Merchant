import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { merchant_id, url, events } = await req.json()
  if (!merchant_id || !url) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const { data, error } = await supabaseAdmin.from('merchant_webhooks').insert({ merchant_id, url, events: events || [], status: 'active' }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const merchant_id = searchParams.get('merchant_id')
  const { data } = await supabaseAdmin.from('merchant_webhooks').select('*').eq('merchant_id', merchant_id!)
  return NextResponse.json({ data: data || [] })
}
