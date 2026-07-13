"use client"

import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  hero?: ReactNode
  background?: ReactNode
}

export function AuthLayout({
  children,
  hero,
  background,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1020] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        {background}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,.18),transparent_35%)]
        "
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8 py-10">
        {/* Login */}
        <div className="w-full max-w-md">
          {children}
        </div>

        {/* Hero */}
        <div className="hidden w-full max-w-xl lg:block">
          {hero}
        </div>
      </div>
    </main>
  )
}