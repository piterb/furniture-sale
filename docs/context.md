This file contains the authoritative description of the project.
Always read it before implementing any functionality.

# Project Context

This project is a small web application for a private furniture sale.

The goal is to create a clean catalog of items where users can:

- browse furniture
- add items to a cart
- submit a reservation request through a Fillout form

This is NOT a full e-commerce system.

There is no checkout, payment processing, or backend database.

The application is intentionally simple.

---

# Tech Stack

Frontend framework:
Next.js (TypeScript)

Rendering strategy:
Static export only.

The site must be generated as static HTML and deployable to static hosting (e.g. GitHub Pages or Netlify).

There is no backend server.

---

# Additional Documentation

There is a `docs` folder in the repository.

It contains the furniture catalog in **Markdown and PDF format**.

These files describe the items and may be used as reference for the data in the application.

---

# Architecture

The application has three main layers:

1. Data
2. UI
3. Reservation integration

Data is stored in JSON files inside the repository.

UI reads from the JSON data and renders catalog pages.

Reservations are handled externally through a Fillout form.

---

# Core User Flow

User journey:

Catalog  
→ Add items to cart  
→ Open cart  
→ Continue to reservation  
→ Redirect to Fillout form

The Fillout form receives selected items through URL parameters.

---

# Pages

The application only needs one main page:

/  → catalog page

Each item card already contains enough information (image, price, description).

A separate item detail page is NOT required.

---

# Data Source

The furniture catalog already exists inside the repository.

The `docs` folder contains the catalog in Markdown and PDF format.

These files are the **canonical source of data**.

The application should use exactly these items.

---

# Data Preparation

During development the content from the `docs` catalog should be converted into a structured JSON dataset.

Example location:

data/items.json

The JSON structure should be designed based on the information contained in the catalog files.

Typical fields expected in the dataset:

- id
- title
- titleDe
- description
- descriptionDe
- price
- currency
- status
- images

The goal is:

docs catalog  
→ structured JSON dataset  
→ rendered in the UI

The UI should rely only on the JSON dataset.

# Cart

Cart is client-side only.

It is stored in localStorage.

Cart contains:

- item id
- item title
- price

Cart functionality:

- add item
- remove item
- list items
- clear cart

---

# Reservation Integration

Reservations are handled by Fillout.

When the user clicks "Continue to reservation", the application redirects to a Fillout form.

Example redirect:

https://form.fillout.com/t/XXXXX?items=Oak Table,Office Chair&itemIds=table-01,chair-01

The cart builds this URL automatically.

---

# UI Philosophy

This project should look like a clean premium catalog, not a marketplace.

Design inspiration:

- Apple product pages
- Airbnb listing cards
- modern real estate catalogs

Key visual principles:

- large images
- generous whitespace
- simple typography
- minimal interface
- clear item cards

---

# Components

Expected UI components:

- Header
- Hero
- FilterBar
- ItemGrid
- ItemCard
- StatusBadge
- CartDrawer
- Footer

---

# Constraints

Do NOT add:

- backend
- database
- authentication
- CMS
- complex state management

Keep the architecture simple.

Static site + cart + external reservation form.

---

