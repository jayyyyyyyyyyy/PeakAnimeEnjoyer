import type { Season, SeasonChallenge } from "@/lib/types/club"

interface ChallengeStatusCardProps {
  challenge: SeasonChallenge | null
  season: Season
  isOwner: boolean
  isStartingVoting: boolean
  startError: string | null
  onStartInterestVoting: () => void
}

export function ChallengeStatusCard({
  challenge,
  season,
  isOwner,
  isStartingVoting,
  startError,
  onStartInterestVoting,
}: ChallengeStatusCardProps) {
  return (
    <div className="space-y-3">
      <div className="glass rounded-2xl p-4 border border-[#8B5CF6]/30">
        <p className="text-xs text-white/50 mb-2">
          Your Secret Challenge
        </p>

        {challenge ? (
          <>
            {season?.anime?.image_url && (
              <div
                className="h-40 rounded-2xl bg-cover bg-center mb-4 border border-white/10"
                style={{
                  backgroundImage: `url('${season.anime.image_url}')`,
                }}
              />
            )}

            <h2 className="text-lg font-bold text-white">
              {season.anime?.title}
            </h2>

            <p className="text-sm text-white/60">
              Keep the proposer secret.
            </p>

            {season.anime?.episodes && (
              <p className="text-xs text-white/40 mt-2">
                {season.anime.episodes} episodes
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-white">
              Challenges are being prepared
            </h2>

            <p className="text-sm text-white/60">
              Refresh in a moment.
            </p>
          </>
        )}
      </div>

      {isOwner && (
        <button
          onClick={onStartInterestVoting}
          disabled={isStartingVoting}
          className="w-full rounded-xl bg-purple-600 p-3 font-bold text-white disabled:opacity-60"
        >
          {isStartingVoting
            ? "Starting Interest Voting..."
            : "Start Interest Voting"}
        </button>
      )}

      {startError && (
        <p className="text-sm text-red-300">
          {startError}
        </p>
      )}
    </div>
  )
}
