import { formatCurrency } from "@/lib/format";
import type { CartItem } from "@/lib/types";

type CartDrawerProps = {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onContinue: () => void;
};

export function CartDrawer({
  isOpen,
  items,
  total,
  onClose,
  onRemove,
  onClear,
  onContinue
}: CartDrawerProps) {
  return (
    <>
      <div className={`backdrop ${isOpen ? "open" : ""}`} onClick={onClose} aria-hidden="true" />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-label="Cart drawer">
        <div className="cart-header">
          <h3>Cart</h3>
          <button type="button" onClick={onClose} className="ghost-button">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
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
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>{formatCurrency(total, "EUR")}</strong>
          </div>

          <div className="cart-actions">
            <button type="button" className="ghost-button" onClick={onClear} disabled={items.length === 0}>
              Clear cart
            </button>
            <button type="button" className="primary-button" onClick={onContinue} disabled={items.length === 0}>
              Continue to reservation
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
