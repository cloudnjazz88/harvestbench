# HarvestBench

A US-English resource site for **raised beds, containers, and harvestable vegetables**: interactive calculators, practical guides, and product-recommendation architecture that can later connect to Amazon, Home Depot, and Lowe’s.

This is a utility site, not a personal blog.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- npm

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

Live site: [https://harvestbench.com](https://harvestbench.com)  
Source: [https://github.com/cloudnjazz88/harvestbench](https://github.com/cloudnjazz88/harvestbench)

The production build is a static export hosted on Cloudflare Pages (same account as the domain). Set `NEXT_PUBLIC_SITE_URL=https://harvestbench.com` before `npm run build`.

## Production build

```bash
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, Open Graph |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (optional) |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense publisher ID (optional) |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | Individual ad unit IDs (optional) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Enables the contact mailto form |

Affiliate product URLs live in `src/data/products.ts`. Leave `externalUrl` empty and `affiliate: false` until a real program exists.

## Project layout

- `src/app` — routes, sitemap, robots
- `src/components` — layout, calculators, ads, products
- `src/data` — navigation, calculator copy, guides, crops, products
- `src/lib` — unit math, SEO helpers, calculator formulas
