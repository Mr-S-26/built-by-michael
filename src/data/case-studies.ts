export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  overview: string;
  problem: string;
  solution: string;
  techStack: { name: string }[];
  features: { title: string; description: string }[];
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hello-better-credit',
    title: 'Hello Better Credit',
    subtitle: 'Affiliate marketing platform for credit card issuers',
    category: 'Full-Stack',
    heroImage: '/hellobettercredit.png',
    overview:
      'Hello Better Credit is a full-featured affiliate marketing platform that connects credit card issuers with affiliate marketers. The platform handles the entire lifecycle from affiliate registration through commission payouts, with real-time tracking and a robust admin dashboard.',
    problem:
      'The client needed a platform where credit card issuers could list their products and affiliates could promote them — with accurate click and conversion tracking, a two-tier commission structure, and an admin panel to manage approvals, documents, and payouts. The platform had to run on shared cPanel hosting with no dedicated server resources.',
    solution:
      'I built a Next.js 13 application with Prisma and MySQL for the data layer, NextAuth.js for dual authentication (admin and affiliate portals), and a custom commission engine supporting a 95/5 affiliate-to-parent split. Click attribution uses a 30-day cookie window. The app runs on cPanel via a custom server.js wrapper with PM2 for process management.',
    techStack: [
      { name: 'Next.js 13' },
      { name: 'Prisma' },
      { name: 'MySQL' },
      { name: 'NextAuth.js' },
      { name: 'Bootstrap 5' },
      { name: 'Recharts' },
      { name: 'Mailgun' },
      { name: 'reCAPTCHA v3' },
      { name: 'PM2' },
    ],
    features: [
      {
        title: 'Dual Authentication System',
        description:
          'Separate admin and affiliate portals with role-based access control, powered by NextAuth.js with credential providers.',
      },
      {
        title: 'Click & Conversion Tracking',
        description:
          'Real-time tracking of affiliate clicks and conversions with 30-day cookie attribution and detailed analytics dashboards.',
      },
      {
        title: 'Two-Tier Commission Engine',
        description:
          'Automated commission calculation with a 95% affiliate / 5% parent split, commission holds until document verification, and bulk payout management.',
      },
      {
        title: 'Embeddable Affiliate Widgets',
        description:
          'Affiliates can generate embeddable widgets and tracking links to promote credit card offers on their own websites.',
      },
      {
        title: 'Admin Dashboard',
        description:
          'Comprehensive admin panel with real-time stats, affiliate management, document review workflow, and approval database.',
      },
      {
        title: 'cPanel Deployment',
        description:
          'Custom server.js wrapper enabling Next.js to run on shared cPanel hosting with PM2 process management — no dedicated server required.',
      },
    ],
    results: [
      'Fully operational affiliate platform with automated commission tracking',
      'Dual-portal system serving both administrators and affiliates',
      'Real-time analytics dashboard with Recharts visualizations',
      'Runs reliably on shared hosting via custom PM2 setup',
      'Document verification workflow preventing premature commission payouts',
    ],
    liveUrl: 'https://hellobettercredit.com',
  },
  {
    slug: 'credit-admiral-app',
    title: 'Credit Admiral Mobile App',
    subtitle: 'White-label credit monitoring app for iOS and Android',
    category: 'Mobile',
    heroImage: '/creditadmiral-app.png',
    overview:
      'A white-label credit monitoring mobile app built with React Native and Expo, serving four different brands from a single codebase. The app tracks credit scores across three bureaus, manages dispute workflows, and includes real-time chat with credit advisors.',
    problem:
      'The client operated multiple credit repair brands and needed a single mobile app that could be rebranded for each — with different logos, colors, and login screens — while sharing the same core functionality. The app needed to integrate with their existing Client API and Referral Partner API, support secure credential storage, and handle real-time messaging.',
    solution:
      'I built the app with Expo SDK 54 and React Native, using a brand configuration system that swaps themes, logos, and layouts based on a build-time flag. Redux Toolkit with RTK Query handles state and API calls, with automatic 401 token refresh. Firebase Realtime Database powers the messaging system, and SecureStore handles credential persistence.',
    techStack: [
      { name: 'React Native' },
      { name: 'Expo SDK 54' },
      { name: 'TypeScript' },
      { name: 'Redux Toolkit' },
      { name: 'RTK Query' },
      { name: 'Firebase' },
      { name: 'SecureStore' },
    ],
    features: [
      {
        title: 'Four White-Label Brands',
        description:
          'Single codebase serves My Credit Snapshot, CrediLife, Credit Restoration Institute, and CROW 4U — each with unique branding, colors, and login layouts.',
      },
      {
        title: 'Credit Score Tracking',
        description:
          'Monitors scores across all three credit bureaus with visual progress tracking, negative item counts, and inquiry monitoring.',
      },
      {
        title: 'Dual User Roles',
        description:
          'Separate experiences for clients (score tracking, disputes, action plans) and referral partners (dashboard, referrals, client management).',
      },
      {
        title: 'Real-Time Messaging',
        description:
          'Firebase-powered live chat between clients and credit advisors with push notifications and message history.',
      },
      {
        title: 'Automatic Token Refresh',
        description:
          'RTK Query middleware intercepts 401 responses, refreshes tokens silently, and retries failed requests without user interruption.',
      },
      {
        title: '4 Login Layout Variants',
        description:
          'Classic, hero, bold, and minimal login screen designs — configurable per brand to match their marketing identity.',
      },
    ],
    results: [
      'Single codebase serving 4 distinct brands on iOS and Android',
      'Dual API integration (Client + Referral Partner) with shared auth',
      'Real-time messaging system via Firebase Realtime Database',
      'Dark mode support across all brands',
      'Secure credential storage with Expo SecureStore',
    ],
  },
  {
    slug: 'credit-admiral-site',
    title: 'Credit Admiral Website',
    subtitle: 'SaaS marketing website with complex animations and pricing',
    category: 'Frontend',
    heroImage: '/creditadmiral-site.png',
    overview:
      'The marketing website for Credit Admiral, a credit repair SaaS platform. Features GSAP-powered animations, a training video library with 29 Vimeo-hosted tutorials, four pricing tiers, and a referral tracking system.',
    problem:
      'Credit Admiral needed a marketing website that would convey trust and professionalism in the credit repair industry. The site needed to showcase their platform features, host a training video library for partners, present pricing plans with a $1 trial offer, and track referral codes for affiliate attribution.',
    solution:
      'I built a Next.js 14 site with GSAP timeline animations on the hero and Framer Motion throughout. The training page integrates 29 Vimeo videos with a CreditCon carousel. A referral code system captures ?ref= parameters for affiliate tracking. The pricing section presents four plans with clear feature comparisons.',
    techStack: [
      { name: 'Next.js 14' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'GSAP' },
      { name: 'Lucide React' },
    ],
    features: [
      {
        title: 'GSAP Hero Animations',
        description:
          'Complex timeline-based animations on the hero section using GSAP, with scroll-triggered sequences and parallax effects.',
      },
      {
        title: 'Training Video Library',
        description:
          '29 Vimeo-hosted tutorial videos organized by category, plus a CreditCon event carousel and downloadable resources.',
      },
      {
        title: '4 Pricing Tiers',
        description:
          'Seaman ($199), Lieutenant ($299), Commander ($399), and Captain ($599) plans — all with a $1 trial period and detailed feature comparisons.',
      },
      {
        title: 'Referral Code Tracking',
        description:
          'URL parameter system captures ?ref= codes and persists them through the checkout flow for affiliate commission attribution.',
      },
      {
        title: 'Multi-Page Architecture',
        description:
          'Dedicated pages for features (12 sections with sticky pill nav), mobile app tour, training, and legal policies.',
      },
      {
        title: 'Arbitration Feature Showcase',
        description:
          'Dedicated section highlighting the platform\'s exclusive AAA/JAMS arbitration tools as a key differentiator.',
      },
    ],
    results: [
      'Polished marketing site with GSAP + Framer Motion animations',
      '29 training videos integrated via Vimeo embeds',
      '4 pricing plans with $1 trial conversion funnel',
      'Referral tracking system for affiliate attribution',
      'Multiple landing pages optimized for different user intents',
    ],
  },
  {
    slug: 'ootb-creatives',
    title: 'OOTB Creatives',
    subtitle: 'Full-service creative agency website with snap-scroll design',
    category: 'Full-Stack',
    heroImage: '/ootb.png',
    overview:
      'The website for Out of the Box Creatives, a full-service creative and marketing agency based in the Philippines. Features a snap-scroll homepage with video hero, team profiles, case studies, career listings, and a multi-tab contact form with email integration.',
    problem:
      'OOTB Creatives needed a website that reflected their creative identity — bold, dynamic, and interactive. It had to showcase their services (events, PR, branding, commercial production), display case studies, list career openings, and provide a contact system that routes inquiries to the right department.',
    solution:
      'I built a Next.js 15 site with a snap-scroll homepage featuring a video hero, auto-rotating service cards, and 70+ animated client logos. The contact form uses a 3-tab system (client/crewmate/exploring) that routes submissions via Nodemailer through GoDaddy SMTP. Team members have modal profiles, and career pages include full job descriptions with application forms.',
    techStack: [
      { name: 'Next.js 15' },
      { name: 'React 19' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'Nodemailer' },
      { name: 'Formidable' },
    ],
    features: [
      {
        title: 'Snap-Scroll Homepage',
        description:
          'Six full-viewport sections with CSS scroll-snap: Hero, Services, Clients, Team, Creative, and Contact — creating a presentation-like browsing experience.',
      },
      {
        title: 'Video Hero with Overlay',
        description:
          'Full-bleed background video with a read-more toggle that expands the agency description without leaving the hero section.',
      },
      {
        title: '70+ Animated Client Logos',
        description:
          'Auto-scrolling marquee of client logos with hover pause and smooth infinite loop animation.',
      },
      {
        title: '12 Team Member Profiles',
        description:
          'Grid of team photos that open into modal overlays with bios, roles, and social links.',
      },
      {
        title: '3-Tab Contact Form',
        description:
          'Separate forms for clients, potential crewmates, and general inquiries — each routed to the appropriate department via Nodemailer.',
      },
      {
        title: 'Case Studies & Careers',
        description:
          'Dedicated case study pages (Georges Cares, JML Flavor Festival) and 4 career postings with full job descriptions and application forms.',
      },
    ],
    results: [
      'Immersive snap-scroll experience reflecting the agency\'s creative identity',
      'Email routing system handling 3 inquiry types via Nodemailer',
      '70+ client logos in animated marquee showcase',
      '4 service detail pages with dedicated content',
      'Career portal with 4 active job postings',
    ],
    liveUrl: 'https://ootbcreatives.asia/',
  },
  {
    slug: 'pudci',
    title: 'PUDCI Platform',
    subtitle: 'Healthcare portal for a multi-branch diagnostic center',
    category: 'Full-Stack',
    heroImage: '/pudci.png',
    overview:
      'The website for Paranaque Ultrasound Diagnostic Center Inc. (PUDCI), a healthcare diagnostics chain with 7 branches across Metro Manila. Features an interactive symptom checker, searchable test catalog, branch locator with maps, and Sanity CMS for content management.',
    problem:
      'PUDCI had 7 branches with no unified online presence. They needed a website where patients could find the nearest branch, explore available diagnostic tests, check which HMO partners are accepted, and even identify potential health concerns through an interactive tool — all manageable by non-technical staff through a CMS.',
    solution:
      'I built a Next.js 15 site with Sanity CMS 4 powering all dynamic content — locations, HMO partners, hero slides, and diagnostic tests. An SVG body-map symptom checker lets patients click body parts to see related tests. Leaflet maps show all 7 branches with custom markers. The contact form routes inquiries to the selected branch via Nodemailer.',
    techStack: [
      { name: 'Next.js 15' },
      { name: 'React 19' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Sanity CMS 4' },
      { name: 'Leaflet' },
      { name: 'Nodemailer' },
      { name: 'Vitest' },
    ],
    features: [
      {
        title: 'Interactive Symptom Checker',
        description:
          'SVG body map where patients click on body parts to see related diagnostic tests — making healthcare navigation intuitive and accessible.',
      },
      {
        title: 'Searchable Test Catalog',
        description:
          'Filterable directory of all diagnostic tests with search, category filters, and branch availability.',
      },
      {
        title: '7-Branch Locator with Maps',
        description:
          'Leaflet-powered interactive map showing all branches (Baclaran, Bacoor, BF Homes, Binan, Las Pinas, Munoz, Sucat) with addresses, hours, and contact info.',
      },
      {
        title: 'Sanity CMS Integration',
        description:
          'All dynamic content (locations, HMO partners, hero slides, diagnostic tests) managed through Sanity CMS — editable by non-technical staff.',
      },
      {
        title: 'HMO Partner Directory',
        description:
          'Marquee display of accepted HMO partner logos with a searchable directory for patients to verify coverage.',
      },
      {
        title: 'Branch-Routed Contact Form',
        description:
          'Contact form that routes inquiries to the selected branch via Nodemailer, plus career listings with application forms.',
      },
    ],
    results: [
      'Unified online presence for 7 diagnostic center branches',
      'Interactive SVG symptom checker improving patient navigation',
      'CMS-managed content editable by non-technical staff',
      'Interactive maps with custom branch markers via Leaflet',
      'Automated contact form routing to individual branches',
    ],
    liveUrl: 'https://www.pudci.ph/',
  },
  {
    slug: 'acca-membership',
    title: 'ACCA Membership Portal',
    subtitle: 'Membership management site with recurring billing and e-signatures',
    category: 'Full-Stack',
    heroImage: '/acca.png',
    overview:
      'The membership portal for the American Credit Counselor Association (ACCA), handling the full membership lifecycle from signup through annual renewals. Features a custom WordPress plugin for recurring billing, electronic signature capture, PDF generation, and an interactive US member map.',
    problem:
      'ACCA needed a membership portal where credit counselors could sign up, agree to terms of service via electronic signature, pay annual dues ($100/year), and be automatically billed for renewals. The admin needed to track members across the US with a visual map and manage the entire billing cycle.',
    solution:
      'I built the portal on WordPress with WooCommerce Memberships and developed a custom plugin (acca-recurring) for NMI Customer Vault integration handling recurring billing. The checkout captures electronic signatures and generates signed ToS PDFs using FPDF. An interactive US map visualizes the member directory geographically.',
    techStack: [
      { name: 'WordPress' },
      { name: 'WooCommerce' },
      { name: 'Custom WP Plugin' },
      { name: 'NMI Gateway' },
      { name: 'FPDF' },
      { name: 'REST API' },
    ],
    features: [
      {
        title: 'Custom Recurring Billing Plugin',
        description:
          'The acca-recurring plugin integrates with NMI Customer Vault to store payment methods and automate annual membership renewals without manual intervention.',
      },
      {
        title: 'Electronic Signature Capture',
        description:
          'Members sign the Terms of Service electronically during checkout, with the signature embedded into a generated PDF for record-keeping.',
      },
      {
        title: 'PDF Generation',
        description:
          'Automatic generation of signed ToS documents using FPDF, stored and accessible from the member\'s account dashboard.',
      },
      {
        title: 'Interactive US Member Map',
        description:
          'Visual directory showing member locations across the United States, helping ACCA track geographic coverage.',
      },
      {
        title: 'Member Dashboard',
        description:
          'Custom My Account page with Account Details and Member Settings tabs for managing profiles and membership status.',
      },
      {
        title: 'WooCommerce Integration',
        description:
          'Membership checkout (Product ID 241, $100/year) integrated with WooCommerce Memberships for access control and subscription management.',
      },
    ],
    results: [
      '21 active members with automated annual billing',
      'Custom WP plugin handling NMI Customer Vault recurring payments',
      'Electronic signature workflow with PDF generation',
      'Interactive US map visualizing member distribution',
      'Zero manual intervention needed for membership renewals',
    ],
  },
  {
    slug: 'property-motion',
    title: 'Property Motion',
    subtitle: 'AI-powered real estate video generation SaaS',
    category: 'Full-Stack',
    heroImage: '/property-motion.png',
    overview:
      'Property Motion is a SaaS platform that generates short-form real estate marketing videos from property photos. Users upload images, enter listing details, and the system produces polished 9:16 vertical videos with AI-generated motion, voiceover narration, property overlays, and background music — all stitched together automatically.',
    problem:
      'Real estate agents needed a fast way to create professional video content from property photos without hiring videographers or learning editing software. The solution had to handle the entire pipeline — from still images to a finished, branded video with voiceover and music — in minutes, not hours.',
    solution:
      'I built a React + Supabase platform with a multi-stage AI pipeline: Runway Gen-4 Turbo converts still photos into motion clips, Anthropic Claude writes marketing scripts, ElevenLabs generates voiceovers, and Shotstack stitches everything together with property overlays and agent branding. The frontend polls each stage and presents real-time progress to the user.',
    techStack: [
      { name: 'React 18' },
      { name: 'TypeScript' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'Supabase' },
      { name: 'Runway ML' },
      { name: 'Shotstack' },
      { name: 'ElevenLabs' },
      { name: 'Anthropic Claude' },
      { name: 'Stripe' },
    ],
    features: [
      {
        title: 'AI Video Generation Pipeline',
        description:
          'Multi-stage pipeline: Runway Gen-4 Turbo creates motion from stills, Shotstack composes the final video with overlays, transitions, and audio tracks.',
      },
      {
        title: 'AI Script & Voiceover',
        description:
          'Anthropic Claude writes 15-second marketing scripts from property details, then ElevenLabs converts them to natural-sounding voiceovers with 6 voice options.',
      },
      {
        title: 'Property Overlay System',
        description:
          '3 layout templates (Modern Luxe, Bold Banner, Minimal Focus) render property details, spec icons, and agent contact cards directly onto the video.',
      },
      {
        title: 'Per-Image Camera Controls',
        description:
          'Users set camera angles (pan left/right, zoom in, wide shot) and duration (2-10s) per image for cinematic control over each clip.',
      },
      {
        title: 'Property Listing Scraper',
        description:
          'ScraperAPI integration auto-fills property details and images from domain.com.au and realtor.com.au listing URLs.',
      },
      {
        title: 'Stripe Subscription Billing',
        description:
          'Two pricing tiers (Starter $299/mo, Growth $499/mo) with Stripe checkout, webhook handling, and a self-service billing portal.',
      },
    ],
    results: [
      'End-to-end video generation from photos to finished MP4 in minutes',
      'Multi-service AI pipeline orchestrating 4 external APIs',
      'Real-time progress tracking across Runway and Shotstack stages',
      'Curated music library with 15 tracks across 5 categories',
      'Agent branding system with photo, contact details, and circular mask overlay',
    ],
  },
  {
    slug: 'feud-frenzy',
    title: 'Feud Frenzy',
    subtitle: 'Offline Family Feud game show app for live events',
    category: 'Desktop',
    heroImage: '/feud-frenzy.png',
    overview:
      'Feud Frenzy is a Family-Feud-inspired live game show application built with Electron for conferences and events. It runs 100% offline on a single laptop with dual screens — a Controller window for the operator and an Audience window for the projector — delivering a polished, broadcast-quality game experience.',
    problem:
      'Event organizers needed a reliable, offline Family Feud game for live conferences and corporate events. Existing solutions required internet connectivity, lacked dual-screen support, and offered limited customization. The app had to run flawlessly during live events with no room for lag, crashes, or network dependency.',
    solution:
      'I built a dual-window Electron app with React and TypeScript. The Controller window gives the operator full game control via IPC commands, while the Audience window displays the game board on a projector. A centralized GameStateManager uses a reducer pattern to manage all game logic, broadcasting state updates to both windows simultaneously. The app includes a question library system with Zod validation, USB buzzer integration for face-off rounds, and a custom audio protocol for sound effects.',
    techStack: [
      { name: 'Electron 28' },
      { name: 'React 18' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Vite' },
      { name: 'Zod' },
      { name: 'electron-builder' },
    ],
    features: [
      {
        title: 'Dual-Window Architecture',
        description:
          'Controller window (1200x800) for the operator and a fullscreen Audience window for the projector, communicating via Electron IPC with real-time state synchronization.',
      },
      {
        title: 'Question Library System',
        description:
          'Persistent JSON-based library for managing question sets with CRUD operations, usage tracking, JSON import, and Zod schema validation.',
      },
      {
        title: 'USB Buzzer Face-Off',
        description:
          'Keyboard-mapped buzzer system supporting USB buzzers with face-off, challenge, and playing phases — including lockout timers and team-specific key mapping.',
      },
      {
        title: 'Advanced Scoring Engine',
        description:
          'Per-team round points, Round 3 double points, 300-point instant win, steal mode with success/fail outcomes, and automatic tiebreaker detection.',
      },
      {
        title: 'Answer Unreveal System',
        description:
          'Operators can undo revealed answers, with points automatically subtracted from the correct team — each answer tracks which team revealed it.',
      },
      {
        title: 'Custom Audio System',
        description:
          'Custom audio:// protocol for sound effects (correct, wrong, buzz, voice-over) with volume control, mute toggle, and IPC-broadcast playback across both windows.',
      },
    ],
    results: [
      'Production-ready desktop app deployed at live events',
      'Dual-window system with real-time IPC state synchronization',
      'Question library with persistent storage and Zod validation',
      'USB buzzer integration with multi-phase face-off mechanics',
      'Packaged as a one-click Windows NSIS installer',
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
