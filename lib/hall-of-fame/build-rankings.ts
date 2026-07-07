import type {
  FinalReview,
  HallOfFameEntry,
  HallOfFameRankings,
  HallOfFameSeason,
  ReviewAverages,
} from "@/lib/types/club"

const EMPTY_AVERAGES: ReviewAverages = {
  overall: 0,
  story: 0,
  characters: 0,
  animation: 0,
  soundtrack: 0,
  worldBuilding: 0,
  pacing: 0,
  emotionalImpact: 0,
}

function averageScores(
  reviews: FinalReview[]
): ReviewAverages {
  if (reviews.length === 0) {
    return EMPTY_AVERAGES
  }

  const totals = reviews.reduce(
    (acc, review) => ({
      overall: acc.overall + review.overall,
      story: acc.story + review.story,
      characters: acc.characters + review.characters,
      animation: acc.animation + review.animation,
      soundtrack: acc.soundtrack + review.soundtrack,
      worldBuilding:
        acc.worldBuilding + review.world_building,
      pacing: acc.pacing + review.pacing,
      emotionalImpact:
        acc.emotionalImpact + review.emotional_impact,
    }),
    EMPTY_AVERAGES
  )

  return {
    overall: totals.overall / reviews.length,
    story: totals.story / reviews.length,
    characters: totals.characters / reviews.length,
    animation: totals.animation / reviews.length,
    soundtrack: totals.soundtrack / reviews.length,
    worldBuilding: totals.worldBuilding / reviews.length,
    pacing: totals.pacing / reviews.length,
    emotionalImpact:
      totals.emotionalImpact / reviews.length,
  }
}

function scoreForCategory(
  entry: HallOfFameEntry,
  category: keyof HallOfFameRankings
) {
  return entry.averages[category]
}

function rankBy(
  entries: HallOfFameEntry[],
  category: keyof HallOfFameRankings
) {
  return [...entries].sort((a, b) => {
    const scoreDiff =
      scoreForCategory(b, category) -
      scoreForCategory(a, category)

    if (scoreDiff !== 0) return scoreDiff

    return b.reviewCount - a.reviewCount
  })
}

export function buildHallOfFameRankings(
  seasons: HallOfFameSeason[],
  reviews: FinalReview[]
): HallOfFameRankings {
  const entries = seasons
    .map((season) => {
      const seasonReviews = reviews.filter(
        (review) => review.season_id === season.id
      )

      return {
        seasonId: season.id,
        seasonTitle: season.title,
        animeTitle:
          season.anime?.title ?? season.title,
        imageUrl: season.anime?.image_url ?? null,
        episodes: season.anime?.episodes ?? null,
        reviewCount: seasonReviews.length,
        averages: averageScores(seasonReviews),
      }
    })
    .filter((entry) => entry.reviewCount > 0)

  return {
    overall: rankBy(entries, "overall"),
    story: rankBy(entries, "story"),
    characters: rankBy(entries, "characters"),
    animation: rankBy(entries, "animation"),
    soundtrack: rankBy(entries, "soundtrack"),
    worldBuilding: rankBy(entries, "worldBuilding"),
    pacing: rankBy(entries, "pacing"),
    emotionalImpact: rankBy(entries, "emotionalImpact"),
  }
}
