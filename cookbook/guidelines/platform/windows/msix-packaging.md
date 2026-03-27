---
id: 4428deb0-05a8-4b52-a78f-3dec1e7f90a4
title: "MSIX Packaging"
domain: cookbook.guidelines.platform.windows.msix-packaging
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "- Use the single-project MSIX packaging model"
platforms: 
  - windows
tags: 
  - msix-packaging
  - platform
  - windows
depends-on: []
related: []
references: []
---

# MSIX Packaging

- Use the single-project MSIX packaging model
- Declare capabilities minimally in `Package.appxmanifest`
- Sign packages with a trusted certificate for sideloading
- Version numbering: `Major.Minor.Build.Revision`, monotonically increasing
