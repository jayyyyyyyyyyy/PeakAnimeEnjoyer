"use server"

import { createClient } from "@/lib/supabase/server"

interface ChallengeAssignment {
  season_id: string
  giver_user_id: string
  receiver_user_id: string
  anime_id: string
}

function shuffle<T>(items: T[]) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = result[i]

    result[i] = result[j]
    result[j] = current
  }

  return result
}

function createChallengeAssignments(
  seasonId: string,
  proposals: { user_id: string; anime_id: string }[]
) {
  const receiverIds = proposals.map((proposal) => proposal.user_id)

  for (let attempt = 0; attempt < 50; attempt++) {
    const shuffledReceivers = shuffle(receiverIds)
    const hasSelfAssignment = proposals.some(
      (proposal, index) =>
        proposal.user_id === shuffledReceivers[index]
    )

    if (!hasSelfAssignment) {
      return proposals.map((proposal, index) => ({
        season_id: seasonId,
        giver_user_id: proposal.user_id,
        receiver_user_id: shuffledReceivers[index],
        anime_id: proposal.anime_id,
      }))
    }
  }

  throw new Error("Unable to generate challenge assignments")
}

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

  const { data: proposals, error: proposalsError } = await supabase
    .from("anime_proposals")
    .select("user_id,anime_id")
    .eq("season_id", seasonId)

  if (proposalsError || !proposals) {
    throw new Error("Failed to load proposals")
  }

  const memberIds = new Set(
    members?.map((member) => member.user_id)
  )
  const allProposalsBelongToMembers = proposals.every(
    (proposal) => memberIds.has(proposal.user_id)
  )

  if (
    proposals.length !== memberCount ||
    !allProposalsBelongToMembers
  ) {
    throw new Error("All members must submit a valid proposal first")
  }

  const { data: existingChallenges } = await supabase
    .from("season_challenges")
    .select("id")
    .eq("season_id", seasonId)

  if (existingChallenges?.length) {
    throw new Error("Challenges already exist for this season")
  }

  const assignments: ChallengeAssignment[] =
    createChallengeAssignments(
      seasonId,
      proposals
    )

  const { error: challengesError } = await supabase
    .from("season_challenges")
    .insert(assignments)

  if (challengesError) {
    throw new Error("Failed to create challenges")
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
