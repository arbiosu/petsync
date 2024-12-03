import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@/lib/supabase/client'
import { Provider } from '@supabase/supabase-js';

const isLocalEnv = process.env.NODE_ENV === 'development'
const redirectUrl = isLocalEnv ? "http://localhost:3000" : "https://petsync.vercel.app"

/**
 * Sign in with OAuthentication
 * @param authProvider 
 * @returns 
 */
export const signIn = async (authProvider: Provider) => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
        provider: authProvider,
        options: {
            redirectTo: `${redirectUrl}/auth/callback`,
        },
    })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
