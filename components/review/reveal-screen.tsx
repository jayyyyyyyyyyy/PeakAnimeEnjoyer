import type { ReviewSummary, Season } from "@/lib/types/club"

interface RevealScreenProps {
  season: Season
  reviewSummary: ReviewSummary
}

function formatScore(score: number) {
  return score.toFixed(2)
}

export function RevealScreen({
  season,
  reviewSummary,
}: RevealScreenProps) {
  const averages = reviewSummary.averages

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-[#F59E0B]/30 bg-white/5 p-6 text-center">
        <p className="text-sm text-white/50">
          Final Results
        </p>

        <h1 className="mt-2 text-3xl font-black text-white">
          {season.anime?.title ?? season.title}
        </h1>

        <p className="mt-3 text-5xl font-black text-[#F59E0B]">
          {averages ? formatScore(averages.overall) : "-"}
        </p>
      </div>

      {averages && (
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Story", averages.story],
            ["Visuals", averages.animation],
            ["Characters", averages.characters],
            ["Soundtrack", averages.soundtrack],
            ["World", averages.worldBuilding],
            ["Pacing", averages.pacing],
            ["Emotion", averages.emotionalImpact],
          ].map(([label, score]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs text-white/50">
                {label}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {formatScore(score as number)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {reviewSummary.reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-white">
                  {review.profiles?.username ?? "Member"}
                </p>
                <p className="text-xs text-white/50">
                  Overall {formatScore(review.overall)}
                </p>
              </div>
            </div>

            {review.review && (
              <p className="mt-3 text-sm text-white/70">
                {review.review}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
