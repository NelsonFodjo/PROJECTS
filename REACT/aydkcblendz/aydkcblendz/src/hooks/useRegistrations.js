import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export function useRegistrationCount() {
  const [count, setCount] = useState(0)

  const refresh = useCallback(async () => {
    const { count: total } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
    setCount(total ?? 0)
  }, [])

  useEffect(() => {
    queueMicrotask(refresh)

    const channel = supabase
      .channel('registrations-count')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'registrations' }, () => {
        refresh()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refresh])

  return count
}

export async function insertRegistration(data) {
  const { data: inserted, error } = await supabase
    .from('registrations')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return inserted
}

export async function updateRegistration(id, data) {
  const { error } = await supabase.from('registrations').update(data).eq('id', id)
  if (error) throw error
}

export async function findRegistrationByQrCode(qrCodeId) {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('qr_code_id', qrCodeId)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function markAsPurchased(id) {
  const { data, error } = await supabase
    .from('registrations')
    .update({ verified_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchAllRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export function useAdminStats() {
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    topDeaneries: [],
    productBreakdown: [],
  })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const rows = await fetchAllRegistrations()

    const total = rows.length
    const verified = rows.filter((r) => r.verified_at).length

    const deaneryCounts = {}
    const productCounts = {}
    for (const row of rows) {
      if (row.deanery) deaneryCounts[row.deanery] = (deaneryCounts[row.deanery] || 0) + 1
      if (row.product_interest) {
        productCounts[row.product_interest] = (productCounts[row.product_interest] || 0) + 1
      }
    }

    const topDeaneries = Object.entries(deaneryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([deanery, count]) => ({ deanery, count }))

    const productBreakdown = Object.entries(productCounts).map(([product, count]) => ({
      product,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))

    setStats({ total, verified, topDeaneries, productBreakdown, rows })
    setLoading(false)
  }, [])

  useEffect(() => {
    queueMicrotask(refresh)

    const channel = supabase
      .channel('registrations-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
        refresh()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refresh])

  return { stats, loading, refresh }
}
