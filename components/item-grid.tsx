import type { CatalogItem } from "@/lib/types";

import { ItemCard } from "@/components/item-card";

type ItemGridProps = {
  items: CatalogItem[];
  cartItemIds: Set<string>;
  onAddToCart: (item: CatalogItem) => void;
};

export function ItemGrid({ items, cartItemIds, onAddToCart }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h3>No items found</h3>
        <p>Try adjusting search text or status filters.</p>
      </section>
    );
  }

  return (
    <section className="item-grid" aria-label="Furniture catalog">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} isInCart={cartItemIds.has(item.id)} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}
