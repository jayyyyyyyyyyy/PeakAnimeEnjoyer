import { createClient } from "@/lib/supabase/server"

export async function getClubBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}