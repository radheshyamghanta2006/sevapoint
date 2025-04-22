"use server"

import { createClient } from "@supabase/supabase-js"

export async function setupDatabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Create tables
  const createUsersTable = await supabase.rpc("create_users_table")
  const createSkillsTable = await supabase.rpc("create_skills_table")
  const createAvailabilitySlotsTable = await supabase.rpc("create_availability_slots_table")
  const createBookingsTable = await supabase.rpc("create_bookings_table")
  const createReviewsTable = await supabase.rpc("create_reviews_table")
  const createAdminFlagsTable = await supabase.rpc("create_admin_flags_table")

  return {
    createUsersTable,
    createSkillsTable,
    createAvailabilitySlotsTable,
    createBookingsTable,
    createReviewsTable,
    createAdminFlagsTable,
  }
}
