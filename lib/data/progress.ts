import { createClient } from "@/lib/supabase/server"

export async function getSeasonProgress(seasonId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("episode_progress")
    .select(`
      episodes_watched,
      updated_at,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq("season_id", seasonId)
    .order("episodes_watched", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}