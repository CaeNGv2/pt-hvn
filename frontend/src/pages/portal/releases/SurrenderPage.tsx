import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  api,
  SubmitReleaseDtoGenderEnum,
  type PetType,
  type PhotoRefDto,
  type Tag,
} from "@/api";
import {
  emptyPetDetails,
  Field,
  fieldInputClass,
  PetDetailsFields,
  type PetDetailsValue,
} from "@/components/forms";
import { PetCardView } from "@/components/pets/PetCardView";
import { useToast } from "@/components/toast";
import { Button, buttonClasses } from "@/components/ui";
import { useApi, useAuth } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";
import { resolvePhotoUrl } from "@/lib/photo";

const BREADCRUMBS: Breadcrumb[] = [
  { label: "Portal", to: "/portal" },
  { label: "Release" },
  { label: "Surrender a pet" },
];

export default function SurrenderPage() {
  usePortalHeader("Surrender a pet", BREADCRUMBS);
  const { isMemberAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data: types } = useApi<PetType[]>(
    () => api.pets.petsControllerFindAllTypes(),
    []
  );
  const { data: allTags } = useApi<Tag[]>(
    () => api.pets.petsControllerFindAllTags(),
    []
  );

  const [details, setDetails] = useState<PetDetailsValue>(emptyPetDetails);
  const [reasonDesc, setReasonDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const patch = (p: Partial<PetDetailsValue>) =>
    setDetails((prev) => ({ ...prev, ...p }));

  // Live preview derivations.
  const typeName = useMemo(
    () => types?.find((t) => String(t.id) === details.typeId)?.name ?? null,
    [types, details.typeId]
  );
  const tagNames = useMemo(() => {
    const byId = new Map((allTags ?? []).map((t) => [t.id, t.name]));
    return details.tagIds.map((id) => byId.get(id)).filter(Boolean) as string[];
  }, [allTags, details.tagIds]);

  if (!isMemberAuthenticated) {
    return (
      <div className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-[var(--color-text-default)]/70">
          Log in to submit a surrender request.
        </p>
        <Link
          to="/portal/login"
          className={buttonClasses("primary", "standard", "mt-4 inline-flex")}
        >
          Log in
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.releases.releasesControllerSubmit({
        petName: details.name.trim(),
        petTypeId: details.typeId ? Number(details.typeId) : undefined,
        breed: details.breed.trim() || undefined,
        ageYears: details.ageYears ? Number(details.ageYears) : undefined,
        gender: details.gender as SubmitReleaseDtoGenderEnum,
        photo: (details.photo ?? undefined) as PhotoRefDto | undefined,
        summaryDesc: details.summaryDesc.trim() || undefined,
        petDesc: details.description.trim() || undefined,
        reasonDesc: reasonDesc.trim() || undefined,
        tagIds: details.tagIds.length ? details.tagIds : undefined,
      });
      showToast({
        title: "Request submitted",
        description: `Your surrender request for ${details.name} has been sent.`,
        tone: "success",
      });
      navigate("/portal/releases");
    } catch {
      showToast({
        title: "Something went wrong",
        description: "Couldn't submit your request. Please try again.",
        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-6"
      >
        <p className="text-sm text-[var(--color-text-default)]/70">
          Tell us about the pet you need to rehome. Our team will review and
          reach out to you.
        </p>

        <PetDetailsFields
          value={details}
          onChange={patch}
          descriptionLabel="About the pet"
        />

        <Field label="Reason for surrender">
          <textarea
            rows={3}
            value={reasonDesc}
            onChange={(e) => setReasonDesc(e.target.value)}
            className={fieldInputClass}
          />
        </Field>

        <div className="flex gap-3">
          <Button type="submit" disabled={submitting || !details.name.trim()}>
            {submitting ? "Submitting…" : "Submit request"}
          </Button>
          <Button type="button" variant="raw" onClick={() => navigate("/portal")}>
            Cancel
          </Button>
        </div>
      </form>

      {/* Live listing preview */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--color-text-default)]/40 uppercase">
          Listing preview
        </p>
        <PetCardView
          data={{
            name: details.name,
            typeName,
            breed: details.breed,
            ageYears: details.ageYears ? Number(details.ageYears) : null,
            gender: details.gender,
            summaryDesc: details.summaryDesc,
            tags: tagNames,
            photoUrl: resolvePhotoUrl(details.photo),
            isAvailable: true,
          }}
        />
        <p className="mt-2 text-xs text-[var(--color-text-default)]/50">
          This is how your pet will appear once approved.
        </p>
      </aside>
    </div>
  );
}
