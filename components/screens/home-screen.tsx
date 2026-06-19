"use client"

import { Clock, Sparkles, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  startChallenge,
  startInterestVoting,
} from "@/app/actions/season-transition"
import { submitInterestVote } from "@/app/actions/interest-vote"
import type {
  AnimeProposal,
  Club,
  ClubMember,
  InterestVote,
  Membership,
  Season,
  SeasonChallenge,
} from "@/lib/types/club"

interface HomeScreenProps {
  club: Club
  membership: Membership
  season: Season | null
  members: ClubMember[]
  proposal: AnimeProposal | null
  challenge: SeasonChallenge | null
  interestVote: InterestVote | null
  memberCount: number
  proposalCount: number
  challengeWinner: any
}

export function HomeScreen({
  club,
  membership,
  season,
  members,
  proposal,
  challenge,
  interestVote,
  memberCount,
  proposalCount,
  challengeWinner,
}: HomeScreenProps) {
  const router = useRouter()
  const [startError, setStartError] = useState<string | null>(null)
  const [isStartingChallenge, setIsStartingChallenge] = useState(false)
  const [isStartingVoting, setIsStartingVoting] = useState(false)
  const [voteScore, setVoteScore] = useState(interestVote?.score ?? 7)
  const [voteError, setVoteError] = useState<string | null>(null)
  const [isSubmittingVote, setIsSubmittingVote] = useState(false)

  async function handleStartChallenge() {
    if (!season?.id) {
      setStartError("No active season found.")
      return
    }

    setStartError(null)
    setIsStartingChallenge(true)

    try {
      await startChallenge(season.id)
      router.refresh()
    } catch (error) {
      setStartError(
        error instanceof Error
          ? error.message
          : "Unable to start challenge."
      )
    } finally {
      setIsStartingChallenge(false)
    }
  }

  console.log("CHALLENGE:", challenge)
  console.log("STATUS:", season?.status)
  console.log("SELECTED:", season?.selected_anime_id)

  async function handleStartInterestVoting() {
    if (!season?.id) {
      setStartError("No active season found.")
      return
    }

    setStartError(null)
    setIsStartingVoting(true)

    try {
      await startInterestVoting(season.id)
      router.refresh()
    } catch (error) {
      setStartError(
        error instanceof Error
          ? error.message
          : "Unable to start interest voting."
      )
    } finally {
      setIsStartingVoting(false)
    }
  }

  async function handleSubmitInterestVote() {
    if (!season?.id) {
      setVoteError("No active season found.")
      return
    }

    setVoteError(null)
    setIsSubmittingVote(true)

    try {
      await submitInterestVote(season.id, voteScore)
      router.refresh()
    } catch (error) {
      setVoteError(
        error instanceof Error
          ? error.message
          : "Unable to submit interest vote."
      )
    } finally {
      setIsSubmittingVote(false)
    }
  }

  function renderSeasonStatusContent() {
    if (!season) {
      return (
        <div className="glass rounded-2xl p-4 border border-white/10">
          <p className="text-sm text-white/60">
            No active season yet.
          </p>
        </div>
      )
    }

    if (season.status === "CHALLENGE") {
      return (
        <div className="space-y-3">
          <div className="glass rounded-2xl p-4 border border-[#8B5CF6]/30">
            <p className="text-xs text-white/50 mb-2">
              Your Secret Challenge
            </p>

            {challenge ? (
              <>
                {season?.anime?.image_url && (
                  <div
                    className="h-40 rounded-2xl bg-cover bg-center mb-4 border border-white/10"
                    style={{
                      backgroundImage: `url('${season?.anime.image_url}')`,
                    }}
                  />
                )}

                <h2 className="text-lg font-bold text-white">
                  {season?.anime?.title}
                </h2>

                <p className="text-sm text-white/60">
                  Keep the proposer secret. Next step: everyone will rate their interest.
                </p>

                {season?.anime?.episodes && (
                  <p className="text-xs text-white/40 mt-2">
                    {season?.anime.episodes} episodes
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-white">
                  Challenges are being prepared
                </h2>

                <p className="text-sm text-white/60">
                  Refresh in a moment if your assignment does not appear yet.
                </p>
              </>
            )}
          </div>

          {membership.role === "OWNER" && (
            <button
              onClick={handleStartInterestVoting}
              disabled={isStartingVoting}
              className="w-full rounded-xl bg-purple-600 p-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isStartingVoting
                ? "Starting Interest Voting..."
                : "Start Interest Voting"}
            </button>
          )}

          {startError && (
            <p className="text-sm text-red-300">
              {startError}
            </p>
          )}
        </div>
      )
    }

    if (season.status === "INTEREST_VOTING") {
      return (
        <div className="space-y-3">
          <div className="glass rounded-2xl p-4 border border-[#F59E0B]/30">
            <p className="text-xs text-white/50 mb-2">
              Interest Vote
            </p>

            {challenge ? (
              <>
                {season?.anime?.image_url && (
                  <div
                    className="h-40 rounded-2xl bg-cover bg-center mb-4 border border-white/10"
                    style={{
                      backgroundImage: `url('${season?.anime.image_url}')`,
                    }}
                  />
                )}

                <h2 className="text-lg font-bold text-white">
                  {season?.anime?.title}
                </h2>

                {interestVote ? (
                  <p className="text-sm text-white/60">
                    Your current interest score is{" "}
                    <span className="font-bold text-[#F59E0B]">
                      {interestVote.score}/10
                    </span>
                    .
                  </p>
                ) : (
                  <p className="text-sm text-white/60">
                    Rate how much you want to watch this anime with the club.
                  </p>
                )}

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (score) => (
                      <button
                        key={score}
                        onClick={() => setVoteScore(score)}
                        className={cn(
                          "h-10 rounded-xl border text-sm font-bold transition-colors",
                          voteScore === score
                            ? "border-[#F59E0B] bg-[#F59E0B] text-[#0F172A]"
                            : "border-white/10 bg-white/5 text-white/70"
                        )}
                      >
                        {score}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={handleSubmitInterestVote}
                  disabled={isSubmittingVote}
                  className="mt-4 w-full rounded-xl bg-[#F59E0B] p-3 font-bold text-[#0F172A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingVote
                    ? "Saving Vote..."
                    : interestVote
                      ? "Update Vote"
                      : "Submit Vote"}
                </button>

                {voteError && (
                  <p className="mt-3 text-sm text-red-300">
                    {voteError}
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-white">
                  No challenge found
                </h2>

                <p className="text-sm text-white/60">
                  Ask the owner to check the season assignments.
                </p>
              </>
            )}
          </div>
        </div>
      )
    }

    if (season.status !== "PROPOSAL") {
      return null
    }

    return (
      <>
        {proposal && (
          <div className="glass rounded-2xl p-4 border border-[#8B5CF6]/30">
            <p className="text-xs text-white/50 mb-2">
              Your Proposal
            </p>

            <h2 className="text-lg font-bold text-white">
              {proposal.anime?.title}
            </h2>

            <p className="text-sm text-white/60">
              Waiting for the challenge phase.
            </p>
          </div>
        )}

        <div className="glass rounded-2xl p-4 border border-white/10">
          <p className="text-xs text-white/50 mb-2">
            Proposal Progress
          </p>

          <h2 className="text-lg font-bold text-white">
            {proposalCount} / {memberCount}
          </h2>

          <p className="text-sm text-white/60">
            Members submitted a proposal
          </p>
        </div>

        {membership.role === "OWNER" &&
          proposalCount === memberCount &&
          memberCount > 1 && (
            <button
              onClick={handleStartChallenge}
              disabled={isStartingChallenge}
              className="w-full rounded-xl bg-purple-600 p-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isStartingChallenge
                ? "Starting Challenge..."
                : "Start Challenge"}
            </button>
          )}

        {startError && (
          <p className="text-sm text-red-300">
            {startError}
          </p>
        )}
      </>
    )
  }

  return (
    <div className="pb-24 px-4 space-y-6">
      <header className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold gradient-text">
              {club.name}
            </h1>

            <p className="text-xs text-white/50">
              {season?.title ?? "Nessuna stagione"}
            </p>

            <p className="text-xs text-yellow-400">
              {membership.role}
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
          <span className="text-xs font-medium text-[#8B5CF6]">
            {season?.status ?? "NO SEASON"}
          </span>
        </div>
      </header>

      {season?.status === "REVEALED" && challenge && (
  <div className="glass rounded-2xl p-4 border border-yellow-500/30">
    <p className="text-xs text-white/50 mb-2">
      Challenge Winner
    </p>

    <h2 className="text-lg font-bold text-white">
      {challenge.winner?.username}
    </h2>

    <p className="text-sm text-yellow-400">
      {challenge.method}
    </p>
  </div>
)}

      {renderSeasonStatusContent()}

      {season?.anime && (
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
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70">
            Episodes
          </span>

          <span className="text-2xl font-bold text-[#F59E0B]">
            {season.anime.episodes ?? "?"}
          </span>
        </div>

        <p className="text-xs text-white/50">
          Total episodes
        </p>
      </div>
    </div>
  </div>
)}

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-white/70" />
          Club Members
        </h3>

        <div className="space-y-2">
          {(members ?? []).map((member) => (
            <div
              key={member.id}
              className="glass rounded-2xl p-4 border border-white/10 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center text-xl border border-white/10">
                {member.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">
                    {member.profiles?.username}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      0%
                    </span>

                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        member.status === "green" &&
                          "bg-[#22C55E]",
                        member.status === "yellow" &&
                          "bg-[#F59E0B]",
                        member.status === "red" &&
                          "bg-[#EF4444]"
                      )}
                    />
                  </div>
                </div>

                <div className="h-2 rounded-full bg-[#0F172A] overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      member.status === "green" &&
                        "bg-gradient-to-r from-[#22C55E] to-[#16A34A]",
                      member.status === "yellow" &&
                        "bg-gradient-to-r from-[#F59E0B] to-[#D97706]",
                      member.status === "red" &&
                        "bg-gradient-to-r from-[#EF4444] to-[#DC2626]"
                    )}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5 border border-[#F59E0B]/30 bg-gradient-to-r from-[#F59E0B]/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#F59E0B]" />
          </div>

          <div>
            <p className="text-sm text-white/60">
              Time Remaining
            </p>

            <p className="text-2xl font-bold text-[#F59E0B]">
              12 days
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
