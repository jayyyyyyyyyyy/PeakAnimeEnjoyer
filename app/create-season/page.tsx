"use client"

import { useState } from "react"
import { createSeason } from "@/app/actions/seasons"

export default function CreateSeasonPage() {
  const [clubId, setClubId] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  async function handleCreate() {
    try {
      const season = await createSeason(
        clubId,
        title
      )

      setMessage(
        `Season created: ${season.title}`
      )
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unknown error"
      )
    }
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Create Season
      </h1>

      <input
        className="border p-2"
        placeholder="Club ID"
        value={clubId}
        onChange={(e) =>
          setClubId(e.target.value)
        }
      />

      <input
        className="border p-2"
        placeholder="Season title (optional)"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button
        onClick={handleCreate}
        className="border px-4 py-2"
      >
        Create
      </button>

      {message && (
        <p>{message}</p>
      )}
    </div>
  )
}