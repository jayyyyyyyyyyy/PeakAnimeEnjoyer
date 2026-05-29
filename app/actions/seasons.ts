"use server"

import { createClient } from "@/lib/supabase/server"

export async function createSeason(
  clubId: string,
  title?: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // controllo stagione aperta
  const { data: existingSeason } = await supabase
    .from("seasons")
    .select("*")
    .eq("club_id", clubId)
    .neq("status", "FINISHED")
    .maybeSingle()

  if (existingSeason) {
    throw new Error(
      "A season is already active for this club"
    )
  }

  const seasonTitle =
    title?.trim() || `Season ${Date.now()}`

  const { data: season, error } = await supabase
    .from("seasons")
    .insert({
      title: seasonTitle,
      club_id: clubId,
      created_by: user.id,
      status: "PROPOSAL",
    })
    .select()
    .single()

  if (error || !season) {
    console.error(error)
    throw new Error("Failed to create season")
  }

  const { error: clubError } = await supabase
    .from("clubs")
    .update({
      current_season_id: season.id,
    })
    .eq("id", clubId)

  if (clubError) {
    console.error(clubError)
    throw new Error("Failed to update club")
  }

  return season
}