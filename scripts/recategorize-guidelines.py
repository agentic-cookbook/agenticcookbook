#!/usr/bin/env python3
"""
Recategorize guidelines: 20 categories → 12.

Operations:
1. Rename categories: database-design→data, logging→observability, platform→platform-integration
2. Dissolve language/* into domain categories
3. Dissolve platform/windows/* into ui/ and code-quality/
4. Merge codebase-decomposition into code-quality
5. Flatten shipping/ and testing/ (remove subdirectory nesting)
6. Update all frontmatter: domain fields, add languages field where applicable
7. Update cross-references in all .md files (guidelines + compliance + workflows + etc.)
"""

import re
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
GUIDELINES_DIR = REPO_ROOT / "guidelines"

# --- Phase 1: Category renames (applied to all use cases) ---
# Maps old category dir name → new category dir name
CATEGORY_RENAMES = {
    "database-design": "data",
    "logging": "observability",
}

# platform/ (non-windows) → platform-integration/
# This is a rename at the use-case level, e.g.
#   implementing/platform/deep-linking.md → implementing/platform-integration/deep-linking.md
# But platform/windows/* files go elsewhere (Phase 3), so we handle those separately.

# --- Phase 2: Dissolve language/* into domain categories ---
# Maps (language-subdir, filename) → target domain category
LANGUAGE_RECLASSIFY = {
    # Python
    ("python", "type-hints.md"): "code-quality",
    ("python", "database.md"): "data",
    ("python", "web-services.md"): "networking",
    ("python", "file-paths.md"): "code-quality",
    ("python", "yaml-frontmatter.md"): "code-quality",
    ("python", "shell-scripts.md"): "code-quality",
    ("python", "deterministic-ids.md"): "data",
    ("python", "no-external-dependencies-in-core-librari.md"): "code-quality",
    ("python", "use-roadmaplib.md"): "code-quality",
    ("python", "dashboard-service-is-display-only.md"): "ui",
    # Swift
    ("swift", "dynamic-type.md"): "accessibility",
    ("swift", "prefer-explicit-apple-apis.md"): "platform-integration",
    # Kotlin
    ("kotlin", "font-scaling.md"): "accessibility",
    # C#
    ("csharp", "dependency-injection.md"): "code-quality",
    ("csharp", "naming.md"): "code-quality",
    ("csharp", "nullable-reference-types.md"): "code-quality",
}

# --- Phase 3: Dissolve platform/windows/* ---
WINDOWS_RECLASSIFY = {
    "fluent-design.md": "ui",
    "theming.md": "ui",
    "high-dpi-display-scaling.md": "ui",
    "design-time-data.md": "ui",
    "architecture.md": "code-quality",
    "msix-packaging.md": "platform-integration",
}

# --- Language tag for reclassified files ---
# When a language/* file moves to a domain category, record its language
LANGUAGE_TAG = {
    "python": "python",
    "swift": "swift",
    "kotlin": "kotlin",
    "csharp": "csharp",
}


def compute_moves():
    """Compute all file moves as (old_path, new_path) tuples."""
    moves = []

    for md_file in sorted(GUIDELINES_DIR.rglob("*.md")):
        if md_file.name in ("index.md", "INDEX.md", "references.md"):
            continue

        rel = md_file.relative_to(GUIDELINES_DIR)
        parts = list(rel.parts)

        # parts[0] = use case (implementing, planning, etc.)
        if len(parts) < 2:
            continue

        use_case = parts[0]

        # --- Language dissolution ---
        if len(parts) >= 4 and parts[1] == "language":
            lang_subdir = parts[2]  # python, swift, etc.
            filename = parts[3]
            key = (lang_subdir, filename)
            if key in LANGUAGE_RECLASSIFY:
                target_cat = LANGUAGE_RECLASSIFY[key]
                new_rel = Path(use_case) / target_cat / filename
                moves.append((md_file, GUIDELINES_DIR / new_rel, lang_subdir))
            else:
                print(f"  WARNING: No reclassification for language/{lang_subdir}/{filename}")
            continue

        # --- Windows dissolution ---
        if len(parts) >= 4 and parts[1] == "platform" and parts[2] == "windows":
            filename = parts[3]
            if filename in WINDOWS_RECLASSIFY:
                target_cat = WINDOWS_RECLASSIFY[filename]
                new_rel = Path(use_case) / target_cat / filename
                moves.append((md_file, GUIDELINES_DIR / new_rel, None))
            else:
                print(f"  WARNING: No reclassification for platform/windows/{filename}")
            continue

        # --- Platform (non-windows) rename to platform-integration ---
        if len(parts) >= 2 and parts[1] == "platform":
            # Only rename if it's a direct file under platform/ (not windows subdir)
            if len(parts) == 3:  # use-case/platform/file.md
                new_rel = Path(use_case) / "platform-integration" / parts[2]
                moves.append((md_file, GUIDELINES_DIR / new_rel, None))
                continue

        # --- Category renames (database-design→data, logging→observability) ---
        if len(parts) >= 2 and parts[1] in CATEGORY_RENAMES:
            new_cat = CATEGORY_RENAMES[parts[1]]
            new_parts = [parts[0], new_cat] + parts[2:]
            new_rel = Path(*new_parts)
            moves.append((md_file, GUIDELINES_DIR / new_rel, None))
            continue

        # --- Codebase-decomposition → code-quality ---
        if len(parts) >= 2 and parts[1] == "codebase-decomposition":
            new_parts = [parts[0], "code-quality"] + parts[2:]
            new_rel = Path(*new_parts)
            moves.append((md_file, GUIDELINES_DIR / new_rel, None))
            continue

    return moves


def flatten_moves(use_cases):
    """Compute moves for flattening shipping/ and testing/ (remove category subdirs)."""
    # Filename conflict resolution: when two files have the same name,
    # prefix with the category to disambiguate
    FLATTEN_RENAMES = {
        # testing/data/testing.md conflicts with testing/testing/testing.md
        ("testing", "data", "testing.md"): "database-testing.md",
    }

    moves = []
    # Track targets to detect conflicts
    targets = {}  # uc → {filename → source_path}

    for uc in use_cases:
        uc_dir = GUIDELINES_DIR / uc
        targets[uc] = {}
        for md_file in sorted(uc_dir.rglob("*.md")):
            if md_file.name in ("index.md", "INDEX.md", "references.md"):
                continue
            rel = md_file.relative_to(uc_dir)
            # If already flat (just filename), skip
            if len(rel.parts) == 1:
                continue

            # Check for explicit rename
            cat = rel.parts[0] if len(rel.parts) >= 2 else ""
            rename_key = (uc, cat, md_file.name)
            target_name = FLATTEN_RENAMES.get(rename_key, md_file.name)

            new_path = uc_dir / target_name
            if target_name in targets[uc]:
                print(f"  CONFLICT: {md_file} → {new_path} (already claimed by {targets[uc][target_name]})")
                continue
            targets[uc][target_name] = md_file
            moves.append((md_file, new_path, None))
    return moves


def build_domain_map(all_moves):
    """Build old_domain → new_domain mapping for cross-reference updates."""
    domain_map = {}
    for old_path, new_path, _lang in all_moves:
        old_rel = old_path.relative_to(REPO_ROOT)
        new_rel = new_path.relative_to(REPO_ROOT)
        # Domain is path without .md extension
        old_domain = f"agentic-cookbook://{str(old_rel).replace('.md', '')}"
        new_domain = f"agentic-cookbook://{str(new_rel).replace('.md', '')}"
        if old_domain != new_domain:
            domain_map[old_domain] = new_domain

    # Also add short-form path references (without agentic-cookbook://)
    path_map = {}
    for old_path, new_path, _lang in all_moves:
        old_rel = str(old_path.relative_to(REPO_ROOT))
        new_rel = str(new_path.relative_to(REPO_ROOT))
        if old_rel != new_rel:
            path_map[old_rel] = new_rel
            # Also without guidelines/ prefix (some related: fields use this)
            old_short = old_rel.replace("guidelines/", "", 1) if old_rel.startswith("guidelines/") else old_rel
            new_short = new_rel.replace("guidelines/", "", 1) if new_rel.startswith("guidelines/") else new_rel
            if old_short != new_short:
                path_map[old_short] = new_short

    # Category-level domain renames for non-use-case references
    # e.g. agentic-cookbook://guidelines/database-design/X → agentic-cookbook://guidelines/data/X
    # These catch references that don't include the use-case prefix
    category_map = {
        "guidelines/database-design/": "guidelines/data/",
        "guidelines/logging/": "guidelines/observability/",
        "guidelines/codebase-decomposition/": "guidelines/code-quality/",
    }

    return domain_map, path_map, category_map


def update_frontmatter_domain(content, old_path, new_path):
    """Update the domain: field in frontmatter to match new path."""
    old_rel = str(old_path.relative_to(REPO_ROOT)).replace(".md", "")
    new_rel = str(new_path.relative_to(REPO_ROOT)).replace(".md", "")
    old_domain = f"agentic-cookbook://{old_rel}"
    new_domain = f"agentic-cookbook://{new_rel}"
    return content.replace(old_domain, new_domain)


def add_languages_field(content, lang):
    """Add languages: field to frontmatter after platforms: block."""
    if "languages:" in content.split("---")[1] if content.startswith("---") else "":
        return content  # Already has it

    lang_yaml = f"languages:\n  - {lang}"

    # Insert after the platforms block (after last platform entry before tags:)
    # Find the end of platforms section
    lines = content.split("\n")
    new_lines = []
    in_platforms = False
    inserted = False
    for i, line in enumerate(lines):
        new_lines.append(line)
        if line.startswith("platforms:"):
            in_platforms = True
        elif in_platforms and not line.startswith("  - "):
            # We've left the platforms block, insert languages before this line
            new_lines.insert(-1, lang_yaml)
            in_platforms = False
            inserted = True
    if not inserted:
        # Fallback: insert before tags:
        new_lines2 = []
        for line in new_lines:
            if line.startswith("tags:"):
                new_lines2.append(lang_yaml)
            new_lines2.append(line)
        new_lines = new_lines2

    return "\n".join(new_lines)


def update_cross_references(content, domain_map, path_map, category_map):
    """Update all cross-references in file content."""
    # Sort by length descending to avoid partial matches
    for old, new in sorted(domain_map.items(), key=lambda x: len(x[0]), reverse=True):
        content = content.replace(old, new)

    for old, new in sorted(path_map.items(), key=lambda x: len(x[0]), reverse=True):
        content = content.replace(old, new)

    # Category-level renames for bare references (no use-case prefix)
    for old_prefix, new_prefix in category_map.items():
        content = content.replace(old_prefix, new_prefix)

    return content


def execute_moves(moves, dry_run=False):
    """Execute all file moves."""
    moved = 0
    for old_path, new_path, lang in moves:
        if old_path == new_path:
            continue

        if dry_run:
            print(f"  MOVE: {old_path.relative_to(REPO_ROOT)} → {new_path.relative_to(REPO_ROOT)}")
            moved += 1
            continue

        # Ensure target directory exists
        new_path.parent.mkdir(parents=True, exist_ok=True)

        # Read content, update domain, optionally add languages field
        content = old_path.read_text(encoding="utf-8")
        content = update_frontmatter_domain(content, old_path, new_path)

        if lang:
            content = add_languages_field(content, lang)

        # Write to new location
        new_path.write_text(content, encoding="utf-8")

        # Remove old file
        old_path.unlink()

        old_rel = old_path.relative_to(REPO_ROOT)
        new_rel = new_path.relative_to(REPO_ROOT)
        print(f"  {old_rel} → {new_rel}")
        moved += 1

    return moved


def cleanup_empty_dirs():
    """Remove empty directories under guidelines/."""
    removed = []
    for d in sorted(GUIDELINES_DIR.rglob("*"), reverse=True):
        if d.is_dir() and not any(d.iterdir()):
            d.rmdir()
            removed.append(str(d.relative_to(REPO_ROOT)))
    return removed


def update_all_references(domain_map, path_map, category_map, dry_run=False):
    """Update cross-references in ALL .md files in the repo."""
    updated = 0
    for md_file in sorted(REPO_ROOT.rglob("*.md")):
        # Skip files in .git
        if ".git" in md_file.parts:
            continue

        content = md_file.read_text(encoding="utf-8")
        new_content = update_cross_references(content, domain_map, path_map, category_map)

        if content != new_content:
            if dry_run:
                print(f"  REFS: {md_file.relative_to(REPO_ROOT)}")
            else:
                md_file.write_text(new_content, encoding="utf-8")
                print(f"  refs: {md_file.relative_to(REPO_ROOT)}")
            updated += 1

    return updated


def main():
    dry_run = "--dry-run" in sys.argv

    if dry_run:
        print("=== DRY RUN ===\n")

    # Phase 1-4: Compute all category/dissolution/merge moves
    print("Phase 1-4: Computing category moves...")
    cat_moves = compute_moves()
    print(f"  {len(cat_moves)} files to move")

    # Phase 5: Flatten shipping/ and testing/
    # But first, apply Phase 1-4 moves so we flatten the already-renamed dirs
    # Actually, flattening operates on the final state, so we need to compute
    # these AFTER executing the category moves. For dry-run we'll compute both.
    print("\nPhase 5: Computing flatten moves...")
    # For flatten, we need the post-move state. In dry-run, estimate.
    flatten_mvs = flatten_moves(["shipping", "testing"])
    print(f"  {len(flatten_mvs)} files to flatten")

    # Build reference map from ALL moves
    all_moves = cat_moves + flatten_mvs
    domain_map, path_map, category_map = build_domain_map(all_moves)

    if dry_run:
        print("\n--- Category/dissolution moves ---")
        execute_moves(cat_moves, dry_run=True)
        print("\n--- Flatten moves ---")
        execute_moves(flatten_mvs, dry_run=True)
        print("\n--- Reference updates ---")
        update_all_references(domain_map, path_map, category_map, dry_run=True)
        print(f"\nDomain mappings: {len(domain_map)}")
        print(f"Path mappings: {len(path_map)}")
        return

    # Execute Phase 1-4
    print("\nExecuting category moves...")
    moved1 = execute_moves(cat_moves)
    print(f"  Moved {moved1} files")

    # Re-compute flatten moves after category renames applied
    print("\nComputing post-rename flatten moves...")
    flatten_mvs = flatten_moves(["shipping", "testing"])

    # Rebuild reference maps with updated flatten paths
    all_moves_final = cat_moves + flatten_mvs
    domain_map, path_map, category_map = build_domain_map(all_moves_final)

    print("\nExecuting flatten moves...")
    moved2 = execute_moves(flatten_mvs)
    print(f"  Flattened {moved2} files")

    # Cleanup empty directories
    print("\nCleaning up empty directories...")
    removed = cleanup_empty_dirs()
    for d in removed:
        print(f"  rmdir: {d}")

    # Phase 6-7: Update all cross-references
    print("\nUpdating cross-references...")
    updated = update_all_references(domain_map, path_map, category_map)
    print(f"  Updated {updated} files")

    # Summary
    total_unique = 0
    total_with_dupes = 0
    for uc_dir in sorted(GUIDELINES_DIR.iterdir()):
        if not uc_dir.is_dir():
            continue
        count = sum(1 for f in uc_dir.rglob("*.md")
                    if f.name not in ("index.md", "INDEX.md", "references.md"))
        print(f"  {uc_dir.name}: {count} files")
        total_with_dupes += count

    print(f"\n  Total (with use-case duplicates): {total_with_dupes}")

    # Count unique by filename
    seen = set()
    for f in GUIDELINES_DIR.rglob("*.md"):
        if f.name not in ("index.md", "INDEX.md", "references.md"):
            seen.add(f.name)
    print(f"  Unique guidelines: {len(seen)}")

    # List final categories
    print("\nFinal categories per use case:")
    for uc_dir in sorted(GUIDELINES_DIR.iterdir()):
        if not uc_dir.is_dir():
            continue
        cats = sorted(d.name for d in uc_dir.iterdir() if d.is_dir())
        flat_count = sum(1 for f in uc_dir.iterdir() if f.is_file() and f.suffix == ".md" and f.name not in ("index.md", "INDEX.md"))
        if cats:
            print(f"  {uc_dir.name}: {', '.join(cats)}")
        if flat_count:
            print(f"  {uc_dir.name}: {flat_count} flat files")


if __name__ == "__main__":
    main()
