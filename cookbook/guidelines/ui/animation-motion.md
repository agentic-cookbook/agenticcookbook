---
id: 9f13dbec-cecb-482b-824b-f7d3e341878a
title: "Animation & Motion"
domain: cookbook.guidelines.ui.animation-motion
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Motion should be purposeful — guide attention, show spatial relationships, and provide"
platforms: 
  - windows
tags: 
  - animation-motion
  - ui
depends-on: []
related: 
  - guide.core.general.respect-accessibility-display-options
references: 
  - https://developer.apple.com/design/human-interface-guidelines/motion
  - https://learn.microsoft.com/en-us/windows/apps/design/motion/timing-and-easing
  - https://m3.material.io/styles/motion/overview
---

# Animation & Motion

Motion should be purposeful — guide attention, show spatial relationships, and provide
feedback. Never animate for decoration.

**Duration defaults** (when no platform value exists):

| Interaction | Duration |
|------------|----------|
| Micro-feedback (ripple, highlight) | 50-100ms |
| State change (hover, toggle, press) | 100-200ms |
| Component enter/exit | 200-350ms |
| Page/navigation transition | 300-500ms |
| Complex choreography (rare) | 500-1000ms |

- Under 100ms feels instant. Over 500ms feels sluggish.
- Prefer platform-native spring/easing curves over linear or custom beziers
- **Always respect reduced-motion preferences** — see guide.core.general.respect-accessibility-display-options and each platform
  file's accessibility settings table. When reduced motion is enabled, replace animations
  with instant state changes or simple cross-fades.
- Avoid motion that covers large distances, loops continuously, or flashes

References:
- [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Material Design: Motion](https://m3.material.io/styles/motion/overview)
- [Fluent Design: Timing and Easing](https://learn.microsoft.com/en-us/windows/apps/design/motion/timing-and-easing)
