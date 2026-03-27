import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

interface Options {
  domainMap: Map<string, string>
}

/**
 * Rehype plugin that converts backtick-enclosed domain identifiers into links.
 * Handles cookbook.*, guide.*, and recipe.* prefixed domains.
 */
export function rehypeCrossReferences(options: Options) {
  const { domainMap } = options

  function resolveDomain(domain: string): string | null {
    // Direct match
    if (domainMap.has(domain)) {
      return domainMap.get(domain)!
    }

    // Legacy guide.core.* -> cookbook.* mapping
    if (domain.startsWith('guide.core.')) {
      const canonical = 'cookbook.' + domain.slice('guide.core.'.length)
      if (domainMap.has(canonical)) {
        return domainMap.get(canonical)!
      }
    }

    // Legacy guide.* -> cookbook.* mapping
    if (domain.startsWith('guide.')) {
      const canonical = 'cookbook.' + domain.slice('guide.'.length)
      if (domainMap.has(canonical)) {
        return domainMap.get(canonical)!
      }
    }

    // Legacy recipe.* -> cookbook.recipes.* mapping
    if (domain.startsWith('recipe.')) {
      const canonical = 'cookbook.recipes.' + domain.slice('recipe.'.length)
      if (domainMap.has(canonical)) {
        return domainMap.get(canonical)!
      }
    }

    // Suffix match: try matching just the last segments
    for (const [knownDomain, slug] of domainMap) {
      if (knownDomain.endsWith('.' + domain.split('.').slice(-2).join('.'))) {
        return slug
      }
    }

    return null
  }

  return (tree: Root) => {
    visit(tree, 'element', (node: Element, _index, parent) => {
      if (node.tagName !== 'code' || !parent || (parent as Element).tagName === 'pre') {
        return
      }

      const textChild = node.children[0]
      if (!textChild || textChild.type !== 'text') return

      const text = textChild.value
      if (!/^(cookbook|guide|recipe)\.[\w.-]+$/.test(text)) return

      const resolved = resolveDomain(text)
      if (resolved) {
        // Replace <code> with <a>
        const link: Element = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: resolved,
            className: ['cross-ref'],
          },
          children: [{ type: 'text', value: text }],
        }
        Object.assign(node, link)
      } else {
        // Mark as unresolved
        node.properties = {
          ...node.properties,
          'data-unresolved': 'true',
          className: ['cross-ref-unresolved'],
        }
      }
    })
  }
}
