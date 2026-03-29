---
description: Design system rules for the documentation site at site/
globs: site/**
---

# Site Design Rules

## Before ANY Change

1. Screenshot the page you're about to change AND the reference page (usually Principles at /principles)
2. After the change, screenshot both again and compare
3. If they don't match, fix it before committing

## Page Types

The site has exactly 4 page types. Every page MUST be one of these.

### 1. Overview (HomePage)
- Container: `px-6 py-10 lg:px-10 max-w-4xl`
- Hero: title `text-5xl lg:text-6xl`, narrative blurb `text-lg` with `lineHeight: 1.8` and `text-[var(--color-text-secondary)]`, stats bar in mono
- Section cards: `grid gap-4 sm:grid-cols-2`
- One page only: `/`

### 2. Section Index
- Container: `px-6 py-10 lg:px-10 max-w-5xl`
- Title: `text-4xl lg:text-5xl mb-3 tracking-tight` with `fontFamily: 'var(--font-display)'`
- Count: `font-mono text-sm text-[var(--color-text-dim)]` — e.g. "18 documents", "20 items", "1 contributor"
- Content: `flex flex-col gap-10`
- Subsection heading: `text-xl mb-4` with `fontFamily: 'var(--font-display)'`
- Card grid: `grid gap-3 sm:grid-cols-2 lg:grid-cols-3`
- Card: `group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200`
- Card title: `text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate`
- Card summary: `text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2`
- **Every section with sub-items uses this pattern: Principles, Guidelines, Recipes, Compliance, Workflow, Reference, Usage, Contributors**

### 3. Doc Page
- Container: `flex-1 min-w-0 px-6 py-8 lg:px-10 max-w-3xl`
- Breadcrumbs above content
- Right-justified metadata in `font-mono text-[11px]`
- Prose via `article` with typography plugin
- Table of contents on XL screens

### 4. Static Page
- Container: `px-6 py-10 lg:px-10 max-w-5xl`
- Title: same as Section Index
- Free-form prose content (no card grid)
- Used for: Getting Started

## Sidebar

Two item types only:

### Plain link (no children)
```
OVERVIEW
GETTING STARTED
```
Uses `<h3>` with `font-mono text-xs font-medium uppercase tracking-widest`.

### Toggleable section (has children)
```
> USAGE → Skills, Rules
> PRINCIPLES → individual principles
> CONTRIBUTORS → Mike Fullerton
```
Uses chevron `<button>` + `<Link>` label. Children in `<ul>` with `border-l border-[var(--color-border)]`.

**Rule: if a section has ANY sub-items, it MUST be toggleable. No exceptions.**

## Header

- Sticky `top-0`
- Tabs in same order as sidebar (minus Overview which is the logo link)
- GitHub icon before search trigger
- Platform filter and theme toggle at end

## Theme

- Dark-first. All tokens as CSS custom properties in `index.css`
- Light mode overrides ALL tokens via `:root:not(.dark)`
- Fonts: Instrument Serif (display), Manrope (body), DM Mono (code)
- Gold accent: `--color-accent`
- **Never use Tailwind color classes (slate-*, gray-*). Always use var(--color-*) tokens.**

## Do NOT

- Create custom card components — reuse the exact card pattern above
- Add a page without assigning it to one of the 4 page types
- Make a section with sub-items a plain link in the sidebar
- Skip screenshot verification
- Guess at external URLs or image sources — if you can't access it, say so immediately
