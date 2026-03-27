# Deep Linking

All significant feature points and views MUST be deep linkable using the platform's native URL/deep link mechanism. Each spec SHOULD include a **Deep Linking** section defining URL patterns.

## TypeScript

Every view MUST have a unique, shareable URL. Use framework routing (React Router, Next.js routing, etc.).

## Windows

Declare protocol handlers in `Package.appxmanifest` and handle activation through the Windows App SDK lifecycle APIs.

- Declare: `<uap:Protocol Name="myapp"/>` in manifest
- Handle via `AppInstance.GetActivatedEventArgs()` in `App.OnLaunched`
- Parse URI to determine target page/state, navigate accordingly
- Use `AppInstance.FindOrRegisterForKey()` for single-instancing (recommended for deep links)
