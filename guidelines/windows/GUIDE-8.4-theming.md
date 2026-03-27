# GUIDE-8.4. Theming

WinUI 3 supports tri-state theming: Light, Dark, and High Contrast.

- Set app-level theme via `Application.RequestedTheme`, override per-element with `FrameworkElement.RequestedTheme`
- Always use `ThemeResource` (not `StaticResource`) for colors and brushes — enables runtime theme switching
- Use semantic color resources (`TextFillColorPrimary`, `CardBackgroundFillColorDefault`) not hex values
- Define custom theme-aware colors in a `ResourceDictionary` with `Default`/`Light`/`Dark` theme dictionaries

```xml
<!-- Good: semantic theme resource -->
<TextBlock Foreground="{ThemeResource TextFillColorPrimaryBrush}" />

<!-- Bad: hard-coded color -->
<TextBlock Foreground="#FFFFFF" />
```
