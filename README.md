# Portafolio de Daniel Ochoa

Portafolio personal bilingüe (español / inglés) construido con **Astro 5**, **Tailwind CSS 4** y **MDX**. Diseñado con una arquitectura *content-first*: el contenido vive como datos con schema (Zod), las páginas se componen de bloques ordenables y todo pasa por una capa de repositorio con adaptadores intercambiables (archivos locales hoy, Sanity mañana).

## Características principales

- 🌐 **i18n nativo de Astro** con prefijo de idioma en todas las rutas: `/es/` y `/en/`.
- 📦 **Content Layer de Astro** con schemas Zod para site, home, projects, skills y academic.
- 🧱 **Home modular**: la página de inicio se compone desde `src/content/home/home.json` con bloques ordenables (hero, content, linkCards, featuredProjects).
- 🔌 **Repositorio desacoplado**: interfaz `ContentRepository` con adaptadores `local` y `sanity` (stub).
- 🎨 **Diseño visual mantenido**: paleta de colores y tokens en `src/styles/global.css`.
- ♿ **Language switcher** y etiquetas `hreflang` dinámicas.

## Tecnologías

- [Astro 5.2.5](https://astro.build/)
- [Tailwind CSS 4.0.5](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
- [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- TypeScript

## Estructura del proyecto

```text
/
├── docs/                       # Documentación del proyecto
│   ├── implementation.md       # Detalle de las 7 fases de implementación
│   └── cms-sanity-mapping.md   # Mapeo de contenido Astro → Sanity
├── public/                     # Assets estáticos (imágenes, iconos)
├── src/
│   ├── components/             # Componentes Astro puros
│   │   ├── blocks/             # Bloques de la home
│   │   ├── AcademicCard.astro
│   │   ├── ContentBlock.astro
│   │   ├── Header.astro
│   │   ├── LinkCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── SkillCategory.astro
│   │   ├── SkillItem.astro
│   │   └── SocialLink.astro
│   ├── content/                # Fuente de contenido local
│   │   ├── academic/           # JSON de educación, certificaciones y cursos
│   │   ├── home/               # home.json (singleton)
│   │   ├── projects/           # MDX por idioma (es/ y en/)
│   │   ├── site/               # site.json (singleton)
│   │   └── skills/             # JSON de categorías de habilidades
│   ├── i18n/                   # Diccionarios UI (es.json, en.json)
│   ├── layouts/                # Layouts de página
│   ├── lib/
│   │   ├── content/            # Repositorio y adaptadores
│   │   │   ├── index.ts        # Factory según CONTENT_SOURCE
│   │   │   ├── local.ts        # Adaptador local
│   │   │   ├── sanity.ts       # Stub de Sanity
│   │   │   └── repository.ts   # Interfaz ContentRepository
│   │   └── i18n/               # Utilidades de i18n
│   ├── pages/                  # Rutas
│   │   ├── [...locale]/        # Páginas localizadas
│   │   └── index.astro         # Redirección a /es
│   ├── styles/
│   ├── types/
│   │   └── domain.ts           # Tipos de dominio resueltos por idioma
│   └── content.config.ts       # Contrato de colecciones Zod
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Comandos

| Comando | Acción |
| :------ | :----- |
| `npm install` | Instala dependencias |
| `npm run dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el sitio a `./dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npx astro check` | Verifica tipos de Astro |

## Cambiar la fuente de contenido

Por defecto se usa el adaptador `local` (archivos en `src/content/`). Para activar el stub de Sanity:

```bash
# PowerShell
$env:CONTENT_SOURCE='sanity'; npm run build

# Unix
CONTENT_SOURCE=sanity npm run build
```

> El adaptador `sanity` es actualmente un *boundary stub* que mantiene el contrato `ContentRepository` intacto. Para conectar Sanity real se debe implementar `src/lib/content/sanity.ts`.

## Documentación adicional

- [Detalle de implementación por fases](./docs/implementation.md)
- [Mapeo de contenido Astro → Sanity](./docs/cms-sanity-mapping.md)
