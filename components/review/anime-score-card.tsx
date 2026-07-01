import { ScoreSelector } from "./score-selector"

interface AnimeScoreCardProps {
  story: number
  setStory: (v: number) => void

  characters: number
  setCharacters: (v: number) => void

  animation: number
  setAnimation: (v: number) => void

  soundtrack: number
  setSoundtrack: (v: number) => void

  worldBuilding: number
  setWorldBuilding: (v: number) => void

  pacing: number
  setPacing: (v: number) => void

  emotionalImpact: number
  setEmotionalImpact: (v: number) => void
}

export function AnimeScoreCard({
  story,
  setStory,

  characters,
  setCharacters,

  animation,
  setAnimation,

  soundtrack,
  setSoundtrack,

  worldBuilding,
  setWorldBuilding,

  pacing,
  setPacing,

  emotionalImpact,
  setEmotionalImpact,
}: AnimeScoreCardProps) {
  const overall =
    (
      story +
      characters +
      animation +
      soundtrack +
      worldBuilding +
      pacing +
      emotionalImpact
    ) / 7

  return (
    <div className="glass rounded-3xl p-6 border border-white/10 space-y-8">

      <ScoreSelector
        icon="📖"
        label="Story"
        value={story}
        onChange={setStory}
      />

      <ScoreSelector
        icon="👥"
        label="Characters"
        value={characters}
        onChange={setCharacters}
      />

      <ScoreSelector
        icon="🎨"
        label="Visuals"
        value={animation}
        onChange={setAnimation}
      />

      <ScoreSelector
        icon="🎵"
        label="Soundtrack"
        value={soundtrack}
        onChange={setSoundtrack}
      />

      <ScoreSelector
        icon="🌍"
        label="World Building"
        value={worldBuilding}
        onChange={setWorldBuilding}
      />

      <ScoreSelector
        icon="⚡"
        label="Pacing"
        value={pacing}
        onChange={setPacing}
      />

      <ScoreSelector
        icon="❤️"
        label="Emotional Impact"
        value={emotionalImpact}
        onChange={setEmotionalImpact}
      />

      <div className="rounded-2xl bg-[#0F172A] border border-[#F59E0B]/30 p-6 text-center">
        <p className="text-sm text-white/60">
          Overall Score
        </p>

        <h2 className="mt-2 text-5xl font-black text-[#F59E0B]">
          {overall.toFixed(2)}
        </h2>
      </div>

    </div>
  )
}