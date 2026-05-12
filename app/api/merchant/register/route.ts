import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { user_id, business_name, business_type, description } = await req.json()
    if (!user_id || !business_name || !business_type) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    const { data, error } = await supabaseAdmin.from('merchants').insert({
      user_id, business_name, business_type, kyc_status: 'pending', tier: 'starter', status: 'pending'
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }) }
}
