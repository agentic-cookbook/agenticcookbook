---
description: Design system rules for the documentation site at site/
globs: site/**
---

# Site Design Rules

## Theme

- Dark-first design. All theme tokens defined as CSS custom properties in `site/src/index.css` under `@theme`.
- Light mode overrides ALL tokens via `:root:not(.dark)` — never leave tokens unoverridden.
- Three font families: Instrument Serif (display/headings), Manrope (body/UI), DM Mono (code/mono).
- Gold accent: `--color-accent` (#c4a35a dark, #8a6d20 light).

## Layout

- Header: sticky `top-0`, section tabs, GitHub icon link, search trigger, platform filter, theme toggle.
- Sidebar: fixed `w-64`, toggleable top-level sections with separate chevron (toggle) and label (navigate). Divider between Usage and content sections.
- Main content: `max-w-3xl` for doc pages, `max-w-5xl` for section indexes, `max-w-4xl` for homepage.

## Section Index Pages

Every section and subsection uses the same card grid layout from `SectionIndex.tsx`:
- Title in Instrument Serif (`text-4xl lg:text-5xl`)
- Document count in mono below
- Cards grouped by subsection heading (Instrument Serif `text-xl`)
- Card grid: `grid gap-3 sm:grid-cols-2 lg:grid-cols-3`
- Card style: `rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4` with hover accent border and bg transition.
- Card content: title (sm, font-medium), summary (xs, secondary, line-clamp-2), optional platform badges.

**The Usage page MUST match this exact layout.** No custom card components — same visual treatment as Principles, Guidelines, etc.

## Homepage

- Hero: large Instrument Serif title, narrative blurb at 1.05rem / line-height 1.8 in `--color-text-secondary` with 30px paragraph spacing.
- Stats bar: mono text with pipe separators.
- Section cards: 2-column grid with icons.
- Contributors section at bottom.

## Doc Pages

- Breadcrumbs above content.
- Prose with typography plugin overrides for dark theme.
- Right-justified metadata (version, platforms, tags, author, modified) in 11px mono.
- "View source" toggle for raw markdown.
- Table of contents on XL screens.

## Navigation

- Scroll to top on route change (ScrollToTop component in App.tsx).
- Sidebar auto-expands the section containing the current page.
- Subsection directory routes render the card grid, not 404.

## Do NOT

- Create custom card components for new sections — reuse `EntryCard` / `ItemCard` patterns.
- Add features without both dark and light mode support.
- Use hardcoded colors — always use CSS custom property tokens.
- Use Tailwind `slate-*` or `gray-*` classes — use `var(--color-*)` tokens exclusively.
