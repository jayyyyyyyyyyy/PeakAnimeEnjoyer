"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        `
        rounded-[36px]
        border border-pink-500/15
        border-pink-500/20
        bg-gradient-to-b
        from-white/[0.08]
        to-white/[0.04]
        backdrop-blur-2xl
        shadow-[0_0_80px_rgba(236,72,153,.10)]
        `,
        className
      )}
    >
      {children}
    </div>
  )
}