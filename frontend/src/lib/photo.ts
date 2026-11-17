import { env } from "@/config/env";

/**
 * Photo reference, mirroring the backend's PhotoRef union. The DB stores this
 * as a JSON string in `pet.photoRef`; the API returns that raw string.
 *
 * - "api":      uploaded image id → `<API_BASE>/uploads/<id>.webp`
 * - "external": a fully-qualified URL, used as-is
 * - "site":     a path under the frontend's /public folder
 */
export type PhotoRef =
  | { type: "api"; uri: string }
  | { type: "external"; uri: string }
  | { type: "site"; uri: string };

/** Parse the raw `photoRef` string (JSON, or a legacy plain URL) into a PhotoRef. */
export function parsePhotoRef(raw: string | null | undefined): PhotoRef | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      "type" in parsed &&
      "uri" in parsed
    ) {
      return parsed as PhotoRef;
    }
  } catch {
    // not JSON — fall through and treat as a legacy URL/path
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return { type: "external", uri: raw };
  }
  return { type: "site", uri: raw };
}

/** Resolve a PhotoRef (or raw string) to a usable <img src>. Returns null if none. */
export function resolvePhotoUrl(
  ref: PhotoRef | string | null | undefined
): string | null {
  const photo = typeof ref === "string" || ref == null ? parsePhotoRef(ref) : ref;
  if (!photo) return null;

  switch (photo.type) {
    case "api":
      return `${env.apiBaseUrl}/uploads/${photo.uri}.webp`;
    case "external":
      return photo.uri;
    case "site": {
      const base = env.pagesBasePath === "/" ? "" : env.pagesBasePath;
      const path = photo.uri.startsWith("/") ? photo.uri : `/${photo.uri}`;
      return `${base}${path}`;
    }
  }
}
