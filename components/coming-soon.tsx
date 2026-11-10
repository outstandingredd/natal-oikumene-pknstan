import { Container } from "@/components/container";

// Halaman sementara. Dipakai supaya menu navbar tidak mengarah ke halaman 404
// selagi halaman aslinya belum dibangun. Hapus pemakaiannya saat halaman asli dibuat.
export function ComingSoon({ title }: { title: string }) {
  return (
    <Container className="py-24">
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">
        Halaman ini sedang disiapkan.
      </p>
    </Container>
  );
}
