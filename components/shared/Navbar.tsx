"use client";

import Link from "next/link";
import { useState } from "react";
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
  X,
  User,
  Languages,
  Rocket,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================================================
  // SCENARIO 1: LOGGED IN NAVBAR
  // =========================================================

  if (isAuthenticated) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-[#0B0E14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4 flex-1">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold whitespace-nowrap">
              Trading<span className="text-blue-500">Token</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-4 text-sm text-slate-400">
              <Link href="#" className="text-blue-400 font-semibold">Discover</Link>
              <Link href="#">Pulse</Link>
              <Link href="#">Trackers</Link>
              <Link href="#">Perpetuals</Link>
              <Link href="#">Yield</Link>
              <Link href="#">Vision</Link>
              <Link href="#">Portfolio</Link>
              <Link href="#">Rewards</Link>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="p-2 text-slate-400 hover:text-white">
              <Search size={18} />
            </button>

            {/* Network (SOL) */}
            <div className="hidden md:flex items-center gap-2 bg-[#151921] px-3 py-1.5 rounded-full border border-slate-700">
              <div className="h-3 w-3 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
              <span className="text-sm">SOL</span>
              <ChevronDown size={14} />
            </div>

            {/* Deposit */}
            <Button className="bg-indigo-600 hover:bg-indigo-500 rounded-full px-4 h-9 text-sm">
              Deposit
            </Button>

            {/* Favorites */}
            <button className="hidden sm:block p-2 text-slate-400 hover:text-white">
              <Star size={18} />
            </button>

            {/* Wallet + Settings */}
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-800">
              {/* Wallet pill */}
              <div className="flex items-center gap-2 bg-[#151921] px-3 py-1.5 rounded-full border border-slate-700">
                <Wallet size={14} />
                <span className="text-xs">0 SOL</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>

              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Settings size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[#1A1D21] border-slate-700 rounded-xl p-2"
                >
                  <DropdownMenuItem className="gap-3">
                    <User size={16} /> Account and Security
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3">
                    <Languages size={16} /> Auto Translate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3">
                    <Rocket size={16} /> Feature Updates
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => dispatch(logout())}
                    className="text-red-400 gap-3"
                  >
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-slate-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (Logged In) */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0B0E14] border-t border-slate-800 px-4 py-4 flex flex-col gap-4">
            <Link href="#" onClick={() => setMobileOpen(false)}>Discover</Link>
            <Link href="#" onClick={() => setMobileOpen(false)}>Pulse</Link>
            <Link href="#" onClick={() => setMobileOpen(false)}>Trackers</Link>
            <Link href="#" onClick={() => setMobileOpen(false)}>Portfolio</Link>
            <Link href="#" onClick={() => setMobileOpen(false)}>Rewards</Link>

            <Button
              onClick={() => dispatch(logout())}
              className="w-full bg-red-600 hover:bg-red-500"
            >
              Logout
            </Button>
          </div>
        )}
      </nav>
    );
  }

  // =========================================================
  // LOGGED OUT NAVBAR
  // =========================================================

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="text-2xl font-bold">
          Trading<span className="text-blue-500">Token</span>
        </Link>

        <div className="flex items-center gap-3">
          <LoginModal />
          <SignupModal />
        </div>
      </div>
    </nav>
  );
}
