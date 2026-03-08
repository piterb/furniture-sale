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

## Fillout integration

Set the Fillout form URL with an environment variable:

```bash
NEXT_PUBLIC_FILLOUT_URL=https://forms.fillout.com/t/f61wqtPk4Nus
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
