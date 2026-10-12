import React from "react";

function display(value) {
  if (value === undefined || value === null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

export default function DetailList({ fields, record }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className={field.full || field.type === "textarea" ? "sm:col-span-2" : ""}>
          <dt className="label-caps">{field.label}</dt>
          <dd className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">
            {display(record[field.name])}
          </dd>
        </div>
      ))}
    </dl>
  );
}