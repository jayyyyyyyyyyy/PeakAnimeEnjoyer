import type { AnimeProposal } from "@/lib/types/club"
import { AnimeProposalForm } from "./anime-proposal-form"

interface ProposalStatusCardProps {
  seasonId: string
  proposal: AnimeProposal | null
  proposalCount: number
  memberCount: number
  isOwner: boolean
  isStartingChallenge: boolean
  startError: string | null
  onStartChallenge: () => void
}

export function ProposalStatusCard({
  seasonId,
  proposal,
  proposalCount,
  memberCount,
  isOwner,
  isStartingChallenge,
  startError,
  onStartChallenge,
}: ProposalStatusCardProps) {
  return (
    <>
      {proposal ? (
        <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
          <p className="mb-2 text-xs text-white/50">
            Your Proposal
          </p>

          <h2 className="text-lg font-bold text-white">
            {proposal.anime?.title}
          </h2>

          <p className="text-sm text-white/60">
            Waiting for the challenge phase.
          </p>
        </div>
      ) : (
        <AnimeProposalForm seasonId={seasonId} />
      )}

      <div className="mt-4 rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
        <p className="mb-2 text-xs text-white/50">
          Proposal Progress
        </p>

        <h2 className="text-lg font-bold text-white">
          {proposalCount} / {memberCount}
        </h2>

        <p className="text-sm text-white/60">
          Members submitted a proposal
        </p>
      </div>

      {isOwner &&
        proposalCount === memberCount &&
        memberCount > 1 && (
          <button
            onClick={onStartChallenge}
            disabled={isStartingChallenge}
            className="
              mt-4
              w-full
              rounded-xl

              bg-gradient-to-r
              from-pink-500
              to-fuchsia-500

              p-3

              font-bold
              text-white

              transition-all
              duration-300

              hover:scale-[1.01]

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isStartingChallenge
              ? "Starting Challenge..."
              : "Start Challenge"}
          </button>
        )}

      {startError && (
        <p className="mt-3 text-sm text-red-300">
          {startError}
        </p>
      )}
    </>
  )
}