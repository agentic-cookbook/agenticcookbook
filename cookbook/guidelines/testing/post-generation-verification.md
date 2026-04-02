---
id: e45d49c6-f753-4aea-8496-b3bf70297a7d
title: "Post-generation verification"
domain: agentic-cookbook://guidelines/testing/post-generation-verification
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Every generated artifact must be verified:"
platforms: 
  - ios
  - kotlin
  - typescript
tags: 
  - post-generation-verification
  - testing
depends-on: []
related: 
  - agentic-cookbook://guidelines/code-quality/linting
references: []
---

# Post-generation verification

Every generated artifact must be verified:

1. **Build**: Compile for all target platforms (`xcodebuild`, `./gradlew build`, `npm run build`, `dotnet build`)
2. **Test**: Run the full test suite — all tests must pass
3. **Lint**: Run the platform linter (see agentic-cookbook://guidelines/code-quality/linting)
4. **Log verification**: Build, run, and grep for expected log messages from the Logging section
5. **Accessibility audit**: Verify VoiceOver/TalkBack labels, tap target minimums (44pt iOS, 48dp Android), contrast ratios
6. **Code review against best practices**: Check against platform best practices references

If any step fails, fix the issue before considering the work complete.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
