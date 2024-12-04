import { getAllHouseholdInformation } from "@/lib/supabase/model"
import { CreatePetForm } from "@/components/Pets"
import { redirect } from 'next/navigation'


export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const householdId = (await params).id
    const { data, error } = await getAllHouseholdInformation(householdId)
    if (error) {
        return redirect('/households/error')
    }
    console.log(data)

    return (
        <div>
            {data && (
                <h1>Household {data.name}</h1>
            )}
            {data && data.pets && data.pets.length > 0 ? (
                data.pets.map((info, index) => (
                    <div key={index}>
                        <p>{info.name}</p>
                    </div>
                ))
            ) : (
                <div>
                    <h1>You currently have no Pets in your Household.</h1>
                    <CreatePetForm householdId={householdId} householdName={data.name} />
                </div>
            )}
        </div>
    )
}