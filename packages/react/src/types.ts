export type ToastType = "default" | "success" | "error";

export type ToastT = {
  id: string | number;
  message: string;
  type: ToastType;
  createdAt: number;
};

export type ExternalToast = {
  id?: string | number;
  type?: ToastType;
};

export type ToasterProps = {
  /** Max visible toasts (older ones stay in the store until dismissed). */
  visibleToasts?: number;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
};