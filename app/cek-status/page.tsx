import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = { title: "Cek Status Pendaftaran" };

// Halaman ini HANYA tampil kalau CEK_STATUS_URL belum diisi.
// Kalau sudah diisi, next.config.ts mengalihkan /cek-status ke halaman Google Apps Script,
// jadi kode di bawah tidak pernah dijalankan.
export default function CekStatusPage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
        Cek Status Pendaftaran
      </h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">
        Layanan pengecekan belum aktif. Silakan coba lagi nanti atau hubungi panitia.
      </p>
    </Container>
  );
}
