---
id: 926dff1a-dc12-46a4-b8c1-bdedbc142afd
title: "Secure Storage"
domain: agentic-cookbook://guidelines/security/secure-storage
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Tokens, credentials, and any sensitive data MUST use platform secure storage. Never store secrets in plaintext config..."
platforms: 
  - kotlin
  - swift
  - windows
tags: 
  - secure-storage
  - security
depends-on: []
related: []
references: 
  - https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets
  - https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.protecteddata
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-04-04"
---

# Secure Storage

Tokens, credentials, and any sensitive data MUST use platform secure storage. Never store secrets in plaintext configuration files, app settings, or unencrypted preference stores.

## Swift

Use Keychain Services for tokens, credentials, and any sensitive data. Never store secrets in UserDefaults or plists.

## Kotlin

Use `EncryptedSharedPreferences` or the Android Keystore for tokens, credentials, and sensitive data. Never store secrets in plain SharedPreferences.

## C#

- Use [DPAPI](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.protecteddata) (`ProtectedData.Protect`/`Unprotect` with `DataProtectionScope.CurrentUser`) for Windows-only local secrets
- Use [User Secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) (`Microsoft.Extensions.Configuration.UserSecrets`) for development-time secrets only (plaintext JSON — not for production)
- Never store tokens or credentials in plaintext config files or app settings

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
