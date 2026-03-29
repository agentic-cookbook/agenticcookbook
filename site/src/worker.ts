interface Env {
  ASSETS: { fetch(input: RequestInfo, init?: RequestInit): Promise<Response> }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // Root path: serve the book cover (index.html)
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return env.ASSETS.fetch(request)
    }

    // Try to serve a static asset first
    const assetResponse = await env.ASSETS.fetch(request)
    if (assetResponse.status !== 404) {
      return assetResponse
    }

    // SPA fallback: serve cookbook.html for all unmatched routes
    const cookbookUrl = new URL('/cookbook.html', request.url)
    return env.ASSETS.fetch(new Request(cookbookUrl, request))
  },
}
