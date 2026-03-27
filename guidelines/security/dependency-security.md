# Dependency Security

Your dependencies are your attack surface. Manage them actively.

- **Lockfiles are mandatory** — `package-lock.json`, `Podfile.lock`, `gradle.lockfile`,
  `poetry.lock`, `Cargo.lock`, `packages.lock.json`. Commit them. Use `--frozen-lockfile` /
  `npm ci` / `dotnet restore --locked-mode` in CI.
- **Automated scanning** — run `npm audit`, `pip-audit`, Dependabot, Snyk, or `dotnet list
  package --vulnerable` in CI. Fail the build on critical/high vulnerabilities.
- **Pin dependencies** — exact versions or narrow ranges. No `*` or overly broad semver.
- **Subresource Integrity (SRI)** — for any CDN-hosted scripts/styles, use `integrity`
  attributes with SHA-384/SHA-512 hashes.
- **Watch for supply chain attacks** — typosquatting, maintainer compromise, malicious
  post-install scripts, dependency confusion (internal/public name collisions).

References:
- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)
- [SLSA Framework](https://slsa.dev/)
- [Sigstore](https://www.sigstore.dev/)
