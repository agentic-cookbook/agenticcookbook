/**
 * Convert a domain like "cookbook.guidelines.testing.test-pyramid" to a URL slug
 * "/guidelines/testing/test-pyramid"
 */
export function domainToSlug(domain: string): string {
  const parts = domain.split('.')
  // Strip the "cookbook" prefix
  if (parts[0] === 'cookbook') {
    parts.shift()
  }
  if (parts.length === 0) return '/'
  return '/' + parts.join('/')
}

/**
 * Convert a URL slug to breadcrumb segments
 */
export function slugToBreadcrumbs(slug: string): { label: string; path: string }[] {
  if (slug === '/') return []

  const parts = slug.split('/').filter(Boolean)
  const crumbs: { label: string; path: string }[] = []

  for (let i = 0; i < parts.length; i++) {
    crumbs.push({
      label: titleCase(parts[i]),
      path: '/' + parts.slice(0, i + 1).join('/'),
    })
  }

  return crumbs
}

function titleCase(s: string): string {
  return s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
