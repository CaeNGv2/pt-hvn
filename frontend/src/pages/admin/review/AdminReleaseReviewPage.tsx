import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  api,
  ReviewReleaseDtoStatusEnum,
  type ReleasedPet,
} from "@/api";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/components/toast";
import { useApi } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";
import { ReviewForm, type ReviewDecision } from "./ReviewForm";

const DECISIONS = [
  { value: ReviewReleaseDtoStatusEnum.Accepted, label: "Accept" },
  { value: ReviewReleaseDtoStatusEnum.Rejected, label: "Reject" },
];

export default function AdminReleaseReviewPage() {
  const { id } = useParams<{ id: string }>();
  const releaseId = Number(id);
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const { data, loading, error, refetch } = useApi<ReleasedPet>(
    () => api.releases.releasesControllerFindOne(releaseId),
    [releaseId]
  );

  const breadcrumbs = useMemo<Breadcrumb[]>(
    () => [
      { label: "Admin", to: "/admin" },
      { label: "Surrenders", to: "/admin/releases" },
      { label: data ? `#${data.id}` : "Review" },
    ],
    [data]
  );
  usePortalHeader(data ? `Surrender #${data.id}` : "Review surrender", breadcrumbs);

  async function handleReview(decision: ReviewDecision) {
    setSubmitting(true);
    try {
      await api.releases.releasesControllerReview(releaseId, {
        status: decision.status as ReviewReleaseDtoStatusEnum,
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
        Couldn't load this surrender request.
      </p>
    );
  }

  return (
    <div className="grid max-w-4xl gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{data.petName}</h2>
          <StatusBadge status={data.status} />
        </div>

        <DetailRow label="Owner" value={data.member?.fullName} />
        <DetailRow label="Email" value={data.member?.email} />
        <DetailRow label="Type" value={data.petType?.name} />
        <DetailRow label="Breed" value={data.breed} />
        <DetailRow
          label="Age"
          value={data.ageYears != null ? `${data.ageYears} yr` : null}
        />
        <DetailRow label="Gender" value={data.gender} />
        <DetailRow label="Summary" value={data.summaryDesc} />
        <DetailRow label="About the pet" value={data.petDesc} />
        <DetailRow label="Reason for surrender" value={data.reasonDesc} />
        {data.tags?.length > 0 && (
          <div>
            <p className="text-xs font-medium tracking-wide text-[var(--color-text-default)]/40 uppercase">
              Tags
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {data.tags.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-[var(--color-container-highest)] px-2.5 py-0.5 text-xs text-[var(--color-text-default)]/70"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        )}
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
      <p className="text-sm text-[var(--color-text-default)]/90 capitalize">
        {value || <span className="text-[var(--color-text-default)]/40">—</span>}
      </p>
    </div>
  );
}
