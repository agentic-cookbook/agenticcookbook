# Component Extraction Criteria

## When to extract a component into a litterbox spec

A component is a good candidate for extraction when it meets **at least 3** of these criteria:

### Reusability
- [ ] Used (or could be used) in 2+ projects
- [ ] Not tightly coupled to app-specific data models
- [ ] Has a clear, generic purpose (not "UserProfileHeader" but "DetailHeader")

### Complexity
- [ ] Has meaningful behavior beyond simple display (state, interaction, animation)
- [ ] Has 2+ visual states (default, loading, error, empty, etc.)
- [ ] Involves platform-specific implementation differences worth documenting

### Quality
- [ ] The existing implementation is production-quality or close to it
- [ ] Accessibility has been considered
- [ ] The component handles edge cases (empty data, long text, RTL, etc.)

### Value
- [ ] Specifying it once would save significant re-implementation time
- [ ] Cross-platform consistency matters for this component
- [ ] The component embodies design decisions worth preserving

## When NOT to extract

- Trivial wrappers (a styled `Text`, a colored `Divider`)
- App-specific screens with domain logic embedded
- Components that are likely to change significantly before stabilizing
- One-off prototypes or experiments

## Naming guidelines for extracted specs

- Use generic, descriptive names: `detail-card.md` not `user-profile-card.md`
- Use kebab-case for filenames
- Prefix recipes with their domain: `settings-window.md`, `onboarding-flow.md`
- If a component is a variant of an existing spec, propose adding options to the existing spec rather than creating a new one
