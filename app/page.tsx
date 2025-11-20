"use client";

import Hero from "@/components/shared/Hero";
import FeaturesSection from "@/components/shared/FeaturesSection"; // <--- Import this
import TokenTable from "@/components/features/token-table/TokenTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Lock } from "lucide-react";

export default function HomePage() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <main className="min-h-screen bg-slate-950">
      {isAuthenticated ? (
        // ===============================================
        // SCENARIO 1: LOGGED IN (DASHBOARD MODE)
        // ===============================================
        <div className="animate-in fade-in duration-500">
           <div className="pt-6">
             <TokenTable />
           </div>
        </div>
      ) : (
        // ===============================================
        // SCENARIO 2: LOGGED OUT (LANDING PAGE MODE)
        // ===============================================
        <>
          <Hero />
          
          {/* --- NEW FEATURES SECTION ADDED HERE --- */}
          <FeaturesSection />

          {/* Locked Section CTA */}
          <section className="w-full max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
             <div className="relative p-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent rounded-xl">
               <div className="bg-slate-900/50 border border-slate-800 rounded-xl py-20 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
                  <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-inner border border-slate-700">
                    <Lock className="text-slate-400 h-8 w-8" />
                  </div>
                  <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Login to View Live Market Data</h2>
                    <p className="text-slate-400">
                      Join thousands of traders tracking real-time token liquidity, volume, and price changes.
                    </p>
                  </div>
               </div>
             </div>
          </section>
        </>
      )}
    </main>
  );
}