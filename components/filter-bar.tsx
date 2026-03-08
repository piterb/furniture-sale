type FilterBarProps = {
  query: string;
  statusFilter: "all" | "available" | "reserved" | "sold";
  sortBy: "featured" | "price-asc" | "price-desc" | "name";
  onQueryChange: (query: string) => void;
  onStatusChange: (status: "all" | "available" | "reserved" | "sold") => void;
  onSortChange: (sortBy: "featured" | "price-asc" | "price-desc" | "name") => void;
};

export function FilterBar({
  query,
  statusFilter,
  sortBy,
  onQueryChange,
  onStatusChange,
  onSortChange
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Catalog filters">
      <label className="field">
        <span>Search</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search furniture or keyword"
        />
      </label>

      <label className="field">
        <span>Status</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as FilterBarProps["statusFilter"])}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
      </label>

      <label className="field">
        <span>Sort</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as FilterBarProps["sortBy"])}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name">Name</option>
        </select>
      </label>
    </section>
  );
}
