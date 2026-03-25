# Litterbox

A library of UI component specifications for Claude Code. This repo contains no code — only markdown specs that describe how components should look, behave, and be implemented on each platform.

## How to use this repo

### In consuming projects

Add this line to your project's `CLAUDE.md`:

```
UI component specs are at ../litterbox/ui/ — when implementing a component from a spec, read the spec file and implement it idiomatically for this project's platform.
```

### Implementing a component from a spec

1. Read the spec file in `ui/`
2. Implement using the project's native UI framework (SwiftUI, Compose, React, etc.)
3. Follow the spec's appearance values, behavior, and states exactly
4. Apply platform-specific notes from the spec where applicable
5. Ensure accessibility requirements from the spec are met

### Writing new specs

Use `ui/_template.md` as a starting point. Each spec should be self-contained — include concrete values inline rather than referencing external tokens. A good spec is unambiguous enough that any LLM can implement it without follow-up questions.
