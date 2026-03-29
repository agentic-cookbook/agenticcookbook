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

- Outer: `px-6 py-10 lg:px-10 max-w-4xl`
- Title h1: `text-5xl lg:text-6xl mb-8 tracking-tight` with `style={{ fontFamily: 'var(--font-display)' }}`
- Narrative div: `max-w-2xl mb-8 text-lg text-[var(--color-text-secondary)]` with `style={{ lineHeight: 1.8 }}`
- Narrative paragraphs: `mb-7`
- Narrative closer: `text-[var(--color-text-primary)] font-medium`
- Stats bar: `flex items-center gap-6 font-mono text-sm text-[var(--color-text-dim)]`
- Stats divider: `text-[var(--color-border)]` with text `|`
- Divider: `border-t border-[var(--color-border-subtle)] mb-10`
- Section card grid: `grid gap-4 sm:grid-cols-2`
- Section card link: `group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200`
- Card flex: `flex items-start gap-4`
- Card icon: `shrink-0 mt-0.5 text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors`
- Card content: `min-w-0`
- Card header: `flex items-baseline justify-between mb-1.5`
- Card title h2: `text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors` with `style={{ fontFamily: 'var(--font-display)' }}`
- Card count: `font-mono text-xs text-[var(--color-text-dim)] ml-3 shrink-0`
- Card description: `text-sm text-[var(--color-text-secondary)] leading-relaxed`
- One page only: `/`

### 2. Section Index

- Outer: `px-6 py-10 lg:px-10 max-w-5xl`
- Title h1: `text-4xl lg:text-5xl mb-3 tracking-tight` with `style={{ fontFamily: 'var(--font-display)' }}`
- Count p: `font-mono text-sm text-[var(--color-text-dim)]` — e.g. "18 documents", "20 items", "1 contributor"
- Title wrapper: `mb-10`
- Content wrapper: `flex flex-col gap-10`
- Subsection heading h2: `text-xl mb-4` with `style={{ fontFamily: 'var(--font-display)' }}`
- Card grid: `grid gap-3 sm:grid-cols-2 lg:grid-cols-3`
- Card (Link or div): `group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200`
- Card title row: `flex items-center gap-2 mb-1.5`
- Card title h3: `text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate`
- Card summary p: `text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2`
- Card platform badges div: `flex flex-wrap gap-1 mt-2.5`
- Card badge span: `font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]`
- **Every section with sub-items uses this pattern: Principles, Guidelines, Recipes, Compliance, Workflow, Reference, Usage, Contributors**

### 3. Doc Page

- Flex wrapper: `flex`
- Main content: `flex-1 min-w-0 px-6 py-8 lg:px-10 max-w-3xl`
- Breadcrumbs: `<Breadcrumbs slug={entry.slug} />`
- Breadcrumbs nav: `aria-label="Breadcrumb"` with `mb-4`
- Breadcrumbs ol: `flex items-center gap-1 font-mono text-xs text-[var(--color-text-dim)]`
- Breadcrumb separator: `text-[var(--color-border)]` with text `/`
- Breadcrumb active (last): `text-[var(--color-text-secondary)]`
- Breadcrumb link: `hover:text-[var(--color-text-secondary)]`
- Prose article: `prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none`
- Entry metadata dl: `flex flex-col items-end gap-0.5 font-mono text-[11px] mb-6`
- Metadata row: `flex gap-2`
- Metadata dt: `text-[var(--color-text-dim)]`
- Metadata dd: `text-[var(--color-text-secondary)]`
- Metadata ref links: `hover:text-[var(--color-text-primary)] underline`
- Raw toggle container: `mt-8 border-t border-[var(--color-border-subtle)] pt-4`
- Raw toggle button: `flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)]`
- Raw code block: `mt-3 p-4 rounded-md bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] overflow-x-auto font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap`
- Table of contents aside: `hidden xl:block w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pr-4`
- TOC header: `font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-dim)] mb-3`
- TOC list: `flex flex-col gap-1 border-l border-[var(--color-border-subtle)]`
- TOC active link: `block border-l py-0.5 text-sm border-[var(--color-accent)] text-[var(--color-text-primary)] font-medium` with `pl-3` (h2) or `pl-6` (h3)
- TOC inactive link: `block border-l py-0.5 text-sm border-transparent text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)]`

### 4. Static Page

- Outer: `px-6 py-10 lg:px-10 max-w-5xl`
- Title h1: same as Section Index
- Free-form prose content (no card grid)
- Used for: Getting Started

## Sidebar

### Desktop aside
- `hidden lg:block w-64 shrink-0 border-r border-[var(--color-border-subtle)] overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]`

### Nav wrapper
- `flex flex-col gap-6 px-6 py-6 overflow-y-auto h-full` with `data-autoscroll="true"`

### Plain link (no children) — Overview, Getting Started
- Wrapper: `flex flex-col gap-3`
- h3: `font-mono text-xs font-medium uppercase tracking-widest transition-colors` + selected `text-[var(--color-text-secondary)]` / unselected `text-[var(--color-text-dim)]`
- Link inside h3: `hover:text-[var(--color-text-secondary)]`

### Toggleable section (has children) — Usage, Principles, Contributors, etc.
- Wrapper: `flex flex-col gap-1`
- Header row: `flex items-center gap-1`
- Chevron button: `p-0.5 text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] transition-colors`
- Chevron SVG: `h-3 w-3 shrink-0 transition-transform duration-150` + expanded `rotate-90`
- Label link: `font-mono text-xs font-medium uppercase tracking-widest transition-colors` + active `text-[var(--color-text-secondary)]` / inactive `text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)]`
- Children ul: `flex flex-col border-l border-[var(--color-border)] mt-1`
- Child li link (selected): `relative block py-0.5 text-sm font-semibold text-[var(--color-text-primary)]` with `style={{ paddingInlineStart: '0.875rem' }}`
- Child li link (unselected): `relative block py-0.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]` with `style={{ paddingInlineStart: '0.875rem' }}`
- Selected indicator: `absolute left-0 top-0.5 bottom-0.5 w-px bg-[var(--color-accent)]`

**Rule: if a section has ANY sub-items, it MUST be toggleable. No exceptions.**

### Divider
- `border-t border-[var(--color-border-subtle)]`

### Mobile overlay
- Container: `fixed inset-0 z-50 lg:hidden`
- Backdrop: `fixed inset-0 bg-black/50`
- Aside: `fixed inset-y-0 left-0 w-72 bg-[var(--color-surface)] shadow-xl overflow-y-auto`
- Header: `flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]`
- Close button: `p-1 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]`

## Header

- Outer: `sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 backdrop-blur`
- Inner: `flex h-14 items-center gap-4 px-4 lg:px-8`
- Mobile menu button: `lg:hidden -ml-2 p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]`
- Logo link: `shrink-0` with `style={{ fontFamily: 'var(--font-display)' }}`
- Logo text: `text-xl text-[var(--color-text-primary)]`
- Tab nav: `hidden lg:flex items-center gap-1 ml-6`
- Tab (active): `px-3 py-1 rounded-md font-mono text-xs font-medium transition-colors bg-[var(--color-accent-dim)] text-[var(--color-accent)]`
- Tab (inactive): `px-3 py-1 rounded-md font-mono text-xs font-medium transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]`
- Spacer: `flex-1`
- GitHub link: `p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-colors` with SVG `h-5 w-5`
- Search button: `flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-dim)] hover:border-[var(--color-text-dim)] transition-colors`
- Search icon: `h-4 w-4`
- Search text: `hidden sm:inline font-mono text-xs`
- Search kbd: `hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-dim)]`
- Theme toggle: `p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]` with SVG `h-5 w-5`

## Search Dialog

- Overlay: `fixed inset-0 z-50`
- Backdrop: `fixed inset-0 bg-black/60`
- Dialog container: `fixed inset-x-4 top-20 mx-auto max-w-xl`
- Dialog box: `rounded-xl bg-[var(--color-surface-raised)] shadow-2xl border border-[var(--color-border)] overflow-hidden`
- Input row: `flex items-center gap-3 px-4 border-b border-[var(--color-border-subtle)]`
- Input: `flex-1 py-3 text-sm bg-transparent outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-dim)]`
- Results: `max-h-80 overflow-y-auto py-2`
- Section header: `px-4 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-dim)]`
- Result (selected): `w-full text-left px-4 py-2 flex items-center gap-2 bg-[var(--color-accent-dim)]`
- Result (unselected): `w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[var(--color-surface-hover)]`
- Result title: `text-sm font-medium text-[var(--color-text-primary)] truncate`
- Result summary: `text-xs text-[var(--color-text-dim)] truncate`

## Theme Tokens

### Dark (default, in `@theme`)
```
--color-surface: #0c0c0f
--color-surface-raised: #14141a
--color-surface-hover: #1c1c24
--color-border: #2a2a35
--color-border-subtle: #1e1e28
--color-text-primary: #e8e6e3
--color-text-secondary: #8a8a9a
--color-text-dim: #5a5a6a
--color-accent: #c4a35a
--color-accent-dim: rgba(196, 163, 90, 0.15)
--color-success: #5cb270
--color-error: #d45454
--color-info: #5a8fd4
```

### Light (`:root:not(.dark)`)
```
--color-surface: #ffffff
--color-surface-raised: #f5f5f7
--color-surface-hover: #ebebef
--color-border: #d4d4dc
--color-border-subtle: #e4e4ea
--color-text-primary: #1a1a2e
--color-text-secondary: #55556a
--color-text-dim: #8a8a9c
--color-accent: #8a6d20
--color-accent-dim: rgba(138, 109, 32, 0.08)
```

### Fonts
```
--font-display: 'Instrument Serif', Georgia, serif
--font-mono: 'DM Mono', ui-monospace, SFMono-Regular, monospace
--font-sans: 'Manrope', system-ui, sans-serif
```

### Base body
```
background-color: var(--color-surface)
color: var(--color-text-primary)
font-family: var(--font-sans)
font-size: 15px
line-height: 1.7
```

## Prose Overrides

Applied via `.prose` class with Tailwind Typography plugin:
- Body/headings/bold/code: `var(--color-text-primary)`
- Links: `var(--color-text-secondary)`, no underline, `border-bottom: 1px solid var(--color-border)`, hover `border-color: var(--color-text-secondary)`
- Pre background: `var(--color-surface-raised)` with `border: 1px solid var(--color-border-subtle); border-radius: 8px`
- Inline code: `font-family: var(--font-mono); font-size: 0.85em; background: var(--color-surface-raised); padding: 0.15em 0.35em; border-radius: 4px; border: 1px solid var(--color-border-subtle)`
- h1/h2: `font-family: var(--font-display); font-weight: 400; letter-spacing: -0.01em`
- h1: `font-size: 1.5rem; line-height: 1.2; margin-bottom: 0.5em`
- h2: `font-size: 1.75rem; line-height: 1.2`
- h3/h4: `font-weight: 600`
- Table: `font-size: 0.875rem`
- th: `font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary)`

## Do NOT

- Create custom card components — reuse the exact card pattern from Section Index
- Add a page without assigning it to one of the 4 page types
- Make a section with sub-items a plain link in the sidebar
- Skip screenshot verification
- Guess at external URLs or image sources — if you can't access it, say so immediately
- Use Tailwind color classes (slate-*, gray-*) — always use `var(--color-*)` tokens
