"use client"

import { cn } from "@/lib/utils"

interface PosterProps {
  image?: string
  className?: string
}

export function Poster({
  image,
  className,
}: PosterProps) {
  return (
    <div
      className={cn(
        `
        group
        relative
        overflow-hidden

        rounded-[32px]

        border
        border-white/5

        bg-zinc-900

        shadow-[0_25px_80px_rgba(0,0,0,.55)]

        transition-all
        duration-700
        ease-out

        hover:scale-[1.02]
        hover:-translate-y-1
        `,
        className
      )}
    >
      {image ? (
        <img
          src={image}
          alt=""
          draggable={false}
          className="
            h-full
            w-full
            object-cover

            brightness-[0.65]
            contrast-110
            saturate-[1.2]

            transition-transform
            duration-700

            group-hover:scale-105
          "
        />
      ) : (
        <>
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-br

              from-slate-700
              via-slate-900
              to-black
            "
          />

          <div
            className="
              absolute
              -left-10
              -top-10

              h-40
              w-40

              rounded-full

              bg-pink-500/20

              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-16
              -right-16

              h-48
              w-48

              rounded-full

              bg-fuchsia-600/15

              blur-3xl
            "
          />
        </>
      )}

      {/* Vignettatura */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t

          from-black/80
          via-black/15
          to-black/40
        "
      />

      {/* Glow superiore */}

      <div
        className="
          absolute
          inset-x-0
          top-0

          h-20

          bg-gradient-to-b

          from-white/5
          to-transparent
        "
      />

      {/* Bordo interno */}

      <div
        className="
          absolute
          inset-0

          rounded-[32px]

          ring-1
          ring-inset
          ring-white/5
        "
      />
    </div>
  )
}