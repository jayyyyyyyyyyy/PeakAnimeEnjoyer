"use client"

import {
  Award,
  BarChart3,
  Crown,
  Medal,
  Star,
  Trophy,
  User,
} from "lucide-react"
import type {
  ProfileBadge,
  ProfileStats,
  ReviewAverages,
} from "@/lib/types/club"
import { cn } from "@/lib/utils"

interface ProfileScreenProps {
  profileStats: ProfileStats
}

const categories: Array<{
  label: string
  value: keyof ReviewAverages
}> = [
  { label: "Overall", value: "overall" },
  { label: "Story", value: "story" },
  { label: "Visuals", value: "animation" },
  { label: "Characters", value: "characters" },
  { label: "Soundtrack", value: "soundtrack" },
  { label: "World", value: "worldBuilding" },
  { label: "Pacing", value: "pacing" },
  { label: "Emotion", value: "emotionalImpact" },
]

const badgeToneClasses: Record<ProfileBadge["tone"], string> = {
  gold: "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]",
  purple: "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C4B5FD]",
  green: "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#86EFAC]",
  blue: "border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#7DD3FC]",
}

function formatScore(score: number | null | undefined) {
  return typeof score === "number"
    ? score.toFixed(2)
    : "-"
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 text-[#F59E0B]">
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">
        {value}
      </p>
      <p className="text-xs text-white/50">
        {label}
      </p>
    </div>
  )
}

export function ProfileScreen({
  profileStats,
}: ProfileScreenProps) {
  const earnedBadges = profileStats.badges.filter(
    (badge) => badge.earned
  )

  return (
    <div className="pb-24 px-4 space-y-6">
      <header className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Profile
          </h1>
          <p className="text-sm text-white/50">
            Your club stats and badges
          </p>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1E293B]">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white">
            {profileStats.username}
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1.5">
            <Crown className="h-4 w-4 text-[#F59E0B]" />
            <span className="text-sm font-semibold text-[#F59E0B]">
              {profileStats.role}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Reviews"
          value={profileStats.reviewCount}
          icon={<BarChart3 className="h-6 w-6" />}
        />
        <StatCard
          label="Average Overall"
          value={formatScore(profileStats.averages?.overall)}
          icon={<Star className="h-6 w-6" />}
        />
        <StatCard
          label="Proposals"
          value={profileStats.proposalCount}
          icon={<Medal className="h-6 w-6" />}
        />
        <StatCard
          label="Winning Proposals"
          value={profileStats.winningProposalCount}
          icon={<Trophy className="h-6 w-6" />}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/50">
              Club Rank
            </p>
            <p className="mt-1 text-2xl font-black text-white">
              {profileStats.clubRank
                ? `#${profileStats.clubRank}`
                : "-"}
            </p>
          </div>
          <p className="text-sm text-white/50">
            Based on revealed review averages across {profileStats.memberCount} members.
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <BarChart3 className="h-5 w-5 text-[#F59E0B]" />
          Taste Statistics
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div
              key={category.value}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs text-white/50">
                {category.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {formatScore(
                  profileStats.averages?.[category.value]
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Award className="h-5 w-5 text-[#F59E0B]" />
            Badges
          </h3>
          <span className="text-sm text-white/50">
            {earnedBadges.length} / {profileStats.badges.length}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {profileStats.badges.map((badge) => (
            <div
              key={badge.name}
              className={cn(
                "rounded-2xl border p-4 transition",
                badge.earned
                  ? badgeToneClasses[badge.tone]
                  : "border-white/10 bg-white/5 text-white/40"
              )}
            >
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">
                    {badge.name}
                  </p>
                  <p className="mt-1 text-sm opacity-80">
                    {badge.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
