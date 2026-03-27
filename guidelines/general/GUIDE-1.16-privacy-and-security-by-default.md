# GUIDE-1.16. Privacy and security by default

### GUIDE-1.16.1. Data minimization

Collect only what is needed. Prefer on-device processing.

### GUIDE-1.16.2. Consent

Opt-in for non-essential data collection. Honor "deny" gracefully — the app must remain functional.

### GUIDE-1.16.3. Secure storage

Tokens and credentials MUST use platform secure storage (Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly cookies).

### GUIDE-1.16.4. No PII logging

Never log personally identifiable information, even at debug level.

### GUIDE-1.16.5. TLS only

All network communication MUST use HTTPS.

### GUIDE-1.16.6. Input sanitization

Sanitize all user input before display (prevent XSS, injection).

Each spec SHOULD include a **Privacy** section documenting data collected and how it is stored.
