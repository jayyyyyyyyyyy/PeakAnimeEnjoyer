export function canFinishSeason(
  members: {
    user_id: string
  }[],
  progress: {
    user_id: string
    episodes_watched: number
  }[],
  goal: number
) {
  if (goal <= 0) {
    return false
  }

  return members.every((member) => {

    const memberProgress =
      progress.find(
        (p) => p.user_id === member.user_id
      )

    return (
      (memberProgress?.episodes_watched ?? 0)
      >= goal
    )

  })
}