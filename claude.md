# Built by Michael — Portfolio Website

## Project Overview

Personal portfolio website for **Michael Ryan Sia** — a full-stack developer based in Metro Manila, Philippines. Hybrid single-page application with dedicated case study pages. Dark theme with neon yellow (`#FFD300`) accent, glassmorphism design, and heavy use of scroll-driven animations.

**Live projects featured:** [OOTB Creatives](https://ootbcreatives.asia/), [PUDCI Platform](https://www.pudci.ph/), [Hello Better Credit](https://hellobettercredit.com)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`, no tailwind.config — uses `@theme` in globals.css) |
| Animations | Framer Motion 12 |
| Icons | react-icons (Font Awesome, Simple Icons) |
| Linting | ESLint 9 with next/core-web-vitals |

No backend, no database, no API routes. Contact form simulates submission with `setTimeout`.

## Project Structure

```
src/
├── app/
│   ├── case-studies/
│   │   └── [slug]/
│   │       ├── CaseStudyContent.tsx  # Client component — full case study page UI
│   │       ├── layout.tsx            # Layout with metadata
│   │       └── page.tsx              # Server component — generateStaticParams + generateMetadata
│   ├── globals.css                   # Tailwind v4 @theme, scrollbar, utility classes
│   ├── layout.tsx                    # Root layout — metadata, Inter font
│   └── page.tsx                      # Main SPA page — loading gate, cursor, all sections
├── components/
│   ├── layout/
│   │   ├── footer.tsx                # Minimal footer with large "Back to top" text
│   │   ├── navbar.tsx                # Fixed header, progress bar, active section tracking
│   │   └── section-wrapper.tsx       # Empty placeholder
│   ├── sections/
│   │   ├── about.tsx                 # Asymmetric 2:3 grid, sticky image, scroll-driven text reveal
│   │   ├── contact.tsx               # Large typographic CTA, bottom-border form inputs
│   │   ├── hero.tsx                  # Massive typography, cycling subtitle, tech icon marquee
│   │   ├── portfolio.tsx             # Bento grid, image overlay cards, category filters, case study links
│   │   └── skills.tsx                # Horizontal scroll on desktop, vertical grid on mobile
│   ├── ui/                           # Empty placeholders (button.tsx, card.tsx, section-heading.tsx)
│   ├── LoadingScreen.tsx             # 800ms splash screen with logo and bouncing dots
│   └── ParallaxBackground.tsx        # Fixed bg with gradient mesh, floating orbs, particles
├── data/
│   ├── case-studies.ts               # 6 case study objects with full project data
│   └── projects.ts                   # Legacy placeholder data (unused)
├── hooks/
│   └── useProfileAnchors.ts          # Empty placeholder
├── lib/
│   ├── sroll.ts                      # Empty placeholder (filename typo)
│   └── utils.ts                      # Empty placeholder
├── styles/                           # Empty placeholders (animations.css, glass.css)
└── types/
    └── project.ts                    # Legacy Project interface (unused — portfolio defines its own)
```

## Routing

### Home Page (`/`)

Single-page app with hash anchor navigation (`#home`, `#about`, `#skills`, `#portfolio`, `#contact`). Smooth scrolling handled via `element.scrollIntoView()` in `page.tsx`. Active section detection uses `IntersectionObserver` in `navbar.tsx`.

### Case Study Pages (`/case-studies/[slug]`)

Dynamic routes for 6 project case studies. Pre-rendered at build time via `generateStaticParams`. Each page has per-project SEO metadata via `generateMetadata`.

**Slugs:** `hello-better-credit`, `credit-admiral-app`, `credit-admiral-site`, `ootb-creatives`, `pudci`, `acca-membership`

### Cross-Page Navigation

Navbar uses `usePathname()` to detect the current page. On case study pages, anchor links are prefixed with `/` (e.g., `/#portfolio`) to navigate back to the main page. Active section highlighting is disabled on non-home pages.

## Rendering Flow

```
RootLayout (server)
└── page.tsx (client) — Home page
    ├── LoadingScreen (800ms splash, then unmounts via AnimatePresence)
    ├── ParallaxBackground (fixed, always visible)
    ├── Navbar (fixed header with scroll progress)
    ├── <main>
    │   ├── HeroSection
    │   ├── AboutSection
    │   ├── SkillsSection
    │   ├── PortfolioSection
    │   └── ContactSection
    ├── Footer
    └── Custom cursor (spring-smoothed, hidden on touch devices)

RootLayout (server)
└── case-studies/[slug]/page.tsx (server)
    └── CaseStudyContent (client)
        ├── ParallaxBackground
        ├── Navbar
        └── Case study sections (hero, overview, problem/solution, features, tech, results, CTA)
```

## Component Details

### Hero (`hero.tsx`)

- Massive viewport-relative name: "MICHAEL" / "RYAN" at `text-[14vw] md:text-[10vw]`
- `CyclingTitle` — separate component cycling through subtitles every 3s with AnimatePresence
- Scroll-driven fade: `useScroll` + `useTransform` maps scroll to opacity `[1, 0]` and scale `[1, 0.85]`
- Tech icon marquee at bottom: 12 icons duplicated for seamless loop, `animate={{ x }}` with linear repeat
- Scroll indicator with bouncing animation

### About (`about.tsx`)

- Asymmetric `md:grid-cols-5` layout (2/5 image, 3/5 content)
- Left column: profile image with `md:sticky md:top-[20vh]`, animated gradient background, social links (GitHub, LinkedIn, OnlineJobs.ph)
- Right column: heading + 3 `RevealParagraph` components + resume download button
- `RevealParagraph`: each paragraph uses `useScroll` to fade from 15% to 100% opacity as it enters viewport center

### Skills (`skills.tsx`)

- **Desktop (md+):** Horizontal scroll-driven panels using CSS-only responsive switching
  - Section is `h-auto md:h-[300vh]` to create scroll room
  - Inner sticky container: `hidden md:flex sticky top-0 h-screen items-center overflow-hidden`
  - `useScroll({ target: horizontalRef })` → `useTransform` maps to `x: ["0%", "-55%"]`
  - 6 panels: heading (35vw) + 4 category cards (28vw each) + additional skills tags (28vw)
- **Mobile (<md):** Vertical grid with `md:hidden`, standard 2-col grid with stagger animations
- No JavaScript breakpoint detection — uses CSS `hidden md:flex` / `md:hidden` to avoid hydration issues

### Portfolio (`portfolio.tsx`)

- Bento grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] grid-flow-row-dense`
- Featured projects span 2 columns; first featured also spans 2 rows
- `ProjectCard` component with image error fallback (gradient + initials when image missing)
- Full-bleed images with bottom gradient overlay; full info overlay on hover
- Category filter with `layoutId="activeFilter"` for animated pill indicator
- Each card links to its case study page via "Case Study" button
- 6 projects: Hello Better Credit, Credit Admiral App, Credit Admiral Website, OOTB Creatives, PUDCI, ACCA

### Contact (`contact.tsx`)

- Large typographic CTA: "Let's build / something great" at `text-5xl md:text-7xl lg:text-8xl`
- Inline contact info row with icons (email, phone, location, LinkedIn, GitHub)
- Availability indicator with pulsing green dot
- Bottom-border-only form inputs with animated gradient underline on focus (`scaleX` animation tracked via `focusedField` state)
- Form states: `idle` → `sending` → `sent` → back to `idle`

### Footer (`footer.tsx`)

- Large "Back to top" text as main element — `text-white/10`, brightens and moves up on hover
- Single bottom row: copyright | nav links | social icons
- `scrollToTop()` with smooth behavior

### Navbar (`navbar.tsx`)

- Fixed header with scroll progress bar (`useScroll` → `scaleX`)
- Background transitions from transparent to `bg-black/80 backdrop-blur-xl` on scroll
- Active section tracking via `IntersectionObserver` with `rootMargin: '-40% 0px -40% 0px'`
- Animated underline on active link via `motion.span` with `animate={{ width }}`
- Mobile hamburger menu with animated open/close
- Cross-page navigation support via `usePathname()`

### ParallaxBackground (`ParallaxBackground.tsx`)

- Fixed full-screen background with gradient mesh, floating orbs, and grid overlay
- Mouse tracking via `useMotionValue` (zero re-renders) + `useSpring` for smoothing
- Floating particles (12, deterministic positions via `useMemo`) animate upward infinitely
- Respects `prefers-reduced-motion` via `useReducedMotion()` — skips orbs and particles

### LoadingScreen (`LoadingScreen.tsx`)

- 800ms splash (configurable via `delayMs` prop)
- Logo with pulsing glow shadow, brand name fade-in, bouncing dots
- `layoutId="brand"` on logo for shared layout transition with navbar
- Calls `onDone` callback on exit complete

### Page (`page.tsx`)

- Loading gate: shows `LoadingScreen` first, then `AnimatePresence` transitions to main content
- Custom cursor: `useMotionValue` for raw position → `useSpring` (stiffness: 500, damping: 28) for smooth following
- Cursor hidden on touch devices via CSS `@media (hover: none)`
- Smooth scroll handler for anchor links via global click listener
- Global styles via `<style jsx global>`: cursor, scrollbar, gradient animation

## Case Studies (`src/data/case-studies.ts`)

Each `CaseStudy` object contains:

```ts
{
  slug, title, subtitle, category, heroImage,
  overview, problem, solution,
  techStack: { name }[],
  features: { title, description }[],
  results: string[],
  liveUrl?, githubUrl?
}
```

Helper functions: `getCaseStudy(slug)` and `getAllSlugs()`.

Data sourced from the `procjets/*/claude.md` files for each real project.

## Styling

### Theme (globals.css `@theme` directive)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-darkBg` | `#0A0A0A` | Page background |
| `--color-darkPanel` | `rgba(255,255,255,0.04)` | Glass panel backgrounds |
| `--color-neonYellow` | `#FFD300` | Primary accent color |
| `--radius-glass` | `1.25rem` | Card border radius |
| `--shadow-glow` | Yellow glow (20px) | Hover effects |
| `--shadow-glowLg` | Yellow glow (40px) | Emphasized hover effects |
| `--animate-float` | 4s ease-in-out infinite | Floating elements |
| `--animate-pulseGlow` | 3s ease-in-out infinite | Pulsing glow effect |

### Utility Classes

- `.glass` — `bg-white/5 backdrop-blur-md border border-white/10 rounded-glass`
- `.hover-glow` — `shadow-glow` on hover
- `.section-pad` — `py-24 px-6 md:px-8`
- `.full-viewport` — `min-h-screen flex items-center justify-center`

### Custom Scrollbar

Yellow-to-orange gradient thumb, dark track. Defined in `page.tsx` global styles.

## Animation Patterns

| Pattern | Usage | API |
|---------|-------|-----|
| Scroll-driven transforms | Hero fade/scale, about text reveal, skills horizontal scroll | `useScroll` + `useTransform` |
| Spring physics | Custom cursor, parallax mouse tracking | `useSpring`, `useMotionValue` |
| Viewport-triggered | Section fade-ins, staggered card entrances | `whileInView`, `viewport: { once: true }` |
| Layout animations | Portfolio filter indicator, loading → navbar logo | `layoutId`, `layout` prop |
| Exit animations | Loading screen, portfolio filter transitions | `AnimatePresence`, `exit` prop |
| Hover/tap feedback | Buttons, links, social icons | `whileHover`, `whileTap` |
| Infinite loops | Tech marquee, floating particles, bouncing dots | `repeat: Infinity` |
| Reduced motion | ParallaxBackground skips particles/orbs | `useReducedMotion()` |

## Public Assets

```
public/
├── logo.png, loading-logo.png       # Brand logos
├── profile.jpg, profile.png         # Profile photos
├── ootb.png, pudci.png              # Project screenshots (only 2 of 6 exist)
├── resume.pdf                       # Downloadable resume
├── Michael_Ryan_Sia_Resume.pdf      # Alternate resume (0 bytes)
├── images/
│   ├── bg-scroll.jpg, devices.jpg/png, skills-bg.jpg  # Unused background images
│   └── testing.jpg                  # Empty placeholder
└── *.svg                            # Default Next.js icons
```

**Missing project images:** `hellobettercredit.png`, `creditadmiral-app.png`, `creditadmiral-site.png`, `acca.png` are referenced in portfolio.tsx but don't exist. The `ProjectCard` component handles this with a gradient+initials fallback via `onError`.

## Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build (next build)
npm run start    # Start production server (next start)
npm run lint     # Run ESLint (next lint)
```

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## State Summary

| Component | State | Purpose |
|-----------|-------|---------|
| `page.tsx` | `loadingDone` | Loading screen gate |
| `page.tsx` | `rawCursorX/Y` (motionValue) | Cursor position (no re-renders) |
| `navbar.tsx` | `scrolled`, `mobileMenuOpen`, `activeSection` | Header style, mobile menu, active link |
| `portfolio.tsx` | `selectedCategory` | Category filter |
| `portfolio.tsx` (`ProjectCard`) | `imgError` | Image fallback on load failure |
| `contact.tsx` | `formStatus`, `formData`, `focusedField` | Form state, input values, active underline |
| `skills.tsx` | None | CSS-only responsive (no JS state) |

## Known Issues & Notes

1. **Missing project images** — 4 of 6 project screenshots don't exist in `/public/`. Portfolio cards fall back to gradient+initials placeholders.
2. **No real form submission** — Contact form fakes the API call with `setTimeout`. No API routes exist.
3. **Unused files** — `data/projects.ts` (placeholder data), `types/project.ts` (legacy interface), all files in `ui/`, `hooks/`, `lib/`, `styles/` are empty placeholders.
4. **Filename typo** — `lib/sroll.ts` should be `lib/scroll.ts` (empty file regardless).
5. **Zone.Identifier files** — Git repo contains Windows NTFS alternate data stream files. Requires `git config core.protectNTFS false` to clone on Windows.
6. **0-byte files** — `Michael_Ryan_Sia_Resume.pdf` and `55106b9a-38ab-4af5-88e0-c9e25bcbd0b2.png` are empty.
7. **Skills scroll calibration** — The horizontal scroll `x` transform value (`-55%`) is calculated for typical viewport widths. May need adjustment on very wide or narrow desktop screens.
