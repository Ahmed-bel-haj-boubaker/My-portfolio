export { cn } from "cn"

/** True for empty values and content still marked "[FILL IN ...]". */
export function isPlaceholder(value?: string | null): boolean {
  return !value || value.trimStart().startsWith("[FILL IN")
}

/** Keeps only values that are real (not placeholders). */
export function filled<T extends string>(value?: T | null): T | undefined {
  return isPlaceholder(value) ? undefined : (value as T)
}
