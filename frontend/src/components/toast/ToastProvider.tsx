import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

import {
  ToastContext,
  type ToastContextValue,
  type ToastItem,
  type ToastOptions,
} from "./toast-context";
import { ToastViewport } from "./ToastViewport";

const DEFAULT_DURATION = 4000;

/**
 * Provides the toast system and renders the floating viewport. Wrap the app
 * (inside the router is fine) with <ToastProvider>, then call `useToast()`.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  // Track timers so we can clear them on manual dismiss.
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismissToast = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (opts: ToastOptions) => {
      const id = nextId.current++;
      const toast: ToastItem = {
        id,
        title: opts.title,
        description: opts.description,
        tone: opts.tone ?? "default",
        duration: opts.duration ?? DEFAULT_DURATION,
      };
      setToasts((list) => [...list, toast]);

      if (toast.duration > 0) {
        const timer = setTimeout(() => dismissToast(id), toast.duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [dismissToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({ showToast, dismissToast }),
    [showToast, dismissToast]
  );

  return (
    <ToastContext value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext>
  );
}
