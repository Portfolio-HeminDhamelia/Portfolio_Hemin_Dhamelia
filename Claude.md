# 🧠 Hemin Dhamelia — Portfolio Website: Full Project Breakdown

> A detailed technical deep-dive into everything that powers this portfolio — the web stack, backend services, database, deployment pipeline, and the AI-assisted development workflow that brought it all to life.

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Web Stack — Frontend](#2-web-stack--frontend)
3. [Animation & 3D Engine](#3-animation--3d-engine)
4. [Backend Services (BaaS)](#4-backend-services-baas)
5. [Database](#5-database)
6. [Authentication](#6-authentication)
7. [Observability & Monitoring](#7-observability--monitoring)
8. [Deployment & Hosting](#8-deployment--hosting)
9. [Environment & Configuration](#9-environment--configuration)
10. [Project Architecture & File Structure](#10-project-architecture--file-structure)
11. [How AI / Vibe Coding Built This](#11-how-ai--vibe-coding-built-this)

---

## 1. Project Overview

This is a **personal portfolio website** built for Hemin Dhamelia — a Full-Stack Developer & Cloud/DevOps Engineer. The site is designed to be far more than a static resume; it's a living, interactive experience featuring:

- A custom 3D animated character (GLTF/GLB model rendered in WebGL)
- Physics-based interactive tech stack sphere visualization
- Scroll-hijacked horizontal project showcase with GSAP animations
- Live visitor counter powered by a real Supabase database
- A smooth scroll experience using Lenis
- Custom magnetic cursor effects
- Lazy-loaded routes including a protected Admin page
- Full deployment on Vercel with analytics tracking

---

## 2. Web Stack — Frontend

| Layer | Technology | Version |
|---|---|---|
| **Framework** | React | 18.3.1 |
| **Language** | TypeScript | 5.5.3 |
| **Build Tool** | Vite | 5.4.1 |
| **Routing** | React Router DOM | 7.13.1 |
| **Styling** | Vanilla CSS (modular per-component) | — |
| **Icons** | React Icons | 5.3.0 |
| **Marquee** | React Fast Marquee | 1.6.5 |
| **Analytics** | Vercel Analytics | 1.4.1 |

### Why this stack?

- **Vite** was chosen over Create React App for its near-instant HMR (Hot Module Replacement) and blazing fast cold-starts — critical when iterating quickly with AI assistance.
- **TypeScript** provides strict type safety across all components, including strongly-typed props for Three.js materials, Supabase RPC responses, and Clerk auth objects.
- **Vanilla CSS** (per-component `.css` files imported alongside each `.tsx`) keeps styles co-located and scoped — no CSS-in-JS overhead, no Tailwind class sprawl. Clean, fast, maintainable.

---

## 3. Animation & 3D Engine

This is where the site truly differentiates itself. The tech stack section and the character model are rendered entirely in WebGL using Three.js, wrapped in React-friendly abstractions.

| Technology | Package | Purpose |
|---|---|---|
| **Three.js** | `three` ^0.168.0 | Core 3D rendering engine |
| **React Three Fiber** | `@react-three/fiber` ^8.17.10 | React renderer for Three.js scenes |
| **React Three Drei** | `@react-three/drei` ^9.120.4 | Three.js helpers (Environment, GLTF loader, etc.) |
| **React Three Rapier** | `@react-three/rapier` ^1.5.0 | Physics engine (Rapier WASM) for sphere collisions |
| **React Three Cannon** | `@react-three/cannon` ^6.6.0 | Secondary physics support |
| **Postprocessing** | `@react-three/postprocessing` ^2.16.3 | N8AO ambient occlusion effect on 3D scenes |
| **GSAP** | `gsap` ^3.12.7 + `@gsap/react` ^2.1.2 | Scroll animations, scroll-triggered timelines, pinned sections |
| **Lenis** | `lenis` ^1.3.18 | Smooth momentum-based scroll hijacking |
| **Framer Motion** | `framer-motion` ^12.35.0 | Micro-animations and component transitions |

### Key 3D Scenes

#### `TechStack.tsx` — Interactive Physics Spheres
- Renders **30 physics-enabled spheres** in a WebGL canvas
- Each sphere has a randomized tech logo texture (React, Next.js, Node.js, Express, MongoDB, MySQL, TypeScript, JavaScript) mapped to a `MeshPhysicalMaterial`
- Uses **Rapier physics** (a Rust/WASM physics engine) for realistic ball collisions
- A **kinematic pointer collider** follows the mouse cursor and pushes spheres away on hover
- The scene activates (gravity kicks in) only when the user scrolls past the Work section — performance-optimized
- Postprocessing adds ambient occlusion via `N8AO` for depth realism

#### `Character/Scene.tsx` — 3D Animated Character
- Loads a custom **GLTF/GLB character model** from `/public/models/`
- Rendered in a React Three Fiber `<Canvas>` with environment lighting from an `.hdr` file
- Lazy-loaded via React `Suspense` to avoid blocking initial page paint

#### GSAP Scroll Animations
- The **Work section** uses a GSAP `ScrollTrigger` timeline to pin the section and horizontally scroll the project cards as the user scrolls vertically — a full scroll-hijack experience
- The `Navbar` uses GSAP `ScrollTrigger` for scroll-aware state toggling
- Lenis smooth scroll is piped to GSAP's scroll engine for seamless integration

---

## 4. Backend Services (BaaS)

There is **no traditional backend server**. This is a **Backend-as-a-Service (BaaS)** architecture — the frontend talks directly to managed cloud services via SDKs and APIs. This is the modern "serverless frontend" paradigm.

```
Browser (React/Vite SPA)
       │
       ├──► Supabase (Database + RPC Functions)
       ├──► Clerk      (Authentication)
       └──► Logtail    (Logging / Observability)
```

| Service | Role | SDK |
|---|---|---|
| **Supabase** | PostgreSQL database + serverless RPC functions | `@supabase/supabase-js` ^2.98.0 |
| **Clerk** | User auth (sign-in, session management, JWTs) | `@clerk/react` ^6.0.1 |
| **Logtail / BetterStack** | Browser-side log shipping | `@logtail/browser` ^0.5.8 |
| **Vercel** | Hosting, CDN, edge network, CI/CD | `@vercel/analytics` ^1.4.1 |

---

## 5. Database

**Platform:** [Supabase](https://supabase.com) — a fully managed PostgreSQL database with a real-time API layer, auto-generated REST and WebSocket APIs, and Row Level Security (RLS).

**Database Engine:** PostgreSQL (managed, hosted on Supabase's infrastructure — AWS under the hood)

**Project Supabase Instance:**
```
URL: https://adwefkijswrunlgxaggc.supabase.co
Region: Supabase-managed (AWS us-east-1 by default)
```

### What's Stored

#### Visitor Counter Table
The most actively used database feature. The `Landing.tsx` component calls a **Supabase RPC function** on every page load:

```typescript
const { data, error } = await supabase.rpc("increment_visitor_count");
```

This triggers a **PostgreSQL stored procedure** (`increment_visitor_count`) that:
1. Atomically increments the visitor count in a dedicated table
2. Returns the updated count as an integer

The frontend then animates from `0` to the returned count over 1.5 seconds — giving every visitor a personalized "Hello! Visitor #N" greeting.

**Why RPC?** Using a stored procedure (rather than a raw `UPDATE` + `SELECT`) ensures **atomic increments** with no race conditions even under concurrent traffic.

### Supabase Auth Integration (Planned)
The `@clerk/react` SDK is installed and `ClerkProvider` wraps the entire app in `main.tsx`. The Admin route at `/admin` is protected and intended to gate a future CMS dashboard. The `AdminPage.tsx` currently shows a placeholder — full auth-protected content management is planned.

---

## 6. Authentication

**Platform:** [Clerk](https://clerk.com)

Clerk is wrapped at the root of the React tree:

```tsx
// main.tsx
<ClerkProvider publishableKey={clerkPubKey}>
  <App />
</ClerkProvider>
```

- Handles **OAuth flows**, session tokens, and JWT generation
- The publishable key is consumed from `VITE_CLERK_PUBLISHABLE_KEY` in the environment
- The `/admin` route is gated behind Clerk's auth to protect the future content management dashboard
- Clerk's JWTs are designed to integrate seamlessly with Supabase's Row Level Security (RLS) policies — when enabled, only authenticated admins can mutate database records

---

## 7. Observability & Monitoring

**Platform:** [BetterStack Logtail](https://betterstack.com/logs)

```typescript
// src/lib/logtail.ts
import { Logtail } from '@logtail/browser';
export const logger = new Logtail(logtailToken);
```

- Ships structured logs directly from the **browser** to BetterStack's log aggregation platform
- Used to capture frontend errors, user interactions, and diagnostic events without a backend server
- Token is stored in `VITE_LOGTAIL_TOKEN` environment variable

**Vercel Analytics** (`@vercel/analytics`) is also integrated — providing:
- Real User Monitoring (RUM)
- Core Web Vitals (LCP, FID, CLS) dashboards
- Traffic analytics on the Vercel deployment dashboard

---

## 8. Deployment & Hosting

**Platform:** [Vercel](https://vercel.com)

| Property | Value |
|---|---|
| **Hosting** | Vercel Edge Network (Global CDN) |
| **Build Command** | `tsc -b && vite build` |
| **Output Directory** | `dist/` |
| **Dev Server** | `vite --host` (LAN-accessible) |
| **Framework Detection** | Vite (auto-detected by Vercel) |
| **CI/CD** | Git push to `main` triggers automatic Vercel deployment |

### Deployment Flow

```
Local Dev  ──git push──►  GitHub Repo  ──webhook──►  Vercel Build
                                                          │
                                              tsc -b && vite build
                                                          │
                                              Static assets deployed
                                              to Vercel's CDN edge nodes
                                              globally (~300ms cold start)
```

- **No server to manage.** The entire site is a static SPA (Single Page Application) outputted by `vite build`.
- Vercel automatically handles HTTPS, custom domains, preview deployments on pull requests, and rollbacks.
- Environment variables (`VITE_*`) are configured in the Vercel dashboard under Project Settings → Environment Variables.

---

## 9. Environment & Configuration

All sensitive keys live in `.env.local` locally and are configured in Vercel's environment settings for production. They are never committed to version control.

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Supabase — Database access
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# BetterStack Logtail — Browser logging
VITE_LOGTAIL_TOKEN=...
```

> All environment variables are prefixed with `VITE_` — Vite's convention for exposing env vars to the browser bundle at build time.

---

## 10. Project Architecture & File Structure

```
Fork_Portfolio_Hemin_Dhamelia/
├── public/
│   ├── images/               # Project screenshots, tech logo textures (.webp)
│   └── models/               # GLTF/GLB character models, .hdr environment maps
│
├── src/
│   ├── main.tsx              # App entry — BrowserRouter + ClerkProvider
│   ├── App.tsx               # Route definitions (/ and /admin), lazy imports
│   ├── index.css             # Global design tokens, resets, typography
│   │
│   ├── components/
│   │   ├── Landing.tsx       # Hero section + visitor counter (Supabase RPC)
│   │   ├── Navbar.tsx        # Fixed nav + smooth scroll via Lenis + GSAP
│   │   ├── About.tsx         # About section
│   │   ├── Career.tsx        # Career/experience timeline
│   │   ├── WhatIDo.tsx       # Services/skills section
│   │   ├── TechStack.tsx     # 🔮 Physics sphere WebGL scene (Three.js + Rapier)
│   │   ├── Work.tsx          # Horizontal scroll project cards (GSAP ScrollTrigger)
│   │   ├── WorkImage.tsx     # Project image carousel within work cards
│   │   ├── Contact.tsx       # Contact section
│   │   ├── SocialIcons.tsx   # Social media links
│   │   ├── Cursor.tsx        # Custom magnetic cursor overlay
│   │   ├── HoverLinks.tsx    # Magnetic nav link hover effects
│   │   ├── Loading.tsx       # Initial loading screen animation
│   │   ├── MainContainer.tsx # Page layout wrapper — renders all sections
│   │   ├── AdminPage.tsx     # Protected /admin route (auth CMS — in progress)
│   │   │
│   │   ├── Character/        # 🤖 3D Character WebGL scene
│   │   │   ├── index.tsx     # Canvas entrypoint
│   │   │   ├── Scene.tsx     # GLTF model, lighting, animation
│   │   │   └── exports.ts    # Shared scene exports
│   │   │
│   │   ├── styles/           # Per-component CSS files
│   │   └── utils/            # Utility helpers (Lenis instance, etc.)
│   │
│   ├── context/
│   │   └── LoadingProvider.tsx  # Loading gate — waits for 3D assets before showing UI
│   │
│   ├── lib/
│   │   ├── supabaseClient.ts    # Supabase JS client (initialized from env vars)
│   │   └── logtail.ts           # Logtail browser logger instance
│   │
│   └── data/
│       └── boneData.ts          # Static data for character bone/animation metadata
│
├── vite.config.ts            # Vite config — @vitejs/plugin-react only
├── tsconfig.app.json         # TypeScript config for app source
├── package.json              # All dependencies + scripts
├── index.html                # Vite SPA entry HTML
└── .env.local                # Local secrets (DO NOT COMMIT)
```

---

## 11. How AI / Vibe Coding Built This

This entire portfolio was built using an **AI-assisted "vibe coding" workflow** — a development methodology where the developer describes desired outcomes in natural language and iterates rapidly with an AI pair programmer (Antigravity / Claude) handling implementation details.

### What "Vibe Coding" Actually Means Here

Rather than writing boilerplate from scratch, the approach was:

1. **Describe the feature** → *"I want a horizontal scroll section where project cards scroll sideways as the user scrolls down"*
2. **AI generates the implementation** → GSAP `ScrollTrigger` timeline with pinned section and `translateX` animation
3. **Refine iteratively** → *"The cards aren't aligning right on mobile"* → AI debugs the `getBoundingClientRect` math
4. **Commit and move on**

### What AI Was Used For

| Feature | AI Contribution |
|---|---|
| **3D Physics Spheres** (`TechStack.tsx`) | Full implementation from scratch — Three.js, Rapier physics, MeshPhysicalMaterial, mouse pointer collider |
| **GSAP Scroll Animations** (`Work.tsx`) | Scroll-pinning, horizontal translate math, ScrollTrigger cleanup lifecycle |
| **Supabase Visitor Counter** | RPC call pattern, atomic increment SQL function, animated count-up logic |
| **Lenis + GSAP Integration** | Smooth scroll integration, `scrollTo` on nav click, resize refresh handlers |
| **Custom Magnetic Cursor** (`Cursor.tsx`) | Mouse tracking, magnetic pull toward interactive elements via `data-cursor` attributes |
| **Loading Gate** (`LoadingProvider.tsx`) | Context-based loading state, waits for 3D model + assets before rendering the page |
| **Lazy Code Splitting** | `React.lazy()` + `Suspense` wrappers on heavy 3D components to optimize TTI |
| **Environment Setup** | `.env.local` structure, Vite `import.meta.env` patterns, Vercel env configuration |
| **CSS Refinements** | Font sizing, breakpoints, color variables, navbar alignment pixel-perfect tweaks |
| **README + Docs** | README.md, this Claude.md — written by AI from codebase analysis |

### The Vibe Coding Philosophy

> **"I know what I want. AI knows how to build it. Together we ship."**

The developer brings:
- The vision and design sensibility
- Project structure decisions
- Domain knowledge (what sections to include, what info to show)
- The iterative feedback loop ("this doesn't look right, fix it")

The AI brings:
- Instant boilerplate elimination
- Complex API integrations (Supabase RPC, Clerk setup, Three.js physics)
- Bug diagnosis and fix suggestions
- CSS and animation math that would take hours to figure out manually

### Iteration Speed

A portfolio of this complexity — 3D WebGL, physics simulation, scroll animations, live database, auth, logging, analytics — would typically take weeks to build solo. With AI pair programming:

- Core site structure → Hours
- 3D physics tech stack → 1 session
- GSAP scroll hijack → 1 session  
- Supabase visitor counter → Under 30 minutes
- Styling iterations → Real-time feedback loop

This is the future of development: **high-signal intent from the human, high-speed execution from AI**.

---

## Quick Reference: All External Services

| Service | Purpose | Dashboard |
|---|---|---|
| Supabase | PostgreSQL DB + RPC | https://supabase.com/dashboard |
| Clerk | Auth + User Management | https://dashboard.clerk.com |
| BetterStack Logtail | Browser Log Monitoring | https://betterstack.com/logs |
| Vercel | Hosting + CI/CD + Analytics | https://vercel.com/dashboard |
| GitHub | Source Control + Vercel trigger | https://github.com |

---

*This file was generated by the Antigravity AI coding assistant from full codebase analysis. Last updated: March 2026.*
