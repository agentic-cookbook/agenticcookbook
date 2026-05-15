#!/usr/bin/env bash
# Remove everything install.sh placed on the system.
# Does NOT uninstall pip-installed deps (rich, questionary, pyyaml) — those may
# be used by other tools.
set -euo pipefail

BIN_DIR="${HOME}/.local/bin"
PKG_DIR="${BIN_DIR}/_cookbook_pkg"
SKILLS_DIR="${HOME}/.claude/skills/cookbook"

color() { printf '\033[1;%sm%s\033[0m\n' "$1" "$2"; }
title() { printf '\n'; color 36 "› $*"; }
ok()    { color 32 "✓ $*"; }
skip()  { color 90 "· $*"; }

title "Removing CLI shim"
if [ -f "${BIN_DIR}/cookbook" ]; then
    rm -f "${BIN_DIR}/cookbook"
    ok "removed ${BIN_DIR}/cookbook"
else
    skip "${BIN_DIR}/cookbook (not present)"
fi

title "Removing package"
if [ -d "${PKG_DIR}" ]; then
    rm -rf "${PKG_DIR}"
    ok "removed ${PKG_DIR}"
else
    skip "${PKG_DIR} (not present)"
fi

title "Removing skill"
if [ -d "${SKILLS_DIR}" ]; then
    rm -rf "${SKILLS_DIR}"
    ok "removed ${SKILLS_DIR}"
else
    skip "${SKILLS_DIR} (not present)"
fi

title "Done"
ok "rich / questionary / pyyaml were left installed (may be used by other tools)"
