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
    raw,
    headings: extractHeadings(html),
    slug,
    domain: frontmatter.domain,
    section,
    subsection,
  }
}

async function processMarkdownFileWithPrefix(
  filePath: string,
  baseDir: string,
  sectionPrefix: string,
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

  let relative = path.relative(baseDir, filePath).replace(/\.md$/, '').replace(/\/(INDEX|index)$/, '')
  const slug = '/' + sectionPrefix + (relative === 'index' ? '' : '/' + relative)

  return {
    frontmatter,
    html,
    raw,
    headings: extractHeadings(html),
    slug,
    domain: frontmatter.domain,
    section: sectionPrefix,
    subsection: null,
  }
}

interface AdditionalDir {
  dir: string
  section: string
}

interface CookbookPluginOptions {
  cookbookDir: string
  additionalDirs?: AdditionalDir[]
}

export default function cookbookPlugin(options: CookbookPluginOptions): Plugin {
  const cookbookDir = options.cookbookDir
  const additionalDirs = options.additionalDirs ?? []
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

      // Collect files from cookbook dir and additional dirs
      const allFiles: { file: string; baseDir: string; sectionPrefix: string | null }[] = []

      for (const file of collectMarkdownFiles(cookbookDir)) {
        allFiles.push({ file, baseDir: cookbookDir, sectionPrefix: null })
      }
      for (const { dir, section } of additionalDirs) {
        if (fs.existsSync(dir)) {
          for (const file of collectMarkdownFiles(dir)) {
            allFiles.push({ file, baseDir: dir, sectionPrefix: section })
          }
        }
      }

      // First pass: build domain -> slug map for cross-references
      const domainMap = new Map<string, string>()
      for (const { file, baseDir, sectionPrefix } of allFiles) {
        const raw = fs.readFileSync(file, 'utf-8')
        const { data } = matter(raw)
        if (data.domain) {
          const slug = sectionPrefix
            ? '/' + sectionPrefix + '/' + path.relative(baseDir, file).replace(/\.md$/, '').replace(/\/(INDEX|index)$/, '')
            : filePathToSlug(file, baseDir)
          domainMap.set(data.domain, slug)
        }
      }

      // Second pass: process all files
      const results = await Promise.all(
        allFiles.map(({ file, baseDir, sectionPrefix }) => {
          if (sectionPrefix) {
            // For additional dirs, compute slug with section prefix
            return processMarkdownFileWithPrefix(file, baseDir, sectionPrefix, domainMap)
          }
          return processMarkdownFile(file, baseDir, domainMap)
        }),
      )
      entries = results.filter((e): e is CookbookEntry => e !== null)

      return `export default ${JSON.stringify(entries)}`
    },

    configureServer(server) {
      // Watch cookbook directory and additional dirs for changes in dev mode
      server.watcher.add(cookbookDir)
      for (const { dir } of additionalDirs) {
        if (fs.existsSync(dir)) {
          server.watcher.add(dir)
        }
      }
      server.watcher.on('change', (changedPath) => {
        const isWatched = changedPath.startsWith(cookbookDir) ||
          additionalDirs.some(({ dir }) => changedPath.startsWith(dir))
        if (isWatched && changedPath.endsWith('.md')) {
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
