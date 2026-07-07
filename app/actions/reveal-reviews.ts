"use server"

import { createClient } from "@/lib/supabase/server"

export async function revealReviews(
  seasonId: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data: season, error: seasonError } =
    await supabase
      .from("seasons")
      .select("*")
      .eq("id", seasonId)
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
    .select("role")
    .eq("club_id", season.club_id)
    .eq("user_id", user.id)
    .single()

  if (membership?.role !== "OWNER") {
    throw new Error(
      "Only the owner can reveal reviews."
    )
  }

  const { count: memberCount } = await supabase
    .from("club_members")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("club_id", season.club_id)

  const { count: reviewCount } = await supabase
    .from("final_reviews")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("season_id", season.id)

  if (
    !memberCount ||
    !reviewCount ||
    reviewCount < memberCount
  ) {
    throw new Error(
      "All members must submit a review before reveal."
    )
  }

  const { error: reviewsError } = await supabase
    .from("final_reviews")
    .update({
      revealed: true,
    })
    .eq("season_id", season.id)

  if (reviewsError) {
    throw new Error(
      "Failed to reveal reviews."
    )
  }

  const { error: seasonUpdateError } = await supabase
    .from("seasons")
    .update({
      status: "FINISHED",
    })
    .eq("id", season.id)

  if (seasonUpdateError) {
    throw new Error(
      "Failed to finish season."
    )
  }

  return {
    success: true,
  }
}
