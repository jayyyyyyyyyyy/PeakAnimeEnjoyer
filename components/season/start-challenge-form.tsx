"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dice6, Loader2 } from "lucide-react"

import { getSeasonProposals } from "@/app/actions/proposal"
import { setChallengeWinner } from "@/app/actions/season-transition"

interface SeasonProposal {
  user_id: string
  username: string
  anime_id: string
  anime_title: string
  anime_image_url: string | null
}

interface StartChallengeFormProps {
  seasonId: string
}

const RANDOM_CHALLENGES = [
  "Rock, Paper, Scissors",
  "Coin flip (heads or tails)",
  "Odd or even (pari o dispari)",
  "10 push-ups race",
  "Longest plank hold",
  "Speed trivia about the club's last season",
]

export function StartChallengeForm({
  seasonId,
}: StartChallengeFormProps) {
  const router = useRouter()

  const [proposals, setProposals] = useState<SeasonProposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [method, setMethod] = useState("")
  const [customMethod, setCustomMethod] = useState("")
  const [useCustom, setUseCustom] = useState(false)

  const [winnerId, setWinnerId] = useState("")
  const [notes, setNotes] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await getSeasonProposals(seasonId)
        if (!cancelled) setProposals(data)
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load proposals."
          )
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [seasonId])

  function rollRandomChallenge() {
    const random =
      RANDOM_CHALLENGES[
        Math.floor(Math.random() * RANDOM_CHALLENGES.length)
      ]
    setUseCustom(false)
    setMethod(random)
  }

  async function handleSubmit() {
    const finalMethod = useCustom ? customMethod.trim() : method

    if (!finalMethod) {
      setSubmitError("Choose or roll a challenge first.")
      return
    }

    if (!winnerId) {
      setSubmitError("Select the winner.")
      return
    }

    setSubmitError(null)
    setIsSubmitting(true)

    try {
      await setChallengeWinner(
        seasonId,
        winnerId,
        finalMethod,
        notes.trim() || undefined
      )
      router.refresh()
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to save the challenge result."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading proposals...
      </div>
    )
  }

  if (loadError) {
    return <p className="text-sm text-red-400">{loadError}</p>
  }

  return (
    <div className="space-y-5">

      <div>
        <p className="mb-2 text-xs text-white/50">Challenge method</p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={rollRandomChallenge}
            className="
              flex items-center gap-2
              rounded-xl
              border border-pink-500/20
              bg-pink-500/10
              px-4 py-2
              text-sm font-medium text-pink-300
              transition-all duration-300
              hover:bg-pink-500/15
            "
          >
            <Dice6 className="h-4 w-4" />
            Roll random challenge
          </button>

          <button
            type="button"
            onClick={() => setUseCustom(true)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
              useCustom
                ? "border-pink-500/40 bg-pink-500/10 text-pink-300"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
            }`}
          >
            Write my own
          </button>
        </div>

        {useCustom ? (
          <input
            type="text"
            value={customMethod}
            onChange={(e) => setCustomMethod(e.target.value)}
            placeholder="e.g. Run around the block"
            className="
              mt-3 w-full rounded-xl
              border border-white/10
              bg-[#090B14]
              px-4 py-3
              text-sm text-white
              placeholder:text-zinc-500
              focus:border-pink-500 focus:outline-none
            "
          />
        ) : (
          method && (
            <p className="mt-3 text-sm text-white">
              {method}
            </p>
          )
        )}
      </div>

      <div>
        <p className="mb-2 text-xs text-white/50">Winner</p>

        <div className="space-y-2">
          {proposals.map((proposal) => (
            <label
              key={proposal.user_id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                winnerId === proposal.user_id
                  ? "border-pink-500/40 bg-pink-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="winner"
                value={proposal.user_id}
                checked={winnerId === proposal.user_id}
                onChange={() => setWinnerId(proposal.user_id)}
                className="accent-pink-500"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {proposal.anime_title}
                </p>
                <p className="text-xs text-zinc-500">
                  proposed by {proposal.username}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-white/50">
          Notes (optional)
        </p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Any details about how the challenge went..."
          className="
            w-full rounded-xl
            border border-white/10
            bg-[#090B14]
            px-4 py-3
            text-sm text-white
            placeholder:text-zinc-500
            focus:border-pink-500 focus:outline-none
          "
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="
          w-full rounded-xl
          bg-gradient-to-r from-pink-500 to-fuchsia-500
          p-3
          text-sm font-semibold text-white
          transition-all duration-300
          hover:scale-[1.01]
          disabled:opacity-60
        "
      >
        {isSubmitting ? "Saving..." : "Confirm Winner"}
      </button>

      {submitError && (
        <p className="text-sm text-red-400">{submitError}</p>
      )}
    </div>
  )
}