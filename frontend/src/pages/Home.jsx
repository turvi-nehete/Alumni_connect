function Home() {
  return (
    <div className="relative flex h-[95vh] w-full overflow-hidden">
      
      {/* LEFT: Title */}
      <div className="relative z-10 flex w-1/3 items-center justify-center translate-x-[-4vh] translate-y-[-6vh]">
        <div className="text-left">
          <h1 className="text-6xl font-semibold tracking-widest text-white">
            UNI
          </h1>
          <h1 className="mt-8 text-6xl font-semibold tracking-widest text-white">
            CIRCLE
          </h1>
        </div>
      </div>

      {/* BACKGROUND ORBITS (CONCENTRIC + ONE SYSTEM) */}
      <div className="absolute inset-0">
        {/* shared orbit center */}
        <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow">

          {/* Orbit 1 */}
          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-purple-400/50" />

          {/* Orbit 2 */}
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-purple-400/40" />

          {/* Orbit 3 */}
          <div className="absolute left-1/2 top-1/2 h-[950px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-purple-300/30" />

          {/* Orbit 4 */}
          <div className="absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-purple-300/25" />

          {/* Orbit 5 */}
          <div className="absolute left-1/2 top-1/2 h-[1250px] w-[1250px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-purple-200/20" />

        </div>
      </div>


      {/* RIGHT: Circles */}
      <div className="absolute z-10 right-[2vh] top-1/2 -translate-y-1/2">
        
        {/* Big circle */}
        <div className="relative h-[60vh] w-[60vh] rounded-full bg-purple-500 flex items-center justify-center">
          
          {/* Central small circle (bg-colored) */}
          <div className="h-[14vh] w-[14vh] rounded-full bg-[var(--color-bg-primary)]" />

        </div>
      </div>
    </div>

  )
}

export default Home

