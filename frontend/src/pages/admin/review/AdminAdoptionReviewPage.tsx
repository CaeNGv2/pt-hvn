import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  api,
  ReviewAdoptionDtoStatusEnum,
  type AdoptionApplication,
} from "@/api";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/components/toast";
import { useApi } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";
import { ReviewForm, type ReviewDecision } from "./ReviewForm";

const DECISIONS = [
  { value: ReviewAdoptionDtoStatusEnum.Approved, label: "Approve" },
  { value: ReviewAdoptionDtoStatusEnum.Rejected, label: "Reject" },
];

export default function AdminAdoptionReviewPage() {
  const { id } = useParams<{ id: string }>();
  const appId = Number(id);
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const { data, loading, error, refetch } = useApi<AdoptionApplication>(
    () => api.adoptions.adoptionsControllerFindOne(appId),
    [appId]
  );

  const breadcrumbs = useMemo<Breadcrumb[]>(
    () => [
      { label: "Admin", to: "/admin" },
      { label: "Adoptions", to: "/admin/adoptions" },
      { label: data ? `#${data.id}` : "Review" },
    ],
    [data]
  );
  usePortalHeader(
    data ? `Application #${data.id}` : "Review application",
    breadcrumbs
  );

  async function handleReview(decision: ReviewDecision) {
    setSubmitting(true);
    try {
      await api.adoptions.adoptionsControllerReview(appId, {
        status: decision.status as ReviewAdoptionDtoStatusEnum,
        adminNotes: decision.adminNotes,
      });
      showToast({ title: "Decision saved", tone: "success" });
      refetch();
    } catch {
      showToast({ title: "Couldn't save decision", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="h-64 animate-pulse rounded-xl bg-[var(--color-container)]" />;
  }
  if (error || !data) {
    return (
      <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
        Couldn't load this application.
      </p>
    );
  }

  return (
    <div className="grid max-w-4xl gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {data.pet?.name ?? "Pet"}
          </h2>
          <StatusBadge status={data.status} />
        </div>

        <DetailRow label="Applicant" value={data.member?.fullName} />
        <DetailRow label="Email" value={data.member?.email} />
        <DetailRow label="Pet" value={data.pet?.name} />
        <DetailRow label="Living situation" value={data.livingSituation} />
        <DetailRow label="Experience" value={data.experienceDesc} />
        <DetailRow label="Message" value={data.message} />
        <DetailRow
          label="Submitted"
          value={new Date(data.submittedAt).toLocaleString()}
        />
      </div>

      <ReviewForm
        decisions={DECISIONS}
        currentStatus={data.status}
        currentNotes={data.adminNotes}
        submitting={submitting}
        onSubmit={handleReview}
      />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-[var(--color-text-default)]/40 uppercase">
        {label}
      </p>
      <p className="text-sm text-[var(--color-text-default)]/90">
        {value || <span className="text-[var(--color-text-default)]/40">—</span>}
      </p>
    </div>
  );
}
