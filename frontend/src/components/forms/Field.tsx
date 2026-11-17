import type { ReactNode } from "react";

/** Shared text/select input styling for forms. */
export const fieldInputClass =
  "w-full rounded-md border border-[var(--color-outline)] bg-[var(--color-surface-canvas)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]";

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

/** Labelled form field wrapper. */
export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-[var(--color-primary)]"> *</span>}
      </span>
      {hint && (
        <span className="text-xs text-[var(--color-text-default)]/50">{hint}</span>
      )}
      {children}
    </label>
  );
}
