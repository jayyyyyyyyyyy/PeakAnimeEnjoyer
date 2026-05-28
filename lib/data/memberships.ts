import { createClient } from "@/lib/supabase/server"

export async function getMembership(
  clubId: string,
  userId: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", clubId)
    .eq("user_id", userId)
    .single()

  if (error) {
    return null
  }

  return data
}