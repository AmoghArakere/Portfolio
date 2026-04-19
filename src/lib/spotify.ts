type SpotifyTrack = {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  isPlaying: boolean;
  progressMs?: number;
  durationMs?: number;
};

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function mapTrack(payload: {
  is_playing?: boolean;
  progress_ms?: number;
  item?: {
    name: string;
    duration_ms?: number;
    external_urls?: { spotify?: string };
    album?: { images?: Array<{ url: string }> };
    artists?: Array<{ name: string }>;
  };
}) {
  if (!payload.item) return null;
  return {
    title: payload.item.name,
    artist: payload.item.artists?.map((artist) => artist.name).join(", ") ?? "Unknown artist",
    albumImageUrl: payload.item.album?.images?.[0]?.url ?? "",
    songUrl: payload.item.external_urls?.spotify ?? "#",
    isPlaying: Boolean(payload.is_playing),
    progressMs: payload.progress_ms,
    durationMs: payload.item.duration_ms,
  } satisfies SpotifyTrack;
}

export async function getSpotifyNowPlaying(): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const nowPlaying = await fetch(SPOTIFY_NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 45 },
  });

  if (nowPlaying.status === 204) {
    const recent = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 180 },
    });
    if (!recent.ok) return null;
    const recentData = (await recent.json()) as {
      items?: Array<{
        track?: {
          name: string;
          duration_ms?: number;
          external_urls?: { spotify?: string };
          album?: { images?: Array<{ url: string }> };
          artists?: Array<{ name: string }>;
        };
      }>;
    };
    const track = recentData.items?.[0]?.track;
    if (!track) return null;
    return {
      title: track.name,
      artist: track.artists?.map((artist) => artist.name).join(", ") ?? "Unknown artist",
      albumImageUrl: track.album?.images?.[0]?.url ?? "",
      songUrl: track.external_urls?.spotify ?? "#",
      isPlaying: false,
      progressMs: undefined,
      durationMs: track.duration_ms,
    };
  }

  if (!nowPlaying.ok) return null;
  const data = (await nowPlaying.json()) as {
    is_playing?: boolean;
    progress_ms?: number;
    item?: {
      name: string;
      duration_ms?: number;
      external_urls?: { spotify?: string };
      album?: { images?: Array<{ url: string }> };
      artists?: Array<{ name: string }>;
    };
  };
  return mapTrack(data);
}
