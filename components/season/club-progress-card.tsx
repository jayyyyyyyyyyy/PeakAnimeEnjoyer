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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
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
                  ? "bg-purple-500/10 border-purple-500/40"
                  : "bg-[#0F172A] border-white/10"
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

                <span className="text-sm font-semibold text-[#F59E0B]">
                  {member.episodes_watched} / {seasonGoal}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#1E293B] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]"
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