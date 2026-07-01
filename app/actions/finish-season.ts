"use server"

import { createClient } from "@/lib/supabase/server"
import { canFinishSeason } from "@/lib/season/can-finish-season"

export async function finishSeason(
  seasonId: string
) {
  const supabase = await createClient()

  // 1. Authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // 2. Load season
  const { data: season, error: seasonError } =
    await supabase
      .from("seasons")
      .select("*")
      .eq("id", seasonId)
      .single()

  if (seasonError || !season) {
    throw new Error("Season not found")
  }

  // 3. Check season status
  if (season.status !== "ACTIVE") {
    throw new Error("Season is not active")
  }

  // 4. Check owner
  const {
    data: membership,
    error: membershipError,
  } = await supabase
    .from("club_members")
    .select("role")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (
    membershipError ||
    membership.role !== "OWNER"
  ) {
    throw new Error(
      "Only the owner can finish the season"
    )
  }

      const { data: members } =
  await supabase
    .from("club_members")
    .select("user_id")
    .eq("club_id", season.club_id)
    
  // 5. Load progress

// Load episode progress
const {
  data: progress,
  error: progressError,
} = await supabase
  .from("episode_progress")
  .select(`
    user_id,
    episodes_watched
  `)
  .eq("season_id", season.id)

if (progressError) {
  throw new Error(
    "Failed to load episode progress"
  )
}

  // 6. Business rule
if (
  !canFinishSeason(
    members ?? [],
    progress ?? [],
    season.minimum_episodes
  )
) {
  throw new Error(
    "Not everyone finished watching"
  )
}

  // 7. Update season
  const { error } = await supabase
    .from("seasons")
    .update({
      status: "REVIEW",
    })
    .eq("id", season.id)

  if (error) {
    throw new Error(
      "Failed to finish season"
    )
  }

  return {
    success: true,
  }
}