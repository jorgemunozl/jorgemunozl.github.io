// Fetch note bodies on demand from `/notes/<id>.json` (emitted at build time).
// Bodies are kept out of the JS bundle so the Notes route loads instantly.

const cache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

const baseUrl = (() => {
  const raw = import.meta.env.BASE_URL || '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();

export function getCachedNoteBody(id: string): string | undefined {
  return cache.get(id);
}

export async function fetchNoteBody(id: string, signal?: AbortSignal): Promise<string> {
  const cached = cache.get(id);
  if (cached !== undefined) return cached;

  const existing = inflight.get(id);
  if (existing) return existing;

  const request = (async () => {
    try {
      const response = await fetch(`${baseUrl}notes/${encodeURIComponent(id)}.json`, {
        signal,
        cache: 'force-cache',
      });
      if (!response.ok) {
        throw new Error(`Failed to load note ${id}: ${response.status}`);
      }
      const body = (await response.json()) as string;
      cache.set(id, body);
      return body;
    } finally {
      inflight.delete(id);
    }
  })();

  inflight.set(id, request);
  return request;
}
