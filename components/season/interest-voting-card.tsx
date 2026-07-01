import { cn } from "@/lib/utils"

interface InterestVotingCardProps {
  challenge: any
  season: any
  interestVote: any
  voteScore: number
  setVoteScore: (score: number) => void
  handleSubmitInterestVote: () => void
  isSubmittingVote: boolean
  voteError: string | null
}

export function InterestVotingCard({
  challenge,
  season,
  interestVote,
  voteScore,
  setVoteScore,
  handleSubmitInterestVote,
  isSubmittingVote,
  voteError,
}: InterestVotingCardProps) {
  return (
    <div className="space-y-3">
      <div className="glass rounded-2xl p-4 border border-[#F59E0B]/30">
        <p className="text-xs text-white/50 mb-2">
          Interest Vote
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

            {interestVote ? (
              <p className="text-sm text-white/60">
                Your current interest score is{" "}
                <span className="font-bold text-[#F59E0B]">
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
                        ? "border-[#F59E0B] bg-[#F59E0B] text-[#0F172A]"
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
              className="mt-4 w-full rounded-xl bg-[#F59E0B] p-3 font-bold text-[#0F172A] disabled:cursor-not-allowed disabled:opacity-60"
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
              No challenge found
            </h2>

            <p className="text-sm text-white/60">
              Ask the owner to check the season assignments.
            </p>
          </>
        )}
      </div>
    </div>
  )
}