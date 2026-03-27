import type { CookbookEntry, NavNode } from '../types/cookbook'

const SECTION_ORDER = ['principles', 'guidelines', 'recipes', 'workflow', 'reference']

const SECTION_LABELS: Record<string, string> = {
  principles: 'Principles',
  guidelines: 'Guidelines',
  recipes: 'Recipes',
  workflow: 'Workflow',
  reference: 'Reference',
}

function titleCase(s: string): string {
  return s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function buildNavTree(entries: CookbookEntry[]): NavNode[] {
  const sectionMap = new Map<string, NavNode>()

  for (const section of SECTION_ORDER) {
    sectionMap.set(section, {
      label: SECTION_LABELS[section] ?? titleCase(section),
      path: '/' + section,
      children: [],
    })
  }

  // Group entries by section, then build tree
  for (const entry of entries) {
    if (!entry.section || entry.slug === '/') continue
    if (entry.slug === '/conventions') continue // top-level, not in nav tree sections

    const sectionNode = sectionMap.get(entry.section)
    if (!sectionNode) continue

    const parts = entry.slug.split('/').filter(Boolean)
    // parts[0] is the section name, rest are the path within the section
    const pathWithinSection = parts.slice(1)

    if (pathWithinSection.length === 0) {
      // This is a section INDEX page
      sectionNode.domain = entry.domain
      sectionNode.type = entry.frontmatter.type
      sectionNode.status = entry.frontmatter.status
      sectionNode.platforms = entry.frontmatter.platforms
      continue
    }

    // Build intermediate directory nodes as needed
    let current = sectionNode
    for (let i = 0; i < pathWithinSection.length - 1; i++) {
      const segment = pathWithinSection[i]
      let child = current.children.find((c) => c.label === titleCase(segment) && !c.domain)
      if (!child) {
        child = {
          label: titleCase(segment),
          path: '/' + parts.slice(0, i + 2).join('/'),
          children: [],
        }
        current.children.push(child)
      }
      current = child
    }

    // Add the leaf page
    current.children.push({
      label: entry.frontmatter.title,
      path: entry.slug,
      domain: entry.domain,
      type: entry.frontmatter.type,
      status: entry.frontmatter.status,
      platforms: entry.frontmatter.platforms,
      children: [],
    })
  }

  // Sort children alphabetically at each level
  function sortChildren(node: NavNode) {
    node.children.sort((a, b) => {
      // Directories (with children) before leaves
      if (a.children.length > 0 && b.children.length === 0) return -1
      if (a.children.length === 0 && b.children.length > 0) return 1
      return a.label.localeCompare(b.label)
    })
    for (const child of node.children) {
      sortChildren(child)
    }
  }

  const tree = SECTION_ORDER.map((s) => sectionMap.get(s)!).filter(Boolean)
  for (const node of tree) {
    sortChildren(node)
  }

  return tree
}
