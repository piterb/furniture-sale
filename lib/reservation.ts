import type { CartItem } from "@/lib/types";

export const DEFAULT_FILLOUT_URL = "https://forms.fillout.com/t/f61wqtPk4Nus";

export function buildReservationUrl(baseUrl: string, cartItems: CartItem[]): string {
  const url = new URL(baseUrl);
  const items = cartItems.map((item) => item.title).join(",");
  const itemIds = cartItems.map((item) => item.id).join(",");

  url.searchParams.set("items", items);
  url.searchParams.set("itemIds", itemIds);

  return url.toString();
}
