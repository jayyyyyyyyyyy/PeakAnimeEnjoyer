"use client"

import Link from "next/link"
import { Home, Tv, Trophy, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoutButton } from "@/components/auth/logout-button"

interface SidebarClub {
  id: string
  name: string
  slug: string
}

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  currentClubSlug: string
  userClubs: SidebarClub[]
  className?: string
}

const NAV_TABS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "season", icon: Tv, label: "Season" },
  { id: "hall", icon: Trophy, label: "Hall of Fame" },
  { id: "profile", icon: User, label: "Profile" },
]

function clubInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("")
}

export function Sidebar({
  activeTab,
  onTabChange,
  currentClubSlug,
  userClubs,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-pink-500/10 bg-[#090B14]/60 backdrop-blur-2xl",
        className
      )}
    >
      <div className="flex h-full flex-col">

        {/* Club switcher */}
        <div className="flex flex-col items-center gap-3 border-b border-white/5 px-4 py-5">
          <div className="flex max-h-[260px] w-full flex-col items-center gap-2 overflow-y-auto">
            {userClubs.map((club) => {
              const isCurrent = club.slug === currentClubSlug

              return (
                <Link
                  key={club.id}
                  href={`/club/${club.slug}`}
                  title={club.name}
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white transition-all duration-300",
                    isCurrent
                      ? "bg-gradient-to-br from-pink-500 to-fuchsia-500 ring-2 ring-pink-400/50 ring-offset-2 ring-offset-[#090B14]"
                      : "bg-white/[0.06] hover:rounded-xl hover:bg-white/[0.1]"
                  )}
                >
                  {clubInitials(club.name)}
                </Link>
              )
            })}
          </div>

          <Link
            href="/my-clubs"
            title="All clubs"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              border
              border-dashed
              border-white/15

              text-zinc-400

              transition-all
              duration-300

              hover:rounded-xl
              hover:border-pink-400/40
              hover:text-pink-300
            "
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-pink-500/10 text-pink-300 ring-1 ring-pink-500/20"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/5 px-4 py-4">
          <LogoutButton className="w-full" />
        </div>

        <div className="border-t border-white/5 px-4 py-4">
          <p className="text-center text-xs text-zinc-600">
            PeakAnimeEnjoyer
          </p>
        </div>

      </div>
    </aside>
  )
}