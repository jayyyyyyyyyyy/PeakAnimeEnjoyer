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

  return (
    <div className="relative overflow-hidden rounded-3xl border border-pink-500/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,.08)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#090B14] via-transparent to-transparent z-10" />

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
                {season.anime.episodes ?? "?"}
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

            <input
              type="number"
              min={0}
              max={season.minimum_episodes}
              value={episodesWatched}
              onChange={(e) =>
                setEpisodesWatched(Number(e.target.value))
              }
              className="w-full rounded-xl bg-[#090B14] border border-white/10 p-3 text-white transition-colors focus:border-pink-500 focus:outline-none"
            />

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