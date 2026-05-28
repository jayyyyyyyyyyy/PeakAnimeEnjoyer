import { createClient } from "@/lib/supabase/server"

export async function getClubContext(
  slug: string
) {
  const supabase = await createClient()

  // 1. auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // 2. club
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!club) {
    return null
  }

  // 3. membership
  const { data: membership } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", club.id)
    .eq("user_id", user.id)
    .single()

  if (!membership) {
    return null
  }

  // 4. active season
  const { data: season } = await supabase
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
    .eq("club_id", club.id)
    .eq("status", "ACTIVE")
    .single()

  return {
    user,
    club,
    membership,
    season,
  }
}