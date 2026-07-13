"use client"

import { Dice6, Calendar, Star, User, Play } from "lucide-react"

export function SeasonScreen() {
  return (
    <div className="pb-24 px-4 space-y-6">
      <header className="pt-4">
        <h1 className="text-2xl font-bold text-white">Season Details</h1>
        <p className="text-sm text-white/50">Current Season Info</p>
      </header>

      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="h-56 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B14] via-[#090B14]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs rounded-full bg-pink-500/20 text-pink-300 backdrop-blur-sm">
              Fantasy
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-fuchsia-500/20 text-fuchsia-300 backdrop-blur-sm">
              Adventure
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
              Drama
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white">Frieren</h2>
          <p className="text-sm text-white/70">Beyond Journey&apos;s End</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-white/50">Total Episodes</span>
          </div>
          <p className="text-2xl font-bold text-white">28</p>
        </div>
        <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs text-white/50">Hype Score</span>
          </div>
          <p className="text-2xl font-bold text-fuchsia-400">8.7</p>
        </div>
        <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-white/50">Proposer</span>
          </div>
          <p className="text-lg font-bold text-white">Marco</p>
        </div>
        <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs text-white/50">Extraction Date</span>
          </div>
          <p className="text-lg font-bold text-white">Jan 15</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 opacity-20" />
        <div className="absolute inset-[1px] rounded-3xl bg-[#0d0f1a]" />
        <div className="relative p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-t-3xl" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center">
                <Dice6 className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Episode Requirement</p>
                <p className="text-xs text-pink-400">Extracted by Fate</p>
              </div>
            </div>
            <div className="text-4xl">🎲</div>
          </div>

          <div className="text-center py-4">
            <p className="text-5xl font-black bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">16</p>
            <p className="text-lg text-white/70">Episodes Extracted</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-white/50">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span>The dice has spoken</span>
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span>📖</span> Synopsis
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          After the party of heroes defeated the Demon King, they went their separate ways.
          Frieren, the elven mage, reflects on the past and embarks on a journey to
          understand human emotions and the meaning of the connections she made.
        </p>
      </div>
    </div>
  )
}