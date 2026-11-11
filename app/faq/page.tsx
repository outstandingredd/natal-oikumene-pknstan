import type { Metadata } from "next";
import { Container } from "@/components/container";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs } from "@/data/faq";

export const metadata: Metadata = { title: "FAQ" };

export default function Page() {
  return (
    <Container className="py-14 sm:py-20">
      <div data-reveal>
        <p className="eyebrow">FAQ</p>
        <h1 className="section-title">Pertanyaan yang Sering Diajukan</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-paper/75">
          Belum menemukan jawabannya? Hubungi panitia lewat kontak di halaman Beranda.
        </p>
      </div>
      <div className="mt-10 max-w-3xl">
        <FaqAccordion items={faqs} />
      </div>
    </Container>
  );
}
