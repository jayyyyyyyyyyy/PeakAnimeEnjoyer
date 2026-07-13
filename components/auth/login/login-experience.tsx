"use client"

import { useState } from "react"

import { createClient } from "@/lib/supabase/client"

import { AuthLayout } from "../shared/auth-layout"
import { Background } from "../shared/background"

import { Hero } from "./hero"
import { LoginForm } from "./login-form"

interface LoginExperienceProps {
  posters: string[]
}

export function LoginExperience({ posters }: LoginExperienceProps) {
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
    <AuthLayout
      background={<Background posters={posters} />}
      hero={<Hero />}
    >
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loginLoading={loginLoading}
        signupLoading={signupLoading}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </AuthLayout>
  )
}