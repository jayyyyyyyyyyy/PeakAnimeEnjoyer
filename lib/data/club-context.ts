import { buildHallOfFameRankings } from "@/lib/hall-of-fame/build-rankings"
import { buildProfileStats } from "@/lib/profile/build-profile-stats"
import { buildNotifications } from "@/lib/notifications/build-notifications"
import { createClient } from "@/lib/supabase/server"
import type {
  AnimeProposal,
  AppNotification,
  Club,
  ClubMember,
  ClubProgressMember,
  EpisodeProgress,
  FinalReview,
  HallOfFameRankings,
  HallOfFameSeason,
  InterestVote,
  SeasonAnime,
  Membership,
  ProfileStats,
  ProfileSummary,
  ReviewAverages,
  ReviewSummary,
  Season,
  SeasonChallenge,
} from "@/lib/types/club"

interface RawHallOfFameSeason {
  id: string
  title: string
  anime?: SeasonAnime | SeasonAnime[] | null
}

interface ClubContext {
  user: {
    id: string
  }
  club: Club
  membership: Membership
  season: Season | null
  members: ClubMember[]
  proposal: AnimeProposal | null
  challenge: SeasonChallenge | null
  interestVote: InterestVote | null
  memberCount: number
  proposalCount: number
  challengeWinner: ProfileSummary | null
  progress: EpisodeProgress | null
  clubProgress: ClubProgressMember[]
  reviewSummary: ReviewSummary
  hallOfFameRankings: HallOfFameRankings
  profileStats: ProfileStats
  appNotifications: AppNotification[]
}

function calculateReviewAverages(
  reviews: FinalReview[]
): ReviewAverages | null {
  if (reviews.length === 0) return null

  const totals = reviews.reduce(
    (acc, review) => ({
      overall: acc.overall + review.overall,
      story: acc.story + review.story,
      characters: acc.characters + review.characters,
      animation: acc.animation + review.animation,
      soundtrack: acc.soundtrack + review.soundtrack,
      worldBuilding:
        acc.worldBuilding + review.world_building,
      pacing: acc.pacing + review.pacing,
      emotionalImpact:
        acc.emotionalImpact + review.emotional_impact,
    }),
    {
      overall: 0,
      story: 0,
      characters: 0,
      animation: 0,
      soundtrack: 0,
      worldBuilding: 0,
      pacing: 0,
      emotionalImpact: 0,
    }
  )

  return {
    overall: totals.overall / reviews.length,
    story: totals.story / reviews.length,
    characters: totals.characters / reviews.length,
    animation: totals.animation / reviews.length,
    soundtrack: totals.soundtrack / reviews.length,
    worldBuilding: totals.worldBuilding / reviews.length,
    pacing: totals.pacing / reviews.length,
    emotionalImpact:
      totals.emotionalImpact / reviews.length,
  }
}

function emptyReviewSummary(
  memberCount: number
): ReviewSummary {
  return {
    currentUserReview: null,
    reviews: [],
    submittedCount: 0,
    memberCount,
    allSubmitted: false,
    revealed: false,
    averages: null,
  }
}

async function getHallOfFameRankings(
  supabase: Awaited<ReturnType<typeof createClient>>,
  clubId: string
) {
  const { data: seasons } = await supabase
    .from("seasons")
    .select(`
      id,
      title,
      anime:selected_anime_id (
        id,
        title,
        image_url,
        episodes
      )
    `)
    .eq("club_id", clubId)
    .eq("status", "FINISHED")
    .order("created_at", { ascending: false })

  const hallSeasons =
    ((seasons ?? []) as unknown as RawHallOfFameSeason[]).map(
      (season) => ({
        id: season.id,
        title: season.title,
        anime: Array.isArray(season.anime)
          ? season.anime[0] ?? null
          : season.anime ?? null,
      })
    ) satisfies HallOfFameSeason[]
  const seasonIds = hallSeasons.map(
    (hallSeason) => hallSeason.id
  )

  if (seasonIds.length === 0) {
    return buildHallOfFameRankings([], [])
  }

  const { data: reviews } = await supabase
    .from("final_reviews")
    .select("*")
    .in("season_id", seasonIds)
    .eq("revealed", true)

  return buildHallOfFameRankings(
    hallSeasons,
    (reviews ?? []) as FinalReview[]
  )
}

async function getProfileStats(
  supabase: Awaited<ReturnType<typeof createClient>>,
  clubId: string,
  userId: string,
  membership: Membership,
  members: ClubMember[]
) {
  const { data: seasons } = await supabase
    .from("seasons")
    .select("id")
    .eq("club_id", clubId)

  const seasonIds = (seasons ?? []).map(
    (season) => season.id as string
  )

  if (seasonIds.length === 0) {
    return buildProfileStats({
      userId,
      role: membership.role,
      members,
      reviews: [],
      proposalCount: 0,
      winningProposalCount: 0,
    })
  }

  const { data: reviews } = await supabase
    .from("final_reviews")
    .select("*")
    .in("season_id", seasonIds)
    .eq("revealed", true)

  const { count: proposalCount } = await supabase
    .from("anime_proposals")
    .select("*", {
      count: "exact",
      head: true,
    })
    .in("season_id", seasonIds)
    .eq("user_id", userId)

  const { count: winningProposalCount } = await supabase
    .from("season_challenges")
    .select("*", {
      count: "exact",
      head: true,
    })
    .in("season_id", seasonIds)
    .eq("winner_user_id", userId)

  return buildProfileStats({
    userId,
    role: membership.role,
    members,
    reviews: (reviews ?? []) as FinalReview[],
    proposalCount: proposalCount ?? 0,
    winningProposalCount:
      winningProposalCount ?? 0,
  })
}
export async function getClubContext(
  slug: string
): Promise<ClubContext | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (clubError || !club) {
    return null
  }

  const hallOfFameRankings =
    await getHallOfFameRankings(supabase, club.id)

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

  const { data: members } = await supabase
    .from("club_members")
    .select(`
      *,
      profiles (
        username
      )
    `)
    .eq("club_id", club.id)

  const memberList =
    (members ?? []) as ClubMember[]
  const memberCount = memberList.length

  const profileStats = await getProfileStats(
    supabase,
    club.id,
    user.id,
    membership as Membership,
    memberList
  )

  const { data: openSeason } = await supabase
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
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: latestFinishedSeason } = await supabase
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
    .eq("status", "FINISHED")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  const season =
    (openSeason ?? latestFinishedSeason ??
      null) as Season | null

  if (!season) {
    return {
      user,
      club: club as Club,
      membership: membership as Membership,
      season: null,
      members: memberList,
      proposal: null,
      challenge: null,
      interestVote: null,
      memberCount,
      proposalCount: 0,
      challengeWinner: null,
      progress: null,
      clubProgress: [],
      reviewSummary: emptyReviewSummary(memberCount),
      hallOfFameRankings,
      profileStats,
      appNotifications: [],
    }
  }

  const { data: progressList } = await supabase
    .from("episode_progress")
    .select(`
      id,
      season_id,
      user_id,
      episodes_watched
    `)
    .eq("season_id", season.id)

  const typedProgressList =
    (progressList ?? []) as EpisodeProgress[]

  const clubProgress = memberList.map((member) => {
    const progressItem = typedProgressList.find(
      (item) => item.user_id === member.user_id
    )

    return {
      user_id: member.user_id,
      username:
        member.profiles?.username ?? "Unknown",
      episodes_watched:
        progressItem?.episodes_watched ?? 0,
    }
  })

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
      *,
      winner:winner_user_id (
        username
      )
    `)
    .eq("season_id", season.id)
    .maybeSingle()

  const typedChallenge =
    (challenge as SeasonChallenge | null) ?? null
  let challengeWinner: ProfileSummary | null = null

  if (typedChallenge?.winner_user_id) {
    const { data } = await supabase
      .from("profiles")
      .select("id,username")
      .eq("id", typedChallenge.winner_user_id)
      .single()

    challengeWinner =
      (data as ProfileSummary | null) ?? null
  }

  const { data: interestVote } = await supabase
    .from("interest_votes")
    .select("*")
    .eq("season_id", season.id)
    .eq("user_id", user.id)
    .maybeSingle()

  const progress =
    typedProgressList.find(
      (item) => item.user_id === user.id
    ) ?? null

  const { data: finalReviews } = await supabase
    .from("final_reviews")
    .select(`
      *,
      profiles (
        username
      )
    `)
    .eq("season_id", season.id)
    .order("created_at", { ascending: true })

  const reviews =
    (finalReviews ?? []) as FinalReview[]
  const revealedReviews = reviews.filter(
    (review) => review.revealed
  )
  const currentUserReview =
    reviews.find(
      (review) => review.user_id === user.id
    ) ?? null
  const visibleReviews =
    revealedReviews.length > 0
      ? revealedReviews
      : currentUserReview
        ? [currentUserReview]
        : []
const { data: submissionCountData } = await supabase.rpc(
  "get_review_submission_count",
  { p_season_id: season.id }
)

const submittedCount = submissionCountData ?? reviews.length

const reviewSummary: ReviewSummary = {
  currentUserReview,
  reviews: visibleReviews,
  submittedCount,
  memberCount,
  allSubmitted:
    memberCount > 0 &&
    submittedCount >= memberCount,
  revealed: revealedReviews.length > 0,
  averages: calculateReviewAverages(
    revealedReviews.length > 0
      ? revealedReviews
      : reviews
  ),
}
  const appNotifications = buildNotifications({
    season,
    membership: membership as Membership,
    reviewSummary,
  })

  return {
    user,
    club: club as Club,
    membership: membership as Membership,
    season,
    members: memberList,
    proposal: (proposal as AnimeProposal | null) ?? null,
    challenge: typedChallenge,
    challengeWinner,
    interestVote:
      (interestVote as InterestVote | null) ?? null,
    progress,
    clubProgress,
    memberCount,
    proposalCount: proposalCount ?? 0,
    reviewSummary,
    hallOfFameRankings,
    profileStats,
    appNotifications,
  }
}
