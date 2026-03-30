---
id: e01e2c5f-32fd-49e3-8f2a-1f64411160cb
title: "Appearance Mode Toggle"
domain: agentic-cookbook://recipes/web/controls/appearance-mode-toggle
type: recipe
version: 1.0.0
status: accepted
language: en
created: 2026-03-30
modified: 2026-03-30
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Three-mode toggle button cycling automatic, forced dark, and forced light appearance. Automatic follows the system and is the default."
platforms:
  - web
  - typescript
tags:
  - appearance-mode-toggle
  - controls
  - dark-mode
  - web
depends-on: []
related: []
references:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  - https://web.dev/articles/color-scheme
---

# Appearance Mode Toggle

## Overview

A three-mode toggle button that cycles between automatic, forced dark, and forced light appearance modes. Automatic mode (the default) follows the operating system's appearance setting in real time. The two forced modes override the system preference.

This recipe is intentionally agnostic about how site settings are stored. The consuming site provides its own persistence mechanism ("site settings") — localStorage, cookies, a database, or any other store. The recipe specifies what to read, write, and clear, but not where.

## Terminology

| Term | Definition |
|------|-----------|
| Appearance mode | One of three values: `auto`, `dark`, `light` |
| System appearance | The OS-level dark/light preference reported by `prefers-color-scheme` |
| Resolved appearance | The actual dark or light appearance applied to the page — either from the system (auto) or from the forced mode |
| Site settings | The consuming site's persistence mechanism for user preferences (not specified by this recipe) |
| Forced mode | Either `dark` or `light` — an explicit override of the system appearance |

## Assumptions

- **site-settings-exist**: The site has a mechanism for storing user settings. This recipe does not specify what that mechanism is — only what values to store and when to clear them.
- **css-class-driven**: The site applies appearance via a CSS class (e.g., `dark` on `<html>`) or equivalent mechanism. This recipe does not specify the CSS architecture.

## Behavioral Requirements

### Mode cycling

- **three-mode-cycle**: The button MUST cycle through exactly three modes in this order: `auto` -> `dark` -> `light` -> `auto`.
- **default-is-auto**: When no forced mode is found in site settings, the control MUST default to `auto`.
- **single-click-advance**: Each click MUST advance to the next mode in the cycle. No long-press, no submenu.

### Automatic mode

- **auto-follows-system**: In `auto` mode, the resolved appearance MUST match the system's `prefers-color-scheme` value.
- **auto-listens-for-changes**: In `auto` mode, the control MUST listen for system appearance changes (via `matchMedia('(prefers-color-scheme: dark)')` change event) and update the resolved appearance in real time without requiring a page reload.
- **auto-clears-setting**: When the user switches to `auto` mode, the appearance mode value MUST be cleared from site settings — not set to `"auto"`. Absence of the value means automatic.
- **auto-recheck-on-return**: When switching from a forced mode back to `auto`, the control MUST re-query the current system appearance. It MUST NOT assume the system appearance detected at page load is still current.

### Forced modes

- **dark-forces-dark**: In `dark` mode, the resolved appearance MUST be dark regardless of the system setting.
- **light-forces-light**: In `light` mode, the resolved appearance MUST be light regardless of the system setting.
- **forced-persists**: When in `dark` or `light` mode, the value MUST be saved to site settings so it survives page reloads and new sessions.
- **forced-ignores-system**: In forced mode, system appearance changes MUST NOT affect the resolved appearance.

### Persistence

- **read-on-init**: On initialization, the control MUST read the appearance mode from site settings. If a forced mode value is found (`dark` or `light`), use it. If no value is found, default to `auto`.
- **no-auto-in-storage**: The value `"auto"` MUST NOT be written to site settings. Auto is represented by the absence of a stored value.
- **clear-on-auto**: Switching to `auto` MUST remove/clear the stored value from site settings, not write `"auto"`.

## Icons

- **dark-mode-icon**: The forced dark mode MUST display a moon icon.
- **light-mode-icon**: The forced light mode MUST display a sun icon.
- **auto-mode-icon-base**: In `auto` mode, the icon MUST be the same sun or moon icon that matches the current system appearance (moon if system is dark, sun if system is light).
- **auto-mode-indicator**: In `auto` mode, a small sync/refresh badge (circular arrows) MUST appear in the bottom-right corner of the button, overlapping the base icon slightly. The badge MUST be roughly half the size of the base icon (e.g., if the icon is 20px, the badge is ~10px). It MUST be tinted in the site's highlight/accent color. The base icon underneath MUST remain fully visible and unchanged — the badge is a corner annotation, not a full overlay.
- **auto-indicator-no-full-overlay**: The auto indicator MUST NOT be rendered at the same size as the base icon or centered over it. A full-size overlay obscures the sun/moon and makes the mode unreadable. The indicator is a small corner badge only.
- **icon-size-consistent**: All three modes MUST render their base icons at the same size. The auto indicator badge MUST NOT cause the button to grow or shift layout.

## Appearance

- **Button**: Icon-only button, no visible border or background in default state
- **Icon size**: Match the site's standard icon size for header controls
- **Hover**: Text/icon transitions to primary color
- **Auto indicator**: Small badge (~half icon size) in the bottom-right corner, accent/highlight color, not a full overlay

## States

| State | Appearance |
|-------|-----------|
| Auto (system dark) | Moon icon with small accent-colored sync arrows badge in bottom-right corner |
| Auto (system light) | Sun icon with small accent-colored sync arrows badge in bottom-right corner |
| Forced dark | Moon icon (no overlay) |
| Forced light | Sun icon (no overlay) |
| Hover | Icon transitions to primary text color |
| Focused | Standard focus ring |

## Accessibility

- **button-role**: The control MUST be a `<button>` element (not a link or div).
- **aria-label-descriptive**: The `aria-label` MUST describe the current mode and what clicking will do. Examples:
  - Auto mode: `"Theme: Auto (currently dark). Click to switch to dark."`
  - Dark mode: `"Theme: Dark. Click to switch to light."`
  - Light mode: `"Theme: Light. Click to switch to auto."`
- **tooltip-descriptive**: The `title` attribute MUST describe the current state:
  - Auto: `"Following system (dark)"` or `"Following system (light)"`
  - Dark: `"Dark mode — click for light"`
  - Light: `"Light mode — click for auto"`
- **no-color-only**: The mode MUST NOT be conveyed by color alone. The icon shape (sun vs moon) and the presence/absence of the overlay indicator distinguish the three modes.

## Flash Prevention

- **no-fouc**: The page MUST NOT flash the wrong appearance on load. An inline `<script>` in `<head>` (before any stylesheet or framework code) MUST read the stored forced mode from site settings and apply the appropriate CSS class to `<html>` synchronously. If no forced mode is stored, it MUST check `prefers-color-scheme` and apply the matching class.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| amt-001 | default-is-auto | Fresh visit, no stored setting | Mode is auto, appearance matches system |
| amt-002 | three-mode-cycle | Click three times from auto | auto -> dark -> light -> auto |
| amt-003 | auto-clears-setting | Switch from dark to light to auto | Site settings has no appearance mode value |
| amt-004 | forced-persists | Set to dark, reload page | Mode is dark, appearance is dark regardless of system |
| amt-005 | auto-follows-system | In auto mode, change system from light to dark | Page appearance changes to dark without reload |
| amt-006 | auto-recheck-on-return | System is dark, user sets light, then clicks back to auto | Appearance becomes dark (re-queries system, doesn't assume light) |
| amt-007 | forced-ignores-system | In forced light mode, change system to dark | Page remains light |
| amt-008 | no-fouc | Forced dark stored, full page load | No flash of light mode before dark applies |
| amt-009 | auto-mode-icon-base | Auto mode, system is dark | Moon icon displayed with sync overlay |
| amt-010 | auto-mode-icon-base | Auto mode, system is light | Sun icon displayed with sync overlay |
| amt-011 | icon-size-consistent | Toggle through all three modes | Button size does not change |
| amt-012 | no-auto-in-storage | Toggle to auto | String "auto" is NOT in site settings |
| amt-013 | aria-label-descriptive | In dark mode, inspect button | aria-label includes "Dark" and describes next mode |

## Edge Cases

- **Settings unavailable**: If site settings cannot be read (e.g., storage quota exceeded, cookies disabled), the control MUST default to auto mode and degrade gracefully — no errors shown to the user.
- **System appearance undefined**: If `prefers-color-scheme` is not supported by the browser, auto mode MUST default to light.
- **Rapid clicking**: Rapid toggling MUST NOT cause visual glitches or inconsistent state. Each click produces exactly one mode transition.
- **SSR / hydration mismatch**: If the page is server-rendered, the inline script in `<head>` handles the initial class. The client-side framework MUST read the same stored value on hydration to avoid a mismatch.

## Accessibility Options

| Option | Behavior |
|--------|----------|
| Reduce Motion | Icon transitions use instant swap instead of animated transition |
| Increase Contrast | Icon uses higher-contrast colors for visibility |
| Forced Colors | Icon rendered in system `ButtonText` color; overlay uses `Highlight` |

## Privacy

- **Data collected**: Appearance mode preference only (`dark` or `light`). No value stored for auto (the default).
- **Storage**: Site settings (implementation-defined by the consuming site).
- **Transmission**: The appearance preference MUST NOT be transmitted to analytics, crash reporting, or any external service.
- **Retention**: Persists until the user changes it or clears site settings.

## Platform Notes

- **React**: Implement as a context provider (`ThemeProvider`) with a `useTheme()` hook exposing `mode` (`auto`/`dark`/`light`), `theme` (resolved `dark`/`light`), and `toggle()`. The provider manages the `matchMedia` listener, state, and persistence. The button component consumes the hook.
- **Vue**: Implement as a composable (`useTheme()`) with reactive `mode` and `theme` refs. Use `watchEffect` for the `matchMedia` listener.
- **Vanilla JS**: Attach `matchMedia` listener on init. Store mode in a module-level variable. Export `getTheme()`, `getMode()`, `toggle()`.
- **CSS**: The toggle applies a class (e.g., `dark`) to `<html>`. All theme-aware styles use CSS custom properties scoped to the presence/absence of that class. Example: `:root { --bg: white; } .dark { --bg: #0c0c0f; }`.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-30 | Mike Fullerton | Initial creation |
