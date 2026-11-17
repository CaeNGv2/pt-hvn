import { Link } from "react-router-dom";

import type { Pet } from "@/api";
import { resolvePhotoUrl } from "@/lib/photo";
import { PetCardView } from "./PetCardView";

/** Compact pet summary card; links to the pet detail page. */
export function PetCard({ pet }: { pet: Pet }) {
  return (
    <Link
      to={`/portal/pets/${pet.id}`}
      className="group block transition-shadow hover:shadow-md"
    >
      <PetCardView
        data={{
          name: pet.name,
          typeName: pet.type?.name,
          breed: pet.breed,
          ageYears: pet.ageYears,
          gender: pet.gender,
          summaryDesc: pet.summaryDesc,
          tags: pet.tags?.map((t) => t.name),
          photoUrl: resolvePhotoUrl(pet.photoRef),
          isAvailable: pet.isAvailable,
        }}
      />
    </Link>
  );
}
