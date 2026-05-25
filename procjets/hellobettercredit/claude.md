# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Response Style

Be straightforward and specific. Limit explanations to ≤3 sentences unless more detail is required for correctness or explicitly requested.

## Project Overview

**Hello Better Credit** is a production-ready affiliate marketing platform for credit cards. It connects credit card issuers with affiliate marketers who promote cards through embeddable widgets on their websites. The platform tracks clicks, conversions, and commissions with a multi-tier affiliate network.

**Live URL**: https://hellobettercredit.com
**Admin Panel**: https://hellobettercredit.com/admin/login
**Affiliate Portal**: https://hellobettercredit.com/affiliate/login

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 13 (App Router, NOT Pages Router) |
| Database | MySQL 5.7+ via Prisma ORM |
| Auth | NextAuth.js with credentials provider (JWT strategy) |
| Styling | Bootstrap 5 + custom SCSS (**NO Tailwind CSS**) |
| Charts | Recharts |
| Testing | Jest + React Testing Library + Playwright |
| Hosting | cPanel shared hosting (RHEL/CentOS) |
| Process Manager | PM2 |
| Email | Mailgun |
| Bot Protection | reCAPTCHA v3 + rate limiting + honeypot |

## Commands

### Development (Local - Windows)
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm start                # Start production server via server.js
npm run lint             # Run ESLint
```

### Testing
```bash
npm test                        # Run all Jest tests (258 total)
npm run test:watch              # Jest watch mode
npm run test:coverage           # Jest with coverage
npm test -- __tests__/api/      # Run specific test directory

npm run test:e2e                # Playwright E2E (headless)
npm run test:e2e:ui             # Playwright interactive UI
npm run test:e2e:headed         # Playwright with visible browser
```

### Database (Prisma)
```bash
npx prisma generate      # Regenerate client after schema changes
npx prisma db push       # Push schema to database (dev)
npx prisma studio        # Open database GUI browser
npx prisma migrate dev   # Create migration (production changes)
```

## Deployment

### Server Info
- **Host**: cPanel shared hosting (RHEL/CentOS)
- **User**: `hellobettercredi`
- **App directory**: `/home/hellobettercredi/hellobettercredit`
- **Web root**: `/home/hellobettercredi/public_html` (Apache proxies to port 3000)
- **Port**: 3000
- **Process manager**: PM2 (under `hellobettercredi` user, NOT root)

### How to Deploy

**1. Push code from local machine:**
```bash
git add <files>
git commit -m "message"
git push origin main
```

**2. SSH into cPanel Terminal and run:**
```bash
cd ~/hellobettercredit
./deploy.sh
```

The `deploy.sh` script does: `git pull` → `npm install --legacy-peer-deps` → `npx prisma generate` → `./rebuild.sh`

The `rebuild.sh` script does: `./stop.sh` → `rm -rf .next` → `npx prisma generate` → `npm run build` → `./start.sh`

**3. If scripts have permission issues:**
```bash
chmod +x deploy.sh rebuild.sh start.sh stop.sh restart.sh
sed -i 's/\r$//' deploy.sh rebuild.sh start.sh stop.sh restart.sh  # Fix Windows line endings
```

### Manual Deployment (if scripts fail)
```bash
cd ~/hellobettercredit
git pull origin main
npm install --legacy-peer-deps
npx prisma generate
rm -rf .next
npm run build
pm2 restart hellobettercredit
```

### PM2 Commands (on server)
```bash
pm2 list                              # Check process status
pm2 logs hellobettercredit --lines 20 # View recent logs
pm2 restart hellobettercredit         # Restart app
pm2 stop hellobettercredit            # Stop app
pm2 delete hellobettercredit          # Remove from PM2
pm2 start ecosystem.config.js         # Register and start fresh
```

### How the Server Architecture Works

```
Browser → hellobettercredit.com (Apache/cPanel)
       → public_html/.htaccess (ProxyPass to localhost:3000)
       → server.js (custom Next.js server)
       → Next.js App Router handles request
       → Prisma ORM → MySQL database
```

- `server.js` is a custom HTTP server that wraps Next.js (required for cPanel)
- `ecosystem.config.js` configures PM2 (fork mode, port 3000, 500M memory limit, auto-restart)
- Apache `.htaccess` in `public_html/` proxies all HTTP requests to port 3000
- Static uploads are served via symlink: `~/public_html/uploads → ~/hellobettercredit/public/uploads`

### Common Deployment Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| `EADDRINUSE` port 3000 | Another process on port 3000 | `ss -tlnp \| grep 3000` to find PID, then `kill <PID>`. If root-owned: need `sudo fuser -k 3000/tcp` |
| Prisma "Query Engine not found" | Wrong binary target for server OS | Run `npx prisma generate` ON THE SERVER (not just locally). Schema has `binaryTargets = ["native", "rhel-openssl-1.1.x", "debian-openssl-1.1.x"]` |
| Site loads but no data / nav links broken | Server running old build or wrong Prisma engine | `rm -rf .next && npx prisma generate && npm run build && pm2 restart hellobettercredit` |
| `ChunkLoadError` in browser console | Browser cached old JS chunks after rebuild | Hard refresh: Ctrl+Shift+R, or open in incognito window |
| Build fails with `EACCES` on `.next/` | Root-owned files from previous `sudo` session | `sudo chown -R hellobettercredi:hellobettercredi ~/hellobettercredit/.next` or delete `.next` via cPanel File Manager |
| `bad interpreter: /bin/bash^M` | Windows line endings in shell scripts | `sed -i 's/\r$//' deploy.sh rebuild.sh start.sh stop.sh restart.sh` |
| `Permission denied` running scripts | Scripts not executable | `chmod +x deploy.sh rebuild.sh start.sh stop.sh restart.sh` |
| Uploaded files return 404 | Web root is `public_html`, not project dir | Create symlink: `ln -s ~/hellobettercredit/public/uploads ~/public_html/uploads` |
| `git pull` conflicts on server | Local server changes to tracked files | `git stash && git pull origin main` |

### Important Deployment Rules
- **NEVER run PM2 as root** on this server. A root PM2 process previously caused persistent `EADDRINUSE` conflicts. Always run as `hellobettercredi` user.
- **Always run `npx prisma generate` on the server** after pulling changes. The server is RHEL but local dev is Windows/Debian - the Prisma query engine binary differs per OS.
- **The `.next` directory should be deleted before rebuilding** to avoid stale chunks.

## Architecture

### Key Architectural Decisions

1. **NO Tailwind CSS**: Bootstrap 5 exclusively
   - Use Bootstrap utility classes over custom styles
   - NO `badge` class - use styled `<span>` elements instead
   - Status indicators: `<span className="bg-primary text-white px-3 py-1 rounded">`

2. **Custom Server**: `server.js` wraps Next.js for cPanel compatibility
   - Static export disabled (admin panel requires server-side features)
   - Images unoptimized for cPanel hosting
   - Handles proxy headers (`x-forwarded-proto`, `x-forwarded-host`)

3. **Dual Authentication System**: Separate auth for admin and affiliates
   - Admin: `/api/auth` → authenticates against `User` table
   - Affiliate: `/api/affiliate-auth` → authenticates against `AffiliateApplication` table
   - Both enforce single-session and 30-min inactivity timeout

4. **Instant Auto-Approval**: All affiliate registrations get `approved_pending_docs` status immediately
   - Partner account is NOT created at registration (created when admin clicks "Complete Document Review")
   - Documents can be uploaded during registration or deferred
   - Commission hold applies until documents are reviewed and approved

### Directory Structure

```
app/
├── (index)/              # Public homepage
├── admin/                # Admin CMS (auth required)
│   ├── cards/            # Card management CRUD
│   ├── affiliates/       # Affiliate application review
│   ├── analytics/        # Analytics dashboard (Recharts)
│   ├── approvals/        # Approval database moderation
│   ├── reports/          # Commission reports
│   └── partners/tree/    # Referral tree visualization
├── affiliate/            # Affiliate portal
│   ├── page.tsx          # Public registration
│   ├── login/            # Affiliate login
│   ├── dashboard/        # Dashboard (auth required)
│   └── widget/           # Widget code generator
├── approval-database/    # Public approval database
├── api/
│   ├── admin/            # Admin APIs (protected by getAuthSessionWithPermission)
│   │   ├── affiliates/[id]/approve/       # Approve application, create Partner
│   │   ├── affiliates/[id]/complete-docs/ # Complete doc review, create Partner if needed
│   │   ├── affiliates/[id]/reject/        # Reject application
│   │   ├── analytics/                     # Admin analytics data
│   │   ├── approvals/                     # Moderation (flag/unflag/delete)
│   │   ├── cards/                         # Card CRUD
│   │   ├── dashboard/stats/               # Real-time dashboard stats
│   │   └── reports/commissions/           # Commission reports + CSV export
│   ├── affiliate/        # Affiliate APIs (protected by getAffiliateSession)
│   │   ├── analytics/    # Affiliate analytics
│   │   ├── register/     # Public registration endpoint
│   │   ├── widgets/      # Widget CRUD
│   │   └── recruits/     # Referral tree data
│   ├── approvals/        # Public approval database APIs
│   ├── track/            # Public tracking (click/conversion)
│   └── widget/[widgetCode]/ # Public widget renderer

components/
├── admin/                # Admin panel components
│   ├── AdminNav.tsx      # Shared admin navigation (used on all admin pages)
│   ├── affiliates/       # Affiliate review components
│   └── approvals/        # Approval moderation components
├── affiliate/            # Affiliate portal components
├── analytics/            # Chart components (PerformanceChart, TopPerformersChart, etc.)
├── approvals/            # Public approval database components
├── common/               # Shared (ErrorBoundary, etc.)
├── navBar/               # Public site navigation
└── home/                 # Homepage sections

lib/
├── auth/
│   ├── auth-options.ts           # Admin NextAuth config
│   ├── affiliate-auth-options.ts # Affiliate NextAuth config
│   ├── get-session.ts            # Admin session helper (getAuthSessionWithPermission)
│   └── get-affiliate-session.ts  # Affiliate session helper (getAffiliateSession)
├── tracking.ts                   # Click/conversion tracking, commission calculation
├── commission-utils.ts           # Commission hold/release utilities
├── credit-score-utils.ts         # Centralized 5-level credit score classification
├── approval-utils.ts             # Approval database utilities
├── widget-utils.ts               # Widget rendering utilities
├── email.ts                      # Mailgun email service with retry
└── email-templates.ts            # HTML email templates

prisma/
└── schema.prisma                 # Database schema (MySQL)

public/
├── js/hbc-tracker.js             # Client-side tracking script
├── uploads/                      # User uploads (symlinked to public_html on server)
├── robots.txt                    # SEO crawling rules
└── manifest.json                 # PWA manifest

styles/
├── _accessibility.scss           # WCAG 2.1 AA compliance styles
└── _base/_responsive.scss        # Mobile-first responsive styles
```

### Database Models (Prisma)

| Model | Purpose |
|-------|---------|
| `User` | Admin users with role-based permissions (`canEditCards`, `canManagePartners`, `canViewAnalytics`) |
| `Card` | Credit card data with JSON fields (`cardType`, `bestFor`, `prosAndCons`) |
| `AffiliateApplication` | Affiliate registrations. Statuses: `pending`, `approved`, `approved_pending_docs`, `needs_revision`, `rejected` |
| `Partner` | Approved affiliates with API credentials, partner code (`HBC-XXXXXXXX`), commission rate |
| `Widget` | Embeddable widget configs (display mode, card filters, credit score filter) |
| `Click` | Click tracking with partner/card attribution |
| `Conversion` | Conversion tracking with commission amounts, held status |
| `AnalyticsDaily` | Aggregated daily analytics per partner per card |
| `EmailLog` | Email delivery tracking with retry mechanism |
| `Session` | Auth sessions (`userId` nullable for affiliate sessions) |
| `CardApprovalSubmission` | User-submitted approval data with moderation flags |

### Authentication & Authorization

**API Protection Patterns:**
```typescript
// Admin API routes:
import { getAuthSessionWithPermission } from "@/lib/auth/get-session";

export async function GET() {
  const { session, error } = await getAuthSessionWithPermission("canViewAnalytics");
  if (error) return error;
  // ... authorized logic
}

// Affiliate API routes:
import { getAffiliateSession } from "@/lib/auth/get-affiliate-session";

export async function GET() {
  const { session, error } = await getAffiliateSession();
  if (error) return error;
  // ... authorized logic
}
```

**Session Security:**
- Single session only: logging in from a new device invalidates old sessions
- 30-minute inactivity timeout with automatic logout
- Passwords hashed with bcrypt (12 rounds)
- `passwordHash` excluded from all API responses

## Core Business Flows

### Affiliate Registration → Approval Flow

```
1. User visits /affiliate and fills registration form
   → Creates AffiliateApplication (status = "approved_pending_docs")
   → Documents uploaded OR deferred with "Submit later" checkbox
   → NO Partner record created yet

2. Admin reviews at /admin/affiliates/[id]
   → Views submitted documents (Driver's License, W9, Voided Check)
   → Clicks "Complete Document Review" button
   → API: POST /api/admin/affiliates/[id]/complete-docs
   → Creates Partner record (partner code, API keys, commission rate)
   → Updates status to "approved"
   → Releases any held commissions
   → Sends approval email to affiliate

3. Affiliate logs in at /affiliate/login
   → Accesses dashboard, creates widgets, views stats
```

**Important**: The `complete-docs` endpoint handles both cases:
- Application WITH existing Partner (approved via admin approve flow) → just updates status
- Application WITHOUT Partner (instant auto-approval flow) → creates Partner AND updates status

### Commission & Tracking Flow

```
1. Affiliate creates widget at /affiliate/widget
2. Widget embedded on affiliate's website via iframe/script
3. Visitor clicks card link → tracked via /api/track/click
   → Records: partnerId, cardId, IP, user agent, referrer
   → Sets 30-day attribution cookie

4. Card issuer reports conversion to HelloBetterCredit
5. Admin records conversion via /api/track/conversion
   → Commission calculated based on Partner's commissionRate
   → Two-tier split: 95% to affiliate, 5% to parent (if referred)
   → If affiliate status is approved_pending_docs → commission held

6. Admin pays commissions via /admin/reports
   → Bulk payment processing, CSV export, mark-as-paid
```

**Important**: Card `applyUrl` must contain HelloBetterCredit's affiliate tracking link from card issuers, NOT generic URLs.

### Credit Score Classification System

Centralized in `lib/credit-score-utils.ts`:
- Excellent (750+), Good (700-749), Fair (650-699), Building (<650), No Credit History
- `getCreditScoreOptions()` - returns all options
- `cardMatchesCreditScore(card, creditScoreKey)` - filters cards
- Used across: navigation, listings, filters, widgets, comparison, quiz, chatbot
- **Always use this centralized system** for consistency

## Common Development Workflows

### Adding a New Card Field
1. Update `prisma/schema.prisma` (Card model)
2. Run `npx prisma generate && npx prisma db push`
3. Update `components/admin/cards/CardForm.tsx`
4. Update API validation in `app/api/admin/cards/route.ts`

### Adding a New Admin Page
1. Create page at `app/admin/your-page/page.tsx`
2. Import and use `AdminNav` component for consistent navigation
3. Protect with `getAuthSessionWithPermission()`
4. Add link to `components/admin/AdminNav.tsx`

### Adding a New API Route
1. Create route at `app/api/admin/your-route/route.ts` (or `affiliate/`)
2. Use appropriate auth helper at the top
3. Use `PrismaClient` for database access
4. Return `NextResponse.json()` responses

### Debugging Login Issues
1. Check logs in `lib/auth/auth-options.ts` or `lib/auth/affiliate-auth-options.ts`
2. Verify user/application exists: `npx prisma studio`
3. Check `active` field / `status` field
4. Verify password hash matches
5. Check sessions table for valid sessionId

### Rate Limiting Issues
- Affiliate registration: 3 attempts per hour per IP (in-memory store)
- Approval submissions: 3 per hour per IP
- Rate limit resets when server restarts (in-memory, not persisted)
- If hit during testing: restart dev server or wait

## Environment Variables

```
DATABASE_URL=mysql://user:pass@host:3306/db
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://hellobettercredit.com

# Bot Protection (Google reCAPTCHA v3)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<site-key>
RECAPTCHA_SECRET_KEY=<secret-key>

# Email (Mailgun)
MAILGUN_API_KEY=<api-key>
MAILGUN_DOMAIN=hellobettercredit.com
MAILGUN_API_URL=https://api.mailgun.net
EMAIL_FROM=noreply@hellobettercredit.com
ADMIN_EMAIL=admin@hellobettercredit.com
```

## UI Rules

- **Bootstrap 5 only** - no Tailwind CSS, no `badge` class
- **Loading spinners**: Always use `style={{ width: '3rem', height: '3rem', color: '#hexcode' }}` with Bootstrap spinner
- **Status indicators**: `<span className="bg-primary text-white px-3 py-1 rounded">Status</span>`
- **Admin nav**: Always use shared `AdminNav` component on admin pages
- **Image handling**: Support both URL and file upload; components use fallback icons for missing images
- **Accessibility**: WCAG 2.1 AA compliance with ARIA attributes, keyboard nav, focus indicators, 44x44px touch targets

## Project File Reference

### Configuration Files
| File | Purpose |
|------|---------|
| `server.js` | Custom Next.js HTTP server for cPanel |
| `ecosystem.config.js` | PM2 configuration (fork mode, port 3000) |
| `prisma/schema.prisma` | Database schema with `binaryTargets` for cross-platform |
| `deploy.sh` | Full deployment script (pull → install → generate → rebuild) |
| `rebuild.sh` | Build and restart (stop → clean → generate → build → start) |
| `restart.sh` | Kill port 3000 and start server |
| `start.sh` / `stop.sh` | PM2 start/stop helpers |

### Documentation Files
| File | Content |
|------|---------|
| `DEPLOYMENT_GUIDE.md` | Server deployment steps and troubleshooting |
| `TRACKING_SYSTEM.md` | Click/conversion tracking documentation |
| `COMMISSION_REPORTS_TESTS.md` | Commission system test documentation |
| `COMMISSION_HOLD_IMPLEMENTATION_SUMMARY.md` | Commission hold feature |
| `PARENT_AFFILIATE_SYSTEM_COMPLETE.md` | Two-tier affiliate system |
| `TWO_TIER_COMMISSION_TESTS.md` | Two-tier commission tests |
| `SEO_OPTIMIZATION_GUIDE.md` | 25-step SEO implementation guide |
| `RECAPTCHA_SETUP.md` | Bot protection setup |
| `MAILGUN_SETUP.md` | Email service setup |
| `APPROVAL_DATABASE_TESTS.md` | Approval database tests |
| `BOT_PROTECTION_TEST_SUMMARY.md` | Bot protection tests |
| `E2E_TESTING_SETUP.md` | Playwright E2E setup |
| `EMAIL_TESTING_SUMMARY.md` | Email system tests |
| `DASHBOARD_REALTIME_TEST_SUMMARY.md` | Dashboard stats tests |

## Feature Status

### Completed
- **Phase 1**: Partner Portal (login, dashboard, widgets, tracking, real-time stats)
- **Phase 2**: Commission reports, Parent/Super Affiliate system, Enhanced Analytics Dashboard
- **Phase 3**: Approval Database (MyFICO-style user submissions with admin moderation)
- **SEO**: Full metadata, sitemap, structured data, PWA support
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile**: Responsive design, touch targets, optimized animations

### Next Priority (Phase 4)
- Widget pagination (cards per page instead of max cards)
- Comment system for card reviews
- Contact form bot protection (reCAPTCHA v3)
- Card image population (300+ cards)
- Performance optimization (caching, CDN)

### Non-Technical Tasks
- Apply for affiliate programs (Chase, Amex, Capital One, Discover, Citi)
- Content creation for Credit Academy
- Legal pages (Privacy Policy, Terms of Service)

## Known Constraints

1. **Bootstrap 5 only** - no Tailwind, no `badge` class
2. **cPanel hosting** - static export disabled, images unoptimized, custom server.js required
3. **Session.userId nullable** - supports both admin and affiliate sessions in one table
4. **Rate limiting is in-memory** - resets on server restart
5. **Prisma binary targets** - must include `rhel-openssl-1.1.x` for production server
6. **Image paths** - local dev may show fallback icons if production uploads not synced
