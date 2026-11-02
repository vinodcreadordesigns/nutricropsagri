# NutriCrops Agriculture - React + Vite + Tailwind

## Run
```bash
npm install
npm run dev        # development
npm run build      # builds sitemap.xml + robots.txt, then production build -> dist/
npm run preview    # preview production build
```

## Edit content (all in `src/data/`)
- `company.js` - phone, email, address, WhatsApp, hours, map URL, social links, **siteUrl** (set your real domain!), stats, nav
- `products.js` / `categories.js` - products and the 7 categories
- `blogs.js`, `testimonials.js`, `team.js`, `history.js`, `gallery.js`, `hero.js`

Everything marked "placeholder" / "sample" is NOT real company data - replace before launch.

## Add a new product
1. Add an entry in `src/data/products.js` (it instantly appears in the grid, search, filters, sitemap and at `/products/<slug>`).
2. Optional custom page: copy `src/pages/products/ReleaseZinc.jsx` -> `NewProduct.jsx`, then add a lazy import + `<Route path="products/new-product" .../>` in `src/routes/AppRoutes.jsx`.
3. Put the image at `public/images/products/<slug>.webp` and update the `image` field.

## Images
Placeholder SVGs live in `public/images/` (`npm run gen:images` regenerates them).
Replace with real WebP/AVIF files and update paths in the data files. Keep the hero image un-lazy (it already is).
Replace `public/images/og-image.svg` with a 1200x630 **JPG/PNG** (social networks don't render SVG) and update the path in `src/utils/seo.jsx`.
Replace `public/images/logo.svg` / `logo-light.svg` with your real logo (keep the file names or edit `Logo.jsx`).

## Forms
`src/utils/api.js` is a mock. Connect it to your backend/EmailJS/Formspree.

## SEO note
Meta tags/JSON-LD are set per page with react-helmet-async (rendered by JavaScript; Google handles this).
For best results add pre-rendering later (e.g. `vite-plugin-prerender`, `react-snap`, or migrate to Next.js).
`public/_redirects` (Netlify) and `vercel.json` provide SPA fallback so direct URLs work.
