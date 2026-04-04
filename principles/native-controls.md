---
id: dec7cf4a-449b-47fa-9d6e-f7e9376383a7
title: "Prefer native controls and libraries"
domain: agentic-cookbook://principles/native-controls
type: principle
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Always use the platform's built-in frameworks before custom implementations. Swift Concurrency over raw threads. Room..."
platforms: 
  - swift
tags: 
  - native-controls
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Prefer native controls and libraries

Always use the platform's built-in frameworks before custom implementations. Swift Concurrency over raw threads. Room/SwiftData over raw SQLite. Fetch API over custom HTTP.

When generating a component, explicitly note which native controls are being used and why. If there is ambiguity about whether a native control fits, ask the user before proceeding.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
