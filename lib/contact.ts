// Mengubah isi data/event.ts → contact menjadi link yang bisa diklik.
// Kalau isinya masih placeholder ("[ ... ]") atau bentuknya tidak valid, hasilnya undefined
// dan di layar tampil sebagai teks biasa (tidak ada link palsu).
//
// Cara mengisi di data/event.ts:
//   whatsapp:  "0812 3456 7890"  atau "+62 812 3456 7890"   → https://wa.me/6281234567890
//   email:     "panitia@gmail.com"                           → mailto:panitia@gmail.com
//   instagram: "@natal_oikumene" atau "natal_oikumene"        → https://instagram.com/natal_oikumene

export type ContactKind = "whatsapp" | "email" | "instagram";

export function contactHref(kind: ContactKind, value: string): string | undefined {
  const v = value.trim();
  if (!v || v.includes("[")) return undefined; // placeholder

  if (kind === "whatsapp") {
    let d = v.replace(/[\s\-().]/g, "").replace(/^\+/, "");
    if (!/^\d+$/.test(d)) return undefined;
    if (d.startsWith("0")) d = "62" + d.slice(1);
    else if (d.startsWith("8")) d = "62" + d;
    return /^\d{9,15}$/.test(d) ? `https://wa.me/${d}` : undefined;
  }

  if (kind === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? `mailto:${v}` : undefined;
  }

  // Instagram: terima "@nama", "nama", atau link instagram.com/nama
  const handle = v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/[/?#].*$/, "");
  return /^[A-Za-z0-9._]{1,30}$/.test(handle) ? `https://instagram.com/${handle}` : undefined;
}