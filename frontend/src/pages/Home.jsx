function Home() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden">

      {/* LEFT: Title - Enhanced with subtle glow */}
      <div className="relative z-20 flex w-1/2 items-center pl-[8vw]">
        <div className="text-left space-y-6">
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold tracking-[0.3em] text-[var(--color-text-primary)] drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-pulse-subtle">
            UNI
          </h1>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold tracking-[0.3em] text-[var(--color-text-primary)] drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-pulse-subtle animation-delay-150">
            CIRCLE
          </h1>

          <p className="text-[var(--color-text-secondary)] text-lg tracking-wider mt-8 font-light animate-fade-in-up animation-delay-300">
            Where connections orbit infinitely
          </p>
        </div>
      </div>

      {/* BACKGROUND ORBITS - Refined dashed rings */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[35%] top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slower">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-purple-400/50 animate-pulse-ring animation-delay-0" />
          <div className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-purple-400/40 animate-pulse-ring animation-delay-200" />
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-purple-300/30 animate-pulse-ring animation-delay-400" />
          <div className="absolute left-1/2 top-1/2 h-[1050px] w-[1050px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-purple-300/22 animate-pulse-ring animation-delay-600" />
          <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-purple-200/15 animate-pulse-ring animation-delay-800" />
        </div>
      </div>

      {/* RIGHT: CONCENTRIC GRADIENT CIRCLE SYSTEM */}
      <div className="absolute z-10 right-[6vw] top-1/2 -translate-y-1/2">

        {/* Layer 1: Outermost - Very faint, largest reach */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial-1 opacity-20 blur-2xl animate-breathing-slow animation-delay-0" />

        {/* Layer 2: Far outer ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-gradient-radial-2 opacity-25 blur-xl animate-breathing-slow animation-delay-200" />

        {/* Layer 3: Outer mid ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-radial-3 opacity-30 blur-lg animate-breathing animation-delay-400" />

        {/* Layer 4: Inner mid ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-radial-4 opacity-40 blur-md animate-breathing animation-delay-600" />

        {/* Layer 5: Close ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gradient-radial-5 opacity-50 blur-sm animate-breathing animation-delay-800" />

        {/* Layer 6: Core ring - Most visible */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full bg-gradient-radial-core opacity-70 animate-breathing-reverse animation-delay-1000" />

        {/* Central void - The epicenter */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[140px] w-[140px] rounded-full bg-[var(--color-bg-main)] shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_0_60px_rgba(168,85,247,0.3)] animate-pulse-center" />

        {/* Inner accent ring for dimension */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full border border-purple-400/20 animate-spin-reverse" />

      </div>

      {/* ORBITAL DECAY — Extends beyond the circle to resolve right-side composition */}
      <div className="absolute z-5 right-0 top-1/2 -translate-y-1/2 pointer-events-none">

        {/* Decay Arc 1 - Closest, most visible */}
        <div className="absolute left-[-15vw] top-1/2 -translate-y-1/2 h-[600px] w-[600px]">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[120%] rounded-full border-l-[2px] border-dashed border-purple-400/15 animate-decay-arc-1" />
        </div>

        {/* Decay Arc 2 - Mid distance */}
        <div className="absolute left-[-20vw] top-1/2 -translate-y-1/2 h-[750px] w-[750px]">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[120%] rounded-full border-l-[2px] border-dashed border-purple-300/10 animate-decay-arc-2" />
        </div>

        {/* Decay Arc 3 - Farthest, most subtle */}
        <div className="absolute left-[-25vw] top-1/2 -translate-y-1/2 h-[900px] w-[900px]">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[120%] rounded-full border-l-[1px] border-dashed border-purple-200/6 animate-decay-arc-3" />
        </div>

      </div>

      {/* Atmospheric particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-[20%] left-[15%] h-2 w-2 rounded-full bg-purple-400/30 blur-sm animate-drift-1" />
        <div className="absolute top-[65%] left-[22%] h-1.5 w-1.5 rounded-full bg-purple-300/25 blur-sm animate-drift-2" />
        <div className="absolute top-[45%] right-[18%] h-2 w-2 rounded-full bg-purple-500/20 blur-sm animate-drift-3" />
        <div className="absolute top-[80%] right-[35%] h-1 w-1 rounded-full bg-purple-400/20 blur-sm animate-drift-1" />
      </div>

      <style jsx>{`
        /* Radial gradient definitions - soft, feathered edges */
        .bg-gradient-radial-1 {
          background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 70%);
        }
        
        .bg-gradient-radial-2 {
          background: radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(147,51,234,0.12) 45%, transparent 75%);
        }
        
        .bg-gradient-radial-3 {
          background: radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(147,51,234,0.15) 50%, transparent 80%);
        }
        
        .bg-gradient-radial-4 {
          background: radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(147,51,234,0.2) 55%, transparent 85%);
        }
        
        .bg-gradient-radial-5 {
          background: radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(147,51,234,0.25) 60%, transparent 90%);
        }
        
        .bg-gradient-radial-core {
          background: radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(147,51,234,0.5) 50%, rgba(126,34,206,0.2) 80%, transparent 100%);
        }

        /* Breathing animations - ultra subtle */
        @keyframes breathing-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.015); opacity: 0.8; }
        }
        
        @keyframes breathing {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.02); opacity: 0.9; }
        }
        
        @keyframes breathing-reverse {
          0%, 100% { transform: translate(-50%, -50%) scale(1.02); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        }
        
        @keyframes pulse-center {
          0%, 100% { box-shadow: inset 0 0 40px rgba(0,0,0,0.8), 0 0 60px rgba(168,85,247,0.3); }
          50% { box-shadow: inset 0 0 50px rgba(0,0,0,0.9), 0 0 80px rgba(168,85,247,0.5); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; text-shadow: 0 0 40px rgba(168,85,247,0.6); }
          50% { opacity: 0.95; text-shadow: 0 0 50px rgba(168,85,247,0.8); }
        }
        
        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.015); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes drift-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(12px, -18px); opacity: 0.6; }
        }
        
        @keyframes drift-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.25; }
          50% { transform: translate(-18px, 12px); opacity: 0.5; }
        }
        
        @keyframes drift-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(15px, 20px); opacity: 0.45; }
        }
        
        .animate-breathing-slow {
          animation: breathing-slow 12s ease-in-out infinite;
        }
        
        .animate-breathing {
          animation: breathing 8s ease-in-out infinite;
        }
        
        .animate-breathing-reverse {
          animation: breathing-reverse 10s ease-in-out infinite;
        }
        
        .animate-pulse-center {
          animation: pulse-center 6s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 5s ease-in-out infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 60s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 10s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
        
        
        @keyframes decay-arc-1 {
          0%, 100% { opacity: 0.15; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.25; transform: translateY(-50%) scale(1.01); }
        }
        
        @keyframes decay-arc-2 {
          0%, 100% { opacity: 0.1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.18; transform: translateY(-50%) scale(1.015); }
        }
        
        @keyframes decay-arc-3 {
          0%, 100% { opacity: 0.06; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.12; transform: translateY(-50%) scale(1.02); }
        }
        
        .animate-decay-arc-1 {
          animation: decay-arc-1 11s ease-in-out infinite;
        }
        
        .animate-decay-arc-2 {
          animation: decay-arc-2 13s ease-in-out infinite;
          animation-delay: 400ms;
        }
        
        .animate-decay-arc-3 {
          animation: decay-arc-3 15s ease-in-out infinite;
          animation-delay: 800ms;
        }
        
        .animate-drift-1 {
          animation: drift-1 14s ease-in-out infinite;
        }
        
        .animate-drift-2 {
          animation: drift-2 18s ease-in-out infinite;
        }
        
        .animate-drift-3 {
          animation: drift-3 11s ease-in-out infinite;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}

export default Home
