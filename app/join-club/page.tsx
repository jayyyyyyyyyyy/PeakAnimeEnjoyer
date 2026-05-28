"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { joinClub } from "@/app/actions/join-club"

export default function JoinClubPage() {
  const router = useRouter()

  const [inviteCode, setInviteCode] = useState("")

  const handleJoinClub = async () => {
    try {
      const club = await joinClub(inviteCode)

      router.push(`/club/${club.slug}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">
        Join Club
      </h1>

      <input
        className="border p-2"
        placeholder="Invite code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />

      <button
        className="border px-4 py-2"
        onClick={handleJoinClub}
      >
        Join Club
      </button>
    </div>
  )
}