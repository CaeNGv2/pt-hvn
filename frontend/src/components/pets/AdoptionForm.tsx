import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { api } from "@/api";
import { Field, fieldInputClass } from "@/components/forms";
import { Button, buttonClasses } from "@/components/ui";
import { useToast } from "@/components/toast";
import { useAuth } from "@/hooks";

interface AdoptionFormProps {
  petId: number;
  petName: string;
  /** Called after a successful submission. */
  onSubmitted?: () => void;
  /** Called when the user cancels / closes the form. */
  onCancel?: () => void;
}

/**
 * Adoption application form. Posts to POST /adoptions (member only).
 * Guests are prompted to log in instead.
 */
export function AdoptionForm({
  petId,
  petName,
  onSubmitted,
  onCancel,
}: AdoptionFormProps) {
  const { isMemberAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [livingSituation, setLivingSituation] = useState("");
  const [experienceDesc, setExperienceDesc] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isMemberAuthenticated) {
    return (
      <div className="rounded-lg border border-[var(--color-outline)] bg-[var(--color-container)] p-5 text-sm">
        <p className="text-[var(--color-text-default)]/80">
          Please log in to apply to adopt {petName}.
        </p>
        <Link
          to="/portal/login"
          className={buttonClasses("primary", "standard", "mt-3 inline-flex")}
        >
          Log in to continue
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.adoptions.adoptionsControllerCreate({
        petId,
        livingSituation: livingSituation.trim() || undefined,
        experienceDesc: experienceDesc.trim() || undefined,
        message: message.trim() || undefined,
      });
      showToast({
        title: "Application sent",
        description: `Your adoption application for ${petName} has been submitted.`,
        tone: "success",
      });
      onSubmitted?.();
    } catch {
      showToast({
        title: "Something went wrong",
        description: "We couldn't submit your application. Please try again.",
        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-[var(--color-outline)] bg-[var(--color-surface)] p-5"
    >
      <h3 className="font-semibold">Adoption application for {petName}</h3>

      <Field
        label="Your living situation"
        hint="e.g. apartment with a garden, house with young kids…"
      >
        <input
          type="text"
          maxLength={256}
          value={livingSituation}
          onChange={(e) => setLivingSituation(e.target.value)}
          className={fieldInputClass}
        />
      </Field>

      <Field label="Experience with pets">
        <textarea
          rows={3}
          value={experienceDesc}
          onChange={(e) => setExperienceDesc(e.target.value)}
          className={fieldInputClass}
        />
      </Field>

      <Field label="Message to the shelter">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={fieldInputClass}
        />
      </Field>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Submit application"}
        </Button>
        {onCancel && (
          <Button type="button" variant="raw" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}


