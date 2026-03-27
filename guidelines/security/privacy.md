# Privacy and security by default

### guide.core.general.privacy-and-security-by-default. Data minimization

Collect only what is needed. Prefer on-device processing.

### guide.core.general.privacy-and-security-by-default. Consent

Opt-in for non-essential data collection. Honor "deny" gracefully — the app must remain functional.

### guide.core.general.privacy-and-security-by-default. Secure storage

Tokens and credentials MUST use platform secure storage (Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly cookies).

### guide.core.general.privacy-and-security-by-default. No PII logging

Never log personally identifiable information, even at debug level.

### guide.core.general.privacy-and-security-by-default. TLS only

All network communication MUST use HTTPS.

### guide.core.general.privacy-and-security-by-default. Input sanitization

Sanitize all user input before display (prevent XSS, injection).

Each spec SHOULD include a **Privacy** section documenting data collected and how it is stored.

---

# Privacy

Privacy and security must be built in from day one. Collect only what is needed. Prefer on-device processing. Opt-in for non-essential data collection. Honor "deny" gracefully — the app must remain functional. No PII in logs, even at debug level. All network communication MUST use HTTPS.

## Swift

Support App Tracking Transparency, App Privacy Report, and Private Relay compatibility. Include `NS*UsageDescription` keys with human-readable explanations for all permission prompts.

## Kotlin

Respect scoped storage, support per-app language preferences, and honor permission denials gracefully. Show rationale dialogs before runtime permission requests.

## TypeScript

1. **Content Security Policy**: Configure CSP headers to restrict script sources and prevent XSS.
2. **HttpOnly cookies**: Use HttpOnly secure cookies for authentication tokens. Never store tokens in `localStorage`.
3. **Input sanitization**: Sanitize all user input before display to prevent XSS and injection.
4. **TLS only**: All network communication MUST use HTTPS.
5. Minimize third-party scripts. Respect the Do Not Track header.

## C#

- Declare only required capabilities in `Package.appxmanifest` — avoid `broadFileSystemAccess` unless essential
- Use DPAPI for local secret storage (see secure-storage.md)
- No PII in logs, even at debug level
- Respect user consent: app must remain functional if optional data collection is denied
