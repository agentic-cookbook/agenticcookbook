# Shortcuts and Automation

Components and flows SHOULD be scriptable where the platform supports it. Automation enables power users to integrate app functionality into workflows, voice assistants, and third-party tools.

## Swift

Use the `AppIntents` framework for Shortcuts and Siri integration. On macOS, support AppleScript via `NSScriptCommand` where appropriate.

## Kotlin

Use `AppActions` for Google Assistant integration. Support `Intent`-based automation.
