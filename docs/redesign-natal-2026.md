# Redesign Natal Oikumene PKN STAN 2026 — yang perlu kamu isi

| Yang diisi | File | Keterangan |
|---|---|---|
| Link "Lihat Semua Foto" | `data/gallery.ts` → `GALLERY_URL` | Sekarang `https://example.com` (PLACEHOLDER) |
| Foto galeri | `data/gallery.ts` + folder `public/galeri/` | Isi `src: "/galeri/foto-1.jpg"`; 3–5 foto |
| Tanggal, waktu, lokasi, kontak | `data/event.ts` | Masih placeholder `[ … ]` |
| Rundown | `data/rundown.ts` | Ubah `isRundownPlaceholder` ke `false` setelah resmi |
| Dokumen liturgi | `data/liturgi.ts` → `liturgyDocumentUrl` | Kosong = tombol tidak muncul |
| FAQ | `data/faq.ts` | Masih placeholder |

Tidak berubah: Google Form (`data/event.ts` → `registrationUrl`), `CEK_STATUS_URL` (env), Apps Script.

Latar, salju, bintang: `components/snow.tsx` dan `app/globals.css` (`.sky`, `.snow-*`, `.star`).
Efek muncul saat scroll: tambahkan atribut `data-reveal` ke elemen mana pun.
