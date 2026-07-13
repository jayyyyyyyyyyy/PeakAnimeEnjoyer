"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Sparkles } from "lucide-react"

import { createClub } from "@/app/actions/clubs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/auth/shared/glass-card"
import { PageBackground } from "@/components/shared/page-background"

export default function CreateClubPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreateClub = async () => {
    try {
      setLoading(true)

      const club = await createClub(name, slug)

      router.push(`/club/${club.slug}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#090B14] px-6 text-white">
      <PageBackground />

      <GlassCard className="relative z-10 w-full max-w-[520px] px-10 py-12 sm:px-12 sm:py-14">

        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-pink-500
              via-fuchsia-500
              to-violet-600

              shadow-[0_0_30px_rgba(236,72,153,.4)]
            "
          >
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-2xl font-bold tracking-[-0.02em] text-white">
            Create Club
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Start a new anime club for your friends
          </p>
        </div>

        <div className="space-y-5">
          <Input
            placeholder="Club name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              h-14
              rounded-2xl
              border-white/10
              bg-zinc-900/70
              px-5
              text-[15px]
              text-white
              placeholder:text-zinc-500
              shadow-inner
              transition-all
              duration-300
              focus-visible:border-pink-500
              focus-visible:ring-pink-500/20
              focus-visible:bg-zinc-900
            "
          />

          <Input
            placeholder="Slug (e.g. my-club)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="
              h-14
              rounded-2xl
              border-white/10
              bg-zinc-900/70
              px-5
              text-[15px]
              text-white
              placeholder:text-zinc-500
              shadow-inner
              transition-all
              duration-300
              focus-visible:border-pink-500
              focus-visible:ring-pink-500/20
              focus-visible:bg-zinc-900
            "
          />
        </div>

        <Button
          onClick={handleCreateClub}
          disabled={loading}
          className="
            mt-8
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-fuchsia-500
            text-base
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-[0_0_50px_rgba(236,72,153,.45)]
            active:scale-[0.99]
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Club"
          )}
        </Button>

      </GlassCard>
    </main>
  )
}