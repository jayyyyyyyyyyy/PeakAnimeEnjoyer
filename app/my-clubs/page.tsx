import Link from "next/link"
import { getUserClubs } from "@/app/actions/clubs"
import type { Club, ClubRole } from "@/lib/types/club"

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
    <main className="min-h-screen bg-[#0F172A] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Clubs
      </h1>

      <div className="flex gap-3 mb-8">
        <Link
          href="/create-club"
          className="rounded-xl bg-purple-600 px-4 py-2"
        >
          Create Club
        </Link>

        <Link
          href="/join-club"
          className="rounded-xl bg-slate-700 px-4 py-2"
        >
          Join Club
        </Link>
      </div>

      <div className="space-y-4">
        {memberships.map((membership) => {
          const club = getMembershipClub(membership)

          if (!club) return null

          return (
            <Link
              key={club.id}
              href={`/club/${club.slug}`}
              className="block rounded-2xl border border-white/10 p-4 bg-slate-800"
            >
              <h2 className="text-xl font-semibold">
                {club.name}
              </h2>

              <p className="text-sm text-white/60">
                {membership.role}
              </p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
