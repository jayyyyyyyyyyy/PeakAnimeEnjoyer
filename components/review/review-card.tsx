interface ReviewCardProps {
  review: string
  setReview: (value: string) => void
}

const MAX_CHARACTERS = 1000

export function ReviewCard({
  review,
  setReview,
}: ReviewCardProps) {
  return (
    <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">

      <div>
        <h2 className="text-xl font-bold text-white">
          📝 Your Review
        </h2>

        <p className="text-sm text-white/60 mt-1">
          Share your thoughts with the club.
        </p>
      </div>

      <textarea
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
        maxLength={MAX_CHARACTERS}
        rows={8}
        placeholder="What did you like? What didn't you like? Would you recommend this anime?"
        className="w-full rounded-2xl bg-[#0F172A] border border-white/10 p-4 text-white resize-none focus:outline-none focus:border-[#8B5CF6]"
      />

      <div className="flex justify-between items-center">

        <span className="text-xs text-white/40">
          Max {MAX_CHARACTERS} characters
        </span>

        <span
          className={`text-xs ${
            review.length > 900
              ? "text-yellow-400"
              : "text-white/40"
          }`}
        >
          {review.length} / {MAX_CHARACTERS}
        </span>

      </div>

    </div>
  )
}