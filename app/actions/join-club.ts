"use server"

import { createClient } from "@/lib/supabase/server"

export async function joinClub(
  inviteCode: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // 1. find club
  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .select("*")
    .eq("invite_code", inviteCode)
    .single()

  if (clubError || !club) {
    throw new Error("Invalid invite code")
  }

  // 2. check existing membership
  const { data: existingMember } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", club.id)
    .eq("user_id", user.id)
    .single()

  if (existingMember) {
    return club
  }

  // 3. create membership
  const { error: memberError } = await supabase
    .from("club_members")
    .insert({
      club_id: club.id,
      user_id: user.id,
      role: "MEMBER",
    })

  if (memberError) {
    console.error(memberError)
    throw new Error("Failed to join club")
  }

  return club
}