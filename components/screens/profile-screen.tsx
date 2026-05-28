"use client"

import { Settings, ChevronRight } from "lucide-react"

const stats = [
  { label: "Proposed Anime", value: "12", icon: "📺" },
  { label: "Winning Anime", value: "3", icon: "🏆" },
  { label: "Seasons Played", value: "8", icon: "🎮" },
  { label: "Average Score", value: "8.2", icon: "⭐" },
]

const badges = [
  { name: "Seinen Master", icon: "⚔️", description: "Watched 10+ seinen anime", color: "from-[#8B5CF6] to-[#6366F1]" },
  { name: "Shonen King", icon: "🔥", description: "5 winning shonen proposals", color: "from-[#EF4444] to-[#F97316]" },
  { name: "Isekai Lord", icon: "🌌", description: "Survived 10 isekai shows", color: "from-[#22C55E] to-[#14B8A6]" },
  { name: "Early Bird", icon: "🐦", description: "Always on time", color: "from-[#F59E0B] to-[#FCD34D]" },
]

export function ProfileScreen() {
  return (
    <div className="pb-24 px-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <button className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-white/70" />
        </button>
      </header>

      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/30 to-[#F59E0B]/30" />
        <div className="absolute inset-[1px] rounded-3xl bg-[#1E293B]" />
        <div className="relative p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] p-1">
              <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center text-4xl">
                🧑‍💻
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-sm border-4 border-[#1E293B]">
              ✓
            </div>
          </div>

          {/* Name & Title */}
          <h2 className="text-2xl font-bold text-white mb-1">Marco</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#8B5CF6]/20 border border-[#F59E0B]/30 mb-2">
            <span className="text-sm">👑</span>
            <span className="text-sm font-semibold gradient-text">Grand Master</span>
          </div>
          <p className="text-sm text-white/50">Member since Season #1</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl p-4 border border-white/10"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>🎖️</span> Achievements
          </h3>
          <button className="text-sm text-[#8B5CF6] flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="glass rounded-2xl p-4 border border-white/10 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${badge.color}`} />
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="font-semibold text-white text-sm">{badge.name}</p>
              <p className="text-xs text-white/50">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Section */}
      <div className="glass rounded-2xl p-5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📈</span> Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <p className="text-sm text-white/70">Completed Frieren (28/28)</p>
            <span className="text-xs text-white/40 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <p className="text-sm text-white/70">Voted on next season</p>
            <span className="text-xs text-white/40 ml-auto">1d ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <p className="text-sm text-white/70">Earned &quot;Seinen Master&quot; badge</p>
            <span className="text-xs text-white/40 ml-auto">3d ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
