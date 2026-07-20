"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface LogoutButtonProps {
  className?: string
  variant?: "ghost" | "solid"
}

export function LogoutButton({
  className,
  variant = "ghost",
}: LogoutButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await supabase.auth.signOut()
      router.push("/login")
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 disabled:opacity-60",
        variant === "ghost"
          ? "text-zinc-400 hover:bg-white/[0.04] hover:text-red-300"
          : "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(236,72,153,.4)]",
        className
      )}
    >
      <LogOut className="h-4 w-4" />
      {isLoggingOut ? "Logging out..." : "Log out"}
    </button>
  )
}