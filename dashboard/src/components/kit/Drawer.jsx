import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Drawer({ open, onClose, title, subtitle, children, footer, className }) {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="animate-fade absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-[2px]"
      />
      <aside
        className={cn(
          "animate-slide-left relative flex h-full w-full flex-col border-l border-border bg-card shadow-2xl sm:max-w-xl",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        <header className="shrink-0 flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2
              className="font-heading text-base font-semibold tracking-tight text-foreground line-clamp-2 break-words"
              title={typeof title === "string" ? title : undefined}
            >
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-xs text-muted-foreground truncate">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 overscroll-contain">{children}</div>

        {footer && (
          <footer className="shrink-0 flex flex-wrap items-center justify-end gap-2 border-t border-border bg-muted/30 px-5 py-4">
            {footer}
          </footer>
        )}
      </aside>
    </div>,
    document.body
  );
}
