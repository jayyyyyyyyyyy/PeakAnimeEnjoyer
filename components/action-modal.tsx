"use client"

import { useState } from "react"
import { Check, Minus, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { updateEpisodeProgress } from "@/app/actions/progress"

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  seasonId: string
}

export function ActionModal({
  isOpen,
  onClose,
  seasonId,
}: ActionModalProps) {
  const [episode, setEpisode] = useState(16)
  const [saved, setSaved] = useState(false)
  const maxEpisodes = 28
  const router = useRouter()

  const handleSave = async () => {
    if (!seasonId) {
      return
    }

    try {
      await updateEpisodeProgress(seasonId, episode)

      setSaved(true)
      router.refresh()

      setTimeout(() => {
        setSaved(false)
        onClose()
      }, 1500)
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative w-full max-w-lg rounded-t-3xl glass-dark border-t border-white/10 p-6 pb-10 transition-all duration-300",
          "animate-in slide-in-from-bottom duration-300"
        )}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-white/20" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>

        {saved ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <Check className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Episode Registered!
            </h2>

            <p className="text-white/60">
              Your progress has been saved
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mt-4 mb-6">
              Update Progress
            </h2>

            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={() => setEpisode(Math.max(0, episode - 1))}
                className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
              >
                <Minus className="w-6 h-6 text-white" />
              </button>

              <div className="text-center">
                <div className="text-6xl font-black gradient-text">
                  {episode}
                </div>

                <p className="text-sm text-white/50">
                  Last watched episode
                </p>
              </div>

              <button
                onClick={() => setEpisode(Math.min(maxEpisodes, episode + 1))}
                className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="glass rounded-2xl p-4 border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">
                  Progress Preview
                </span>

                <span className="text-sm font-bold text-[#8B5CF6]">
                  {Math.round((episode / maxEpisodes) * 100)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-[#0F172A] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] transition-all duration-300"
                  style={{ width: `${(episode / maxEpisodes) * 100}%` }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>0</span>
                <span>{maxEpisodes} episodes</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/5">
              <div
                className="w-12 h-12 rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=60')",
                }}
              />

              <div>
                <p className="font-semibold text-white">
                  Frieren
                </p>

                <p className="text-xs text-white/50">
                  Season #1 - 28 episodes
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-lg shadow-lg shadow-[#8B5CF6]/30 active:scale-[0.98] transition-transform"
            >
              Save Progress
            </button>
          </>
        )}
      </div>
    </div>
  )
}
