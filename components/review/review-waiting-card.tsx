"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

import { revealReviews } from "@/app/actions/reveal-reviews"
import type { ReviewSummary } from "@/lib/types/club"

interface ReviewWaitingCardProps {
  seasonId: string
  reviewSummary: ReviewSummary
  isOwner: boolean
}

export function ReviewWaitingCard({
  seasonId,
  reviewSummary,
  isOwner,
}: ReviewWaitingCardProps) {
  const router = useRouter()

  const [isRevealing, setIsRevealing] = useState(false)
  const [revealError, setRevealError] = useState<string | null>(null)

  async function handleReveal() {
    setRevealError(null)
    setIsRevealing(true)

    try {
      await revealReviews(seasonId)
      router.refresh()
    } catch (error) {
      setRevealError(
        error instanceof Error
          ? error.message
          : "Unable to reveal reviews."
      )
    } finally {
      setIsRevealing(false)
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
        <CheckCircle2 className="h-5 w-5" />
      </div>

      <h2 className="text-lg font-bold text-white">
        Review submitted
      </h2>

      <p className="mt-1 text-sm text-white/60">
        Your ratings are locked. Waiting for the rest of the club.
      </p>

      <p className="mt-4 text-2xl font-bold text-pink-400">
        {reviewSummary.submittedCount} / {reviewSummary.memberCount}
      </p>

      <p className="text-xs text-white/40">
        members submitted a review
      </p>

      {isOwner && (
        <>
          <button
            onClick={handleReveal}
            disabled={!reviewSummary.allSubmitted || isRevealing}
            className="
              mt-6
              w-full
              rounded-xl

              bg-gradient-to-r
              from-pink-500
              to-fuchsia-500

              p-3

              text-sm
              font-semibold
              text-white

              transition-all
              duration-300

              hover:scale-[1.01]

              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:scale-100
            "
          >
            {isRevealing
              ? "Revealing..."
              : "Reveal Reviews & Finish Season"}
          </button>

          {!reviewSummary.allSubmitted && (
            <p className="mt-2 text-xs text-white/40">
              Every member must submit their review first.
            </p>
          )}

          {revealError && (
            <p className="mt-2 text-xs text-red-400">
              {revealError}
            </p>
          )}
        </>
      )}
    </div>
  )
}