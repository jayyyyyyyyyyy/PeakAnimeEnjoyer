interface ScoreSelectorProps {
  icon: string
  label: string
  value: number
  onChange: (value: number) => void
}

export function ScoreSelector({
  icon,
  label,
  value,
  onChange,
}: ScoreSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">
        {icon} {label}
        </h3>

        <span className="text-[#F59E0B] font-bold">
          {value}/10
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(
          (score) => (
            <button
              key={score}
              onClick={() => onChange(score)}
              className={`h-11 rounded-xl border font-bold transition-all ${
                value === score
                  ? "bg-[#8B5CF6] border-[#8B5CF6] text-white scale-105"
                  : "bg-[#0F172A] border-white/10 text-white/70 hover:border-[#8B5CF6]"
              }`}
            >
              {score}
            </button>
          )
        )}
      </div>
    </div>
  )
}