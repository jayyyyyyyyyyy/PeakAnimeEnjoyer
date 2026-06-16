"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { SeasonScreen } from "@/components/screens/season-screen"
import { HallOfFameScreen } from "@/components/screens/hall-of-fame-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { ActionModal } from "@/components/action-modal"
import type {
  AnimeProposal,
  Club,
  ClubMember,
  InterestVote,
  Membership,
  Season,
  SeasonChallenge,
} from "@/lib/types/club"

interface AnimeClubAppProps {
  club: Club
  membership: Membership
  season: Season | null
  members: ClubMember[]
  proposal: AnimeProposal | null
  challenge: SeasonChallenge | null
  interestVote: InterestVote | null
  memberCount: number
  proposalCount: number
}

export default function AnimeClubApp({
  club,
  membership,
  season,
  members,
  proposal,
  challenge,
  interestVote,
  memberCount,
  proposalCount,
}: AnimeClubAppProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [showActionModal, setShowActionModal] = useState(false)

  const handleTabChange = (tab: string) => {
    if (tab === "action") {
      setShowActionModal(true)
      return
    }

    setActiveTab(tab)
  }

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
            challenge={challenge}
            interestVote={interestVote}
            memberCount={memberCount}
            proposalCount={proposalCount}
          />
        )}

        {activeTab === "season" && <SeasonScreen />}

        {activeTab === "hall" && <HallOfFameScreen />}

        {activeTab === "profile" && <ProfileScreen />}
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
