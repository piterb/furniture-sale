"use client";

import { useEffect, useMemo, useState } from "react";

import { CartDrawer } from "@/components/cart-drawer";
import { FilterBar } from "@/components/filter-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ItemDetailModal } from "@/components/item-detail-modal";
import { ItemGrid } from "@/components/item-grid";
import { useCart } from "@/hooks/use-cart";
import { LOCALE_STORAGE_KEY, detectBrowserLocale, type Locale } from "@/lib/i18n";
import { DEFAULT_FILLOUT_URL, buildReservationUrl } from "@/lib/reservation";
import type { CatalogItem } from "@/lib/types";

type CatalogPageProps = {
  items: CatalogItem[];
};

type SortBy = "featured" | "price-asc" | "price-desc" | "name";
type StatusFilter = "all" | "available" | "reserved" | "sold";

export function CatalogPage({ items }: CatalogPageProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("featured");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale === "en" || savedLocale === "de") {
      setLocale(savedLocale);
      return;
    }

    const detectedLocale = detectBrowserLocale();
    setLocale(detectedLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, detectedLocale);
  }, []);

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
        sortedItems.sort((a, b) => {
          const titleA = locale === "de" ? a.titleDe : a.title;
          const titleB = locale === "de" ? b.titleDe : b.title;
          return titleA.localeCompare(titleB);
        });
        break;
      default:
        break;
    }

    return sortedItems;
  }, [items, locale, query, statusFilter, sortBy]);

  function handleLocaleChange(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  }

  function handleAddToCart(item: CatalogItem) {
    addItem({
      id: item.id,
      title: `${item.title} / ${item.titleDe}`,
      price: item.price
    });
    setIsCartOpen(true);
  }

  function handleOpenDetails(item: CatalogItem) {
    setSelectedItem(item);
  }

  function handleCloseDetails() {
    setSelectedItem(null);
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
        <Header
          cartCount={itemCount}
          locale={locale}
          onLocaleChange={handleLocaleChange}
          onOpenCart={() => setIsCartOpen(true)}
        />
        <Hero locale={locale} />

        <FilterBar
          locale={locale}
          query={query}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onQueryChange={setQuery}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
        />

        <ItemGrid
          locale={locale}
          items={filteredItems}
          cartItemIds={itemIds}
          onAddToCart={handleAddToCart}
          onOpenDetails={handleOpenDetails}
        />

        <Footer locale={locale} />
      </main>

      <CartDrawer
        locale={locale}
        isOpen={isCartOpen}
        items={cartItems}
        total={total}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeItem}
        onClear={clearCart}
        onContinue={handleContinueToReservation}
      />

      <ItemDetailModal
        locale={locale}
        item={selectedItem}
        isInCart={selectedItem ? itemIds.has(selectedItem.id) : false}
        onClose={handleCloseDetails}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
