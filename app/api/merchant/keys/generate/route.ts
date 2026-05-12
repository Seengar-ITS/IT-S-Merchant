import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const { merchant_id, key_name, permissions } = await req.json()
  if (!merchant_id || !key_name) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const api_key = `its_live_${uuidv4().replace(/-/g, '')}`
  const secret_key = `its_secret_${uuidv4().replace(/-/g, '')}`
  const { data, error } = await supabaseAdmin.from('merchant_api_keys').insert({
    merchant_id, key_name, api_key, secret_key, permissions: permissions || ['read', 'write'], status: 'active'
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data: { ...data, api_key, secret_key } })
}
