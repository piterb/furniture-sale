import type { Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const text =
    locale === "de"
      ? "Nur Abholung in Weeze. Reservierungsanfragen werden über Fillout bearbeitet."
      : "Pickup only in Weeze. Reservation requests are handled through Fillout.";

  return (
    <footer className="footer">
      <p>{text}</p>
    </footer>
  );
}
