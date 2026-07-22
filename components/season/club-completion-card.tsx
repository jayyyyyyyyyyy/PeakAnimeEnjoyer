interface ClubCompletionCardProps {
  totalWatched: number
  totalGoal: number
  completionPercentage: number
  memberCount: number
  everyoneFinished: boolean
  isOwner: boolean
  onFinishSeason: () => void
}

export function ClubCompletionCard({
  totalWatched,
  totalGoal,
  completionPercentage,
  memberCount,
  everyoneFinished,
  isOwner,
  onFinishSeason,
}: ClubCompletionCardProps) {
  return (
    <div className="rounded-3xl border border-pink-500/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl p-6 mb-6 shadow-[0_0_40px_rgba(236,72,153,.06)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Club Completion
        </h2>

        <span className="text-2xl font-bold text-pink-400">
          {completionPercentage}%
        </span>
      </div>

      <div className="h-4 rounded-full bg-[#090B14] overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500"
          style={{
            width: `${completionPercentage}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-sm text-white/60">
        <span>
          {totalWatched} / {totalGoal} Episodes
        </span>

        <span>
          {memberCount} Members
        </span>
      </div>

      {isOwner && (
        <>
          <button
            onClick={onFinishSeason}
            disabled={!everyoneFinished}
            className="
              mt-6
              w-full
              rounded-xl

              bg-gradient-to-r
              from-pink-500
              to-fuchsia-500

              p-4

              font-semibold
              text-white

              transition-all
              duration-300

              hover:scale-[1.01]
              hover:shadow-[0_0_35px_rgba(236,72,153,.4)]

              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:scale-100
              disabled:hover:shadow-none
            "
          >
            Finish Season
          </button>

          {!everyoneFinished && (
            <p className="mt-2 text-center text-xs text-white/40">
              Every member must reach the season goal first.
            </p>
          )}
        </>
      )}
    </div>
  )
}