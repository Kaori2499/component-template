import { useEffect, useState } from "react";
import { ToastState } from "./state";
import type { ToastT, ToasterProps } from "./types";

function Toast({ toast }: { toast: ToastT }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <li
      data-sonner-like-toast=""
      data-type={toast.type}
      data-mounted={mounted ? "" : undefined}
      role="status"
      aria-live="polite"
    >
      <span data-content="">{toast.message}</span>
      <button
        type="button"
        data-close=""
        aria-label="Dismiss"
        onClick={() => ToastState.dismiss(toast.id)}
      >
        ×
      </button>
    </li>
  );
}

export function Toaster({
  visibleToasts = 3,
  position = "bottom-right",
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastT[]>([]);

  useEffect(() => ToastState.subscribe(setToasts), []);

  const visible = toasts.slice(0, visibleToasts);

  return (
    <section aria-label="Notifications" tabIndex={-1}>
      <ol data-component-template-toaster="" data-position={position}>
        {visible.map((t) => (
          <Toast key={t.id} toast={t} />
        ))}
      </ol>
    </section>
  );
}