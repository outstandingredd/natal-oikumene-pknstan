import type { EventInfo } from "@/types";

// ============================================================
// INFORMASI ACARA — edit file ini untuk mengganti isi website.
// Teks dalam tanda [kurung siku] adalah PLACEHOLDER.
// Ganti seluruhnya (termasuk tanda kurung sikunya) dengan info resmi.
// ============================================================

export const event: EventInfo = {
  name: "Natal Oikumene PKN STAN",
  tagline: "LUX IN TENEBRIS - The Light No Darkness Can Overcome",

  // Draf deskripsi. Silakan ubah sesuai gaya bahasa panitia.
  description:
    "Perayaan Natal Oikumene Mahasiswa PKN STAN. Satu ibadah, satu perayaan, untuk saling menguatkan di penghujung tahun.",

  campusName: "PKN STAN",

  date: "7 Februari 2026",
  time: "[Waktu belum ditentukan]",
  location: "Gedung G PKN STAN",

  // Draf bagian "Tentang". Tiap string menjadi satu paragraf.
  about: [
    "Natal Oikumene PKN STAN merupakan ibadah perayaan Natal yang diadakan mahasiswa PMK dan KMK PKN STAN dalam satu ibadah bersama.",
    "Website ini memuat informasi acara, rundown, panduan liturgi, dan cara mendaftar, supaya mahasiswa, panitia, dan tamu undangan tahu apa yang perlu disiapkan.",
  ],

  // Tema dan makna tema: dari dokumen desain panitia (natal.docx). Jangan diubah tanpa persetujuan panitia.
  themeTitle: "LUX IN TENEBRIS",
  themeTagline: "The Light No Darkness Can Overcome",
  themeMeaning: [
    "Kelahiran Kristus digambarkan dalam suasana malam gelap, dengan sebuah bintang yang memancarkan cahaya sebagai pusat ilustrasi.",
    "Kegelapan dapat merepresentasikan pergumulan hidup manusia, seperti penderitaan, ketidakpastian, kesedihan, ketakutan, ketidakadilan, dan keputusasaan.",
    "Di tengah keadaan tersebut, kelahiran Kristus menjadi tanda hadirnya pengharapan bagi dunia. Terang-Nya tidak bergantung pada keadaan dunia yang harus terlebih dahulu menjadi terang. Sebaliknya, Kristus hadir justru di tengah kegelapan untuk memberikan keselamatan dan kehidupan.",
  ],

  // URL Google Forms resmi. SEMUA tombol "Daftar" memakai link ini (navbar, footer, beranda).
  // Untuk mengganti formulir, cukup ubah di sini.
  registrationUrl: "https://forms.gle/cWsxKrxgnP8wQ9SU6",

  contact: {
    whatsapp: "[Nomor WhatsApp panitia]",
    email: "natal2026",
    instagram: "@natal.oikumene",
  },

  // Ditulis manual (bukan new Date()) supaya halaman tetap statis dan cepat.
  copyrightYear: 2026,
};
