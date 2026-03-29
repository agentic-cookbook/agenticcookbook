import type { FeedItem, ListResponse } from './types'

export async function handleNews(
  request: Request,
  db: D1Database
): Promise<Response> {
  const url = new URL(request.url)
  const params = url.searchParams

  const type = params.get('type')
  const category = params.get('category')

  const rawLimit = parseInt(params.get('limit') ?? '50', 10)
  const limit = Math.min(Math.max(1, isNaN(rawLimit) ? 50 : rawLimit), 200)
  const rawOffset = parseInt(params.get('offset') ?? '0', 10)
  const offset = Math.max(0, isNaN(rawOffset) ? 0 : rawOffset)

  const conditions: string[] = []
  const bindings: (string | number)[] = []

  if (type) {
    conditions.push('n.type = ?')
    bindings.push(type)
  }

  if (category) {
    conditions.push('t.category = ?')
    bindings.push(category)
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const countSql = `SELECT COUNT(*) as total FROM news n LEFT JOIN tools t ON n.tool_id = t.id ${whereClause}`
  const countResult = await db
    .prepare(countSql)
    .bind(...bindings)
    .first<{ total: number }>()
  const total = countResult?.total ?? 0

  const dataSql = `
    SELECT
      n.id, n.title, n.body, n.type, n.published_at, n.tool_id,
      t.name as tool_name,
      t.url as tool_url,
      t.github_url as tool_github_url,
      t.description as tool_description,
      t.install_command as tool_install_command,
      t.category as tool_category,
      t.subcategory as tool_subcategory,
      t.loop_phases as tool_loop_phases,
      t.platforms as tool_platforms
    FROM news n
    LEFT JOIN tools t ON n.tool_id = t.id
    ${whereClause}
    ORDER BY n.published_at DESC
    LIMIT ? OFFSET ?
  `
  const dataBindings = [...bindings, limit, offset]
  const dataResult = await db
    .prepare(dataSql)
    .bind(...dataBindings)
    .all<FeedItem>()

  const response: ListResponse<FeedItem> = {
    data: dataResult.results ?? [],
    total,
    limit,
    offset,
  }

  return Response.json(response)
}
