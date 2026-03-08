# Furniture Sale Catalog

Static Next.js catalog for a private furniture sale.

## Stack

- Next.js + TypeScript
- Static export (`output: "export"`)
- Client-side cart in `localStorage`
- External reservation handoff to Fillout

## Development

```bash
npm install
npm run dev
```

## Build static site

```bash
npm run build
```

The static output is generated under `out/`.

## GitHub Pages

Workflows are included in `.github/workflows`:

- `ci.yml` for build checks on push/PR
- `deploy-pages.yml` for automatic deploy from `main`

In GitHub repository settings, set `Pages -> Source` to `GitHub Actions`.

## Fillout integration

Set the Fillout form URL with an environment variable:

```bash
NEXT_PUBLIC_FILLOUT_URL=https://forms.fillout.com/t/xxx123
```

When users continue from the cart, the app redirects with query parameters:

- `items`: comma-separated item titles
- `itemIds`: comma-separated item ids

## Data source

Catalog data is in `data/items.json` and was normalized from the markdown/PDF catalog in `docs/`.

### Temporarily hide an item

If you want to keep an item in data but not show it in the catalog yet, set:

```json
"hidden": true
```

for that item in `data/items.json`.

### Delay availability until a date

If an item should be shown but not purchasable yet, set:

```json
"availableAfter": "2026-04-15"
```

The item stays visible, shows a badge `Available after <date>`, and `Add to cart` is disabled until that date.

Optional highlight shown under the item title while blocked:

```json
"highlight": "This item will be available from April 27. If you are interested, please write it in the note when sending the cart."
```

For bilingual projects, use both:

```json
"highlight": "EN text",
"highlightDe": "DE text"
```
