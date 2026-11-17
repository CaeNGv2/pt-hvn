import { api, type PetType } from "@/api";
import { useApi } from "@/hooks";
import type { PhotoRef } from "@/lib/photo";
import { Field, fieldInputClass } from "./Field";
import { PhotoInput } from "./PhotoInput";
import { TagSelector } from "./TagSelector";

export type Gender = "male" | "female" | "unknown";

/** Shared, controlled value for pet attribute fields (surrender, admin create…). */
export interface PetDetailsValue {
  name: string;
  typeId: string;
  breed: string;
  ageYears: string;
  gender: Gender;
  summaryDesc: string;
  description: string;
  photo: PhotoRef | null;
  tagIds: number[];
}

export const emptyPetDetails: PetDetailsValue = {
  name: "",
  typeId: "",
  breed: "",
  ageYears: "",
  gender: "unknown",
  summaryDesc: "",
  description: "",
  photo: null,
  tagIds: [],
};

interface PetDetailsFieldsProps {
  value: PetDetailsValue;
  onChange: (patch: Partial<PetDetailsValue>) => void;
  /** Label for the long description field (differs per context). */
  descriptionLabel?: string;
}

/** Reusable block of pet attribute inputs. Parent owns submit + extra fields. */
export function PetDetailsFields({
  value,
  onChange,
  descriptionLabel = "Description",
}: PetDetailsFieldsProps) {
  const { data: types } = useApi<PetType[]>(
    () => api.pets.petsControllerFindAllTypes(),
    []
  );

  return (
    <>
      <Field label="Pet name" required>
        <input
          type="text"
          required
          maxLength={128}
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={fieldInputClass}
        />
      </Field>

      <Field label="Photo">
        <PhotoInput value={value.photo} onChange={(photo) => onChange({ photo })} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type">
          <select
            value={value.typeId}
            onChange={(e) => onChange({ typeId: e.target.value })}
            className={fieldInputClass}
          >
            <option value="">Select a type…</option>
            {(types ?? []).map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Breed">
          <input
            type="text"
            maxLength={128}
            value={value.breed}
            onChange={(e) => onChange({ breed: e.target.value })}
            className={fieldInputClass}
          />
        </Field>

        <Field label="Age (years)">
          <input
            type="number"
            min={0}
            max={999}
            value={value.ageYears}
            onChange={(e) => onChange({ ageYears: e.target.value })}
            className={fieldInputClass}
          />
        </Field>

        <Field label="Gender">
          <select
            value={value.gender}
            onChange={(e) => onChange({ gender: e.target.value as Gender })}
            className={fieldInputClass}
          >
            <option value="unknown">Unknown</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
      </div>

      <Field label="Short summary" hint="A one-line description (max 128 chars).">
        <input
          type="text"
          maxLength={128}
          value={value.summaryDesc}
          onChange={(e) => onChange({ summaryDesc: e.target.value })}
          className={fieldInputClass}
        />
      </Field>

      <Field label={descriptionLabel}>
        <textarea
          rows={3}
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className={fieldInputClass}
        />
      </Field>

      <Field label="Tags">
        <TagSelector
          value={value.tagIds}
          onChange={(tagIds) => onChange({ tagIds })}
        />
      </Field>
    </>
  );
}
