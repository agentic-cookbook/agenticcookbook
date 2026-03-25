# Apple Test App Suite

Spec for generating an Xcode project with app targets for all Apple platforms. Used to visually test UI components implemented from `ui/` specs.

## Project Generation

Use **XcodeGen** with a `project.yml` to generate the Xcode project.

- **Output location**: `Tests/Projects/Apple/`
- **Project name**: `LitterboxTests`
- Run: `cd Tests/Projects/Apple && xcodegen generate`

## Targets

| Target | Platform | Deployment Target | Bundle ID |
|--------|----------|-------------------|-----------|
| LitterboxTestiOS | iOS | 17.0 | com.litterbox.test.ios |
| LitterboxTestMac | macOS | 14.0 | com.litterbox.test.mac |
| LitterboxTestWatch | watchOS | 10.0 | com.litterbox.test.watch |
| LitterboxTestTV | tvOS | 17.0 | com.litterbox.test.tv |
| LitterboxTestVision | visionOS | 1.0 | com.litterbox.test.vision |

Each target is a standalone SwiftUI app. No WatchKit companion — watchOS 10+ supports independent watch apps.

## Shared Code

Create a local Swift package at `Tests/Projects/Apple/TestSharedKit/`:

```
TestSharedKit/
├── Package.swift
└── Sources/
    └── TestSharedKit/
        └── ComponentCatalog.swift   ← shared catalog navigation
```

`Package.swift` should target all 5 platforms at the minimum deployment versions above.

Each app target includes `TestSharedKit` as a local package dependency.

## project.yml Structure

```yaml
name: LitterboxTests
options:
  bundleIdPrefix: com.litterbox.test
  deploymentTarget:
    iOS: "17.0"
    macOS: "14.0"
    watchOS: "10.0"
    tvOS: "17.0"
    visionOS: "1.0"
packages:
  TestSharedKit:
    path: TestSharedKit
targets:
  LitterboxTestiOS:
    type: application
    platform: iOS
    sources: Sources/iOS
    dependencies:
      - package: TestSharedKit
  LitterboxTestMac:
    type: application
    platform: macOS
    sources: Sources/macOS
    dependencies:
      - package: TestSharedKit
  LitterboxTestWatch:
    type: application
    platform: watchOS
    sources: Sources/watchOS
    dependencies:
      - package: TestSharedKit
  LitterboxTestTV:
    type: application
    platform: tvOS
    sources: Sources/tvOS
    dependencies:
      - package: TestSharedKit
  LitterboxTestVision:
    type: application
    platform: visionOS
    sources: Sources/visionOS
    dependencies:
      - package: TestSharedKit
```

## Source File Layout

```
Tests/Projects/Apple/
├── project.yml
├── TestSharedKit/           ← local SPM package
├── Sources/
│   ├── iOS/
│   │   └── LitterboxTestiOSApp.swift
│   ├── macOS/
│   │   └── LitterboxTestMacApp.swift
│   ├── watchOS/
│   │   └── LitterboxTestWatchApp.swift
│   ├── tvOS/
│   │   └── LitterboxTestTVApp.swift
│   └── visionOS/
│       └── LitterboxTestVisionApp.swift
└── Shared/                  ← component implementations + catalog views
    ├── Components/          ← components implemented from ui/ specs
    └── Catalog/             ← catalog views showing all states
```

Each app's entry point should import `TestSharedKit` and display a `ComponentCatalogView`.

Add `Shared/` as a source directory to all targets so component implementations and catalog views are available across platforms. Use `#if os(...)` for platform-specific adaptations.

## Component Catalog Pattern

Each component implemented from a `ui/` spec gets a corresponding catalog view in `Shared/Catalog/`:

```swift
struct PrimaryButtonCatalog: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Text("PrimaryButton").font(.title)

                Section("Default") {
                    PrimaryButton("Label", action: {})
                }
                Section("Disabled") {
                    PrimaryButton("Label", action: {}).disabled(true)
                }
                Section("Loading") {
                    PrimaryButton("Label", isLoading: true, action: {})
                }
            }
            .padding()
        }
    }
}
```

The top-level `ComponentCatalogView` is a `NavigationSplitView` (macOS/iPad) or `NavigationStack` (iPhone/watch/TV) listing all catalog entries. On visionOS, use `NavigationSplitView` in a window.

## Adding a New Component

1. Read the component spec from `ui/`
2. Implement the component in `Shared/Components/` using SwiftUI
3. Create a catalog view in `Shared/Catalog/` showing all states from the spec
4. Add the catalog entry to `ComponentCatalogView`
5. Build all targets to verify cross-platform compatibility

## Build Commands

```bash
# Generate the Xcode project
cd Tests/Projects/Apple && xcodegen generate

# Build all targets
xcodebuild -project LitterboxTests.xcodeproj -scheme LitterboxTestiOS -destination 'platform=iOS Simulator,name=iPhone 16' build
xcodebuild -project LitterboxTests.xcodeproj -scheme LitterboxTestMac build
xcodebuild -project LitterboxTests.xcodeproj -scheme LitterboxTestWatch -destination 'platform=watchOS Simulator,name=Apple Watch Series 10 (46mm)' build
xcodebuild -project LitterboxTests.xcodeproj -scheme LitterboxTestTV -destination 'platform=tvOS Simulator,name=Apple TV 4K (3rd generation)' build
xcodebuild -project LitterboxTests.xcodeproj -scheme LitterboxTestVision -destination 'platform=visionOS Simulator,name=Apple Vision Pro' build
```

## Prerequisites

- Xcode 16+
- xcodegen (`brew install xcodegen`)
- visionOS SDK (install via Xcode > Settings > Platforms)
