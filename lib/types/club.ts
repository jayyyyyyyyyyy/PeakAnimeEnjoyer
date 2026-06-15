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
  giver_user_id: string
  receiver_user_id: string
  anime_id: string
  anime?: {
    id: string
    title: string
    image_url: string | null
    episodes: number | null
  } | null
}
