import Image from "next/image";
import { Camera } from "lucide-react";
import { galleryPhotos } from "@/data/gallery";

// Mosaik foto. HP: geser ke samping (scroll-snap). Layar lebar (md+): kisi 4 kolom, foto pertama paling besar.
// Foto diganti lewat data/gallery.ts. Kalau `src` kosong, tampil kotak placeholder.

const tints = [
  "from-accent/45 to-primary/60",
  "from-gold/30 to-primary/55",
  "from-sky/30 to-night/70",
  "from-primary/70 to-accent/35",
  "from-night/60 to-gold/25",
];

export function Gallery() {
  const n = galleryPhotos.length;
  // Supaya kisi 4×2 tetap penuh tanpa lubang kalau fotonya hanya 3 atau 4.
  const tall = (i: number) => (n === 4 && i === 1) || (n === 3 && (i === 1 || i === 2));

  return (
    <>
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:h-[32rem] md:grid-cols-4 md:grid-rows-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {galleryPhotos.map((photo, i) => (
          <figure
            key={i}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            className={`group relative aspect-[4/5] shrink-0 basis-[78%] snap-center overflow-hidden rounded-2xl border border-white/12 sm:basis-[46%] md:aspect-auto md:basis-auto ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            } ${tall(i) ? "md:row-span-2" : ""}`}
          >
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 50vw, 78vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                role="img"
                aria-label={`${photo.alt} (placeholder, belum ada foto)`}
                className={`flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${tints[i % tints.length]} text-paper/60 transition-transform duration-700 group-hover:scale-105`}
              >
                <Camera className="size-8" aria-hidden="true" />
                <span className="text-sm">Foto {i + 1}</span>
              </div>
            )}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </figure>
        ))}
      </div>
      <p className="mt-1 text-center text-sm text-paper/50 md:hidden">Geser untuk melihat foto lainnya →</p>
    </>
  );
}
