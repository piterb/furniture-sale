"use client";

import { useMemo, useState } from "react";

import { CartDrawer } from "@/components/cart-drawer";
import { FilterBar } from "@/components/filter-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ItemGrid } from "@/components/item-grid";
import { useCart } from "@/hooks/use-cart";
import { DEFAULT_FILLOUT_URL, buildReservationUrl } from "@/lib/reservation";
import type { CatalogItem } from "@/lib/types";

type CatalogPageProps = {
  items: CatalogItem[];
};

type SortBy = "featured" | "price-asc" | "price-desc" | "name";
type StatusFilter = "all" | "available" | "reserved" | "sold";

export function CatalogPage({ items }: CatalogPageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("featured");

  const { items: cartItems, itemIds, itemCount, total, addItem, removeItem, clearCart } = useCart();

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const visibleItems = items.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      if (!matchesStatus) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [item.title, item.titleDe, item.description, item.descriptionDe, item.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    const sortedItems = [...visibleItems];
    switch (sortBy) {
      case "price-asc":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return sortedItems;
  }, [items, query, statusFilter, sortBy]);

  function handleAddToCart(item: CatalogItem) {
    addItem({ id: item.id, title: item.title, price: item.price });
    setIsCartOpen(true);
  }

  function handleContinueToReservation() {
    const filloutUrl = process.env.NEXT_PUBLIC_FILLOUT_URL || DEFAULT_FILLOUT_URL;
    const redirectUrl = buildReservationUrl(filloutUrl, cartItems);
    window.location.href = redirectUrl;
  }

  return (
    <div className="page-shell">
      <div className="background-orb orb-one" aria-hidden="true" />
      <div className="background-orb orb-two" aria-hidden="true" />

      <main className="page-content">
        <Header cartCount={itemCount} onOpenCart={() => setIsCartOpen(true)} />
        <Hero />

        <FilterBar
          query={query}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onQueryChange={setQuery}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
        />

        <ItemGrid items={filteredItems} cartItemIds={itemIds} onAddToCart={handleAddToCart} />

        <Footer />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        total={total}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeItem}
        onClear={clearCart}
        onContinue={handleContinueToReservation}
      />
    </div>
  );
}
