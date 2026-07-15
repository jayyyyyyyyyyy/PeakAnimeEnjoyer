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

  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreateSeason() {
    setError(null)
    setIsCreating(true)

    try {
      await createSeason(clubId)
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
          <button
            onClick={handleCreateSeason}
            disabled={isCreating}
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