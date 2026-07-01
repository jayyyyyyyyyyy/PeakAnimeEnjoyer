import { AnimeScoreCard } from "./anime-score-card"
import { ReviewCard } from "./review-card"

interface ReviewScreenProps {
  season: any

  story: number
  setStory: (v: number) => void

  characters: number
  setCharacters: (v: number) => void

  animation: number
  setAnimation: (v: number) => void

  soundtrack: number
  setSoundtrack: (v: number) => void

  worldBuilding: number
  setWorldBuilding: (v: number) => void

  pacing: number
  setPacing: (v: number) => void

  emotionalImpact: number
  setEmotionalImpact: (v: number) => void

  review: string
  setReview: (value: string) => void

  onSubmit: () => void

  isSubmitting: boolean
}

export function ReviewScreen({
  season,

  story,
  setStory,

  characters,
  setCharacters,

  animation,
  setAnimation,

  soundtrack,
  setSoundtrack,

  worldBuilding,
  setWorldBuilding,

  pacing,
  setPacing,

  emotionalImpact,
  setEmotionalImpact,

  review,
  setReview,

  onSubmit,

  isSubmitting,
}: ReviewScreenProps) {
  return (
    <div className="space-y-6">

      <div className="glass rounded-3xl p-6 border border-white/10">

        <p className="text-sm text-white/50">
          Final Review
        </p>

        <h1 className="mt-2 text-3xl font-black text-white">
          {season.anime?.title}
        </h1>

        <p className="mt-2 text-white/60">
          Rate every category and write your review.
        </p>

      </div>

      <AnimeScoreCard
        story={story}
        setStory={setStory}

        characters={characters}
        setCharacters={setCharacters}

        animation={animation}
        setAnimation={setAnimation}

        soundtrack={soundtrack}
        setSoundtrack={setSoundtrack}

        worldBuilding={worldBuilding}
        setWorldBuilding={setWorldBuilding}

        pacing={pacing}
        setPacing={setPacing}

        emotionalImpact={emotionalImpact}
        setEmotionalImpact={setEmotionalImpact}
      />

      <ReviewCard
        review={review}
        setReview={setReview}
      />

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-[#8B5CF6] p-4 font-bold text-white transition hover:bg-[#7C3AED] disabled:opacity-60"
      >
        {isSubmitting
          ? "Submitting..."
          : "Submit Review"}
      </button>

    </div>
  )
}