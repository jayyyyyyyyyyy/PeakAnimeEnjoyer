"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { startSeason } from "@/app/actions/season-transition"
import {
  startChallenge,
  startInterestVoting,
} from "@/app/actions/season-transition"
import { submitInterestVote } from "@/app/actions/interest-vote"
import { updateEpisodeProgress } from "@/app/actions/progress"
import { finishSeason } from "@/app/actions/finish-season"
import { submitReview } from "@/app/actions/submit-review"
import { revealReviews } from "@/app/actions/reveal-reviews"
import type {
  AnimeProposal,
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
import { AnimeCard } from "@/components/season/anime-card"
import { ClubCompletionCard } from "@/components/season/club-completion-card"
import { ClubProgressCard } from "@/components/season/club-progress-card"
import { SeasonDeadlineCard } from "@/components/season/season-deadline-card"
import { HomeHeader } from "@/components/layout/home-header"
import { SeasonStatusCard } from "@/components/season/season-status-card"
import { ReviewScreen } from "@/components/review/review-screen"
import { ReviewWaitingScreen } from "@/components/review/review-waiting-screen"
import { RevealScreen } from "@/components/review/reveal-screen"

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
}

export function HomeScreen({
  club,
  membership,
  season,
  proposal,
  challenge,
  interestVote,
  memberCount,
  proposalCount,
  progress,
  clubProgress,
  reviewSummary,
}: HomeScreenProps) {
  const router = useRouter()
  const [startError, setStartError] =
    useState<string | null>(null)
  const [isStartingChallenge, setIsStartingChallenge] =
    useState(false)
  const [isStartingVoting, setIsStartingVoting] =
    useState(false)
  const [voteScore, setVoteScore] = useState(
    interestVote?.score ?? 7
  )
  const [voteError, setVoteError] =
    useState<string | null>(null)
  const [isSubmittingVote, setIsSubmittingVote] =
    useState(false)
  const [episodesWatched, setEpisodesWatched] =
    useState(progress?.episodes_watched ?? 0)

  const [story, setStory] = useState(7)
  const [characters, setCharacters] = useState(7)
  const [animation, setAnimation] = useState(7)
  const [soundtrack, setSoundtrack] = useState(7)
  const [worldBuilding, setWorldBuilding] = useState(7)
  const [pacing, setPacing] = useState(7)
  const [emotionalImpact, setEmotionalImpact] = useState(7)
  const [review, setReview] = useState("")
  const [reviewError, setReviewError] =
    useState<string | null>(null)
  const [isSubmittingReview, setIsSubmittingReview] =
    useState(false)
  const [isRevealing, setIsRevealing] = useState(false)

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
    if (!season?.id) return

    try {
      await startSeason(season.id)
      router.refresh()
    } catch (error) {
      setStartError(
        error instanceof Error
          ? error.message
          : "Failed to start season"
      )
    }
  }

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

  async function handleSaveProgress() {
    if (!season?.id) return

    try {
      await updateEpisodeProgress(
        season.id,
        episodesWatched
      )
      router.refresh()
    } catch (error) {
      setStartError(
        error instanceof Error
          ? error.message
          : "Failed to save progress"
      )
    }
  }

  async function handleFinishSeason() {
    if (!season?.id) return

    try {
      await finishSeason(season.id)
      router.refresh()
    } catch (error) {
      setStartError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      )
    }
  }

  async function handleSubmitReview() {
    if (!season?.id) return

    setReviewError(null)
    setIsSubmittingReview(true)

    try {
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
      setReviewError(
        error instanceof Error
          ? error.message
          : "Unable to submit review."
      )
    } finally {
      setIsSubmittingReview(false)
    }
  }

  async function handleRevealReviews() {
    if (!season?.id) return

    setReviewError(null)
    setIsRevealing(true)

    try {
      await revealReviews(season.id)
      router.refresh()
    } catch (error) {
      setReviewError(
        error instanceof Error
          ? error.message
          : "Unable to reveal reviews."
      )
    } finally {
      setIsRevealing(false)
    }
  }

  const seasonGoal = season?.minimum_episodes ?? 0
  const totalWatched = clubProgress.reduce(
    (sum, member) => sum + member.episodes_watched,
    0
  )
  const totalGoal = clubProgress.length * seasonGoal
  const completionPercentage =
    totalGoal === 0
      ? 0
      : Math.round((totalWatched / totalGoal) * 100)

  const everyoneFinished =
    seasonGoal > 0 &&
    clubProgress.length > 0 &&
    clubProgress.every(
      (member) =>
        member.episodes_watched >= seasonGoal
    )

  const daysRemaining = 12
  const isOwner = membership.role === "OWNER"
  const hasSubmittedReview =
    reviewSummary.currentUserReview !== null

  return (
    <div className="pb-24 px-4 space-y-6">
      <HomeHeader
        club={club}
        season={season}
        membership={membership}
      />

      {season?.status === "REVEALED" && challenge && (
        <div className="glass rounded-2xl p-4 border border-yellow-500/30">
          <p className="text-xs text-white/50 mb-2">
            Challenge Winner
          </p>

          <h2 className="text-lg font-bold text-white">
            {challenge.winner?.username ?? "Selected"}
          </h2>

          <p className="text-sm text-yellow-400">
            {challenge.method ?? "Winner revealed"}
          </p>

          {isOwner && (
            <button
              onClick={handleStartSeason}
              className="mt-4 w-full rounded-xl bg-green-600 p-3 font-bold text-white"
            >
              Start Season
            </button>
          )}
        </div>
      )}

      <SeasonStatusCard
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
        isStartingVoting={isStartingVoting}
        isSubmittingVote={isSubmittingVote}
        startError={startError}
        voteError={voteError}
        handleStartChallenge={handleStartChallenge}
        handleStartInterestVoting={handleStartInterestVoting}
        handleSubmitInterestVote={handleSubmitInterestVote}
      />

      {season?.anime && season.status !== "FINISHED" && (
        <AnimeCard
          season={season}
          episodesWatched={episodesWatched}
          setEpisodesWatched={setEpisodesWatched}
          handleSaveProgress={handleSaveProgress}
        />
      )}

      {season?.status === "ACTIVE" && (
        <>
          <ClubCompletionCard
            totalWatched={totalWatched}
            totalGoal={totalGoal}
            completionPercentage={completionPercentage}
            memberCount={clubProgress.length}
            everyoneFinished={everyoneFinished}
            isOwner={isOwner}
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
        </>
      )}

      {season?.status === "REVIEW" &&
        !hasSubmittedReview && (
          <>
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

            {reviewError && (
              <p className="text-sm text-red-300">
                {reviewError}
              </p>
            )}
          </>
        )}

      {season?.status === "REVIEW" &&
        hasSubmittedReview && (
          <ReviewWaitingScreen
            submittedCount={reviewSummary.submittedCount}
            memberCount={reviewSummary.memberCount}
            hasSubmitted={hasSubmittedReview}
            isOwner={isOwner}
            canReveal={reviewSummary.allSubmitted}
            isRevealing={isRevealing}
            error={reviewError}
            onReveal={handleRevealReviews}
          />
        )}

      {season?.status === "FINISHED" &&
        reviewSummary.revealed && (
          <RevealScreen
            season={season}
            reviewSummary={reviewSummary}
          />
        )}
    </div>
  )
}

