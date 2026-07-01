import { Sparkles } from "lucide-react"

interface HomeHeaderProps {
  club: {
    name: string
  }
  season: {
    title: string
    status: string
  } | null
  membership: {
    role: string
  }
}

export function HomeHeader({
  club,
  season,
  membership,
}: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between pt-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold gradient-text">
            {club.name}
          </h1>

          <p className="text-xs text-white/50">
            {season?.title ?? "Nessuna stagione"}
          </p>

          <p className="text-xs text-yellow-400">
            {membership.role}
          </p>
        </div>
      </div>

      <div className="px-3 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
        <span className="text-xs font-medium text-[#8B5CF6]">
          {season?.status ?? "NO SEASON"}
        </span>
      </div>
    </header>
  )
}