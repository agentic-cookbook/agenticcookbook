---
id: 2e317c68-384d-46b8-b3b3-0bcc6602e545
title: "Real-Time Communication"
domain: agentic-cookbook://guidelines/networking/real-time-communication
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Choose the simplest technique that meets your needs."
platforms: 
  - web
tags: 
  - networking
  - real-time-communication
depends-on: []
related: []
references: 
  - https://developer.mozilla.org/en-US/docs/Web/API/EventSource
  - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
  - https://www.rfc-editor.org/rfc/rfc6455
approved-by: ""
approved-date: ""
---

# Real-Time Communication

Choose the simplest technique that meets your needs.

| Technique | Direction | Use When |
|-----------|-----------|----------|
| Polling | Client-pull | Low frequency (<1/min), simplicity paramount |
| SSE | Server-push | Notifications, live feeds, dashboards, progress |
| WebSocket | Bidirectional | Chat, multiplayer, collaborative editing |

**Start with SSE** for server-push — it has built-in reconnection, works over standard HTTP,
and is sufficient for 80%+ of "real-time" needs. Only move to WebSocket if you need
bidirectional streaming. Use polling as a fallback for very low frequency updates.

References:
- [MDN: Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
- [MDN: WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RFC 6455: WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
