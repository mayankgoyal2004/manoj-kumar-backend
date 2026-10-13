import React, { useEffect, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

const STATUS_MESSAGES = [
  "Establishing secure console environment...",
  "Authenticating executive credentials...",
  "Synchronizing academic publications & research records...",
  "Finalizing executive dashboard workspace...",
];

export default function FullPageLoader({ message }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (message) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [message]);

  const activeMessage = message || STATUS_MESSAGES[msgIndex];

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[120px] animate-loader-glow" />
        <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[130px] animate-loader-glow [animation-delay:1.8s]" />
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.07)_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-10 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl shadow-2xl shadow-primary/10 max-w-[420px] w-[90%] animate-rise">
        
        {/* Top Decorative Micro Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-amber-700 bg-amber-500/10 dark:text-amber-300 dark:bg-amber-400/10 border border-amber-500/20 mb-7">
          <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-pulse" />
          <span>Executive Administration Console</span>
        </div>

        {/* Central Luxury Insignia / Gyroscope Emblem */}
        <div className="relative mb-6 flex items-center justify-center h-28 w-28 animate-loader-float">
          {/* Outer Golden Gyroscope Ring */}
          <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-loader-spin">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400/70" />
          </div>

          {/* Middle Sapphire Dash Ring */}
          <div className="absolute inset-2.5 rounded-full border-2 border-dashed border-primary/40 animate-loader-spin-reverse" />

          {/* Breathing Radial Halo */}
          <div className="absolute inset-4 rounded-full bg-primary/15 blur-md animate-loader-glow" />

          {/* Center Medallion */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-slate-900 to-primary text-primary-foreground shadow-xl shadow-primary/30 ring-1 ring-amber-400/40 overflow-hidden">
            {/* Shimmer light sweep across medallion */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loader-shimmer" />
            
            <span className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              MK
            </span>
          </div>
        </div>

        {/* Title & Institutional Subtitle */}
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]">
          Portfolio Console
        </h1>
        <p className="mt-1 text-xs font-medium tracking-wide text-amber-700/90 dark:text-amber-300/90 uppercase">
          Prof. (Dr.) Manoj Kumar
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Vice-Chancellor · Senior Academic Leadership
        </p>

        {/* Liquid Laser Progress Bar */}
        <div className="mt-7 w-56 overflow-hidden rounded-full bg-muted/80 p-0.5 border border-border/60">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-background/50">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary via-amber-400 to-primary rounded-full animate-loader-shimmer [animation-duration:1.8s]" />
          </div>
        </div>

        {/* Dynamic Status Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 h-6 px-3 text-xs font-medium text-muted-foreground">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </div>
          <span className="animate-fade transition-all duration-300 tracking-tight">
            {activeMessage}
          </span>
        </div>

        {/* Security Stamp / Institutional Footnote */}
        <div className="mt-6 pt-4 border-t border-border/40 w-full flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/75 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-primary/70" />
          <span>EXECUTIVE SECURE WORKSPACE</span>
        </div>
      </div>
    </div>
  );
}
