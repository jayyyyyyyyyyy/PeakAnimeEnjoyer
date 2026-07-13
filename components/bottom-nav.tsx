"use client"

import { Home, Tv, Plus, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "season", icon: Tv, label: "Season" },
  { id: "action", icon: Plus, label: "Action", isCenter: true },
  { id: "hall", icon: Trophy, label: "Hall" },
  { id: "profile", icon: User, label: "Profile" },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-pink-500/10 bg-[#090B14]/80 backdrop-blur-2xl">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative -mt-6 flex items-center justify-center"
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                  "bg-gradient-to-br from-pink-500 to-fuchsia-500",
                  "shadow-lg shadow-pink-500/40",
                  isActive && "scale-110"
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-pink-400"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive && "drop-shadow-[0_0_8px_#ec4899]"
                )} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-400 shadow-[0_0_6px_#ec4899]" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium transition-all",
                isActive && "text-pink-400"
              )}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}