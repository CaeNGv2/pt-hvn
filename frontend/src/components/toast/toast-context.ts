import { createContext, useContext } from "react";

export type ToastTone = "default" | "success" | "error" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  /** Auto-dismiss delay in ms. Defaults to 4000. Pass 0 to disable auto-dismiss. */
  duration?: number;
  tone?: ToastTone;
}

export interface ToastItem extends Required<Omit<ToastOptions, "description">> {
  id: number;
  description?: string;
}

export interface ToastContextValue {
  /** Show a toast. Returns its id (so you can dismiss it early). */
  showToast: (opts: ToastOptions) => number;
  /** Dismiss a toast by id. */
  dismissToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Usage:
 *   const { showToast } = useToast();
 *   showToast({ title: "Request sent", description: "We'll be in touch." });
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>.");
  }
  return ctx;
}
