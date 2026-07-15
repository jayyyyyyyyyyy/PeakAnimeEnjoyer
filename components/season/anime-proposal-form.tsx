"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Search } from "lucide-react"

import { findOrCreateAnime } from "@/app/actions/anime"
import { submitProposal } from "@/app/actions/proposal"

interface AnimeResult {
  mal_id: number
  title: string
  imageUrl: string | null
  episodes: number | null
  year: number | null
  genres: string[]
  synopsis: string | null
}

interface AnimeProposalFormProps {
  seasonId: string
}

function mapJikanResult(raw: any): AnimeResult {
  return {
    mal_id: raw.mal_id,
    title: raw.title_english || raw.title,
    imageUrl: raw.images?.jpg?.image_url ?? null,
    episodes: raw.episodes ?? null,
    year: raw.year ?? raw.aired?.prop?.from?.year ?? null,
    genres: (raw.genres ?? []).map((g: any) => g.name),
    synopsis: raw.synopsis ?? null,
  }
}

export function AnimeProposalForm({
  seasonId,
}: AnimeProposalFormProps) {
  const router = useRouter()

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<AnimeResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const [submittingId, setSubmittingId] = useState<number | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setResults([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true)
      setSearchError(null)

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
            query.trim()
          )}&limit=8&order_by=popularity`
        )

        if (!response.ok) {
          throw new Error("Search failed")
        }

        const json = await response.json()

        setResults((json.data ?? []).map(mapJikanResult))
      } catch {
        setSearchError("Unable to search anime right now.")
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  async function handlePropose(anime: AnimeResult) {
    setSubmitError(null)
    setSubmittingId(anime.mal_id)

    try {
      const localAnime = await findOrCreateAnime({
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.imageUrl,
        synopsis: anime.synopsis,
        episodes: anime.episodes,
        genres: anime.genres,
        aired_year: anime.year,
      })

      await submitProposal(seasonId, localAnime.id)

      router.refresh()
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit proposal."
      )
    } finally {
      setSubmittingId(null)
    }
  }

  return (
    <div className="rounded-2xl border border-pink-500/15 bg-white/[0.04] backdrop-blur-xl p-4">
      <p className="mb-3 text-xs text-white/50">
        Propose an anime
      </p>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime title..."
          className="
            w-full
            rounded-xl

            border
            border-white/10

            bg-[#090B14]

            py-3
            pl-11
            pr-4

            text-sm
            text-white

            placeholder:text-zinc-500

            transition-colors

            focus:border-pink-500
            focus:outline-none
          "
        />
      </div>

      {isSearching && (
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
          <Loader2 className="h-3 w-3 animate-spin" />
          Searching...
        </div>
      )}

      {searchError && (
        <p className="mt-4 text-xs text-red-400">{searchError}</p>
      )}

      {submitError && (
        <p className="mt-4 text-xs text-red-400">{submitError}</p>
      )}

      {results.length > 0 && (
        <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
          {results.map((anime) => (
            <div
              key={anime.mal_id}
              className="
                flex
                items-center
                gap-3

                rounded-xl

                border
                border-white/5

                bg-white/[0.03]

                p-2

                transition-colors

                hover:border-pink-500/20
              "
            >
              <div className="h-16 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                {anime.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={anime.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {anime.title}
                </p>
                <p className="text-xs text-zinc-500">
                  {anime.year ?? "—"} · {anime.episodes ?? "?"} eps
                </p>
              </div>

              <button
                onClick={() => handlePropose(anime)}
                disabled={submittingId === anime.mal_id}
                className="
                  shrink-0
                  rounded-lg

                  bg-gradient-to-r
                  from-pink-500
                  to-fuchsia-500

                  px-3
                  py-2

                  text-xs
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:scale-[1.03]

                  disabled:opacity-60
                "
              >
                {submittingId === anime.mal_id ? "..." : "Propose"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}