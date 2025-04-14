import { callEndedReason } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getcallEndedReason = (value: string): string => {
  return callEndedReason[value] ?? "Unknown";
};

