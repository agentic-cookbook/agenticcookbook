# GUIDE-14.8. Security Testing

Run security scans as part of post-generation verification (GUIDE-1.8). These are CLI tools
Claude Code can invoke directly.

**Static Analysis (SAST):**
- [Semgrep](https://semgrep.dev/) — all languages: `semgrep scan --config=auto .`
- [Bandit](https://github.com/PyCQA/bandit) — Python: `bandit -r src/`
- [CodeQL](https://codeql.github.com/) — deep analysis (Swift, Kotlin, C#, Python, TS, Go)

**Dependency Scanning:**
- Python: `pip-audit`
- Node.js: `npm audit`
- .NET: `dotnet list package --vulnerable`
- All: [Snyk](https://snyk.io/) CLI (`snyk test`)

**Dynamic Analysis (DAST):**
- [OWASP ZAP](https://www.zaproxy.org/) — scan running web services: `zap-cli quick-scan http://localhost:8888`

See GUIDE-11 (Security Guidelines) for the full security reference.
