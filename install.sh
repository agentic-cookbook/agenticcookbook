#!/usr/bin/env bash
# Install the `cookbook` CLI and Claude Code skill globally for the current user.
#
# - Materializes scripts/cookbook/references/ from reference-manifest.json
#   (bundles cookbook content into the script so it's self-contained at runtime).
# - Copies the Python package to ~/.local/bin/_cookbook_pkg/
# - Writes a shim at ~/.local/bin/cookbook that runs `python3 -m cookbook`
# - Installs the skill at ~/.claude/skills/cookbook/SKILL.md
# - Installs Python deps (rich, questionary, pyyaml) via `pip --user`
#
# Idempotent. Re-run to refresh after edits.
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "$0")" && pwd)"
BIN_DIR="${HOME}/.local/bin"
PKG_DIR="${BIN_DIR}/_cookbook_pkg"
SKILLS_DIR="${HOME}/.claude/skills/cookbook"
MANIFEST="${REPO_ROOT}/scripts/cookbook/reference-manifest.json"
PKG_SRC="${REPO_ROOT}/scripts/cookbook"

color() { printf '\033[1;%sm%s\033[0m\n' "$1" "$2"; }
title() { printf '\n'; color 36 "› $*"; }
ok()    { color 32 "✓ $*"; }
warn()  { color 33 "! $*"; }
err()   { color 31 "✗ $*" >&2; }

# 1. Python ≥ 3.9
title "Checking Python"
if ! command -v python3 >/dev/null 2>&1; then
    err "python3 not found on PATH. Install Python 3.9+ and retry."
    exit 1
fi
python3 - <<'PY' || { err "Python 3.9+ required."; exit 1; }
import sys
sys.exit(0 if sys.version_info >= (3, 9) else 1)
PY
ok "$(python3 --version)"

# 2. Ensure ~/.local/bin exists and warn if not on PATH
mkdir -p "${BIN_DIR}"
case ":${PATH}:" in
    *":${BIN_DIR}:"*) ;;
    *) warn "${BIN_DIR} is not on \$PATH. Add it to your shell profile." ;;
esac

# 3. Materialize references/ from manifest
title "Materializing references"
python3 - "$REPO_ROOT" "$MANIFEST" <<'PY'
import json, shutil, sys
from pathlib import Path

repo_root = Path(sys.argv[1])
manifest = json.loads(Path(sys.argv[2]).read_text())

dest = repo_root / manifest["destination"]
source_root = (repo_root / "scripts/cookbook" / manifest["source_root"]).resolve()

# Wipe everything in dest except .gitkeep
if dest.exists():
    for child in dest.iterdir():
        if child.name == ".gitkeep":
            continue
        if child.is_dir():
            shutil.rmtree(child)
        else:
            child.unlink()
else:
    dest.mkdir(parents=True)

for entry in manifest.get("files", []):
    src = (source_root / entry["src"]).resolve()
    dst = dest / entry["dst"]
    dst.parent.mkdir(parents=True, exist_ok=True)
    if entry["type"] == "file":
        if not src.is_file():
            print(f"  MISSING file: {src}", file=sys.stderr)
            sys.exit(1)
        shutil.copy2(src, dst)
        print(f"  + {entry['dst']}")
    elif entry["type"] == "tree":
        if not src.is_dir():
            print(f"  MISSING dir: {src}", file=sys.stderr)
            sys.exit(1)
        include = entry.get("include", "*")
        dst.mkdir(parents=True, exist_ok=True)
        for f in src.rglob(include):
            if f.is_file():
                rel = f.relative_to(src)
                target = dst / rel
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, target)
        print(f"  + {entry['dst']}/ (tree)")
    else:
        print(f"  unknown entry type: {entry['type']}", file=sys.stderr)
        sys.exit(1)

embedded = manifest.get("embedded_dir")
if embedded:
    embedded_src = repo_root / "scripts/cookbook" / embedded
    if embedded_src.is_dir():
        for f in embedded_src.rglob("*"):
            if f.is_file():
                rel = f.relative_to(embedded_src)
                target = dest / rel
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, target)
        print(f"  + (overlay) {embedded}")
PY
ok "references materialized"

# 4. Install package to ~/.local/bin/_cookbook_pkg
title "Installing package"
rm -rf "${PKG_DIR}"
mkdir -p "${PKG_DIR}"
# Copy only what we want to ship: the cookbook package, references, manifest, README.
cp -R "${PKG_SRC}/cookbook" "${PKG_DIR}/"
cp -R "${PKG_SRC}/references" "${PKG_DIR}/"
cp "${PKG_SRC}/reference-manifest.json" "${PKG_DIR}/"
# Stamp the source path so `cookbook self update` can re-run install.sh from here.
printf '%s\n' "${REPO_ROOT}" > "${PKG_DIR}/.install_source"
ok "package → ${PKG_DIR}"

# 5. Write the shim
title "Installing shim"
cat > "${BIN_DIR}/cookbook" <<EOF
#!/usr/bin/env bash
export PYTHONPATH="${PKG_DIR}:\${PYTHONPATH:-}"
exec python3 -m cookbook "\$@"
EOF
chmod +x "${BIN_DIR}/cookbook"
ok "shim → ${BIN_DIR}/cookbook"

# 6. Install Python deps (user-level)
title "Installing Python deps"
if python3 -m pip install --user --upgrade --quiet rich questionary pyyaml; then
    ok "rich, questionary, pyyaml installed"
else
    warn "pip install failed. Modules that need these will surface a clean error."
    warn "Retry manually: python3 -m pip install --user rich questionary pyyaml"
fi

# 7. Install skill
title "Installing skill"
mkdir -p "${SKILLS_DIR}"
cp "${REPO_ROOT}/skills/cookbook/SKILL.md" "${SKILLS_DIR}/"
ok "skill → ${SKILLS_DIR}/SKILL.md"

# 8. Verify
title "Verifying"
if "${BIN_DIR}/cookbook" --version >/dev/null 2>&1; then
    ok "$(${BIN_DIR}/cookbook --version)"
else
    warn "cookbook --version did not return cleanly. Check the install log above."
fi

title "Done"
ok "Run: cookbook --help"
warn "If you just added ${BIN_DIR} to your PATH, open a new shell."
warn "Restart your Claude Code session to pick up the new skill."
