"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { SeasonScreen } from "@/components/screens/season-screen"
import { HallOfFameScreen } from "@/components/screens/hall-of-fame-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { ActionModal } from "@/components/action-modal"

export default function AnimeClubApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [showActionModal, setShowActionModal] = useState(false)

  const handleTabChange = (tab: string) => {
    if (tab === "action") {
      setShowActionModal(true)
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <main className="min-h-screen bg-[#0F172A] max-w-lg mx-auto relative overflow-x-hidden">
      {/* Screen Content */}
      <div className="min-h-screen">
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "season" && <SeasonScreen />}
        {activeTab === "hall" && <HallOfFameScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Action Modal */}
      <ActionModal 
        isOpen={showActionModal} 
        onClose={() => setShowActionModal(false)} 
      />
    </main>
  )
}
