import { writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function escapeSQL(s: string): string {
  return s.replace(/'/g, "''")
}

const isLocal = process.argv.includes('--local')
const baseArgs = ['wrangler', 'd1', 'execute', 'tools-db']
if (isLocal) baseArgs.push('--local')

// Step 1: Get tool IDs from the DB (not from JSON)
const result = execFileSync('npx', [...baseArgs, '--command', 'SELECT id, name, description, category FROM tools ORDER BY RANDOM() LIMIT 120', '--json'], {
  cwd: resolve(__dirname, '..'),
  encoding: 'utf-8',
})

interface ToolRow {
  id: string
  name: string
  description: string
  category: string
}

const parsed = JSON.parse(result)
const tools: ToolRow[] = parsed[0]?.results ?? []

if (tools.length === 0) {
  console.error('No tools found in DB. Run seed first.')
  process.exit(1)
}

console.log(`Found ${tools.length} tools in DB`)

// Step 2: Generate news entries spread across last 30 days
const now = Date.now()
const thirtyDays = 30 * 24 * 60 * 60 * 1000

const statements: string[] = ['DELETE FROM news;']

for (let i = 0; i < tools.length; i++) {
  const tool = tools[i]
  const age = (i / tools.length) * thirtyDays
  const date = new Date(now - age)
  const dateStr = date.toISOString().slice(0, 19).replace('T', ' ')

  const title = `${tool.name} added to directory`
  const body = tool.description.slice(0, 300)

  statements.push(
    `INSERT INTO news (title, body, tool_id, type, published_at) VALUES ('${escapeSQL(title)}', '${escapeSQL(body)}', '${escapeSQL(tool.id)}', 'new-tool', '${dateStr}');`
  )
}

// Step 3: Write and execute
const sqlPath = resolve(__dirname, 'seed-news.sql')
writeFileSync(sqlPath, statements.join('\n'), 'utf-8')
console.log(`Generated ${tools.length} news entries → ${sqlPath}`)

const execArgs = ['wrangler', 'd1', 'execute', 'tools-db', `--file=${sqlPath}`]
if (isLocal) execArgs.push('--local')

execFileSync('npx', execArgs, {
  stdio: 'inherit',
  cwd: resolve(__dirname, '..'),
})
console.log('Done.')
