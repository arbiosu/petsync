import { createServiceClient } from "@/lib/supabase/service"
import { createClient } from "@/lib/supabase/server"
import { HouseholdContent } from "@/lib/types/supabase"

const supabase = await createServiceClient()
const sb = await createClient()

/**
 * Gets the currently logged in user.
 * Deconstruct the UserResponse with { data: { user }, }.
 * @returns the User object or null.
 */
export async function getUser() {
    return await sb.auth.getUser()
}

/**
 * Get all Households a user is currently a member of.
 * Inner join on households_users
 * @param userId the users id
 * @returns 
 */
export async function getHouseholdsForUser(userId: string) {
    return await supabase
    .from('households')
    .select(`
        name,
        household_users (
        user_id
        )
    `)
    .eq('household_users.user_id', userId)
}

/**
 * Get all Users who are members of a Household
 * @param householdId the Household's id
 * @returns
 */
export async function getAllMembersOfHousehold(householdId: number) {
    return await supabase
    .from('household_users')
    .select('user_id')
    .eq('household_id', householdId)
}

/**
 * Get a Household by its id
 * @param householdId the Household's id
 * @returns 
 */
export async function getHouseholdById(householdId: number) {
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
    return await supabase
    .from('households')
    .insert(content)
}
