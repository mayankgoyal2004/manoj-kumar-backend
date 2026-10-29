import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { PROFILE } from "@/lib/DataStore";
import { resolveImageUrl } from "@/lib/utils";
import api from "@/api/backendClient";
import { toast } from "sonner";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("drmanojkumarindia@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const [executiveProfile, setExecutiveProfile] = useState(() => ({
    name: PROFILE.name || "Prof. (Dr.) Manoj Kumar",
    designation: PROFILE.honorific || "Vice-Chancellor",
    location: PROFILE.city || "Jalandhar, Punjab",
    photo: PROFILE.photo || "/images/prof_manoj_kumar.jpg",
    bgImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
  }));

  useEffect(() => {
    let active = true;
    async function loadIdentity() {
      try {
        const overview = await api.public.getOverview();
        if (active && overview) {
          const p = overview.profile || {};
          const s = overview.settings || {};
          const chosenPhoto = p.photo || p.sidebarPhoto || p.headerPhoto || s.favicon || PROFILE.photo;
          const chosenBg = p.bioPhoto || p.headerPhoto || s.favicon || chosenPhoto;

          setExecutiveProfile({
            name: p.name || s.siteTitle || PROFILE.name,
            designation: p.designation || p.academicRank || s.tagline || PROFILE.honorific,
            location: p.location || PROFILE.city || "Punjab, India",
            photo: chosenPhoto,
            bgImage: chosenBg || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
          });
        }
      } catch {
        // Fallback already active
      }
    }
    loadIdentity();
    return () => {
      active = false;
    };
  }, []);

  const getInitial = (nameStr) => {
    if (!nameStr) return "M";
    const clean = nameStr.replace(/Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.|Shri\.|\(|\)/gi, "").trim();
    return clean ? clean[0].toUpperCase() : nameStr[0].toUpperCase();
  };

  const resolvedAvatarUrl = resolveImageUrl(executiveProfile.photo);
  const resolvedBgUrl = resolveImageUrl(executiveProfile.bgImage);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back to your Console");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      {/* Left side: Editorial hero brand panel */}
      <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 xl:p-16 text-white">
        {/* Dynamic background image with smooth fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
          style={{
            backgroundImage: `url('${resolvedBgUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"}')`,
          }}
        />
        {/* Cinematic dark gradients for contrast and tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/40" />

        {/* Top brand header: Dynamic Avatar / Photo + Name & Designation */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm shadow-inner">
            {!avatarError && resolvedAvatarUrl ? (
              <img
                src={resolvedAvatarUrl}
                alt={executiveProfile.name}
                onError={() => setAvatarError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <span className="font-serif text-lg font-bold leading-none text-white">
                  {getInitial(executiveProfile.name)}
                </span>
                <span className="mt-1 h-1 w-1 rounded-full bg-[#f59e0b]" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="font-serif text-base font-bold tracking-wide text-white truncate max-w-sm">
              {executiveProfile.name}
            </div>
            <div className="text-[9px] font-semibold tracking-[0.2em] text-[#f2b94b] uppercase truncate max-w-sm">
              {executiveProfile.designation}
            </div>
          </div>
        </div>

        {/* Center hero typography */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <p className="text-[11px] font-bold tracking-[0.25em] text-slate-300 uppercase mb-4">
            EXECUTIVE ACADEMIC CONSOLE
          </p>
          <h1 className="font-serif text-5xl xl:text-6xl text-white font-normal leading-[1.12] tracking-tight">
            Ideas that shape <br />
            <span className="italic font-serif text-[#f2b94b]">tomorrow.</span>
          </h1>
          <p className="mt-6 text-sm xl:text-base text-slate-300/90 leading-relaxed max-w-md font-light">
            One unified workspace for the scholarship, publications, and institutional leadership of {executiveProfile.name}.
          </p>
        </div>

        {/* Bottom meta information / Footer */}
        <div className="relative z-10 flex items-center gap-4 text-xs font-mono tracking-wider text-slate-300">
          <span>{executiveProfile.name}</span>
          <span className="text-slate-500 font-sans">·</span>
          <span>{executiveProfile.designation}</span>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-card p-6 sm:p-12 lg:p-16 min-h-screen">
        <div className="w-full max-w-[420px]">
          {/* Mobile brand header: Dynamic Avatar + Name & Designation */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-900 border border-border text-white">
              {!avatarError && resolvedAvatarUrl ? (
                <img
                  src={resolvedAvatarUrl}
                  alt={executiveProfile.name}
                  onError={() => setAvatarError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <span className="font-serif text-base font-bold leading-none">
                    {getInitial(executiveProfile.name)}
                  </span>
                  <span className="mt-0.5 h-1 w-1 rounded-full bg-[#f59e0b]" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-serif text-sm font-bold text-slate-900 dark:text-foreground truncate">
                {executiveProfile.name}
              </div>
              <div className="text-[8px] font-semibold tracking-[0.16em] text-[hsl(var(--gold))] uppercase truncate">
                {executiveProfile.designation}
              </div>
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
              Executive academic administration & research portfolio console.
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-11 px-3.5 pr-20 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-card text-slate-900 dark:text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 dark:focus:border-primary transition ${showPassword ? "" : "tracking-widest"}`}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-muted transition focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  {/* <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-muted-foreground px-1.5 py-0.5 rounded border border-slate-200 dark:border-border bg-slate-50 dark:bg-muted select-none">
                    ⌘ K
                  </span> */}
                </div>
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
              {/* <Link
                to="/forgot-password"
                className="text-[#2563eb] hover:underline font-medium text-xs"
              >
                Forgot password?
              </Link> */}
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

          {/* <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-muted-foreground mt-5">
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
            <span>Demo access is prefilled for your presentation</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
