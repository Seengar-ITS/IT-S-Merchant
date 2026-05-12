import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { merchant_id } = await req.json()
  const { data, error } = await supabaseAdmin.from('merchants').update({ status: 'active', kyc_status: 'approved' }).eq('id', merchant_id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, message: 'Merchant approved' })
}
