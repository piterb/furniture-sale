import type { CatalogItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { formatAvailableAfterDate, isAvailableLater } from "@/lib/availability";

type StatusBadgeProps = {
  status: CatalogItem["status"];
  availableAfter?: string;
  locale: Locale;
};

const STATUS_LABELS: Record<Locale, Record<CatalogItem["status"], string>> = {
  en: {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold"
  },
  de: {
    available: "Verfügbar",
    reserved: "Reserviert",
    sold: "Verkauft"
  }
};

export function StatusBadge({ status, availableAfter, locale }: StatusBadgeProps) {
  if (status === "available" && availableAfter && isAvailableLater(availableAfter)) {
    const dateText = formatAvailableAfterDate(availableAfter, locale);
    const text = locale === "de" ? `Verfügbar ab ${dateText}` : `Available after ${dateText}`;
    return <span className="status-badge status-scheduled">{text}</span>;
  }

  return <span className={`status-badge status-${status}`}>{STATUS_LABELS[locale][status]}</span>;
}
