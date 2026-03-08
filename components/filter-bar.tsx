import type { Locale } from "@/lib/i18n";

type FilterBarProps = {
  locale: Locale;
  query: string;
  statusFilter: "all" | "available" | "reserved" | "sold";
  sortBy: "featured" | "price-asc" | "price-desc" | "name";
  onQueryChange: (query: string) => void;
  onStatusChange: (status: "all" | "available" | "reserved" | "sold") => void;
  onSortChange: (sortBy: "featured" | "price-asc" | "price-desc" | "name") => void;
};

export function FilterBar({
  locale,
  query,
  statusFilter,
  sortBy,
  onQueryChange,
  onStatusChange,
  onSortChange
}: FilterBarProps) {
  const copy =
    locale === "de"
      ? {
          ariaLabel: "Katalogfilter",
          search: "Suche",
          searchPlaceholder: "Möbel oder Stichwort suchen",
          status: "Status",
          sort: "Sortierung",
          all: "Alle",
          available: "Verfügbar",
          reserved: "Reserviert",
          sold: "Verkauft",
          featured: "Standard",
          lowToHigh: "Preis: Niedrig nach hoch",
          highToLow: "Preis: Hoch nach niedrig",
          name: "Name"
        }
      : {
          ariaLabel: "Catalog filters",
          search: "Search",
          searchPlaceholder: "Search furniture or keyword",
          status: "Status",
          sort: "Sort",
          all: "All",
          available: "Available",
          reserved: "Reserved",
          sold: "Sold",
          featured: "Featured",
          lowToHigh: "Price: Low to high",
          highToLow: "Price: High to low",
          name: "Name"
        };

  return (
    <section className="filter-bar" aria-label={copy.ariaLabel}>
      <label className="field">
        <span>{copy.search}</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={copy.searchPlaceholder}
        />
      </label>

      <label className="field">
        <span>{copy.status}</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as FilterBarProps["statusFilter"])}
        >
          <option value="all">{copy.all}</option>
          <option value="available">{copy.available}</option>
          <option value="reserved">{copy.reserved}</option>
          <option value="sold">{copy.sold}</option>
        </select>
      </label>

      <label className="field">
        <span>{copy.sort}</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as FilterBarProps["sortBy"])}
        >
          <option value="featured">{copy.featured}</option>
          <option value="price-asc">{copy.lowToHigh}</option>
          <option value="price-desc">{copy.highToLow}</option>
          <option value="name">{copy.name}</option>
        </select>
      </label>
    </section>
  );
}
