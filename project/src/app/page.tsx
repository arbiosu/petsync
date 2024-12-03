"use server";

import { redirect } from 'next/navigation'
import { SignOutForm } from "@/components/Auth"
import { MyHouseholds, CreateHouseholdForm } from '@/components/Household';
import { getUser } from "@/lib/supabase/model"

export default async function Home() {
  const {
    data: { user },
  } = await getUser()

  if (!user) {
    return redirect('/auth/login')
  }
  return (
    <div>
      <h1>Welcome to Petsync</h1>
      <MyHouseholds user={user} />
      <CreateHouseholdForm user={user} />
      <SignOutForm />
    </div>
  )
}
