import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@davuniversity.org");
  const [password, setPassword] = useState("•••••••••••••");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    login({ email });
    setTimeout(() => {
      navigate({ to: "/" });
    }, 200);
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      {/* Left side: Editorial hero brand panel */}
      <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 xl:p-16 text-white">
        {/* Background architectural image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        {/* Cinematic dark gradients for contrast and tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/30" />

        {/* Top brand header */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="flex h-11 w-11 flex-col items-center justify-center rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm shadow-inner">
            <span className="font-serif text-lg font-bold leading-none text-white">D</span>
            <span className="mt-1 h-1 w-1 rounded-full bg-[#f59e0b]" />
          </div>
          <div>
            <div className="font-serif text-base font-bold tracking-wide text-white">
              DAV University
            </div>
            <div className="text-[9px] font-semibold tracking-[0.25em] text-slate-300 uppercase">
              ACADEMIC PORTFOLIO
            </div>
          </div>
        </div>

        {/* Center hero typography */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <p className="text-[11px] font-bold tracking-[0.25em] text-slate-300 uppercase mb-4">
            THE ACADEMIC OFFICE
          </p>
          <h1 className="font-serif text-5xl xl:text-6xl text-white font-normal leading-[1.12] tracking-tight">
            Ideas that shape <br />
            <span className="italic font-serif text-[#f2b94b]">tomorrow.</span>
          </h1>
          <p className="mt-6 text-sm xl:text-base text-slate-300/90 leading-relaxed max-w-md font-light">
            One considered workspace for the scholarship, leadership, and legacy of Prof. (Dr.) Manoj Kumar.
          </p>
        </div>

        {/* Bottom meta information */}
        <div className="relative z-10 flex items-center gap-4 text-xs font-mono tracking-wider text-slate-400">
          <span>Jalandhar, Punjab</span>
          <span className="text-slate-600 font-sans">·</span>
          <span>EST. 2010</span>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-card p-6 sm:p-12 lg:p-16 min-h-screen">
        <div className="w-full max-w-[420px]">
          {/* Mobile brand header (shown on smaller screens) */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-slate-900 text-white">
              <span className="font-serif text-base font-bold leading-none">D</span>
              <span className="mt-0.5 h-1 w-1 rounded-full bg-[#f59e0b]" />
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-slate-900 dark:text-foreground">DAV University</div>
              <div className="text-[8px] font-semibold tracking-[0.2em] text-slate-500 uppercase">Academic Portfolio</div>
            </div>
          </div>

          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-muted-foreground block mb-2">
              WELCOME BACK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              Sign in to your office
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-muted-foreground">
              Manage the academic portfolio with clarity and purpose.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 dark:text-foreground mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-card text-slate-900 dark:text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 dark:focus:border-primary transition"
                placeholder="admin@davuniversity.org"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 dark:text-foreground mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-3.5 pr-14 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-card text-slate-900 dark:text-foreground text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 dark:focus:border-primary transition"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-muted-foreground px-1.5 py-0.5 rounded border border-slate-200 dark:border-border bg-slate-50 dark:bg-muted select-none">
                  ⌘ K
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-muted-foreground">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                />
                <span>Keep me signed in</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#2563eb] hover:underline font-medium text-xs"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-lg bg-[#0a192f] hover:bg-[#0f2342] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              <span>{loading ? "Entering workspace..." : "Enter workspace"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-muted-foreground mt-5">
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
            <span>Demo access is prefilled for your presentation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
