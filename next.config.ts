import type { NextConfig } from "next";
import { event } from "./data/event";
import { readCekStatusUrl } from "./lib/apps-script-url";

// Alamat halaman Cek Status (Google Apps Script Web App). Diisi lewat .env.local / Vercel.
// Kosong atau salah bentuk = /cek-status menampilkan pesan "belum aktif".
const cekStatusUrl = readCekStatusUrl(process.env.CEK_STATUS_URL);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Pengalihan (redirect). permanent: false = sementara (307), jadi aman kalau link-nya nanti diganti.
  async redirects() {
    return [
      // Link lama /daftar langsung ke Google Form.
      { source: "/daftar", destination: event.registrationUrl, permanent: false },
      // /cek-status dialihkan ke Apps Script, hanya kalau URL-nya sudah diisi.
      ...(cekStatusUrl
        ? [{ source: "/cek-status", destination: cekStatusUrl, permanent: false }]
        : []),
    ];
  },
};

export default nextConfig;
