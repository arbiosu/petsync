"use server";

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SignOutForm } from "@/components/Auth"


export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }
  return (
    <div>
      <h1>Welcome to Petsync</h1>
      <SignOutForm />
    </div>
  )
}
