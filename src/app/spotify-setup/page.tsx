export default function SpotifySetupPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Spotify Setup</h1>
      <p className="text-[var(--muted)]">Use this once to generate your Spotify refresh token.</p>
      <p className="text-sm text-[var(--muted)]">
        Spotify&apos;s dashboard often marks <code className="text-[var(--text)]">http://localhost</code> as not secure. Use{" "}
        <code className="text-[var(--text)]">127.0.0.1</code> instead. Open this site at{" "}
        <code className="text-[var(--text)]">http://127.0.0.1:&lt;port&gt;</code> (same port as your dev server) while doing OAuth so the login cookie matches the
        callback.
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-sm">
        <li>
          In Spotify Developer Dashboard → Redirect URIs, add exactly:
          <code className="ml-2">http://127.0.0.1:3000/api/spotify/callback</code>
        </li>
        <li>Ensure `.env.local` has `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REDIRECT_URI` as above.</li>
        <li>Open this page using <code>127.0.0.1</code> (not <code>localhost</code>), e.g. <code>http://127.0.0.1:3000/spotify-setup</code>, then start OAuth below.</li>
        <li>Copy the refresh token into `SPOTIFY_REFRESH_TOKEN`, then restart the dev server.</li>
      </ol>
      <a href="/api/spotify/login" className="inline-block border border-[var(--border)] px-4 py-2">
        Start Spotify OAuth
      </a>
    </div>
  );
}
