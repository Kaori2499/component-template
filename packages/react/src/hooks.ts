import { useEffect, useState } from "react";
import { ToastState } from "./state";
import type { ToastT } from "./types";

/** Subscribe to the toast store without owning the UI. */
export function useToasts(): ToastT[] {
  const [toasts, setToasts] = useState<ToastT[]>(ToastState.toasts);

  useEffect(() => ToastState.subscribe(setToasts), []);

  return toasts;
}