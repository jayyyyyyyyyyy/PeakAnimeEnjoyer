"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitInterestVote(
  seasonId: string,
  score: number
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  if (!Number.isInteger(score) || score < 1 || score > 10) {
    throw new Error("Score must be between 1 and 10")
  }

  const { data: season } = await supabase
    .from("seasons")
    .select("id,status,selected_anime_id")
    .eq("id", seasonId)
    .single()

  if (!season) {
    throw new Error("Season not found")
  }

  if (season.status !== "INTEREST_VOTING") {
    throw new Error("Season is not accepting interest votes")
  }

  if (!season.selected_anime_id) {
    throw new Error("No anime selected for this season yet")
  }

  const { data: existingVote } = await supabase
    .from("interest_votes")
    .select("id")
    .eq("season_id", seasonId)
    .eq("user_id", user.id)
    .maybeSingle()

  if (existingVote) {
    const { data, error } = await supabase
      .from("interest_votes")
      .update({
        score,
        anime_id: season.selected_anime_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingVote.id)
      .select()
      .single()

    if (error || !data) {
      throw new Error("Failed to update interest vote")
    }

    return data
  }

  const { data, error } = await supabase
    .from("interest_votes")
    .insert({
      season_id: seasonId,
      user_id: user.id,
      anime_id: season.selected_anime_id,
      score,
    })
    .select()
    .single()

  if (error || !data) {
    throw new Error("Failed to submit interest vote")
  }

  return data
}