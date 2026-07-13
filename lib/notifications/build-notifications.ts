import type {
  AppNotification,
  Membership,
  ReviewSummary,
  Season,
} from "@/lib/types/club"

interface BuildNotificationsInput {
  season: Season | null
  membership: Membership
  reviewSummary: ReviewSummary
}

export function buildNotifications({
  season,
  membership,
  reviewSummary,
}: BuildNotificationsInput): AppNotification[] {
  if (!season) return []

  const notifications: AppNotification[] = []
  const animeTitle =
    season.anime?.title ?? season.title

  if (season.status === "ACTIVE") {
    notifications.push({
      id: `season-started-${season.id}`,
      type: "SEASON_STARTED",
      title: "Season Started",
      body: `${animeTitle} is now active. Track your progress with the club.`,
      actionLabel: "Update Progress",
      priority: "info",
    })
  }

  if (
    season.status === "REVIEW" &&
    !reviewSummary.currentUserReview
  ) {
    notifications.push({
      id: `review-available-${season.id}`,
      type: "REVIEW_AVAILABLE",
      title: "Review Available",
      body: `Final reviews are open for ${animeTitle}. Submit yours to lock it in.`,
      actionLabel: "Write Review",
      priority: "warning",
    })
  }

  if (
    season.status === "REVIEW" &&
    membership.role === "OWNER" &&
    reviewSummary.allSubmitted
  ) {
    notifications.push({
      id: `reveal-ready-${season.id}`,
      type: "REVEAL_READY",
      title: "Reveal Ready",
      body: "Every member submitted a review. You can reveal the final results.",
      actionLabel: "Reveal Reviews",
      priority: "success",
    })
  }

  return notifications
}
