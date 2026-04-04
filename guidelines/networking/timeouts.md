---
id: c3883e6e-3bce-4bb9-a3be-61509a139288
title: "Timeouts"
domain: agentic-cookbook://guidelines/networking/timeouts
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Always set both connection and read timeouts. Never use infinite timeouts."
platforms: []
tags: 
  - networking
  - timeouts
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Timeouts

Always set both connection and read timeouts. Never use infinite timeouts.

| Timeout | Purpose | Default |
|---------|---------|---------|
| Connection | TCP + TLS handshake | 10 seconds |
| Read / Response | Time to first byte | 30 seconds |
| Total / Request | Entire lifecycle including retries | 60-120 seconds |

For long-running operations, use **202 Accepted** + polling pattern instead of extending
timeouts.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
