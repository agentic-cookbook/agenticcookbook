---
id: e114c41c-d203-454c-bc7c-cc128f6ebadd
title: "Explicit over implicit"
domain: cookbook.principles.explicit-over-implicit
type: principle
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Hidden behavior, magic, and implicit coupling create bugs that take days to find:"
platforms: []
tags: 
  - explicit-over-implicit
depends-on: []
related: []
references: []
---

# Explicit over implicit

Hidden behavior, magic, and implicit coupling create bugs that take days to find:

- Make dependencies visible (injection over hidden globals)
- Name things for what they do, not how they are implemented
- Prefer clear parameter passing over ambient state
