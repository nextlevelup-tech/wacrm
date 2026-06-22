import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Singleton instance — one client shared across the whole browser session.
// Creating multiple clients causes auth-lock contention ("Lock was released
// because another request stole it") and intermittent fetch failures.
let browserClient: SupabaseClient | undefined

export async function createClient() {
  if (browserClient) return browserClient

  const config = await fetch("/api/config").then(r => r.json());

  browserClient = createBrowserClient(
    config.supabaseUrl,
    config.supabaseAnonKey
  )

  return browserClient
}
