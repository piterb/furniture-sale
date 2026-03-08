import type { CatalogItem } from "@/lib/types";

type StatusBadgeProps = {
  status: CatalogItem["status"];
};

const STATUS_LABELS: Record<CatalogItem["status"], string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status}`}>{STATUS_LABELS[status]}</span>;
}
