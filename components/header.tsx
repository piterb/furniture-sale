type HeaderProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand-block">
        <span className="brand-eyebrow">Private Sale</span>
        <h1>Weeze Home Collection</h1>
      </div>

      <button type="button" className="cart-button" onClick={onOpenCart}>
        Cart <span className="cart-pill">{cartCount}</span>
      </button>
    </header>
  );
}
