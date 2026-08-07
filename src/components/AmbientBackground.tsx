export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-1/4 top-0 size-[55vw] animate-drift rounded-full bg-primary/20 blur-3xl">
        <div className="size-full animate-pulse-glow rounded-full bg-primary/30 blur-3xl" />
      </div>
      <div className="absolute -right-1/4 top-1/3 size-[50vw] animate-drift-slow rounded-full bg-violet/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-[45vw] animate-drift rounded-full bg-pink/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0c_70%)]" />
    </div>
  )
}
