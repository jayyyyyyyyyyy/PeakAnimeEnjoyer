import AnimeClubApp from "@/components/anime-club-app"
import { getClubContext } from "@/lib/data/club-context"
import { getUserClubs } from "@/app/actions/clubs"
import { notFound, redirect } from "next/navigation"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface SidebarClub {
  id: string
  name: string
  slug: string
}

export default async function ClubPage({
  params,
}: PageProps) {
  const { slug } = await params

  const context = await getClubContext(slug)

  if (!context) {
    redirect("/login")
  }

  if (!context.club) {
    notFound()
  }

  const rawMemberships = await getUserClubs()

  const userClubs: SidebarClub[] = rawMemberships
    .map((membership: any) => {
      const membershipClub = Array.isArray(membership.clubs)
        ? membership.clubs[0]
        : membership.clubs

      return membershipClub
        ? {
            id: membershipClub.id,
            name: membershipClub.name,
            slug: membershipClub.slug,
          }
        : null
    })
    .filter((entry): entry is SidebarClub => entry !== null)

  return (
    <AnimeClubApp
      club={context.club}
      membership={context.membership}
      season={context.season}
      members={context.members ?? []}
      proposal={context.proposal}
      challenge={context.challenge}
      interestVote={context.interestVote}
      memberCount={context.memberCount}
      proposalCount={context.proposalCount}
      progress={context.progress}
      clubProgress={context.clubProgress}
      reviewSummary={context.reviewSummary}
      hallOfFameRankings={context.hallOfFameRankings}
      profileStats={context.profileStats}
      appNotifications={context.appNotifications}
      userClubs={userClubs}
    />
  )
}