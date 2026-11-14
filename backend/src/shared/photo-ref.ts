/**
 * Discriminated union describing where a pet/release photo lives.
 *
 * - "api"      – uploaded via POST /upload/image; `uri` is the image ID
 *                (e.g. "a1b2c3d4").  Frontend resolves to <API_BASE>/uploads/<id>.webp
 * - "external" – a fully-qualified URL (https://…jpg / …png / …webp)
 * - "site"     – a path relative to the frontend's /public folder
 *                (e.g. "pets/dog.jpg"). Frontend resolves to <SITE_BASE>/public/<uri>
 *
 * Plain type — zero deps, importable in React TSX without modification.
 */
export type PhotoRefType = "api" | "external" | "site";

export interface PhotoRefApi {
  type: "api";
  /** Image ID returned by POST /upload/image (filename without extension) */
  uri: string;
}

export interface PhotoRefExternal {
  type: "external";
  /** Fully-qualified URL, e.g. https://example.com/pet.jpg */
  uri: string;
}

export interface PhotoRefSite {
  type: "site";
  /** Path under /public, e.g. "pets/fluffy.png" */
  uri: string;
}

export type PhotoRef = PhotoRefApi | PhotoRefExternal | PhotoRefSite;

/** Serialised form stored in the DB column (JSON string). */
export type PhotoRefJson = PhotoRef;

/** Parse a raw DB value (JSON string or plain legacy URL string) into a PhotoRef. */
export function parsePhotoRef(raw: string | null | undefined): PhotoRef | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed !== null && typeof parsed === "object" && "type" in parsed && "uri" in parsed) {
      return parsed as PhotoRef;
    }
  } catch {
    // fall through — treat raw string as a legacy external URL
  }
  // Legacy plain URL — wrap as external
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return { type: "external", uri: raw };
  }
  return { type: "site", uri: raw };
}

/** Serialise a PhotoRef for DB storage. */
export function serialisePhotoRef(ref: PhotoRef): string {
  return JSON.stringify(ref);
}
