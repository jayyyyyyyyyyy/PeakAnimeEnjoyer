"use client"

import { useState } from "react"
import { BarChart3, Crown, Trophy } from "lucide-react"
import type {
  HallOfFameCategory,
  HallOfFameEntry,
  HallOfFameRankings,
} from "@/lib/types/club"
import { cn } from "@/lib/utils"

interface HallOfFameScreenProps {
  rankings: HallOfFameRankings
}

const categories: Array<{
  id: HallOfFameCategory
  label: string
}> = [
  { id: "overall", label: "Overall" },
  { id: "story", label: "Story" },
  { id: "animation", label: "Visuals" },
  { id: "characters", label: "Characters" },
  { id: "soundtrack", label: "Soundtrack" },
  { id: "worldBuilding", label: "World" },
  { id: "pacing", label: "Pacing" },
  { id: "emotionalImpact", label: "Emotion" },
]

function formatScore(score: number) {
  return score.toFixed(2)
}

function getMedal(rank: number) {
  if (rank === 1) return "#1"
  if (rank === 2) return "#2"
  if (rank === 3) return "#3"
  return `#${rank}`
}

function getCategoryScore(
  entry: HallOfFameEntry,
  category: HallOfFameCategory
) {
  return entry.averages[category]
}

function Podium({
  entries,
  category,
}: {
  entries: HallOfFameEntry[]
  category: HallOfFameCategory
}) {
  const topThree = entries.slice(0, 3)

  if (topThree.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-3 items-end gap-2 pt-2">
      {[topThree[1], topThree[0], topThree[2]].map(
        (entry, index) => {
          if (!entry) {
            return <div key={index} />
          }

          const rank = entries.indexOf(entry) + 1
          const isWinner = rank === 1

          return (
            <div
              key={entry.seasonId}
              className="flex flex-col items-center"
            >
              {isWinner && (
                <Crown className="mb-2 h-7 w-7 text-[#F59E0B]" />
              )}

              <div
                className={cn(
                  "flex w-full flex-col justify-end rounded-t-2xl border px-2 pb-3 text-center",
                  isWinner
                    ? "h-32 border-[#F59E0B]/40 bg-[#F59E0B]/20"
                    : rank === 2
                      ? "h-24 border-[#94A3B8]/30 bg-white/10"
                      : "h-20 border-[#CD7F32]/30 bg-[#CD7F32]/15"
                )}
              >
                <span className="text-xs font-bold text-white/60">
                  {getMedal(rank)}
                </span>
                <span className="line-clamp-2 text-xs font-bold text-white">
                  {entry.animeTitle}
                </span>
                <span className="text-sm font-black text-[#F59E0B]">
                  {formatScore(getCategoryScore(entry, category))}
                </span>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

export function HallOfFameScreen({
  rankings,
}: HallOfFameScreenProps) {
  const [activeCategory, setActiveCategory] =
    useState<HallOfFameCategory>("overall")
  const entries = rankings[activeCategory]
  const totalWatched = rankings.overall.length

  return (
    <div className="pb-24 px-4 space-y-6">
      <header className="pt-4 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Trophy className="h-8 w-8 text-[#F59E0B]" />
          <h1 className="text-2xl font-bold gradient-text">
            Hall of Fame
          </h1>
        </div>
        <p className="text-sm text-white/50">
          The permanent memory of your club.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-white/50">
            Anime Ranked
          </p>
          <p className="mt-1 text-3xl font-black text-white">
            {totalWatched}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-white/50">
            Current Ranking
          </p>
          <p className="mt-1 text-lg font-bold text-[#F59E0B]">
            {categories.find(
              (category) => category.id === activeCategory
            )?.label}
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold transition",
              activeCategory === category.id
                ? "border-[#F59E0B] bg-[#F59E0B] text-[#0F172A]"
                : "border-white/10 bg-white/5 text-white/70"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {entries.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-white/40" />
          <h2 className="mt-4 text-xl font-bold text-white">
            No revealed reviews yet
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Finished seasons will appear here after the owner reveals the reviews.
          </p>
        </div>
      ) : (
        <>
          <Podium
            entries={entries}
            category={activeCategory}
          />

          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <BarChart3 className="h-5 w-5 text-[#F59E0B]" />
              Rankings
            </h2>

            {entries.map((entry, index) => {
              const rank = index + 1
              const score = getCategoryScore(
                entry,
                activeCategory
              )

              return (
                <div
                  key={entry.seasonId}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/5 p-4",
                    rank === 1 &&
                      "border-[#F59E0B]/40 bg-[#F59E0B]/10"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] font-black text-[#F59E0B]">
                      {getMedal(rank)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">
                        {entry.animeTitle}
                      </p>
                      <p className="text-xs text-white/50">
                        {entry.reviewCount} reviews
                        {entry.episodes
                          ? ` · ${entry.episodes} episodes`
                          : ""}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#8B5CF6]/20 px-3 py-1.5 font-bold text-[#C4B5FD]">
                      {formatScore(score)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
