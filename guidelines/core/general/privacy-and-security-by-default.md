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
