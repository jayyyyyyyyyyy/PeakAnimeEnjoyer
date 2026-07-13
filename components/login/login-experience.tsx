"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function LoginExperience() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoginLoading(true)

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(error.message)
        return
      }

      window.location.reload()
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleSignup() {
    try {
      setSignupLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        alert(error.message)
        return
      }

      alert("Registration completed!")
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090B14]">

      {/* Background */}

      <div className="absolute inset-0">

        <img
          src="/login/background.jpg"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#090B14] via-[#090B14]/40 to-[#090B14]" />

      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8">

        {/* LOGIN */}

        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-2xl">

            <h1 className="mb-2 text-4xl font-black text-white">
              PeakAnimeEnjoyer
            </h1>

            <p className="mb-8 text-zinc-400">
              Welcome back.
            </p>

            <div className="space-y-5">

              <input
                className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 text-white outline-none transition focus:border-pink-500"
                placeholder="Email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 text-white outline-none transition focus:border-pink-500"

                placeholder="Password"

                type="password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}
              />

              <button

                onClick={handleLogin}

                disabled={loginLoading}

                className="
                h-12
                w-full
                rounded-xl
                bg-pink-500
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-pink-400
                disabled:opacity-50
                "
              >

                {loginLoading ? "Loading..." : "Login"}

              </button>

              <button

                onClick={handleSignup}

                disabled={signupLoading}

                className="
                h-12
                w-full
                rounded-xl
                border
                border-pink-500
                text-pink-400
                transition
                hover:bg-pink-500/10
                "
              >

                {signupLoading ? "Loading..." : "Create account"}

              </button>

            </div>

          </div>

        </div>

        {/* HERO */}

        <div className="hidden max-w-xl lg:block">

          <h2 className="mb-6 text-6xl font-black leading-tight text-white">

            Watch{" "}

            <span className="text-pink-400">
              together.
            </span>

          </h2>

          <p className="mb-12 text-xl leading-8 text-zinc-300">

            Create clubs.

            Vote anonymously.

            Discover masterpieces.

            Share your passion with friends.

          </p>

          <div className="grid grid-cols-2 gap-6">

            <Feature
              title="Create Clubs"
              description="Start your own anime club."
            />

            <Feature
              title="Vote Together"
              description="Choose what to watch."
            />

            <Feature
              title="Anonymous Reviews"
              description="No spoilers until reveal."
            />

            <Feature
              title="Hall of Fame"
              description="Keep every season alive."
            />

          </div>

        </div>

      </div>

    </main>
  )
}

interface FeatureProps {

  title: string

  description: string

}

function Feature({

  title,

  description,

}: FeatureProps) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

      <h3 className="mb-2 text-lg font-semibold text-white">

        {title}

      </h3>

      <p className="text-sm text-zinc-400">

        {description}

      </p>

    </div>

  )

}