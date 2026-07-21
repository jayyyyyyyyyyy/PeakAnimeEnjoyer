import type {
  AnimeProposal,
  InterestVote,
  Membership,
  Season,
  SeasonChallenge,
} from "@/lib/types/club"
import { ProposalStatusCard } from "./proposal-status-card"
import { ChallengeStatusCard } from "./challenge-status-card"
import { InterestVotingCard } from "./interest-voting-card"
import { EmptySeasonCard } from "./empty-season-card"

interface SeasonStatusCardProps {
  clubId: string
  season: Season | null
  membership: Membership

  proposal: AnimeProposal | null
  proposalCount: number
  memberCount: number

  challenge: SeasonChallenge | null

  interestVote: InterestVote | null
  voteScore: number
  setVoteScore: (score: number) => void

  isStartingChallenge: boolean
  isSubmittingVote: boolean
  isFinishingVoting: boolean

  startError: string | null
  voteError: string | null
  finishVotingError: string | null

  handleStartChallenge: () => void
  handleSubmitInterestVote: () => void
  handleFinishInterestVoting: () => void
}

export function SeasonStatusCard(props: SeasonStatusCardProps) {
  if (!props.season) {
    return (
      <EmptySeasonCard
        clubId={props.clubId}
        isOwner={props.membership.role === "OWNER"}
      />
    )
  }

  switch (props.season.status) {
    case "PROPOSAL":
      return (
        <ProposalStatusCard
          seasonId={props.season.id}
          proposal={props.proposal}
          proposalCount={props.proposalCount}
          memberCount={props.memberCount}
          isOwner={props.membership.role === "OWNER"}
          isStartingChallenge={props.isStartingChallenge}
          startError={props.startError}
          onStartChallenge={props.handleStartChallenge}
        />
      )

    case "CHALLENGE":
      return (
        <ChallengeStatusCard
          seasonId={props.season.id}
          challenge={props.challenge}
          season={props.season}
          isOwner={props.membership.role === "OWNER"}
        />
      )

    case "INTEREST_VOTING":
      return (
        <InterestVotingCard
          season={props.season}
          interestVote={props.interestVote}
          voteScore={props.voteScore}
          setVoteScore={props.setVoteScore}
          handleSubmitInterestVote={props.handleSubmitInterestVote}
          isSubmittingVote={props.isSubmittingVote}
          voteError={props.voteError}
          isOwner={props.membership.role === "OWNER"}
          isFinishingVoting={props.isFinishingVoting}
          finishVotingError={props.finishVotingError}
          handleFinishInterestVoting={props.handleFinishInterestVoting}
        />
      )

    default:
      return null
  }
}