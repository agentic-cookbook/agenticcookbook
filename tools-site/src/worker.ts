import { handleTools } from './api/tools'
import { handleCategories } from './api/categories'
import { handleNews } from './api/news'
import { handleSearch } from './api/search'

interface Env {
  DB: D1Database
}

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function withCors(response: Response): Response {
  const newResponse = new Response(response.body, response)
  for (const [key, value] of Object.entries(corsHeaders)) {
    newResponse.headers.set(key, value)
  }
  return newResponse
}

function jsonError(message: string, status: number): Response {
  return withCors(Response.json({ error: message }, { status }))
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response | undefined> {
    const url = new URL(request.url)
    const path = url.pathname

    // Only handle /api/* routes
    if (!path.startsWith('/api/')) {
      return undefined
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    // Only allow GET for API routes
    if (request.method !== 'GET') {
      return jsonError('Method not allowed', 405)
    }

    try {
      let response: Response

      // Route matching
      if (path === '/api/tools') {
        response = await handleTools(request, env.DB)
      } else if (path.startsWith('/api/tools/')) {
        const toolId = decodeURIComponent(path.slice('/api/tools/'.length))
        if (!toolId) {
          return jsonError('Tool ID is required', 400)
        }
        response = await handleTools(request, env.DB, toolId)
      } else if (path === '/api/categories') {
        response = await handleCategories(env.DB)
      } else if (path === '/api/news') {
        response = await handleNews(request, env.DB)
      } else if (path === '/api/search') {
        response = await handleSearch(request, env.DB)
      } else {
        return jsonError('Not found', 404)
      }

      return withCors(response)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Internal server error'
      console.error('API error:', err)
      return jsonError(message, 500)
    }
  },
}
