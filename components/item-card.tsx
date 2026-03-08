import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/types";
import { withBasePath } from "@/lib/assets";

import { StatusBadge } from "@/components/status-badge";

type ItemCardProps = {
  locale: Locale;
  item: CatalogItem;
  isInCart: boolean;
  onAddToCart: (item: CatalogItem) => void;
  onOpenDetails: (item: CatalogItem) => void;
};

export function ItemCard({ locale, item, isInCart, onAddToCart, onOpenDetails }: ItemCardProps) {
  const title = locale === "de" ? item.titleDe : item.title;
  const description = locale === "de" ? item.descriptionDe : item.description;
  const copy =
    locale === "de"
      ? {
          originalListing: "Originalanzeige",
          add: "In den Warenkorb",
          added: "Hinzugefügt"
        }
      : {
          originalListing: "Original listing",
          add: "Add to cart",
          added: "Added"
        };

  return (
    <article className="item-card">
      <button type="button" className="item-image-wrap detail-trigger" onClick={() => onOpenDetails(item)}>
        <img src={withBasePath(item.images[0])} alt={title} className="item-image" loading="lazy" />
      </button>

      <div className="item-content">
        <div className="item-title-row">
          <h3>
            <button type="button" className="title-trigger" onClick={() => onOpenDetails(item)}>
              {title}
            </button>
          </h3>
          <StatusBadge status={item.status} locale={locale} />
        </div>

        <p className="item-description">{description}</p>

        <div className="item-meta-row">
          <strong>{formatCurrency(item.price, item.currency)}</strong>
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noreferrer">
              {copy.originalListing}
            </a>
          ) : null}
        </div>

        <div className="item-note-slot">
          {item.notes ? (
            <p className="item-note">{item.notes}</p>
          ) : (
            <p className="item-note item-note-empty" aria-hidden="true">
              &nbsp;
            </p>
          )}
        </div>

        <button
          type="button"
          className="item-cta"
          disabled={isInCart || item.status !== "available"}
          onClick={() => onAddToCart(item)}
        >
          {isInCart ? copy.added : copy.add}
        </button>
      </div>
    </article>
  );
}
