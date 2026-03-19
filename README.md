# Hemin Dhamelia — Personal Portfolio

Welcome to the repository for my interactive 3D personal portfolio website — a fully serverless, production-deployed web experience built with React, TypeScript, Three.js, and a suite of modern cloud services.

## 🚀 Overview

This portfolio goes far beyond a static resume. It's a living, interactive experience featuring:

- 🤖 **Custom 3D animated character** rendered in WebGL via Three.js
- 🔮 **Physics-based interactive tech stack** — 30 spheres with real collision physics driven by Rapier (Rust/WASM)
- 📜 **Horizontal scroll project showcase** — GSAP ScrollTrigger pins the section and drives horizontal card movement as you scroll vertically
- 👁️ **Live visitor counter** — every page load calls a Supabase PostgreSQL RPC function to atomically increment and display your visitor number
- 🖱️ **Custom magnetic cursor** with per-element interaction zones
- 🌊 **Smooth momentum scroll** powered by Lenis
- ⚡ **Lazy-loaded routes** with React Suspense — heavy 3D assets don't block initial paint
- 🔐 **Protected `/admin` route** gated by Clerk authentication (CMS dashboard in progress)
- 📊 **Real User Monitoring** via Vercel Analytics (Core Web Vitals, traffic)
- 📋 **Browser-side logging** via BetterStack Logtail

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) | Core framework + build tool |
| [TypeScript](https://www.typescriptlang.org/) | Static typing across all components |
| [React Router DOM v7](https://reactrouter.com/) | Client-side routing (`/` and `/admin`) |
| Vanilla CSS (modular per-component) | Scoped, performant styling |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [React Fast Marquee](https://www.react-fast-marquee.com/) | Scrolling marquee component |

### 3D & Animation
| Technology | Purpose |
|---|---|
| [Three.js](https://threejs.org/) | WebGL 3D rendering engine |
| [React Three Fiber](https://r3f.docs.pmnd.rs/) | React renderer for Three.js |
| [React Three Drei](https://github.com/pmndrs/drei) | Three.js helpers (GLTF loader, Environment, etc.) |
| [React Three Rapier](https://github.com/pmndrs/react-three-rapier) | Rapier WASM physics engine for sphere collisions |
| [React Three Cannon](https://github.com/pmndrs/use-cannon) | Additional physics support |
| [React Three Postprocessing](https://github.com/pmndrs/react-postprocessing) | N8AO ambient occlusion on 3D scenes |
| [GSAP](https://gsap.com/) + [@gsap/react](https://gsap.com/resources/React/) | Scroll animations, pinned sections, ScrollTrigger timelines |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth momentum-based scroll |
| [Framer Motion](https://www.framer.com/motion/) | Component micro-animations and transitions |

### Backend Services (BaaS — No traditional server)
| Service | Purpose |
|---|---|
| [Supabase](https://supabase.com/) | PostgreSQL database + serverless RPC functions |
| [Clerk](https://clerk.com/) | Authentication, session management, JWTs |
| [BetterStack Logtail](https://betterstack.com/logs) | Browser-side structured log shipping |
| [Vercel](https://vercel.com/) | Hosting, CDN, CI/CD, Real User Monitoring |

---

## 🗄️ Database

**Supabase (PostgreSQL)** — managed PostgreSQL with auto-generated APIs and Row Level Security.

The primary active feature is the **visitor counter**, powered by a PostgreSQL stored procedure:

```typescript
const { data } = await supabase.rpc("increment_visitor_count");
```

This atomically increments the visitor count and returns the new total, which is then animated from 0 to the final number on every page load.

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [Supabase](https://supabase.com) project with an `increment_visitor_count` RPC function
- A [Clerk](https://clerk.com) application
- A [BetterStack Logtail](https://betterstack.com/logs) source

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Portfolio-HeminDhamelia/Portfolio_Hemin_Dhamelia.git
   cd Portfolio_Hemin_Dhamelia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```env
   # Clerk (Authentication)
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

   # Supabase (Database)
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # BetterStack Logtail (Monitoring)
   VITE_LOGTAIL_TOKEN=your_logtail_source_token
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## ☁️ Deployment

This site is deployed on **[Vercel](https://vercel.com)**. Every push to `main` triggers an automatic build and deployment to Vercel's global CDN edge network.

- Build command: `tsc -b && vite build`
- Output directory: `dist/`
- Environment variables: configured in the Vercel dashboard under Project Settings → Environment Variables

---

## 📁 Project Structure

```
src/
├── main.tsx              # App entry — BrowserRouter + ClerkProvider
├── App.tsx               # Routes: / (portfolio) and /admin (protected)
├── components/
│   ├── Landing.tsx       # Hero + live visitor counter (Supabase RPC)
│   ├── Navbar.tsx        # Sticky nav + smooth scroll (Lenis + GSAP)
│   ├── TechStack.tsx     # Physics sphere WebGL scene (Three.js + Rapier)
│   ├── Work.tsx          # Horizontal scroll projects (GSAP ScrollTrigger)
│   ├── Character/        # 3D animated character (GLTF + React Three Fiber)
│   ├── Cursor.tsx        # Custom magnetic cursor
│   ├── Loading.tsx       # Asset-gated loading screen
│   └── AdminPage.tsx     # Protected admin dashboard (in progress)
├── lib/
│   ├── supabaseClient.ts # Supabase JS client
│   └── logtail.ts        # BetterStack browser logger
└── context/
    └── LoadingProvider.tsx # Loading gate context
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> For a full technical deep-dive into every service, design decision, and the AI-assisted development workflow, see [Claude.md](./Claude.md).