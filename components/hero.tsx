import type { Locale } from "@/lib/i18n";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const copy =
    locale === "de"
      ? {
          kicker: "Umzugsverkauf",
          title: "Ausgewählte Möbel und Haushaltsartikel aus rauchfreiem, haustierfreiem Haushalt.",
          text: "Nur Abholung. Lege gewünschte Artikel in den Warenkorb und sende dann deine Reservierungsanfrage über Fillout."
        }
      : {
          kicker: "Moving Sale",
          title: "Selected furniture and home essentials from a smoke-free, pet-free home.",
          text: "Pickup only. Add the items you want to reserve and continue to the Fillout form to send your request."
        };

  return (
    <section className="hero">
      <p className="hero-kicker">{copy.kicker}</p>
      <h2>{copy.title}</h2>
      <p>{copy.text}</p>
    </section>
  );
}
