"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitProposal(
  seasonId: string,
  animeId: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // stagione

  const { data: season } = await supabase
    .from("seasons")
    .select("*")
    .eq("id", seasonId)
    .single()

  if (!season) {
    throw new Error("Season not found")
  }

  if (season.status !== "PROPOSAL") {
    throw new Error(
      "Season is not accepting proposals"
    )
  }

  // proposta già presente per utente

  const { data: existingUserProposal } =
    await supabase
      .from("anime_proposals")
      .select("id")
      .eq("season_id", seasonId)
      .eq("user_id", user.id)
      .maybeSingle()

  if (existingUserProposal) {
    throw new Error(
      "You already submitted a proposal"
    )
  }

  // anime già proposto

  const { data: existingAnimeProposal } =
    await supabase
      .from("anime_proposals")
      .select("id")
      .eq("season_id", seasonId)
      .eq("anime_id", animeId)
      .maybeSingle()

  if (existingAnimeProposal) {
    throw new Error(
      "This anime has already been proposed"
    )
  }

  const { data, error } = await supabase
    .from("anime_proposals")
    .insert({
      season_id: seasonId,
      user_id: user.id,
      anime_id: animeId,
      revealed: false,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error(
      "Failed to submit proposal"
    )
  }

  return data
}