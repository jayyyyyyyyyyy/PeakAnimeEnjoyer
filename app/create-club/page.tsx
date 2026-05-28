"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClub } from "@/app/actions/clubs"

export default function CreateClubPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")

  const handleCreateClub = async () => {
    try {
      const club = await createClub(name, slug)

      router.push(`/club/${club.slug}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">
        Create Club
      </h1>

      <input
        className="border p-2"
        placeholder="Club name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <button
        className="border px-4 py-2"
        onClick={handleCreateClub}
      >
        Create Club
      </button>
    </div>
  )
}