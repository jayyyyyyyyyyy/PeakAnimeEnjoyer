import type { Season, SeasonChallenge } from "@/lib/types/club"
import { StartChallengeForm } from "./start-challenge-form"

interface ChallengeStatusCardProps {
  seasonId: string
  challenge: SeasonChallenge | null
  season: Season
  isOwner: boolean
}

export function ChallengeStatusCard({
  seasonId,
  challenge,
  season,
  isOwner,
}: ChallengeStatusCardProps) {
  if (challenge) {
    return (
      <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
        <p className="text-sm text-white/60">
          Winner selected, moving to interest voting...
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
      <p className="mb-4 text-xs text-white/50">
        Challenge Time
      </p>

      {isOwner ? (
        <StartChallengeForm seasonId={seasonId} />
      ) : (
        <p className="text-sm text-white/60">
          The club owner is running a challenge to pick the winning anime.
          Hang tight!
        </p>
      )}
    </div>
  )
}