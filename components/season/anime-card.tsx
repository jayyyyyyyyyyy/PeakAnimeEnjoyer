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

        <div className="glass rounded-2xl p-4 border border-white/10">
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

              <p className="text-2xl font-bold text-[#F59E0B]">
                {season.minimum_episodes}
              </p>
            </div>
          </div>
        </div>

        {season.status === "ACTIVE" && (
          <div className="glass rounded-2xl p-4 border border-white/10 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/70">
                Your Progress
              </span>

              <span className="text-lg font-bold text-[#8B5CF6]">
                {episodesWatched} / {season.minimum_episodes}
              </span>
            </div>

            <div className="h-3 rounded-full bg-[#0F172A] overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]"
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
              className="w-full rounded-xl bg-[#0F172A] border border-white/10 p-3 text-white"
            />

            <button
              onClick={handleSaveProgress}
              className="mt-4 w-full rounded-xl bg-purple-600 hover:bg-purple-500 transition p-3 font-semibold"
            >
              Save Progress
            </button>
          </div>
        )}
      </div>
    </div>
  )
}