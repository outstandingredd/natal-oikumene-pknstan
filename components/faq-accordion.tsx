"use client";

// Accordion FAQ: klik pertanyaan untuk membuka/menutup jawaban dengan animasi tinggi.
// Isi pertanyaan ada di data/faq.ts.

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={i}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(i, 5) * 60}ms` } as React.CSSProperties}
            className={`glass overflow-hidden transition-colors duration-300 ${open ? "!border-gold-light/50" : ""}`}
          >
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={open}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-medium text-paper sm:px-6"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-gold-light transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              inert={!open}
              aria-labelledby={`faq-q-${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-paper/80 sm:px-6">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
