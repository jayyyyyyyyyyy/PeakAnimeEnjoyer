import type { ClubRole } from "@/lib/types/club"
import { cn } from "@/lib/utils"

interface RoleBadgeProps {
  role: ClubRole
}

const STYLES: Record<string, string> = {
  OWNER: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  ADMIN: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  MEMBER: "bg-pink-500/15 text-pink-300 ring-pink-500/30",
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const key = String(role).toUpperCase()
  const style = STYLES[key] ?? "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
        style
      )}
    >
      {key}
    </span>
  )
}