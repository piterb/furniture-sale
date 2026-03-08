export type ItemStatus = "available" | "reserved" | "sold";

export interface CatalogItem {
  id: string;
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
  price: number;
  currency: string;
  status: ItemStatus;
  images: string[];
  sourceUrl?: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
}
