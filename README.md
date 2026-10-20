# TropicBlenz

Front-end storefront **prototype** for **Tropic Theory**, a frozen tropical fruit brand. Brand line: *Better Blends Begin Here.*
Creative direction: Tropical Modernism built around desire, with the packaging as the hero. Launch focus: frozen red dragon fruit.

This is a static, clickable prototype for review. It is not a working shop: there is no real checkout, no payments, no accounts, no backend and no data collection.

## Live preview

**Live:** https://rayvtt.github.io/TropicBlenz/

Deployed by GitHub Actions on every push to `main` (see `.github/workflows/pages.yml`, which copies every top-level `*.html`, `.nojekyll` and `assets/`).

## New range landing page (bilingual VI/EN)

**Live:** https://rayvtt.github.io/TropicBlenz/range.html (English) · https://rayvtt.github.io/TropicBlenz/range-vi.html (Tiếng Việt)

A landing page for the proposed TropicBlenz frozen fruit range: five single fruits (red dragon fruit, aloe vera cubes, seedless soursop, tangy ripe mango, papaya) and three blend concepts (Pink Tropics, Golden Tropics, Island Reset). Sections: hero, range (single fruits vs mixed blends), integrity and transparency, farmers and community commitments, Vietnamese fruit wisdom (cultural context with a cited source and a "not medical advice" note), serving ideas, brand story, FAQ, demo enquiry form and footer. The header has an EN/VI switch that keeps the reader on the same section. The storefront homepage links to it from the nav and footer.

Each language is a real static page with its own `lang`, title, description, canonical and `hreflang` links, so both are indexable and work without JavaScript. Both are **generated** from one source:

```
scripts/range/content.mjs   all copy (EN + VI), fruit and blend data, brand name. Edit this.
scripts/build-range.mjs     renders range.html and range-vi.html
assets/css/range.css        page styles (on top of styles.css tokens and components)
assets/js/range.js          mobile nav, language links, demo enquiry form
```

```bash
node scripts/build-range.mjs          # regenerate both pages after editing content.mjs
node scripts/build-range.mjs --check  # fails if the committed pages are out of date
```

Blend names and combinations are concepts and live in `blends` in `content.mjs`. Fruit cards use labelled colour fields ("Photography to come") until real product photography exists. The enquiry form sends and stores nothing.

## Pages

| Page | What it shows |
| --- | --- |
| `index.html` | Packaging-led hero ("Tropical fruit. At its most irresistible.", Shop the range), proposed range, red dragon fruit launch spotlight (pack front and back), formats, Vietnam story (copy to be confirmed), serving inspiration, demo newsletter signup, footer |
| `shop.html` | Catalogue of every fruit and format with a pack visual, sample price and quick add. Filter by fruit or format (`shop.html?fruit=mango&format=tub-1kg` deep-links) |
| `product.html?id=<slug>` | Data-driven product page: gallery (front, back and other formats), format selector with live price, quantity stepper, add to cart, accordions (serving idea, ingredients, storage, origin, packaging) and related products. Optional `&format=<id>`. Unknown ids show a not-found state. Slugs: `red-dragon-fruit`, `mango`, `passion-fruit`, `pineapple`, `lychee`, `longan`, `jackfruit`, `soursop` |
| `cart.html` | Full cart: change quantity, remove, line totals, subtotal and an empty state |
| `range.html`, `range-vi.html` | Bilingual range landing page (see above) |
| `checkout.html` | Demo checkout: contact, delivery, payment (disabled mock card field), review and a demo confirmation that clears the cart |

A slide-in cart drawer is on every page, opened from the header cart button. It has a live count, closes with Escape, traps focus while open and returns focus when closed. Cart changes are announced through an `aria-live` region.

## Structure

```
index.html shop.html product.html cart.html checkout.html
assets/css/styles.css      design tokens (palette, type) and all component styles
assets/js/products.js      shared catalogue: fruits, formats, sample prices, copy, money formatting
assets/js/packs.js         packaging concept renderer: TT.packs.render(fruit, format, 'front'|'back') returns inline SVG
assets/js/cart.js          cart store (localStorage), drawer, header count and live announcements
assets/js/main.js          mobile nav, demo newsletter, homepage range, shared product card
assets/js/shop.js          shop grid and filters
assets/js/product.js       product detail page and not-found state
assets/js/cart-page.js     full cart page
assets/js/checkout.js      demo checkout flow
assets/img/                illustrative stock photography (Unsplash) and favicon
```

All paths are relative, so the site works under the `/TropicBlenz/` sub-path and on a custom domain later. There is no build step and no runtime dependencies. Fonts (Fraunces and Manrope) load from Google Fonts.

Money is handled as integer minor units (cents) and shown as `$12.90` with a "Sample price" label. The cart stores only `{ sku, qty }` in `localStorage` (key `tropic-theory-cart-v1`). Every read and write is wrapped in try/catch, and prices are always looked up from `products.js`.

## Run locally

```bash
npx http-server -p 8080 .
# or
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Prototype boundaries

- **No real checkout or payments.** The checkout form has no `action`, every submit is prevented, and the payment step shows a disabled mock card field instead of real card inputs. A prominent banner says "Demo checkout: nothing is charged or sent".
- **No data collection.** Checkout details live only in the page while you use it. They are never written to storage and are cleared on confirmation. The newsletter form sends and stores nothing.
- **Only the cart persists**, in the visitor's own browser.
- **No accounts.**

## Placeholders and concepts

- **Packaging** is a concept system drawn as SVG in `assets/js/packs.js`. One design language covers every pack (flat fruit-colour field, letterspaced wordmark, line-drawn fruit motif, italic Fraunces fruit name), with distinct silhouettes for the 500 g stand-up pouch (zip line, tear notches), the 5 × 100 g sachet strip, the 1 kg gusseted food-service bag and the 1 kg scoop tub. Back views carry placeholder panels marked "Concept: copy TBC" and "Barcode TBC". The site labels all of it "Packaging concept". It is not final artwork.
- **Range**: red dragon fruit (launch focus), mango, passion fruit, pineapple, lychee, longan, jackfruit and soursop. Which formats each fruit comes in is a proposal.
- **Prices** are sample prices for the demo, and so are the delivery options ($6.90 standard, $14.90 express). No currency or market is implied.
- **Product copy** (taglines, descriptions, serving ideas) is provisional. Ingredients, storage guidance, origin details and final packaging copy are marked "To be confirmed".
- **Origin**: says only that the brand looks to Vietnam. No regions, growers, processing, certification, organic, nutrition or availability claims are made, and the homepage story keeps its "Copy to be confirmed" note.
- **Photography** is illustrative stock from Unsplash (Unsplash License), captioned "Illustrative photography, not Tropic Theory product". Replace it with commissioned photography.
- **Serving ideas** are short suggestions, not tested recipes.
- **Palette** (Mango #F5A623, Guava #F06F68, Leaf #286747, Coconut #F8F4EA, Deep Ink #20231F, Dragon Fruit #D93672) is provisional. The extra pack colours per fruit are set in `products.js`.

## Deployment (GitHub Pages)

`.github/workflows/pages.yml` publishes the site whenever `main` is pushed, and can also be run by hand from the Actions tab. Pages must be set to **Settings → Pages → Source: GitHub Actions**.
