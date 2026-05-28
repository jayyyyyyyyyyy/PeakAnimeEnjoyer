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

  // 1. create club
  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .insert({
      name,
      slug,
      invite_code: crypto.randomUUID().slice(0, 8),
      created_by: user.id,
    })
    .select()
    .single()

  if (clubError || !club) {
    console.error(clubError)
    throw new Error("Failed to create club")
  }

  // 2. create owner membership
  const { error: memberError } = await supabase
    .from("club_members")
    .insert({
      club_id: club.id,
      user_id: user.id,
      role: "OWNER",
    })

  if (memberError) {
    console.error(memberError)
    throw new Error("Failed to create membership")
  }

  return club
}