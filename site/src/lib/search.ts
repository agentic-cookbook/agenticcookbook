import Fuse from 'fuse.js'
import type { CookbookEntry } from '../types/cookbook'

let fuseInstance: Fuse<CookbookEntry> | null = null

export function initSearch(entries: CookbookEntry[]): Fuse<CookbookEntry> {
  fuseInstance = new Fuse(entries, {
    keys: [
      { name: 'frontmatter.title', weight: 3 },
      { name: 'frontmatter.summary', weight: 2 },
      { name: 'frontmatter.tags', weight: 1.5 },
      { name: 'domain', weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  })
  return fuseInstance
}

export function search(query: string, entries: CookbookEntry[]): CookbookEntry[] {
  if (!query.trim()) return []
  if (!fuseInstance) {
    initSearch(entries)
  }
  return fuseInstance!.search(query).map((r) => r.item)
}
