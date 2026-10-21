import type { ExternalToast, ToastT, ToastType } from "./types";

type Subscriber = (toasts: ToastT[]) => void;

let counter = 0;

function nextId(): number {
  counter += 1;
  return counter;
}

/** Module-singleton Observer — call toast() from anywhere; Toaster just subscribes. */
class Observer {
  subscribers = new Set<Subscriber>();
  toasts: ToastT[] = [];

  subscribe = (fn: Subscriber): (() => void) => {
    this.subscribers.add(fn);
    fn(this.toasts);
    return () => {
      this.subscribers.delete(fn);
    };
  };

  private publish() {
    for (const fn of this.subscribers) {
      fn(this.toasts);
    }
  }

  add(message: string, opts: ExternalToast = {}): string | number {
    const id = opts.id ?? nextId();
    const type: ToastType = opts.type ?? "default";
    const existing = this.toasts.findIndex((t) => t.id === id);

    if (existing !== -1) {
      this.toasts = this.toasts.map((t) =>
        t.id === id ? { ...t, message, type } : t,
      );
    } else {
      this.toasts = [{ id, message, type, createdAt: Date.now() }, ...this.toasts];
    }

    this.publish();
    return id;
  }

  dismiss(id?: string | number) {
    if (id === undefined) {
      this.toasts = [];
    } else {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }
    this.publish();
  }
}

export const ToastState = new Observer();

function createToast() {
  const fn = (message: string, opts?: ExternalToast) =>
    ToastState.add(message, opts);

  fn.success = (message: string, opts?: ExternalToast) =>
    ToastState.add(message, { ...opts, type: "success" });

  fn.error = (message: string, opts?: ExternalToast) =>
    ToastState.add(message, { ...opts, type: "error" });

  fn.dismiss = (id?: string | number) => ToastState.dismiss(id);

  return fn;
}

/** Imperative API: toast("hi"), toast.success("ok"), toast.dismiss() */
export const toast = createToast();