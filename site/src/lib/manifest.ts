import entries from 'virtual:cookbook-data'
import type { CookbookEntry } from '../types/cookbook'

export { entries }

const bySlug = new Map<string, CookbookEntry>()
const byDomain = new Map<string, CookbookEntry>()

for (const entry of entries) {
  bySlug.set(entry.slug, entry)
  byDomain.set(entry.domain, entry)
}

export function getEntryBySlug(slug: string): CookbookEntry | undefined {
  return bySlug.get(slug)
}

export function getEntryByDomain(domain: string): CookbookEntry | undefined {
  return byDomain.get(domain)
}

export function getEntriesBySection(section: string): CookbookEntry[] {
  return entries.filter((e) => e.section === section)
}
