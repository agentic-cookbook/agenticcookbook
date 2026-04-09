#!/usr/bin/env python3
"""One-time migration: add triggers field to all guideline frontmatter.

Keyed on filename since the same guideline appears in multiple use-case dirs.
Every copy of a guideline gets the same triggers.
"""

import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
GUIDELINES_DIR = REPO_ROOT / "guidelines"

# --- Trigger assignments by filename ---
# Each guideline gets 1-5 triggers from the canonical taxonomy.

TRIGGERS = {
    # === data (was database-design) ===
    "access-pattern-analysis.md": ["database-operations", "schema-design", "performance-optimization"],
    "backup-and-recovery.md": ["database-operations", "configuration"],
    "clock-systems.md": ["database-operations", "offline-support", "schema-design"],
    "conflict-resolution.md": ["offline-support", "database-operations"],
    "constraints-and-validation.md": ["database-operations", "schema-design"],
    "data-types.md": ["database-operations", "schema-design"],
    "database.md": ["database-operations"],
    "database-testing.md": ["writing-tests", "database-operations"],
    "deterministic-ids.md": ["data-modeling"],
    "foreign-keys.md": ["database-operations", "schema-design"],
    "indexing.md": ["database-operations", "performance-optimization", "schema-design"],
    "json-columns.md": ["database-operations", "schema-design"],
    "naming-conventions.md": ["database-operations", "schema-design"],
    "normalization-and-denormalization.md": ["database-operations", "schema-design"],
    "offline-first-architecture.md": ["offline-support", "database-operations"],
    "primary-keys.md": ["database-operations", "schema-design"],
    "query-optimization.md": ["database-operations", "performance-optimization"],
    "relationships.md": ["database-operations", "schema-design"],
    "schema-evolution.md": ["database-operations", "schema-design"],
    "sync-engine-design.md": ["offline-support", "database-operations"],
    "sync-protocol.md": ["offline-support", "networking", "database-operations"],
    "sync-schema-design.md": ["offline-support", "schema-design"],
    "sync-tooling.md": ["offline-support", "dependency-management"],
    "transactions-and-concurrency.md": ["database-operations", "concurrency"],

    # === testing ===
    "test-pyramid.md": ["writing-tests", "pre-pr"],
    "test-doubles.md": ["writing-tests"],
    "unit-test-patterns.md": ["writing-tests"],
    "flaky-test-prevention.md": ["writing-tests", "pre-pr"],
    "mutation-testing.md": ["writing-tests", "pre-pr"],
    "security-testing.md": ["writing-tests", "security-review"],
    "test-data.md": ["writing-tests", "data-modeling"],
    "properties-of-good-tests.md": ["writing-tests", "code-review"],
    "property-based-testing.md": ["writing-tests"],
    "post-generation-verification.md": ["pre-commit", "code-review"],
    "the-testing-workflow.md": ["writing-tests", "pre-pr"],
    "testing.md": ["writing-tests", "pre-pr"],

    # === security ===
    "input-validation.md": ["input-handling", "security-review", "api-integration"],
    "authentication.md": ["authentication", "security-review"],
    "authorization.md": ["authentication", "security-review"],
    "token-handling.md": ["authentication", "security-review"],
    "secure-storage.md": ["security-review", "data-modeling"],
    "transport-security.md": ["networking", "security-review"],
    "cors.md": ["networking", "security-review", "api-integration"],
    "content-security-policy.md": ["security-review", "ui-implementation"],
    "dependency-security.md": ["dependency-management", "security-review"],
    "privacy.md": ["security-review", "data-modeling"],
    "sensitive-data.md": ["security-review", "logging"],
    "security-headers-checklist.md": ["security-review", "pre-pr"],

    # === networking ===
    "api-design.md": ["api-integration", "new-module"],
    "caching.md": ["networking", "performance-optimization"],
    "error-responses.md": ["api-integration", "error-handling"],
    "offline-and-connectivity.md": ["offline-support", "networking"],
    "pagination.md": ["api-integration", "data-modeling"],
    "rate-limiting.md": ["api-integration", "networking"],
    "retry-and-resilience.md": ["networking", "error-handling"],
    "timeouts.md": ["networking", "api-integration"],
    "real-time-communication.md": ["networking", "concurrency"],
    "web-services.md": ["api-integration", "new-module"],

    # === code-quality ===
    "linting.md": ["pre-commit", "new-module"],
    "atomic-commits.md": ["pre-commit"],
    "scope-discipline.md": ["code-review", "new-module"],
    "bulk-operation-verification.md": ["code-review", "pre-commit"],
    "architecture.md": ["new-module", "code-review"],
    "dependency-injection.md": ["new-module", "code-review"],
    "naming.md": ["code-review", "new-module"],
    "nullable-reference-types.md": ["new-module", "code-review"],
    "file-paths.md": ["new-module"],
    "yaml-frontmatter.md": ["data-modeling", "configuration"],
    "shell-scripts.md": ["new-module", "configuration"],
    "type-hints.md": ["new-module", "code-review"],
    "use-roadmaplib.md": ["new-module"],
    "no-external-dependencies-in-core-librari.md": ["dependency-management", "new-module"],
    # codebase-decomposition → code-quality
    "algorithmic-complexity.md": ["code-review", "performance-optimization"],
    "app-interactions.md": ["new-module", "code-review"],
    "cross-cutting-detection.md": ["code-review", "new-module"],
    "dependency-clusters.md": ["code-review", "new-module"],
    "framework-conventions.md": ["new-module", "code-review"],
    "interface-cohesion.md": ["code-review", "new-module"],
    "lifecycle-patterns.md": ["new-module", "code-review"],
    "module-boundaries.md": ["new-module", "code-review"],
    "purpose-classification.md": ["new-module", "code-review"],
    "runtime-conditions.md": ["code-review", "new-module"],
    "system-dependencies.md": ["new-module", "dependency-management"],
    "system-interactions.md": ["new-module", "code-review"],

    # === observability (was logging) ===
    "logging.md": ["logging", "new-module", "error-handling"],
    "analytics.md": ["logging", "ui-implementation"],

    # === ui ===
    "layout.md": ["ui-implementation"],
    "color.md": ["ui-implementation"],
    "typography.md": ["ui-implementation"],
    "spacing.md": ["ui-implementation"],
    "animation-motion.md": ["ui-implementation", "accessibility"],
    "form-design.md": ["ui-implementation", "input-handling"],
    "feedback-patterns.md": ["ui-implementation", "error-handling"],
    "always-show-progress.md": ["ui-implementation", "networking"],
    "data-display.md": ["ui-implementation", "data-modeling"],
    "iconography.md": ["ui-implementation"],
    "previews.md": ["ui-implementation"],
    "platform-design-languages.md": ["ui-implementation", "platform-integration"],
    "visual-hierarchy.md": ["ui-implementation"],
    "touch-click-targets.md": ["ui-implementation", "accessibility"],
    "state-design.md": ["ui-implementation", "data-modeling"],
    "dashboard-service-is-display-only.md": ["ui-implementation", "new-module"],
    # windows → ui
    "fluent-design.md": ["ui-implementation", "platform-integration"],
    "theming.md": ["ui-implementation", "platform-integration"],
    "high-dpi-display-scaling.md": ["ui-implementation", "accessibility"],
    "design-time-data.md": ["ui-implementation"],

    # === feature-management ===
    "feature-flags.md": ["feature-flags", "new-module"],
    "ab-testing.md": ["feature-flags", "logging"],
    "debug-mode.md": ["feature-flags", "logging"],

    # === concurrency ===
    "concurrency.md": ["concurrency", "performance-optimization"],
    "immutability.md": ["concurrency", "data-modeling"],

    # === internationalization ===
    "localization.md": ["internationalization", "ui-implementation"],
    "rtl-support.md": ["internationalization", "ui-implementation"],

    # === accessibility ===
    "accessibility.md": ["accessibility", "ui-implementation", "pre-pr"],
    "dynamic-type.md": ["accessibility", "ui-implementation"],
    "font-scaling.md": ["accessibility", "ui-implementation"],

    # === platform-integration ===
    "deep-linking.md": ["platform-integration", "configuration"],
    "notifications.md": ["platform-integration", "ui-implementation"],
    "background-tasks.md": ["platform-integration", "concurrency"],
    "search-integration.md": ["platform-integration"],
    "widgets-and-glanceable-surfaces.md": ["platform-integration", "ui-implementation"],
    "share-and-inter-app-data.md": ["platform-integration"],
    "handoff-and-continuity.md": ["platform-integration", "offline-support"],
    "shortcuts-and-automation.md": ["platform-integration", "configuration"],
    "prefer-explicit-apple-apis.md": ["platform-integration", "ui-implementation"],
    "msix-packaging.md": ["platform-integration", "pre-pr"],

    # === skills-and-agents ===
    "authoring-skills-and-rules.md": ["skill-authoring"],
    "performance.md": ["skill-authoring", "performance-optimization"],
    "agent-checklist.md": ["skill-authoring", "pre-pr"],
    "skill-checklist.md": ["skill-authoring", "pre-pr"],
    "rule-checklist.md": ["skill-authoring", "pre-pr"],
    "agent-structure-reference.md": ["skill-authoring"],
    "skill-structure-reference.md": ["skill-authoring"],
    "rule-structure-reference.md": ["skill-authoring"],

    # === recipe-quality (cookbook) ===
    "behavioral-requirements.md": ["recipe-authoring"],
    "completeness.md": ["recipe-authoring"],
    "cookbook-compliance.md": ["recipe-authoring"],
    "cross-recipe-consistency.md": ["recipe-authoring"],
    "source-fidelity.md": ["recipe-authoring"],
    "template-conformance.md": ["recipe-authoring"],
}


def add_triggers_to_file(path: Path, triggers: list[str]) -> bool:
    """Add triggers field to a guideline file. Returns True if modified."""
    text = path.read_text(encoding="utf-8")

    # Check if already has triggers
    if not text.startswith("---"):
        return False
    fm_end = text.index("---", 3)
    fm_text = text[3:fm_end]
    if "triggers:" in fm_text:
        return False

    # Build triggers YAML
    triggers_yaml = "triggers:\n" + "".join(f"  - {t}\n" for t in triggers)

    # Insert after approved-date line, or after last frontmatter field
    lines = text.split("\n")
    new_lines = []
    inserted = False
    in_frontmatter = False
    fm_boundary_count = 0

    for line in lines:
        if line.strip() == "---":
            fm_boundary_count += 1
            if fm_boundary_count == 1:
                in_frontmatter = True
            elif fm_boundary_count == 2:
                if not inserted:
                    # Insert before closing ---
                    new_lines.append(triggers_yaml.rstrip())
                    inserted = True
                in_frontmatter = False
        elif in_frontmatter and not inserted:
            if line.startswith("approved-date:"):
                new_lines.append(line)
                new_lines.append(triggers_yaml.rstrip())
                inserted = True
                continue

        new_lines.append(line)

    text = "\n".join(new_lines)

    # Bump patch version
    fm = yaml.safe_load(text[3:text.index("---", 3)]) or {}
    old_version = fm.get("version", "1.0.0")
    if isinstance(old_version, str) and "." in old_version:
        parts = old_version.split(".")
        parts[2] = str(int(parts[2]) + 1)
        new_version = ".".join(parts)
        text = text.replace(f"version: {old_version}", f"version: {new_version}", 1)
    else:
        new_version = old_version

    # Update modified date
    text = re.sub(r"modified: \d{4}-\d{2}-\d{2}", "modified: 2026-04-09", text, count=1)

    # Add change history row
    history_row = f"| {new_version} | 2026-04-09 | Mike Fullerton | Add trigger tags |"
    if "## Change History" in text:
        text = re.sub(
            r"(\|[-\s|]+\|)\n",
            r"\1\n" + history_row + "\n",
            text,
            count=1,
        )

    path.write_text(text, encoding="utf-8")
    return True


def main():
    skip_names = {"INDEX.md", "index.md", "references.md"}
    modified = 0
    skipped = 0
    missing = []

    for md_file in sorted(GUIDELINES_DIR.rglob("*.md")):
        if md_file.name in skip_names:
            continue

        if md_file.name not in TRIGGERS:
            missing.append(md_file.name)
            skipped += 1
            continue

        triggers = TRIGGERS[md_file.name]
        if add_triggers_to_file(md_file, triggers):
            modified += 1
        else:
            skipped += 1

    print(f"Modified: {modified}")
    print(f"Skipped (already had triggers or not in map): {skipped}")

    if missing:
        unique_missing = sorted(set(missing))
        print(f"\nMissing trigger mappings ({len(unique_missing)} unique):")
        for m in unique_missing:
            print(f"  {m}")


if __name__ == "__main__":
    main()
