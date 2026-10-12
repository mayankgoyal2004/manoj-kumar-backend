import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${
          dark ? "translate-y-6 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          dark ? "translate-y-0 rotate-0 opacity-100" : "-translate-y-6 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}