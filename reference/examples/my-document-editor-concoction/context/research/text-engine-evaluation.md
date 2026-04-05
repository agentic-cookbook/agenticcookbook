# Research: Text Engine Evaluation

## Question

Which text rendering and editing engine should the editor use on Apple platforms?

## Options Evaluated

### TextKit 2
- Native Apple framework, first-class SwiftUI support
- Handles complex text layout (RTL, CJK, emoji)
- Active development by Apple

### Custom Engine
- Full control over rendering pipeline
- Higher maintenance burden
- Risk of platform inconsistencies

## Conclusion

TextKit 2. The native framework covers all requirements, integrates cleanly with the platform, and avoids the maintenance cost of a custom engine.
