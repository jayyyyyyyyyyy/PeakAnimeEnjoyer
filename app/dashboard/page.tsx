import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Benvenuto {profile?.username}
      </h1>

      <p>Ruolo: {profile?.role}</p>

      <p>User ID: {user.id}</p>
    </div>
  )
}