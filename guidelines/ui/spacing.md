---
id: 536c1e46-36f9-4a44-b8f4-c9e4db94cf53
title: "Spacing"
domain: agentic-cookbook://guidelines/ui/spacing
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Use a consistent spatial scale based on a **4px base unit** (8px primary grid). All spacing,"
platforms: 
  - windows
tags: 
  - spacing
  - ui
depends-on: []
related: []
references: 
  - https://developer.apple.com/design/human-interface-guidelines/layout
  - https://learn.microsoft.com/en-us/windows/apps/design/layout/
  - https://m3.material.io/foundations/layout/overview
approved-by: ""
approved-date: ""
---

# Spacing

Use a consistent spatial scale based on a **4px base unit** (8px primary grid). All spacing,
padding, and margin values should be multiples of 4. This aligns with Apple HIG, Material
Design, and Fluent Design.

Default spacing scale: **4, 8, 12, 16, 24, 32, 48, 64**

- **4px** — tight spacing within compact elements (icon-to-label, badge padding)
- **8px** — default inner padding, spacing between related items
- **12px** — padding within cards or list items
- **16px** — standard content padding from screen/container edges
- **24px** — separation between content groups
- **32-64px** — major section separation

Avoid arbitrary values (5px, 13px, 37px). If a value isn't on the scale, reconsider.

References:
- [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Material Design: Layout](https://m3.material.io/foundations/layout/overview)
- [Fluent Design: Layout](https://learn.microsoft.com/en-us/windows/apps/design/layout/)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
