# Transport Security

**TLS 1.2 minimum**, prefer TLS 1.3. Disable TLS 1.0 and 1.1 entirely.

**HSTS:** Enable on all production domains:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
Submit to the [HSTS preload list](https://hstspreload.org/).

**Certificate pinning — use with caution:**
- Pin to the intermediate CA, not the leaf (leaf certificates rotate)
- Acceptable for mobile apps; generally avoid for web (HPKP is deprecated)
- Always include backup pins and have a recovery plan
- Consider Certificate Transparency monitoring as an alternative

**Cipher suites:** Use Mozilla's "Intermediate" or "Modern" TLS configuration. Prefer AEAD
ciphers (AES-GCM, ChaCha20-Poly1305).

References:
- [OWASP TLS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html)
- [Mozilla Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS)
- [RFC 8446: TLS 1.3](https://datatracker.ietf.org/doc/html/rfc8446)
