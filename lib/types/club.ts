export type SeasonStatus =
  | "PROPOSAL"
  | "CHALLENGE"
  | "INTEREST_VOTING"
  | "ACTIVE"
  | "REVIEW"
  | "REVEALED"
  | "FINISHED"

export type ClubRole = "OWNER" | "MEMBER"

export interface Club {
  id: string
  name: string
  slug: string
  invite_code?: string
  created_by?: string
}

export interface SeasonAnime {
  id: string
  title: string
  image_url: string | null
  episodes: number | null
}

export interface Season {
  id: string
  club_id: string
  title: string
  status: SeasonStatus
  selected_anime_id: string | null
  anime?: SeasonAnime | null
  minimum_episodes: number
  created_at?: string
}

export interface Membership {
  id: string
  club_id: string
  user_id: string
  role: ClubRole
}

export interface ClubMember extends Membership {
  avatar?: string | null
  status?: "green" | "yellow" | "red" | null
  profiles?: {
    username: string | null
  } | null
}

export interface AnimeProposal {
  id: string
  season_id: string
  user_id: string
  anime_id: string
  revealed: boolean
  anime?: {
    id: string
    title: string
    image_url: string | null
  } | null
}

export interface SeasonChallenge {
  id: string
  season_id: string
  winner_user_id?: string
  giver_user_id?: string
  receiver_user_id?: string
  anime_id?: string
  method?: string
  notes: string | null
  created_at: string

  winner?: {
    username: string | null
  } | null
}

export interface InterestVote {
  id: string
  season_id: string
  user_id: string
  anime_id: string
  score: number
}

export interface ProfileSummary {
  id: string
  username: string | null
}

export interface EpisodeProgress {
  id?: string
  season_id: string
  user_id: string
  episodes_watched: number
}

export interface ClubProgressMember {
  user_id: string
  username: string
  episodes_watched: number
}

export interface FinalReview {
  id: string
  season_id: string
  user_id: string
  story: number
  characters: number
  animation: number
  soundtrack: number
  world_building: number
  pacing: number
  emotional_impact: number
  overall: number
  review: string | null
  locked: boolean
  revealed: boolean
  created_at?: string
  profiles?: {
    username: string | null
  } | null
}

export interface ReviewAverages {
  overall: number
  story: number
  characters: number
  animation: number
  soundtrack: number
  worldBuilding: number
  pacing: number
  emotionalImpact: number
}

export interface ReviewSummary {
  currentUserReview: FinalReview | null
  reviews: FinalReview[]
  submittedCount: number
  memberCount: number
  allSubmitted: boolean
  revealed: boolean
  averages: ReviewAverages | null
}
export type HallOfFameCategory =
  | "overall"
  | "story"
  | "characters"
  | "animation"
  | "soundtrack"
  | "worldBuilding"
  | "pacing"
  | "emotionalImpact"

export interface HallOfFameSeason {
  id: string
  title: string
  anime?: SeasonAnime | null
}

export interface HallOfFameEntry {
  seasonId: string
  seasonTitle: string
  animeTitle: string
  imageUrl: string | null
  episodes: number | null
  reviewCount: number
  averages: ReviewAverages
}

export type HallOfFameRankings = Record<
  HallOfFameCategory,
  HallOfFameEntry[]
>
export interface ProfileBadge {
  name: string
  description: string
  tone: "gold" | "purple" | "green" | "blue"
  earned: boolean
}

export interface AnimeTaste {
  label: string
  strongestCategory: string | null
  strictestCategory: string | null
  averageScore: number | null
}

export interface ProfileStats {
  userId: string
  username: string
  role: ClubRole
  reviewCount: number
  proposalCount: number
  winningProposalCount: number
  clubRank: number | null
  memberCount: number
  averages: ReviewAverages | null
  animeTaste: AnimeTaste
  badges: ProfileBadge[]
}
export type AppNotificationType =
  | "SEASON_STARTED"
  | "REVIEW_AVAILABLE"
  | "REVEAL_READY"

export interface AppNotification {
  id: string
  type: AppNotificationType
  title: string
  body: string
  actionLabel: string
  priority: "info" | "warning" | "success"
}


