"use client";

import { 
  LineChart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Search, 
  Lock 
} from "lucide-react";

const features = [
  {
    icon: <LineChart className="w-8 h-8 text-blue-400" />,
    title: "Real-Time Analytics",
    description: "Live price updates via WebSocket connections with sub-second latency. Never miss a pump."
  },
  {
    icon: <Search className="w-8 h-8 text-teal-400" />,
    title: "Advanced Screening",
    description: "Filter by liquidity, volume, and market cap with our proprietary discovery engine."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    title: "Security Audits",
    description: "Automated contract analysis and holder distribution checks to keep your funds safe."
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Instant Execution",
    description: "Optimized routing for the fastest swaps on Solana. Zero lag, maximum efficiency."
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    title: "Global Coverage",
    description: "Track tokens across all major DEXs including Raydium, Orca, and Meteora."
  },
  {
    icon: <Lock className="w-8 h-8 text-red-400" />,
    title: "Whale Tracking",
    description: "Monitor top holders and developer wallets to detect manipulation before it happens."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-wider text-blue-500 uppercase mb-3">
            Why TradingToken?
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Modern Trader</span>
          </h3>
          <p className="text-lg text-slate-400">
            We provide the institutional-grade tools you need to find, analyze, and trade the next 100x gem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-[#0F1219] border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-slate-900/50 w-fit rounded-xl border border-slate-800 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}