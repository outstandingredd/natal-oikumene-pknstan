// ============================================================
// GALERI — edit file ini untuk mengganti foto dan link galeri.
// ============================================================

// Link tombol "Lihat Semua Foto". INI MASIH PLACEHOLDER, bukan link final.
// Ganti dengan link album asli (Google Drive / Google Photos / dll).
export const GALLERY_URL = "https://example.com";

export type GalleryPhoto = {
  src?: string; // contoh: "/galeri/foto-1.jpg". Kosong = tampil kotak placeholder.
  alt: string; // deskripsi singkat foto (untuk pembaca layar)
};

// Cara mengganti foto:
// 1. Taruh file foto di folder public/galeri/ (kecilkan dulu, idealnya di bawah 300 KB per foto).
// 2. Isi `src` dengan "/galeri/nama-file.jpg" dan ubah `alt`.
// Susunan tampilan menyesuaikan jumlahnya; foto pertama tampil paling besar. Disarankan 3–5 foto.
export const galleryPhotos: GalleryPhoto[] = [
  { alt: "Dokumentasi Natal Oikumene, foto 1" },
  { alt: "Dokumentasi Natal Oikumene, foto 2" },
  { alt: "Dokumentasi Natal Oikumene, foto 3" },
  { alt: "Dokumentasi Natal Oikumene, foto 4" },
  { alt: "Dokumentasi Natal Oikumene, foto 5" },
];
