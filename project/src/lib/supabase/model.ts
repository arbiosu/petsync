import { createServiceClient } from "@/lib/supabase/service"
import { createClient } from "@/lib/supabase/server"
import { HouseholdContent, PetContent } from "@/lib/types/supabase"

// Cannot set supabase clients as constants because of dynamic routing

/**
 * Gets the currently logged in user.
 * Deconstruct the UserResponse with { data: { user }, }.
 * @returns the User object or null.
 */
export async function getUser() {
    const supabase = await createClient()
    return await supabase.auth.getUser()
}

/**
 * Get all Households a user is currently a member of.
 * Inner join on households_users
 * @param userId the users id
 * @returns 
 */
export async function getHouseholdsForUser(userId: string) {
    const supabase = await createServiceClient()
    return await supabase
    .from('household_users')
    .select(`
        joined_at,
        role,
        households (
            id,
            created_at,
            name
        )
    `)
    .eq('user_id', userId)
}

/**
 * Get all Users who are members of a Household
 * @param householdId the Household's id
 * @returns
 */
export async function getAllMembersOfHousehold(householdId: number) {
    const supabase = await createServiceClient()
    return await supabase
    .from('household_users')
    .select('user_id')
    .eq('household_id', householdId)
}

export async function getAllHouseholdInformation(householdId: number) {
    const supabase = await createServiceClient()
    return await supabase
    .from('households')
    .select(`
        *,
        household_users (
            user_id,
            joined_at,
            role
        ),
        pets (
            id,
            name,
            birthdate,
            tasks (
                id,
                task_type,
                notes,
                timestamp
            )
        )
    `)
    .eq('id', householdId)
    .single()
}

/**
 * Get a Household by its id
 * @param householdId the Household's id
 * @returns 
 */
export async function getHouseholdById(householdId: number) {
    const supabase = await createServiceClient()
    return await supabase
    .from('households')
    .select()
    .eq('id', householdId)
}

/**
 * Creates a new Household. The user creating the Household is given the admin role.
 * There is a trigger to automatically add the admin user to household_users.
 * @param content the name of the household and the user.id of the creating 
 * @returns an error or null
 */
export async function createHousehold(content: HouseholdContent) {
    const supabase = await createServiceClient()
    return await supabase
    .from('households')
    .insert(content)
}

/**
 * Creates a new Pet
 * @param content 
 * @returns 
 */
export async function createPet(content: PetContent) {
    const supabase = await createServiceClient()
    return await supabase
    .from('pets')
    .insert(content)
}