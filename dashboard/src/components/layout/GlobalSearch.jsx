import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import Modal from "@/components/kit/Modal";
import { useData } from "@/lib/DataStore";
import { MODULES, recordTitle } from "@/lib/data/modules";
import { ALL_NAV_ITEMS } from "@/lib/navConfig";

const MODULE_ROUTES = ALL_NAV_ITEMS.filter((item) => item.moduleKey).reduce((acc, item) => {
  acc[item.moduleKey] = item.to;
  return acc;
}, {});

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { collections } = useData();

  useEffect(() => {
    if (open) {
      setQuery("");
      const timer = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const pages = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return ALL_NAV_ITEMS.slice(0, 6);
    return ALL_NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(term)).slice(0, 5);
  }, [query]);

  const records = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];
    const results = [];
    Object.keys(MODULE_ROUTES).forEach((key) => {
      (collections[key] || []).forEach((record) => {
        const title = recordTitle(key, record);
        if (title.toLowerCase().includes(term)) {
          results.push({ key, id: record.id, title, module: MODULES[key].title, status: record.status });
        }
      });
    });
    return results.slice(0, 8);
  }, [query, collections]);

  const go = (to) => {
    onClose();
    navigate({ to });
  };

  return (
    <Modal open={open} onClose={onClose} title="Search the console" size="lg"
      description="Find modules, records, publications and scholars.">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to search…"
          className="w-full rounded-xl border border-border bg-muted/40 py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:bg-card focus:ring-4 focus:ring-primary/10"
        />
      </label>

      <div className="mt-5 space-y-5">
        <div>
          <p className="label-caps mb-2">Modules</p>
          <ul className="space-y-1">
            {pages.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <button
                    type="button"
                    onClick={() => go(item.to)}
                    className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-muted"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 truncate text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{item.section}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                  </button>
                </li>
              );
            })}
            {pages.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No modules match “{query}”.</li>
            )}
          </ul>
        </div>

        {records.length > 0 && (
          <div>
            <p className="label-caps mb-2">Records</p>
            <ul className="space-y-1">
              {records.map((record) => (
                <li key={record.id}>
                  <button
                    type="button"
                    onClick={() => go(MODULE_ROUTES[record.key])}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-muted"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
                      {record.title.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {record.title}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {record.module}
                      </span>
                    </span>
                    <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-6 border-t border-border pt-4 text-[11px] text-muted-foreground">
        Tip: press <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">⌘K</span>{" "}
        anywhere in the console to open search.
      </p>
    </Modal>
  );
}