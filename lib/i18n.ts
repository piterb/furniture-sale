export type Locale = "en" | "de";

export const LOCALE_STORAGE_KEY = "furniture-sale-locale-v1";

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const language = navigator.language.toLowerCase();
  return language.startsWith("de") ? "de" : "en";
}
