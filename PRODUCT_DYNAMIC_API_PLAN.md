# Product Dynamic API Plan

This plan explains how to convert the current hardcoded "Our Products" navbar and product screens into an API-driven system.

## Current Situation

- The navbar product menu comes from `src/components/Navbar/MenuData.js`.
- `Header.tsx` imports that static `menuData`.
- `Dropdown.jsx` renders the menu recursively.
- Many product pages are static files inside `src/app/products/...`.
- `/api/product` exists, but the navbar is not using it.
- `src/app/products/[slug]/page.jsx` reads product data directly from MongoDB for single-segment product URLs.

## Goal

Make products dynamic so admin/database data controls:

- Product menu items in the navbar.
- Product detail page content.
- Product categories and nested product links.
- Active/inactive product visibility.

## Recommended Data Flow

1. Admin creates or updates products in the admin panel.
2. Product data is stored in MongoDB.
3. Public API returns active products/menu structure.
4. `Header.tsx` fetches the menu API.
5. Product detail page loads product data dynamically by URL slug.

## Phase 1: Product Menu API

Create a menu API that returns data in the same shape as current `menuData`.

New API:

```txt
GET /api/product-menu
```

Example response:

```json
{
  "success": true,
  "data": [
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
}
```

Why this first:

- `Dropdown.jsx` can keep working with very small changes.
- `Header.tsx` only needs to fetch data instead of importing static data.
- Existing UI design stays the same.

## Phase 2: Add Product Menu Model

Create a new model:

```txt
src/models/ProductMenu.js
```

Suggested schema:

```js
{
  title: String,
  href: String,
  order: Number,
  status: "Active" | "Inactive",
  children: [
    {
      title: String,
      href: String,
      order: Number,
      status: "Active" | "Inactive",
      children: []
    }
  ]
}
```

Important:

- Parent menu items can have `href` or only act as group headings.
- Child menu items should usually link to product pages.
- Only `Active` menu items should show publicly.

## Phase 3: Dynamic Header Fetch

Update:

```txt
src/components/Header/Header.tsx
```

Change from:

```js
import { menuData } from '../Navbar/MenuData';
```

To:

```js
const [productMenu, setProductMenu] = useState([]);
```

Then fetch:

```txt
/api/product-menu
```

Behavior:

- Show product menu from API.
- Keep static `MenuData.js` as fallback during migration.
- After testing, remove static fallback.

## Phase 4: Product Detail Routing

Current dynamic route:

```txt
src/app/products/[slug]/page.jsx
```

Problem:

- It only supports one URL segment, like `/products/portable-clean-room`.
- It does not support nested links like `/products/fume-hood/gi`.

Recommended route:

```txt
src/app/products/[...slug]/page.jsx
```

This supports:

```txt
/products/portable-clean-room
/products/fume-hood/gi
/products/pass-box/dynamic/straight-doors
```

The page can convert the URL segments into a lookup key:

```js
const slugPath = params.slug.join('/');
```

Then find product:

```js
Product.findOne({ slugPath, status: 'Active' })
```

## Phase 5: Update Product Model

Current model has:

```js
slug: String
```

Add:

```js
slugPath: {
  type: String,
  required: true,
  unique: true
}
```

Examples:

```txt
air-shower/straight-entry
pass-box/dynamic/straight-doors
fume-hood/gi
portable-clean-room
```

Why:

- `slug` is useful for simple product names.
- `slugPath` maps exactly to nested product URLs.

## Phase 6: Improve Product API

Current API:

```txt
/api/product
```

Keep existing CRUD, but add support for:

- `slugPath`
- `status`
- Validation
- Better error messages
- Proper HTTP status codes

Recommended public product API:

```txt
GET /api/products
GET /api/products/:slugPath
```

In Next.js App Router, practical route options:

```txt
src/app/api/products/route.js
src/app/api/products/[...slug]/route.js
```

## Phase 7: Admin Support

Admin should be able to manage:

- Product title
- Product category
- Product slug path
- Product description
- Product images
- Product status
- Product menu order

Optional admin menu API:

```txt
GET /api/admin/product-menu
POST /api/admin/product-menu
PUT /api/admin/product-menu
DELETE /api/admin/product-menu
```

For now, this can be added after the public dynamic flow works.

## Phase 8: Migration From Static Menu

Convert current `MenuData.js` into database records.

Migration steps:

1. Read every item from `MenuData.js`.
2. Insert matching menu records into `ProductMenu`.
3. Create or update product records for leaf links.
4. Set `slugPath` based on product URL.
5. Test every navbar product link.

Example:

```txt
href: /products/pass-box/dynamic/straight-doors
slugPath: pass-box/dynamic/straight-doors
```

## Phase 9: Cleanup

After API-driven products are stable:

- Remove static `MenuData.js`.
- Remove unused product static pages if their content is fully in DB.
- Keep reusable components like `Header`, `Dropdown`, `Footer`, and `ChatWidget`.
- Keep local fallback only if you want emergency recovery.

## Suggested Implementation Order

1. Create `ProductMenu` model.
2. Create `GET /api/product-menu`.
3. Seed menu data from current `MenuData.js`.
4. Update `Header.tsx` to fetch menu data.
5. Add `slugPath` to `Product` model.
6. Update product admin add/edit forms to save `slugPath`.
7. Create catch-all product detail page.
8. Test all navbar links.
9. Remove unused static product pages only after confirming dynamic pages match.

## Testing Checklist

- Homepage loads.
- Navbar opens on desktop hover.
- Product dropdown displays API data.
- Mobile product menu displays API data.
- Product links navigate correctly.
- Product detail page loads by nested URL.
- Inactive products do not show publicly.
- Admin can create/edit/delete products.
- Image upload still works.
- `npm run build` passes.

## Final Recommended Architecture

```txt
MongoDB
  Product
  ProductMenu

APIs
  /api/product
  /api/product-menu

Frontend
  Header.tsx fetches /api/product-menu
  Dropdown.jsx renders recursive menu
  products/[...slug]/page.jsx renders product detail
```

This approach keeps your current design, but moves the product content and navbar structure into the database so the website becomes much easier to manage from admin.
