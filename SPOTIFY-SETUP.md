# Connect your last listened track

1. Visit https://developer.spotify.com/dashboard and create an app with **Web API** access.
2. Add this exact redirect URI in the app settings: `http://127.0.0.1:8888/callback`.
3. Copy the app's **Client ID**. No client secret is needed: this project uses PKCE.
4. In the portfolio folder run `npm run spotify:connect`, paste the Client ID, and open the authorization URL printed in your terminal. Approve read access to your recently played songs.
5. The command writes credentials to the git-ignored `.env.local`. Restart the site using `npm run dev` or `npm run preview -- --host 127.0.0.1 --port 4174` (after building). The Python static server on port 4173 cannot run the Spotify endpoint.
6. Open `/records/` on that server. Your latest track appears with a spinning record. Click **Listen** to load Spotify's embedded player. Playback is controlled by Spotify and may require a login; audio does not autoplay.

The read-only endpoint refreshes access server-side. No refresh token is sent to visitors or bundled into the website. Never rename these credentials with a `VITE_` prefix. Do not share `.env.local`.

For hosting: `api/last-listened.js` is a Vercel-compatible serverless function. Configure `SPOTIFY_CLIENT_ID` and `SPOTIFY_REFRESH_TOKEN` in hosting environment settings, copied privately from `.env.local`. A static-only host such as GitHub Pages needs a separate backend for this endpoint. No deployment is included in these changes.

If authorization is revoked or Spotify is unavailable, the widget disappears and the shelf still works. The endpoint caches successful results for 60 seconds when hosted; the page refreshes it once per minute. Re-run the connect command if Spotify asks you to reauthorize.

References: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow and https://developer.spotify.com/documentation/web-api/reference/get-recently-played
