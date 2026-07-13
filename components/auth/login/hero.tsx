"use client"

import { Star, Trophy, Users } from "lucide-react"

import { FeatureItem } from "./feature-item"

export function Hero() {
  return (
    <div className="max-w-[620px]">

      {/* Title */}

      <h1 className="text-[48px] font-black leading-[1.15] tracking-[-0.03em] text-white">
        Watch <span className="text-pink-400">together.</span>
        <br />
        Decide <span className="text-pink-400">together.</span>
        <br />
        Enjoy <span className="text-pink-400">together.</span>
      </h1>

      {/* Description */}

      <p className="mt-8 max-w-[480px] text-lg leading-8 text-zinc-300">
        PeakAnimeEnjoyer is the platform for anime clubs.
        <br />
        <br />
        Propose, vote, watch and review your favorite anime as a community.
      </p>

      {/* Features */}

      <div className="mt-12 space-y-6">

        <FeatureItem
          icon={<Users className="h-5 w-5" />}
          title="Create or join clubs"
          description="Build your anime community"
        />

        <FeatureItem
          icon={<Trophy className="h-5 w-5" />}
          title="Challenge & vote"
          description="Compete with fun challenges"
        />

        <FeatureItem
          icon={<Star className="h-5 w-5" />}
          title="Watch & review"
          description="Share your opinions and discover new favorites"
        />

      </div>

    </div>
  )
}