"use client";

import { useEffect, useMemo, useState } from "react";

import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "furniture-sale-cart-v1";

function readStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry) => {
      return (
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.id === "string" &&
        typeof entry.title === "string" &&
        typeof entry.price === "number"
      );
    });
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const itemIds = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  function addItem(item: CartItem) {
    setItems((previousItems) => {
      if (previousItems.some((existingItem) => existingItem.id === item.id)) {
        return previousItems;
      }

      return [...previousItems, item];
    });
  }

  function removeItem(itemId: string) {
    setItems((previousItems) => previousItems.filter((item) => item.id !== itemId));
  }

  function clearCart() {
    setItems([]);
  }

  return {
    items,
    itemIds,
    itemCount: items.length,
    total,
    addItem,
    removeItem,
    clearCart
  };
}
