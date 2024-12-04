import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { Provider } from '@supabase/supabase-js'

const isLocalEnv = process.env.NODE_ENV === 'development'
const redirectUrl = isLocalEnv ? "http://localhost:3000" : "https://petsync.vercel.app"


export async function POST(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const authProvider = searchParams.get('provider')
    
        if (!authProvider) {
            return NextResponse.json({ error: 'Provider is required' }, { status: 400 });
        }
    
        const supabase = await createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: authProvider as Provider,
            options: {
                redirectTo: `${redirectUrl}/auth/callback`,
            },
        })
    
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            revalidatePath('/households', 'layout')
            return NextResponse.redirect(data.url, { status: 302 })
        }
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Failed to handle sign-in request' }, 
            { status: 500 }
        )
    }
}