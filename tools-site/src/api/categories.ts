import type { Category } from './types'

export async function handleCategories(db: D1Database): Promise<Response> {
  const result = await db
    .prepare('SELECT * FROM categories ORDER BY name ASC')
    .all<Category>()

  return Response.json(result.results ?? [])
}
