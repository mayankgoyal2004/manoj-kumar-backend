import React from "react";
import { ChevronDown } from "lucide-react";
import { inputCls, selectCls } from "@/components/kit/styles";

function Shell({ label, hint, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground">{label}</label>
      )}
      {children}
      {hint && <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function FieldControl({ field, value, onChange }) {
  const { name, label, type = "text", options = [], placeholder, hint, full, required } = field;
  const stringValue = value === undefined || value === null ? "" : String(value);

  if (type === "textarea") {
    return (
      <Shell label={label} hint={hint} full>
        <textarea
          rows={4}
          name={name}
          required={required}
          className={`${inputCls} resize-y leading-relaxed`}
          placeholder={placeholder}
          value={stringValue}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </Shell>
    );
  }

  if (type === "select") {
    return (
      <Shell label={label} hint={hint}>
        <div className="relative">
          <select
            className={selectCls}
            name={name}
            value={stringValue}
            onChange={(event) => onChange(name, event.target.value)}
          >
            <option value="">Select…</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </Shell>
    );
  }

  if (type === "image") {
    return (
      <Shell label={label} hint={hint || "Paste a direct image URL (https://…)"} full>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="url"
            name={name}
            className={inputCls}
            placeholder="https://images.unsplash.com/…"
            value={stringValue}
            onChange={(event) => onChange(name, event.target.value)}
          />
          <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-28">
            {stringValue ? (
              <img src={stringValue} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-[10px] uppercase tracking-widest text-muted-foreground">
                Preview
              </div>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell label={label} hint={hint}>
      <input
        type={type === "url" ? "url" : type}
        name={name}
        required={required}
        className={inputCls}
        placeholder={placeholder}
        value={stringValue}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </Shell>
  );
}