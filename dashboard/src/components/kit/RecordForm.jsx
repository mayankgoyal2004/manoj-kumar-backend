import React from "react";
import FieldControl from "@/components/kit/FieldControl";
import { btnPrimary, btnSecondary } from "@/components/kit/styles";

export default function RecordForm({ fields, values, onChange, onSubmit, onCancel, submitLabel = "Save changes" }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
    >
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
    </form>
  );
}