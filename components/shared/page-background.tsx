export function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-pink-600/10 blur-[200px]" />
      <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-fuchsia-600/10 blur-[200px]" />
    </div>
  )
}