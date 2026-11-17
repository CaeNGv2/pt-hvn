import { cn } from "@/lib/cn";

type Status = "pending" | "approved" | "accepted" | "rejected" | string;

const styles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status] ?? "bg-[var(--color-container-highest)] text-[var(--color-text-default)]/70"
      )}
    >
      {status}
    </span>
  );
}
