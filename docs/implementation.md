# Implementación del portafolio — Documentación por fases

Este documento describe en detalle todas las fases de migración y refactorización del portafolio de Daniel Ochoa. Cada fase fue diseñada para ser compilable y verificable de forma independiente.

## TL;DR

Se migró un portafolio Astro 5 + Tailwind 4 + MDX a una arquitectura *content-first* donde:

- El contenido es datos con schema Zod desacoplado del diseño.
- Las páginas, incluida la home, se componen de **bloques ordenables**.
- Todo pasa por una capa de **repositorio** con adaptadores intercambiables (`local` hoy, `Sanity` mañana).
- Hay **i18n nativo** con prefijos `/es/` y `/en/` y `es` como idioma por defecto.
- Se mantuvo el diseño visual existente.

---

## Decisiones confirmadas

- **CMS futuro**: Sanity (con `@sanity/astro`, Portable Text y field-level i18n).
- **URLs**: prefijo en todas las rutas (`/es/`, `/en/`), `es` es el idioma por defecto y `prefixDefaultLocale: true`.
- **Diseño visual**: se mantiene (Tailwind 4 + tokens en `src/styles/global.css`).
- **Modelo de páginas**: bloques ordenables (**Opción B**) mediante una unión discriminada de secciones + registro de componentes.
- **Tipo de dominio = resuelto por idioma**: la UI nunca recibe objetos `{es, en}`; el repositorio entrega `title: string` en el idioma activo.
- **Contenido largo autorizado por idioma**: los proyectos viven en `src/content/projects/es/` y `src/content/projects/en/`. En Sanity equivaldrá a rich text localizado dentro de un solo documento.

---

## Principio rector

> La UI (páginas + bloques + componentes puros) consume props resueltas por idioma desde `ContentRepository`. El repositorio es una interfaz con dos adaptadores: `local` (`getCollection` + glob loader) y `sanity` (stub). Los componentes nunca importan `getCollection` ni `db.ts` directamente.

---

## Estructura objetivo alcanzada

```text
src/content.config.ts              # Contrato: colecciones + schemas Zod
src/content/site/site.json         # Nav, socials y marca
src/content/home/home.json         # Singleton con sections[]
src/content/projects/es/*.mdx      # Proyectos en español
src/content/projects/en/*.mdx      # Proyectos en inglés
src/content/skills/*.json          # Categorías de habilidades
src/content/academic/*.json        # Educación, certificaciones y cursos
src/lib/content/repository.ts      # Interfaz ContentRepository
src/lib/content/local.ts           # Adaptador local
src/lib/content/sanity.ts          # Stub futuro
src/lib/content/index.ts           # Factory según CONTENT_SOURCE
src/lib/i18n/ui.ts                 # t() + idioma activo
src/lib/i18n/utils.ts              # Rutas localizadas, language switcher
src/i18n/es.json                   # Diccionario UI español
src/i18n/en.json                   # Diccionario UI inglés
src/types/domain.ts                # Tipos resueltos por idioma
src/components/blocks/*.astro      # Bloques de la home
src/pages/[...locale]/*.astro      # Páginas localizadas
```

---

## Modelo de contenido (schemas)

Helper reutilizable:

```ts
const localizedText = z.object({ es: z.string(), en: z.string() })
```

### Colecciones

- **site** (singleton): `brand`, `nav: [{label: localizedText, href}]`, `socials: [{icon, url, altText: localizedText}]`.
- **home** (singleton): `sections: Section[]`.
- **projects** (colección por idioma): `title`, `description`, `image`, `skills[]`, `featured`, `order`, `publishedAt` + cuerpo MDX.
- **skillCategory** (colección): `id`, `title: localizedText`, `icon`, `items: [{text: localizedText, percentage, endText, icon?}]`.
- **academic** (colección): `kind: education|certification|course`, `image`, `title: localizedText`, `subtitle: localizedText`, `period: localizedText`, `href?`, `order`.

### Secciones de home (unión discriminada)

```ts
type Section =
  | { type: 'hero'; greeting; label; name; role; paragraph; image; imageAlt }
  | { type: 'content'; blocks: ContentBlock[] }
  | { type: 'linkCards'; title; links: { label; href }[] }
  | { type: 'featuredProjects'; title; projectSlugs: string[] }
```

---

## Interfaz ContentRepository

```ts
export interface ContentRepository {
  getSite(locale: Locale): Promise<Site>
  getHome(locale: Locale): Promise<HomePage>
  getProjects(locale: Locale): Promise<Project[]>
  getProjectBySlug(slug: string, locale: Locale): Promise<Project | null>
  getSkillCategories(locale: Locale): Promise<SkillCategory[]>
  getAcademic(locale: Locale): Promise<AcademicEntry[]>
}
```

---

## Fases de implementación

### Fase 0 — Fundamentos

**Objetivo**: establecer la base de la arquitectura sin romper el sitio existente.

**Cambios**:
- Crear `src/content.config.ts` con schemas Zod iniciales para todas las colecciones.
- Crear `src/types/domain.ts` con tipos resueltos por idioma.
- Crear `src/lib/content/repository.ts`, `src/lib/content/local.ts` y `src/lib/content/index.ts`.
- Crear `src/lib/i18n/ui.ts` y `src/lib/i18n/utils.ts`.
- Crear `src/i18n/es.json` y `src/i18n/en.json`.
- Modificar `astro.config.mjs` para añadir i18n nativo (`defaultLocale: 'es'`, `locales: ['es','en']`, `prefixDefaultLocale: true`).
- Mover páginas de `src/pages/*.astro` a `src/pages/[...locale]/*.astro` con `getStaticPaths` devolviendo `es` y `en`.
- Crear `src/pages/index.astro` como redirección a `/es`.

**Verificación**: `astro check` 0 errores / 0 warnings; `astro build` genera 22 páginas incluyendo `/es/`, `/en/` y detalles de proyectos.

---

### Fase 1 — Configuración del sitio

**Objetivo**: que el header y los enlaces sociales vengan de `site.json` en lugar de `db.ts`.

**Cambios**:
- Crear `src/content/site/site.json` migrando `headerItems`, `socials` y `brand` de `db.ts`.
- Actualizar `Header.astro` y `SocialLink.astro` para leer del repositorio (`getSite`).
- Actualizar `src/pages/[...locale]/index.astro` para usar `site.nav` y `site.socials`.
- Eliminar `headerItems` y `socials` de `src/content/data/db.ts`.

**Verificación**: `astro check` 0 errores; `astro build` genera 22 páginas; menú y socials salen de `site.json`.

---

### Fase 2 — Habilidades (Skills)

**Objetivo**: migrar las habilidades desde `db.ts` a archivos JSON en `src/content/skills/`.

**Cambios**:
- Crear 7 archivos JSON en `src/content/skills/` migrando `skills` y `languages` de `db.ts`.
- Ajustar el schema de `skillCategory` para textos localizados en `items`.
- Actualizar `SkillCategory.astro`, `SkillItem.astro` y `skills.astro`.
- Eliminar `skills` y `languages` de `db.ts`.

**Verificación**: `astro check` 0 errores; `astro build` genera 22 páginas; `/es/skills` y `/en/skills` renderizan desde JSON.

---

### Fase 3 — Educación (Education)

**Objetivo**: unificar educación, certificaciones y cursos en una sola colección `academic`.

**Cambios**:
- Crear 9 archivos JSON en `src/content/academic/` unificando `education`, `professionalCertifications` y `coursesAccreditations` con el campo `kind`.
- Ajustar el schema de `academic` para `period` localizado.
- Actualizar `AcademicCard.astro` y `education.astro`.
- Añadir claves de i18n para los títulos de sección (`education.education`, `education.certifications`, `education.courses`).
- Eliminar `education`, `professionalCertifications` y `coursesAccreditations` de `db.ts`.

**Verificación**: `astro check` 0 errores; `astro build` genera 22 páginas; `/es/education` y `/en/education` renderizan desde JSON.

---

### Fase 4 — Proyectos

**Objetivo**: eliminar la duplicación de proyectos entre `db.ts` y MDX; hacer que MDX sea la única fuente.

**Cambios**:
- Reescribir el frontmatter de `src/content/projects/es/*.mdx` añadiendo `image`, `skills`, `featured`, `order`.
- Crear `src/content/projects/en/*.mdx` con frontmatter y cuerpo traducido.
- Actualizar el schema de `projects` en `src/content.config.ts` con los nuevos campos.
- Actualizar `src/types/domain.ts` para reflejar `Project` completo.
- Actualizar `src/lib/content/local.ts` (`loadProjects`) para filtrar por prefijo de idioma y extraer el slug correcto.
- Actualizar `src/pages/[...locale]/projects.astro` para usar `getProjects(locale)`.
- Actualizar `src/pages/[...locale]/projects/[slug].astro` para generar rutas desde ids con prefijo (`es/usales`, `en/usales`).
- Actualizar `src/components/ProjectCard.astro` para tipar con `Project`.
- Eliminar el array `projects` de `src/content/data/db.ts`.

**Verificación**: lista y detalle leen la misma fuente; no queda `projects` en `db.ts`; `astro build` genera rutas localizadas de detalle.

---

### Fase 5 — Home como bloques

**Objetivo**: convertir la home en una página construida desde bloques ordenables en `home.json`.

**Cambios**:
- Actualizar el schema de `home` en `src/content.config.ts` con la unión discriminada de secciones localizadas.
- Actualizar `src/types/domain.ts` con campos completos para `hero`.
- Actualizar `src/lib/content/local.ts` (`loadHome`) para resolver textos localizados por idioma.
- Crear `src/content/home/home.json` con secciones: `hero`, `content` (2 bloques), `featuredProjects` y `linkCards`.
- Crear componentes de bloques:
  - `src/components/blocks/HeroBlock.astro`
  - `src/components/blocks/ContentSectionBlock.astro`
  - `src/components/blocks/LinkCardsBlock.astro`
  - `src/components/blocks/FeaturedProjectsBlock.astro`
- Crear `src/components/blocks/SectionRenderer.astro`, que resuelve cada `section.type` mediante un `switch` explícito.
- Actualizar `src/components/ContentBlock.astro` para usar el tipo `ContentBlock` del dominio.
- Actualizar `src/pages/[...locale]/index.astro` para usar `getHome(locale)` y renderizar secciones dinámicamente.
- Eliminar `src/content/data/db.ts` y `src/interfaces/interface.ts`.

**Verificación**: `astro check` 0 errores; `astro build` 22 páginas; reordenar secciones en `home.json` cambia la página sin tocar código.

---

### Fase 6 — i18n completo + language switcher

**Objetivo**: eliminar todos los textos hardcodeados y permitir alternar de idioma conservando la ruta.

**Cambios**:
- Completar `src/i18n/es.json` y `src/i18n/en.json` con claves de UI:
  - `projects.title`, `project.toc`, `project.imageAlt`, `project.seeMore`
  - `education.imageAlt`, `skills.iconAlt`, `header.logoAlt`, `lang.switch`
- Reemplazar strings hardcodeados por `t()` en:
  - `src/pages/[...locale]/projects.astro`
  - `src/pages/[...locale]/projects/[slug].astro`
  - `src/components/ProjectCard.astro`
  - `src/components/AcademicCard.astro`
  - `src/components/SkillItem.astro`
  - `src/components/Header.astro`
- Añadir language switcher en `src/components/Header.astro` con `Español / English`.
- Añadir etiquetas `lang` e `hreflang` dinámicas en `src/layouts/Layout.astro`.
- Verificar que los cuerpos MDX en inglés estén traducidos.

**Verificación**: `astro check` 0 errores; `astro build` 22 páginas; `/es/` y `/en/` muestran todo traducido; el switcher alterna conservando la ruta actual.

---

### Fase 7 — Boundary CMS-ready (Sanity)

**Objetivo**: preparar el terreno para migrar el contenido a Sanity sin romper el sitio actual.

**Cambios**:
- Crear `src/lib/content/sanity.ts` con un stub que implementa `ContentRepository`. Devuelve valores seguros (vacíos) y registra advertencias, manteniendo el contrato intacto.
- Actualizar `src/lib/content/index.ts` para seleccionar el adaptador según `import.meta.env.CONTENT_SOURCE` (`local` por defecto).
- Crear `docs/cms-sanity-mapping.md` documentando el mapeo de cada colección Astro a documentos Sanity (field-level i18n + Portable Text).

**Verificación**:
- `astro check` 0 errores.
- `npx astro build` con fuente local: 22 páginas con contenido.
- `$env:CONTENT_SOURCE='sanity'; npx astro build`: build exitoso con el stub, sin romper el contrato.

---

## Verificación global

- `npx astro check` sin errores en cada fase.
- `npx astro build` + `npx astro preview` para validar `/es/` y `/en/`.
- Ningún componente importa `db.ts` ni `getCollection` directamente (solo `lib/content`).
- `/es/projects/[slug]` y `/en/projects/[slug]` renderizan el cuerpo en el idioma correcto.

---

## Archivos eliminados (legado)

- `src/content/data/db.ts`
- `src/interfaces/interface.ts`

---

## Próximos pasos recomendados

1. **Conectar Sanity real**: implementar `src/lib/content/sanity.ts` usando `@sanity/client` o `@sanity/astro` loader, reemplazando los stubs.
2. **Configurar `site` en `astro.config.mjs`**: para generar URLs canónicas absolutas en las etiquetas `hreflang`.
3. **Optimizar imágenes**: revisar tamaños, formatos y lazy loading donde aún use `img` en lugar de `Image`.
4. **Añadir metadatos SEO**: descripción, Open Graph, Twitter Cards, etc.
5. **Mejorar accesibilidad**: contrastes, roles y navegación por teclado.
