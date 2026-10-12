import React from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "@/components/kit/Modal";
import { btnDanger, btnSecondary } from "@/components/kit/styles";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Delete this record?",
  description = "This action cannot be undone. The record will be removed from the portfolio.",
  confirmLabel = "Delete record",
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm"
      footer={
        <>
          <button type="button" className={btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={btnDanger} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Modal>
  );
}