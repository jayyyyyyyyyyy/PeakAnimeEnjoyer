import AnimeClubApp from "@/components/anime-club-app"
import { getClubContext } from "@/lib/data/club-context"
import { notFound, redirect } from "next/navigation"

interface PageProps {
  params: Promise<{
    slug: string
  }>
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
    />
  )
}

