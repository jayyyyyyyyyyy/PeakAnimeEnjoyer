import type { InterestVote, Season } from "@/lib/types/club"
import { cn } from "@/lib/utils"

interface InterestVotingCardProps {
  season: Season
  interestVote: InterestVote | null
  voteScore: number
  setVoteScore: (score: number) => void
  handleSubmitInterestVote: () => void
  isSubmittingVote: boolean
  voteError: string | null

  isOwner: boolean
  isFinishingVoting: boolean
  finishVotingError: string | null
  handleFinishInterestVoting: () => void
}

export function InterestVotingCard({
  season,
  interestVote,
  voteScore,
  setVoteScore,
  handleSubmitInterestVote,
  isSubmittingVote,
  voteError,
  isOwner,
  isFinishingVoting,
  finishVotingError,
  handleFinishInterestVoting,
}: InterestVotingCardProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
        <p className="mb-2 text-xs text-white/50">
          Interest Vote
        </p>

        {season.anime ? (
          <>
            {season.anime.image_url && (
              <div
                className="h-40 rounded-2xl bg-cover bg-center mb-4 border border-white/10"
                style={{
                  backgroundImage: `url('${season.anime.image_url}')`,
                }}
              />
            )}

            <h2 className="text-lg font-bold text-white">
              {season.anime.title}
            </h2>

            {interestVote ? (
              <p className="text-sm text-white/60">
                Your current interest score is{" "}
                <span className="font-bold text-pink-400">
                  {interestVote.score}/10
                </span>
                .
              </p>
            ) : (
              <p className="text-sm text-white/60">
                Rate how much you want to watch this anime with the club.
              </p>
            )}

            <div className="mt-4 grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (score) => (
                  <button
                    key={score}
                    onClick={() => setVoteScore(score)}
                    className={cn(
                      "h-10 rounded-xl border text-sm font-bold transition-colors",
                      voteScore === score
                        ? "border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white"
                        : "border-white/10 bg-white/5 text-white/70"
                    )}
                  >
                    {score}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleSubmitInterestVote}
              disabled={isSubmittingVote}
              className="
                mt-4 w-full rounded-xl
                bg-gradient-to-r from-pink-500 to-fuchsia-500
                p-3
                font-bold text-white
                transition-all duration-300
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              {isSubmittingVote
                ? "Saving Vote..."
                : interestVote
                  ? "Update Vote"
                  : "Submit Vote"}
            </button>

            {voteError && (
              <p className="mt-3 text-sm text-red-300">
                {voteError}
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-white">
              No anime selected yet
            </h2>

            <p className="text-sm text-white/60">
              Ask the owner to check the challenge result.
            </p>
          </>
        )}
      </div>

      {isOwner && (
        <>
          <button
            onClick={handleFinishInterestVoting}
            disabled={isFinishingVoting}
            className="
              w-full rounded-xl
              bg-gradient-to-r from-pink-500 to-fuchsia-500
              p-3
              font-bold text-white
              transition-all duration-300
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {isFinishingVoting
              ? "Starting Season..."
              : "Finish Voting & Start Season"}
          </button>

          {finishVotingError && (
            <p className="text-sm text-red-300">
              {finishVotingError}
            </p>
          )}
        </>
      )}
    </div>
  )
}