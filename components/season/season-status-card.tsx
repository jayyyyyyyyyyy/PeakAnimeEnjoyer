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

interface SeasonStatusCardProps {
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
  isStartingVoting: boolean
  isSubmittingVote: boolean

  startError: string | null
  voteError: string | null

  handleStartChallenge: () => void
  handleStartInterestVoting: () => void
  handleSubmitInterestVote: () => void
}

export function SeasonStatusCard(props: SeasonStatusCardProps) {
  if (!props.season) {
    return (
      <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
        <p className="text-sm text-white/60">
          No active season yet.
        </p>
      </div>
    )
  }

  switch (props.season.status) {
    case "PROPOSAL":
      return (
        <ProposalStatusCard
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
          challenge={props.challenge}
          season={props.season}
          isOwner={props.membership.role === "OWNER"}
          isStartingVoting={props.isStartingVoting}
          startError={props.startError}
          onStartInterestVoting={props.handleStartInterestVoting}
        />
      )

    case "INTEREST_VOTING":
      return (
        <InterestVotingCard
          challenge={props.challenge}
          season={props.season}
          interestVote={props.interestVote}
          voteScore={props.voteScore}
          setVoteScore={props.setVoteScore}
          handleSubmitInterestVote={props.handleSubmitInterestVote}
          isSubmittingVote={props.isSubmittingVote}
          voteError={props.voteError}
        />
      )

    default:
      return null
  }
}