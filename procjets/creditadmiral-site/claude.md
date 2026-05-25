# Credit Admiral Marketing Website

## Project Overview
Marketing website for Credit Admiral, a SaaS credit repair software platform targeting credit repair professionals, debt settlement companies, and arbitration firms.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (scroll animations)
- GSAP (hero timeline animations)
- Lucide React (icons)

## Brand
- Primary color: Navy `#0B1F3A` (backgrounds, text, dark sections)
- Accent color: Blue `#4C8BF5` (buttons, highlights, gradients, hover states — Tailwind token is `blue`)
- Fonts: Syne (headings/display), DM Sans (body)
- Tone: Professional, bold, confident
- Logo: Circular icon (`credit-admiral-logo.png`) + "Credit Admiral Software®" text

## Color System
Colors are defined in `tailwind.config.ts` under `theme.extend.colors`:
- `navy` — full palette (50–900), DEFAULT is `#0B1F3A`. Used as `bg-navy`, `text-navy`, `text-navy/60`, etc.
- `blue` — full palette (50–900), DEFAULT is `#4C8BF5`. Used as `bg-blue`, `text-blue`, `from-blue`, etc.
- Both support Tailwind opacity modifiers (e.g., `bg-navy/5`, `text-blue/20`)

## Project Structure
```
app/
  layout.tsx            - Root layout with Syne + DM Sans fonts, full SEO metadata, JSON-LD structured data, ReferralCapture
  sitemap.ts            - Dynamic sitemap generation for all public routes
  page.tsx              - Homepage (client component)
  globals.css           - Base styles, font assignments
  mobile-app/
    layout.tsx          - Per-page SEO metadata
    page.tsx            - Dedicated mobile app tour page
  features/
    layout.tsx          - Per-page SEO metadata
    page.tsx            - Features page with 12 feature sections and sticky pill nav
  training/
    layout.tsx          - Per-page SEO metadata
    page.tsx            - Training page with video tutorials, CreditCon, and resources
  checkout/
    layout.tsx          - Per-page SEO metadata (noindex)
    page.tsx            - Currently redirects to external checkout; original form UI preserved for future use
  terms/
    page.tsx            - Terms of Service page (has metadata export)
  privacy/
    page.tsx            - Privacy Policy page (has metadata export)
  refund-policy/
    page.tsx            - Payment and Refund Policy page (has metadata export)
components/
  Navbar.tsx            - Sticky nav, transparent→navy on scroll, mobile drawer, darkHero prop
  Hero.tsx              - GSAP entrance animation, parallax, dashboard screenshot in navy frame
  Partners.tsx          - Infinite marquee carousel of partner logos (supports per-logo className for sizing)
  FeatureSection.tsx    - Reusable alternating left/right feature block, supports screenshotSrc prop for real images in navy frame
  MobileApp.tsx         - Homepage mobile app section with 3-phone fan layout
  Arbitration.tsx       - Full-width navy section, exclusive arbitration tools
  FeatureGrid.tsx       - 4x2 icon grid of platform features
  Testimonials.tsx      - Carousel with prev/next, 3 cards per page, real reviews
  CTA.tsx               - Pricing cards + final conversion CTA
  Footer.tsx            - 4-column footer
  ReferralCapture.tsx   - Client component: captures ?ref= param from URL, stores in cookie, strips from URL
  ui/
    Button.tsx          - Primary/secondary button variants
    SectionWrapper.tsx  - Reusable Framer Motion scroll-triggered wrapper
public/
  robots.txt            - Blocks crawlers while on preview URL (remove Disallow when real domain is live)
  logo/                 - Credit Admiral logos (credit-admiral-logo.png, credit-admiral-full.jpeg)
  avatars/              - Customer avatar photos (pending)
  partners/             - Credit report partner logos (smartcredit, identity-iq, array, levelupscore, myfreescorenow, hellobettercredit, kraken, highlevel)
  screenshots/          - Platform screenshots (dashboard, dispute-engine, billing-automation, score-tracker, progress-tab, login-screen, action-plan, message, docments, mobile-1/2/3, credit-con)
  credit-con/           - 15 CreditCon event photos (cc1-15.jpg)
```

## Pages

### Homepage (`/`)
Client component (`app/page.tsx`). Renders sections in this order:
1. **Navbar** — transparent, scrolls to navy
2. **Hero** — GSAP timeline entrance, parallax scroll on dashboard screenshot, "Start for $1" + "Take a Tour" CTAs, trust badge (1,000+ professionals)
3. **Partners** — infinite marquee carousel of 8 partner logos
4. **FeatureSection x4** — alternating left/right layout:
   - Dispute Engine (id: `tour`, screenshot: `dispute-engine.png`)
   - Annual Credit Report Import (id: `annual-import`, screenshot: pending)
   - Client Portal (no screenshot)
   - Billing & Invoicing (id: `billing`, screenshot: `billing-automation.png`)
5. **MobileApp** — 3-phone fan layout with 6 bullet points
6. **Arbitration** — navy section, 4 feature cards (AAA, JAMS, Notary, Debt Settlement)
7. **FeatureGrid** — 4x2 grid of 8 platform features
8. **Testimonials** — carousel with 6 reviews, 3 per page
9. **CTA** — 4 pricing cards + conversion CTA
10. **Footer**

### Mobile App Page (`/mobile-app`)
Client component. Navbar uses `darkHero` prop. Sections:
1. **Hero** — dark navy gradient, "Free Mobile App Included" badge, 3-phone fan mockup (mobile-1/2/3.png)
2. **Benefits** — 9 bullet points + login-screen.png (avoids showing client logos)
3. **App Tour** — 5 feature walkthrough with alternating screenshots:
   - Score Tracker (`score-tracker.png`)
   - Credit Snapshot (`progress-tab.PNG`)
   - Action Plan (`action-plan.png`)
   - Live Messaging (`message.PNG`)
   - Document Uploads (`docments.png`)
4. **Features Grid** — 5 app features in 3-column grid
5. **How It Works** — 3-step process (Add Client → Download App → Track Progress)
6. **CTA** — navy section with gradient headline
7. **Footer**

### Features Page (`/features`)
Client component. Navbar uses `darkHero` prop. Sections:
1. **Hero** — dark navy gradient, "All-In-One Platform" badge
2. **Sticky Pill Navigation** — horizontal scrolling pills for 12 features, sticks to top on scroll
3. **12 Feature Sections** — each with icon badge, title, description, and 3-4 feature cards:
   - Mobile App, Arbitration, Online Notary, Third Party Disputes, Print & Mail, Bureau Letters, Furnisher Letters, Inquiry Letters, Freeze & PII, Score Tracker, Billing, Notes & Tasks
4. **CTA** — navy section
5. **Footer**

### Training Page (`/training`)
Client component. Navbar uses `darkHero` prop. Sections:
1. **Hero** — dark navy gradient, "Training & Resources" badge
2. **Training Videos** — 29 Vimeo-embedded tutorials across 6 categories:
   - Getting Started (3), Managing Clients (8), Dispute Letters (6), Arbitration/Pre-Legal (5), Billing (7)
   - Category filter tabs, 3-column card grid, modal video player on click
3. **CreditCon Section** — image carousel (15 photos: cc1-15.jpg), navigation arrows, thumbnail strip, 6 event highlights, link to https://credit-con.com/
4. **Resources Grid** — downloadable resources
5. **Footer**

### Checkout Page (`/checkout`)
Client component. Currently redirects to external payment processor. No footer.
- Immediately redirects to `https://creditstatusupdater.com/ca-interface/enter-cc.php`
- Appends `ref` (from `ca_ref` cookie) and `plan` (from query param) to the URL
- Original checkout form UI preserved as `CheckoutContent` function (not rendered) for future use
- Preserved form includes: plan selector, company details, payment details, order summary in 3-column grid

### Legal Pages
- `/terms` — Terms of Service (server component, metadata export, updated June 1 2020)
- `/privacy` — Privacy Policy (server component, "We will never sell your information")
- `/refund-policy` — Payment and Refund Policy (server component, updated February 10 2022, no refunds policy)

## Navbar Links
Tour (#tour), Features (/features), Annual Import (#annual-import), Arbitration (#arbitration), Mobile App (/mobile-app), Pricing (#pricing), Training (/training)

## Component Details

### Navbar (`components/Navbar.tsx`)
- **Props**: `darkHero?: boolean` — makes text white for dark hero backgrounds
- **Behavior**: fixed position, z-50. Transparent → `bg-navy/95` when scrollY > 50
- **Desktop**: 7 nav links + "Start for $1" CTA button
- **Mobile**: hamburger icon → slide-down drawer, links close menu on click
- **Logo**: credit-admiral-logo.png in white circle + "Credit Admiral Software®"

### Hero (`components/Hero.tsx`)
- **GSAP Timeline**: 6 sequential animations (badge → headline → subtext → buttons → trust → screenshot) with power3.out easing and overlapping timing
- **Parallax**: Framer Motion `useScroll` — screenshot moves y:0→100px and scales 1→0.95 on scroll
- **Content**: pulse dot badge, gradient headline (blue), trust section (5 avatars + 5 stars + "1,000+ professionals"), dashboard.png in navy frame with blur glow
- **CTAs**: "Start for $1" (primary) + "Take a Tour" (secondary, links to #tour)

### Partners (`components/Partners.tsx`)
- **Data**: 8 partners with per-logo `className` override for custom sizing
- **Animation**: CSS marquee (25s linear infinite), pauses on hover
- **Sizing**: default `h-10`, Hello Better Credit `h-16`, Kraken/HighLevel `h-14`
- **Styling**: white bg, gray borders, fade gradients on edges, 60% opacity → 100% on hover

### FeatureSection (`components/FeatureSection.tsx`)
- **Props**: `id`, `title`, `subtitle`, `description`, `bullets[]`, `reversed`, `icon`, `screenshotLabel`, `screenshotSrc?`
- **Layout**: flex row or row-reverse based on `reversed`, screenshot (flex-[1.4]) + content (flex-1)
- **Screenshot**: navy bg frame with gradient blur glow, or gray placeholder if no `screenshotSrc`
- **Animation**: Framer Motion whileInView, bullets stagger delay (0.3 + i*0.1)

### MobileApp (`components/MobileApp.tsx`)
- **Layout**: 3-phone fan display (left -6deg, center prominent z-10, right +6deg) + content
- **Screenshots**: mobile-1/2/3.png in navy border-4 frames
- **Content**: "Mobile App" blue subtitle, title, description, 6 bullet points with CheckCircle icons

### Arbitration (`components/Arbitration.tsx`)
- **Section**: id `arbitration`, full navy bg
- **Badge**: "Industry Exclusive" in blue/10 bg
- **Title**: gradient text (blue → yellow-400)
- **Cards**: 4 features in 2x2 grid (AAA, JAMS, One-Button Notary, Debt Settlement)
- **Card hover**: bg white/5 → white/10, border blue/30, icon bg blue/10 → blue/20

### FeatureGrid (`components/FeatureGrid.tsx`)
- **Section**: id `features`, gray-50 bg
- **8 Features**: Dashboard, AI Disputes, Print & Mail, Workflows, SMS & Email, Letter Library, Notes & Tasks, Affiliate Portal
- **Cards**: white bg, rounded-2xl, hover: shadow-xl, blue/20 border, -translate-y-1

### Testimonials (`components/Testimonials.tsx`)
- **Data**: 6 testimonials (Rebecca C., Ericka W., Tina G., Rob L., Robert Q., Cesar Q.) — all "Credit Repair Professional", all 5 stars
- **Carousel**: 3 cards per page, prev/next buttons, dot indicators
- **Animation**: AnimatePresence with fade/slide (x: ±40)

### CTA (`components/CTA.tsx`)
- **Section**: id `pricing`, navy bg with blue gradient blur decorations
- **Badge**: "$1 Trial" with Sparkles icon
- **4 Pricing Cards**:
  - Seaman: $199/mo, 250 clients
  - Lieutenant: $299/mo, 500 clients (popular — "Most Popular" badge)
  - Commander: $399/mo, 1,000 clients
  - Captain: $599/mo, 2,000 clients
- **Each card**: gradient header, 5 feature checkmarks, "Start Now for $1" → `/checkout?plan=name`
- **Bottom note**: "$1 trial. Cancel anytime. No long-term contracts."

### Footer (`components/Footer.tsx`)
- **Layout**: 5 columns on lg (brand 2-col span + Product + Company + Support)
- **Brand**: logo, description, 4 social icons (Facebook, Twitter, LinkedIn, Instagram)
- **Styling**: navy-900 bg, white/5 border-top, links white/40 hover:blue
- **Bottom**: dynamic copyright year + tagline

### ReferralCapture (`components/ReferralCapture.tsx`)
- Runs on mount via `useEffect` in root layout
- Extracts `ref` query param → stores as `ca_ref` cookie (30-day, path `/`, SameSite=Lax)
- Strips `ref` from URL via `history.replaceState`
- Renders nothing (`null`)

### Button (`components/ui/Button.tsx`)
- **Props**: `variant` (primary/secondary), `size` (default/lg), `href?`, `className?`, `onClick?`
- **Primary**: bg-blue, text-white, hover:bg-blue-500, shadow-blue/25
- **Secondary**: transparent, border-2 border-navy, hover:bg-navy hover:text-white
- Renders `<a>` if `href` provided, `<button>` otherwise
- All: rounded-full, hover:scale-105, transition-all 300ms

### SectionWrapper (`components/ui/SectionWrapper.tsx`)
- **Props**: `className?`, `delay?` (default 0), `direction` (up/down/left/right, default up)
- Framer Motion scroll-triggered wrapper with ±40px offset based on direction
- Duration 0.7s, easeOut, viewport once, margin -100px

## Referral Code System
- Any page can receive a `?ref=CODE` query parameter (e.g., `creditadmiral.com?ref=flames`)
- `ReferralCapture` component (loaded in root layout) captures the `ref` param on mount
- Stores it in a `ca_ref` cookie (30-day expiry, path `/`, SameSite=Lax)
- Strips `ref` from the visible URL using `history.replaceState` so users don't see it
- When user clicks "Start for $1" → `/checkout` reads the `ca_ref` cookie and appends `?ref=CODE` to the external checkout URL
- The `plan` query param is also forwarded (e.g., `/checkout?plan=lieutenant` → `enter-cc.php?ref=flames&plan=lieutenant`)

## Checkout Flow
1. All "Start for $1" buttons link to `/checkout` (or `/checkout?plan=name` for specific plans from CTA pricing cards)
2. `/checkout` immediately redirects to `https://creditstatusupdater.com/ca-interface/enter-cc.php`
3. If a `ca_ref` cookie exists, `ref=CODE` is appended as a query param
4. If a `plan` query param is present, it is also appended
5. The original checkout form UI (plan selector, company details, payment details, order summary) is preserved in `app/checkout/page.tsx` as `CheckoutContent` for future use — it is not rendered during the redirect

## Partner Logos
Current partners in the marquee carousel (`components/Partners.tsx`):
- SmartCredit, IdentityIQ, Array, LevelUpScore, MyFreeScoreNow, Hello Better Credit, Kraken, HighLevel
- Logos stored in `/public/partners/`
- Per-logo `className` override supported for custom sizing (Hello Better Credit uses `h-16`, Kraken and HighLevel use `h-14`, default is `h-10`)

## Animation Strategy
Three layers of animation used across the site:
1. **GSAP** (Hero only) — sequential timeline with power3.out easing, overlapping entrance animations for badge, headline, subtext, buttons, trust section, and screenshot
2. **Framer Motion** (all sections) — scroll-triggered `whileInView` with `viewport: { once: true }`, staggered delays for list items (i * 0.1), AnimatePresence for carousel transitions, parallax via `useScroll`
3. **CSS** (Tailwind keyframes) — `fade-in` (0.6s translateY), `marquee` (25s infinite loop for partner carousel), hover transitions (300ms)

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Key Notes
- All content is hardcoded (no CMS)
- Screenshots from the actual platform go in `/public/screenshots/`
- Partner logos go in `/public/partners/`
- The arbitration exclusivity claim has been researched and verified — no competitor offers built-in AAA/JAMS arbitration tools
- Annual Credit Report Import is a key differentiator — no competitor supports direct import from AnnualCreditReport.com
- Homepage feature sections with real screenshots: Dispute Engine (dispute-engine.png), Annual Credit Report Import (pending), Billing & Invoicing (billing-automation.png)
- Mobile app page "Branded For You" section uses login-screen.png instead of dashboard to avoid showing client logos
- Pricing plans: Seaman ($199), Lieutenant ($299), Commander ($399), Captain ($599)
- All plans start with a $1 trial
- Credit Admiral branded mobile app is FREE with every plan
- White-label mobile app (custom branding) is a PAID add-on — branding setup is handled by the Credit Admiral team
- There is no in-app payment processing in the mobile app
- Navbar supports `darkHero` prop for pages with dark hero backgrounds
- Training videos are embedded from Vimeo — video privacy settings must allow embedding from the site domain
- CreditCon section links to https://credit-con.com/
- Checkout page has no footer — single-screen layout with 3-column grid (company details, payment details, order summary)
- Legal docs sourced from /docs/ folder (terms_of_service.txt, privacy_policy.txt, payments_and_refund_policy.txt)
- Checkout terms checkbox links to /terms, /privacy, and /refund-policy (open in new tab)
- Competitors (do not mention on site): DisputeFox, Credit Repair Cloud, Client Dispute Manager, DISCO, Dispute Hero, TrackStar, Credit Money Machine, Dispute Suites, Credit Letters Generator

## SEO
- robots.txt blocks all crawlers — remove `Disallow: /` when real domain is connected
- Root layout has `robots: { index: false }` — change to `true` when going live
- Sitemap auto-generated at /sitemap.xml via app/sitemap.ts (excludes /checkout)
- Open Graph and Twitter Card metadata set globally with per-page overrides
- JSON-LD structured data: Organization schema + SoftwareApplication schema with all 4 pricing plans
- Favicon uses credit-admiral-logo.png (no dedicated favicon.ico yet)
- Per-page metadata via layout.tsx files (client component pages) or direct exports (server component pages)
- metadataBase set to https://creditadmiral.com — update if domain changes

## Go-Live Checklist
- [ ] Remove `Disallow: /` from `public/robots.txt`
- [ ] Change `robots: { index: false }` to `{ index: true, follow: true }` in `app/layout.tsx`
- [ ] Verify `metadataBase` URL matches the production domain
- [ ] Add dedicated favicon.ico
- [ ] Switch checkout redirect back to internal checkout form when ready
