"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
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

export function LoginModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Handle Standard Email Login (Mock for now, or can be Firebase too)
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      dispatch(login({ name: "Crypto Trader", email: email || "user@example.com" }));
      setIsLoading(false);
      setOpen(false);
    }, 500);
  };

  // 2. Handle Google Login (REAL FIREBASE AUTH)
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Dispatch user data to Redux
      dispatch(login({ 
        name: user.displayName || "Trader", 
        email: user.email || "No Email" 
      }));
      
      setOpen(false);
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Google Login Failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 border-none font-semibold">
          Log In
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-black/30 backdrop-blur-2xl border border-white/10 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 rounded-3xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-bold text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Welcome Back
          </DialogTitle>
          <p className="text-center text-slate-300 text-sm mt-2">Enter your details to continue</p>
        </DialogHeader>
        
        <div className="grid gap-6">
          <form onSubmit={handleEmailLogin} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-200 pl-2 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-12 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-200 pl-2 text-sm">Password</Label>
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                  Forgot Password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-12 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 mt-2">
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-3 text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* --- GOOGLE BUTTON (WIRED UP) --- */}
          <Button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline" 
            className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white py-6 rounded-xl gap-3 transition-all duration-300 font-medium"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.06z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.66 2.06c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isLoading ? "Connecting..." : "Sign in with Google"}
          </Button>

          <div className="text-center text-sm text-slate-300 mt-4">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign Up Now
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}