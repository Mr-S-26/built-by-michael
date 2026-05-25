# CLAUDE.md - OOTB Creatives Codebase Walkthrough

## Project Overview

**Out of the Box Creatives (OOTB)** is a full-service creative and marketing agency website built with Next.js 15 (App Router). The site showcases the agency's services, case studies, team, career opportunities, and an academy/internship program. It includes an interactive contact system with email integration.

**Repo:** https://github.com/Mr-S-26/ootb-project
**Status:** Active development (v0.1.0)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.3.2 |
| UI Library | React | 19.0.0 |
| Language | TypeScript (strict) | 5.8.3 |
| Styling | TailwindCSS | 4.1.6 |
| Animation | Framer Motion | 12.11.3 |
| Icons | Lucide React, React Icons | 0.536.0, 5.5.0 |
| Email | Nodemailer (GoDaddy SMTP) | 7.0.3 |
| File Upload | Formidable | 3.5.4 |
| Notifications | react-hot-toast | 2.5.2 |
| Font | Montserrat (@fontsource), Geist | - |
| Deployment | Vercel | 42.3.0 |

---

## Directory Structure

```
ootb-creatives/
├── public/                          # Static assets (~291 files)
│   ├── bg/                          # Page background images (webp)
│   ├── logos/                       # 60+ client/brand logos
│   ├── images/
│   │   ├── team/                    # Team member photos
│   │   ├── careers/                 # Career page images
│   │   ├── creative/                # Creative section images
│   │   └── interns/                 # Intern photos by year/batch
│   ├── hero-video.mp4 / .webm       # Hero section video
│   └── [individual assets]          # Case study, service images
│
├── src/
│   ├── app/                         # Next.js App Router (pages)
│   │   ├── layout.tsx               # Root layout (metadata, fonts, Toaster)
│   │   ├── page.tsx                 # Home page (snap-scroll sections)
│   │   ├── globals.css              # Global styles, custom breakpoints, animations
│   │   ├── services/                # 4 service detail pages
│   │   ├── cases/                   # Case study listing + 2 detail pages
│   │   ├── careers/                 # Career listing + 4 job detail pages
│   │   ├── academy/                 # Academy overview + intern showcase
│   │   └── resources/               # Placeholder (coming soon)
│   │
│   ├── components/                  # Reusable React components
│   │   ├── Navbar.tsx               # Sticky responsive nav with auto-hide
│   │   ├── Hero.tsx                 # Video hero with expandable text
│   │   ├── ServicesHighlights.tsx   # Auto-rotating service cards
│   │   ├── ClientLogos.tsx          # Animated logo carousel (70+ logos)
│   │   ├── WithTeamSlider.tsx       # Team carousel with modal profiles
│   │   ├── CreativeSection.tsx      # Academy/Careers/Resources CTA cards
│   │   ├── FinalContactSection.tsx  # Multi-tab contact form
│   │   └── FallbackImage/index.tsx  # Image wrapper with error fallback
│   │
│   ├── pages/api/                   # Legacy API routes
│   │   └── contact.ts               # Email form handler (POST)
│   │
│   └── data/
│       └── teamData.ts             # Team member data (legacy reference)
│
├── tailwind.config.js               # Custom 3xl breakpoint (1600px)
├── postcss.config.mjs               # @tailwindcss/postcss plugin
├── tsconfig.json                    # Strict TS, path alias @/* -> src/*
├── next.config.ts                   # Minimal Next.js config
└── eslint.config.mjs                # next/core-web-vitals + typescript
```

---

## Routes

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with 6 snap-scroll sections (Hero, Services, Clients, Team, Creative, Contact) |
| `/services/events` | Events Management service detail |
| `/services/public-relations` | Public Relations service detail |
| `/services/branding` | Branding & Digital Marketing service detail |
| `/services/commercial-production` | Commercial Production service detail |
| `/cases` | Case studies listing |
| `/cases/georges` | George Cares campaign case study |
| `/cases/jml` | JML Flavor Festival case study |
| `/careers` | Career listings page |
| `/careers/marketing` | Digital Marketing Strategist job posting |
| `/careers/web-design` | Copy Writer job posting |
| `/careers/accounts` | Accounts Manager job posting |
| `/careers/multimedia` | Multimedia Artist job posting |
| `/academy` | OOTB Academy overview |
| `/academy/meet-the-interns` | Intern showcase by year (2022-2024) |
| `/resources` | Coming soon placeholder |

### API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Handles multipart form submissions. Routes emails to different recipients based on `form_type` (client, crewmate, exploring). Supports resume file attachments (PDF/DOC/DOCX). |

---

## Components

### Navbar (`components/Navbar.tsx`)
- Sticky header with backdrop blur
- Auto-hides on scroll down, reappears on scroll up
- Mobile hamburger menu with dropdown
- Links: Services, Clients, Crewmates, Academy, Careers, Resources, Radio Us, Cases
- Accepts `scrollContainerRef` prop for scroll tracking

### Hero (`components/Hero.tsx`)
- Full-viewport video background (webm/mp4 sources)
- Expandable "Read More" text with toggle
- Mute/unmute control
- Framer Motion text entry animations

### ServicesHighlights (`components/ServicesHighlights.tsx`)
- 4 service cards: Events, PR, Digital Marketing, Commercial Production
- Desktop: circular highlight with auto-rotating floating cards (3s interval)
- Mobile: static grid layout
- Each card links to its service detail page

### ClientLogos (`components/ClientLogos.tsx`)
- "Recently Added" section (7 logos, vertical scroll)
- "Clients Onboard" section (63 logos)
  - Desktop: continuous horizontal infinite-slide CSS animation
  - Mobile: 2-row horizontal scroll
- Uses custom `animate-infinite-slide` keyframe from globals.css

### WithTeamSlider (`components/WithTeamSlider.tsx`)
- 12 team members with photos, titles, roles, descriptions
- 3-card carousel with auto-rotation (3s)
- Click-to-open modal with full bio
- Gradient backgrounds per member
- FallbackImage support for broken images

### CreativeSection (`components/CreativeSection.tsx`)
- 3 CTA cards linking to Academy, Careers, Resources
- Staggered Framer Motion entry animation

### FinalContactSection (`components/FinalContactSection.tsx`)
- 3-tab form system:
  - **Client:** Name, email, phone, company, desired service dropdown + Google Forms link
  - **Potential Crewmate:** Name, email, phone, position dropdown, interview date/time, resume upload
  - **Just Exploring:** Name, email, phone, thoughts textarea
- Submits to `/api/contact` as multipart/form-data
- Toast notifications for success/error feedback
- Phone input restricted to numeric only

### FallbackImage (`components/FallbackImage/index.tsx`)
- Wraps Next.js `Image` component
- Falls back to `fallbackSrc` prop on load error
- Used in service pages for webp-to-jpg fallback

---

## Styling

### Design Tokens
- **Primary:** Orange (#ff6600 / orange-500) for CTAs and accents
- **Background:** Black with overlays (black/80, black/60)
- **Text:** White primary, gray secondary
- **Accent Gradients:** Purple shades, orange-to-white

### Custom Breakpoints (globals.css @theme)
| Breakpoint | Size |
|-----------|------|
| sm | 20rem (320px) |
| md | 37.5rem (600px) |
| lg | 64rem (1024px) |
| xl | 80rem (1280px) |
| 2xl | 96rem (1536px) |
| 3xl | 100rem (1600px) |

### Custom CSS
- `rotate-y-right` / `rotate-y-left` - 3D perspective rotations for cards
- `animate-infinite-slide` - 30s linear infinite horizontal scroll for logos
- `scroll-behavior: smooth` on html
- `overflow-x: hidden` on body

### Animation Patterns (Framer Motion)
- `whileInView` for scroll-triggered animations
- `AnimatePresence` for mount/unmount transitions
- Variants objects for reusable animation configs
- Stagger children for sequential entry effects
- `whileHover` scale effects on interactive elements

---

## State Management

No centralized state library. All state is component-local using React hooks:

- `useState` for UI state (active tabs, carousel indices, menu visibility, loading)
- `useRef` for DOM references (video, scroll containers)
- `useEffect` for side effects (scroll listeners, auto-rotation intervals, cleanup)

---

## API & Email Integration

### Contact Form Flow
1. User fills form in `FinalContactSection`
2. Form submitted as `multipart/form-data` to `/api/contact`
3. `formidable` parses fields and file uploads
4. Email routed based on `form_type`:
   - `crewmate` -> `EMAIL_TO_RECRUIT` env var
   - `client` / `exploring` -> `EMAIL_TO_HELLO` env var
5. `nodemailer` sends via GoDaddy SMTP (`smtpout.secureserver.net:465`)
6. Resume files attached if present, then cleaned up

### Required Environment Variables
```
EMAIL_USER=<sender email address>
EMAIL_PASS=<email password>
EMAIL_TO_HELLO=<client inquiry recipient>
EMAIL_TO_RECRUIT=<recruitment recipient>
```

---

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## Configuration

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path alias: `@/*` maps to `src/*`
- Target: ES2017, Module: ESNext

### Next.js (`next.config.ts`)
- Minimal/default configuration

### Tailwind (`tailwind.config.js`)
- Content paths: `./pages/**/*`, `./components/**/*`
- Custom screen: `3xl: 1600px`
- Note: Content paths may need updating to include `./src/**/*` for proper purging

### ESLint (`eslint.config.mjs`)
- Extends `next/core-web-vitals` and `next/typescript`

---

## Key Patterns & Conventions

1. **All interactive components are client components** (`'use client'` directive)
2. **Mobile-first responsive design** using Tailwind breakpoints with `hidden md:block` / `block lg:hidden`
3. **Data is mostly hardcoded inline** in component files rather than external data files
4. **WebP primary with JPG/PNG fallbacks** for image optimization
5. **Framer Motion** is the standard for all animations and transitions
6. **PascalCase** for components, **camelCase** for functions/variables
7. **Service pages** follow a consistent layout: left sticky panel + right animated content
8. **Career detail pages** share a common structure: job info + apply CTA + decorative imagery
9. **The API route uses the legacy `pages/api/` directory**, not the App Router `route.ts` pattern

---

## Known Issues / Notes

- `Zone.Identifier` files are committed to the repo (Windows ADS metadata) - these cause checkout failures on Windows
- Tailwind content config in `tailwind.config.js` may not cover `src/` directory files (uses `./pages/**` and `./components/**`)
- `emailjs-com` is listed as a dependency but appears unused (superseded by nodemailer)
- `swiper` CSS is imported in globals.css but `swiper` is not in package.json dependencies
- The `src/data/teamData.ts` file exists as legacy reference; active team data lives in `WithTeamSlider.tsx`
- Hero video files are large (49MB mp4, 30MB webm) - consider CDN or compression
