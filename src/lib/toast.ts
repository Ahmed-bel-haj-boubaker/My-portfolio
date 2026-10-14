import type { toast as Toast } from "sonner"

/** Loads sonner on first use, so it stays out of the initial bundle. */
export function notify(show: (toast: typeof Toast) => void) {
  void import("sonner").then(({ toast }) => show(toast))
}
