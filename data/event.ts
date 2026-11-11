import type { EventInfo } from "@/types";

// ============================================================
// INFORMASI ACARA — edit file ini untuk mengganti isi website.
// Teks dalam tanda [kurung siku] adalah PLACEHOLDER.
// Ganti seluruhnya (termasuk tanda kurung sikunya) dengan info resmi.
// ============================================================

export const event: EventInfo = {
  name: "Natal Oikumene",
  fullName: "Natal Oikumene PKN STAN",
  tagline: "Merayakan Kasih, Menghadirkan Pengharapan",

  // Draf deskripsi. Silakan ubah sesuai gaya bahasa panitia.
  description:
    "Perayaan Natal bersama mahasiswa lintas gereja di PKN STAN. Satu ibadah, satu perayaan, untuk saling menguatkan di penghujung tahun.",

  campusName: "PKN STAN",

  date: "[Tanggal belum ditentukan]",
  time: "[Waktu belum ditentukan]",
  location: "[Lokasi belum ditentukan]",

  // Draf bagian "Tentang". Tiap string menjadi satu paragraf.
  about: [
    "Natal Oikumene adalah perayaan Natal yang mempertemukan mahasiswa dari berbagai gereja dan persekutuan di PKN STAN dalam satu ibadah bersama.",
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
      highlight: ["hadirnya pengharapan bagi dunia", "justru di tengah kegelapan"],
    },
  ],
  // Ayat pada poster panitia (Yohanes 1:5).
  themeVerse: "Terang itu bercahaya di dalam kegelapan, dan kegelapan itu tidak menguasainya.",
  themeVerseRef: "Yohanes 1:5",


  // URL Google Forms resmi. SEMUA tombol "Daftar" memakai link ini (navbar, footer, beranda).
  // Untuk mengganti formulir, cukup ubah di sini.
  registrationUrl: "https://forms.gle/cWsxKrxgnP8wQ9SU6",

  contact: {
    whatsapp: "[Nomor WhatsApp panitia]",
    email: "[Email panitia]",
    instagram: "[@instagram_panitia]",
  },

  // Ditulis manual (bukan new Date()) supaya halaman tetap statis dan cepat.
  copyrightYear: 2026,
};
