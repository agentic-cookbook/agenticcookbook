---
id: 095b33a1-2835-4ed5-bf01-f1e492148819
title: "Prefer explicit APIs for agentic development"
domain: agentic-cookbook://guidelines/language/swift/prefer-explicit-apple-apis
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-04-02
modified: 2026-04-02
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "On Apple platforms, prefer AppKit and UIKit for complex UI. SwiftUI is appropriate for standard screens where conciseness and cross-platform targeting provide real value."
platforms: 
  - ios
  - macos
tags: 
  - swift
  - appkit
  - uikit
  - swiftui
  - agentic
depends-on:
  - agentic-cookbook://principles/native-controls
related: []
references: []
---

# Prefer explicit APIs for agentic development

On Apple platforms, prefer AppKit and UIKit for complex, custom, or performance-critical UI. SwiftUI is appropriate for standard screens (lists, forms, navigation) where its conciseness and cross-platform targeting provide real value. The guiding principle: choose the most explicit, stable, well-documented API — the one an LLM can generate most reliably.

- AppKit/UIKit have 15+ years of training data, stable APIs, and explicit imperative patterns that LLMs handle reliably
- SwiftUI's API churn (NavigationView → NavigationStack, @ObservedObject → @Observable) causes version-specific generation errors
- SwiftUI's implicit behavior (modifier ordering, view diffing) creates bugs that are opaque and hard for agents to diagnose
- SwiftUI remains practical for standard screens — 5-10x fewer tokens, cross-platform targeting, and structural correctness via reactive state
- When SwiftUI is used, pin the minimum deployment target and avoid deprecated APIs to reduce generation ambiguity

## macOS

Prefer AppKit for complex UIs — `NSTableView`, `NSSplitViewController`, custom drawing, window management, and menu bar construction. AppKit provides explicit control over cell reuse, view recycling, responder chain, and drawing that SwiftUI abstracts away. Use SwiftUI for simple settings screens, popovers, and WidgetKit extensions where the abstraction cost is low.

## iOS

Prefer UIKit for custom layouts, complex collection view compositions (`UICollectionViewCompositionalLayout`), advanced text editing (`UITextView` with TextKit 2), fine-grained gesture handling, and complex animations. Use SwiftUI for standard list/detail flows, forms, and WidgetKit where the patterns are well-established and generation is reliable.

## Cross-platform (iOS + macOS)

When targeting both iOS and macOS from a shared codebase, SwiftUI's cross-platform story is a legitimate architectural advantage that may outweigh the explicitness trade-off. In this case, isolate platform-specific complexity behind `ViewRepresentable` wrappers rather than writing the entire UI in SwiftUI.

## When to use SwiftUI

SwiftUI is the right choice when:
- The UI is a standard pattern (list, form, detail view, settings) with no custom behavior
- You are building widgets, Live Activities, or App Clips (SwiftUI is required)
- Cross-platform targeting across Apple platforms is a project requirement
- The screen is simple enough that SwiftUI's implicit behavior won't cause debugging difficulty

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-02 | Mike Fullerton | Initial creation |
