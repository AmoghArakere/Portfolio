/**
 * Spotify Developer Dashboard often rejects `http://localhost` as "not secure".
 * `http://127.0.0.1` is the documented loopback redirect form for local dev.
 *
 * During OAuth, open the app at http://127.0.0.1:3000 (not localhost) so the
 * `spotify_oauth_state` cookie host matches the callback URL.
 */
const FALLBACK = "http://127.0.0.1:3000/api/spotify/callback";

export function getSpotifyRedirectUri(): string {
  const raw = process.env.SPOTIFY_REDIRECT_URI?.trim();
  const input = raw || FALLBACK;
  try {
    const url = new URL(input);
    if (url.protocol === "https:" && url.hostname === "localhost") {
      url.protocol = "http:";
    }
    if (url.hostname === "localhost") {
      url.hostname = "127.0.0.1";
    }
    let href = url.href;
    if (href.endsWith("/") && url.pathname !== "/") {
      href = href.slice(0, -1);
    }
    return href;
  } catch {
    return FALLBACK;
  }
}
