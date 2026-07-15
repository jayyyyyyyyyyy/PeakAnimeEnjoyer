"use server"

import { createClient } from "@/lib/supabase/server"

interface FindOrCreateAnimeInput {
  mal_id: number
  title: string
  image_url?: string | null
  synopsis?: string | null
  episodes?: number | null
  genres?: string[]
  aired_year?: number | null
}

export async function findOrCreateAnime(
  input: FindOrCreateAnimeInput
) {
  const supabase = await createClient()

  const { data: existing, error: existingError } = await supabase
    .from("anime")
    .select("*")
    .eq("mal_id", input.mal_id)
    .maybeSingle()

  if (existingError) {
    throw new Error("Failed to look up anime")
  }

  if (existing) {
    return existing
  }

  const { data: created, error: createError } = await supabase
    .from("anime")
    .insert({
      mal_id: input.mal_id,
      title: input.title,
      image_url: input.image_url ?? null,
      synopsis: input.synopsis ?? null,
      episodes: input.episodes ?? null,
      genres: input.genres ?? null,
      aired_year: input.aired_year ?? null,
    })
    .select()
    .single()

  if (createError) {
    // Race condition: due utenti cercano lo stesso anime nello stesso istante,
    // il secondo insert fallisce per via del vincolo unique su mal_id.
    if (createError.code === "23505") {
      const { data: retry } = await supabase
        .from("anime")
        .select("*")
        .eq("mal_id", input.mal_id)
        .single()

      if (retry) return retry
    }

    throw new Error("Failed to save anime")
  }

  return created
}