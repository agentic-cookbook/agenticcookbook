# Rate Limiting

Respect server rate limits. Handle 429 responses gracefully.

- Always honor the `Retry-After` header (seconds or HTTP-date)
- If no `Retry-After`, use exponential backoff (see Retry section)
- Track `RateLimit-Remaining` headers proactively — slow down before hitting 429
- Queue and batch requests at the allowed rate rather than fire-and-retry

References:
- [RFC 6585: 429 Too Many Requests](https://www.rfc-editor.org/rfc/rfc6585)
