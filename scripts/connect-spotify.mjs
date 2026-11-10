import { createServer } from 'node:http'
import { randomBytes, createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { createInterface } from 'node:readline/promises'
const prompt = createInterface({ input: process.stdin, output: process.stdout })
const clientId = (await prompt.question('Spotify app Client ID: ')).trim()
prompt.close()
if (!/^[a-zA-Z0-9]+$/.test(clientId)) throw new Error('Enter a valid Client ID.')
const verifier = randomBytes(48).toString('base64url')
const state = randomBytes(24).toString('hex')
const redirect = 'http://127.0.0.1:8888/callback'
const query = new URLSearchParams({ client_id: clientId, response_type: 'code', redirect_uri: redirect,
  scope: 'user-read-recently-played', state, code_challenge_method: 'S256',
  code_challenge: createHash('sha256').update(verifier).digest('base64url') })
const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirect)
  if (url.pathname !== '/callback') { res.writeHead(404); return res.end() }
  if (url.searchParams.get('state') !== state) { res.writeHead(400); return res.end('Invalid authorization state.') }
  if (!url.searchParams.get('code')) { res.writeHead(400); res.end('Authorization declined.'); return server.close() }
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: clientId, grant_type: 'authorization_code',
        code: url.searchParams.get('code'), redirect_uri: redirect, code_verifier: verifier }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) throw new Error('Authorization failed. Check your app settings and try again.')
    const tokens = await response.json()
    if (!tokens.refresh_token) throw new Error('No refresh token received.')
    let existing = await readFile('.env.local', 'utf8').catch(() => '')
    existing = existing.split('\n').filter(line => !/^SPOTIFY_(CLIENT_ID|REFRESH_TOKEN)=/.test(line)).join('\n').trim()
    await writeFile('.env.local', `${existing}\nSPOTIFY_CLIENT_ID=${clientId}\nSPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}\n`, { mode: 0o600 })
    res.end('Spotify connected. You can close this tab and restart your portfolio server.')
    console.log('Connected. Credentials saved locally to .env.local; no tokens were printed.')
  } catch (error) { res.writeHead(500); res.end('Connection failed. Check the terminal.'); console.error(error.message) }
  server.close()
})
server.listen(8888, '127.0.0.1', () => console.log(`Open this URL to authorize your account:\nhttps://accounts.spotify.com/authorize?${query}`))
setTimeout(() => { console.log('Authorization window expired. Run the command again.'); server.close() }, 300000).unref()
