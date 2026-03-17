import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/types";
import { withBasePath } from "@/lib/assets";
import { canAddToCart, isAvailableLater } from "@/lib/availability";
import ReactMarkdown from "react-markdown";

import { StatusBadge } from "@/components/status-badge";

type ItemDetailModalProps = {
  locale: Locale;
  item: CatalogItem | null;
  isInCart: boolean;
  onClose: () => void;
  onAddToCart: (item: CatalogItem) => void;
};

export function ItemDetailModal({ locale, item, isInCart, onClose, onAddToCart }: ItemDetailModalProps) {
  if (!item) {
    return null;
  }

  const title = locale === "de" ? item.titleDe : item.title;
  const description = locale === "de" ? item.descriptionDe : item.description;
  const copy =
    locale === "de"
      ? {
          close: "Schließen",
          details: "Artikeldetail",
          source: "Originalanzeige",
          add: "In den Warenkorb",
          added: "Hinzugefügt"
        }
      : {
          close: "Close",
          details: "Item details",
          source: "Original listing",
          add: "Add to cart",
          added: "Added"
        };

  const canAdd = canAddToCart(item);
  const highlight = locale === "de" ? item.highlightDe || item.highlight : item.highlight || item.highlightDe;
  const showHighlight = Boolean(highlight && isAvailableLater(item.availableAfter));
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
    <>
      <div className="backdrop open" onClick={onClose} aria-hidden="true" />
      <section className="item-detail-modal" aria-label={copy.details} role="dialog" aria-modal="true">
        <div className="item-detail-head">
          <h3>{title}</h3>
          <button type="button" className="ghost-button" onClick={onClose}>
            {copy.close}
          </button>
        </div>

        <div className="item-detail-body">
          <div className={`item-detail-image-wrap${showImageStrike ? ` item-detail-image-wrap--${item.status}` : ""}`}>
            <img src={withBasePath(item.images[0])} alt={title} className="item-detail-image" />
            {showImageStrike ? (
              <span className={`item-image-strike item-image-strike--${item.status}`} aria-hidden="true">
                <span>{imageStatusLabel}</span>
              </span>
            ) : null}
          </div>

          <div className="item-detail-content">
            {showHighlight ? <p className="item-highlight">{highlight}</p> : null}
            <StatusBadge status={item.status} availableAfter={item.availableAfter} locale={locale} />
            <div className="item-detail-description">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
            <strong>{formatCurrency(item.price, item.currency)}</strong>

            {item.notes ? <p className="item-note">{item.notes}</p> : null}

            {item.sourceUrl ? (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="detail-link">
                {copy.source}
              </a>
            ) : null}

            <button
              type="button"
              className="primary-button"
              disabled={isInCart || !canAdd}
              onClick={() => onAddToCart(item)}
            >
              {isInCart ? copy.added : copy.add}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
