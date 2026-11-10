import { lastListened } from './api/last-listened.js'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

function spotifyPlugin(env) {
  const attach = server => { server.middlewares.use('/api/last-listened', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req.method !== 'GET') { res.statusCode = 405; return res.end() }
    try { const result = await lastListened(env); res.end(JSON.stringify(result.body)) }
    catch { res.statusCode = 503; res.end(JSON.stringify({ track: null })) }
  }) }
  return { name: 'spotify-history', configureServer: attach, configurePreviewServer: attach }
}
export default defineConfig(({ mode }) => ({
  plugins: [react(), spotifyPlugin({ ...process.env, ...loadEnv(mode, process.cwd(), 'SPOTIFY_') })],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        now: fileURLToPath(new URL('./now/index.html', import.meta.url)),
        records: fileURLToPath(new URL('./records/index.html', import.meta.url)),
      },
    },
  },
}))
