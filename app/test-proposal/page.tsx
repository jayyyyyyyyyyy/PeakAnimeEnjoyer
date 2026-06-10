"use client"

import { useState } from "react"
import { submitProposal } from "@/app/actions/proposal"

export default function TestProposalPage() {
  const [message, setMessage] = useState("")

  async function handleSubmit() {
    try {
      const result = await submitProposal(
        "9a9d72cf-8a88-4623-9fd7-69859d79bd23",
        "5ebe44d8-b47f-41f2-b3ab-26eaaab1f7ec"
      )

      setMessage(
        `Proposal created: ${result.id}`
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
        Proposal Test
      </h1>

      <button
        onClick={handleSubmit}
        className="border px-4 py-2"
      >
        Submit Proposal
      </button>

      <p>{message}</p>
    </div>
  )
}