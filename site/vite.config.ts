import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cookbookPlugin from './src/plugins/vite-plugin-cookbook'

import { cloudflare } from "@cloudflare/vite-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [cookbookPlugin({
    cookbookDir: path.resolve(__dirname, '../cookbook'),
  }), react(), cloudflare()],
})