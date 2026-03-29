import type { NewsItem, ListResponse } from './types'

export async function handleNews(
  request: Request,
  db: D1Database
): Promise<Response> {
  const url = new URL(request.url)
  const params = url.searchParams

  const type = params.get('type')

  const rawLimit = parseInt(params.get('limit') ?? '50', 10)
  const limit = Math.min(Math.max(1, isNaN(rawLimit) ? 50 : rawLimit), 200)
  const rawOffset = parseInt(params.get('offset') ?? '0', 10)
  const offset = Math.max(0, isNaN(rawOffset) ? 0 : rawOffset)

  const conditions: string[] = []
  const bindings: (string | number)[] = []

  if (type) {
    conditions.push('type = ?')
    bindings.push(type)
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Count query
  const countSql = `SELECT COUNT(*) as total FROM news ${whereClause}`
  const countResult = await db
    .prepare(countSql)
    .bind(...bindings)
    .first<{ total: number }>()
  const total = countResult?.total ?? 0

  // Data query
  const dataSql = `SELECT * FROM news ${whereClause} ORDER BY published_at DESC LIMIT ? OFFSET ?`
  const dataBindings = [...bindings, limit, offset]
  const dataResult = await db
    .prepare(dataSql)
    .bind(...dataBindings)
    .all<NewsItem>()

  const response: ListResponse<NewsItem> = {
    data: dataResult.results ?? [],
    total,
    limit,
    offset,
  }

  return Response.json(response)
}
