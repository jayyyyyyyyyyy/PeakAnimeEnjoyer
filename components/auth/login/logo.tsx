"use client"

function ToriiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6.5h18" />
      <path d="M5 4h14" />
      <path d="M7 6.5V20" />
      <path d="M17 6.5V20" />
      <path d="M3 11h18" />
    </svg>
  )
}

export function Logo() {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <div
        className="
          mb-5
          flex
          h-16
          w-16
          items-center
          justify-center

          rounded-full

          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-violet-600

          shadow-[0_0_35px_rgba(236,72,153,.4)]
        "
      >
        <ToriiIcon className="h-8 w-8 text-white" />
      </div>

      <h1
        className="
          text-[28px]
          font-bold
          tracking-[-0.02em]
          text-white
        "
      >
        Peak<span className="text-pink-400">Anime</span>Enjoyer
      </h1>

      <p className="mt-1 text-sm text-zinc-400">
        The Anime Club Experience
      </p>
    </div>
  )
}