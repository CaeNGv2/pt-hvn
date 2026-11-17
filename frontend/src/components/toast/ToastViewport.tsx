import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/cn";
import type { ToastItem, ToastTone } from "./toast-context";

const toneIcon: Record<ToastTone, ComponentType<SVGProps<SVGSVGElement>> | null> = {
  default: null,
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const toneAccent: Record<ToastTone, string> = {
  default: "text-[var(--color-text-default)]",
  success: "text-emerald-500",
  error: "text-red-500",
  info: "text-[var(--color-primary)]",
};

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

/**
 * Floating stack of toasts, bottom-right. Rendered once by ToastProvider.
 * Fixed-position + high z-index so it sits above everything.
 */
export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-[min(92vw,22rem)] flex-col gap-2"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon = toneIcon[toast.tone];
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 rounded-lg border border-[var(--color-outline)] bg-[var(--color-surface)] p-3 text-[var(--color-text-default)] shadow-lg"
          >
            {Icon && (
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", toneAccent[toast.tone])} />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-sm text-[var(--color-text-default)]/70">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded p-0.5 text-[var(--color-text-default)]/50 hover:text-[var(--color-text-default)]"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
