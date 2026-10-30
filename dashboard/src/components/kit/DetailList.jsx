import React from "react";
import { ExternalLink } from "lucide-react";

function display(value) {
  if (value === undefined || value === null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-medium text-primary hover:underline break-all"
      >
        <span>{value}</span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </a>
    );
  }
  return String(value);
}

export default function DetailList({ fields, record }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className={field.full || field.type === "textarea" ? "sm:col-span-2" : ""}>
          <dt className="label-caps">{field.label}</dt>
          <dd className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground break-words max-h-72 overflow-y-auto pr-1">
            {display(record[field.name])}
          </dd>
        </div>
      ))}
    </dl>
  );
}
