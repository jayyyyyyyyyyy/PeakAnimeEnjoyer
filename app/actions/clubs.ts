"use server"

import { createClient } from "@/lib/supabase/server"

export async function createClub(
  name: string,
  slug: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const insertData = {
    name,
    slug,
    invite_code: crypto.randomUUID().slice(0, 8),
    created_by: user.id,
  }

  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .insert(insertData)
    .select()
    .single()

  if (clubError || !club) {
    throw new Error(
      `Club Error: ${clubError?.message}`
    )
  }

  const { error: memberError } = await supabase
    .from("club_members")
    .insert({
      club_id: club.id,
      user_id: user.id,
      role: "OWNER",
    })

  if (memberError) {
    throw new Error(
      `Member Error: ${memberError.message}`
    )
  }

  return club
}

export async function getUserClubs() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data, error } = await supabase
    .from("club_members")
    .select(`
      role,
      clubs (
        id,
        name,
        slug,
        invite_code
      )
    `)
    .eq("user_id", user.id)

  if (error) {
    throw new Error(
      `Failed to load clubs: ${error.message}`
    )
  }

  return data ?? []
}
