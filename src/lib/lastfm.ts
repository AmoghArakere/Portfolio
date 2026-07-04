export type LastFmTrack = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  trackUrl: string;
  isNowPlaying: boolean;
  playedAtMs?: number;
  durationMs?: number;
};

export type LastFmRecentResult = {
  track: LastFmTrack | null;
  status: "ok" | "unconfigured" | "empty" | "error";
};

type LastFmImage = { "#text"?: string; size?: string };
type LastFmArtist = { "#text"?: string; name?: string } | Array<{ "#text"?: string; name?: string }>;

function parseArtist(artist: LastFmArtist | undefined): string {
  if (!artist) return "Unknown artist";
  if (Array.isArray(artist)) {
    return artist[0]?.["#text"] ?? artist[0]?.name ?? "Unknown artist";
  }
  return artist["#text"] ?? artist.name ?? "Unknown artist";
}

const LASTFM_PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

function parseDurationMs(raw: string | number | undefined): number | undefined {
  const n = Number(raw ?? 0);
  if (!n || n <= 0) return undefined;
  // Last.fm may return seconds (~230) or milliseconds (~230000)
  if (n <= 6000) return n * 1000;
  return n;
}

function isValidImageUrl(url: string | undefined): url is string {
  if (!url?.trim()) return false;
  if (url.includes(LASTFM_PLACEHOLDER_HASH)) return false;
  if (url.includes("lastfm.freetls.fastly.net") && url.includes("/default/")) return false;
  return true;
}

function pickImageUrl(images: LastFmImage[] | undefined): string {
  if (!images?.length) return "";
  const preferred = ["extralarge", "large", "medium", "small"];
  for (const size of preferred) {
    const match = images.find((image) => image.size === size);
    if (isValidImageUrl(match?.["#text"])) return match["#text"];
  }
  for (const image of images) {
    if (isValidImageUrl(image["#text"])) return image["#text"];
  }
  return "";
}

function simplifyTrackTitle(title: string): string {
  let t = title.trim();
  while (/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/.test(t)) {
    t = t.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, "").trim();
  }
  const parts = t.split(/\s+-\s+/);
  if (parts.length > 1) {
    const suffix = parts[parts.length - 1].toLowerCase();
    if (
      /remix|edit|version|mix|remaster|live|acoustic|instrumental|demo|cover|extended|radio|deluxe|sped up|slowed/.test(
        suffix,
      )
    ) {
      t = parts.slice(0, -1).join(" - ").trim();
    }
  }
  return t || title.trim();
}

function simplifyArtistName(artist: string): string {
  return artist.split(/\s*,\s*|\s+(?:feat\.?|ft\.?|featuring)\s+|\s+&\s+|\s+x\s+/i)[0].trim() || artist.trim();
}

async function fetchTrackMetadata(
  apiKey: string,
  artist: string,
  title: string,
): Promise<{ albumImageUrl: string; durationMs?: number }> {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "track.getInfo");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("artist", artist);
  url.searchParams.set("track", title);
  url.searchParams.set("autocorrect", "1");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) return { albumImageUrl: "" };

  const data = (await response.json()) as {
    track?: {
      duration?: string;
      album?: { image?: LastFmImage[] };
    };
  };

  const durationMs = parseDurationMs(data.track?.duration);
  return {
    albumImageUrl: pickImageUrl(data.track?.album?.image),
    durationMs,
  };
}

async function fetchItunesMetadata(
  artist: string,
  title: string,
): Promise<{ albumImageUrl: string; durationMs?: number }> {
  const q = new URLSearchParams({ term: `${artist} ${title}`, entity: "song", limit: "1" });
  const response = await fetch(`https://itunes.apple.com/search?${q}`, { next: { revalidate: 86400 } });
  if (!response.ok) return { albumImageUrl: "" };

  const data = (await response.json()) as {
    results?: Array<{ artworkUrl100?: string; trackTimeMillis?: number }>;
  };
  const hit = data.results?.[0];
  if (!hit) return { albumImageUrl: "" };

  return {
    albumImageUrl: hit.artworkUrl100?.replace("100x100bb", "300x300bb") ?? "",
    durationMs: hit.trackTimeMillis,
  };
}

async function fetchAlbumImage(apiKey: string, artist: string, album: string): Promise<string> {
  if (!album.trim()) return "";

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "album.getInfo");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("artist", artist);
  url.searchParams.set("album", album);
  url.searchParams.set("autocorrect", "1");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) return "";

  const data = (await response.json()) as { album?: { image?: LastFmImage[] } };
  return pickImageUrl(data.album?.image);
}

export async function getLastFmRecentTrack(): Promise<LastFmRecentResult> {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME ?? "amogh07";
  if (!apiKey) return { track: null, status: "unconfigured" };

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return { track: null, status: "error" };

    const data = (await response.json()) as {
      recenttracks?: {
        track?:
          | Array<{
              name?: string;
              url?: string;
              artist?: LastFmArtist;
              album?: { "#text"?: string };
              image?: LastFmImage[];
              date?: { uts?: string };
              "@attr"?: { nowplaying?: string };
            }>
          | {
              name?: string;
              url?: string;
              artist?: LastFmArtist;
              album?: { "#text"?: string };
              image?: LastFmImage[];
              date?: { uts?: string };
              "@attr"?: { nowplaying?: string };
            };
      };
    };

    const raw = data.recenttracks?.track;
    const track = Array.isArray(raw) ? raw[0] : raw;
    if (!track?.name) return { track: null, status: "empty" };

    const artist = parseArtist(track.artist);
    const isNowPlaying = track["@attr"]?.nowplaying === "true";
    const playedAtMs =
      !isNowPlaying && track.date?.uts ? Number(track.date.uts) * 1000 : undefined;

    let albumImageUrl = pickImageUrl(track.image);
    const meta = await fetchTrackMetadata(apiKey, artist, track.name);
    let durationMs = meta.durationMs;
    if (!durationMs) {
      const simplified = simplifyTrackTitle(track.name);
      if (simplified !== track.name) {
        durationMs = (await fetchTrackMetadata(apiKey, artist, simplified)).durationMs;
      }
    }

    if (!isValidImageUrl(albumImageUrl) && isValidImageUrl(meta.albumImageUrl)) {
      albumImageUrl = meta.albumImageUrl;
    }

    const albumName = track.album?.["#text"] ?? "";
    if (!isValidImageUrl(albumImageUrl) && albumName) {
      const albumArt = await fetchAlbumImage(apiKey, artist, albumName);
      if (isValidImageUrl(albumArt)) albumImageUrl = albumArt;
    }

    if (!isValidImageUrl(albumImageUrl) || !durationMs) {
      const itunes = await fetchItunesMetadata(artist, track.name);
      if (!isValidImageUrl(albumImageUrl) && isValidImageUrl(itunes.albumImageUrl)) {
        albumImageUrl = itunes.albumImageUrl;
      }
      if (!durationMs && itunes.durationMs) durationMs = itunes.durationMs;
    }

    if (!durationMs) {
      const simplified = simplifyTrackTitle(track.name);
      if (simplified !== track.name) {
        const itunes = await fetchItunesMetadata(artist, simplified);
        if (!durationMs && itunes.durationMs) durationMs = itunes.durationMs;
        if (!isValidImageUrl(albumImageUrl) && isValidImageUrl(itunes.albumImageUrl)) {
          albumImageUrl = itunes.albumImageUrl;
        }
      }
    }

    return {
      track: {
        title: simplifyTrackTitle(track.name),
        artist: simplifyArtistName(artist),
        album: track.album?.["#text"] ?? "",
        albumImageUrl,
        trackUrl: track.url ?? `https://www.last.fm/user/${username}`,
        isNowPlaying,
        playedAtMs,
        durationMs,
      },
      status: "ok",
    };
  } catch {
    return { track: null, status: "error" };
  }
}
