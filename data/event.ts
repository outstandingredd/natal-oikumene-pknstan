import type { EventInfo } from "@/types";

// ============================================================
// INFORMASI ACARA — edit file ini untuk mengganti isi website.
// Teks dalam tanda [kurung siku] adalah PLACEHOLDER.
// Ganti seluruhnya (termasuk tanda kurung sikunya) dengan info resmi.
// ============================================================

export const event: EventInfo = {
  name: "Natal Oikumene",
  fullName: "Natal Oikumene PKN STAN",
  tagline: "LUX IN TENEBRIS - The Light No Darkness Can Overcome",

  // Draf deskripsi. Silakan ubah sesuai gaya bahasa panitia.
  description:
    "Perayaan Natal bersama seluruh mahasiswa PKN STAN. Satu ibadah, satu perayaan, untuk saling menguatkan di penghujung tahun.",

  campusName: "PKN STAN",

  date: "7 Februri 2027",
  time: "15.30 WIB",
  location: "Gedung G PKN STAN",

  // Draf bagian "Tentang". Tiap string menjadi satu paragraf.
  about: [
    "Natal Oikumene adalah perayaan Natal yang diselenggarakan oleh PMK dan KMK STAN yamg bertujuan untuk mengajak seluruh mahasiswa di PKN STAN berkumpul dalam satu ibadah bersama merayakan natal.",
    "Website ini memuat informasi acara, rundown, panduan liturgi, dan cara mendaftar, supaya mahasiswa, panitia, dan tamu undangan tahu apa yang perlu disiapkan.",
  ],

  // Tema dan makna tema: dari dokumen desain panitia (natal.docx). Jangan diubah tanpa persetujuan panitia.
  themeTitle: "LUX IN TENEBRIS",
  themeTagline: "The Light No Darkness Can Overcome",
  // text = isi asli dari dokumen panitia (jangan diubah). highlight = potongan kalimat yang diberi sorotan warna.
  // Setiap highlight harus persis ada di dalam text-nya.
  themeMeaning: [
    {
      text: "Kelahiran Kristus digambarkan dalam suasana malam gelap, dengan sebuah bintang yang memancarkan cahaya sebagai pusat ilustrasi.",
      highlight: ["bintang yang memancarkan cahaya"],
    },
    {
      text: "Kegelapan dapat merepresentasikan pergumulan hidup manusia, seperti penderitaan, ketidakpastian, kesedihan, ketakutan, ketidakadilan, dan keputusasaan.",
      highlight: ["pergumulan hidup manusia"],
    },
    {
      text: "Di tengah keadaan tersebut, kelahiran Kristus menjadi tanda hadirnya pengharapan bagi dunia. Terang-Nya tidak bergantung pada keadaan dunia yang harus terlebih dahulu menjadi terang. Sebaliknya, Kristus hadir justru di tengah kegelapan untuk memberikan keselamatan dan kehidupan.",
      highlight: ["hadirnya pengharapan bagi dunia"],
    },
  ],
  // Ayat (Yohanes 1:5).
  themeVerse: "Terang itu bercahaya di dalam kegelapan, dan kegelapan itu tidak menguasainya.",
  themeVerseRef: "Yohanes 1:5",


  // URL Google Forms resmi. SEMUA tombol "Daftar" memakai link ini (navbar, footer, beranda).
  // Untuk mengganti formulir, cukup ubah di sini.
  registrationUrl: "https://forms.gle/cWsxKrxgnP8wQ9SU6",

  contact: {
    whatsapp: "089505045019",
    email: "[Email panitia]",
    instagram: "@natal.oikumene",
  },

  // Ditulis manual (bukan new Date()) supaya halaman tetap statis dan cepat.
  copyrightYear: 2026,
};
