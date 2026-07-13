import { Clock } from "lucide-react"

interface SeasonDeadlineCardProps {
  daysRemaining: number
}

export function SeasonDeadlineCard({
  daysRemaining,
}: SeasonDeadlineCardProps) {
  return (
    <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-transparent backdrop-blur-xl p-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-pink-500/15 flex items-center justify-center">
          <Clock className="w-6 h-6 text-pink-400" />
        </div>

        <div>
          <p className="text-sm text-white/60">
            Time Remaining
          </p>

          <p className="text-2xl font-bold text-pink-400">
            {daysRemaining} days
          </p>
        </div>
      </div>
    </div>
  )
}