# AGENTS.md

Bilingual (es/en) Astro 5 + Tailwind CSS 4 + MDX portfolio. Content-first architecture: content lives as Zod-schema'd data files, pages compose from ordered blocks, and all data flows through a `ContentRepository` interface with swappable adapters (`local` now, Sanity later).

## Commands

- `npm run dev` — dev server on `localhost:4321`
- `npm run build` — builds to `./dist/`
- `npm run preview` — previews the production build
- `npx astro check` — typecheck (not wired into a package.json script; run it manually after changes)
- No lint or test tooling is configured.

## i18n

- Astro native i18n: `defaultLocale: 'es'`, `prefixDefaultLocale: true` — every route lives under `/es/...` and `/en/...`. `/` redirects to `/es` (`src/pages/index.astro`).
- Pages: `src/pages/[...locale]/` with a `getStaticPaths()` returning both locales.
- UI strings come from `src/i18n/{es,en}.json` via `useTranslations(locale)` (falls back to `es`).
- **Localized content convention**: every user-facing text field in content files is a `{ es, en }` object (`LocalizedText`). The repository adapter resolves it to a plain string per locale before it reaches components — UI must never receive `{es,en}` objects. `src/types/domain.ts` holds the locale-resolved types.

## Content model (`src/content.config.ts`)

Collections: `site`, `home` (JSON singletons), `projects` (MDX), `skillCategory`, `academic` (JSON). Schemas are Zod; add new fields to both the schema and the `local.ts` adapter.

- Project MDX is duplicated per locale: `src/content/projects/{es,en}/<slug>.mdx`, with entry ids `es/<slug>` / `en/<slug>`. Keep slugs in sync across both dirs or the detail page 404s.
- The home page is composed from `src/content/home/home.json` `sections[]`, a discriminated union (`hero` | `content` | `linkCards` | `featuredProjects`). Each type maps to a block component resolved by the `switch` in `src/components/blocks/SectionRenderer.astro`; adding a section type requires schema + a new case in the renderer + a block component.
- Images in content are referenced by URL path (`/images/...`) pointing at `public/images/`, not imported assets.

## Repository layer (`src/lib/content/`)

- `repository.ts` — `ContentRepository` interface; `local.ts` — file adapter built on `getCollection`; `sanity.ts` — **boundary stub**, returns empty data and warns; `index.ts` — factory choosing the adapter from `import.meta.env.CONTENT_SOURCE` (default `local`).
- `CONTENT_SOURCE` must be set at build time (PowerShell: `$env:CONTENT_SOURCE='sanity'; npm run build`). Wiring up real Sanity means implementing `sanity.ts`.
- **Known deviation**: `src/pages/[...locale]/projects/[slug].astro` calls `getCollection('projects')` directly instead of going through `getProjectBySlug` — it's the only page bypassing the repository.

## Styling

- Tailwind 4 via `@tailwindcss/vite`; there is **no `tailwind.config`** — design tokens live in `src/styles/global.css`: base palette (`--palette-primary`, `--palette-neutral`, `--palette-white`, `--palette-black`) plus derived tones (`--palette-surface`, `--palette-border`), mapped to Tailwind utilities inside `@theme` (`primary`, `neutral`, `white`, `black`, `surface`, `border`). Dark theme by default; a future light theme overrides the `--palette-*` vars in a `[data-theme="light"]` block. Custom animations: `.animate-fadeInRight`, `.animate-fadeInLeft`, `.animate-slideUp`, `.animate-slideUp-delayed`.

## Notes

- `docs/implementation.md` and `docs/cms-sanity-mapping.md` document the architecture and the future Sanity mapping — read before large refactors.
- `src/interfaces/` is a leftover empty dir (the file was moved to `src/types/domain.ts`); don't add files there.
- Git history is in Spanish; commit messages follow a short `feat:` / descriptive style.