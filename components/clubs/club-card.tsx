import Link from "next/link"
import { Sparkles } from "lucide-react"

import type { ClubRole } from "@/lib/types/club"

import { RoleBadge } from "./role-badge"

interface ClubCardProps {
  name: string
  slug: string
  role: ClubRole
}

export function ClubCard({ name, slug, role }: ClubCardProps) {
  return (
    <Link
      href={`/club/${slug}`}
      className="
        group
        block

        overflow-hidden

        rounded-[28px]

        border
        border-white/10

        bg-white/[0.04]

        backdrop-blur-xl

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-pink-500/25
        hover:bg-white/[0.06]
      "
    >
      {/* Cover placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-900 to-black" />

        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-fuchsia-600/15 blur-3xl" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles
            className="
              h-8
              w-8

              text-white/20

              transition-transform
              duration-300

              group-hover:scale-110
            "
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h2 className="truncate text-lg font-semibold text-white">
          {name}
        </h2>

        <div className="mt-2">
          <RoleBadge role={role} />
        </div>
      </div>
    </Link>
  )
}