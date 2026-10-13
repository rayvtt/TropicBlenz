# TropicBlenz

Landing page prototype for **TropicBlendz** — tropical fruit and frozen fruit blends.
Creative direction: Tropical Modernism, built around appetite and desire.

## Live preview

**Live:** https://rayvtt.github.io/TropicBlenz/

Deployed by GitHub Actions on every push to `main`. Checked on 2026-10-13: page, CSS, JS and images all load.

## What's here

A static site with no build step and no dependencies:

```
index.html              page markup (header, hero, range, frozen blends, origin, recipes, enquiry, footer)
assets/css/styles.css   design tokens (palette, type) and all component styles
assets/js/main.js       mobile nav toggle, prototype enquiry form (sends nothing)
assets/img/             illustrative stock photography (Unsplash) and favicon
.github/workflows/pages.yml   GitHub Pages deployment
```

All asset paths are relative, so the site works at a sub-path (`/TropicBlenz/`) now and on a custom domain later.

## Local preview

```bash
npx http-server -p 8080 .
# or
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Deployment (GitHub Pages, free)

`.github/workflows/pages.yml` publishes the site whenever `main` is pushed, and can also be started by hand from the Actions tab.

One-time setup by the repository owner:

1. Merge the prototype branch into `main`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open **Actions → Deploy to GitHub Pages → Run workflow** (or push to `main`).
5. When the run finishes, the site is at https://rayvtt.github.io/TropicBlenz/.

A custom domain can be added later under **Settings → Pages → Custom domain**. No DNS changes have been made.

## Checks

- `npx html-validate@8 index.html`: passes with no errors.
- Playwright (Chromium) at 390px, 768px and 1440px: no horizontal overflow, no console errors and no failed requests. Keyboard focus starts on the skip link. The mobile menu opens, and Escape closes it. Form validation messages appear. Every image has alt text, and the page has one `h1`.

## Placeholders and assumptions

- **Photography** is illustrative stock from Unsplash (Unsplash License). It does **not** show TropicBlendz products, and the page says so in the top bar, in the image captions and in the footer. Replace it with commissioned product photography.
- **Fruit range** (mango, dragon fruit, passion fruit, pineapple) is indicative only.
- **Frozen blend names** (Golden Hour, Pink Current, Guava Glow), their fruit mixes, formats and pack sizes are placeholders.
- **Origin / Vietnam story**: only says the brand looks to Vietnam. No suppliers, regions, farming, certification, processing or nutrition claims are made. The section is marked "Copy to be confirmed".
- **Recipes** are short serving ideas, not tested recipes.
- **Enquiry form** is a front-end prototype. Nothing is sent or stored. It needs a real destination (email or form service) before launch.
- **Palette** (Mango #F5A623, Guava #F06F68, Leaf #286747, Coconut #F8F4EA, Deep Ink #20231F, Dragon Fruit #D93672) is provisional, as briefed.
- Fonts: Fraunces and Manrope via Google Fonts.
