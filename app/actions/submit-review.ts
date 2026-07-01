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

  // Authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Load season
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

  // Season must be in REVIEW
  if (season.status !== "REVIEW") {
    throw new Error(
      "Season is not in review phase."
    )
  }

  // Validate scores
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
    if (score < 1 || score > 10) {
      throw new Error(
        "Scores must be between 1 and 10."
      )
    }
  }

  // Validate review
  if (input.review.length > 1000) {
    throw new Error(
      "Review cannot exceed 1000 characters."
    )
  }

  // Calculate overall
  const overall =
    (
      input.story +
      input.characters +
      input.animation +
      input.soundtrack +
      input.worldBuilding +
      input.pacing +
      input.emotionalImpact
    ) / 7

  // Save review
  const { error } = await supabase
    .from("final_reviews")
    .upsert(
      {
        season_id: input.seasonId,
        user_id: user.id,

        story: input.story,
        characters: input.characters,
        animation: input.animation,
        soundtrack: input.soundtrack,
        world_building: input.worldBuilding,
        pacing: input.pacing,
        emotional_impact:
          input.emotionalImpact,

        overall,
        review: input.review,

        locked: true,
        revealed: false,
      },
      {
        onConflict: "season_id,user_id",
      }
    )

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