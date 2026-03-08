import type { Locale } from "@/lib/i18n";

type HeaderProps = {
  cartCount: number;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onOpenCart: () => void;
};

export function Header({ cartCount, locale, onLocaleChange, onOpenCart }: HeaderProps) {
  const copy =
    locale === "de"
      ? {
          eyebrow: "Privatverkauf",
          cart: "Warenkorb"
        }
      : {
          eyebrow: "Private Sale",
          cart: "Cart"
        };

  return (
    <header className="header">
      <div className="brand-block">
        <span className="brand-eyebrow">{copy.eyebrow}</span>
        <h1>Weeze Home Collection</h1>
      </div>

      <div className="header-actions">
        <div className="locale-switch" role="group" aria-label="Language switch">
          <button
            type="button"
            className={`locale-button ${locale === "en" ? "active" : ""}`}
            onClick={() => onLocaleChange("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`locale-button ${locale === "de" ? "active" : ""}`}
            onClick={() => onLocaleChange("de")}
          >
            DE
          </button>
        </div>

        <button type="button" className="cart-button" onClick={onOpenCart}>
          {copy.cart} <span className="cart-pill">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
