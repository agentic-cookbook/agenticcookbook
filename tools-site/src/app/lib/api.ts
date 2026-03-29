import type { Tool, Category, NewsItem, ListResponse } from '../../api/types'

export type { Tool, Category, NewsItem, ListResponse }

const BASE = '/api'

async function request<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(path, window.location.origin)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, v)
      }
    }
  }
  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

export function fetchTools(params?: Record<string, string>): Promise<ListResponse<Tool>> {
  return request<ListResponse<Tool>>(`${BASE}/tools`, params)
}

export function fetchTool(id: string): Promise<Tool> {
  return request<Tool>(`${BASE}/tools/${encodeURIComponent(id)}`)
}

export function fetchCategories(): Promise<Category[]> {
  return request<Category[]>(`${BASE}/categories`)
}

export function fetchNews(params?: Record<string, string>): Promise<ListResponse<NewsItem>> {
  return request<ListResponse<NewsItem>>(`${BASE}/news`, params)
}

export function searchTools(query: string): Promise<ListResponse<Tool>> {
  return request<ListResponse<Tool>>(`${BASE}/tools`, { q: query, limit: '20' })
}
