import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import cookbookPlugin from './src/plugins/vite-plugin-cookbook'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Dev middleware: rewrite SPA routes to cookbook.html instead of index.html.
 * In production, the Cloudflare Worker (src/worker.ts) handles this routing.
 */
function cookbookSpaFallback(): Plugin {
  return {
    name: 'cookbook-spa-fallback',
    configureServer(server) {
      // Post-middleware: runs after Vite's static file serving
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url) return next()
          const pathname = req.url.split('?')[0]

          // Skip root (book cover) and paths with file extensions
          if (pathname === '/' || /\.\w+$/.test(pathname)) return next()

          // Serve cookbook.html for SPA routes
          try {
            let html = fs.readFileSync(
              path.resolve(server.config.root, 'cookbook.html'),
              'utf-8'
            )
            html = await server.transformIndexHtml('/cookbook.html', html, req.originalUrl)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } catch {
            next()
          }
        })
      }
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [
    cookbookPlugin({ cookbookDir: path.resolve(__dirname, '../cookbook') }),
    react(),
    cookbookSpaFallback(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        cookbook: path.resolve(__dirname, 'cookbook.html'),
      },
    },
  },
})
