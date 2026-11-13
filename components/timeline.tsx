import type { RundownItem } from "@/types";

// Warna titik tiap kegiatan bergantian supaya mudah dibedakan.
const accents = [
  { dot: "bg-gold-light shadow-[0_0_14px_rgb(232_185_92_/_0.8)]", time: "text-gold-light" },
  { dot: "bg-sky shadow-[0_0_14px_rgb(157_210_236_/_0.8)]", time: "text-sky" },
  { dot: "bg-accent shadow-[0_0_14px_rgb(51_134_184_/_0.9)]", time: "text-[#7cc0e6]" },
];

// Timeline vertikal. Di HP: garis di kiri. Di layar lebar: garis di tengah, kartu bergantian kiri-kanan.
export function Timeline({ items }: { items: RundownItem[] }) {
  return (
    <ol className="relative">
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[9px] top-2 w-px bg-gradient-to-b from-gold-light/60 via-accent/50 to-transparent md:left-1/2"
      />
      {items.map((item, i) => {
        const a = accents[i % accents.length];
        const left = i % 2 === 0; // desktop: genap di kiri, ganjil di kanan
        return (
          <li
            key={i}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(i, 3) * 80}ms` } as React.CSSProperties}
            className={`relative pb-6 pl-10 last:pb-0 md:w-1/2 md:pb-8 ${
              left ? "md:pl-0 md:pr-12" : "md:ml-auto md:pl-12"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-6 size-[19px] rounded-full ring-4 ring-night ${a.dot} ${
                left ? "md:left-auto md:-right-[9.5px]" : "md:left-[-9.5px]"
              }`}
            />
            <div className="glass p-5 sm:p-6">
              <p className={`font-semibold tracking-wide ${a.time}`}>{item.time}</p>
              <h3 className="mt-1 font-serif text-xl leading-snug text-paper sm:text-2xl">{item.title}</h3>
              {item.description && <p className="mt-2 leading-relaxed text-paper/75">{item.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
