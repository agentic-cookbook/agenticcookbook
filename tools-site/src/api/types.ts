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

export interface FeedItem {
  id: number
  title: string
  body: string
  type: string
  published_at: string
  tool_id: string | null
  tool_name: string | null
  tool_url: string | null
  tool_github_url: string | null
  tool_description: string | null
  tool_install_command: string | null
  tool_category: string | null
  tool_subcategory: string | null
  tool_loop_phases: string | null
  tool_platforms: string | null
}

export interface ListResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}
