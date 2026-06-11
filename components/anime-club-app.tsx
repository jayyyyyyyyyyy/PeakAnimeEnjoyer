"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { SeasonScreen } from "@/components/screens/season-screen"
import { HallOfFameScreen } from "@/components/screens/hall-of-fame-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { ActionModal } from "@/components/action-modal"

interface AnimeClubAppProps {
  club: any
  membership: any
  season: any
  members: any[]
  proposal: any
}

export default function AnimeClubApp({
  club,
  membership,
  season,
  members,
  proposal,
}: AnimeClubAppProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [showActionModal, setShowActionModal] = useState(false)

  const handleTabChange = (tab: string) => {
    if (tab === "action") {
      setShowActionModal(true)
    } else {
      setActiveTab(tab)
    }
  }
console.log("MEMBERS:", members)
  return (
    <main className="min-h-screen bg-[#0F172A] max-w-lg mx-auto relative overflow-x-hidden">
      <div className="min-h-screen">
        {activeTab === "home" && (
<HomeScreen
  club={club}
  membership={membership}
  season={season}
  members={members}
  proposal={proposal}
/>
        )}

        {activeTab === "season" && (
          <SeasonScreen />
        )}

        {activeTab === "hall" && (
          <HallOfFameScreen />
        )}

        {activeTab === "profile" && (
          <ProfileScreen />
        )}
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        seasonId={season?.id ?? ""}
      />
    </main>
  )
}