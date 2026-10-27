import React from "react";

export default function FullPageLoader({ message }) {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-background text-foreground select-none">
      <div className="flex flex-col items-center justify-center animate-fade">
        {/* Minimal elegant spinner */}
        <div className="relative flex items-center justify-center h-8 w-8">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>

        {/* Minimal clean status label */}
        {message ? (
          <p className="mt-3 text-xs font-medium text-muted-foreground tracking-tight">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
