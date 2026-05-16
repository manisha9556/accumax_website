# Product DB + Admin Migration Plan

This plan explains how to keep the current static product page design while moving product content, categories, and navbar products into MongoDB.

## Current Product Page Design

The static product pages use a consistent design pattern:

- Header
- Dark blue hero section
- Hero image
- Eyebrow label
- Product title
- Lead paragraph
- Product overview section
- Specification table
- Features card
- Applications card
- Product sidebar
- Footer
- Chat widget

Example pages:

- `src/app/products/pass-box/dynamic/straight-doors/page.tsx`
- `src/app/products/air-shower/straight-entry/page.tsx`

The dynamic DB product page should preserve this same layout and styling.

## Goal

Move product content and categories into MongoDB so admin can manage:

- Product categories
- Product page content
- Product specifications
- Features
- Applications
- Product images
- Navbar product menu visibility
- Product status

The frontend should then render products from DB while keeping the same static product page design.

## Phase 1: Create Reusable Product Detail Component

Create a reusable component:

```txt
src/components/product/DynamicProductDetail.jsx
```

This component should receive one `product` object and render the same layout as the static product pages.

It should include:

- `Header`
- Hero section
- `ProductSidebar`
- Overview section
- Specification table
- Features and applications cards
- `Footer`
- `ChatWidget`

It should use the same CSS classes currently used by static pages:

```txt
page
hero
overlay
heroInner
imageWrap
heroImage
heroContent
eyebrow
title
lead
contentSection
contentGrid
leftContent
section
container
sectionHeader
sectionLabel
sectionTitle
description
specSection
specCard
specRow
specLabel
specValue
gridSection
containerGrid
infoCard
cardLabel
cardTitle
list
```

## Phase 2: Create Product Category Model

Create:

```txt
src/models/ProductCategory.js
```

Suggested schema:

```js
{
  title: String,
  slug: String,
  status: "Active" | "Inactive",
  order: Number,
  parentCategory: ObjectId | null,
  timestamps: true
}
```

Why:

- Categories should come from DB instead of `src/data/categories.js`.
- Admin should be able to create new categories.
- Nested category support can be added later using `parentCategory`.

## Phase 3: Seed Current Categories Into DB

Current categories from `src/data/categories.js`:

```txt
Air Shower
Pass Box
Garment Storage Sterile Cabinet
Sampling / Dispensing Booth
Cross Over Bench
Laminar Air Flow Cabinet
Biosafety Cabinet
Portable Clean Room
ESD Storage Cabinet Anti Static
Fume Hood
Ductless Fume Hood
```

Create these in MongoDB as `ProductCategory` records.

This can be done with:

- A temporary seed API route
- A local script
- A one-time admin action

Recommended: create a temporary seed route, run it once, then remove or protect it.

## Phase 4: Add Product Category API

Create:

```txt
src/app/api/product-category/route.js
```

Methods:

```txt
GET     /api/product-category
POST    /api/product-category
PUT     /api/product-category
DELETE  /api/product-category
```

Expected behavior:

- `GET`: return active/all categories sorted by `order`.
- `POST`: create category.
- `PUT`: update title, slug, status, order, parent category.
- `DELETE`: delete category.

Standard response:

```json
{
  "success": true,
  "data": []
}
```

Error response:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Phase 5: Expand Product Model

Update:

```txt
src/models/Product.js
```

Add fields needed to render the current static product page design from DB:

```js
{
  title: String,
  slug: String,
  slugPath: String,
  category: String,
  categoryId: ObjectId,
  status: "Active" | "Inactive",
  heroImage: String,
  images: [String],
  eyebrow: String,
  lead: String,
  overviewTitle: String,
  overviewParagraphs: [String],
  specifications: [
    {
      label: String,
      value: String
    }
  ],
  features: [String],
  applications: [String],
  metaTitle: String,
  metaDescription: String,
  order: Number,
  showInMenu: Boolean
}
```

Important:

- `slugPath` should map to the URL after `/products/`.
- Example: `/products/pass-box/dynamic/straight-doors` uses `slugPath: "pass-box/dynamic/straight-doors"`.
- `heroImage` should be the main image used in the hero.
- `images` can store extra gallery images later.

## Phase 6: Update Product API

Update:

```txt
src/app/api/product/route.js
```

The admin product API should save:

- Basic product details
- Category ID and category title
- Slug and slug path
- Hero image
- Extra images
- Overview content
- Specifications
- Features
- Applications
- SEO fields
- Status
- Menu visibility

Also keep:

```txt
GET /api/products
GET /api/products/[...slug]
```

These public APIs should only return active products.

## Phase 7: Update Admin Product Forms

Update:

```txt
src/app/admin/products/add/page.jsx
src/app/admin/products/edit/[id]/page.jsx
```

Admin product form should include:

- Product title
- URL slug
- Full slug path
- Category dropdown from DB
- Status dropdown
- Show in menu checkbox
- Hero image upload
- Extra image uploads
- Eyebrow text
- Lead paragraph
- Overview section title
- Multiple overview paragraphs
- Dynamic specification rows
- Dynamic features list
- Dynamic applications list
- Meta title
- Meta description

Important:

- Category dropdown should fetch from `/api/product-category`.
- It should no longer import `src/data/categories.js`.
- Specifications/features/applications should allow add/remove rows.

## Phase 8: Add Product Category Admin Page

Create:

```txt
src/app/admin/product-category/page.jsx
```

Admin should be able to:

- View product categories
- Add category
- Edit category
- Delete category
- Change status
- Set order

Optional:

- Add category nesting later using parent category.

## Phase 9: Generate Navbar Menu From DB

Update:

```txt
src/app/api/product-menu/route.js
```

Instead of relying on `ProductMenu` records only, generate the public menu from:

- Active product categories
- Active products where `showInMenu: true`

Return the same shape as current `MenuData.js`:

```json
[
  {
    "title": "Air Shower",
    "children": [
      {
        "title": "Straight Entry",
        "href": "/products/air-shower/straight-entry"
      }
    ]
  }
]
```

Why:

- `Header.tsx` and `Dropdown.jsx` can keep working.
- Navbar becomes DB-driven.
- Admin controls whether a product appears in the menu.

## Phase 10: Update Dynamic Product Page

Update:

```txt
src/app/products/[...slug]/page.jsx
```

It should:

- Fetch product by `slugPath`
- Pass product to `DynamicProductDetail`
- Render DB content using the same static page design
- Return 404 if product is missing or inactive

3. Remove one static product page at a time.
4. Test its URL.
5. Continue until all product pages are DB-backed.

## Suggested Implementation Order

1. Create `ProductCategory` model.
2. Create `/api/product-category`.
3. Seed current categories into DB.
4. Update admin add/edit product forms to fetch categories from DB.
5. Expand `Product` model.
6. Update admin product API to save full page content.
7. Create reusable `DynamicProductDetail` component.
8. Update `/products/[...slug]` to use the reusable design component.
9. Update `/api/product-menu` to generate menu from DB categories/products.
10. Create product category admin page.
11. Migrate static product pages into DB.
12. Remove static pages after verification.

## Testing Checklist

- Product category API works.
- Admin can create a new product category.
- Admin product form loads categories from DB.
- Admin can create product with specs/features/applications.
- Uploaded hero image appears on dynamic product page.
- Dynamic page matches static product page design.
- Navbar product menu shows DB categories/products.
- Inactive products do not show publicly.
- Products with `showInMenu: false` do not show in navbar.
- Existing static pages still work during migration.
- DB-only product URLs work through `/products/[...slug]`.
- `npm run build` passes.

## Final Target Architecture

```txt
MongoDB
  Product
  ProductCategory

Admin
  /admin/products
  /admin/products/add
  /admin/products/edit/[id]
  /admin/product-category

APIs
  /api/product
  /api/products
  /api/products/[...slug]
  /api/product-category
  /api/product-menu

Frontend
  Header.tsx fetches /api/product-menu
  Dropdown.jsx renders recursive menu
  products/[...slug]/page.jsx renders DB product
  DynamicProductDetail.jsx preserves static product design
```

This keeps the current product page design intact while making products and categories fully manageable from admin.
