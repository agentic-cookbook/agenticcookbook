import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { entries, getEntryBySlug, getEntryByDomain, getEntriesBySection } from '../lib/manifest'
import { buildNavTree } from '../lib/navigation'
import type { CookbookEntry, NavNode } from '../types/cookbook'

interface ContentContextValue {
  entries: CookbookEntry[]
  navTree: NavNode[]
  getBySlug: (slug: string) => CookbookEntry | undefined
  getByDomain: (domain: string) => CookbookEntry | undefined
  getBySection: (section: string) => CookbookEntry[]
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ContentContextValue>(() => ({
    entries,
    navTree: buildNavTree(entries),
    getBySlug: getEntryBySlug,
    getByDomain: getEntryByDomain,
    getBySection: getEntriesBySection,
  }), [])

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
