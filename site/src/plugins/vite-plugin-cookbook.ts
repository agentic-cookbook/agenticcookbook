import { type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import type { CookbookEntry, CookbookFrontmatter, HeadingEntry } from '../types/cookbook'
import { rehypeCrossReferences } from './rehype-cross-references'

const VIRTUAL_MODULE_ID = 'virtual:cookbook-data'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

function collectMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath))
    } else if (entry.name.endsWith('.md') && entry.name !== '_template.md') {
      files.push(fullPath)
    }
  }
  return files
}

function filePathToSlug(filePath: string, cookbookDir: string): string {
  let relative = path.relative(cookbookDir, filePath)
  relative = relative.replace(/\.md$/, '')
  // INDEX.md and index.md map to the bare directory path
  relative = relative.replace(/\/(INDEX|index)$/, '')
  if (relative === 'index') return '/'
  return '/' + relative
}

function deriveSection(slug: string): { section: string; subsection: string | null } {
  const parts = slug.split('/').filter(Boolean)
  return {
    section: parts[0] ?? '',
    subsection: parts.length > 2 ? parts[1] : null,
  }
}

function extractHeadings(html: string): HeadingEntry[] {
  const headings: HeadingEntry[] = []
  const regex = /<h([23])\s+id="([^"]*)"[^>]*>(.*?)<\/h[23]>/g
  let match
  while ((match = regex.exec(html)) !== null) {
    // Strip any nested HTML tags from heading text
    const text = match[3].replace(/<[^>]*>/g, '')
    headings.push({
      depth: parseInt(match[1], 10),
      id: match[2],
      text,
    })
  }
  return headings
}

async function processMarkdownFile(
  filePath: string,
  cookbookDir: string,
  domainMap: Map<string, string>,
): Promise<CookbookEntry | null> {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as CookbookFrontmatter

  if (!frontmatter.domain || !frontmatter.title) {
    return null
  }

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeCrossReferences, { domainMap })
    .use(rehypeStringify, { allowDangerousHtml: true })

  const result = await processor.process(content)
  const html = String(result)
  const slug = filePathToSlug(filePath, cookbookDir)
  const { section, subsection } = deriveSection(slug)

  return {
    frontmatter,
    html,
    headings: extractHeadings(html),
    slug,
    domain: frontmatter.domain,
    section,
    subsection,
  }
}

interface CookbookPluginOptions {
  cookbookDir: string
}

export default function cookbookPlugin(options: CookbookPluginOptions): Plugin {
  const cookbookDir = options.cookbookDir
  let entries: CookbookEntry[] = []

  return {
    name: 'vite-plugin-cookbook',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    async load(id: string) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return

      const files = collectMarkdownFiles(cookbookDir)

      // First pass: build domain -> slug map for cross-references
      const domainMap = new Map<string, string>()
      for (const file of files) {
        const raw = fs.readFileSync(file, 'utf-8')
        const { data } = matter(raw)
        if (data.domain) {
          domainMap.set(data.domain, filePathToSlug(file, cookbookDir))
        }
      }

      // Second pass: process all files
      const results = await Promise.all(
        files.map((file) => processMarkdownFile(file, cookbookDir, domainMap)),
      )
      entries = results.filter((e): e is CookbookEntry => e !== null)

      return `export default ${JSON.stringify(entries)}`
    },

    configureServer(server) {
      // Watch cookbook directory for changes in dev mode
      server.watcher.add(cookbookDir)
      server.watcher.on('change', (changedPath) => {
        if (changedPath.startsWith(cookbookDir) && changedPath.endsWith('.md')) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
  }
}
