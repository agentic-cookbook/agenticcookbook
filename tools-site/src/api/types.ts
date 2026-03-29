export interface Tool {
  id: string
  name: string
  url: string | null
  github_url: string | null
  description: string
  install_command: string | null
  category: string
  subcategory: string | null
  loop_phases: string
  integration_method: string | null
  platforms: string | null
  languages: string | null
  license: string | null
  maintained: boolean
  last_verified: string | null
  source_file: string | null
  created_at: string
  updated_at: string
}

export interface Category {
  slug: string
  name: string
  description: string | null
  icon: string | null
  tool_count: number
}

export interface NewsItem {
  id: number
  title: string
  body: string
  tool_id: string | null
  type: string
  published_at: string
}

export interface ListResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}
