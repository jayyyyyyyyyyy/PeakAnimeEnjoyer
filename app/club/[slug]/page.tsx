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
console.log("CONTEXT MEMBERS:", context.members)
return (
<AnimeClubApp
  club={context.club}
  membership={context.membership}
  season={context.season}
  members={context.members ?? []}
/>
)
}