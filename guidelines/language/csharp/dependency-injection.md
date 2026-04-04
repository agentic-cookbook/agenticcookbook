---
id: e80d67b3-813f-47fb-8894-aa4e6f6479f3
title: "Dependency Injection"
domain: agentic-cookbook://guidelines/language/csharp/dependency-injection
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Constructor injection via `Microsoft.Extensions.DependencyInjection`. Use interface types for dependencies, not concr..."
platforms: []
tags: 
  - csharp
  - dependency-injection
  - language
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Dependency Injection

Constructor injection via `Microsoft.Extensions.DependencyInjection`. Dependencies MUST use interface types, not concrete types.

- `Transient` for lightweight stateless services
- `Scoped` for per-request services
- `Singleton` for thread-safe shared state
- A scoped service MUST NOT be injected into a singleton (captive dependency)
- Use `IOptions<T>` / `IOptionsSnapshot<T>` for configuration binding
- Keep registrations in `Add*()` extension methods for modularity

```csharp
public static IServiceCollection AddMyFeature(this IServiceCollection services)
{
    services.AddSingleton<IFeatureManager, LocalFeatureManager>();
    services.AddTransient<IOrderService, OrderService>();
    return services;
}
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
