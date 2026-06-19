"use server"

import { createClient } from "@/lib/supabase/server"

export async function setChallengeWinner(
  seasonId: string,
  winnerUserId: string,
  method: string,
  notes?: string
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

  if (season.status !== "CHALLENGE") {
    throw new Error(
      "Season is not in challenge phase"
    )
  }

  const { data: membership } = await supabase
    .from("club_members")
    .select("role")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (membership?.role !== "OWNER") {
    throw new Error(
      "Only owner can choose winner"
    )
  }

  const { data: proposal } = await supabase
    .from("anime_proposals")
    .select("anime_id")
    .eq("season_id", seasonId)
    .eq("user_id", winnerUserId)
    .single()

  if (!proposal) {
    throw new Error(
      "Winner proposal not found"
    )
  }

  const { error: challengeError } =
    await supabase
      .from("season_challenges")
      .insert({
        season_id: seasonId,
        winner_user_id: winnerUserId,
        method,
        notes: notes ?? null,
      })

  if (challengeError) {
    throw new Error(
      "Failed to save challenge winner"
    )
  }

  const { error: seasonError } =
    await supabase
      .from("seasons")
      .update({
        selected_anime_id:
          proposal.anime_id,
        status: "REVEALED",
      })
      .eq("id", seasonId)

  if (seasonError) {
    throw new Error(
      "Failed to reveal winner"
    )
  }

  return true
}