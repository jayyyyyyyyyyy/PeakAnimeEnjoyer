import { Clock } from "lucide-react"

interface SeasonDeadlineCardProps {
  daysRemaining: number
}

export function SeasonDeadlineCard({
  daysRemaining,
}: SeasonDeadlineCardProps) {
  return (
    <div className="glass rounded-2xl p-5 border border-[#F59E0B]/30 bg-gradient-to-r from-[#F59E0B]/10 to-transparent">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
          <Clock className="w-6 h-6 text-[#F59E0B]" />
        </div>

        <div>
          <p className="text-sm text-white/60">
            Time Remaining
          </p>

          <p className="text-2xl font-bold text-[#F59E0B]">
            {daysRemaining} days
          </p>
        </div>
      </div>
    </div>
  )
}