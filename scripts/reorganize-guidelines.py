#!/usr/bin/env python3
"""Reorganize guidelines into use-case directories.

Pass 1: Copy each guideline into every use-case directory it belongs to.
Updates domain, generates new UUIDs for duplicates, bumps version, updates dates.
Removes old flat guideline files after all copies are made.
"""

import re
import shutil
import uuid
from pathlib import Path

# ── Use-case mapping ────────────────────────────────────────────────────────
# Key: relative path from repo root (e.g., "guidelines/security/input-validation.md")
# Value: list of use cases this guideline belongs to

USE_CASES = {
    # ── accessibility ──
    "guidelines/accessibility/accessibility.md": ["implementing", "reviewing"],

    # ── code-quality ──
    "guidelines/code-quality/atomic-commits.md": ["implementing", "shipping"],
    "guidelines/code-quality/bulk-operation-verification.md": ["reviewing", "shipping"],
    "guidelines/code-quality/linting.md": ["implementing", "testing"],
    "guidelines/code-quality/scope-discipline.md": ["planning", "implementing", "reviewing"],

    # ── codebase-decomposition ──
    "guidelines/codebase-decomposition/algorithmic-complexity.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/app-interactions.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/cross-cutting-detection.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/dependency-clusters.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/framework-conventions.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/interface-cohesion.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/lifecycle-patterns.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/module-boundaries.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/purpose-classification.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/runtime-conditions.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/system-dependencies.md": ["planning", "implementing"],
    "guidelines/codebase-decomposition/system-interactions.md": ["planning", "implementing"],

    # ── concurrency ──
    "guidelines/concurrency/concurrency.md": ["implementing"],
    "guidelines/concurrency/immutability.md": ["implementing", "testing"],

    # ── database-design ──
    "guidelines/database-design/access-pattern-analysis.md": ["planning", "implementing"],
    "guidelines/database-design/backup-and-recovery.md": ["implementing", "shipping"],
    "guidelines/database-design/clock-systems.md": ["planning", "implementing"],
    "guidelines/database-design/conflict-resolution.md": ["planning", "implementing"],
    "guidelines/database-design/constraints-and-validation.md": ["implementing"],
    "guidelines/database-design/data-types.md": ["implementing"],
    "guidelines/database-design/foreign-keys.md": ["implementing"],
    "guidelines/database-design/indexing.md": ["planning", "implementing"],
    "guidelines/database-design/json-columns.md": ["planning", "implementing"],
    "guidelines/database-design/naming-conventions.md": ["implementing"],
    "guidelines/database-design/normalization-and-denormalization.md": ["planning", "implementing"],
    "guidelines/database-design/offline-first-architecture.md": ["planning", "implementing"],
    "guidelines/database-design/primary-keys.md": ["planning", "implementing"],
    "guidelines/database-design/query-optimization.md": ["implementing", "reviewing"],
    "guidelines/database-design/relationships.md": ["planning", "implementing"],
    "guidelines/database-design/schema-evolution.md": ["implementing", "shipping"],
    "guidelines/database-design/sqlite-best-practices.md": ["planning", "implementing", "cookbook"],
    "guidelines/database-design/sync-engine-design.md": ["planning", "implementing"],
    "guidelines/database-design/sync-protocol.md": ["planning", "implementing"],
    "guidelines/database-design/sync-schema-design.md": ["planning", "implementing"],
    "guidelines/database-design/sync-tooling.md": ["planning", "implementing"],
    "guidelines/database-design/testing.md": ["testing"],
    "guidelines/database-design/transactions-and-concurrency.md": ["planning", "implementing"],

    # ── feature-management ──
    "guidelines/feature-management/ab-testing.md": ["implementing", "reviewing", "shipping"],
    "guidelines/feature-management/debug-mode.md": ["implementing", "testing"],
    "guidelines/feature-management/feature-flags.md": ["planning", "implementing", "shipping"],

    # ── internationalization ──
    "guidelines/internationalization/localization.md": ["implementing", "reviewing"],
    "guidelines/internationalization/rtl-support.md": ["implementing", "reviewing"],

    # ── language/csharp ──
    "guidelines/language/csharp/dependency-injection.md": ["implementing", "reviewing"],
    "guidelines/language/csharp/naming.md": ["implementing", "reviewing"],
    "guidelines/language/csharp/nullable-reference-types.md": ["implementing", "testing"],

    # ── language/kotlin ──
    "guidelines/language/kotlin/font-scaling.md": ["implementing", "testing"],

    # ── language/python ──
    "guidelines/language/python/dashboard-service-is-display-only.md": ["planning", "implementing"],
    "guidelines/language/python/database.md": ["planning", "implementing"],
    "guidelines/language/python/deterministic-ids.md": ["implementing"],
    "guidelines/language/python/file-paths.md": ["implementing", "reviewing"],
    "guidelines/language/python/no-external-dependencies-in-core-librari.md": ["implementing", "reviewing"],
    "guidelines/language/python/shell-scripts.md": ["implementing", "reviewing"],
    "guidelines/language/python/type-hints.md": ["implementing", "reviewing"],
    "guidelines/language/python/use-roadmaplib.md": ["implementing", "reviewing"],
    "guidelines/language/python/web-services.md": ["implementing"],
    "guidelines/language/python/yaml-frontmatter.md": ["implementing", "reviewing"],

    # ── language/swift ──
    "guidelines/language/swift/dynamic-type.md": ["implementing", "testing"],
    "guidelines/language/swift/prefer-explicit-apple-apis.md": ["implementing", "reviewing"],

    # ── logging ──
    "guidelines/logging/analytics.md": ["implementing", "reviewing"],
    "guidelines/logging/logging.md": ["implementing", "reviewing"],

    # ── networking ──
    "guidelines/networking/api-design.md": ["planning", "implementing"],
    "guidelines/networking/caching.md": ["planning", "implementing"],
    "guidelines/networking/error-responses.md": ["implementing"],
    "guidelines/networking/offline-and-connectivity.md": ["planning", "implementing"],
    "guidelines/networking/pagination.md": ["planning", "implementing"],
    "guidelines/networking/rate-limiting.md": ["implementing", "reviewing"],
    "guidelines/networking/real-time-communication.md": ["planning", "implementing"],
    "guidelines/networking/retry-and-resilience.md": ["implementing", "testing"],
    "guidelines/networking/timeouts.md": ["implementing", "reviewing"],

    # ── platform ──
    "guidelines/platform/background-tasks.md": ["implementing"],
    "guidelines/platform/deep-linking.md": ["implementing", "reviewing"],
    "guidelines/platform/handoff-and-continuity.md": ["implementing"],
    "guidelines/platform/notifications.md": ["implementing"],
    "guidelines/platform/search-integration.md": ["implementing"],
    "guidelines/platform/share-and-inter-app-data.md": ["implementing"],
    "guidelines/platform/shortcuts-and-automation.md": ["implementing"],
    "guidelines/platform/widgets-and-glanceable-surfaces.md": ["implementing"],

    # ── platform/windows ──
    "guidelines/platform/windows/architecture.md": ["planning", "implementing"],
    "guidelines/platform/windows/design-time-data.md": ["implementing", "testing"],
    "guidelines/platform/windows/fluent-design.md": ["implementing"],
    "guidelines/platform/windows/high-dpi-display-scaling.md": ["implementing", "testing"],
    "guidelines/platform/windows/msix-packaging.md": ["shipping"],
    "guidelines/platform/windows/theming.md": ["implementing"],

    # ── recipe-quality ──
    "guidelines/recipe-quality/behavioral-requirements.md": ["cookbook"],
    "guidelines/recipe-quality/completeness.md": ["cookbook"],
    "guidelines/recipe-quality/cookbook-compliance.md": ["cookbook"],
    "guidelines/recipe-quality/cross-recipe-consistency.md": ["cookbook"],
    "guidelines/recipe-quality/source-fidelity.md": ["cookbook"],
    "guidelines/recipe-quality/template-conformance.md": ["cookbook"],

    # ── security ──
    "guidelines/security/authentication.md": ["planning", "implementing", "reviewing"],
    "guidelines/security/authorization.md": ["implementing", "reviewing"],
    "guidelines/security/content-security-policy.md": ["implementing", "reviewing"],
    "guidelines/security/cors.md": ["implementing", "reviewing"],
    "guidelines/security/dependency-security.md": ["implementing", "reviewing", "shipping"],
    "guidelines/security/input-validation.md": ["implementing", "reviewing"],
    "guidelines/security/privacy.md": ["planning", "implementing", "reviewing"],
    "guidelines/security/secure-storage.md": ["implementing", "reviewing"],
    "guidelines/security/security-headers-checklist.md": ["implementing", "reviewing"],
    "guidelines/security/sensitive-data.md": ["implementing", "reviewing"],
    "guidelines/security/token-handling.md": ["implementing", "reviewing"],
    "guidelines/security/transport-security.md": ["implementing", "reviewing", "shipping"],

    # ── skills-and-agents ──
    "guidelines/skills-and-agents/agent-checklist.md": ["reviewing", "cookbook"],
    "guidelines/skills-and-agents/agent-structure-reference.md": ["implementing", "cookbook"],
    "guidelines/skills-and-agents/authoring-skills-and-rules.md": ["implementing", "cookbook"],
    "guidelines/skills-and-agents/performance.md": ["implementing", "reviewing"],
    "guidelines/skills-and-agents/rule-checklist.md": ["reviewing", "cookbook"],
    "guidelines/skills-and-agents/rule-structure-reference.md": ["implementing", "cookbook"],
    "guidelines/skills-and-agents/skill-checklist.md": ["reviewing", "cookbook"],
    "guidelines/skills-and-agents/skill-structure-reference.md": ["implementing", "cookbook"],

    # ── testing ──
    "guidelines/testing/flaky-test-prevention.md": ["testing", "reviewing"],
    "guidelines/testing/mutation-testing.md": ["testing"],
    "guidelines/testing/post-generation-verification.md": ["testing", "reviewing"],
    "guidelines/testing/properties-of-good-tests.md": ["testing", "cookbook"],
    "guidelines/testing/property-based-testing.md": ["testing", "implementing"],
    "guidelines/testing/security-testing.md": ["testing", "reviewing"],
    "guidelines/testing/test-data.md": ["testing", "implementing"],
    "guidelines/testing/test-doubles.md": ["testing", "implementing"],
    "guidelines/testing/test-pyramid.md": ["testing", "planning"],
    "guidelines/testing/testing.md": ["testing", "implementing"],
    "guidelines/testing/the-testing-workflow.md": ["testing", "cookbook"],
    "guidelines/testing/unit-test-patterns.md": ["testing", "implementing", "cookbook"],

    # ── ui ──
    "guidelines/ui/always-show-progress.md": ["implementing"],
    "guidelines/ui/animation-motion.md": ["implementing"],
    "guidelines/ui/color.md": ["implementing", "reviewing"],
    "guidelines/ui/data-display.md": ["planning", "implementing"],
    "guidelines/ui/feedback-patterns.md": ["implementing"],
    "guidelines/ui/form-design.md": ["implementing"],
    "guidelines/ui/iconography.md": ["implementing"],
    "guidelines/ui/layout.md": ["implementing"],
    "guidelines/ui/platform-design-languages.md": ["planning", "implementing", "cookbook"],
    "guidelines/ui/previews.md": ["implementing", "testing"],
    "guidelines/ui/spacing.md": ["implementing"],
    "guidelines/ui/state-design.md": ["implementing"],
    "guidelines/ui/touch-click-targets.md": ["implementing", "reviewing"],
    "guidelines/ui/typography.md": ["implementing"],
    "guidelines/ui/visual-hierarchy.md": ["implementing"],
}


def get_category_path(original_path: str) -> str:
    """Extract the category path from a guideline path.

    'guidelines/security/input-validation.md' -> 'security'
    'guidelines/language/python/type-hints.md' -> 'language/python'
    'guidelines/platform/windows/theming.md' -> 'platform/windows'
    """
    parts = original_path.replace("guidelines/", "").split("/")
    return "/".join(parts[:-1])


def update_frontmatter(text: str, new_domain: str, new_uuid: str, is_copy: bool) -> str:
    """Update frontmatter fields for the new location."""
    if not text.startswith("---"):
        return text

    end = text.index("---", 3)
    frontmatter = text[3:end]
    body = text[end + 3:]

    # Update domain
    frontmatter = re.sub(
        r"domain: agentic-cookbook://guidelines/\S+",
        f"domain: {new_domain}",
        frontmatter,
    )

    # Update UUID for copies (not the first/primary location)
    if is_copy:
        frontmatter = re.sub(
            r'id: [0-9a-fA-F-]+',
            f"id: {new_uuid}",
            frontmatter,
        )

    # Bump patch version
    version_match = re.search(r"version: (\d+)\.(\d+)\.(\d+)", frontmatter)
    if version_match:
        major, minor, patch = version_match.groups()
        new_version = f"{major}.{minor}.{int(patch) + 1}"
        frontmatter = frontmatter.replace(
            f"version: {version_match.group(1)}.{version_match.group(2)}.{version_match.group(3)}",
            f"version: {new_version}",
        )
    else:
        new_version = None

    # Update modified date
    frontmatter = re.sub(
        r"modified: \d{4}-\d{2}-\d{2}",
        "modified: 2026-04-09",
        frontmatter,
    )

    # Add change history row
    if new_version and "## Change History" in body:
        history_row = f"| {new_version} | 2026-04-09 | Mike Fullerton | Reorganize into use-case directory |"
        body = re.sub(
            r"(\|[-\s|]+\|)\n",
            r"\1\n" + history_row + "\n",
            body,
            count=1,
        )

    return f"---\n{frontmatter}---{body}"


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent
    guidelines_dir = repo_root / "guidelines"

    # Verify all mapped files exist
    missing = []
    for path in USE_CASES:
        if not (repo_root / path).exists():
            missing.append(path)
    if missing:
        print(f"ERROR: {len(missing)} files in mapping don't exist:")
        for m in missing:
            print(f"  {m}")
        return

    # Check for unmapped files
    skip_names = {"INDEX.md", "index.md", "references.md"}
    all_guidelines = set()
    for md_file in guidelines_dir.rglob("*.md"):
        if md_file.name in skip_names:
            continue
        rel = str(md_file.relative_to(repo_root))
        all_guidelines.add(rel)

    unmapped = all_guidelines - set(USE_CASES.keys())
    if unmapped:
        print(f"WARNING: {len(unmapped)} files not in mapping:")
        for u in sorted(unmapped):
            print(f"  {u}")
        return

    # Track which file gets its original UUID (first use case alphabetically)
    first_use_case: dict[str, str] = {}
    for path, use_cases in USE_CASES.items():
        first_use_case[path] = sorted(use_cases)[0]

    # Create use-case directories and copy files
    counts: dict[str, int] = {}
    created_files: list[str] = []

    for original_path, use_cases in sorted(USE_CASES.items()):
        category = get_category_path(original_path)
        filename = Path(original_path).name
        text = (repo_root / original_path).read_text(encoding="utf-8")

        for use_case in sorted(use_cases):
            dest_dir = guidelines_dir / use_case / category
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest_file = dest_dir / filename

            # Build new domain
            new_rel = f"guidelines/{use_case}/{category}/{filename}".replace(".md", "")
            new_domain = f"agentic-cookbook://{new_rel}"

            is_copy = use_case != first_use_case[original_path]
            new_uuid = str(uuid.uuid4()) if is_copy else ""

            updated_text = update_frontmatter(text, new_domain, new_uuid, is_copy)
            dest_file.write_text(updated_text, encoding="utf-8")

            counts[use_case] = counts.get(use_case, 0) + 1
            created_files.append(str(dest_file.relative_to(repo_root)))

    # Remove old flat files (only files that are NOT inside a use-case directory)
    use_case_names = {"planning", "implementing", "testing", "reviewing", "shipping", "cookbook"}
    removed = 0
    for original_path in sorted(USE_CASES.keys()):
        old_file = repo_root / original_path
        # Only remove if the file's parent directory is not a use-case directory
        parts = original_path.replace("guidelines/", "").split("/")
        if parts[0] not in use_case_names and old_file.exists():
            old_file.unlink()
            removed += 1

    # Remove empty old category directories
    for d in sorted(guidelines_dir.iterdir(), reverse=True):
        if d.is_dir() and d.name not in use_case_names and d.name not in ("INDEX.md",):
            try:
                # Remove recursively if only contains non-.md files (like .DS_Store) or is empty
                remaining_md = list(d.rglob("*.md"))
                if not remaining_md:
                    shutil.rmtree(d)
            except OSError:
                pass

    # Summary
    print("=== Reorganization Complete ===\n")
    print(f"Total files created: {len(created_files)}")
    print(f"Old files removed: {removed}\n")
    print("Per use case:")
    for uc in sorted(counts):
        print(f"  {uc}: {counts[uc]} guidelines")
    print(f"\nTotal (with duplicates): {sum(counts.values())}")
    print(f"Unique guidelines: {len(USE_CASES)}")


if __name__ == "__main__":
    main()
