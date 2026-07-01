export interface MemberStatus {
  label: string
  color: string
  emoji: string
}

export function getMemberStatus(
  watched: number,
  goal: number
): MemberStatus {

  if (goal === 0) {
    return {
      label: "Unknown",
      color: "text-gray-400",
      emoji: "⚪",
    }
  }

  if (watched === 0) {
    return {
      label: "Not Started",
      color: "text-gray-400",
      emoji: "⏳",
    }
  }

  if (watched >= goal) {
    return {
      label: "Finished",
      color: "text-green-400",
      emoji: "🏁",
    }
  }

  return {
    label: "Watching",
    color: "text-purple-400",
    emoji: "🟢",
  }
}