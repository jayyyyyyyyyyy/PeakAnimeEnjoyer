"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

import { createSeason } from "@/app/actions/seasons"

interface EmptySeasonCardProps {
  clubId: string
  isOwner: boolean
}

export function EmptySeasonCard({
  clubId,
  isOwner,
}: EmptySeasonCardProps) {
  const router = useRouter()

  const [minimumEpisodes, setMinimumEpisodes] = useState(12)
  const [durationDays, setDurationDays] = useState(30)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreateSeason() {
    setError(null)
    setIsCreating(true)

    try {
      await createSeason(clubId, minimumEpisodes, durationDays)
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create season."
      )
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-6 text-center">
      <div
        className="
          mx-auto
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-2xl

          bg-gradient-to-br
          from-pink-500/20
          to-fuchsia-500/20

          text-pink-300
        "
      >
        <Sparkles className="h-5 w-5" />
      </div>

      <p className="text-sm text-white/60">
        No active season yet.
      </p>

      {isOwner ? (
        <>
          <div className="mx-auto mt-5 grid max-w-[360px] grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-left text-xs text-white/50">
                Season goal (episodes)
              </label>

              <input
                type="number"
                min={1}
                value={minimumEpisodes}
                onChange={(e) =>
                  setMinimumEpisodes(Number(e.target.value))
                }
                className="
                  w-full
                  rounded-xl

                  border
                  border-white/10

                  bg-[#090B14]

                  p-3

                  text-center
                  text-white

                  focus:border-pink-500
                  focus:outline-none
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-left text-xs text-white/50">
                Duration (days)
              </label>

              <input
                type="number"
                min={1}
                value={durationDays}
                onChange={(e) =>
                  setDurationDays(Number(e.target.value))
                }
                className="
                  w-full
                  rounded-xl

                  border
                  border-white/10

                  bg-[#090B14]

                  p-3

                  text-center
                  text-white

                  focus:border-pink-500
                  focus:outline-none
                "
              />
            </div>
          </div>

          <button
            onClick={handleCreateSeason}
            disabled={
              isCreating ||
              minimumEpisodes < 1 ||
              durationDays < 1
            }
            className="
              mt-5
              rounded-xl

              bg-gradient-to-r
              from-pink-500
              to-fuchsia-500

              px-6
              py-3

              text-sm
              font-semibold
              text-white

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:shadow-[0_0_35px_rgba(236,72,153,.4)]

              disabled:opacity-60
              disabled:hover:scale-100
            "
          >
            {isCreating ? "Creating..." : "Start New Season"}
          </button>

          {error && (
            <p className="mt-3 text-xs text-red-400">
              {error}
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 text-xs text-white/40">
          Only the club owner can start a new season.
        </p>
      )}
    </div>
  )
}