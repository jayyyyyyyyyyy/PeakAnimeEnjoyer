"use client"

import { useState } from "react"
import { setChallengeWinner } from "@/app/actions/challenge-winner"

export default function TestWinnerPage() {
  const [message, setMessage] = useState("")

  async function handleClick() {
    try {
      await setChallengeWinner(
        "4f7205dc-0e6e-4f2e-b558-635d9f7dc7ff",
        "39e415bf-3c74-4f24-bb08-fca48ab70757",
        "MANUAL",
        "Scala 40"
      )

      setMessage("Success")
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
        Winner Test
      </h1>

      <button
        onClick={handleClick}
        className="border px-4 py-2"
      >
        Set Winner
      </button>

      <p>{message}</p>
    </div>
  )
}