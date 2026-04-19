import { NextResponse } from "next/server";
import { getSpotifyRedirectUri } from "@/lib/spotifyRedirect";

const SCOPES = ["user-read-currently-playing", "user-read-recently-played"];

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = getSpotifyRedirectUri();

  if (!clientId) {
    return NextResponse.json({ error: "Missing SPOTIFY_CLIENT_ID in env." }, { status: 500 });
  }

  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES.join(" "),
    state,
    show_dialog: "true",
  });

  const response = NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
  return response;
}
