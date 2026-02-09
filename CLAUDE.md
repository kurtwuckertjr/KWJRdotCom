# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Kurt Wuckert Jr. (kurtwuckertjr.com). Built with React 19, TypeScript, Vite, and Tailwind CSS (loaded via CDN in `index.html`). Integrates the Gemini API (`@google/genai`) for an AI chat assistant and admin image generation. Deployed on Vercel.

## Commands

- **Dev server:** `npm run dev` (runs on port 3000)
- **Build:** `npm run build`
- **Preview production build:** `npm run preview`
- **Install deps:** `npm install`

There are no test or lint scripts configured.

## Environment

Set `GEMINI_API_KEY` in `.env.local`. Vite exposes it as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (see `vite.config.ts`).

## Architecture

**No `src/` directory.** All source files live at the project root. The `@` path alias resolves to the project root.

### Routing

Uses `HashRouter` from react-router-dom (hash-based routing for static hosting). Routes defined in `App.tsx`:
- `/` — Home (landing page with hero, blog previews, contact form)
- `/archive/:cat` — Blog archive filtered by category
- `/post/:id` — Individual blog post
- `/admin` — Admin dashboard for drafting posts with AI image generation

### Data Model

Blog content is **entirely static** — defined in `constants.tsx` as the `BLOG_POSTS` array. Post types are in `types.ts` (`Category` enum + `BlogPost` interface). Categories: bitcoin, business, politics, fitness, religion, all.

Full blog post body content is **hardcoded as JSX** inside `views/Post.tsx` in a large `useMemo` with `if (id === '...')` branches per post. Adding a new post requires: (1) adding an entry to `BLOG_POSTS` in `constants.tsx`, and (2) adding a corresponding JSX branch in `Post.tsx`.

### Key Components

- `components/ArchiveAssistant.tsx` — Floating chat widget using Gemini (`gemini-3-flash-preview`) with a system prompt about Bitcoin history
- `components/LogoCarousel.tsx` — Infinite scrolling logo ticker using framer-motion
- `views/Admin.tsx` — Post editor with Gemini image generation (`gemini-2.5-flash-image`)
- `views/Home.tsx` — Multi-section landing page with parallax effects via framer-motion

### Styling

Tailwind CSS is loaded from CDN (`cdn.tailwindcss.com`) in `index.html`, **not** via PostCSS/Vite plugin. Custom fonts: Outfit (headings) and Plus Jakarta Sans (body), loaded via Google Fonts. There is a `public/index.css` stylesheet linked in `index.html`. The design uses a teal/amber/slate color palette with heavy use of uppercase tracking-wide typography.

### SEO

`index.html` contains JSON-LD structured data (Person schema + FAQPage). `Post.tsx` injects per-post JSON-LD for BlogPosting schema. `llms.txt` provides an LLM-readable site summary.

### Static Assets

Images in `public/` and `public/blog-images/`. Many images are also referenced via GitHub raw URLs (from `kurtwuckertjr/KWJRdotCom` repo on GitHub).

### Contact Form

The contact form in `Home.tsx` is **UI-only** — `handleFormSubmit` simulates submission with a timeout but does not actually send data anywhere.
