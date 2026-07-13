import fs from "fs"
import path from "path"

import { LoginExperience } from "@/components/auth/login/login-experience"

function getPosterImages(): string[] {
  const postersDir = path.join(process.cwd(), "public/images/posters")

  try {
    return fs
      .readdirSync(postersDir)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `/images/posters/${file}`)
  } catch {
    return []
  }
}

export default function LoginPage() {
  const posters = getPosterImages()

  return <LoginExperience posters={posters} />
}