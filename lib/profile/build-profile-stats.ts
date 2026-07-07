import type {
  ClubMember,
  ClubRole,
  FinalReview,
  ProfileBadge,
  ProfileStats,
  ReviewAverages,
} from "@/lib/types/club"

interface BuildProfileStatsInput {
  userId: string
  role: ClubRole
  members: ClubMember[]
  reviews: FinalReview[]
  proposalCount: number
  winningProposalCount: number
}

function calculateAverages(
  reviews: FinalReview[]
): ReviewAverages | null {
  if (reviews.length === 0) return null

  const totals = reviews.reduce(
    (acc, review) => ({
      overall: acc.overall + review.overall,
      story: acc.story + review.story,
      characters: acc.characters + review.characters,
      animation: acc.animation + review.animation,
      soundtrack: acc.soundtrack + review.soundtrack,
      worldBuilding:
        acc.worldBuilding + review.world_building,
      pacing: acc.pacing + review.pacing,
      emotionalImpact:
        acc.emotionalImpact + review.emotional_impact,
    }),
    {
      overall: 0,
      story: 0,
      characters: 0,
      animation: 0,
      soundtrack: 0,
      worldBuilding: 0,
      pacing: 0,
      emotionalImpact: 0,
    }
  )

  return {
    overall: totals.overall / reviews.length,
    story: totals.story / reviews.length,
    characters: totals.characters / reviews.length,
    animation: totals.animation / reviews.length,
    soundtrack: totals.soundtrack / reviews.length,
    worldBuilding: totals.worldBuilding / reviews.length,
    pacing: totals.pacing / reviews.length,
    emotionalImpact:
      totals.emotionalImpact / reviews.length,
  }
}

function buildBadges({
  reviewCount,
  proposalCount,
  winningProposalCount,
  averages,
}: {
  reviewCount: number
  proposalCount: number
  winningProposalCount: number
  averages: ReviewAverages | null
}): ProfileBadge[] {
  return [
    {
      name: "Reviewer",
      description: "Submitted at least one final review.",
      tone: "purple",
      earned: reviewCount > 0,
    },
    {
      name: "Club Voice",
      description: "Submitted five or more final reviews.",
      tone: "blue",
      earned: reviewCount >= 5,
    },
    {
      name: "Taste Maker",
      description: "Had at least one winning proposal.",
      tone: "gold",
      earned: winningProposalCount > 0,
    },
    {
      name: "Scout",
      description: "Submitted five or more proposals.",
      tone: "green",
      earned: proposalCount >= 5,
    },
    {
      name: "High Standards",
      description: "Average overall score is 8.5 or higher.",
      tone: "gold",
      earned: (averages?.overall ?? 0) >= 8.5,
    },
  ]
}

function getClubRank(
  userId: string,
  members: ClubMember[],
  reviews: FinalReview[]
) {
  const rankedMembers = members
    .map((member) => {
      const memberReviews = reviews.filter(
        (review) => review.user_id === member.user_id
      )
      const averages = calculateAverages(memberReviews)

      return {
        userId: member.user_id,
        reviewCount: memberReviews.length,
        score: averages?.overall ?? 0,
      }
    })
    .filter((member) => member.reviewCount > 0)
    .sort((a, b) => {
      const scoreDiff = b.score - a.score
      if (scoreDiff !== 0) return scoreDiff
      return b.reviewCount - a.reviewCount
    })

  const rank = rankedMembers.findIndex(
    (member) => member.userId === userId
  )

  return rank === -1 ? null : rank + 1
}

export function buildProfileStats({
  userId,
  role,
  members,
  reviews,
  proposalCount,
  winningProposalCount,
}: BuildProfileStatsInput): ProfileStats {
  const member = members.find(
    (clubMember) => clubMember.user_id === userId
  )
  const userReviews = reviews.filter(
    (review) => review.user_id === userId
  )
  const averages = calculateAverages(userReviews)

  return {
    userId,
    username:
      member?.profiles?.username ?? "Unknown member",
    role,
    reviewCount: userReviews.length,
    proposalCount,
    winningProposalCount,
    clubRank: getClubRank(userId, members, reviews),
    memberCount: members.length,
    averages,
    badges: buildBadges({
      reviewCount: userReviews.length,
      proposalCount,
      winningProposalCount,
      averages,
    }),
  }
}
