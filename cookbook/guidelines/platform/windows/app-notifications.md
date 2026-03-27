---
id: 94e8caba-da27-4bb8-8f8e-38730b8b34e0
title: "App Notifications"
domain: cookbook.guidelines.platform.windows.app-notifications
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Use `AppNotificationManager` + `AppNotificationBuilder` fluent API for local notifications."
platforms: 
  - windows
tags: 
  - app-notifications
  - platform
  - windows
depends-on: []
related: []
references: []
---

# App Notifications

Use `AppNotificationManager` + `AppNotificationBuilder` fluent API for local notifications.

- Support text, images, buttons with activation arguments, progress bars, scheduled delivery
- Handle notification activation alongside protocol activation
- MSIX-packaged apps get notification identity automatically
