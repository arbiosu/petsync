import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for client-side rendering
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}