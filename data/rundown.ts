import type { RundownItem } from "@/types";

// Ubah ke false setelah rundown resmi dimasukkan.
// Selama true, website menampilkan catatan bahwa jadwal masih contoh.
export const isRundownPlaceholder = true;

// CONTOH rundown. Susunan dan nama kegiatan belum resmi.
// Ganti tiap item dengan jadwal sebenarnya; tambah atau hapus item sesukamu.
export const rundown: RundownItem[] = [
  {
    time: "[00.00]",
    title: "Open Gate",
    description: "[Deskripsi kegiatan]",
  },
  {
    time: "[00.00]",
    title: "Penutup",
    description: "[Deskripsi kegiatan]",
  },
];
