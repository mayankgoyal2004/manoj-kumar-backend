import React from "react";
import { ArrowUpDown, ChevronDown, ChevronUp, Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/kit/StatusBadge";
import EmptyState from "@/components/kit/EmptyState";
import { btnIcon, thCls, tdCls } from "@/components/kit/styles";
import { formatDate, formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

function renderValue(column, row) {
  const value = row[column.key];
  if (column.type === "status") return <StatusBadge value={value} />;
  if (column.type === "money") return <span className="font-medium tabular-nums">{formatINR(value)}</span>;
  if (column.type === "date") return <span className="text-muted-foreground">{formatDate(value)}</span>;
  if (column.type === "number") return <span className="tabular-nums">{value === "" || value === undefined ? "—" : value}</span>;
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
                    {renderValue(column, row)}
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
              <p className="text-sm font-semibold leading-snug text-foreground">
                {renderValue(columns[0], row)}
              </p>
              <StatusBadge value={row.status} />
            </div>
            <dl className="mt-2.5 space-y-1">
              {columns.slice(1, 4).map((column) => (
                <div key={column.key} className="flex items-baseline justify-between gap-3 text-xs">
                  <dt className="text-muted-foreground">{column.label}</dt>
                  <dd className="max-w-[60%] truncate text-right text-foreground">
                    {renderValue(column, row)}
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