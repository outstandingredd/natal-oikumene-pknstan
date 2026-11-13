// Bentuk (tipe) data yang dipakai di seluruh website.
// TypeScript memakai ini untuk memberi tahu kamu kalau ada field yang salah ketik atau terlewat.

export type NavLink = {
  label: string;
  href: string;
  external?: boolean; // true = link ke situs lain, dibuka di tab baru
};

export type RundownItem = {
  time: string; // contoh: "09.00 WIB"
  title: string;
  description: string;
};

// Hasil cek status yang dikirim API ke browser.
// Sengaja kecil: hanya status satu peserta, tidak pernah isi Google Sheets.
export type StatusResult =
  | { status: "found"; name: string; nim: string }
  | { status: "not_found" }
  | { status: "invalid" } // format nomor HP salah
  | { status: "rate_limited" } // terlalu banyak percobaan
  | { status: "unavailable" } // backend belum dikonfigurasi
  | { status: "error" }; // backend gagal atau balasannya tidak dikenali

export type EventInfo = {
  name: string; // nama pendek (navbar, footer)
  fullName: string; // nama lengkap (hero, judul halaman)
  tagline: string;
  description: string;
  campusName: string;
  date: string;
  time: string;
  location: string;
  about: string[]; // tiap item = satu paragraf
  themeTitle: string;
  themeTagline: string; // kalimat Inggris di bawah judul tema
  themeMeaning: { text: string; highlight: string[] }[]; // tiap item = satu butir makna tema
  themeVerse: string;
  themeVerseRef: string;
  registrationUrl: string;
  contact: {
    whatsapp: string;
    email: string;
    instagram: string;
  };
  copyrightYear: number;
};
