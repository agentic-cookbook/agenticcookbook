# GUIDE-11.9. Sensitive Data

Minimize what you collect, encrypt what you keep, never log what you shouldn't.

- **Data minimization** — APIs return only fields the client needs. Use explicit response DTOs,
  never dump database models directly.
- **PII classification** — classify data by sensitivity (public, internal, PII, sensitive PII).
  Apply controls proportional to tier.
- **Field-level encryption** — encrypt highly sensitive fields (SSN, payment info) at the
  application level with a KMS (AWS KMS, Azure Key Vault, GCP KMS). Separate from database-level
  encryption.
- **No PII in logs** — never log tokens, passwords, credit card numbers, or PII. Mask/redact
  in all log outputs, including debug level. See GUIDE-1.16.4.
- **No internals in API responses** — never expose internal IDs, stack traces, or database
  error messages in production. Return generic errors with correlation IDs.
- **Cache-Control: no-store** on responses containing sensitive data.

References:
- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [NIST SP 800-122: PII Guide](https://csrc.nist.gov/publications/detail/sp/800-122/final)
