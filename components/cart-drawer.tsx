import { formatCurrency } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { CartItem } from "@/lib/types";

type CartDrawerProps = {
  locale: Locale;
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onContinue: () => void;
};

export function CartDrawer({
  locale,
  isOpen,
  items,
  total,
  onClose,
  onRemove,
  onClear,
  onContinue
}: CartDrawerProps) {
  const copy =
    locale === "de"
      ? {
          ariaLabel: "Warenkorb",
          cart: "Warenkorb",
          close: "Schließen",
          empty: "Dein Warenkorb ist leer.",
          remove: "Entfernen",
          total: "Gesamt",
          clear: "Warenkorb leeren",
          continue: "Weiter zur Reservierung"
        }
      : {
          ariaLabel: "Cart drawer",
          cart: "Cart",
          close: "Close",
          empty: "Your cart is empty.",
          remove: "Remove",
          total: "Total",
          clear: "Clear cart",
          continue: "Continue to reservation"
        };

  return (
    <>
      <div className={`backdrop ${isOpen ? "open" : ""}`} onClick={onClose} aria-hidden="true" />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-label={copy.ariaLabel}>
        <div className="cart-header">
          <h3>{copy.cart}</h3>
          <button type="button" onClick={onClose} className="ghost-button">
            {copy.close}
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>{copy.empty}</p>
          </div>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <p>{item.title}</p>
                  <span>{formatCurrency(item.price, "EUR")}</span>
                </div>
                <button type="button" onClick={() => onRemove(item.id)}>
                  {copy.remove}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-footer">
          <div className="cart-total">
            <span>{copy.total}</span>
            <strong>{formatCurrency(total, "EUR")}</strong>
          </div>

          <div className="cart-actions">
            <button type="button" className="ghost-button" onClick={onClear} disabled={items.length === 0}>
              {copy.clear}
            </button>
            <button type="button" className="primary-button" onClick={onContinue} disabled={items.length === 0}>
              {copy.continue}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
