"use client";

import DollarParticles from "./DollarParticles";
import BackgroundWaves from "./BackgroundWaves"; 

export default function Hero() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-black text-white min-h-screen flex items-center justify-center">
      
      {/* --- BACKGROUND LAYER START (z-0) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Deep Blue/Black Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617]"></div>

        {/* 2. NEW: Small, Glowing Blobs (Behind Waves) */}
        <div className="absolute inset-0 z-[1] opacity-30"> {/* Lower Z-index than waves */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-50"></div>
          <div className="absolute top-[10%] left-[60%] w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000 opacity-50"></div>
        </div>

        {/* 3. Moving Sinusoidal Waves (Canvas) - z-[2] to be above blobs */}
        <div className="absolute inset-0 z-[2]">
           <BackgroundWaves />
        </div>
        
        {/* 4. Subtle Vignette to focus center (Highest Z-index in background layer) */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#020617] via-transparent to-[#020617]"></div>

      </div>
      {/* --- BACKGROUND LAYER END --- */}


      {/* Main Content Wrapper (z-10) */}
      <div className="container mx-auto px-6 relative z-10 flex items-center justify-between">
        
        {/* --- LEFT SIDE: Dollar Particles --- */}
        <div className="hidden md:block w-1/3 h-full relative min-h-[400px]">
             <DollarParticles />
        </div>

        {/* --- RIGHT SIDE: Text Content --- */}
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/30 border border-teal-500/20 text-sm text-teal-300 mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Real-time Market Insights
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6 drop-shadow-2xl">
            Unleash Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600">
               Trading Potential
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Advanced analytics, real-time liquidity tracking, and smart alerts for the modern crypto trader.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-500/20 transition-all hover:scale-105 hover:shadow-teal-500/40">
              Start Exploring
            </button>
            
            <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold text-lg backdrop-blur-sm transition-all">
              View Demo
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}