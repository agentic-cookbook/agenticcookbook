export interface CookbookFrontmatter {
  id: string
  title: string
  domain: string
  type: 'principle' | 'guideline' | 'recipe' | 'workflow' | 'reference'
  version: string
  status: 'draft' | 'review' | 'accepted' | 'deprecated'
  language: string
  created: string
  modified: string
  author: string
  copyright: string
  license: string
  summary: string
  platforms: string[]
  tags: string[]
  'depends-on': string[]
  related: string[]
  references: string[]
}

export interface CookbookEntry {
  frontmatter: CookbookFrontmatter
  html: string
  raw: string
  headings: HeadingEntry[]
  slug: string
  domain: string
  section: string
  subsection: string | null
}

export interface HeadingEntry {
  depth: number
  text: string
  id: string
}

export interface NavNode {
  label: string
  path: string
  domain?: string
  type?: string
  status?: string
  platforms?: string[]
  children: NavNode[]
}
