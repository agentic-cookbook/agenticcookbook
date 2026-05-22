#!/usr/bin/env bash
# Install the `cookbook` CLI and Claude Code plugin globally for the current user.
#
# - Materializes scripts/cookbook/references/ from reference-manifest.json
#   (bundles cookbook content into the script so it's self-contained at runtime).
# - Copies the Python package to ~/.local/bin/_cookbook_pkg/
# - Writes a shim at ~/.local/bin/cookbook that runs `python3 -m cookbook`
# - Assembles ./plugins/cookbook/skills/ from ./skills/ (every top-level
#   skill directory becomes a plugin-namespaced skill: invokable by Claude
#   via the Skill tool as cookbook:<name> and by the user as /cookbook:<name>).
# - Registers the repo as a local directory marketplace ("agenticcookbook")
#   with Claude Code and enables the cookbook plugin.
# - Installs Python deps (rich, questionary, pyyaml) via `pip --user`
#
# Idempotent. Re-run to refresh after edits.
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "$0")" && pwd)"
BIN_DIR="${HOME}/.local/bin"
PKG_DIR="${BIN_DIR}/_cookbook_pkg"
LEGACY_SKILL_DIR="${HOME}/.claude/skills/cookbook"
PLUGIN_DIR="${REPO_ROOT}/plugins/cookbook"
PLUGIN_SKILLS_DIR="${PLUGIN_DIR}/skills"
SKILLS_SRC="${REPO_ROOT}/skills"
MARKETPLACE_NAME="agenticcookbook"
PLUGIN_NAME="cookbook"
CLAUDE_DIR="${HOME}/.claude"
KNOWN_MARKETPLACES="${CLAUDE_DIR}/plugins/known_marketplaces.json"
CLAUDE_SETTINGS="${CLAUDE_DIR}/settings.json"
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

# 7. Assemble the plugin: copy ./skills/<name>/ → ./plugins/cookbook/skills/<name>/
title "Assembling plugin"
if [ ! -d "${SKILLS_SRC}" ]; then
    err "missing ${SKILLS_SRC} — nothing to assemble."
    exit 1
fi
rm -rf "${PLUGIN_SKILLS_DIR}"
mkdir -p "${PLUGIN_SKILLS_DIR}"
assembled=0
for skill in "${SKILLS_SRC}"/*/; do
    [ -d "${skill}" ] || continue
    name="$(basename "${skill}")"
    cp -R "${skill}" "${PLUGIN_SKILLS_DIR}/${name}"
    printf '  + %s\n' "${name}"
    assembled=$((assembled + 1))
done
if [ "${assembled}" -eq 0 ]; then
    warn "no skills found in ${SKILLS_SRC}"
else
    ok "assembled ${assembled} skill(s) → ${PLUGIN_SKILLS_DIR}"
fi

# 8. Register the marketplace + enable the plugin
title "Registering Claude Code plugin"
mkdir -p "$(dirname "${KNOWN_MARKETPLACES}")"
python3 - "$REPO_ROOT" "$KNOWN_MARKETPLACES" "$CLAUDE_SETTINGS" "$MARKETPLACE_NAME" "$PLUGIN_NAME" <<'PY'
import json, os, sys, tempfile
from datetime import datetime, timezone
from pathlib import Path

repo_root, known_path, settings_path, market_name, plugin_name = sys.argv[1:6]
repo_root = str(Path(repo_root).resolve())
plugin_id = f"{plugin_name}@{market_name}"

def load(path):
    p = Path(path)
    if not p.exists() or p.stat().st_size == 0:
        return {}
    try:
        return json.loads(p.read_text())
    except json.JSONDecodeError as e:
        print(f"  ! {path} is not valid JSON ({e}); refusing to overwrite.", file=sys.stderr)
        sys.exit(1)

def atomic_write(path, data):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=p.name + ".", dir=str(p.parent))
    try:
        with os.fdopen(fd, "w") as f:
            json.dump(data, f, indent=2)
            f.write("\n")
        os.replace(tmp, p)
    except Exception:
        try: os.unlink(tmp)
        except FileNotFoundError: pass
        raise

now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")

# known_marketplaces.json: register / refresh the directory marketplace.
known = load(known_path)
known[market_name] = {
    "source": {"source": "directory", "path": repo_root},
    "installLocation": repo_root,
    "lastUpdated": now,
}
atomic_write(known_path, known)
print(f"  + known_marketplaces.json: {market_name} → {repo_root}")

# settings.json: persist marketplace in extraKnownMarketplaces + enable plugin.
settings = load(settings_path)
extra = settings.setdefault("extraKnownMarketplaces", {})
extra[market_name] = {"source": {"source": "directory", "path": repo_root}}
enabled = settings.setdefault("enabledPlugins", {})
enabled[plugin_id] = True
atomic_write(settings_path, settings)
print(f"  + settings.json: enabled {plugin_id}")
PY
ok "marketplace ${MARKETPLACE_NAME} registered; plugin ${PLUGIN_NAME} enabled"

# 9. Clean up legacy ~/.claude/skills/cookbook (now provided by the plugin)
if [ -d "${LEGACY_SKILL_DIR}" ]; then
    title "Cleaning up legacy skill location"
    rm -rf "${LEGACY_SKILL_DIR}"
    ok "removed ${LEGACY_SKILL_DIR} (now provided by the plugin)"
fi

# 10. Verify
title "Verifying"
if "${BIN_DIR}/cookbook" --version >/dev/null 2>&1; then
    ok "$(${BIN_DIR}/cookbook --version)"
else
    warn "cookbook --version did not return cleanly. Check the install log above."
fi
if [ -f "${PLUGIN_DIR}/.claude-plugin/plugin.json" ]; then
    ok "plugin manifest at ${PLUGIN_DIR}/.claude-plugin/plugin.json"
else
    err "plugin manifest missing — install did not complete cleanly."
    exit 1
fi

title "Done"
ok "Run: cookbook --help"
ok "Skills available as /cookbook:<name> (and Skill-tool 'cookbook:<name>')"
warn "If you just added ${BIN_DIR} to your PATH, open a new shell."
warn "Restart your Claude Code session to pick up the plugin."
