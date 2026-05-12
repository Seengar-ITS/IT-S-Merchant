import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const merchant_id = searchParams.get('merchant_id')
  if (!merchant_id) return NextResponse.json({ error: 'merchant_id required' }, { status: 400 })
  const { data } = await supabaseAdmin.from('merchant_api_keys').select('id, key_name, api_key, permissions, status, created_at').eq('merchant_id', merchant_id).order('created_at', { ascending: false })
  return NextResponse.json({ data: data || [] })
}
