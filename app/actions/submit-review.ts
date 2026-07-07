"use server"

import { createClient } from "@/lib/supabase/server"

interface SubmitReviewInput {
  seasonId: string

  story: number
  characters: number
  animation: number
  soundtrack: number
  worldBuilding: number
  pacing: number
  emotionalImpact: number

  review: string
}

export async function submitReview(
  input: SubmitReviewInput
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const {
    data: season,
    error: seasonError,
  } = await supabase
    .from("seasons")
    .select("*")
    .eq("id", input.seasonId)
    .single()

  if (seasonError || !season) {
    throw new Error("Season not found")
  }

  if (season.status !== "REVIEW") {
    throw new Error(
      "Season is not in review phase."
    )
  }

  const { data: membership } = await supabase
    .from("club_members")
    .select("user_id")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (!membership) {
    throw new Error(
      "Only club members can submit a review."
    )
  }

  const { data: existingReview } = await supabase
    .from("final_reviews")
    .select("id")
    .eq("season_id", input.seasonId)
    .eq("user_id", user.id)
    .maybeSingle()

  if (existingReview) {
    throw new Error(
      "Your review is already locked."
    )
  }

  const scores = [
    input.story,
    input.characters,
    input.animation,
    input.soundtrack,
    input.worldBuilding,
    input.pacing,
    input.emotionalImpact,
  ]

  for (const score of scores) {
    if (!Number.isInteger(score) || score < 1 || score > 10) {
      throw new Error(
        "Scores must be between 1 and 10."
      )
    }
  }

  const writtenReview = input.review.trim()

  if (writtenReview.length > 1000) {
    throw new Error(
      "Review cannot exceed 1000 characters."
    )
  }

  const overall =
    scores.reduce((sum, score) => sum + score, 0) /
    scores.length

  const { error } = await supabase
    .from("final_reviews")
    .insert({
      season_id: input.seasonId,
      user_id: user.id,

      story: input.story,
      characters: input.characters,
      animation: input.animation,
      soundtrack: input.soundtrack,
      world_building: input.worldBuilding,
      pacing: input.pacing,
      emotional_impact: input.emotionalImpact,

      overall,
      review: writtenReview || null,

      locked: true,
      revealed: false,
    })

  if (error) {
    console.error(error)

    throw new Error(
      "Unable to save review."
    )
  }

  return {
    success: true,
  }
}
