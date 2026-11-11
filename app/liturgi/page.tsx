import type { Metadata } from "next";
import { BookOpen, Download, FileText, Music } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { liturgyDocumentUrl, liturgySections } from "@/data/liturgi";

export const metadata: Metadata = { title: "Panduan Liturgi" };

const icons = [FileText, Music, BookOpen];

export default function Page() {
  return (
    <Container className="py-14 sm:py-20">
      <div data-reveal>
        <p className="eyebrow">Ibadah Natal</p>
        <h1 className="section-title">Panduan Liturgi</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-paper/75">
          Panduan untuk mengikuti ibadah Natal bersama.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {liturgySections.map((section, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li
              key={i}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="glass glass-hover p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-gold-light/40 bg-gold-light/10 text-gold-light">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-xl text-paper">{section.title}</h2>
              <p className="mt-2 leading-relaxed text-paper/70">{section.description}</p>
            </li>
          );
        })}
      </ul>

      <div data-reveal className="mt-10">
        {liturgyDocumentUrl ? (
          <ButtonLink href={liturgyDocumentUrl} external>
            <Download className="mr-2 size-5" aria-hidden="true" />
            Buka Dokumen Liturgi
          </ButtonLink>
        ) : (
          <p className="text-paper/60">Dokumen liturgi belum tersedia. Akan diumumkan panitia.</p>
        )}
      </div>
    </Container>
  );
}
