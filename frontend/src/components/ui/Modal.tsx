import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * Sample accessible dialog built on Headless UI. Focus trapping, Esc-to-close,
 * and ARIA wiring are handled for us; we only style the surface with tokens.
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <Modal open={open} onClose={() => setOpen(false)} title="Confirm">
 *     ...content...
 *   </Modal>
 */
export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-[var(--color-surface)] p-6 text-[var(--color-text-default)] shadow-xl">
          {title && (
            <DialogTitle className="mb-3 text-lg font-semibold">
              {title}
            </DialogTitle>
          )}
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
