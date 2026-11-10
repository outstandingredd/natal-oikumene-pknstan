// Pembatas percobaan sederhana: maksimal LIMIT permintaan per WINDOW_MS untuk tiap pengunjung (IP).
//
// shortcut: hitungan disimpan di memori satu server. Di Vercel, tiap instance punya hitungan
// sendiri, jadi ini menghalangi tebakan beruntun tapi bukan batas yang sempurna.
// Upgrade ke Upstash Redis / Vercel KV kalau acara besar atau ada penyalahgunaan.

const LIMIT = 8;
const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return { ok: false, retryAfterSec: Math.ceil((recent[0] + WINDOW_MS - now) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Bersihkan Map supaya tidak membesar terus.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return { ok: true, retryAfterSec: 0 };
}
