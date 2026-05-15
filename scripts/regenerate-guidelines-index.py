#!/usr/bin/env python3
"""Regenerate cookbook/guidelines/INDEX.md from the actual file structure."""

import re
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
COOKBOOK_ROOT = REPO_ROOT / "cookbook"
GUIDELINES_DIR = COOKBOOK_ROOT / "guidelines"
INDEX_PATH = GUIDELINES_DIR / "INDEX.md"

USE_CASE_ORDER = ["planning", "implementing", "testing", "reviewing", "shipping", "cookbook"]
USE_CASE_DESCRIPTIONS = {
    "planning": "Architecture, data modeling, choosing patterns",
    "implementing": "Writing new code",
    "testing": "Writing and structuring tests",
    "reviewing": "Checking code quality, security, accessibility",
    "shipping": "Pre-commit, pre-PR, packaging",
    "cookbook": "Writing cookbook content (recipes, skills, agents)",
}


def parse_title(path):
    """Extract title from frontmatter."""
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return path.stem.replace("-", " ").title()
    try:
        end = text.index("---", 3)
        fm = yaml.safe_load(text[3:end]) or {}
        return fm.get("title", path.stem.replace("-", " ").title())
    except Exception:
        return path.stem.replace("-", " ").title()


def collect_use_case(uc_dir):
    """Collect all guidelines in a use case, grouped by category or flat."""
    categories = {}
    flat_files = []

    for item in sorted(uc_dir.iterdir()):
        if item.is_dir():
            cat_name = item.name
            files = []
            for md in sorted(item.rglob("*.md")):
                if md.name in ("index.md", "INDEX.md", "references.md"):
                    continue
                title = parse_title(md)
                rel_path = md.relative_to(GUIDELINES_DIR)
                files.append((title, str(rel_path)))
            if files:
                categories[cat_name] = files
        elif item.is_file() and item.suffix == ".md" and item.name not in ("index.md", "INDEX.md", "references.md"):
            title = parse_title(item)
            rel_path = item.relative_to(GUIDELINES_DIR)
            flat_files.append((title, str(rel_path)))

    return categories, flat_files


def main():
    # Read existing frontmatter
    existing = INDEX_PATH.read_text(encoding="utf-8")
    fm_end = existing.index("---", 3) + 3
    frontmatter = existing[3:fm_end - 3]

    # Bump version
    fm_data = yaml.safe_load(frontmatter)
    old_version = fm_data.get("version", "2.1.0")
    parts = old_version.split(".")
    parts[1] = str(int(parts[1]) + 1)
    parts[2] = "0"
    new_version = ".".join(parts)

    frontmatter = frontmatter.replace(f"version: {old_version}", f"version: {new_version}")
    frontmatter = re.sub(r"modified: \d{4}-\d{2}-\d{2}", "modified: 2026-04-09", frontmatter)

    # Count totals
    total_with_dupes = 0
    counts = {}
    for uc in USE_CASE_ORDER:
        uc_dir = GUIDELINES_DIR / uc
        if not uc_dir.is_dir():
            continue
        count = sum(1 for f in uc_dir.rglob("*.md")
                    if f.name not in ("index.md", "INDEX.md", "references.md"))
        counts[uc] = count
        total_with_dupes += count

    # Count unique
    seen = set()
    for f in GUIDELINES_DIR.rglob("*.md"):
        if f.name not in ("index.md", "INDEX.md", "references.md"):
            seen.add(f.name)
    unique = len(seen)

    # Build output
    lines = [f"---\n{frontmatter}---\n"]
    lines.append("# Guidelines Index\n")
    lines.append("Guidelines are organized by **use case** — the phase of work where they apply. "
                 "Guidelines that apply to multiple use cases are duplicated into each so the agent "
                 "gets everything it needs by reading one directory.\n")

    # Summary table
    lines.append("| Use Case | Guidelines | When to use |")
    lines.append("|----------|-----------|-------------|")
    for uc in USE_CASE_ORDER:
        c = counts.get(uc, 0)
        anchor = f"{uc}-{c}-guidelines"
        desc = USE_CASE_DESCRIPTIONS[uc]
        lines.append(f"| [{uc.title()}](#{anchor}) | {c} | {desc} |")
    lines.append(f"\n{unique} unique guidelines, {total_with_dupes} total (with duplicates across use cases).\n")

    # Each use case section
    for uc in USE_CASE_ORDER:
        uc_dir = GUIDELINES_DIR / uc
        if not uc_dir.is_dir():
            continue
        c = counts[uc]
        lines.append("---\n")
        lines.append(f"### {uc.title()} ({c} guidelines)\n")

        categories, flat_files = collect_use_case(uc_dir)

        # Print flat files first (for shipping/testing)
        for title, rel_path in flat_files:
            lines.append(f"- [{title}]({rel_path})")

        # Then categories
        for cat_name in sorted(categories.keys()):
            files = categories[cat_name]
            lines.append(f"\n**{cat_name}**")
            for title, rel_path in files:
                lines.append(f"- [{title}]({rel_path})")

        lines.append("")

    # Change history
    lines.append("---\n")
    lines.append("## Change History\n")
    lines.append("| Version | Date | Author | Summary |")
    lines.append("|---------|------|--------|---------|")
    lines.append(f"| {new_version} | 2026-04-09 | Mike Fullerton | "
                 "Recategorize: 20→12 categories, dissolve language/platform, flatten shipping/testing |")
    lines.append("| 2.1.0 | 2026-04-09 | Mike Fullerton | Pass 2: tailor guidelines to use cases, update counts (140 unique, 232 total) |")
    lines.append("| 2.0.0 | 2026-04-09 | Mike Fullerton | Reorganize by use case (planning, implementing, testing, reviewing, shipping, cookbook) |")
    lines.append("| 1.1.0 | 2026-04-04 | Mike Fullerton | Add database-design category with SQLite best practices |")
    lines.append("| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |")
    lines.append("")

    INDEX_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Regenerated {INDEX_PATH}")
    print(f"  Version: {old_version} → {new_version}")
    print(f"  {unique} unique, {total_with_dupes} total")


if __name__ == "__main__":
    main()
