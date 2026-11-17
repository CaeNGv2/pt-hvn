import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui";

export interface ReviewDecision {
  status: string;
  adminNotes?: string;
}

interface ReviewFormProps {
  /** Allowed decision statuses (excluding "pending"), e.g. ["approved","rejected"]. */
  decisions: { value: string; label: string }[];
  currentStatus: string;
  currentNotes?: string | null;
  submitting: boolean;
  onSubmit: (decision: ReviewDecision) => void;
}

const inputClass =
  "w-full rounded-md border border-[var(--color-outline)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]";

export function ReviewForm({
  decisions,
  currentStatus,
  currentNotes,
  submitting,
  onSubmit,
}: ReviewFormProps) {
  const [status, setStatus] = useState(
    currentStatus !== "pending" ? currentStatus : decisions[0]?.value ?? ""
  );
  const [adminNotes, setAdminNotes] = useState(currentNotes ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ status, adminNotes: adminNotes.trim() || undefined });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5"
    >
      <h3 className="font-semibold">Review decision</h3>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Decision</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={inputClass}
        >
          {decisions.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Admin notes</span>
        <textarea
          rows={4}
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Optional notes for the record / applicant."
          className={inputClass}
        />
      </label>

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Save decision"}
        </Button>
      </div>
    </form>
  );
}
