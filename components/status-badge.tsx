import type { CatalogItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

type StatusBadgeProps = {
  status: CatalogItem["status"];
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

export function StatusBadge({ status, locale }: StatusBadgeProps) {
  return <span className={`status-badge status-${status}`}>{STATUS_LABELS[locale][status]}</span>;
}
