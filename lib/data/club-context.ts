import { createClient } from "@/lib/supabase/server"

export async function getClubContext(
  slug: string
) {
  const supabase = await createClient()

  console.log("=== CLUB CONTEXT ===")
  console.log("SLUG:", slug)

  // 1. auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("USER:", user?.id)

  if (!user) {
    console.log("FAILED: NO USER")
    return null
  }

  // 2. club
  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .single()

  console.log("CLUB:", club)
  console.log("CLUB ERROR:", clubError)

  if (!club) {
    console.log("FAILED: NO CLUB")
    return null
  }

  // 3. membership
  const {
    data: membership,
    error: membershipError,
  } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", club.id)
    .eq("user_id", user.id)
    .single()

  console.log("MEMBERSHIP:", membership)
  console.log(
    "MEMBERSHIP ERROR:",
    membershipError
  )

  if (!membership) {
    console.log("FAILED: NO MEMBERSHIP")
    return null
  }

  // 4. active season
  const {
    data: season,
    error: seasonError,
  } = await supabase
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
    .neq("status", "FINISHED")
    .single()

  console.log("SEASON:", season)
  console.log("SEASON ERROR:", seasonError)

  console.log("SUCCESS: CONTEXT LOADED")

  const { data: members } = await supabase
  .from("club_members")
  .select(`
    *,
    profiles (
      username
    )
  `)
  .eq("club_id", club.id)

  console.log("MEMBERS QUERY:", members)
  
return {
  user,
  club,
  membership,
  season,
  members: members ?? [],
}
}