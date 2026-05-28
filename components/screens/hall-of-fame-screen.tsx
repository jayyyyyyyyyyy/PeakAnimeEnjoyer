"use client"

import { Trophy, TrendingDown, Crown, Skull } from "lucide-react"
import { cn } from "@/lib/utils"

const rankings = [
  { rank: 1, title: "Frieren", score: 9.4, emoji: "🥇" },
  { rank: 2, title: "Death Note", score: 9.1, emoji: "🥈" },
  { rank: 3, title: "Mob Psycho 100", score: 8.8, emoji: "🥉" },
  { rank: 4, title: "Spy x Family", score: 8.5, emoji: "4️⃣" },
  { rank: 5, title: "Jujutsu Kaisen", score: 8.3, emoji: "5️⃣" },
]

const hallOfShame = [
  { title: "Boku no Pico", votes: 4, user: "Fabio", emoji: "💀" },
  { title: "Mars of Destruction", votes: 3, user: "Luca", emoji: "🤮" },
]

export function HallOfFameScreen() {
  return (
    <div className="pb-24 px-4 space-y-6">
      {/* Header */}
      <header className="pt-4 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Trophy className="w-8 h-8 text-[#F59E0B]" />
          <h1 className="text-2xl font-bold gradient-text">Hall of Fame</h1>
          <Trophy className="w-8 h-8 text-[#F59E0B]" />
        </div>
        <p className="text-sm text-white/50">The greatest anime our club has watched</p>
      </header>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-2 pt-4">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-2">🥈</div>
          <div className="w-20 h-24 rounded-t-2xl bg-gradient-to-t from-[#94A3B8] to-[#CBD5E1] flex flex-col items-center justify-end pb-3">
            <span className="text-xs font-bold text-[#0F172A] text-center px-1">Death Note</span>
            <span className="text-sm font-black text-[#0F172A]">9.1</span>
          </div>
        </div>
        
        {/* First Place */}
        <div className="flex flex-col items-center -mt-4">
          <div className="relative">
            <Crown className="w-8 h-8 text-[#F59E0B] animate-float" />
          </div>
          <div className="text-4xl mb-2">🥇</div>
          <div className="w-24 h-32 rounded-t-2xl bg-gradient-to-t from-[#F59E0B] to-[#FCD34D] flex flex-col items-center justify-end pb-3 shadow-lg shadow-[#F59E0B]/30">
            <span className="text-sm font-bold text-[#0F172A] text-center px-1">Frieren</span>
            <span className="text-lg font-black text-[#0F172A]">9.4</span>
          </div>
        </div>
        
        {/* Third Place */}
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-2">🥉</div>
          <div className="w-20 h-20 rounded-t-2xl bg-gradient-to-t from-[#CD7F32] to-[#DDA15E] flex flex-col items-center justify-end pb-3">
            <span className="text-xs font-bold text-[#0F172A] text-center px-1">Mob Psycho</span>
            <span className="text-sm font-black text-[#0F172A]">8.8</span>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>📊</span> Full Rankings
        </h3>
        {rankings.map((item) => (
          <div
            key={item.rank}
            className={cn(
              "glass rounded-2xl p-4 border border-white/10 flex items-center gap-4 transition-all",
              item.rank === 1 && "border-[#F59E0B]/30 bg-[#F59E0B]/5",
              item.rank === 2 && "border-[#94A3B8]/30",
              item.rank === 3 && "border-[#CD7F32]/30"
            )}
          >
            <div className="text-2xl">{item.emoji}</div>
            <div className="flex-1">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/50">Season {item.rank}</p>
            </div>
            <div className={cn(
              "px-3 py-1.5 rounded-xl font-bold",
              item.rank === 1 && "bg-[#F59E0B]/20 text-[#F59E0B]",
              item.rank === 2 && "bg-[#94A3B8]/20 text-[#94A3B8]",
              item.rank === 3 && "bg-[#CD7F32]/20 text-[#CD7F32]",
              item.rank > 3 && "bg-[#8B5CF6]/20 text-[#8B5CF6]"
            )}>
              {item.score}
            </div>
          </div>
        ))}
      </div>

      {/* MVP Card */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#F59E0B] to-[#8B5CF6] animate-shimmer" />
        <div className="absolute inset-[2px] rounded-3xl bg-[#1E293B]" />
        <div className="relative p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <p className="text-sm text-white/60">MVP of the Club</p>
            <p className="text-xl font-bold text-white">Marco</p>
            <p className="text-xs text-[#F59E0B]">3 winning proposals • Perfect attendance</p>
          </div>
        </div>
      </div>

      {/* Hall of Shame */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Skull className="w-5 h-5 text-[#EF4444]" />
          <span>Hall of Shame</span>
          <span className="text-xl">😈</span>
        </h3>
        <p className="text-xs text-white/50">The proposals we&apos;d rather forget...</p>
        
        {hallOfShame.map((item, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-4 border border-[#EF4444]/20 bg-[#EF4444]/5 flex items-center gap-4"
          >
            <div className="text-2xl">{item.emoji}</div>
            <div className="flex-1">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/50">Proposed by {item.user}</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#EF4444]/20">
              <TrendingDown className="w-4 h-4 text-[#EF4444]" />
              <span className="text-sm font-bold text-[#EF4444]">{item.votes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
