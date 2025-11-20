"use client";

import { useState } from "react";
import { useDispatch } from "react-redux"; // Added Dispatch
import { login } from "@/store/authSlice"; // Added Action
import { auth, googleProvider } from "@/lib/firebase"; // Import Firebase
import { signInWithPopup } from "firebase/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // --- HANDLE GOOGLE SIGN UP ---
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      dispatch(login({ 
        name: user.displayName || "New Trader", 
        email: user.email || "No Email" 
      }));
      
      setOpen(false);
    } catch (error) {
      console.error("Google Signup Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 border-none">
          Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-black/40 backdrop-blur-2xl border border-white/10 text-white shadow-2xl p-6 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-center text-slate-200 mb-2">
            Sign Up
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 mt-2">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="signup-email" className="text-xs text-slate-400 ml-1">Email</Label>
              <Input
                id="signup-email"
                placeholder="Enter email"
                className="bg-[#1A1D21] border-transparent text-white placeholder:text-slate-600 rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invite-code" className="text-xs text-slate-400 ml-1">Invite Code</Label>
              <Input
                id="invite-code"
                placeholder="Invite code (optional)"
                className="bg-[#1A1D21] border-transparent text-white placeholder:text-slate-600 rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
              />
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-6 rounded-xl text-base shadow-lg shadow-blue-500/20 transition-all mt-1">
            Sign Up
          </Button>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-slate-500">Or Sign Up</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid gap-3">
            {/* --- GOOGLE BUTTON (WIRED UP) --- */}
            <Button 
              onClick={handleGoogleSignup}
              disabled={isLoading}
              variant="outline" 
              className="w-full bg-[#1A1D21] border-transparent hover:bg-[#25282D] text-slate-200 py-6 rounded-xl gap-3 font-normal border border-white/5"
            >
               <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.06z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.66 2.06c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {isLoading ? "Connecting..." : "Continue with Google"}
            </Button>
          </div>

          <div className="text-center space-y-3 mt-2">
             <p className="text-sm text-slate-400">
               Already have an account? <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
             </p>
             <p className="text-[10px] text-slate-500 leading-relaxed px-4">
               By creating an account, you agree to Axiom&apos;s <span className="text-blue-500 cursor-pointer">Privacy Policy</span> and <span className="text-blue-500 cursor-pointer">Terms of Service</span>
             </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}