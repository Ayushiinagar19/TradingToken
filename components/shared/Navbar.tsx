"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Settings, 
  Star, 
  ChevronDown, 
  Wallet, 
  Menu,
  User,
  Languages,
  Rocket,
  LogOut
} from "lucide-react";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // =========================================================
  // SCENARIO 1: DASHBOARD NAVBAR (LOGGED IN)
  // =========================================================
  if (isAuthenticated) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-[#0B0E14] border-b border-slate-800 h-16 flex items-center px-4 lg:px-6">
        
        {/* Left: Logo & Main Nav */}
        <div className="flex items-center gap-8 flex-1">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white tracking-tight whitespace-nowrap">
            Trading<span className="text-blue-500">Token</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="#" className="text-blue-400 font-semibold hover:text-blue-300">Discover</Link>
            <Link href="#" className="hover:text-white transition-colors">Pulse</Link>
            <Link href="#" className="hover:text-white transition-colors">Trackers</Link>
            <Link href="#" className="hover:text-white transition-colors">Perpetuals</Link>
            <Link href="#" className="hover:text-white transition-colors">Yield</Link>
            <Link href="#" className="hover:text-white transition-colors">Vision</Link>
            <Link href="#" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="#" className="hover:text-white transition-colors">Rewards</Link>
          </div>
        </div>

        {/* Right: Tools & Wallet */}
        <div className="flex items-center gap-3">
          
          {/* Search Icon */}
          <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition">
            <Search size={18} />
          </button>

          {/* Network Selector (SOL) */}
          <div className="hidden md:flex items-center gap-2 bg-[#151921] hover:bg-slate-800 border border-slate-800 rounded-full px-3 py-1.5 cursor-pointer transition">
            <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
            <span className="text-sm font-medium text-white">SOL</span>
            <ChevronDown size={14} className="text-slate-500" />
          </div>

          {/* Deposit Button */}
          <Button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white rounded-full px-5 h-9 text-sm font-semibold">
            Deposit
          </Button>

          {/* Star / Favorites */}
          <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition hidden sm:block">
            <Star size={18} />
          </button>

          {/* Wallet / Profile Menu */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 ml-1">
             {/* Wallet Balance Pill */}
            <div className="hidden md:flex items-center gap-2 bg-[#151921] border border-slate-800 rounded-full px-3 py-1.5">
               <Wallet size={14} className="text-slate-400" />
               <span className="text-xs font-mono text-white">0 SOL</span>
               <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>

            {/* --- SETTINGS DROPDOWN MENU --- */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full h-9 w-9 outline-none"
                >
                   <Settings size={18} />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 bg-[#1A1D21] border-slate-800 text-slate-200 rounded-xl p-2 shadow-2xl">
                
                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer rounded-lg gap-3 py-2.5 text-sm font-medium">
                  <User size={16} />
                  <span>Account and Security</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer rounded-lg gap-3 py-2.5 text-sm font-medium">
                  <Languages size={16} />
                  <span>Auto Translate</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer rounded-lg gap-3 py-2.5 text-sm font-medium">
                  <Rocket size={16} />
                  <span>Feature Updates</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-800 my-1" />
                
                <DropdownMenuItem 
                  onClick={() => dispatch(logout())}
                  className="focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer rounded-lg gap-3 py-2.5 text-sm font-medium"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-slate-400">
            <Menu size={24} />
          </button>

        </div>
      </nav>
    );
  }

  // =========================================================
  // SCENARIO 2: LANDING NAVBAR (LOGGED OUT)
  // =========================================================
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          Trading<span className="text-blue-500">Token</span>
        </Link>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <LoginModal /> 
            <SignupModal />
          </div>
        </div>
      </div>
    </nav>
  );
}