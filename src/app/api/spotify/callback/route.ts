import { NextRequest, NextResponse } from "next/server";
import { getSpotifyRedirectUri } from "@/lib/spotifyRedirect";

const TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.cookies.get("spotify_oauth_state")?.value;

  if (!code) {
    return NextResponse.json({ error: "Missing code query parameter." }, { status: 400 });
  }
  if (!state || !cookieState || state !== cookieState) {
    return NextResponse.json({ error: "Invalid OAuth state. Retry from /api/spotify/login." }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = getSpotifyRedirectUri();
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET." }, { status: 500 });
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    return NextResponse.json({ error: "Spotify token exchange failed.", details: body }, { status: 500 });
  }

  const tokenData = (await tokenRes.json()) as {
    refresh_token?: string;
    access_token?: string;
    expires_in?: number;
  };

  const refreshToken = tokenData.refresh_token;
  if (!refreshToken) {
    return NextResponse.json(
      {
        error:
          "No refresh_token returned. Spotify may reuse the previous token if already granted. Revoke app access in Spotify and try again with show_dialog=true.",
      },
      { status: 400 },
    );
  }

  const html = `<!doctype html>
<html><body style="background:#0a0a0a;color:#e5e5e5;font-family:monospace;padding:24px">
<h2>Spotify refresh token generated</h2>
<p>Copy this value into <code>SPOTIFY_REFRESH_TOKEN</code> in your <code>.env.local</code>.</p>
<pre style="white-space:pre-wrap;background:#111;border:1px solid #222;padding:12px">${refreshToken}</pre>
<p>Then restart dev server.</p>
</body></html>`;

  const response = new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  response.cookies.delete("spotify_oauth_state");
  return response;
}
