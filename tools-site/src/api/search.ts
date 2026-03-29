import type { Tool } from './types'

export async function handleSearch(
  request: Request,
  db: D1Database
): Promise<Response> {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  if (!q || q.trim().length === 0) {
    return Response.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    )
  }

  const rawLimit = parseInt(url.searchParams.get('limit') ?? '20', 10)
  const limit = Math.min(Math.max(1, isNaN(rawLimit) ? 20 : rawLimit), 100)

  const result = await db
    .prepare(
      `SELECT tools.*, rank
       FROM tools_fts
       JOIN tools ON tools.rowid = tools_fts.rowid
       WHERE tools_fts MATCH ?
       ORDER BY rank
       LIMIT ?`
    )
    .bind(q, limit)
    .all<Tool & { rank: number }>()

  // Strip the rank field from results before returning
  const tools = (result.results ?? []).map(({ rank: _rank, ...tool }) => tool)

  return Response.json(tools)
}
