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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Club Completion
        </h2>

        <span className="text-2xl font-bold text-[#F59E0B]">
          {completionPercentage}%
        </span>
      </div>

      <div className="h-4 rounded-full bg-[#0F172A] overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]"
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

      {everyoneFinished && isOwner && (
        <button
          onClick={onFinishSeason}
          className="mt-6 w-full rounded-xl bg-green-600 hover:bg-green-500 transition p-4 font-semibold"
        >
          Finish Season
        </button>
      )}
    </div>
  )
}