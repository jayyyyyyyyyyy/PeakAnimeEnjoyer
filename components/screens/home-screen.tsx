"use client"

import { Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { startChallenge } from "@/app/actions/season-transition"

interface HomeScreenProps {
  club: any
  membership: any
  season: any
  members: any[]
  proposal: any
  memberCount: number
  proposalCount: number
}

export function HomeScreen({
  club,
  membership,
  season,
  members,
  proposal,
  memberCount,
  proposalCount,
}: HomeScreenProps) {
  console.log("HOME PROPOSAL:", proposal)

async function handleStartChallenge() {
  alert("CLICK OK")

  console.log("BUTTON CLICKED")

  if (!season?.id) {
    alert("NO SEASON")
    return
  }

  alert("SEASON FOUND")
}


  return (
    <div className="pb-24 px-4 space-y-6">
      <header className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold gradient-text">
              {club?.name}
            </h1>

            <p className="text-xs text-white/50">
              {season?.title ?? "Nessuna stagione"}
            </p>

            <p className="text-xs text-yellow-400">
              {membership?.role}
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
          <span className="text-xs font-medium text-[#8B5CF6]">
            {season?.status ?? "NO SEASON"}
          </span>
        </div>
      </header>

    {proposal && (
      <div className="glass rounded-2xl p-4 border border-[#8B5CF6]/30">
        <p className="text-xs text-white/50 mb-2">
          Your Proposal
        </p>

        <h2 className="text-lg font-bold text-white">
          {proposal.anime?.title}
        </h2>

        <p className="text-sm text-white/60">
          Waiting for challenge...
        </p>
      </div>
    )}

    <div className="glass rounded-2xl p-4 border border-white/10">
      <p className="text-xs text-white/50 mb-2">
        Proposal Progress
      </p>

      <h2 className="text-lg font-bold text-white">
        {proposalCount} / {memberCount}
      </h2>

      <p className="text-sm text-white/60">
        Members submitted a proposal
      </p>
    </div>

    {membership?.role === "OWNER" &&
    proposalCount === memberCount &&
    season?.status === "PROPOSAL" && (
      <button
        onClick={handleStartChallenge}
        className="w-full rounded-xl bg-purple-600 p-3 font-bold text-white"
      >
        Start Challenge
      </button>
    )}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10" />

        <div
          className="h-48 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60')",
          }}
        />

        <div className="relative z-20 p-4 -mt-16">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
              Fantasy
            </span>

            <span className="px-2 py-0.5 text-xs rounded-full bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
              Adventure
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            Frieren
          </h2>

          <p className="text-sm text-white/60 mb-4">
            Beyond Journey&apos;s End
          </p>

          <div className="glass rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/70">
                Club Progress
              </span>

              <span className="text-2xl font-bold text-[#F59E0B]">
                57%
              </span>
            </div>

            <div className="h-3 rounded-full bg-[#0F172A] overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]"
                style={{ width: "57%" }}
              />
            </div>

            <p className="text-xs text-white/50">
              16 / 28 episodes required
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>👥</span> Club Members
        </h3>

        <div className="space-y-2">
          {(members ?? []).map((member) => (
            <div
              key={member.id}
              className="glass rounded-2xl p-4 border border-white/10 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center text-xl border border-white/10">
                {member.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">
                    {member.profiles?.username}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      0%
                    </span>

                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        member.status === "green" &&
                          "bg-[#22C55E]",
                        member.status === "yellow" &&
                          "bg-[#F59E0B]",
                        member.status === "red" &&
                          "bg-[#EF4444]"
                      )}
                    />
                  </div>
                </div>

                <div className="h-2 rounded-full bg-[#0F172A] overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      member.status === "green" &&
                        "bg-gradient-to-r from-[#22C55E] to-[#16A34A]",
                      member.status === "yellow" &&
                        "bg-gradient-to-r from-[#F59E0B] to-[#D97706]",
                      member.status === "red" &&
                        "bg-gradient-to-r from-[#EF4444] to-[#DC2626]"
                    )}
                    style={{
                            width: "0%"
                          }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5 border border-[#F59E0B]/30 bg-gradient-to-r from-[#F59E0B]/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#F59E0B]" />
          </div>

          <div>
            <p className="text-sm text-white/60">
              Time Remaining
            </p>

            <p className="text-2xl font-bold text-[#F59E0B]">
              12 days
            </p>
          </div>

          <div className="ml-auto text-4xl animate-float">
            ⏰
          </div>
        </div>
      </div>
    </div>
  )
}