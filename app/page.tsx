import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function LandingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log("LANDING USER:", user)
  if (user) {
    console.log("LANDING USER:", user)
    redirect("/my-clubs")
  }
console.log("LANDING USER:", user)
  return (
    
    <main className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* HERO */}

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 mb-6">
            🎌 Anime Club
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Watch Anime
            <br />
            Together
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Create clubs with friends, propose anime,
            compete in challenges and discover what
            your group will watch next.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 transition font-semibold"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-4xl mb-4">🎲</div>

            <h2 className="font-bold text-xl mb-2">
              Secret Proposals
            </h2>

            <p className="text-white/60">
              Every member submits an anime without
              revealing it to the others.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-4xl mb-4">🏆</div>

            <h2 className="font-bold text-xl mb-2">
              Challenge System
            </h2>

            <p className="text-white/60">
              A challenge decides who gets to choose
              the next anime for the club.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-4xl mb-4">⭐</div>

            <h2 className="font-bold text-xl mb-2">
              Reviews & Stats
            </h2>

            <p className="text-white/60">
              Track seasons, ratings and your club&apos;s
              favourite anime.
            </p>
          </div>
        </div>

        {/* HOW IT WORKS */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How it works
          </h2>

          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl mb-3">1️⃣</div>
              <p>Create a club</p>
            </div>

            <div>
              <div className="text-3xl mb-3">2️⃣</div>
              <p>Submit proposals</p>
            </div>

            <div>
              <div className="text-3xl mb-3">3️⃣</div>
              <p>Play a challenge</p>
            </div>

            <div>
              <div className="text-3xl mb-3">4️⃣</div>
              <p>Reveal the winner</p>
            </div>

            <div>
              <div className="text-3xl mb-3">5️⃣</div>
              <p>Watch together</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
