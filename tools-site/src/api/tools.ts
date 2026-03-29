import type { Tool, ListResponse } from './types'

export async function handleTools(
  request: Request,
  db: D1Database,
  toolId?: string
): Promise<Response> {
  if (toolId) {
    return handleGetTool(db, toolId)
  }
  return handleListTools(request, db)
}

async function handleGetTool(db: D1Database, id: string): Promise<Response> {
  const result = await db
    .prepare('SELECT * FROM tools WHERE id = ?')
    .bind(id)
    .first<Tool>()

  if (!result) {
    return Response.json({ error: 'Tool not found' }, { status: 404 })
  }

  return Response.json(result)
}

async function handleListTools(
  request: Request,
  db: D1Database
): Promise<Response> {
  const url = new URL(request.url)
  const params = url.searchParams

  const category = params.get('category')
  const phase = params.get('phase')
  const platform = params.get('platform')
  const integration = params.get('integration')
  const maintained = params.get('maintained')
  const q = params.get('q')

  const rawLimit = parseInt(params.get('limit') ?? '50', 10)
  const limit = Math.min(Math.max(1, isNaN(rawLimit) ? 50 : rawLimit), 200)
  const rawOffset = parseInt(params.get('offset') ?? '0', 10)
  const offset = Math.max(0, isNaN(rawOffset) ? 0 : rawOffset)

  const conditions: string[] = []
  const bindings: (string | number)[] = []

  // FTS search uses a JOIN approach
  let fromClause: string
  if (q) {
    fromClause = 'FROM tools_fts JOIN tools ON tools.rowid = tools_fts.rowid'
    conditions.push('tools_fts MATCH ?')
    bindings.push(q)
  } else {
    fromClause = 'FROM tools'
  }

  if (category) {
    conditions.push('tools.category = ?')
    bindings.push(category)
  }

  if (phase) {
    conditions.push('tools.loop_phases LIKE ?')
    bindings.push(`%${phase}%`)
  }

  if (platform) {
    conditions.push('tools.platforms LIKE ?')
    bindings.push(`%${platform}%`)
  }

  if (integration) {
    conditions.push('tools.integration_method = ?')
    bindings.push(integration)
  }

  if (maintained !== null && maintained !== undefined) {
    if (maintained === 'true') {
      conditions.push('tools.maintained = 1')
    } else if (maintained === 'false') {
      conditions.push('tools.maintained = 0')
    }
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Count query
  const countSql = `SELECT COUNT(*) as total ${fromClause} ${whereClause}`
  const countResult = await db
    .prepare(countSql)
    .bind(...bindings)
    .first<{ total: number }>()
  const total = countResult?.total ?? 0

  // Data query
  const orderBy = q ? 'ORDER BY rank' : 'ORDER BY tools.name ASC'
  const dataSql = `SELECT tools.* ${fromClause} ${whereClause} ${orderBy} LIMIT ? OFFSET ?`
  const dataBindings = [...bindings, limit, offset]
  const dataResult = await db
    .prepare(dataSql)
    .bind(...dataBindings)
    .all<Tool>()

  const response: ListResponse<Tool> = {
    data: dataResult.results ?? [],
    total,
    limit,
    offset,
  }

  return Response.json(response)
}
