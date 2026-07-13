"use client"

import { useState } from "react"
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { GlassCard } from "../shared/glass-card"
import { Logo } from "./logo"

interface LoginFormProps {
  email: string
  password: string

  setEmail: (value: string) => void
  setPassword: (value: string) => void

  loginLoading: boolean
  signupLoading: boolean

  onLogin: () => void
  onSignup: () => void
}

export function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  loginLoading,
  signupLoading,
  onLogin,
  onSignup,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <GlassCard className="w-full max-w-[600px] px-12 py-14 lg:px-14 lg:py-16">

      <Logo />

      <div className="space-y-5">

        <div className="relative">
          <Mail className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              h-14
              rounded-2xl

              border-white/10

              bg-zinc-900/70

              pl-12
              pr-5

              text-[15px]
              text-white

              placeholder:text-zinc-500

              shadow-inner

              transition-all
              duration-300

              focus-visible:border-pink-500
              focus-visible:ring-pink-500/20
              focus-visible:bg-zinc-900
            "
          />
        </div>

        <div className="relative">
          <Lock className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              h-14
              rounded-2xl
              border-white/10
              bg-zinc-900/70
              pl-12
              pr-12
              text-[15px]
              text-white
              placeholder:text-zinc-500
              shadow-inner
              transition-all
              duration-300
              focus-visible:border-pink-500
              focus-visible:ring-pink-500/20
              focus-visible:bg-zinc-900
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2

              text-zinc-500

              transition-colors

              hover:text-zinc-300
            "
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="
            text-sm
            text-pink-400
            transition-colors
            hover:text-pink-300
          "
        >
          Forgot password?
        </button>
      </div>

      <div className="mt-8 space-y-5">
        <Button
          onClick={onLogin}
          disabled={loginLoading}
          className="
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-fuchsia-500
            text-base
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-[0_0_50px_rgba(236,72,153,.45)]
            active:scale-[0.99]
          "
        >
          {loginLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </>
          )}
        </Button>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-xs text-zinc-500">
            or
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          variant="outline"
          onClick={onSignup}
          disabled={signupLoading}
          className="
            h-14
            w-full
            rounded-2xl
            border-pink-500/20
            bg-transparent
            text-base
            font-semibold
            text-pink-300
            transition-all
            duration-300
            hover:border-pink-400
            hover:bg-pink-500/10
            hover:text-white
          "
        >
          {signupLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  )
}