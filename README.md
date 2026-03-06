# Hemin Dhamelia - Personal Portfolio

Welcome to the repository for my interactive 3D personal portfolio website.

## 🚀 Overview

This portfolio is designed to showcase my skills, projects, and career experience through an immersive and interactive user experience. It leverages modern web technologies, 3D graphics, and smooth animations to create a standout presentation.

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics:** [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/) (`@react-three/fiber`, `@react-three/drei`)
- **Physics Engine:** `@react-three/rapier` & `@react-three/cannon`
- **Animations:** [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database Backend:** [Supabase](https://supabase.com/)

## � Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory and add the necessary environment variables for your Clerk and Supabase configurations as well as any other API keys.
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).