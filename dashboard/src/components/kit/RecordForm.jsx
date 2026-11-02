import React from "react";
import FieldControl from "@/components/kit/FieldControl";
import { btnPrimary, btnSecondary } from "@/components/kit/styles";

export default function RecordForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save changes",
  showButtons = true,
  buttonsPosition = "bottom",
}) {
  const buttonsNode = showButtons ? (
    <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
      {onCancel && (
        <button type="button" className={btnSecondary} onClick={onCancel}>
          Cancel
        </button>
      )}
      <button type="submit" className={btnPrimary}>
        {submitLabel}
      </button>
    </div>
  ) : null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
      className="space-y-5"
    >
      {(buttonsPosition === "top" || buttonsPosition === "both") && buttonsNode}

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FieldControl
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={onChange}
          />
        ))}
      </div>

      {(buttonsPosition === "bottom" || buttonsPosition === "both") && buttonsNode}
    </form>
  );
}
