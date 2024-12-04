import { redirect } from 'next/navigation'
import { SignOutForm } from "@/components/Auth"
import { MyHouseholds } from '@/components/Household';
import { getUser } from "@/lib/supabase/model"

export default async function Page() {
    const {
        data: { user },
      } = await getUser()
    
      if (!user) {
        console.log("No user found...")
        return redirect('/auth/login')
      }

      return (
        <div>
            <MyHouseholds user={user} />
            <div>
                <SignOutForm />
            </div>
        </div>
      )
}