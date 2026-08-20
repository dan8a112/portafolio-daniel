# Mapeo de contenido Astro → Sanity

Este documento describe cómo cada colección de Astro Content Layer se traduce a documentos en Sanity cuando se active el adaptador `sanityRepository`. El objetivo es mantener el contrato `ContentRepository` intacto y aprovechar field-level i18n + Portable Text de Sanity.

## Principios generales

- **Un documento por singleton/colección lógica**, no por idioma. Los campos traducibles usan el objeto `localizedText` (`{es, en}`) de Sanity, tipado como `localeString` o `localeText`.
- **Cuerpos largos** (proyectos) se modelan como `localeContent` (array de bloques Portable Text) dentro del mismo documento.
- **Orden y visibilidad** se mantienen con campos numéricos/booleanos iguales a los de Astro.
- **Imágenes** se migran a `sanity-image` (asset + hotspot/crop opcional) o se dejan como URL externa mientras se completa la migración.

## Site (`site`)

Astro: `src/content/site/site.json` (singleton).

| Astro field | Sanity schema | Notas |
|-------------|---------------|-------|
| `brand` | `string` | Nombre del sitio. |
| `nav` | `array` of `{label: localeString, href: string}` | `label` resuelto por idioma en `getSite(locale)`. |
| `socials` | `array` of `{icon: string, url: string, altText: localeString}` | `icon` puede ser referencia a asset de Sanity o URL. |

## Home (`home`)

Astro: `src/content/home/home.json` (singleton).

| Astro field | Sanity schema | Notas |
|-------------|---------------|-------|
| `sections` | `array` of section objects | Unión discriminada por `type`. |

### Tipos de sección

- `hero`: `greeting`, `label`, `name`, `role`, `paragraph`, `image`, `imageAlt` (todos localizados excepto `name` e `image`).
- `content`: `blocks[]` con `title`, `paragraph`, `image`, `imageAlt` localizados y `imageRight` boolean.
- `linkCards`: `title` localizado y `links[]` con `label` localizado y `href`.
- `featuredProjects`: `title` localizado y `projectSlugs[]` (referencias a proyectos opcionalmente).

## Projects (`projects`)

Astro: `src/content/projects/{es,en}/*.mdx` (colección por idioma con frontmatter + cuerpo MDX).

En Sanity se unifica en un solo documento por proyecto:

| Astro field | Sanity schema | Notas |
|-------------|---------------|-------|
| `slug` | `string` (`_id` o campo `slug`) | Identificador único, sin prefijo de idioma. |
| `title` | `localeString` | `{es, en}`. |
| `description` | `localeText` | `{es, en}`. |
| `body` | `localeContent` | Array de Portable Text por idioma. |
| `image` | `image` o `string` | Hero/card image. |
| `skills` | `array` of `string` | Etiquetas técnicas. |
| `featured` | `boolean` | Para sección destacada. |
| `order` | `number` | Orden de presentación. |
| `publishedAt` | `datetime` | Opcional. |

### Cuerpo en dos idiomas

Actualmente Astro guarda el cuerpo MDX en archivos separados (`es/usales.mdx`, `en/usales.mdx`). En Sanity, ambos cuerpos conviven en el mismo documento bajo `body.es` y `body.en`.

## Skill categories (`skillCategory`)

Astro: `src/content/skills/*.json`.

| Astro field | Sanity schema | Notas |
|-------------|---------------|-------|
| `id` | `string` | Identificador. |
| `title` | `localeString` | `{es, en}`. |
| `icon` | `string` | SVG path o referencia a asset. |
| `items` | `array` of `{text: localeString, percentage: number, endText: string, icon?: string}` | `endText` se mantiene como string plano. |

## Academic (`academic`)

Astro: `src/content/academic/*.json`.

| Astro field | Sanity schema | Notas |
|-------------|---------------|-------|
| `kind` | `string` enum `education | certification | course` | Para filtrar/seccionar. |
| `image` | `image` o `string` | Logo/institución. |
| `title` | `localeString` | `{es, en}`. |
| `subtitle` | `localeString` | `{es, en}`. |
| `period` | `localeString` | `{es, en}` (ej. "2020 - 2024" / "2020 - 2024"). |
| `href` | `url` | Opcional. |
| `order` | `number` | Orden dentro de cada `kind`. |

## Adaptador de repositorio

- `src/lib/content/local.ts`: usa `getCollection` de Astro y archivos locales.
- `src/lib/content/sanity.ts`: stub que implementa `ContentRepository`. Cuando esté listo, reemplazará los stubs por llamadas a `@sanity/astro` o `@sanity/client`.
- Selector en `src/lib/content/index.ts`: lee `CONTENT_SOURCE` (`local` por defecto, `sanity` para activar el stub/futuro adaptador).

## Pasos futuros para activar Sanity

1. Crear proyecto y dataset en Sanity.
2. Definir schemas de Sanity acordes a la tabla anterior.
3. Implementar `sanityRepository` usando `@sanity/client` o `@sanity/astro` loader.
4. Migrar contenido de archivos locales a Sanity (script de seed).
5. Ejecutar `CONTENT_SOURCE=sanity npm run build`.
