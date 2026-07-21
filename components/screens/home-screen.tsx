"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { startSeason } from "@/app/actions/season-transition"
import {
  startChallenge,
  finishInterestVoting,
} from "@/app/actions/season-transition"
import { submitInterestVote } from "@/app/actions/interest-vote"
import type {
  AnimeProposal,
  AppNotification,
  Club,
  ClubMember,
  ClubProgressMember,
  EpisodeProgress,
  InterestVote,
  Membership,
  ReviewSummary,
  Season,
  SeasonChallenge,
} from "@/lib/types/club"
import { updateEpisodeProgress } from "@/app/actions/progress"
import { AnimeCard } from "@/components/season/anime-card"
import { finishSeason } from "@/app/actions/finish-season"
import { ClubCompletionCard } from "@/components/season/club-completion-card"
import { ClubProgressCard } from "@/components/season/club-progress-card"
import { SeasonDeadlineCard } from "@/components/season/season-deadline-card"
import { HomeHeader } from "@/components/layout/home-header"
import { SeasonStatusCard } from "@/components/season/season-status-card"
import { ReviewScreen } from "@/components/review/review-screen"
import { submitReview } from "@/app/actions/submit-review"

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
  progress: EpisodeProgress | null
  clubProgress: ClubProgressMember[]
  reviewSummary: ReviewSummary
  appNotifications: AppNotification[]
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
  progress,
  clubProgress,
  reviewSummary,
  appNotifications,
}: HomeScreenProps) {
  const router = useRouter()
  const [startError, setStartError] = useState<string | null>(null)
  const [isStartingChallenge, setIsStartingChallenge] = useState(false)
  const [voteScore, setVoteScore] = useState(interestVote?.score ?? 7)
  const [voteError, setVoteError] = useState<string | null>(null)
  const [isSubmittingVote, setIsSubmittingVote] = useState(false)

const [episodesWatched, setEpisodesWatched] =
  useState(progress?.episodes_watched ?? 0)

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
  async function handleStartSeason() {
  try {
    await startSeason(season!.id)

    window.location.reload()
  } catch (error) {
    console.error(error)

    alert(
      error instanceof Error
        ? error.message
        : "Failed to start season"
    )
  }
}

const [story, setStory] = useState(5)
const [characters, setCharacters] = useState(5)
const [animation, setAnimation] = useState(5)
const [soundtrack, setSoundtrack] = useState(5)
const [worldBuilding, setWorldBuilding] = useState(5)
const [pacing, setPacing] = useState(5)
const [emotionalImpact, setEmotionalImpact] = useState(5)

const [review, setReview] = useState("")
const [isSubmittingReview, setIsSubmittingReview] =
  useState(false)

const [isFinishingVoting, setIsFinishingVoting] = useState(false)
const [finishVotingError, setFinishVotingError] = useState<string | null>(null)

async function handleFinishInterestVoting() {
  if (!season?.id) {
    setFinishVotingError("No active season found.")
    return
  }

  setFinishVotingError(null)
  setIsFinishingVoting(true)

  try {
    await finishInterestVoting(season.id)
    router.refresh()
  } catch (error) {
    setFinishVotingError(
      error instanceof Error
        ? error.message
        : "Unable to finish interest voting."
    )
  } finally {
    setIsFinishingVoting(false)
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

  async function handleSaveProgress() {
  try {
    await updateEpisodeProgress(
      season!.id,
      episodesWatched
    )

    alert("Progress saved!")
  } catch (error) {
    console.error(error)

    alert(
      error instanceof Error
        ? error.message
        : "Failed to save progress"
    )
  }
}

async function handleFinishSeason() {
  if (!season) return

  try {
    await finishSeason(season.id)

    window.location.reload()
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Unknown error"
    )
  }
}

async function handleSubmitReview() {
  if (!season) return

  try {
    setIsSubmittingReview(true)

    await submitReview({
      seasonId: season.id,

      story,
      characters,
      animation,
      soundtrack,
      worldBuilding,
      pacing,
      emotionalImpact,

      review,
    })

    router.refresh()

  } catch (error) {

    alert(
      error instanceof Error
        ? error.message
        : "Unable to submit review."
    )

  } finally {

    setIsSubmittingReview(false)

  }
}

const totalWatched = clubProgress.reduce(
  (sum: number, member: any) =>
    sum + member.episodes_watched,
  0
)

const totalGoal = season
  ? clubProgress.length * season.minimum_episodes
  : 0

const completionPercentage =
  totalGoal === 0
    ? 0
    : Math.round(
        (totalWatched / totalGoal) * 100
      )

const everyoneFinished =
  season !== null &&
  clubProgress.every(
    (member: any) =>
      member.episodes_watched >= season.minimum_episodes
  )

// TODO: calculate from season.deadline
const daysRemaining = 12

  return (
    <div className="space-y-6 px-4 pb-24 lg:px-0 lg:pb-10">
      <HomeHeader
          club={club}
          season={season}
          membership={membership}
      />

      {season?.status === "REVIEW" && (
        <ReviewScreen
          season={season}
          story={story}
          setStory={setStory}
          characters={characters}
          setCharacters={setCharacters}
          animation={animation}
          setAnimation={setAnimation}
          soundtrack={soundtrack}
          setSoundtrack={setSoundtrack}
          worldBuilding={worldBuilding}
          setWorldBuilding={setWorldBuilding}
          pacing={pacing}
          setPacing={setPacing}
          emotionalImpact={emotionalImpact}
          setEmotionalImpact={setEmotionalImpact}
          review={review}
          setReview={setReview}
          onSubmit={handleSubmitReview}
          isSubmitting={isSubmittingReview}
        />
      )}
      

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

          {membership.role === "OWNER" && (
            <button
              onClick={handleStartSeason}
              className="mt-4 w-full rounded-xl bg-green-600 p-3 font-bold text-white"
            >
              Start Season
            </button>
          )}
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-6 lg:items-start">

        <div className="space-y-6">
          <SeasonStatusCard
            clubId={club.id}
            season={season}
            membership={membership}
            proposal={proposal}
            proposalCount={proposalCount}
            memberCount={memberCount}
            challenge={challenge}
            interestVote={interestVote}
            voteScore={voteScore}
            setVoteScore={setVoteScore}
            isStartingChallenge={isStartingChallenge}
            isSubmittingVote={isSubmittingVote}
            isFinishingVoting={isFinishingVoting}
            startError={startError}
            voteError={voteError}
            finishVotingError={finishVotingError}
            handleStartChallenge={handleStartChallenge}
            handleSubmitInterestVote={handleSubmitInterestVote}
            handleFinishInterestVoting={handleFinishInterestVoting}
          />

          {season?.anime && (
            <AnimeCard
              season={season}
              episodesWatched={episodesWatched}
              setEpisodesWatched={setEpisodesWatched}
              handleSaveProgress={handleSaveProgress}
            />
          )}
        </div>

        {season?.status === "ACTIVE" && (
          <div className="mt-6 space-y-6 lg:mt-0">
            <ClubCompletionCard
              totalWatched={totalWatched}
              totalGoal={totalGoal}
              completionPercentage={completionPercentage}
              memberCount={clubProgress.length}
              everyoneFinished={everyoneFinished}
              isOwner={membership.role === "OWNER"}
              onFinishSeason={handleFinishSeason}
            />

            <ClubProgressCard
              members={clubProgress}
              seasonGoal={season.minimum_episodes}
              currentUserId={membership.user_id}
            />

            <SeasonDeadlineCard
              daysRemaining={daysRemaining}
            />
          </div>
        )}

 </div>

    </div>
  )
}
