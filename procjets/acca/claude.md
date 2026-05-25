# ACCA Membership Site — Developer Reference

## 1. Project Overview

- **Site:** [acca.credit](https://acca.credit)
- **Hosting:** WPMUDev 25GB SSD
- **Domain registrar:** GoDaddy
- **Theme:** Themify Ultra (Ultra Lawyer2 demo) + custom child theme
- **Child theme path:** `/wp-content/themes/themify-ultra-child/`

## 2. Tech Stack

- **CMS:** WordPress + WooCommerce
- **Memberships:** WooCommerce Memberships (Matt's license from CreditCon.university)
- **Payment gateway:** XL NMI Gateway for WooCommerce (processor: NMI via Jason/PayPros)
- **NMI Live Public Key:** `F7ck5r-prS92K-4z4ap6-4fnv39`
- **Forms:** Forminator Pro
- **Theme:** Themify Ultra child theme
- **Custom plugin:** `acca-recurring` (recurring billing)

## 3. Key Files and Their Purpose

### Child Theme (`/wp-content/themes/themify-ultra-child/`)

| File | Purpose |
|---|---|
| `functions.php` | All custom PHP logic (checkout, user meta, PDF, map API, emails) |
| `assets/css/acca-checkout.css` | Checkout + My Account page styling |
| `assets/js/acca-checkout.js` | Checkout JS (Google Places, ToS modal, cardholder fields, billing sync) |
| `assets/js/acca-map-script.js` | Interactive US map for Find a Member page |
| `assets/svg/us-map.svg` | US SVG map (SimpleMaps, MIT license) |
| `acca-map-page-template.php` | Find a Member page template |
| `assets/libs/fpdf.php` | FPDF library for PDF generation |
| `assets/libs/font/` | FPDF font files (helveticab.php, etc.) |
| `assets/tmp/` | Temporary signature images during PDF generation |

### Uploads

| Path | Purpose |
|---|---|
| `/wp-content/uploads/acca-tos/` | Generated ToS PDFs |

### Custom Plugin

| Path | Purpose |
|---|---|
| `/wp-content/plugins/acca-recurring/` | Recurring billing plugin (see section 11) |

## 4. Checkout Flow

- **Product ID:** 241 (ACCA Annual Membership, $100)
- **Layout:** Single column; WooCommerce billing column hidden via CSS
- **Hook:** `woocommerce_checkout_before_order_review_heading`

### Custom Fields

First Name, Last Name, Username, Password, Confirm Password, Company Info (name, address, city, state, zip, phone, email, website), Personal Phone, Personal Email, Show in Directory checkbox

### Behavior

- Billing fields set to `required=false`
- `acca_force_billing_email` syncs billing fields from ACCA fields at priority 1
- Google Places autocomplete on company address field
  - API key: `AIzaSyDRN5vrqPYuWXwNHBK9m14oRzgvqul6tE4`
- ToS modal with e-signature canvas (ESIGN Act compliant, 12 ACCA Membership Standards)
- Cardholder fields injected below NMI payment box via JS
- On order complete: user created, all meta saved, PDF generated, map visibility defaults set

## 5. ToS PDF Generation

- **Trigger:** `woocommerce_order_status_completed` (priority 20)
- **Contents:** 12 membership standards, electronic signature section (name, company, date/time, IP, order #, signature image)
- **Output:** `/wp-content/uploads/acca-tos/acca-tos-{order_id}-{timestamp}.pdf`
- **Order meta saved:** `acca_tos_pdf_path`, `acca_tos_pdf_url`
- **Email attachment:** via `woocommerce_email_attachments`
- **Dependency:** FPDF font files must exist at `/assets/libs/font/` or PDF generation will fail silently

## 6. User Meta Keys

| Key | Description |
|---|---|
| `acca_first_name` | Member first name |
| `acca_last_name` | Member last name |
| `acca_company_name` | Company name |
| `acca_company_address` | Company street address |
| `acca_company_address2` | Company address line 2 |
| `acca_company_city` | Company city |
| `acca_company_state` | Company state (2-letter code) |
| `acca_company_zip` | Company ZIP code |
| `acca_company_phone` | Company phone |
| `acca_company_email` | Company email |
| `acca_company_website` | Company website |
| `acca_personal_phone` | Personal phone |
| `acca_personal_email` | Personal email |
| `acca_show_in_directory` | Show in member directory |
| `acca_show_on_map` | Show on Find a Member map (0 if delinquent) |
| `acca_map_show_address` | Show address on map listing |
| `acca_map_show_phone` | Show phone on map listing |
| `acca_map_show_email` | Show email on map listing |
| `acca_nmi_vault_id` | NMI Customer Vault ID |
| `acca_membership_start` | Membership start date |
| `acca_next_renewal` | Next renewal date |
| `acca_membership_status` | Status: active, pending_vault, retry, delinquent |

## 7. Order Meta Keys

| Key | Description |
|---|---|
| `acca_first_name` | First name from checkout |
| `acca_last_name` | Last name from checkout |
| `acca_username` | Username from checkout |
| `acca_company_name` | Company name |
| `acca_company_address` | Company address |
| `acca_company_address2` | Company address line 2 |
| `acca_company_city` | Company city |
| `acca_company_state` | Company state |
| `acca_company_zip` | Company ZIP |
| `acca_company_phone` | Company phone |
| `acca_company_email` | Company email |
| `acca_company_website` | Company website |
| `acca_personal_phone` | Personal phone |
| `acca_personal_email` | Personal email |
| `acca_cardholder_first` | Cardholder first name |
| `acca_cardholder_last` | Cardholder last name |
| `acca_cardholder_address` | Cardholder billing address |
| `acca_cardholder_city` | Cardholder city |
| `acca_cardholder_state` | Cardholder state |
| `acca_cardholder_zip` | Cardholder ZIP |
| `acca_signature_data` | Base64 signature image data |
| `acca_signature_name` | Typed signature name |
| `acca_signature_timestamp` | Signature timestamp |
| `acca_signature_ip` | Signer's IP address |
| `acca_tos_pdf_path` | Server path to generated ToS PDF |
| `acca_tos_pdf_url` | URL to generated ToS PDF |
| `acca_show_in_directory` | Directory opt-in from checkout |

## 8. Member Map

- **Page:** `/find-a-member/` (uses `acca-map-page-template.php`)
- **REST API endpoint:** `/wp-json/acca/v1/members/{state}`
- **Data source:** WP users (not custom post type)
- **Filters:** `acca_show_on_map=1` and `acca_company_state` match
- **Per-field visibility:** `acca_map_show_address`, `acca_map_show_phone`, `acca_map_show_email`
- **Northeast states:** Listed as clickable buttons (ME, NH, VT, MA, RI, CT, NJ, DE, MD, DC)
- **JS API:** `window.fetchMembersByState` exposed globally for NE state buttons
- **Map loading:** `waitForMap` polling ensures NE buttons attach after async SVG loads
- **Colors:** ACCA navy `#2c4563`, active state orange `#d35400`

## 9. My Account Page

### Tabs

| Tab | Path | Purpose |
|---|---|---|
| Account Details | `/my-account/acca-account-details/` | Edit company + personal info |
| Member Settings | `/my-account/acca-member-settings/` | Toggle map visibility + field visibility checkboxes |
| Log Out | — | Logout |

### Behavior

- Registration form removed, login form centered
- Nav toggle: logged out shows LOGIN button → `/my-account/`, logged in shows MY ACCOUNT → `/my-account/acca-account-details/`

## 10. Confirmation Email

- **Trigger:** `woocommerce_order_status_completed`
- **From:** support@acca.credit
- **Subject:** "Welcome to ACCA – Your Membership is Now Active!"
- **Heading:** "Membership Activated – Welcome to ACCA!"
- **Contains:** ACCA badge image, membership active message, delinquency copy (remove badge if 30+ days past due)
- **Badge URL:** `https://acca.credit/wp-content/uploads/2026/04/acca-badge.jpeg`
- **Attachment:** ToS PDF attached automatically
- **Note:** WooCommerce Memberships thank you message is suppressed

## 11. ACCA-Recurring Plugin

### Location

- **Server:** `/wp-content/plugins/acca-recurring/`
- **Local dev:** `C:\Users\mico\Desktop\Projects\acca-recurring\`

### Plugin Structure

```
acca-recurring/
├── acca-recurring.php          # Entry point, activation/deactivation hooks
├── assets/css/admin.css        # Admin dashboard styling
└── includes/
    ├── class-admin.php         # Admin UI, settings, AJAX handlers
    ├── class-emails.php        # Transactional email templates
    ├── class-nmi-api.php       # NMI payment gateway API wrapper
    ├── class-renewal.php       # Core renewal/retry business logic
    ├── class-scheduler.php     # WordPress cron scheduling
    └── class-vault.php         # Customer Vault & DB management
```

### Database Table: `wp_acca_renewals`

| Column | Type | Description |
|---|---|---|
| `id` | bigint | Primary key |
| `user_id` | bigint | WordPress user ID |
| `order_id` | bigint | Original WooCommerce order ID |
| `vault_id` | varchar | NMI Customer Vault ID |
| `membership_start` | date | Membership start date |
| `next_renewal` | date | Next renewal charge date |
| `status` | varchar | active, pending_vault, retry, delinquent |
| `retry_count` | int | Number of failed charge attempts (max 3) |
| `last_attempt` | datetime | Last charge attempt timestamp |
| `created_at` | datetime | Record creation timestamp |

### Status Values

| Status | Meaning |
|---|---|
| `active` | In good standing, will be charged on renewal date |
| `pending_vault` | Imported but not yet vaulted — won't be charged |
| `retry` | Payment failed, retrying (up to 3 attempts) |
| `delinquent` | All attempts failed, membership deactivated, removed from map |

### Renewal Logic

- Daily WP Cron at 8:00 AM (WordPress timezone)
- Charges renewal amount via NMI Customer Vault
- On success: extends `next_renewal` by 1 year, creates WooCommerce order, sends success email
- On failure: retry after 3 days, retry after 7 days, deactivate after 3rd failure
- Sends dunning emails on failure, delinquent notice on deactivation (sets `acca_show_on_map=0`)
- Transient lock prevents concurrent runs from double-charging

### Admin Dashboard Features

- Stats cards: Total, Active, Pending Vault, Retrying, Delinquent
- Members table with vault ID, renewal date, status
- **Run Renewal Check Now** — manually triggers the daily cron
- **Import Members from Orders** — finds completed orders with product 241, creates `pending_vault` records
- **Fetch Vault IDs** — queries NMI by email to find existing vault entries for pending members
- **Renew Now** — per-member manual renewal trigger
- **Settings page** — NMI security key, renewal amount

### WP Options

| Option | Description |
|---|---|
| `acca_recurring_nmi_key` | NMI API security key |
| `acca_recurring_amount` | Annual renewal amount (default: 100.00) |
| `acca_recurring_version` | Plugin version |

### Current State (May 2026)

- 21 members imported, all Active with NMI vault IDs
- Renewals due: April–May 2027

## 12. Known Issues / Notes

- **WooCommerce billing state** defaults to Alabama in admin view — cosmetic only, actual state saved in `acca_company_state` user meta
- **Matt (Order #275)** has no ToS PDF — signed up before PDF code was added
- **www redirect:** www.acca.credit redirects to acca.credit via Redirection plugin (John Godley)
- **WP Cron** fires on site visit, not a true server cron. Renewals not due until 2027 so this is acceptable for now
- **XL NMI Gateway** Tokenization is enabled but vault IDs are managed via acca-recurring plugin, not WooCommerce tokens
- **FPDF fonts** must exist at `/assets/libs/font/` or PDF generation will fail silently

## 13. Contacts

| Person | Role | Contact |
|---|---|---|
| Matt Liistro | Client/employer | matt@creditadmiral.com |
| Jason/PayPros | NMI payment processor | Handles NMI credentials and Customer Vault |
| Brianna | Teammate | Handles content/design assets |
| Efren Palabasan | Teammate | efpalabasan@gmail.com |

## 14. Deployment Notes

- **No staging environment** — test on live site
- **After theme/CSS changes:** Clear Themify Cache
- **After JS changes:** Hard refresh browser (Ctrl+Shift+R)
- **Plugin updates:** Zip `acca-recurring` folder → WP Admin > Plugins > Upload Plugin > Replace current
