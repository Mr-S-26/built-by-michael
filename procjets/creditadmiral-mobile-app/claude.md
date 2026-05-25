# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**My Credit Snapshot** is a white-label credit monitoring mobile app built with Expo + React Native, serving two distinct user types:
- **Clients**: Monitor credit scores, track negative items, view action plans, upload documents, and chat with advisors
- **Referral Partners**: Manage client referrals, view dashboard metrics, chat with clients, and refer new clients

**Stack**: Expo SDK 54, React Native 0.81.5, TypeScript 5.9, React 19.1

**White-label apps**: My Credit Snapshot (default), CrediLife (BD), Credit Restoration Institute (RL), CROW 4U (KW1)

---

## Development Commands

```bash
npm start                    # Start dev server
npm run android / ios / web  # Platform-specific
npx expo start --clear       # Clear Metro cache (use after .env or dependency changes)
npm run lint                 # ESLint check (0 errors, ~152 warnings — mostly `any` types)
npm run lint:fix             # ESLint auto-fix
npm run typecheck            # TypeScript check
npm run validate             # Both TypeScript + ESLint
npm test                     # Run unit tests (2 suites, 15 tests)
```

---

## Project Structure

```
my-credit-app-expo/
├── App.tsx                            # Entry point: Redux Provider + PersistGate + RootNavigator
├── app.json                           # Expo config (name, icons, bundle IDs — changes per brand)
├── eas.json                           # EAS build profiles (dev, preview, production)
├── .env                               # API URLs, Firebase config, X_APP_ID
├── assets/                            # Platform icons + splash (per-brand PNG files)
├── src/
│   ├── config/
│   │   ├── branding.ts               # Brand registry + ACTIVE_BRAND selector
│   │   └── firebase.ts               # Firebase init (Auth + Realtime Database)
│   ├── constants/
│   │   ├── Colors.ts                 # Color palette (reads primary/secondary from branding)
│   │   ├── ThemeColors.ts            # Light/Dark theme definitions + brand overrides
│   │   └── Fonts.ts                  # Quicksand + Raleway font families and sizes
│   ├── types/
│   │   ├── navigation.types.ts       # Type-safe navigation params for all screens
│   │   └── env.d.ts                  # Environment variable type declarations
│   ├── store/
│   │   ├── store.ts                  # Redux store config (SecureStore persistence)
│   │   └── slice/
│   │       ├── authSlice.ts          # Auth state (tokens, isReferralPartner, isAuthenticated)
│   │       ├── themeSlice.ts         # Dark mode toggle (isDarkMode)
│   │       └── api/
│   │           ├── api.ts            # Client API — 26 RTK Query endpoints
│   │           ├── referralPartnerApi.ts  # RP API — 17 RTK Query endpoints
│   │           └── createBaseQueryWithReauth.ts  # Shared 401 token refresh factory
│   ├── hooks/
│   │   ├── useThemeColors.ts         # Returns light or dark theme colors from Redux
│   │   └── useUnreadCount.ts         # Firebase listener for unread chat count
│   ├── utils/
│   │   ├── tokenUtils.ts             # JWT validation (isTokenExpired, isTokenValid, etc.)
│   │   ├── errorUtils.ts             # getApiErrorMessage(error, fallback) — use everywhere
│   │   ├── dateUtils.ts              # formatDate (MM/DD/YYYY), formatDateShort (Jan 06, 2024)
│   │   └── notificationUtils.ts      # FCM push token registration + storage
│   ├── navigation/
│   │   ├── RootNavigator.tsx         # Root stack: auth flow → tab navigators + modals
│   │   ├── MainTabNavigator.tsx      # Client: 5 tabs + global header with brand logo
│   │   └── ReferralClientTabNavigator.tsx  # RP: 5 tabs + global header with brand logo
│   ├── components/
│   │   └── ScoreTracker/
│   │       ├── BureauGaugeCard.tsx   # Bureau card with gauge image + score + delta
│   │       ├── CreditScoreGauge.tsx  # Gauge image selector (350-850, 5-pt increments)
│   │       ├── ScoreHistoryChart.tsx # VictoryNative line chart of score trends
│   │       ├── HistoricalScoresTable.tsx  # 13-month score history table
│   │       ├── ScoreChangeIndicator.tsx   # Score delta display (+X/-X with color)
│   │       └── RecentUpdates.tsx     # Recent client updates list
│   ├── screens/
│   │   ├── Login/
│   │   │   ├── RoleSelection.tsx     # Choose Client or RP (4 layout variants)
│   │   │   └── Login.tsx             # Login form (4 layout variants + forgot password)
│   │   ├── ScoreTracker/
│   │   │   └── ScoreTracker.tsx      # 3 bureau gauges + historical table
│   │   ├── Progress/
│   │   │   ├── Progress.tsx          # Material tabs container
│   │   │   └── tabs/
│   │   │       ├── NegativesTab.tsx  # Negative tradelines + public records
│   │   │       ├── InquiriesTab.tsx  # Hard inquiries list
│   │   │       ├── PersonalInfoTab.tsx   # PII from credit report
│   │   │       └── AccountsTab.tsx   # Account details
│   │   ├── MessageUs/
│   │   │   └── MessageUs.tsx         # Client GiftedChat (Firebase)
│   │   ├── ActionPlan/
│   │   │   └── ActionPlan.tsx        # Todos + credit analysis + progress reports
│   │   ├── More/
│   │   │   ├── More.tsx              # Client menu (My Info, Docs, Billing, etc.)
│   │   │   ├── MyInfo.tsx            # Client profile edit
│   │   │   ├── Documents.tsx         # Document list + upload link
│   │   │   ├── BillingInformation.tsx # Balance, card info, invoices with PDF links
│   │   │   ├── ContactUs.tsx         # Contact form
│   │   │   ├── ChangePassword.tsx    # Password change form
│   │   │   └── UploadDocument.tsx    # File picker (camera, gallery, document picker)
│   │   ├── ReferralPartner/
│   │   │   ├── Dashboard.tsx         # Metrics cards + 6-month referral line chart
│   │   │   ├── MyReferrals.tsx       # Referral list with search + status badges
│   │   │   ├── Chat.tsx              # RP GiftedChat (Firebase)
│   │   │   ├── ReferClient.tsx       # New referral form (name, SSN, DOB, file attach)
│   │   │   ├── Settings.tsx          # RP menu (Account, Password, Partners, etc.)
│   │   │   ├── MyAccount.tsx         # RP profile edit
│   │   │   ├── ChangePassword.tsx    # RP password change
│   │   │   ├── ReferralClientDetails.tsx  # View specific referral's credit data
│   │   │   ├── Partners.tsx          # Partner info (salesman/processor with images)
│   │   │   ├── Notifications.tsx     # RP notifications list
│   │   │   └── PrivacyPolicy.tsx     # Privacy policy placeholder
│   │   ├── AccountDetails/
│   │   │   └── AccountDetails.tsx    # Modal for negative/inquiry account details
│   │   └── PdfViewer/
│   │       └── PdfViewer.tsx         # PDF rendering + print/share
│   └── assets/
│       ├── credit-gauge/             # 50+ gauge images (score_350_to_355.png ... score_845_to_850.png)
│       └── images/logo/              # Brand logos + dark mode variants
```

---

## Architecture Overview

### Dual API System
```
Client API:  https://api.creditstatusupdater.com/api          (26 endpoints)
RP API:      https://api.creditstatusupdater.com/referral-partners  (17 endpoints)
```
Both use OAuth2 JWT auth, `X-APP-ID` header, automatic 401 token refresh.

- `src/store/slice/api/api.ts` — Client API (RTK Query)
- `src/store/slice/api/referralPartnerApi.ts` — RP API (RTK Query)
- `src/store/slice/api/createBaseQueryWithReauth.ts` — Shared token refresh factory

### Authentication Flow
1. **RoleSelection** → User chooses Client or Referral Partner
2. **Login** → Username, password, code (auto-filled if brand has `code` set)
3. **API call** → `POST /login` returns `{access_token, refresh_token, token_type}`
4. **Redux** → `setTokens()` + `setIsReferralPartner()` saved to SecureStore
5. **Firebase** → `POST /generate-firebase-token` → `signInWithCustomToken()`
6. **Push token** → Register FCM → Save to `users/{uid}/fcmTokens/{token}`
7. **Navigate** → `MainTabNavigator` (client) or `ReferralClientTabNavigator` (RP)

**Token Refresh (on 401)**:
- `createBaseQueryWithReauth` intercepts 401 responses
- Calls `POST {baseUrl}/refresh` with `x-refresh-token` header
- Closure-scoped `refreshPromise` prevents duplicate refresh calls
- Success → `setTokens()` + retry original request
- Failure → `logout()` + clear all state

### Navigation
```
RootNavigator (NativeStackNavigator)
├── Not Authenticated
│   ├── RoleSelection (choose Client or RP)
│   └── Login (username + password + code)
└── Authenticated
    ├── isReferralPartner=true  → ReferralClientTabNavigator
    │   ├── Dashboard        (speedometer icon)
    │   ├── MyReferrals      (people icon)
    │   ├── Chat             (chat bubble + unread badge)
    │   ├── ReferClient      (person-add icon)
    │   └── ReferralSettings (settings icon)
    └── isReferralPartner=false → MainTabNavigator
        ├── ScoreTracker     (speedometer icon)
        ├── Progress         (bar graph icon)
        ├── MessageUs        (chat bubble + unread badge)
        ├── ActionPlan       (clipboard icon)
        └── More             (ellipsis icon)
    └── Shared Modal Screens
        ├── AccountDetails, PdfViewer, MyInfo, Documents
        ├── BillingInformation, ContactUs, ChangePassword
        ├── UploadDocument, ReferralClientDetails
        ├── MyAccount, Partners, Notifications, PrivacyPolicy
        └── RPChangePassword
```
- Global header with brand logo wraps both tab navigators
- Individual screens do NOT have their own headers

### State Management (Redux)
```
Redux Store
├── auth (persisted to SecureStore)
│   ├── access_token: string | null
│   ├── refresh_token: string | null
│   ├── token_type: string | null
│   ├── isReferralPartner: boolean
│   └── isAuthenticated: boolean
├── theme (persisted to SecureStore)
│   └── isDarkMode: boolean
├── clientApi (NOT persisted — RTK Query cache)
└── referralPartnerApi (NOT persisted — RTK Query cache)
```

### Firebase (Chat System)
- **Realtime Database** for group-based messaging
- **Message path**: `messages/{chatId}/{messageId}`
- **Message structure**: `{_id, text, createdAt, user: {_id, name}}`
- **Unread count**: `userUnreadCounts/{uid}` = **flat number** (NOT nested) — `newData.isNumber()` rule
- **Group membership**: `groups/{chatId}/participants/{userId}` = true
- Reset unread to 0 when user opens chat screen

### Dark Mode
- Toggle in More.tsx (Client) and Settings.tsx (RP)
- `useThemeColors()` hook reads `isDarkMode` from Redux → returns light or dark theme
- All screens use `createStyles(theme: ThemeColors)` factory pattern
- Logo: checks `isDarkMode && branding.logoDark` → uses dark logo if available
- Persisted to SecureStore via Redux-Persist

### Theming & Fonts
- **Colors**: `src/constants/Colors.ts` — reads `primary`/`secondary` from branding config
- **Themes**: `src/constants/ThemeColors.ts` — light (#FFFFFF bg) and dark (#121212 bg)
- **Fonts**: Quicksand (body) + Raleway (headings), 5 weights each (light/regular/medium/semibold/bold)
- Use **Quicksand Bold** for digit-heavy displays (scores) — Raleway causes uneven baselines

---

## API Endpoints Reference

### Client API (`src/store/slice/api/api.ts`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/login` | POST | Client login → `{access_token, refresh_token, token_type}` |
| `/logout` | POST | Logout |
| `/change-password` | POST | Change password |
| `/forgot-password` | POST | Forgot password |
| `/generate-firebase-token` | POST | Get Firebase custom token |
| `/client` | GET | Client profile |
| `/client` | PUT | Update client profile |
| `/score-tracker` | GET | Score history (latest entry = current scores) |
| `/score-header` | GET | Score header (**stale — use /score-tracker instead**) |
| `/personal-information` | GET | PII from credit report |
| `/negatives` | GET | Negative tradelines + public records |
| `/client-inquiry` | GET | Hard inquiries |
| `/credit-analysis` | GET | Credit analysis report |
| `/documents` | GET | Documents list |
| `/id-documents` | GET | ID documents |
| `/document-types` | GET | Available document types for upload |
| `/upload-document` | POST | Upload document (FormData) |
| `/action-plan` | GET | Action plan items |
| `/todo` | GET | Todo items |
| `/billing-data` | GET | Billing info (balance, card, invoices) |
| `/client-updates` | GET | Progress reports |
| `/partners` | GET | Partner list (salesman/processor) |
| `/us-states` | GET | US states dropdown data |

### Referral Partner API (`src/store/slice/api/referralPartnerApi.ts`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/login` | POST | RP login |
| `/logout` | POST | Logout |
| `/change-password` | POST | Change password |
| `/forgot-password` | POST | Forgot password |
| `/generate-firebase-token` | POST | Get Firebase custom token |
| `/account` | GET | RP account info |
| `/account` | PUT | Update RP account |
| `/dashboard` | GET | Dashboard metrics + monthly chart data |
| `/referrals` | GET | All referrals list |
| `/referral-client/{id}` | GET | Single referral details |
| `/referral-client` | POST | Create new referral |
| `/notification` | GET | Notifications |
| `/partners` | GET | Partner list |
| `/us-states` | GET | US states |

### API Data Field Names
- **Todo**: `daterequested`, `description`, `datedone`, `file_upload` (1=needs upload), `anchor` (1=baseline score)
- **Negatives**: `total_deletions` (not total_removed), `deletions` (not recent_removed), `dayslate30/60/90`
- **Score Tracker**: Use `/score-tracker` latest entry for gauges (NOT `/score-header` which returns stale data)
- **Documents**: `datecreated`, `full_url`, `filedescription`
- **Billing**: `balance.current`, `vault_last_four`, `recent_invoice[].pdflink`
- **Partners**: `salesman` (with `salesman_image`), `processor` (with `processor_image`)
- **Referrals**: `clientid` (not id), `new_status` (not status), `datecreated` (human-readable)
- Bureau fields are JSON strings: `'{"TU":"value","EXP":"value","EQF":"value"}'`

---

## Screen Details

### Client Screens

| Screen | File | Key Features |
|--------|------|-------------|
| **ScoreTracker** | `src/screens/ScoreTracker/ScoreTracker.tsx` | 3 BureauGaugeCards (TU/EXP/EQ), score deltas from anchor, HistoricalScoresTable |
| **Progress** | `src/screens/Progress/Progress.tsx` | Material top tabs: NegativesTab, InquiriesTab, PersonalInfoTab, AccountsTab |
| **MessageUs** | `src/screens/MessageUs/MessageUs.tsx` | GiftedChat + Firebase, real-time messaging, unread badge |
| **ActionPlan** | `src/screens/ActionPlan/ActionPlan.tsx` | Todos (strikethrough completed), credit analysis, progress reports, upload button |
| **More** | `src/screens/More/More.tsx` | Menu: My Info, Documents, Billing, Contact Us, Change Password, dark mode toggle, Logout |
| **MyInfo** | `src/screens/More/MyInfo.tsx` | Editable profile (name, email, phone, address, city, state, zip) |
| **Documents** | `src/screens/More/Documents.tsx` | Document list with dates, file descriptions, PDF viewer link, upload button |
| **BillingInformation** | `src/screens/More/BillingInformation.tsx` | Current balance, card ending in XXXX, invoice list with PDF links |
| **UploadDocument** | `src/screens/More/UploadDocument.tsx` | Camera, photo library, file picker (PDF/PNG/JPG, max 20MB) |

### Referral Partner Screens

| Screen | File | Key Features |
|--------|------|-------------|
| **Dashboard** | `src/screens/ReferralPartner/Dashboard.tsx` | 2 metric cards (total/active), 6-month VictoryNative line chart |
| **MyReferrals** | `src/screens/ReferralPartner/MyReferrals.tsx` | Referral list with search, status badges, tap for details |
| **Chat** | `src/screens/ReferralPartner/Chat.tsx` | GiftedChat + Firebase, same pattern as client MessageUs |
| **ReferClient** | `src/screens/ReferralPartner/ReferClient.tsx` | New referral form (name, SSN, DOB, address, file attachment) |
| **Settings** | `src/screens/ReferralPartner/Settings.tsx` | Menu: Account, Password, Partners, Notifications, dark mode toggle, Logout |

---

## White-Label Customization

### Brand Switching
All brands defined in `src/config/branding.ts`. Switch by changing one line:
```typescript
const ACTIVE_BRAND: keyof typeof brands = 'kw1';  // 'default' | 'bd' | 'rl' | 'kw1'
```

**IMPORTANT**: Also update `app.json` (name, bundleIdentifier, package, icon, version) when switching brands.
See `docs/WHITE_LABEL_SWITCH_GUIDE.md` for copy-paste configs per brand.

### Branding Interface
```typescript
interface Branding {
  companyName: string;
  logo: ImageSourcePropType;
  logoDark?: ImageSourcePropType;          // Dark mode logo variant
  colors: { primary: string; secondary: string; };
  code?: string;                           // Auto-sent on login when set (hides Code field)
  loginLayout?: 'classic' | 'hero' | 'bold' | 'minimal';
  themeOverrides?: {                       // Per-brand theme customization
    light?: Partial<ThemeColors>;
    dark?: Partial<ThemeColors>;
  };
}
```

### Brands
| Brand | Key | Primary | Secondary | Code | Login Layout |
|---|---|---|---|---|---|
| My Credit Snapshot | `default` | `#55a3f4` | `#1a2b4a` | user-entered | classic |
| CrediLife | `bd` | `#29a9e0` | `#1a3a5c` | `'bd'` | classic |
| Credit Restoration Institute | `rl` | `#0072B8` | `#003A6B` | `'rl'` | hero |
| CROW 4U | `kw1` | `#F7941D` | `#333333` | `'kw1'` | bold |

### Login Layouts (4 variants)
Both `RoleSelection.tsx` and `Login.tsx` implement all 4 layouts:

- **Classic** (default, bd): Plain background, underline inputs, simple role cards
- **Hero** (rl): Dark navy banner (~35% top), floating white card, bordered inputs with icons, descriptive role cards
- **Bold** (kw1): White top section with centered logo, dark curved bottom section (`borderTopLeftRadius: 40`), filled + outlined buttons. Nexa-style design.
- **Minimal**: Accent color band at top, clean card-based layout, descriptive role cards

### Brand Assets
```
assets/
├── mcs_1024.png              # My Credit Snapshot icon (iOS)
├── credilife_1024.png        # CrediLife icon (iOS)
├── credilife_512.png         # CrediLife icon (Android)
├── rl_ios.png                # CRI icon (iOS)
├── rl_android.png            # CRI icon (Android)
├── kw1_1024.png              # CROW icon (iOS)
├── kw1_512.png               # CROW icon (Android)
└── splash-icon.png           # Shared splash screen

src/assets/images/logo/
├── logo.png                  # My Credit Snapshot logo
├── credilife-logo.png        # CrediLife logo
├── dark-mode-logo.png        # CrediLife dark mode logo
├── rl-logo.jpg               # CRI logo
└── kw1-logo.jpg              # CROW logo
```

---

## Document Upload Flow

1. ActionPlan shows "Upload" button on todos with `file_upload === 1`
2. Navigate to UploadDocument with optional `documentName`
3. Pick file via camera, photo library, or document picker
4. Create FormData: `formData.append('file', {uri, name, type})`
5. Call `useUploadDocumentMutation()` → `POST /upload-document`
6. Invalidates Documents cache tag → refetches document list

**Validation**: Max 20MB, allowed types: PDF, PNG, JPG/JPEG

---

## Push Notifications (Partial — Phase 5)

- `registerForPushNotifications()` requests permissions, creates Android notification channel
- Returns FCM token, saved to `users/{userId}/fcmTokens/{token}` in Firebase
- `setNotificationHandler()` configured for foreground alerts
- Called after successful Firebase login; failures don't block login
- **Pending**: Backend push notification API integration (senior is building v2 API)

---

## Common Pitfalls

1. **Env changes**: Always `npx expo start --clear` after `.env` edits
2. **Async/await**: Never mix `await` with `.then()` — use pure try/catch with `.unwrap()`
3. **GiftedChat**: Use `isInverted={true}` and `listProps` (NOT `inverted` or `listViewProps`)
4. **Imports**: `import { jwtDecode } from 'jwt-decode'` (named, not default)
5. **Error handling**: Always use `getApiErrorMessage(error, 'fallback')` from errorUtils
6. **Firebase unread**: Write to `userUnreadCounts/${userId}` (flat number, NOT nested path)
7. **Inline validation**: Forms use `fieldErrors` state, `validateForm()`, `clearFieldError()` pattern
8. **Score 0 display**: Use `score != null ? score : '—'` (NOT `score || '—'`)
9. **API description text**: Clean backslashes with `.replace(/\\+/g, '')`
10. **Score data source**: Use `/score-tracker` latest entry (NOT `/score-header` which is stale)
11. **Score change calculation**: Compare against the `anchor` entry (anchor=1), not the previous entry
12. **Brand switching**: Must update BOTH `branding.ts` (ACTIVE_BRAND) AND `app.json` (name, icons, bundle IDs, version)
13. **Login layout types**: All 4 style factories (classic, hero, bold, minimal) must define the same style properties (use empty `{}` stubs for unused ones)

---

## EAS Build & Deployment

```bash
npx eas-cli build --platform ios --profile production
npx eas-cli build --platform android --profile production
npx eas-cli submit --platform ios --latest
npx eas-cli build:download --platform android --latest   # Download .aab for Google Play
# Android: manual .aab upload via Google Play Console
```

- Expo account: `micosiaaa`
- Apple Team: Credit Admiral Software LLC (`G6F68ESQ24`)
- `.env` NOT included in EAS builds — use `eas env:create`
- Free tier builds can take 70+ minutes
- `eas.json` production profile has `autoIncrement: true` for versionCode
- Icon sizes: iOS 1024x1024, Android 512x512

### App Store Entries
| App | iOS Bundle ID | Android Package | Status |
|---|---|---|---|
| My Credit Snapshot | `com.mycreditstatus` | `com.creditstatus` | Live (v2.1), updating to v3.0 |
| CrediLife (BD) | `com.creditadmiral.credilife` | `com.creditadmiral.credilife` | v1.0.3 submitted |
| CRI (RL) | `com.creditrestorationinstitute` | `com.creditrestorationinstitute` | Android closed testing |
| CROW 4U (KW1) | `com.creditadmiral.crow` | `com.creditadmiral.crow` | TestFlight + Google Play setup |

### App.json Per-Brand Configs

**My Credit Snapshot (default)**:
```json
"name": "My Credit Snapshot", "version": "3.0.0",
"icon": "./assets/mcs_1024.png",
"ios": { "bundleIdentifier": "com.mycreditstatus" },
"android": { "package": "com.creditstatus", "adaptiveIcon": { "foregroundImage": "./assets/mcs_1024.png" } }
```

**CrediLife (BD)**:
```json
"name": "CrediLife", "version": "1.0.3",
"icon": "./assets/credilife_1024.png",
"ios": { "bundleIdentifier": "com.creditadmiral.credilife" },
"android": { "package": "com.creditadmiral.credilife", "adaptiveIcon": { "foregroundImage": "./assets/credilife_512.png" } }
```

**CRI (RL)**:
```json
"name": "Credit Restoration Institute", "version": "1.0.0",
"icon": "./assets/rl_ios.png",
"ios": { "bundleIdentifier": "com.creditrestorationinstitute" },
"android": { "package": "com.creditrestorationinstitute", "adaptiveIcon": { "foregroundImage": "./assets/rl_android.png" } }
```

**CROW 4U (KW1)**:
```json
"name": "CROW 4U", "version": "1.1.0",
"icon": "./assets/kw1_1024.png",
"ios": { "bundleIdentifier": "com.creditadmiral.crow" },
"android": { "package": "com.creditadmiral.crow", "adaptiveIcon": { "foregroundImage": "./assets/kw1_512.png" } }
```

---

## Environment Configuration

### .env Variables
```env
X_APP_ID=C1D9F50F-9A1A-4D98-B39F-2B4C2A7A49E8
API_BASE_URL=https://api.creditstatusupdater.com/api
API_RP_BASE_URL=https://api.creditstatusupdater.com/referral-partners
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=my-credit-status.firebaseapp.com
FIREBASE_PROJECT_ID=my-credit-status
FIREBASE_STORAGE_BUCKET=my-credit-status.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
FIREBASE_DATABASE_URL=https://my-credit-status-default-rtdb.firebaseio.com
EXPO_PUBLIC_ENV=development
```

Imported via `import { API_BASE_URL } from '@env';` (react-native-dotenv plugin).

---

## Implementation Status

All phases complete (0-6). Remaining Phase 5 items: push notifications (backend pending), loading skeletons, error boundaries.

**Detailed references**:
- Screen implementation details: `docs/SCREEN_DETAILS.md`
- API documentation: `docs/API_GUIDE.md`
- Navigation flows: `docs/APP_FLOW.md`
- Original app bugs: `docs/REFERENCE_ORIGINAL_APP.md`
- Build guide: `docs/EXPO_BUILD_GUIDE.md`
- Brand switching: `docs/WHITE_LABEL_SWITCH_GUIDE.md`
