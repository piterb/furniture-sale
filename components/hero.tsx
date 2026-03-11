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
          text: "Nur Abholung in Weeze. Lege gewünschte Artikel in den Warenkorb und sende dann deine Reservierungsanfrage über Fillout. Nach dem Absenden des Formulars warte bitte auf die Bestätigung von Ort und Uhrzeit der Abholung."
        }
      : {
          kicker: "Moving Sale",
          title: "Selected furniture and home essentials from a smoke-free, pet-free home.",
          text: "Pickup only in Weeze. Add the items you want to reserve and continue to the Fillout form to send your request. After submitting the form, please wait for confirmation of the pickup place and time."
        };

  return (
    <section className="hero">
      <p className="hero-kicker">{copy.kicker}</p>
      <h2>{copy.title}</h2>
      <p>{copy.text}</p>
    </section>
  );
}
