# CLAUDE.md - PUDCI Website Codebase Walkthrough

## Project Overview

PUDCI (Paranaque Ultrasound Diagnostic Center Inc.) is a healthcare website for a diagnostic center chain operating across multiple branches in the Philippines. The site provides service information, branch locations with maps, a diagnostic test catalog, contact forms with email integration, and a CMS-powered content management system.

**Stack:** Next.js 15 (App Router) | React 19 | TypeScript | Tailwind CSS 4 | Sanity CMS 4 | Leaflet Maps | Nodemailer | Vitest

---

## Project Structure

```
pudci/
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, API routes)
│   │   ├── layout.tsx          # Root layout (metadata, Google Analytics, Header/Footer)
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles, scroll animations, reduced-motion
│   │   ├── about/              # About page + /learn-more subpage
│   │   ├── services/           # Services overview with symptom checker
│   │   ├── locations/          # Branch locations with interactive map
│   │   ├── diagnostic-catalog/ # Searchable/filterable test catalog
│   │   ├── contact/            # Contact form with branch email routing
│   │   ├── careers/            # Careers listing + job detail + apply form
│   │   ├── privacy/            # Privacy policy
│   │   ├── studio/[[...index]] # Embedded Sanity Studio CMS
│   │   └── api/                # API routes (email, sanity)
│   ├── components/             # All UI components organized by feature
│   │   ├── header.tsx          # Sticky nav, mobile menu, Sanity logo fetch
│   │   ├── footer.tsx          # Site footer with social links
│   │   ├── hero.tsx            # Homepage hero (video intro + slide carousel)
│   │   ├── quick-access.tsx    # Quick-access grid (4 items)
│   │   ├── our-services.tsx    # Services carousel (9 services)
│   │   ├── hmo-listing.tsx     # Marquee-scrolling HMO partner logos
│   │   ├── reviews.tsx         # Customer testimonials carousel
│   │   ├── cta-section.tsx     # Call-to-action banner
│   │   ├── about/              # About page components
│   │   ├── services/           # BodyMap (interactive SVG symptom checker)
│   │   ├── locations/          # Location hero, Leaflet map integration
│   │   ├── diagnostic-catalog/ # Catalog with search, filter, pagination
│   │   ├── contact/            # Contact form with map + branch selector
│   │   └── careers/            # Career listing and application components
│   ├── lib/
│   │   ├── sanity.ts           # Sanity client instance + image URL builder
│   │   └── sanity-queries.ts   # All GROQ queries (locations, HMO, slides, tests, settings)
│   └── data/
│       └── tests.json          # Static diagnostic test data (migration source)
├── sanity/
│   ├── schemas/                # CMS document schemas
│   │   ├── index.ts            # Schema exports
│   │   ├── siteSettings.ts     # Header/footer logos, SEO fields (singleton)
│   │   ├── location.ts         # Branch info: address, coords, phones, services
│   │   ├── hmoPartner.ts       # HMO partner name + logo + display order
│   │   ├── heroSlide.ts        # Hero carousel slides (mobile/desktop images)
│   │   ├── diagnosticTest.ts   # Test catalog entries (name, category, price, etc.)
│   │   └── teamMember.ts       # Team/branch photos with display order
│   └── plugins/                # Sanity studio plugins
├── scripts/
│   ├── migrate-data.ts         # Migrate locations, HMO, hero data to Sanity
│   ├── migrate-diagnostic-tests.ts  # Bulk import diagnostic tests
│   └── migrate-team.ts         # Team member migration
├── tests/
│   └── sanity-data.test.ts     # Validates Sanity data integrity (locations, HMO, slides)
├── public/                     # Static assets
│   ├── hero*.jpg/png           # Hero backgrounds
│   ├── logo-*.png              # PUDCI logo variants
│   ├── output*.mp4             # Hero intro videos (portrait + desktop)
│   ├── bodymap-*.svg           # Interactive body map SVGs
│   ├── hmo/                    # HMO partner logo images
│   ├── locations/              # Branch photos
│   ├── services/               # Service category images
│   ├── icons/                  # Mission/vision icons
│   └── forms/                  # Downloadable PDF forms
├── next.config.ts              # Remote image domains (cdn.sanity.io)
├── sanity.config.ts            # Sanity project config (desk + vision tools)
├── tsconfig.json               # TypeScript strict mode, @/* path alias
├── vitest.config.ts            # Test config with env + path aliases
├── eslint.config.mjs           # ESLint (next core-web-vitals + typescript)
└── postcss.config.mjs          # Tailwind CSS v4 PostCSS plugin
```

---

## Key Architecture Decisions

### Client Components Everywhere
Nearly all components use `"use client"`. Data fetching happens inside `useEffect` on mount with loading/error state management. This is a deliberate choice for heavy interactivity (carousels, maps, forms, modals).

### Sanity CMS Data Flow
1. Schemas defined in `sanity/schemas/` describe document types
2. `src/lib/sanity.ts` creates a `@sanity/client` instance (CDN disabled)
3. `src/lib/sanity-queries.ts` exports async functions using GROQ queries
4. Components call these query functions in `useEffect` and store results in state
5. Images use `asset->url` projection in GROQ for direct CDN URLs

### No External State Management
All state is local React hooks (`useState`, `useEffect`, `useRef`, `useMemo`). No Redux, Zustand, or Context providers.

### Dynamic Imports for Maps
Leaflet map components use `next/dynamic` with `{ ssr: false }` since Leaflet requires `window`.

---

## Environment Variables

```env
# Required - Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=       # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=          # Usually "production"
NEXT_PUBLIC_SANITY_API_VERSION=      # e.g., "2024-01-01"

# Required for migrations
SANITY_API_TOKEN=                    # Sanity write token

# Required - Email (Nodemailer)
EMAIL_HOST=                          # SMTP host (optional if Gmail)
EMAIL_PORT=                          # SMTP port (optional if Gmail)
EMAIL_USER=                          # SMTP username or Gmail address
EMAIL_PASS=                          # SMTP password or Gmail app password

# Optional - Email
EMAIL_FROM=                          # Sender address override
SEND_CONFIRMATION=                   # "true" to send customer confirmation emails
```

Google Analytics ID `G-S9FQT149QQ` is hardcoded in `src/app/layout.tsx`.

---

## Routing

| Route | Description |
|---|---|
| `/` | Homepage (hero video/carousel, services, HMO, reviews, CTA) |
| `/about` | About page with team section |
| `/about/learn-more` | Extended about information |
| `/services` | Services overview + interactive body map symptom checker |
| `/locations` | Branch locations with Leaflet map |
| `/diagnostic-catalog` | Searchable test catalog (supports `?category=` and `?service=` params) |
| `/contact` | Contact form with branch selector and map |
| `/careers` | Career opportunities listing |
| `/careers/medical-technologist` | Job detail page |
| `/careers/radiologic-technologist` | Job detail page |
| `/careers/apply` | Job application form |
| `/privacy` | Privacy policy |
| `/studio/[[...index]]` | Sanity Studio CMS interface |

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/send-email` | POST | Sends contact form email to branch-specific address via Nodemailer |
| `/api/send-email` | GET | Tests SMTP configuration and connectivity (debug endpoint) |
| `/api/sanity` | GET | Generic Sanity data fetcher (`?type=heroSlides\|locations\|...`) |

---

## Sanity CMS Schemas

| Schema | Key Fields | Notes |
|---|---|---|
| `siteSettings` | headerLogo, footerLogo, siteTitle, siteDescription | Singleton document |
| `location` | name, title, address, coordinates, phones, hours, emails, services, image | 7 branches |
| `hmoPartner` | name, logo, order | Sorted by order field |
| `heroSlide` | title, titleColor, body, bgMobile, bgDesktop, buttonText, buttonLink, order | Carousel slides |
| `diagnosticTest` | productName, category, price, description, methodology, sampleType, turnaroundTime, preparation | Full test catalog |
| `teamMember` | name, bio, image, order | About page team section |

---

## Key Components

### Homepage Flow
`page.tsx` renders: `Hero` -> `QuickAccess` -> `OurServices` -> `HmoListing` -> `Reviews` -> `CTASection`

### Hero (`src/components/hero.tsx`)
Auto-playing video intro with portrait/landscape detection, then transitions to a Sanity-driven slide carousel with fade animations and dot indicators.

### Symptom Checker (`src/components/services/BodyMap.tsx`)
Interactive SVG body diagram (front + back views). Users click body parts to see related diagnostic tests. Selections link to `/diagnostic-catalog?service=...`.

### Diagnostic Catalog (`src/components/diagnostic-catalog/diagnostic-hero.tsx`)
Full-featured catalog with:
- Text search by product name and category
- Category dropdown filter
- Service filter (from BodyMap integration via URL params)
- Pagination (10 per page)
- Detail view with methodology, sample type, turnaround time, preparation steps
- "Inquire Now" links pre-fill the contact form

### Location Map (`src/components/locations/location-hero.tsx`)
Leaflet map with branch markers. Clicking a marker shows branch details (address, phone, hours, services). Uses `next/dynamic` for SSR bypass.

### Contact Form (`src/components/contact/contact-hero.tsx`)
Form fields: name, email, service, branch selector, additional services (multi-select), message. Submits to `/api/send-email` which routes to branch-specific email addresses via Nodemailer.

---

## Styling

**Tailwind CSS 4** with utility-first approach. No component library.

### Brand Color Palette
| Color | Hex | Usage |
|---|---|---|
| Primary Green | `#0A6D3C` | Main brand, headers, buttons, footer background |
| Bright Green | `#04BE09` | Accents, hover states |
| Neon Green | `#05EE0C` | Header bottom border |
| Near Black | `#000C01` | Primary text |
| Gray | `#4C544D` | Secondary text |
| Light Green Tint | `#DAE4DD` | Light backgrounds |
| Light Green | `#A6ECA9` | Soft accent backgrounds |

### Responsive Breakpoints
Mobile-first design using Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px). Some components conditionally render different layouts for mobile vs desktop.

### Animations
- Scroll-triggered reveal animations via Intersection Observer (defined in `globals.css`)
- Marquee animation for HMO logos
- Carousel auto-rotation (5-second intervals)
- Fade transitions on hero slides
- Reduced motion media query support

---

## Development Commands

```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm start            # Start production server
npm run studio       # Sanity Studio dev server (http://localhost:3333)
npm run lint         # ESLint
npm test             # Run Vitest tests
npm run test:ui      # Vitest UI dashboard
npm run migrate      # Run Sanity data migration scripts
```

---

## Testing

Tests are in `tests/sanity-data.test.ts` using Vitest. They validate Sanity data integrity:
- 7 locations exist with correct structure
- Baclaran branch has expected field values
- 11 HMO partners exist
- 3 hero slides exist

Tests require valid Sanity environment variables in `.env.local`.

---

## Common Development Patterns

### Adding a new Sanity schema
1. Create schema file in `sanity/schemas/`
2. Export it from `sanity/schemas/index.ts`
3. Add GROQ query function in `src/lib/sanity-queries.ts`
4. Consume in component via `useEffect` + `useState`

### Adding a new page
1. Create directory under `src/app/` with `page.tsx`
2. Components go in `src/components/<feature>/`
3. All interactive components need `"use client"` directive
4. Add navigation link in `src/components/header.tsx`

### Working with images
- Sanity images: Use `asset->url` in GROQ queries, render with `<Image>` or `<img>`
- Static images: Place in `public/`, reference with `/filename.ext`
- Remote images: Domain must be listed in `next.config.ts` `images.remotePatterns`

### Email integration
The contact form POSTs to `/api/send-email`. Branch emails are mapped in the contact component. The API route uses Nodemailer with configurable SMTP (supports Gmail or custom providers).

---

## Branch Information

The site serves 7 branches:
Baclaran, Bacoor, BF Homes, Binan, Las Pinas, Munoz, Sucat

Each branch has its own: address, coordinates (for map), phone numbers, operating hours, email, services list, and photo.

---

## Deployment

The project targets **Vercel** for deployment (Next.js native hosting). Environment variables must be configured in the Vercel dashboard. The `.vercel` directory is git-ignored.

---

## Gotchas & Notes

- **Node version:** Sanity packages require Node `>=22.12` or `>=20.19 <22`. Node `v22.11.x` produces engine warnings but works.
- **Leaflet SSR:** All Leaflet/map components must use `next/dynamic` with `ssr: false`.
- **Sanity CDN:** CDN is disabled (`useCdn: false`) so content updates appear immediately without cache delay.
- **Video assets:** Hero videos exist in multiple versions (portrait, desktop, compressed) in `public/`.
- **Google Analytics:** Tracking ID is hardcoded in the root layout, not env-configured.
- **Windows path issue:** The repo contains a file `public/about/about-us.jpg:Zone.Identifier` which has an invalid character for Windows filesystems. Use `git config core.protectNTFS false` when cloning on Windows.
