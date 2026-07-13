"use client"

import { ReactNode } from "react"

import { Background } from "./background"
import { Hero } from "../login/hero"

interface AuthLayoutProps {
  children: ReactNode
  hero: ReactNode
  background?: ReactNode
}

export function AuthLayout({
  children,
  hero,
  background,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090B14] text-white">

      {/* Background */}
      <div className="absolute inset-0">
        {background ?? <Background />}
      </div>

      {/* Overlay principale */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Glow sinistro */}
      <div className="pointer-events-none absolute -left-56 top-0 h-[750px] w-[750px] rounded-full bg-pink-600/15 blur-[220px]" />

      {/* Glow destro */}
      <div className="pointer-events-none absolute -right-56 bottom-0 h-[700px] w-[700px] rounded-full bg-fuchsia-600/10 blur-[220px]" />

      {/* Vignettatura */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,.5))]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1650px]
          items-center
          justify-center
          gap-20
          px-10
          py-20
        "
      >
        {/* Login */}

        <section className="flex w-full justify-end lg:w-[650px]">
          {children}
        </section>

        {/* Hero */}

        <aside className="hidden w-[620px] lg:block">
          {hero ?? <Hero />}
        </aside>

      </div>

      {/* Footer */}

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <p className="text-sm text-zinc-500">
          Made with <span className="text-pink-400">❤</span> for anime fans
        </p>
      </div>
    </main>
  )
}