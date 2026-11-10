import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/container";
import { faqs } from "@/data/faq";

export const metadata: Metadata = { title: "FAQ" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
        Pertanyaan yang Sering Diajukan
      </h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">
        Belum menemukan jawabannya? Hubungi panitia lewat kontak di halaman Beranda.
      </p>

      <div className="mt-10 max-w-3xl divide-y divide-primary/20 border-y border-primary/20">
        {faqs.map((item, i) => (
          // <details> bawaan browser: bisa dibuka dengan klik/Enter/Spasi, tanpa JavaScript.
          <details key={i} className="group py-1">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="max-w-[60ch] pb-4 pr-9 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}