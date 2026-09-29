import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Round a number used in an inline style. Browsers normalise long floats
 * in style attributes, which would otherwise break hydration.
 */
export const r3 = (n: number) => Math.round(n * 1000) / 1000;
