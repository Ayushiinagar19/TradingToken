"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, RotateCcw, X } from "lucide-react";

// Mock Data for Protocols
const protocols = [
  { name: "Pump", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { name: "Mayhem", color: "text-pink-400 bg-pink-400/10 border-pink-400/20" },
  { name: "Bonk", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  { name: "Bags", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { name: "Moonshot", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
  { name: "Heaven", color: "text-yellow-200 bg-yellow-200/10 border-yellow-200/20" },
  { name: "Daos.fun", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  { name: "Candle", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
  { name: "Sugar", color: "text-pink-300 bg-pink-300/10 border-pink-300/20" },
  { name: "Believe", color: "text-green-500 bg-green-500/10 border-green-500/20" },
  { name: "Jupiter Studio", color: "text-orange-300 bg-orange-300/10 border-orange-300/20" },
  { name: "Moonit", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  { name: "Boop", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
  { name: "LaunchLab", color: "text-blue-300 bg-blue-300/10 border-blue-300/20" },
  { name: "Dynamic BC", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  { name: "Raydium", color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20" },
  { name: "Meteora AMM", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { name: "Meteora AMM V2", color: "text-purple-600 bg-purple-600/10 border-purple-600/20" },
  { name: "Pump AMM", color: "text-teal-400 bg-teal-400/10 border-teal-400/20" },
  { name: "Orca", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  { name: "Wavebreak", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
];

export function FilterPopup() {
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(["Pump", "Raydium"]);
  const [activeTab, setActiveTab] = useState<"Audit" | "Metrics">("Audit");
  const [open, setOpen] = useState(false);

  const toggleProtocol = (name: string) => {
    setSelectedProtocols(prev => 
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-slate-900 border-slate-800 text-slate-300 h-8 text-xs gap-2 hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all">
          <Filter size={12} /> Filter
        </Button>
      </DialogTrigger>
      
      {/* --- CENTERED DIALOG CONTENT --- */}
      {/* Added [&>button]:hidden to remove the default X button */}
      <DialogContent className="max-w-[600px] w-full p-0 bg-[#0F1219]/95 backdrop-blur-xl border-slate-800 rounded-2xl shadow-2xl text-white overflow-hidden gap-0 [&>button]:hidden">
        
        {/* Hidden accessible title for screen readers */}
        <DialogTitle className="sr-only">Filter Options</DialogTitle>

        {/* --- HEADER --- */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50">
          <h3 className="font-semibold text-sm">Filters</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedProtocols([])}
              className="p-1.5 hover:bg-white/5 rounded-full text-slate-400 transition"
              title="Reset"
            >
              <RotateCcw size={14} />
            </button>
            <button 
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-white/5 rounded-full text-slate-400 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          
          {/* --- PROTOCOLS SECTION --- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Protocols</span>
              <span className="cursor-pointer hover:text-white" onClick={() => setSelectedProtocols([])}>Unselect All</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {protocols.map((proto) => {
                const isSelected = selectedProtocols.includes(proto.name);
                return (
                  <button
                    key={proto.name}
                    onClick={() => toggleProtocol(proto.name)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all
                      ${isSelected 
                        ? `${proto.color} shadow-[0_0_10px_-3px_currentColor]` 
                        : "bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700"}
                    `}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-current" : "bg-slate-600"}`} />
                    {proto.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* --- KEYWORDS INPUTS --- */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Search Keywords</label>
              <Input 
                placeholder="keyword1, keyword2..." 
                className="bg-slate-900/50 border-slate-800 h-9 text-xs focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Exclude Keywords</label>
              <Input 
                placeholder="keyword1, keyword2..." 
                className="bg-slate-900/50 border-slate-800 h-9 text-xs focus-visible:ring-red-500"
              />
            </div>
          </div>

          {/* --- TABS (AUDIT / METRICS) --- */}
          <div className="bg-slate-900/50 p-1 rounded-lg inline-flex w-full border border-slate-800">
            <button 
              onClick={() => setActiveTab("Audit")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "Audit" ? "bg-[#1A1D21] text-white shadow-sm border border-slate-700" : "text-slate-500 hover:text-slate-300"}`}
            >
              Audit
            </button>
            <button 
              onClick={() => setActiveTab("Metrics")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "Metrics" ? "bg-[#1A1D21] text-white shadow-sm border border-slate-700" : "text-slate-500 hover:text-slate-300"}`}
            >
              Metrics
            </button>
          </div>

          {/* --- CONTROLS --- */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="dexpaid" className="border-slate-700 data-[state=checked]:bg-blue-500" />
              <label htmlFor="dexpaid" className="text-sm font-medium text-slate-300">Dex Paid</label>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between text-xs text-slate-400">
                 <span>Top 10 Holders %</span>
               </div>
               <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 w-1/3 rounded-full"></div>
               </div>
            </div>
          </div>

        </div>

        {/* --- FOOTER --- */}
        <div className="p-4 border-t border-slate-800/50 bg-[#0B0E14]/50 flex justify-between items-center">
           <div className="flex gap-2">
             <Button variant="outline" className="h-8 text-xs border-slate-800 bg-transparent hover:bg-slate-800 text-slate-300 rounded-lg px-4">
               Import
             </Button>
             <Button variant="outline" className="h-8 text-xs border-slate-800 bg-transparent hover:bg-slate-800 text-slate-300 rounded-lg px-4">
               Export
             </Button>
           </div>
           <Button onClick={() => setOpen(false)} className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 font-semibold shadow-lg shadow-blue-600/20">
             Apply All
           </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}