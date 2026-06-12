"use server"

import { createClient } from "@/lib/supabase/server"

export async function startChallenge(
  seasonId: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data: season } = await supabase
    .from("seasons")
    .select("*")
    .eq("id", seasonId)
    .single()

  if (!season) {
    throw new Error("Season not found")
  }

  const { error } = await supabase
    .from("seasons")
    .update({
      status: "CHALLENGE",
    })
    .eq("id", seasonId)

  if (error) {
    throw new Error(
      "Failed to start challenge"
    )
  }

  return true
}