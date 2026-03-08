import itemsData from "@/data/items.json";
import { CatalogPage } from "@/components/catalog-page";
import type { CatalogItem } from "@/lib/types";

const items = itemsData as CatalogItem[];

export default function HomePage() {
  return <CatalogPage items={items} />;
}
