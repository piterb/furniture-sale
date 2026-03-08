import type { Locale } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/types";

import { ItemCard } from "@/components/item-card";

type ItemGridProps = {
  locale: Locale;
  items: CatalogItem[];
  cartItemIds: Set<string>;
  onAddToCart: (item: CatalogItem) => void;
  onOpenDetails: (item: CatalogItem) => void;
};

export function ItemGrid({ locale, items, cartItemIds, onAddToCart, onOpenDetails }: ItemGridProps) {
  const copy =
    locale === "de"
      ? {
          noItems: "Keine Artikel gefunden",
          hint: "Passe Suche oder Filter an.",
          ariaLabel: "Möbelkatalog"
        }
      : {
          noItems: "No items found",
          hint: "Try adjusting search text or status filters.",
          ariaLabel: "Furniture catalog"
        };

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h3>{copy.noItems}</h3>
        <p>{copy.hint}</p>
      </section>
    );
  }

  return (
    <section className="item-grid" aria-label={copy.ariaLabel}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          locale={locale}
          item={item}
          isInCart={cartItemIds.has(item.id)}
          onAddToCart={onAddToCart}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </section>
  );
}
