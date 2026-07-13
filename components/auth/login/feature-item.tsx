"use client"

import { ReactNode } from "react"

interface FeatureItemProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-pink-500/10

          text-pink-400

          ring-1
          ring-pink-500/20
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  )
}