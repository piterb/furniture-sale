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
          text: "Nur Abholung in Weeze. Lege gewünschte Artikel in den Warenkorb und sende dann deine Reservierungsanfrage über Fillout. Nach dem Absenden des Formulars warte bitte auf die Bestätigung von Ort und Uhrzeit der Abholung.",
          contactLabel: "Fragen? Kontaktiere uns",
          contactSub: "Wir melden uns so schnell wie möglich.",
        }
      : {
          kicker: "Moving Sale",
          title: "Selected furniture and home essentials from a smoke-free, pet-free home.",
          text: "Pickup only in Weeze. Add the items you want to reserve and continue to the Fillout form to send your request. After submitting the form, please wait for confirmation of the pickup place and time.",
          contactLabel: "Have a question? Get in touch",
          contactSub: "We'll get back to you as soon as possible.",
        };

  return (
    <section className="hero">
      <p className="hero-kicker">{copy.kicker}</p>
      <h2>{copy.title}</h2>
      <p>{copy.text}</p>

      <details className="contact-block">
        <summary className="contact-toggle">{copy.contactLabel}</summary>
        <p className="contact-sub">{copy.contactSub}</p>
        <iframe
          src="https://forms.fillout.com/t/1YRn9Hz1n3us?embed=1"
          width="100%"
          height="500"
          frameBorder={0}
          title="Contact form"
          className="contact-iframe"
        />
      </details>
    </section>
  );
}
