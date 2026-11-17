import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { api } from "@/api";
import { useToast } from "@/components/toast";
import { Button } from "@/components/ui";
import { usePortalHeader, type Breadcrumb } from "@/layouts";

const BREADCRUMBS: Breadcrumb[] = [
  { label: "Admin", to: "/admin" },
  { label: "Demo state" },
];

/** Admin demo tooling: force-reset the database back to seeded data. */
export default function DemoStatePage() {
  usePortalHeader("Demo state", BREADCRUMBS);
  const { showToast } = useToast();
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    const confirmed = window.confirm(
      "Reset the database to its seeded demo data?\n\n" +
        "This permanently deletes all members, pets, adoption applications, " +
        "and surrender requests, then restores the original sample data."
    );
    if (!confirmed) return;

    setResetting(true);
    try {
      await api.admin.seedControllerReset();
      showToast({
        title: "Database reset",
        description: "All data has been restored to the seeded demo state.",
        tone: "success",
      });
    } catch {
      showToast({
        title: "Reset failed",
        description: "Couldn't reset the database. Please try again.",
        tone: "error",
      });
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <ExclamationTriangleIcon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold">Reset to seeded data</h2>
            <p className="mt-1 text-sm text-[var(--color-text-default)]/70">
              Wipes all current data and restores the original demo dataset
              (sample pets, members, tags, and pet types). Useful for returning
              the demo to a known state. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <Button variant="primary" onClick={handleReset} disabled={resetting}>
            <ArrowPathIcon className={resetting ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            {resetting ? "Resetting…" : "Reset database"}
          </Button>
        </div>
      </div>
    </div>
  );
}
