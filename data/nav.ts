import type { NavLink } from "@/types";
import { event } from "@/data/event";

// Menu navigasi. Dipakai oleh navbar dan footer, jadi cukup diedit di sini.
export const navLinks: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Rundown Acara", href: "/rundown" },
  { label: "Panduan Liturgi", href: "/liturgi" },
  // /cek-status diteruskan ke halaman Google Apps Script (lihat next.config.ts).
  { label: "FAQ", href: "/faq" },
  { label: "Cek Status Pendaftaran", href: "/cek-status" },
];

// Tombol pendaftaran dipisah karena tampilannya dibuat lebih menonjol.
// Langsung ke Google Form, dibuka di tab baru.
export const registerLink: NavLink = {
  label: "Daftar Sekarang",
  href: event.registrationUrl,
  external: true,
};