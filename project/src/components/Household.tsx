import { createClient } from "@/lib/supabase/server"
import { type User } from '@supabase/supabase-js'
import { Database, Tables, Enums } from "@/lib/types/supabase"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { HousePlus } from "lucide-react"

/**
 * The form to create a new Household.
 * The current logged in user will be assigned as the Household admin
 * @param user the currently logged in user
 * @returns A new household, redirects the user to the /households page
 */
export async function CreateHousehold({ user }: { user: User }) {
    let redirectPath = `/households`
    const supabase = await createClient()

    const addHousehold = async (formData: FormData) => {
        "use server";

        const content = {
            // TODO: Fix this assertion
            name: formData.get("name")!.toString(),
            admin: user.id,
        }
        console.log(content)

        const { error } = await supabase
        .from("households")
        .insert(content)

        if (error) {
            redirectPath += `/error`
        }
        return redirect(redirectPath)
    }
    return (
        <div>
            <h1>Create a new Household</h1>
            <form action={addHousehold}>
                <Label htmlFor="name">Household Name</Label>
                <Input type="email" name="name" placeholder="Household name" />
                <Button type="submit">
                    <HousePlus /> Create a new Household
                </Button>
            </form>
        </div>
    )
}

export async function MyHouseholds({ user }: { user: User }) {
    const supabase = await createClient()
    const { data: householdIds, error: householdIdsError } = await supabase
    .from("household_users")
    .select("household_id")
    .eq("user_id", user.id)

    if (householdIdsError) {
        console.log(householdIdsError)
        return redirect('/error')
    }

    const myHouseholds = []
    for (const id of householdIds) {
        const { data: household, error: householdNameError } = await supabase
        .from("households")
        .select("name")
        .eq("id", id)

        if (householdNameError) {
            console.log(householdNameError)
            return redirect('/error')
        }
        myHouseholds.push({
            id: id,
            name: household[0].name
        })
    }

    // TODO FIX THIS
    return (
        <div>
            {myHouseholds.map((household, index) => (
                <div key={index}>
                    <h2>{household.name}</h2>
                </div>
            ))}
        </div>
    )
    
}
