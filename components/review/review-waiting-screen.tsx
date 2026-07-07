interface ReviewWaitingScreenProps {
  submittedCount: number
  memberCount: number
  hasSubmitted: boolean
  isOwner: boolean
  canReveal: boolean
  isRevealing: boolean
  error: string | null
  onReveal: () => void
}

export function ReviewWaitingScreen({
  submittedCount,
  memberCount,
  hasSubmitted,
  isOwner,
  canReveal,
  isRevealing,
  error,
  onReveal,
}: ReviewWaitingScreenProps) {
  const progressPercentage =
    memberCount === 0
      ? 0
      : Math.min(
          (submittedCount / memberCount) * 100,
          100
        )

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/50">
          Review Phase
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          {hasSubmitted
            ? "Your review is locked"
            : "Waiting for your review"}
        </h2>

        <p className="mt-2 text-sm text-white/60">
          {isOwner
            ? `${submittedCount} / ${memberCount} members submitted their review.`
            : "Reviews stay hidden until everyone has submitted and the owner reveals them."}
        </p>

        {isOwner && (
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#0F172A]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        )}
      </div>

      {isOwner && canReveal && (
        <button
          onClick={onReveal}
          disabled={isRevealing}
          className="w-full rounded-2xl bg-[#F59E0B] p-4 font-bold text-[#0F172A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRevealing
            ? "Revealing Reviews..."
            : "Reveal Reviews"}
        </button>
      )}

      {isOwner && !canReveal && (
        <p className="text-sm text-white/50">
          You can reveal reviews once every member has submitted one.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
