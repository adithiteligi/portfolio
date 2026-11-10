import { useEffect, useState } from 'react'

export default function LastListened() {
  const [track, setTrack] = useState(null)
  const [play, setPlay] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    const update = async () => {
      try {
        const response = await fetch('/api/last-listened', { signal: controller.signal })
        if (!response.ok) return
        const data = await response.json()
        if (data.track && /^[a-zA-Z0-9]+$/.test(data.track.id)) setTrack(data.track)
      } catch { /* Keep the shelf usable while Spotify is unavailable. */ }
    }
    update()
    const interval = setInterval(update, 60000)
    return () => { controller.abort(); clearInterval(interval) }
  }, [])
  if (!track) return null
  return <aside className="last-listened" aria-label="Last listened on Spotify">
    <div className="listening-artwork">
      <span className="tiny-record" aria-hidden="true" />
      {track.cover && <img className="listening-cover" src={track.cover} alt={`Album cover for ${track.title}`} width="96" height="96" onError={event => { event.currentTarget.style.visibility = 'hidden' }} />}
    </div>
    <div className="listening-copy"><p className="listening-label">Last listened</p><p><a href={`https://open.spotify.com/track/${track.id}`} target="_blank" rel="noopener noreferrer">{track.title}</a></p><p>{track.artist}</p>
      {!play ? <button className="spotify-play" onClick={() => setPlay(true)}>Listen ↗</button> : <iframe key={track.id} title={`Listen to ${track.title} on Spotify`} src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />}
    </div>
  </aside>
}
