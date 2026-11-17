import {
  ArrowUpTrayIcon,
  LinkIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState, type DragEvent } from "react";

import { api } from "@/api";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/cn";
import { resolvePhotoUrl, type PhotoRef } from "@/lib/photo";

type Mode = "upload" | "url";

interface PhotoInputProps {
  value: PhotoRef | null;
  onChange: (next: PhotoRef | null) => void;
}

/** Picks a pet photo via drag-and-drop upload or an external URL. */
export function PhotoInput({ value, onChange }: PhotoInputProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<Mode>(
    value?.type === "external" ? "url" : "upload"
  );
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [urlText, setUrlText] = useState(
    value?.type === "external" ? value.uri : ""
  );
  const fileInput = useRef<HTMLInputElement>(null);

  const previewUrl = resolvePhotoUrl(value);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      showToast({ title: "Please choose an image file", tone: "error" });
      return;
    }
    setUploading(true);
    try {
      const res = await api.upload.uploadControllerUploadImage({ file });
      const id = (res.data as { id?: string } | undefined)?.id;
      if (!id) throw new Error("No id returned");
      onChange({ type: "api", uri: id });
    } catch {
      showToast({
        title: "Upload failed",
        description: "Couldn't upload that image. Please try again.",
        tone: "error",
      });
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  }

  function applyUrl() {
    const trimmed = urlText.trim();
    onChange(trimmed ? { type: "external", uri: trimmed } : null);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <ModeTab active={mode === "upload"} onClick={() => setMode("upload")}>
          <ArrowUpTrayIcon className="h-4 w-4" /> Upload
        </ModeTab>
        <ModeTab active={mode === "url"} onClick={() => setMode("url")}>
          <LinkIcon className="h-4 w-4" /> URL
        </ModeTab>
      </div>

      {previewUrl && (
        <div className="relative w-full overflow-hidden rounded-lg border border-[var(--color-outline)]">
          <img
            src={previewUrl}
            alt="Selected"
            className="aspect-[4/3] w-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setUrlText("");
            }}
            aria-label="Remove image"
            className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {mode === "upload" && !previewUrl && (
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center text-sm transition-colors",
            dragging
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
              : "border-[var(--color-outline)] hover:border-[var(--color-primary)]"
          )}
        >
          {uploading ? (
            <span className="text-[var(--color-text-default)]/60">Uploading…</span>
          ) : (
            <>
              <PhotoIcon className="h-8 w-8 text-[var(--color-text-default)]/40" />
              <span className="font-medium">Drag & drop an image</span>
              <span className="text-[var(--color-text-default)]/50">
                or click to browse
              </span>
            </>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = "";
            }}
          />
        </button>
      )}

      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlText}
            onChange={(e) => setUrlText(e.target.value)}
            onBlur={applyUrl}
            placeholder="https://example.com/pet.jpg"
            className="w-full rounded-md border border-[var(--color-outline)] bg-[var(--color-surface-canvas)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      )}
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-[var(--color-container-highest)] font-medium text-[var(--color-primary)]"
          : "text-[var(--color-text-default)]/60 hover:bg-[var(--color-container)]"
      )}
    >
      {children}
    </button>
  );
}
