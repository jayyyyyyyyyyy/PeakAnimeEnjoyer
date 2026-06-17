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
  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (clubError || !club) {
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

  if (membershipError || !membership) {
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
    .neq("status", "FINISHED")
    .maybeSingle()

  const { data: members } = await supabase
    .from("club_members")
    .select(`
      *,
      profiles (
        username
      )
    `)
    .eq("club_id", club.id)

  const { count: memberCount } = await supabase
    .from("club_members")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("club_id", club.id)

  if (!season) {
    return {
      user,
      club,
      membership,
      season,
      members: members ?? [],
      proposal: null,
      challenge: null,
      interestVote: null,
      memberCount: memberCount ?? 0,
      proposalCount: 0,
    }
  }

  const { data: proposal } = await supabase
    .from("anime_proposals")
    .select(`
      *,
      anime:anime_proposals_anime_id_fkey (
        id,
        title,
        image_url
      )
    `)
    .eq("season_id", season.id)
    .eq("user_id", user.id)
    .maybeSingle()

  const { count: proposalCount } = await supabase
    .from("anime_proposals")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("season_id", season.id)

const { data: challenge } = await supabase
  .from("season_challenges")
  .select(`
    *
  `)
  .eq("season_id", season.id)
  .maybeSingle()

  let challengeWinner = null

if (challenge?.winner_user_id) {
  const { data } = await supabase
    .from("profiles")
    .select("id,username")
    .eq("id", challenge.winner_user_id)
    .single()

  challengeWinner = data
}

  const { data: interestVote } = await supabase
    .from("interest_votes")
    .select("*")
    .eq("season_id", season.id)
    .eq("user_id", user.id)
    .maybeSingle()

return {
  user,
  club,
  membership,
  season,
  members: members ?? [],
  proposal,
  challenge,
  challengeWinner,
  interestVote,
  memberCount: memberCount ?? 0,
  proposalCount: proposalCount ?? 0,
}
}
