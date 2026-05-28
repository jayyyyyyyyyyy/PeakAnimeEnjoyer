"use server"

import { createClient } from "@/lib/supabase/server"

export async function updateEpisodeProgress(
  seasonId: string,
  episodesWatched: number
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data: existingProgress } = await supabase
    .from("episode_progress")
    .select("*")
    .eq("season_id", seasonId)
    .eq("user_id", user.id)
    .single()

  if (!existingProgress) {
    const { error } = await supabase
      .from("episode_progress")
      .insert({
        season_id: seasonId,
        user_id: user.id,
        episodes_watched: episodesWatched,
      })

    if (error) {
      console.error(error)
      throw new Error("Failed to create progress")
    }

    return
  }

  const { error } = await supabase
    .from("episode_progress")
    .update({
      episodes_watched: episodesWatched,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingProgress.id)

  if (error) {
    console.error(error)
    throw new Error("Failed to update progress")
  }
}