"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTokenSocket } from "@/hooks/useTokenSocket";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sparkline from "@/components/shared/Sparkline";
import { FilterPopup } from "./FilterPopup"; 
import { Twitter, Globe, Send, Search, Pause, Copy, Users, ShieldCheck } from "lucide-react"; 

export default function TokenTable() {
  useTokenSocket();
  const tokens = useSelector((state: RootState) => state.tokens.items);
  const [timeFilter, setTimeFilter] = useState("5m");

  return (
    <section className="w-full px-4 py-6 bg-[#0B0E14] min-h-screen text-white font-sans">
      
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col gap-4 mb-4">
        
        {/* Top Row: Tabs & Main Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Tabs */}
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <button className="text-white font-bold border-b-2 border-white pb-1">Trending</button>
            <button className="hover:text-white transition">Surge</button>
            <button className="hover:text-white transition">DEX Screener</button>
            <button className="hover:text-white transition">Pump Live</button>
          </div>

          {/* Right: Tools */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Pause/Play */}
            <div className="flex items-center gap-2 text-slate-400 border-r border-slate-800 pr-3">
              <Pause size={16} className="cursor-pointer hover:text-white" />
            </div>

            {/* Time Intervals */}
            <div className="flex items-center bg-slate-900/50 rounded-lg p-1 border border-slate-800">
              {['1m', '5m', '30m', '1h'].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeFilter(time)}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    timeFilter === time ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Filter Popup Component */}
            <FilterPopup />

            {/* Quick Buy Input */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 ml-2">
              <span className="text-xs text-slate-500">Quick Buy</span>
              <Input className="h-6 w-16 bg-transparent border-none text-right text-white p-0 focus-visible:ring-0" placeholder="0.0" />
              <span className="text-xs text-slate-500">SOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0F1219]">
        <Table>
          <TableHeader className="bg-[#151921] hover:bg-[#151921]">
            <TableRow className="border-slate-800 hover:bg-[#151921]">
              <TableHead className="text-slate-500 text-xs font-medium h-10">Pair Info</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10 w-[120px]"></TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10">Market Cap</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10">Liquidity</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10">Volume</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10">TXNS</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10">Token Info</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium h-10 text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors h-16">
                <TableCell className="py-2">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 rounded-md border border-slate-700">
                      <AvatarImage src={token.image} />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200 text-sm">{token.name}</span>
                        <span className="text-xs text-slate-500">{token.symbol}</span>
                        <Copy size={10} className="text-slate-600 cursor-pointer hover:text-slate-400" />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-400">{token.age}</span>
                        <div className="flex gap-1 ml-2 text-slate-500">
                          <Twitter size={10} className="hover:text-blue-400 cursor-pointer" />
                          <Globe size={10} className="hover:text-blue-400 cursor-pointer" />
                          <Send size={10} className="hover:text-blue-400 cursor-pointer" />
                          <Search size={10} className="hover:text-blue-400 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Sparkline data={token.chartData} isPositive={token.priceChange24h >= 0} />
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200">{token.marketCap}</span>
                    <span className={`text-xs ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-sm text-slate-300">{token.liquidity}</TableCell>
                <TableCell className="py-2 text-sm text-slate-300">{token.volume}</TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200">{token.txns.total}</span>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-green-500">{token.txns.buys}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-red-500">{token.txns.sells}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs">
                      <ShieldCheck size={12} className="text-green-500" />
                      <span className="text-slate-300 font-mono">Top10: {token.security.top10}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users size={12} className="text-slate-500" />
                      <span className="text-slate-400 font-mono">{token.holders} Holders</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-6 py-2">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg h-8 px-4 text-xs font-semibold shadow-lg shadow-teal-500/20 transition-all">
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}