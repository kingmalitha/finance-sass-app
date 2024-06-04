import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function formatCurrency(
  value: number,
  fromMiliunits?: boolean
) {
  const modifiedValue = fromMiliunits
    ? convertAmountFromMiliunits(value)
    : value;

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(modifiedValue);
}
