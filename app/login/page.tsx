"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
    })
  }

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="border px-4 py-2" onClick={handleLogin}>
        Login
      </button>

      <button className="border px-4 py-2" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  )
}