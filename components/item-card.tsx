import { formatCurrency } from "@/lib/format";
import type { CatalogItem } from "@/lib/types";

import { StatusBadge } from "@/components/status-badge";

type ItemCardProps = {
  item: CatalogItem;
  isInCart: boolean;
  onAddToCart: (item: CatalogItem) => void;
};

export function ItemCard({ item, isInCart, onAddToCart }: ItemCardProps) {
  return (
    <article className="item-card" style={{ animationDelay: `${(item.price % 11) * 35}ms` }}>
      <div className="item-image-wrap">
        <img src={item.images[0]} alt={item.title} className="item-image" loading="lazy" />
      </div>

      <div className="item-content">
        <div className="item-title-row">
          <h3>{item.title}</h3>
          <StatusBadge status={item.status} />
        </div>

        <p className="item-title-de">{item.titleDe}</p>
        <p className="item-description">{item.description}</p>

        <div className="item-meta-row">
          <strong>{formatCurrency(item.price, item.currency)}</strong>
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noreferrer">
              Original listing
            </a>
          ) : null}
        </div>

        {item.notes ? <p className="item-note">{item.notes}</p> : null}

        <button
          type="button"
          className="item-cta"
          disabled={isInCart || item.status !== "available"}
          onClick={() => onAddToCart(item)}
        >
          {isInCart ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
