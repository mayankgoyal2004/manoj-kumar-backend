import React from "react";
import { ArrowUpDown, ChevronDown, ChevronUp, Eye, Pencil, Trash2, ExternalLink } from "lucide-react";
import StatusBadge from "@/components/kit/StatusBadge";
import EmptyState from "@/components/kit/EmptyState";
import { btnIcon, thCls, tdCls } from "@/components/kit/styles";
import { formatDate, formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

function InlineOrderInput({ value, onSave }) {
  const [current, setCurrent] = React.useState(value === 0 || !value ? "" : String(value));
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    setCurrent(value === 0 || !value ? "" : String(value));
  }, [value]);

  const handleCommit = () => {
    const parsed = current === "" ? 0 : parseInt(String(current), 10) || 0;
    if (parsed !== (value || 0)) {
      onSave?.(parsed);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    }
  };

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <span className="text-[11px] font-bold text-muted-foreground">#</span>
      <input
        type="number"
        min="1"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onBlur={handleCommit}
        placeholder="—"
        className={cn(
          "h-7 w-16 rounded-md border px-1.5 text-center font-mono text-xs font-bold tabular-nums shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40",
          isSaved
            ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
            : "border-input bg-background/95 text-foreground hover:border-primary/50"
        )}
        title="Set priority order number (1 = Top priority). Press Enter or click away to save."
      />
    </div>
  );
}

function renderValue(column, row, onCellChange) {
  const value = row[column.key];

  if (column.type === "order" || column.key === "orderIndex") {
    return (
      <InlineOrderInput
        value={row[column.key]}
        onSave={(newVal) => onCellChange?.(row, column.key, newVal)}
      />
    );
  }

  if (column.type === "status") return <StatusBadge value={value} />;
  if (column.type === "money") return <span className="font-medium tabular-nums">{formatINR(value)}</span>;
  if (column.type === "date") return <span className="text-muted-foreground">{formatDate(value)}</span>;
  if (column.type === "number") return <span className="tabular-nums">{value === "" || value === undefined || value === null ? "—" : value}</span>;
  if (column.type === "link") {
    if (!value) return <span className="text-muted-foreground">—</span>;
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        <span>Link</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  if (Array.isArray(value)) return value.join(", ");
  if (value === "" || value === undefined || value === null) return <span className="text-muted-foreground">—</span>;
  return value;
}

export default function DataTable({
  columns,
  rows,
  sort,
  onSort,
  onRowClick,
  onEdit,
  onDelete,
  onCellChange,
  emptyTitle = "No records found",
  emptyDescription = "Adjust your search or filters, or create a new record.",
  emptyIcon,
}) {
  if (rows.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />;
  }

  const sortIndicator = (key) => {
    if (!sort || sort.key !== key) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sort.dir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />;
  };

  return (
    <div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((column) => (
                <th key={column.key} className={thCls}>
                  <button
                    type="button"
                    onClick={() => onSort?.(column.key)}
                    className="inline-flex items-center gap-1.5 transition hover:text-foreground"
                  >
                    {column.label}
                    {sortIndicator(column.key)}
                  </button>
                </th>
              ))}
              <th className={`${thCls} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className="group cursor-pointer border-b border-border/70 transition hover:bg-muted/40"
              >
                {columns.map((column, index) => (
                  <td
                    key={column.key}
                    className={cn(
                      tdCls,
                      index === 0 && "font-medium text-foreground",
                      index === 0 && "max-w-[22rem] truncate"
                    )}
                  >
                    {renderValue(column, row, onCellChange)}
                  </td>
                ))}
                <td className={cn(tdCls, "text-right")}>
                  <div className="flex items-center justify-end gap-1.5 opacity-60 transition group-hover:opacity-100">
                    <button
                      type="button"
                      aria-label="Edit"
                      className={btnIcon}
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit?.(row);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      className={`${btnIcon} hover:border-destructive/40 hover:text-destructive`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete?.(row);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {rows.map((row) => (
          <button
            key={row.id}
            type="button"
            onClick={() => onRowClick?.(row)}
            className="block w-full px-4 py-4 text-left transition active:bg-muted/60"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold leading-snug text-foreground">
                {renderValue(columns[0], row, onCellChange)}
              </div>
              <StatusBadge value={row.status} />
            </div>
            <dl className="mt-2.5 space-y-1">
              {columns.slice(1, 4).map((column) => (
                <div key={column.key} className="flex items-baseline justify-between gap-3 text-xs">
                  <dt className="text-muted-foreground">{column.label}</dt>
                  <dd className="max-w-[60%] truncate text-right text-foreground">
                    {renderValue(column, row, onCellChange)}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary">
              <Eye className="h-3.5 w-3.5" /> View details
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
