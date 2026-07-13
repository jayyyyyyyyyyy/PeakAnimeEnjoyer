"use client"

import { Poster } from "./poster"

const SIZES = [
  "h-[380px] w-[250px]",
  "mt-20 h-[330px] w-[220px]",
  "h-[390px] w-[255px]",
  "mt-16 h-[330px] w-[220px]",
  "h-[380px] w-[250px]",
  "mt-10 h-[310px] w-[210px]",
]

interface BackgroundProps {
  posters?: string[]
}

export function Background({ posters = [] }: BackgroundProps) {
  const slots = 18

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Poster Wall */}

      <div
        className="
          absolute

          -left-32
          -top-32

          grid
          grid-cols-6

          gap-8

          rotate-[-10deg]

          scale-[1.2]
          opacity-100
        "
      >
        {Array.from({ length: slots }).map((_, i) => (
          <Poster
            key={i}
            image={posters.length ? posters[i % posters.length] : undefined}
            className={SIZES[i % SIZES.length]}
          />
        ))}
      </div>

      {/* Overlay leggerissimo, solo per uniformare i toni */}

      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#090B14]/60" />

      <div className="absolute inset-0 bg-gradient-to-l from-[#090B14] via-[#090B14]/55 to-transparent" />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#090B14] to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#090B14] to-transparent" />

    </div>
  )
}