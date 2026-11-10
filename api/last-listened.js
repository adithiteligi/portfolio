// Server-only: never expose the refresh token through VITE_ variables.
export async function lastListened(env = process.env, request = fetch) {
  const clientId = env.SPOTIFY_CLIENT_ID
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN
  if (!clientId || !refreshToken) return { status: 200, body: { track: null } }
  const auth = await request('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken, client_id: clientId }),
    signal: AbortSignal.timeout(8000),
  })
  if (!auth.ok) throw new Error('Spotify authorization unavailable')
  const token = await auth.json()
  const response = await request('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: { Authorization: `Bearer ${token.access_token}` }, signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error('Spotify history unavailable')
  const data = await response.json()
  const item = data.items?.[0]
  if (!item || !/^[a-zA-Z0-9]+$/.test(item.track?.id || '')) return { status: 200, body: { track: null } }
  return { status: 200, body: { track: {
    id: item.track.id, title: item.track.name,
    cover: item.track.album?.images?.[0]?.url || null,
    artist: item.track.artists.map(artist => artist.name).join(', '),
    playedAt: item.played_at,
    url: `https://open.spotify.com/track/${item.track.id}`,
  } } }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); res.statusCode = 405; return res.end() }
  res.setHeader('Content-Type', 'application/json')
  try {
    const result = await lastListened()
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60')
    res.statusCode = result.status
    res.end(JSON.stringify(result.body))
  } catch {
    res.statusCode = 503
    res.setHeader('Cache-Control', 'no-store')
    res.end(JSON.stringify({ track: null }))
  }
}
