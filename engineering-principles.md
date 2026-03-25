# Software Engineering Principles Reference

> A curated set of foundational principles reflecting modern professional consensus. Each principle includes its core insight, practical application guidance, and authoritative sources.

---

## 1. Simplicity Above All

**Core insight:** Simple and easy are not synonyms. Simple means "one fold" — no interleaving of concerns. Easy means "nearby" — familiar or convenient. Optimizing for easy leads to complexity that eventually kills velocity. Optimizing for simple keeps systems understandable and changeable.

**In practice:**
- Before adding abstraction, ask: "Am I braiding two concerns together?"
- Favor constructs that do one thing over constructs that feel convenient
- Complexity is never removed later — it compounds. Resist it at introduction time

**Sources:**
- Rich Hickey, "Simple Made Easy" (Strange Loop 2011) — <https://www.infoq.com/presentations/Simple-Made-Easy/>
- Transcript — <https://github.com/matthiasn/talk-transcripts/blob/master/Hickey_Rich/SimpleMadeEasy.md>

---

## 2. Make It Work, Make It Right, Make It Fast

**Core insight:** Separate the concerns of correctness, design quality, and performance into sequential phases. Premature optimization and premature abstraction kill more projects than bad algorithms.

**In practice:**
- First: get a working solution for the common case (red-to-green in TDD)
- Second: refactor for clarity, handle edge cases, clean up design
- Third: optimize only what measurement proves is slow
- Never skip phase 2 to jump to phase 3

**Sources:**
- Kent Beck, *Extreme Programming Explained* (1999) and *Test-Driven Development: By Example* (2002)
- Predates Beck: Stephen C. Johnson & Brian Kernighan, Byte magazine (August 1983)
- Kent Beck's Substack — <https://tidyfirst.substack.com/>
- C2 Wiki discussion — <https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast>

---

## 3. Small, Reversible Decisions

**Core insight:** If a decision is cheap to reverse, make it fast. If it's expensive to reverse, invest in understanding before committing. Architecture should evolve through many small deployable changes, not big-bang rewrites.

**In practice:**
- Prefer incremental delivery over phased releases
- Defer binding decisions (database choice, framework commitment) until the last responsible moment
- Use fitness functions and automated tests to detect architectural drift
- Treat architecture as a continuous activity, not an up-front phase

**Sources:**
- Martin Fowler, "Is Design Dead?" — <https://martinfowler.com/articles/designDead.html>
- Fowler, foreword to *Building Evolutionary Architectures* — <https://martinfowler.com/articles/evo-arch-forward.html>
- Neal Ford, Rebecca Parsons, Pat Kua, *Building Evolutionary Architectures* (O'Reilly, 2017)
- Martin Fowler, *Refactoring: Improving the Design of Existing Code* (2nd ed, 2018)
- Evolutionary design collected articles — <https://martinfowler.com/tags/evolutionary%20design.html>

---

## 4. Explicit Over Implicit

**Core insight:** Hidden behavior, magic, and implicit coupling create the bugs that take days to find. Code should clearly express its intent and dependencies.

**In practice:**
- Make dependencies visible (injection over hidden globals)
- Name things for what they do, not how they're implemented
- Prefer clear parameter passing over ambient state
- When in doubt, be verbose rather than clever

**Sources:**
- Tim Peters, "The Zen of Python" (PEP 20, 2004) — <https://peps.python.org/pep-0020/>
- Go language design philosophy (Rob Pike) — <https://go.dev/talks/>
- Runs through Fowler's refactoring catalog and Beck's TDD work

---

## 5. Composition Over Inheritance

**Core insight:** Small, focused units that compose cleanly beat deep class hierarchies. Inheritance creates tight coupling between parent and child; composition allows independent evolution.

**In practice:**
- Default to composing behaviors from small pieces
- Use inheritance only for genuine "is-a" relationships, and even then sparingly
- Prefer protocols/interfaces over base classes
- When extending behavior, wrap rather than subclass

**Sources:**
- Gamma, Helm, Johnson, Vlissides, *Design Patterns: Elements of Reusable Object-Oriented Software* (GoF, 1994)
- This has evolved from GoF advice to near-universal consensus across OO, functional, and protocol-oriented paradigms

---

## 6. YAGNI (You Aren't Gonna Need It)

**Core insight:** Build for today's known requirements. Speculative generality — building for imagined future needs — is a liability, not an asset. It adds code that must be maintained but delivers no current value.

**In practice:**
- Implement the simplest thing that satisfies the current requirement
- When tempted to add a configuration point or abstraction layer "in case we need it," don't
- If a future need materializes, the cost of adding it then (with better understanding) is almost always lower than maintaining premature abstractions now

**Sources:**
- Ron Jeffries & Kent Beck (Extreme Programming)
- Martin Fowler, "Yagni" — <https://martinfowler.com/bliki/Yagni.html>

---

## 7. Tight Feedback Loops

**Core insight:** The speed of your feedback loop is the speed of your learning. Fast tests, fast builds, fast deploys, fast user feedback. This is the throughline connecting CI/CD, TDD, and ship-early culture.

**In practice:**
- Optimize test suite runtime ruthlessly — slow tests don't get run
- Deploy small changes frequently rather than large changes rarely
- Get real user feedback as early as possible (vertical slices, not horizontal layers)
- Automate everything between code commit and production observation

**Sources:**
- Jez Humble & David Farley, *Continuous Delivery* (Addison-Wesley, 2010)
- Kent Beck, *Test-Driven Development: By Example* (2002)
- Dave Farley's YouTube channel — <https://www.youtube.com/@ContinuousDelivery>

---

## 8. Separation of Concerns / Single Responsibility

**Core insight:** A module should have one reason to change. Mixing concerns means a change in one area forces changes in unrelated areas, creating a cascade of breakage.

**In practice:**
- Each module/function/class should address one cohesive concept
- If describing what a module does requires "and," consider splitting
- This applies at every scale: functions, modules, services, teams
- The most practical of the SOLID principles

**Sources:**
- Edsger Dijkstra, "On the role of scientific thought" (1974) — coined the term "separation of concerns"
- Robert C. Martin, *Clean Architecture* (2017)
- Robert C. Martin's blog — <https://blog.cleancoder.com/>
- SOLID principles (Martin): Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

---

## 9. Design for Deletion, Not Reuse

**Core insight:** Every line of code is a maintenance liability. Instead of building reusable software, build disposable software. If each piece is small and loosely coupled, replacing it is trivial. Reuse emerges naturally; it cannot be forced.

**In practice:**
- Write code that's easy to throw away without affecting the rest of the system
- Treat "lines of code" as "lines spent" — deleting code reduces maintenance cost
- Don't abstract prematurely in pursuit of reuse
- When in doubt, duplicate rather than couple

**Sources:**
- Tef, "Write code that is easy to delete, not easy to extend" (2016) — <https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to>
- Tef, follow-up essays — <https://tef.computer/>

---

## 10. Manage Complexity Through Boundaries

**Core insight:** Well-defined boundaries between subsystems let each side evolve independently. The boundary — not the implementation behind it — is the architectural decision that matters.

**In practice:**
- Define ports (interfaces) that describe what the application needs, not how external systems work
- Use adapters to translate between external technologies and your application's ports
- Test the core application without databases, UIs, or networks
- Boundaries enable technology substitution over a system's lifetime

**Sources:**
- Alistair Cockburn, "Hexagonal Architecture" (Ports & Adapters, 2005) — <https://alistair.cockburn.us/hexagonal-architecture>
- Cockburn & Garrido de Paz, *Hexagonal Architecture Explained* (2024)
- Robert C. Martin, *Clean Architecture* (2017) — combines hexagonal, onion, and other boundary patterns
- Resource hub — <https://www.hexagonalarchitecture.org/>

---

## 11. Dependency Injection

**Core insight:** A component should receive its dependencies from the outside, not construct them internally. This makes dependencies explicit, enables testing with substitutes, and allows swapping implementations without modifying consumers.

**In practice:**
- Pass services via constructor/initializer parameters or protocol properties
- Never instantiate a concrete service inside the component that uses it
- Use protocol/interface types for dependencies, not concrete types
- In UI frameworks: use environment injection (SwiftUI `@Environment`, Compose `CompositionLocal`, React Context)
- Avoid service locator pattern (hidden global lookup) — it's implicit, not explicit

**Sources:**
- Martin Fowler, "Inversion of Control Containers and the Dependency Injection pattern" (2004) — <https://martinfowler.com/articles/injection.html>
- Mark Seemann, *Dependency Injection: Principles, Practices, and Patterns* (2nd ed, Manning 2019)
- Robert C. Martin, Dependency Inversion Principle (the "D" in SOLID)

---

## 12. Immutability by Default

**Core insight:** Mutable shared state is the root cause of most concurrency bugs and many logic bugs. Default to immutable values; introduce mutability only where necessary and contain it behind clear boundaries.

**In practice:**
- Use `let` (Swift), `val` (Kotlin), `const` (JS/TS) by default. Use `var`/`let` only when mutation is required.
- Prefer value types (structs, data classes, frozen objects) over reference types
- When mutation is needed, contain it: use actors (Swift), `StateFlow` (Kotlin), or `useState` (React)
- Treat data transformation as creating new values, not modifying existing ones

**Sources:**
- Rich Hickey, "The Value of Values" (JaxConf 2012) — <https://www.infoq.com/presentations/Value-Values/>
- Swift value semantics — <https://developer.apple.com/swift/blog/?id=10>
- Kotlin immutable collections — <https://kotlinlang.org/docs/collections-overview.html>

---

## 13. Fail Fast

**Core insight:** Invalid state should be detected and surfaced immediately at the point of origin, not propagated silently until it causes a mysterious failure far from the source.

**In practice:**
- Use assertions and preconditions in debug builds to catch programmer errors early
- Validate inputs at system boundaries (user input, network responses, file reads)
- Return typed errors (Swift `Result`, Kotlin `sealed class`, TS discriminated unions) rather than swallowing exceptions
- Never use empty catch blocks — at minimum, log the error
- In production, fail gracefully with clear error messages; in debug, fail loudly

**Sources:**
- Jim Shore, "Fail Fast" (IEEE Software, 2004) — <https://www.martinfowler.com/ieeeSoftware/failFast.pdf>
- Bertrand Meyer, "Design by Contract" — preconditions, postconditions, invariants

---

## 14. Principle of Least Astonishment

**Core insight:** APIs, UI, and system behavior should match what users and callers expect. If a name suggests one behavior, it must deliver that behavior. Surprises are bugs.

**In practice:**
- Name functions for what they do, not how they do it
- Follow platform naming conventions (Swift API Design Guidelines, Kotlin conventions, JS conventions)
- Side effects should be obvious from the API signature — a function named `get` should not mutate state
- UI controls should behave like their platform-native counterparts
- When behavior might surprise a caller, document it explicitly

**Sources:**
- General principle in interface design, formalized in IEEE standards
- Swift API Design Guidelines — <https://www.swift.org/documentation/api-design-guidelines/>
- Kotlin coding conventions — <https://kotlinlang.org/docs/coding-conventions.html>
- Nielsen Norman Group, Usability Heuristics #4: Consistency and Standards — <https://www.nngroup.com/articles/consistency-and-standards/>

---

## 15. Idempotency

**Core insight:** User actions and system operations should be safe to repeat without producing duplicate side effects. Networks are unreliable, users double-tap, and retries are inevitable.

**In practice:**
- Button taps should be debounced or disabled during async operations
- API calls should use idempotency keys for operations with side effects
- Database migrations and seeds should be safe to run multiple times
- State transitions should check current state before applying changes

**Sources:**
- HTTP specification (RFC 7231, Section 4.2.2) — <https://datatracker.ietf.org/doc/html/rfc7231#section-4.2.2>
- Stripe's idempotency guide — <https://stripe.com/docs/api/idempotent_requests>
- Pat Helland, "Idempotence Is Not a Medical Condition" (ACM Queue, 2012) — <https://queue.acm.org/detail.cfm?id=2187821>

---

## Meta-Principle: Optimize for Change

Every principle above is a strategy for making future change cheaper and safer. Change is the only constant in software. When evaluating any technical decision, the primary question is: **"Does this make future change easier or harder?"**

---

## Quick-Reference Summary

| # | Principle | One-Line Rule |
|---|-----------|---------------|
| 1 | Simplicity | Don't braid concerns together |
| 2 | Work → Right → Fast | Correctness before design before performance |
| 3 | Reversible decisions | Defer binding, deploy incrementally |
| 4 | Explicit over implicit | No hidden behavior or magic |
| 5 | Composition over inheritance | Compose small pieces, don't extend deep trees |
| 6 | YAGNI | Don't build for imagined futures |
| 7 | Tight feedback loops | Speed of feedback = speed of learning |
| 8 | Single responsibility | One reason to change per module |
| 9 | Design for deletion | Easy to remove > easy to reuse |
| 10 | Boundaries | Interfaces between subsystems enable independent evolution |
| 11 | Dependency injection | Receive dependencies, don't construct them |
| 12 | Immutability by default | `let`/`val`/`const` first, `var` only when needed |
| 13 | Fail fast | Detect invalid state at the point of origin |
| 14 | Least astonishment | Behavior matches what the name promises |
| 15 | Idempotency | Safe to repeat without duplicate side effects |
