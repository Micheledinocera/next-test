# Copilot Instructions for next-test

## Project Overview

This is a **Next.js 16** application using the **App Router** with TypeScript, Tailwind CSS, and ESLint. It's a minimal starter template focused on client-side rendering with server-side capabilities.

**Key Stack:**
- Next.js 16.1.6 with App Router (`app/` directory)
- React 19.2.3 with TypeScript 5
- Tailwind CSS 4 (with PostCSS 4)
- ESLint 9 (Next.js config)

## Architecture & File Structure

- **`app/`** - App Router entry point (Next.js 13+ pattern)
  - `layout.tsx` - Root layout with fonts (Geist Sans/Mono), metadata, and styling
  - `page.tsx` - Home page component
  - `globals.css` - Global Tailwind styles
- **`public/`** - Static assets
- **Root configs** - `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`

## Key Patterns & Conventions

### React Components
- Use **functional components with TypeScript** - all components must have proper type annotations
- Server Components by default (in `app/` directory) unless `'use client'` directive is added
- Example: `layout.tsx` uses React Metadata API for SEO

### Styling
- **Tailwind CSS first** for all styling (see `page.tsx` for utility examples)
- Global styles in `app/globals.css`
- Dark mode support built-in (use `dark:` prefix for dark mode variants)
- Font variables injected via `next/font/google` (see `layout.tsx`)

### TypeScript Configuration
- Path alias: `@/*` maps to root directory
- Strict mode enabled (`"strict": true`)
- Next.js plugins included for type safety

## Essential Development Commands

```bash
bun dev              # Start dev server (http://localhost:3000)
bun run build        # Build for production
bun start            # Start production server
bun run lint         # Run ESLint
```

**Note:** Project uses Bun as package manager (see package-lock.json). Use `bun` commands, not `npm`/`yarn`/`pnpm`.

## ESLint & Code Quality

- Configuration: `eslint.config.mjs` (ESLint flat config format)
- Uses `eslint-config-next/core-web-vitals` for best practices
- Uses `eslint-config-next/typescript` for type-aware linting
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Critical Developer Workflows

1. **Adding a new page**: Create `.tsx` file in `app/` directory (e.g., `app/about/page.tsx`)
2. **Using API routes**: Create `app/api/route.ts` (Next.js App Router pattern)
3. **Client-side logic**: Add `'use client'` at top of file for interactive components
4. **Building for production**: `bun run build` → `bun start`

## Common Patterns from Codebase

- **Metadata exports** in layouts/pages for SEO (`export const metadata`)
- **Image optimization** via `next/image` (used in `page.tsx`)
- **Font optimization** via `next/font` (configured in `layout.tsx`)
- **Responsive styling** via Tailwind breakpoints (e.g., `sm:items-start`)
- **Dark mode** conditionally via `dark:` utilities
