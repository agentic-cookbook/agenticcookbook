---
id: b9da0bd1-a7e4-491f-beb0-46f7b5c19d86
title: "Security Testing"
domain: agentic-cookbook://guidelines/testing/security-testing
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Run security scans as part of post-generation verification (agentic-cookbook://guidelines/testing/post-generation-verification). These a..."
platforms: 
  - csharp
  - kotlin
  - python
  - swift
  - typescript
  - web
tags: 
  - security-testing
  - testing
depends-on: []
related: 
  - agentic-cookbook://guidelines/testing/post-generation-verification
references: 
  - https://codeql.github.com/
  - https://github.com/PyCQA/bandit
  - https://semgrep.dev/
  - https://snyk.io/
  - https://www.zaproxy.org/
---

# Security Testing

Run security scans as part of post-generation verification (agentic-cookbook://guidelines/testing/post-generation-verification). These are CLI tools
Claude Code can invoke directly.

**Static Analysis (SAST):**
- [Semgrep](https://semgrep.dev/) — all languages: `semgrep scan --config=auto .`
- [Bandit](https://github.com/PyCQA/bandit) — Python: `bandit -r src/`
- [CodeQL](https://codeql.github.com/) — deep analysis (Swift, Kotlin, C#, Python, TS, Go)

**Dependency Scanning:**
- Python: `pip-audit`
- Node.js: `npm audit`
- .NET: `dotnet list package --vulnerable`
- All: [Snyk](https://snyk.io/) CLI (`snyk test`)

**Dynamic Analysis (DAST):**
- [OWASP ZAP](https://www.zaproxy.org/) — scan running web services: `zap-cli quick-scan http://localhost:8888`

See agentic-cookbook://guidelines/security/* (Security Guidelines) for the full security reference.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
