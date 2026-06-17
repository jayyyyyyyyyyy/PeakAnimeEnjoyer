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

  if (season.status !== "PROPOSAL") {
    throw new Error("Season is not in proposal phase")
  }

  const { data: membership } = await supabase
    .from("club_members")
    .select("role")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (membership?.role !== "OWNER") {
    throw new Error("Only the club owner can start the challenge")
  }

  const { data: members } = await supabase
    .from("club_members")
    .select("user_id")
    .eq("club_id", season.club_id)

  const memberCount = members?.length ?? 0

  if (memberCount < 2) {
    throw new Error("At least two members are required")
  }

  const { data: proposals, error: proposalsError } =
    await supabase
      .from("anime_proposals")
      .select("user_id")
      .eq("season_id", seasonId)

  if (proposalsError || !proposals) {
    throw new Error("Failed to load proposals")
  }

  if (proposals.length !== memberCount) {
    throw new Error(
      "All members must submit a proposal first"
    )
  }

  const { data, error } = await supabase
    .from("seasons")
    .update({
      status: "CHALLENGE",
    })
    .eq("id", seasonId)
    .select("id,status")
    .single()

  if (error || !data) {
    throw new Error("Failed to start challenge")
  }

  return data
}

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
    throw new Error("Season is not in challenge phase")
  }

  const { data: membership } = await supabase
    .from("club_members")
    .select("role")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (membership?.role !== "OWNER") {
    throw new Error("Only the owner can select a winner")
  }

  const { data: proposal } = await supabase
    .from("anime_proposals")
    .select("anime_id")
    .eq("season_id", seasonId)
    .eq("user_id", winnerUserId)
    .single()

  if (!proposal) {
    throw new Error("Winner proposal not found")
  }

  const { error: challengeError } = await supabase
    .from("season_challenges")
    .insert({
      season_id: seasonId,
      winner_user_id: winnerUserId,
      method,
      notes: notes ?? null,
    })

  if (challengeError) {
    throw new Error("Failed to save challenge result")
  }

  const { data, error } = await supabase
    .from("seasons")
    .update({
      selected_anime_id: proposal.anime_id,
      status: "REVEALED",
    })
    .eq("id", seasonId)
    .select("id,status,selected_anime_id")
    .single()

  if (error || !data) {
    throw new Error("Failed to reveal winner")
  }

  return data
}

export async function startInterestVoting(
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

  if (season.status !== "CHALLENGE") {
    throw new Error("Season is not in challenge phase")
  }

  const { data: membership } = await supabase
    .from("club_members")
    .select("role")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (membership?.role !== "OWNER") {
    throw new Error("Only the club owner can start interest voting")
  }

  const { count: memberCount } = await supabase
    .from("club_members")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("club_id", season.club_id)

  const { count: challengeCount } = await supabase
    .from("season_challenges")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("season_id", seasonId)

  if (
    !memberCount ||
    !challengeCount ||
    challengeCount !== memberCount
  ) {
    throw new Error("All challenges must exist before interest voting")
  }

  const { data, error } = await supabase
    .from("seasons")
    .update({
      status: "INTEREST_VOTING",
    })
    .eq("id", seasonId)
    .select("id,status")
    .single()

  if (error || !data) {
    throw new Error("Failed to start interest voting")
  }

  return data
}
