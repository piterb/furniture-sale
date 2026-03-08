import type { Locale } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/types";

function parseDateOnly(input: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (match) {
    const [, y, m, d] = match;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  const fallback = new Date(input);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function startOfDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function isAvailableLater(availableAfter?: string, now: Date = new Date()): boolean {
  if (!availableAfter) {
    return false;
  }

  const availableDate = parseDateOnly(availableAfter);
  if (!availableDate) {
    return false;
  }

  return startOfDay(now) < startOfDay(availableDate);
}

export function canAddToCart(item: CatalogItem, now: Date = new Date()): boolean {
  return item.status === "available" && !isAvailableLater(item.availableAfter, now);
}

export function formatAvailableAfterDate(availableAfter: string, locale: Locale): string {
  const value = parseDateOnly(availableAfter);
  if (!value) {
    return availableAfter;
  }

  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    dateStyle: "medium"
  }).format(value);
}
