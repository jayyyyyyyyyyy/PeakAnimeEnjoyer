"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)

  const handleSignUp = async () => {
    try {
      setSignupLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        alert(`Errore registrazione: ${error.message}`)
        return
      }

      alert("Registrazione completata!")
    } catch (err) {
      console.error("Unexpected signup error:", err)
      alert("Errore imprevisto durante la registrazione")
    } finally {
      setSignupLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      setLoginLoading(true)

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(`Errore login: ${error.message}`)
        return
      }

      alert("Login effettuato!")
    } catch (err) {
      console.error("Unexpected login error:", err)
      alert("Errore imprevisto durante il login")
    } finally {
      setLoginLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <input
        className="border p-2"
        type="email"
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

      <button
        className="border px-4 py-2"
        onClick={handleLogin}
        disabled={loginLoading}
      >
        {loginLoading ? "Caricamento..." : "Login"}
      </button>

      <button
        className="border px-4 py-2"
        onClick={handleSignUp}
        disabled={signupLoading}
      >
        {signupLoading ? "Caricamento..." : "Sign Up"}
      </button>
    </div>
  )
}
