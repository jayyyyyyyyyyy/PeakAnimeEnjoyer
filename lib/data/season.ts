import { createClient } from "@/lib/supabase/server"

export async function getActiveSeason(
  clubId: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("seasons")
    .select(`
      *,
      anime:selected_anime_id (
        id,
        title,
        image_url,
        episodes
      )
    `)
    .eq("club_id", clubId)
    .eq("status", "ACTIVE")
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}