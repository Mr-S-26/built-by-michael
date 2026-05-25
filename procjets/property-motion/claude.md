# Property Motion - Comprehensive Codebase Walkthrough

**Last Updated**: May 25, 2026
**Status**: Production Ready

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture (Supabase Edge Functions)](#backend-architecture)
6. [Video Generation Pipeline](#video-generation-pipeline)
7. [Database Schema](#database-schema)
8. [Authentication & Security](#authentication--security)
9. [Third-Party Integrations](#third-party-integrations)
10. [Storage & Assets](#storage--assets)
11. [Configuration & Utilities](#configuration--utilities)
12. [Overlay Layout System](#overlay-layout-system)
13. [Environment Variables](#environment-variables)
14. [Deployment](#deployment)
15. [Known Issues & Gotchas](#known-issues--gotchas)
16. [Naming Conventions](#naming-conventions)

---

## Project Overview

Property Motion is a SaaS platform that generates short-form real estate marketing videos from property photos. Users upload 3-10 property images, enter listing details, and the system produces a polished 9:16 (vertical/mobile) video with:

- AI-generated motion from still images (Runway Gen-4 Turbo)
- Property details overlay on the first clip
- Agent contact card on the final clip
- AI-written voiceover narration (Anthropic Claude + ElevenLabs TTS)
- Background music from a curated library
- Professional stitching with fade transitions (Shotstack)

The full pipeline: **Images → Runway (motion clips) → Shotstack (stitch + overlays + audio) → Final MP4**

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui (Radix) | Component library (30+ components) |
| React Router 6 | Client-side routing |
| TanStack React Query 5 | Server state management |
| Lucide React | Icon library |
| Zod | Schema validation |
| React Hook Form | Form handling |
| Recharts | Dashboard charts |

### Backend
| Technology | Purpose |
|---|---|
| Supabase | Database, Auth, Storage, Edge Functions |
| Deno | Edge function runtime |
| PostgreSQL | Database (via Supabase) |
| Stripe | Payments & subscriptions |

### AI / Video Services
| Service | Purpose |
|---|---|
| Runway ML (Gen-4 Turbo) | Image-to-video generation |
| Shotstack | Video stitching, overlays, audio mixing |
| Anthropic Claude (Sonnet 4.5) | AI script generation |
| ElevenLabs | Text-to-speech voiceovers |
| ScraperAPI | Property listing scraping |

---

## Directory Structure

```
Property-Motion/
├── src/
│   ├── App.tsx                          # Root component, routing, providers
│   ├── main.tsx                         # Entry point, React DOM render
│   ├── index.css                        # Global styles + Tailwind directives
│   │
│   ├── pages/
│   │   ├── Index.tsx                    # Landing page (hero, pricing, features, FAQs)
│   │   ├── Login.tsx                    # Email/password sign-in
│   │   ├── Signup.tsx                   # User registration
│   │   ├── Dashboard.tsx                # Video library, search, status tracking
│   │   ├── CreateVideo.tsx              # Main video generation interface (~670 lines)
│   │   ├── CreateComplete.tsx           # Post-generation success screen
│   │   ├── Settings.tsx                 # Profile, subscription, billing
│   │   └── NotFound.tsx                 # 404 page
│   │
│   ├── components/
│   │   ├── create-video/
│   │   │   ├── index.ts                 # Barrel exports for all create-video components
│   │   │   ├── LeftSidebar.tsx          # Recent videos, template selector
│   │   │   ├── RightPanel.tsx           # Property preview, generation controls, status
│   │   │   ├── PhotoUpload.tsx          # Drag-drop upload with camera angle per image
│   │   │   ├── PropertyDetailsForm.tsx  # Address, price, beds, baths, features form
│   │   │   ├── PropertySourceSelector.tsx # Upload vs. URL scraping toggle
│   │   │   ├── CustomizationSection.tsx # Voice, music, template, agent info pickers
│   │   │   ├── VideoTemplateSelector.tsx # 6 template cards with previews
│   │   │   ├── AgentPhotoUpload.tsx     # Agent photo + contact details
│   │   │   └── ScriptGeneratorSection.tsx # AI script generation + manual textarea
│   │   │
│   │   ├── ui/                          # shadcn/ui primitives (30+ components)
│   │   │   ├── button.tsx, input.tsx, select.tsx, dialog.tsx, tabs.tsx ...
│   │   │   ├── toaster.tsx, sonner.tsx  # Toast notification systems
│   │   │   └── ...
│   │   │
│   │   ├── Navbar.tsx                   # Fixed top nav with auth state
│   │   ├── Footer.tsx                   # Site footer
│   │   ├── NavLink.tsx                  # Navigation link component
│   │   ├── ProtectedRoute.tsx           # Auth guard wrapper
│   │   └── SubscriptionModal.tsx        # Subscription upsell dialog
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx              # Global auth state (user, session, signUp/In/Out)
│   │
│   ├── config/
│   │   ├── musicLibrary.ts             # 15 tracks across 5 categories with metadata
│   │   ├── musicMapping.ts             # Frontend display names → backend music IDs
│   │   └── voiceMapping.ts             # Frontend voice names → ElevenLabs voice IDs
│   │
│   ├── hooks/
│   │   ├── use-toast.ts                # Custom toast hook (reducer-based, limit: 1)
│   │   └── use-mobile.tsx              # Responsive breakpoint hook
│   │
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client re-export
│   │   └── utils.ts                    # cn() - Tailwind class merge utility
│   │
│   ├── utils/
│   │   ├── uploadToStorage.ts          # Upload images to Supabase Storage (batches of 3)
│   │   ├── uploadToStorage.test.ts     # Upload utility tests
│   │   └── imageCompression.ts         # Canvas-based compression (max 800px, 0.7 quality)
│   │
│   └── integrations/
│       └── supabase/
│           ├── client.ts               # Auto-generated Supabase client instance
│           └── types.ts                # Auto-generated database types
│
├── supabase/
│   ├── config.toml                     # Supabase project config (project ID, JWT settings)
│   │
│   ├── functions/                      # Deno Edge Functions
│   │   ├── generate-video/index.ts     # Orchestrator: validates, creates DB record, kicks off Runway batch
│   │   ├── generate-runway-batch/index.ts # Submits images to Runway Gen-4 Turbo API
│   │   ├── check-runway-batch/index.ts # Polls Runway task statuses
│   │   ├── stitch-video/index.ts       # Shotstack composition (clips + overlays + audio)
│   │   ├── video-status/index.ts       # Unified status poller (Runway → Shotstack handoff)
│   │   ├── generate-audio/index.ts     # ElevenLabs TTS voiceover generation
│   │   ├── generate-script/index.ts    # Anthropic Claude script generation
│   │   ├── scrape-property/index.ts    # ScraperAPI property scraping
│   │   ├── preview-voice/index.ts      # Voice preview generation
│   │   ├── create-checkout-session/index.ts  # Stripe checkout
│   │   ├── create-portal-session/index.ts    # Stripe billing portal
│   │   ├── stripe-webhook/index.ts     # Stripe event handler
│   │   │
│   │   ├── check-luma-batch/           # Legacy (Luma AI - deprecated)
│   │   ├── check-luma-status/          # Legacy (Luma AI - deprecated)
│   │   ├── generate-luma-batch/        # Legacy (Luma AI - deprecated)
│   │   ├── generate-luma-intro/        # Legacy (Luma AI - deprecated)
│   │   ├── _backup/                    # Old backups
│   │   ├── _backup_gen4_turbo/         # Runway Gen-4 Turbo backup
│   │   └── _backup_pre_runway/         # Pre-Runway migration backup
│   │
│   └── migrations/
│       ├── 20260203210628_*.sql        # Initial auto-generated migration
│       ├── 20260204_add_core_schema.sql # Core 4-table schema (properties, videos, scraping_jobs, user_preferences)
│       ├── 20260208_add_stripe_fields.sql # Stripe subscription fields on user_preferences
│       └── 20260209_add_free_trial_tracking.sql # Free trial tracking
│
├── public/                             # Static assets
├── dist/                               # Production build output
│
├── package.json                        # Dependencies & scripts
├── vite.config.ts                      # Vite config (React SWC plugin, path aliases)
├── tsconfig.json                       # TypeScript config
├── tailwind.config.ts                  # Tailwind theme customization
├── eslint.config.js                    # ESLint rules
├── components.json                     # shadcn/ui configuration
└── .env                                # Environment variables (Supabase URLs, Stripe keys)
```

---

## Frontend Architecture

### Routing (`src/App.tsx`)

```
/                    → Index.tsx        (public - landing page)
/login               → Login.tsx        (public - sign in)
/signup              → Signup.tsx       (public - register)
/dashboard           → Dashboard.tsx    (protected - video library)
/create              → CreateVideo.tsx  (protected - video generator)
/create/complete     → CreateComplete.tsx (protected - success screen)
/settings            → Settings.tsx     (protected - profile & billing)
*                    → NotFound.tsx     (404)
```

Protected routes are wrapped with `<ProtectedRoute>` which checks `useAuth()` for an active session.

### Provider Hierarchy

```
QueryClientProvider (TanStack React Query)
  └─ TooltipProvider (Radix)
      ├─ Toaster (shadcn toast)
      ├─ Sonner (sonner toast)
      └─ BrowserRouter
          └─ AuthProvider (Supabase auth state)
              └─ Routes
```

### State Management

- **Global auth**: `AuthContext` provides `user`, `session`, `loading`, `signUp`, `signIn`, `signOut`
- **Server state**: TanStack React Query for data fetching/caching
- **Local UI state**: React `useState` within page components
- **No Redux/Zustand** - state is kept simple and localized

### Key Page: CreateVideo.tsx (~670 lines)

This is the most complex page. It manages:

1. **Property source selection** (upload images vs. scrape URL)
2. **Photo upload** with per-image camera angle and duration controls
3. **Property details form** (address, price, beds, baths, car spaces, land size, features)
4. **Customization** (voice, music, template, layout, agent info)
5. **AI script generation** via Anthropic Claude
6. **Video generation orchestration** (calls `generate-video`, then polls `video-status`)
7. **Progress tracking** UI with status messages

The generation flow from the frontend:
```
1. Upload images to Supabase Storage → get public URLs
2. POST to generate-video with all config
3. Receive generationIds + videoId
4. Poll video-status every 5s with generationIds
   → Returns "processing" (X/Y clips ready)
   → Returns "stitching" (Shotstack working) with stitchJobId
   → Poll again with stitchJobId
   → Returns "done" with videoUrl
5. Navigate to /create/complete with videoUrl
```

### Component Data Flow

```
CreateVideo.tsx (page)
  ├─ PropertySourceSelector → sets source mode (upload/scrape)
  ├─ PhotoUpload → sets photos[], imageMetadata[] (file + camera angle + duration)
  ├─ PropertyDetailsForm → sets propertyDetails (address, price, beds, etc.)
  ├─ ScriptGeneratorSection → calls generate-script, sets script text
  ├─ CustomizationSection
  │   ├─ VideoTemplateSelector → sets template + layout
  │   ├─ Voice picker → sets voice type
  │   ├─ Music picker → sets music track
  │   └─ AgentPhotoUpload → sets agent name, phone, email, photo
  ├─ LeftSidebar → shows recent videos, template quick-select
  └─ RightPanel → shows preview, generate button, progress/status
```

---

## Backend Architecture

All backend logic runs as **Supabase Edge Functions** (Deno runtime). Each function is in `supabase/functions/<name>/index.ts`.

### Active Edge Functions

#### Video Pipeline (called in sequence)

| Function | Purpose | Calls |
|---|---|---|
| `generate-video` | Orchestrator. Validates input, creates DB record, generates voiceover, starts Runway batch | `generate-audio`, `generate-runway-batch` |
| `generate-runway-batch` | Submits 3-10 images to Runway Gen-4 Turbo API. Returns generation IDs | Runway API |
| `check-runway-batch` | Polls Runway task statuses for an array of generation IDs | Runway API |
| `video-status` | Unified poller. First polls Runway via `check-runway-batch`. When all clips done, calls `stitch-video`. Then polls Shotstack. Updates DB throughout | `check-runway-batch`, `stitch-video` |
| `stitch-video` | Builds Shotstack timeline: video clips + property overlay + agent card + audio. Submits render job | Shotstack API |

#### Supporting Functions

| Function | Purpose | External API |
|---|---|---|
| `generate-audio` | ElevenLabs TTS. Converts script text to MP3, uploads to Supabase Storage | ElevenLabs |
| `generate-script` | Anthropic Claude Sonnet 4.5. Generates 15-second property marketing script (~35-40 words) | Anthropic |
| `scrape-property` | ScraperAPI. Scrapes domain.com.au / realtor.com.au for images + property data | ScraperAPI |
| `preview-voice` | Generates a short voice preview clip | ElevenLabs |

#### Billing Functions

| Function | Purpose |
|---|---|
| `create-checkout-session` | Creates Stripe checkout for Starter ($299/mo) or Growth ($499/mo) plans |
| `create-portal-session` | Opens Stripe billing portal for subscription management |
| `stripe-webhook` | Handles Stripe events (checkout.session.completed, subscription.created/updated/deleted) |

### Edge Function Patterns

Every edge function follows the same pattern:

```typescript
// 1. CORS headers (allow all origins)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 2. Deno.serve handler
Deno.serve(async (req) => {
  // 3. CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 4. Parse JSON body
    const { ... } = await req.json();

    // 5. Business logic...

    // 6. Return success JSON
    return new Response(JSON.stringify({ success: true, ... }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // 7. Return error JSON
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

### Inter-Function Communication

Edge functions call each other via HTTP using the Supabase function URL:

```typescript
const response = await fetch(
  `${Deno.env.get("SUPABASE_URL")}/functions/v1/<function-name>`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
    },
    body: JSON.stringify({ ... }),
  }
);
```

---

## Video Generation Pipeline

### Complete Flow Diagram

```
USER                    FRONTEND                   EDGE FUNCTIONS              EXTERNAL APIs
─────                   ────────                   ──────────────              ─────────────
Upload 3-10 photos ──→  Compress images
                        Upload to Storage ─────→   (Supabase Storage)

Enter property info     Collect all config
Select voice/music
Select template/layout
Generate AI script ──→  POST generate-script ──→   generate-script ──────→    Anthropic Claude
                    ←── script text ←──────────    ←── AI script ←──────────

Click "Generate" ───→   POST generate-video ───→   generate-video
                                                   ├── POST generate-audio ──→ ElevenLabs TTS
                                                   │   └── Upload MP3 to Storage
                                                   ├── POST generate-runway-batch
                                                   │   └── Submit N images ──→ Runway Gen-4 Turbo
                                                   │       └── Returns N generation IDs
                                                   └── INSERT videos record (status: processing)
                    ←── generationIds, videoId ←──

Poll every 5s ──────→   POST video-status ─────→   video-status
                                                   ├── POST check-runway-batch
                                                   │   └── GET each task ────→ Runway status API
                                                   │       └── PENDING/RUNNING/SUCCEEDED/FAILED
                    ←── "processing: X/Y ready" ←─

                        (keep polling...)

                    ←── All clips done ←───────    video-status (all SUCCEEDED)
                                                   ├── POST stitch-video ───→ Shotstack render API
                                                   │   ├── Video clips track
                                                   │   ├── Property overlay (HTML)
                                                   │   ├── Spec icons (bed/bath/car images)
                                                   │   ├── Agent card (photo + text)
                                                   │   ├── Voiceover audio track
                                                   │   └── Background music (soundtrack)
                    ←── "stitching" + stitchJobId ←

Poll with stitchJobId → POST video-status ─────→   video-status
                                                   └── GET Shotstack status ─→ Shotstack render API
                    ←── "done" + videoUrl ←────    └── UPDATE videos (status: completed, download_url)

Navigate to /create/complete
Show final video
```

### Runway Gen-4 Turbo Details

**API**: `https://api.dev.runwayml.com/v1/image_to_video`
**Model**: `gen4_turbo`
**Aspect Ratio**: `720:1280` (9:16 vertical)
**Duration**: 2-10 seconds per clip (configurable per image)

**Camera Angle Prompts** (positive phrasing only - negative causes opposite results):
| Angle | Prompt |
|---|---|
| `pan-right` | "camera pans right across the room at hyperspeed. Rigid architecture, stable furniture, steady environment." |
| `pan-left` | "camera pans left across the room at hyperspeed. Rigid architecture, stable furniture, steady environment." |
| `zoom-in` | "camera zooms into the room. Rigid architecture, stable furniture, steady environment." |
| `wide-shot` | "Static camera, perfectly stable frame. Rigid architecture, stable furniture. Warm, steady lighting." |
| `auto` (default) | Same as `zoom-in` |

All prompts end with: `"Preserve exactly what is visible in the photograph. Only the camera moves. Cinematic, warm-toned."`

**Retry Logic** (`fetchWithRetry`):
- 429 Rate Limit: Exponential backoff at 15s, 30s, 60s
- 500+ Server Error: Retry after 2s
- Network failure: Retry after 2s
- Max 2 retries per request

**Status Mapping**:
| Runway Status | App Status |
|---|---|
| `SUCCEEDED` | `completed` |
| `FAILED` | `failed` |
| `RUNNING` | `processing` |
| `PENDING` / `THROTTLED` | `pending` |

### Shotstack Composition

**API**: `https://api.shotstack.io/v1/render`
**Output**: MP4, HD resolution, 9:16 aspect ratio

**Timeline Track Order** (top to bottom = front to back):
1. Voiceover audio track (full duration, 100% volume)
2. Agent photo track (luma matte + image, last clip duration)
3. Agent text track (name, phone, email, CTA - last clip duration)
4. Property details HTML overlay (first clip duration, starts at 0.1s)
5. Property spec icons track (bed/bath/car images, first clip duration)
6. Agent outro background (first video clip, blurred, last clip duration)
7. Main video clips track (all Runway clips sequentially, fade transitions)

**Soundtrack**: Background music at 30% volume with fadeInFadeOut effect

**Custom Fonts**: Helvetica and Helvetica-Bold loaded from Supabase Storage

---

## Database Schema

### Tables

#### `properties`
Stores property listings (scraped or manual entry).

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → auth.users) | CASCADE delete |
| `address` | TEXT | Required |
| `suburb`, `state`, `postcode` | TEXT | Optional address parts |
| `country` | TEXT | Default: 'AU' |
| `price` | TEXT | Stored as text for flexibility |
| `bedrooms`, `bathrooms`, `parking` | INTEGER | |
| `land_size` | TEXT | |
| `source_url`, `source_website`, `listing_id` | TEXT | For scraped properties |
| `features` | TEXT[] | Array of features |
| `description` | TEXT | |
| `image_urls` | TEXT[] | Array of image URLs |
| `created_at`, `updated_at` | TIMESTAMPTZ | Auto-managed |

Unique constraint: `(source_website, listing_id)`

#### `videos`
Tracks generated videos with full metadata.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → auth.users) | CASCADE delete |
| `property_id` | UUID (FK → properties) | SET NULL on delete |
| `provider` | TEXT | Default: 'shotstack' |
| `provider_job_id` | TEXT | External job ID |
| `template`, `style`, `voice_id`, `music_id` | TEXT | Video configuration |
| `aspect_ratio` | TEXT | Default: '9:16' |
| `script` | TEXT | Voiceover script |
| `video_url`, `thumbnail_url` | TEXT | Output URLs |
| `duration` | INTEGER | Seconds |
| `status` | TEXT | 'queued' / 'processing' / 'completed' / 'failed' |
| `progress` | INTEGER | 0-100 |
| `error_message` | TEXT | |
| `agent_name`, `agent_phone`, `agent_email`, `agent_photo_url` | TEXT | Agent branding |
| `created_at`, `completed_at`, `updated_at` | TIMESTAMPTZ | |
| `shared_to_platforms` | TEXT[] | Social sharing tracking |
| `view_count` | INTEGER | Default: 0 |

Additional columns added by later migrations:
- Stripe fields: `stripe_customer_id`, `stripe_subscription_id`, etc. (on `user_preferences`)
- Free trial: `is_free_trial`, `free_video_used` (on `videos` / `users`)
- Video record columns: `source`, `property_address`, `price`, `bedrooms`, `bathrooms`, `car_spaces`, `template_used`, `music_used`, `download_url`, `photos` (JSON context for recovery)

#### `scraping_jobs`
Tracks ScraperAPI scraping requests.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | |
| `user_id` | UUID (FK) | |
| `property_id` | UUID (FK) | |
| `source_url`, `source_website` | TEXT | Required |
| `status` | TEXT | 'pending' / 'in_progress' / 'completed' / 'failed' |
| `images_found` | INTEGER | |
| `images_scraped` | TEXT[] | URLs |
| `property_data` | JSONB | Raw scraped data |
| `error_message` | TEXT | |
| `retry_count` | INTEGER | Default: 0 |

#### `user_preferences`
User settings, defaults, and subscription info.

| Column | Type | Notes |
|---|---|---|
| `user_id` | UUID (PK, FK) | |
| `default_template`, `default_voice_id`, `default_music_id` | TEXT | Defaults |
| `default_agent_*` | TEXT | Agent defaults |
| `videos_generated`, `properties_scraped`, `total_render_time` | INTEGER | Usage stats |
| `subscription_tier` | TEXT | Default: 'free' |
| Stripe fields | Various | Added by migration 20260208 |

### Database Triggers

- `update_updated_at_column()` - Auto-updates `updated_at` on all 4 tables
- `handle_new_user()` - Creates `user_preferences` row when a new user signs up

### Row Level Security

All 4 tables have RLS enabled with policies restricting SELECT/INSERT/UPDATE/DELETE to `auth.uid() = user_id`. The `videos` table also allows UPDATE from service role (edge functions use `SUPABASE_SERVICE_ROLE_KEY`).

### Indexes

Strategic indexes on: `user_id`, `created_at DESC`, `status`, `property_id`, `(provider, provider_job_id)`, `(source_website, listing_id)`.

---

## Authentication & Security

### Auth Flow
- **Provider**: Supabase Auth (email/password)
- **Session**: Persisted in localStorage, auto-refreshed
- **Context**: `AuthContext.tsx` wraps the app, provides `useAuth()` hook
- **Route Protection**: `ProtectedRoute.tsx` redirects to `/login` if no session

### Auth Context API
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}
```

### Edge Function Auth
- JWT verification is **disabled** in `supabase/config.toml` for most functions (`verify_jwt = false`)
- Edge functions that write to the database use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
- The frontend passes `userId` in request bodies for record association

---

## Third-Party Integrations

### Runway ML
- **Endpoint**: `https://api.dev.runwayml.com/v1/image_to_video`
- **Auth**: Bearer token (`RUNWAY_API_KEY`)
- **Version Header**: `X-Runway-Version: 2024-11-06`
- **Model**: `gen4_turbo`
- **Status Polling**: `GET https://api.dev.runwayml.com/v1/tasks/{id}`
- **Output**: Video URL in `response.output[0]`
- **Rate Limiting**: Runway auto-queues excess tasks with THROTTLED status

### Shotstack
- **Endpoint**: `https://api.shotstack.io/v1/render`
- **Auth**: `x-api-key` header (`SHOTSTACK_API_KEY`)
- **Status Polling**: `GET https://api.shotstack.io/v1/render/{id}`
- **Statuses**: queued → fetching → rendering → saving → done / failed
- **Output**: `response.url` when status is "done"
- **Limitations**: HTML assets do NOT support `<img>` tags; images must be separate image asset clips

### ElevenLabs
- **Endpoint**: `https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`
- **Auth**: `xi-api-key` header (`ELEVENLABS_API_KEY`)
- **Model**: `eleven_monolingual_v1`
- **Voice Settings**: stability 0.5, similarity_boost 0.75
- **Output**: Audio buffer (audio/mpeg), uploaded to Supabase Storage

**Voice IDs**:
| Voice | ElevenLabs ID |
|---|---|
| australian-male | `TxGEqnHWrfWFTfGW9XjX` |
| australian-female | `EXAVITQu4vr4xnSDxMaL` |
| british-male | `VR6AewLTigWG4xSOukaG` |
| british-female | `21m00Tcm4TlvDq8ikWAM` |
| american-male | `VR6AewLTigWG4xSOukaG` |
| american-female | `EXAVITQu4vr4xnSDxMaL` |

### Anthropic Claude
- **Endpoint**: `https://api.anthropic.com/v1/messages`
- **Auth**: `x-api-key` header (`ANTHROPIC_API_KEY`)
- **Model**: `claude-sonnet-4-5`
- **Max Tokens**: 150
- **Temperature**: 0.8
- **Purpose**: Generates 15-second property marketing scripts (35-40 words, 2 sentences)

### ScraperAPI
- **Supports**: domain.com.au, realtor.com.au
- **Features**: JavaScript rendering, Australian IP geolocation (`country_code=au`)
- **Output**: Property data (images, price, address, bedrooms, bathrooms, features)

### Stripe
- **Plans**: Starter ($299/mo, price ID: `price_1Sya0mGkPU4YhgKfmAj63FX0`), Growth ($499/mo, price ID: `price_1SyZzMGkPU4YhgKfWTj39Enj`)
- **Webhooks**: Handles `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
- **Portal**: Self-service billing management via `create-portal-session`

---

## Storage & Assets

### Supabase Storage Buckets

**`property-images`** (public)
- User-uploaded property photos
- Path: `{userId}/{timestamp}-{randomId}.{ext}`
- Uploaded by `uploadToStorage.ts` in parallel batches of 3

**`video-assets`** (public)
- Music library, voiceovers, agent photos, fonts, luma mattes
- Structure:
  ```
  video-assets/
  ├── music/
  │   ├── cinematic-epic-{1,2,3}.mp3
  │   ├── modern-chill-{1,2,3}.mp3
  │   ├── upbeat-energetic-{1,2,3}.mp3
  │   ├── classical-elegant-{1,2,3}.mp3
  │   └── ambient-relaxing-{1,2,3}.mp3
  ├── audio/
  │   └── voiceover-{videoId}.mp3          (auto-generated per video)
  ├── agent-photos/
  │   └── agent-{videoId}.{jpg|png|webp}   (uploaded during stitch)
  ├── fonts/
  │   ├── Helvetica.ttf
  │   └── Helvetica-Bold.ttf
  └── luma-mattes/
      └── circle_square_white.png          (circular mask for agent photo)
  ```

### Image Compression (`imageCompression.ts`)
- Uses HTML5 Canvas API
- Max width: 800px (maintains aspect ratio)
- Quality: 0.7 (JPEG output)
- Applied before upload to reduce storage/bandwidth

---

## Configuration & Utilities

### Music Library (`src/config/musicLibrary.ts`)

15 tracks across 5 categories:
- **Cinematic & Epic** (3 tracks)
- **Modern & Chill** (3 tracks)
- **Upbeat & Energetic** (3 tracks)
- **Classical Elegance** (3 tracks)
- **Ambient Relaxing** (3 tracks)

Each track: `{ id, name, url, duration, category }`

### Music Mapping (`src/config/musicMapping.ts`)
Maps frontend display names to backend IDs used in the `generate-video` payload.

### Voice Mapping (`src/config/voiceMapping.ts`)
Maps frontend voice names (e.g., "Australian Male") to the voice IDs expected by `generate-audio`.

### Video Templates

6 templates available:
| ID | Display Name |
|---|---|
| `modern-luxe` | Modern Luxe |
| `just-listed` | Just Listed |
| `minimalist` | Minimalist |
| `cinematic` | Cinematic |
| `luxury` | Luxury |
| `real-estate-pro` | Real Estate Pro |

---

## Overlay Layout System

The `stitch-video` function supports 3 property overlay layouts via the `layout` parameter:

### 1. Minimal Focus (`minimal-focus`)
- Centered dark semi-transparent overlay
- Title + address only (no price)
- Spec icons centered below text

### 2. Bold Banner (`bold-banner`)
- Dark gradient banner at bottom of frame
- Shows title, price, and address
- Spec icons bottom-left

### 3. Modern Luxe (`modern-luxe`) - Default
- Large centered title with dark pill for address
- Price displayed bottom-right
- Spec icons bottom-left

### Property Spec Icons
Real image assets from Shotstack's icon library (not emoji):
- Bed: `https://templates.shotstack.io/basic/asset/image/icon/slimline/white/26px/bed.png`
- Bath: `https://templates.shotstack.io/basic/asset/image/icon/slimline/white/26px/bath.png`
- Car: `https://templates.shotstack.io/basic/asset/image/icon/slimline/white/26px/car.png`
- Land size displayed as text (no icon)

### Agent Card (Last Clip)
- Background: First video clip with blur filter
- Agent photo with circular luma matte mask (scale: 0.35)
- Agent name, phone, email (42px/38px font, white, text-shadow)
- "CONTACT ME TODAY" call-to-action
- Agent photo is uploaded from base64 to Supabase Storage during stitch to avoid payload size issues

---

## Environment Variables

### Frontend (`.env`)
```bash
VITE_SUPABASE_URL=https://acpkhbjgnlenjfiswftx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon_key>
VITE_STRIPE_PUBLISHABLE_KEY=<stripe_pk>
```

### Backend (Supabase Secrets)
```bash
# Auto-provided by Supabase
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Must be set manually
RUNWAY_API_KEY          # Runway ML API key
SHOTSTACK_API_KEY       # Shotstack API key
ELEVENLABS_API_KEY      # ElevenLabs TTS API key
ANTHROPIC_API_KEY       # Anthropic Claude API key
SCRAPER_API_KEY         # ScraperAPI key
STRIPE_SECRET_KEY       # Stripe secret key
STRIPE_WEBHOOK_SECRET   # Stripe webhook signing secret
```

---

## Deployment

### Commands
```bash
# Database migrations
supabase db push

# Set secrets
supabase secrets set RUNWAY_API_KEY=xxx
supabase secrets set SHOTSTACK_API_KEY=xxx
supabase secrets set ELEVENLABS_API_KEY=xxx
supabase secrets set ANTHROPIC_API_KEY=xxx
supabase secrets set SCRAPER_API_KEY=xxx
supabase secrets set STRIPE_SECRET_KEY=xxx
supabase secrets set STRIPE_WEBHOOK_SECRET=xxx

# Create storage buckets
supabase storage create video-assets --public
supabase storage create property-images --public

# Deploy all edge functions
supabase functions deploy

# Frontend build
npm install
npm run build    # Production build to dist/
npm run dev      # Development server
```

### Scripts (`package.json`)
| Script | Command |
|---|---|
| `dev` | `vite` |
| `build` | `vite build` |
| `build:dev` | `vite build --mode development` |
| `preview` | `vite preview` |
| `lint` | `eslint .` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |

---

## Known Issues & Gotchas

### Shotstack Limitations
1. **HTML assets cannot contain `<img>` tags** - Use separate image asset clips instead
2. **Timing offset required** - Text overlays must start at 0.1s (not 0s) to avoid rendering conflicts
3. **First clip opacity** - Set to 70% (0.7) so property text overlay is readable over video
4. **Flex layout unreliable** - Use absolute positioning in HTML assets for reliable rendering

### Runway ML Notes
1. **Negative prompts backfire** - Saying "no shake" causes shake. Use positive phrasing only ("stable", "rigid")
2. **THROTTLED status is normal** - Runway auto-queues excess tasks; just keep polling
3. **No client-side concurrency cap needed** - Submit all tasks at once; Runway manages the queue
4. **Duration clamped** - API accepts 2-10s, code clamps `Math.min(Math.max(duration, 2), 10)`

### Agent Photo
1. **Base64 too large for Shotstack payload** - Photos are uploaded to Supabase Storage first, then the public URL is used in the Shotstack timeline
2. **Circular mask** - Uses Shotstack luma matte (`circle_square_white.png`) positioned before the photo clip in the same track
3. **Scale must match** - Luma matte and photo clip must use identical `scale` and `fit` values

### General
1. **Price formatting** - Stored as text, formatted with `toLocaleString()` for display (commas)
2. **Singular/plural** - "1 Bedroom" vs "2 Bedrooms" handled in property details display
3. **Video recovery** - Generation context (generationIds, audioUrl, musicUrl, agentInfo, propertyData) is saved to the `photos` JSON column so polling can resume if the user navigates away

---

## Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Database tables | snake_case | `scraping_jobs` |
| Database columns | snake_case | `agent_photo_url` |
| TypeScript functions | camelCase | `uploadImageToStorage` |
| TypeScript types/interfaces | PascalCase | `PropertyDetails`, `ImageMetadata` |
| React components | PascalCase | `PhotoUpload.tsx` |
| Constants | UPPER_CASE | `MUSIC_LIBRARY`, `ICON_URLS` |
| CSS classes | Tailwind utilities | `className="bg-white p-4"` |
| Edge function dirs | kebab-case | `generate-runway-batch` |
| Music/asset IDs | kebab-case | `cinematic-epic-1` |
| Template IDs | kebab-case | `modern-luxe` |
