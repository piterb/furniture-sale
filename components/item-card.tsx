import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/types";
import { withBasePath } from "@/lib/assets";
import { canAddToCart } from "@/lib/availability";

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
          detail: "Detail",
          add: "In den Warenkorb",
          added: "Hinzugefügt"
        }
      : {
          originalListing: "Original listing",
          detail: "Detail",
          add: "Add to cart",
          added: "Added"
        };

  const canAdd = canAddToCart(item);
  const descriptionPreview = toPreviewText(description, 130);
  const showImageStrike = item.status === "reserved" || item.status === "sold";
  const imageStatusLabel =
    locale === "de"
      ? item.status === "reserved"
        ? "Reserviert"
        : "Verkauft"
      : item.status === "reserved"
        ? "Reserved"
        : "Sold";

  return (
    <article className="item-card">
      <button
        type="button"
        className={`item-image-wrap detail-trigger${showImageStrike ? ` item-image-wrap--${item.status}` : ""}`}
        onClick={() => onOpenDetails(item)}
      >
        <img src={withBasePath(item.images[0])} alt={title} className="item-image" loading="lazy" />
        {showImageStrike ? (
          <span className={`item-image-strike item-image-strike--${item.status}`} aria-hidden="true">
            <span>{imageStatusLabel}</span>
          </span>
        ) : null}
      </button>

      <div className="item-content">
        <div className="item-title-row">
          <h3>
            <button type="button" className="title-trigger" onClick={() => onOpenDetails(item)} title={title}>
              {title}
            </button>
          </h3>
          <StatusBadge status={item.status} availableAfter={item.availableAfter} locale={locale} />
        </div>

        <p className="item-description">
          {descriptionPreview.text}
          {descriptionPreview.isTrimmed ? (
            <>
              {"... "}
              <button type="button" className="detail-inline-link" onClick={() => onOpenDetails(item)}>
                {copy.detail}
              </button>
            </>
          ) : null}
        </p>

        <div className="item-meta-row">
          <strong>{formatCurrency(item.price, item.currency)}</strong>
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noreferrer">
              {copy.originalListing}
            </a>
          ) : null}
        </div>

        <button
          type="button"
          className="item-cta"
          disabled={isInCart || !canAdd}
          onClick={() => onAddToCart(item)}
        >
          {isInCart ? copy.added : copy.add}
        </button>
      </div>
    </article>
  );
}

function toPreviewText(markdown: string, maxChars: number) {
  const flattened = markdown
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[*_`>#~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (flattened.length <= maxChars) {
    return { text: flattened, isTrimmed: false };
  }

  const sliced = flattened.slice(0, maxChars).trimEnd();
  const lastSpace = sliced.lastIndexOf(" ");
  const shortened = lastSpace > 0 ? sliced.slice(0, lastSpace).trimEnd() : sliced;
  return { text: shortened, isTrimmed: true };
}
