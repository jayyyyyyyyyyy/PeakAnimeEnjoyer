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

  const { data: testAuth } = await supabase.rpc("debug_auth_uid")
  console.log("RPC AUTH UID:", testAuth)

  console.log("USER:", user)
  console.log("USER ID:", user.id)

  const insertData = {
    name,
    slug,
    invite_code: crypto.randomUUID().slice(0, 8),
    created_by: user.id,
  }

  console.log("INSERT DATA:", insertData)

  // 1. create club
  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .insert(insertData)
    .select()
    .single()

  if (clubError || !club) {
    console.error("CLUB ERROR:", clubError)

    throw new Error(
      `Club Error: ${clubError?.message}`
    )
  }

  console.log("CREATED CLUB:", club)

  // 2. create owner membership
  const { error: memberError } = await supabase
    .from("club_members")
    .insert({
      club_id: club.id,
      user_id: user.id,
      role: "OWNER",
    })

  if (memberError) {
    console.error("MEMBER ERROR:", memberError)

    throw new Error(
      `Member Error: ${memberError.message}`
    )
  }

  console.log("OWNER MEMBERSHIP CREATED")

  return club
}