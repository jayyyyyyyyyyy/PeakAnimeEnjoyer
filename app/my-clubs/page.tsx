import Link from "next/link"
import { Plus, Users } from "lucide-react"

import { getUserClubs } from "@/app/actions/clubs"
import type { Club, ClubRole } from "@/lib/types/club"

import { Button } from "@/components/ui/button"
import { ClubCard } from "@/components/clubs/club-card"
import { PageBackground } from "@/components/shared/page-background"

type UserClub = Pick<
  Club,
  "id" | "name" | "slug" | "invite_code"
>

interface UserClubMembership {
  role: ClubRole
  clubs: UserClub | UserClub[]
}

function getMembershipClub(
  membership: UserClubMembership
): UserClub | null {
  return Array.isArray(membership.clubs)
    ? membership.clubs[0] ?? null
    : membership.clubs
}

export default async function MyClubsPage() {
  const memberships =
    (await getUserClubs()) as unknown as UserClubMembership[]

  return (
    <main className="relative min-h-screen bg-[#090B14] text-white">
      <PageBackground />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-12 sm:px-10">

        <h1 className="text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl">
          My Clubs
        </h1>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            asChild
            className="
              h-11
              rounded-full

              bg-gradient-to-r
              from-pink-500
              to-fuchsia-500

              px-6

              text-sm
              font-semibold
              text-white

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:shadow-[0_0_35px_rgba(236,72,153,.4)]
            "
          >
            <Link href="/create-club">
              <Plus className="mr-2 h-4 w-4" />
              Create Club
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="
              h-11
              rounded-full

              border-white/15

              bg-white/[0.04]

              px-6

              text-sm
              font-semibold
              text-zinc-200

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-pink-400/40
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            <Link href="/join-club">
              <Users className="mr-2 h-4 w-4" />
              Join Club
            </Link>
          </Button>
        </div>

        {memberships.length === 0 ? (
          <p className="mt-16 text-zinc-500">
            You haven&apos;t joined any club yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {memberships.map((membership) => {
              const club = getMembershipClub(membership)

              if (!club) return null

              return (
                <ClubCard
                  key={club.id}
                  name={club.name}
                  slug={club.slug}
                  role={membership.role}
                />
              )
            })}
          </div>
        )}

      </div>
    </main>
  )
}