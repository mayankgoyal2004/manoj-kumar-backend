import React from "react";
import { ChevronRight } from "lucide-react";

export default function PageHeader({ eyebrow, title, description, actions, breadcrumb }) {
  return (
    <header className="mb-6">
      <nav className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        {(breadcrumb || ["Console"]).map((crumb, index, all) => (
          <span key={`${crumb}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
            <span className={index === all.length - 1 ? "font-medium text-foreground" : ""}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {eyebrow && <p className="label-caps mb-2">{eyebrow}</p>}
          <h1 className="font-heading text-[26px] font-semibold leading-tight tracking-tight text-foreground sm:text-[32px]">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}