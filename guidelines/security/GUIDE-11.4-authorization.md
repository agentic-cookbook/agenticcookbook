# GUIDE-11.4. Authorization

**Server-side authorization is the only real authorization.** Client-side checks (hiding
buttons, disabling fields) are UX conveniences — never security controls.

- **Deny by default** — if no explicit permission grants access, deny. Every new endpoint
  starts locked down.
- **Least privilege** — request minimum scopes. Each endpoint enforces its own permission check.
- **RBAC** — define roles with minimal permissions. Prefer fine-grained permissions composed
  into roles over monolithic role checks.
- **Broken Object Level Authorization (BOLA)** — the #1 API security risk (OWASP API Top 10).
  Always verify the authenticated user has access to the specific resource ID requested.
  Never assume "if they know the ID, they have access."

References:
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)
