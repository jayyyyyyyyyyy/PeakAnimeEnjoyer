import { getMemberStatus } from "@/lib/season/member-status"

interface ClubProgressMember {
  user_id: string
  username: string
  episodes_watched: number
}

interface ClubProgressCardProps {
  members: ClubProgressMember[]
  seasonGoal: number
  currentUserId: string
}

export function ClubProgressCard({
  members,
  seasonGoal,
  currentUserId,
}: ClubProgressCardProps) {
  return (
    <div className="rounded-3xl border border-pink-500/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl p-6 shadow-[0_0_40px_rgba(236,72,153,.06)]">
      <h2 className="text-xl font-bold text-white mb-6">
        Club Progress
      </h2>

      <div className="space-y-4">
        {members.map((member) => {
          const status = getMemberStatus(
            member.episodes_watched,
            seasonGoal
          )

          return (
            <div
              key={member.user_id}
              className={`rounded-2xl border p-4 transition ${
                member.user_id === currentUserId
                  ? "bg-pink-500/10 border-pink-500/30"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-white">
                    {member.username}
                  </p>

                  <p className={`text-xs ${status.color}`}>
                    {status.emoji} {status.label}
                  </p>
                </div>

                <span className="text-sm font-semibold text-pink-400">
                  {member.episodes_watched} / {seasonGoal}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#090B14] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-fuchsia-500"
                  style={{
                    width: `${Math.min(
                      (member.episodes_watched /
                        seasonGoal) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}