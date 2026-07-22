"use client"

import type { Season } from "@/lib/types/club"

interface AnimeCardProps {
  season: Season
  episodesWatched: number
  setEpisodesWatched: (value: number) => void
  handleSaveProgress: () => void
}

export function AnimeCard({
  season,
  episodesWatched,
  setEpisodesWatched,
  handleSaveProgress,
}: AnimeCardProps) {
  if (!season?.anime) return null

  const totalEpisodes = season.anime.episodes

  function clamp(value: number) {
    const lower = Math.max(0, value)
    return totalEpisodes
      ? Math.min(lower, totalEpisodes)
      : lower
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10" />

      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: season.anime.image_url
            ? `url(${season.anime.image_url})`
            : "url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60')",
        }}
      />

      <div className="relative z-20 p-4 -mt-16">
        <h2 className="text-2xl font-bold text-white mb-1">
          {season.anime.title}
        </h2>

        <p className="text-sm text-white/60 mb-4">
          Selected Anime
        </p>

        <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">
                Total Episodes
              </p>

              <p className="text-2xl font-bold text-white">
                {totalEpisodes ?? "?"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-white/70">
                Season Goal
              </p>

              <p className="text-2xl font-bold text-pink-400">
                {season.minimum_episodes}
              </p>
            </div>
          </div>
        </div>

        {season.status === "ACTIVE" && (
          <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/70">
                Your Progress
              </span>

              <span className="text-lg font-bold text-pink-400">
                {episodesWatched} / {season.minimum_episodes}
              </span>
            </div>

            <div className="h-3 rounded-full bg-[#090B14] overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500"
                style={{
                  width: `${Math.min(
                    (episodesWatched /
                      season.minimum_episodes) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setEpisodesWatched(clamp(episodesWatched - 1))
                }
                className="
                  h-12
                  w-12
                  shrink-0

                  rounded-xl

                  border
                  border-white/10

                  bg-[#090B14]

                  text-lg
                  font-bold
                  text-white

                  transition-colors

                  hover:border-pink-500/40
                "
              >
                −
              </button>

              <input
                type="number"
                min={0}
                max={totalEpisodes ?? undefined}
                value={episodesWatched}
                onChange={(e) =>
                  setEpisodesWatched(clamp(Number(e.target.value)))
                }
                className="w-full rounded-xl bg-[#090B14] border border-white/10 p-3 text-center text-white transition-colors focus:border-pink-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setEpisodesWatched(clamp(episodesWatched + 1))
                }
                className="
                  h-12
                  w-12
                  shrink-0

                  rounded-xl

                  border
                  border-white/10

                  bg-[#090B14]

                  text-lg
                  font-bold
                  text-white

                  transition-colors

                  hover:border-pink-500/40
                "
              >
                +
              </button>
            </div>

            <button
              onClick={handleSaveProgress}
              className="
                mt-4
                w-full
                rounded-xl

                bg-gradient-to-r
                from-pink-500
                to-fuchsia-500

                p-3

                font-semibold
                text-white

                transition-all
                duration-300

                hover:scale-[1.01]
                hover:shadow-[0_0_35px_rgba(236,72,153,.4)]

                active:scale-[0.99]
              "
            >
              Save Progress
            </button>
          </div>
        )}
      </div>
    </div>
  )
}