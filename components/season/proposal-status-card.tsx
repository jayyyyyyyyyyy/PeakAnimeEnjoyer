import type { AnimeProposal } from "@/lib/types/club"

interface ProposalStatusCardProps {
  proposal: AnimeProposal | null
  proposalCount: number
  memberCount: number
  isOwner: boolean
  isStartingChallenge: boolean
  startError: string | null
  onStartChallenge: () => void
}

export function ProposalStatusCard({
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
      {proposal && (
        <div className="glass rounded-2xl p-4 border border-[#8B5CF6]/30">
          <p className="text-xs text-white/50 mb-2">
            Your Proposal
          </p>

          <h2 className="text-lg font-bold text-white">
            {proposal.anime?.title}
          </h2>

          <p className="text-sm text-white/60">
            Waiting for the challenge phase.
          </p>
        </div>
      )}

      <div className="glass rounded-2xl p-4 border border-white/10">
        <p className="text-xs text-white/50 mb-2">
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
            className="w-full rounded-xl bg-purple-600 p-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStartingChallenge
              ? "Starting Challenge..."
              : "Start Challenge"}
          </button>
        )}

      {startError && (
        <p className="text-sm text-red-300">
          {startError}
        </p>
      )}
    </>
  )
}
