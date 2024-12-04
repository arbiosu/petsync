import { createPet } from '@/lib/supabase/model';
import { redirect } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { PawPrint } from 'lucide-react'


export async function CreatePetForm({
    householdId,
    householdName,
}: {
    householdId: number,
    householdName: string,
}) {
    const addPet = async (formData: FormData) => {
        "use server";
        let redirectPath = `/households`
        // TODO: fix birthdate, convert to iso string with tz
        const content = {
            name: formData.get("name")!.toString(),
            birthdate: formData.get("birthdate")!.toString(),
            type: formData.get("petType")!.toString(),
            household_id: householdId
        }
        console.log(content)

        const { error } = await createPet(content)

        if (error) {
            console.log(error)
            redirectPath += `/error`
        }
        redirectPath += `/${householdId}`
        return redirect(redirectPath)
    }
    return (
        <div>
            <h1>Add a new Pet to your Household</h1>
            <form action={addPet}>
                <Input name="name" placeholder="Name of your Pet" />
                <Input name="petType" placeholder="Dog, Cat, Bird, and more!" />
                <Button type="submit">
                    <PawPrint /> Add your Pet to your Household {householdName}
                </Button>
            </form>
        </div>
    )
}