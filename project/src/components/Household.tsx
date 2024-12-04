import { type User } from '@supabase/supabase-js'
import { HouseholdContent } from "@/lib/types/supabase"
import { redirect } from "next/navigation"
import { createHousehold, getHouseholdsForUser } from "@/lib/supabase/model"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { HousePlus } from "lucide-react"

/**
 * The form to create a new Household.
 * The current logged in user will be assigned as the Household admin
 * @param user the currently logged in user
 * @returns A new household, redirects the user to the /households page
 */
export async function CreateHouseholdForm({ user }: { user: User }) {

    const addHousehold = async (formData: FormData) => {
        "use server";
        let redirectPath = `/households`

        const content: HouseholdContent = {
            // TODO: Fix this assertion
            name: formData.get("name")!.toString(),
            admin: user.id,
        }
        console.log(content)

        const { error } = await createHousehold(content)

        if (error) {
            console.log(error)
            redirectPath += `/error`
        }
        return redirect(redirectPath)
    }
    return (
        <div>
            <h1>Create a new Household</h1>
            <form action={addHousehold}>
                <Label htmlFor="name">Household Name</Label>
                <Input name="name" placeholder="Name of your new Household" />
                <Button type="submit">
                    <HousePlus /> Create a new Household
                </Button>
            </form>
        </div>
    )
}

/**
 * Dashboard diplaying all of a user's households
 * @param param0 
 * @returns 
 */
export async function MyHouseholds({ user }: { user: User }) {
    const { 
        data, 
        error,
     } = await getHouseholdsForUser(user.id)

    if (error) {
        console.log(error)
        return redirect('/households/error')
    }


    return (
        <div>
            {data && data.length > 0 ? (
                data.map((info, index) => (
                    <div key={index}>
                        <Card className="w-[380px]">
                            <CardHeader>
                                <CardTitle>{info.households?.name}</CardTitle>
                                <CardDescription>Petsynced Since: {info.households?.created_at}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Your Role: {info.role}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Member since: {info.joined_at}</p>
                            </CardFooter>
                        </Card>
                    </div>
                ))
            ) : (
                <h1>You are not a member of any Households!</h1>
            )}
        </div>
    )
}
