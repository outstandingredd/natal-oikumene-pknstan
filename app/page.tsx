import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Star, CloudMoon, Sunrise, Quote, AtSign, Mail, MessageCircle, Images } from "lucide-react";
import { event } from "@/data/event";
import { registerLink } from "@/data/nav";
import { rundown, isRundownPlaceholder } from "@/data/rundown";
import { GALLERY_URL } from "@/data/gallery";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Gallery } from "@/components/gallery";
import { Timeline } from "@/components/timeline";
import { HeroGlow, HeroHills, Comet } from "@/components/hero-scene";

// Ikon tiap butir makna tema (urutannya sama dengan event.themeMeaning).
const meaningIcons = [Star, CloudMoon, Sunrise];

// Memberi sorotan warna pada potongan kalimat tertentu, tanpa mengubah isi kalimat.
function Highlighted({ text, highlight }: { text: string; highlight: string[] }) {
  const pattern = highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  if (!pattern) return <>{text}</>;
  return (
    <>
      {text.split(new RegExp(`(${pattern})`)).map((part, i) =>
        highlight.includes(part) ? (
          <span key={i} className="mark-gold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function Home() {
  const info = [
    { icon: CalendarDays, label: "Tanggal", value: event.date },
    { icon: Clock, label: "Waktu", value: event.time },
    { icon: MapPin, label: "Lokasi", value: event.location },
  ];

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section aria-labelledby="judul-hero" className="relative overflow-hidden">
        <HeroGlow />
        <Comet className="right-[4%] top-[8%] w-32 sm:w-44 lg:right-[10%] lg:top-[14%] lg:w-60" />

        <Container className="relative grid items-center gap-8 pb-28 pt-10 sm:pb-36 sm:pt-14 lg:min-h-[44rem] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-40">
          {/* Logo: di atas pada HP, di kanan pada layar lebar */}
          <div className="relative mx-auto w-44 sm:w-56 lg:order-2 lg:w-full lg:max-w-[26rem]">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, rgb(232 185 92 / 0.38), rgb(51 134 184 / 0.18) 55%, transparent 72%)" }}
            />
            <Image
              src="/logo.png"
              alt="Logo Natal Oikumene: Lux in Tenebris, The Light No Darkness Can Overcome"
              width={512}
              height={512}
              priority
              sizes="(min-width: 1024px) 26rem, 14rem"
              className="relative w-full drop-shadow-[0_10px_40px_rgb(232_185_92_/_0.35)]"
            />
          </div>

          <div className="text-center lg:order-1 lg:text-left">
            <p className="eyebrow">{event.fullName}</p>
            <h1 id="judul-hero" className="mt-4 font-serif leading-[0.95] tracking-[0.06em] text-gold-light [text-shadow:0_0_40px_rgb(232_185_92_/_0.45)]">
              <span className="block text-[2.75rem] sm:text-7xl lg:text-8xl">LUX IN</span>
              <span className="block text-[2.75rem] sm:text-7xl lg:text-8xl">TENEBRIS</span>
            </h1>
            <p className="mt-4 font-serif text-xl italic text-paper sm:text-2xl">{event.themeTagline}</p>
            <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-paper/80 sm:text-lg lg:mx-0">
              {event.description}
            </p>

            <dl className="glass mx-auto mt-7 grid max-w-md gap-3 p-4 text-left sm:grid-cols-3 sm:max-w-none lg:max-w-xl">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 sm:block">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold-light sm:mb-1" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-paper/55">{label}</dt>
                    <dd className="text-[0.95rem] text-paper">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonLink href={registerLink.href} external>
                {registerLink.label}
              </ButtonLink>
              <ButtonLink href="#tentang" variant="outlineLight">
                Lihat Selengkapnya
              </ButtonLink>
            </div>
          </div>
        </Container>
        <HeroHills />
      </section>

      {/* ───────── TENTANG ───────── */}
      <section id="tentang" aria-labelledby="judul-tentang" className="py-16 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-14">
          <div data-reveal>
            <p className="eyebrow">Tentang</p>
            <h2 id="judul-tentang" className="section-title">Tentang {event.name}</h2>
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="space-y-4 text-lg leading-relaxed text-paper/80">
            {event.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── TEMA & MAKNA TEMA ───────── */}
      <section id="tema" aria-labelledby="judul-tema" className="py-16 sm:py-24">
        <Container>
          <div data-reveal className="text-center">
            <p className="eyebrow">Tema Natal</p>
            <h2
              id="judul-tema"
              className="mt-4 font-serif text-[2.6rem] leading-none tracking-[0.07em] text-gold-light [text-shadow:0_0_36px_rgb(232_185_92_/_0.4)] sm:text-7xl lg:text-8xl"
            >
              {event.themeTitle}
            </h2>
            <p className="mt-4 font-serif text-xl italic text-paper sm:text-2xl">{event.themeTagline}</p>
            <div className="glow-rule mx-auto mt-10 max-w-xs" aria-hidden="true" />
            <h3 className="mt-10 font-serif text-2xl text-paper sm:text-3xl">Makna Tema</h3>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {event.themeMeaning.map((item, i) => {
              const Icon = meaningIcons[i % meaningIcons.length];
              return (
                <li
                  key={i}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                  className="glass glass-hover relative p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full border border-gold-light/40 bg-gold-light/10 text-gold-light">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-4xl text-paper/25" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 text-[1.05rem] leading-relaxed text-paper/85">
                    <Highlighted text={item.text} highlight={item.highlight} />
                  </p>
                </li>
              );
            })}
          </ol>

          <figure data-reveal className="mx-auto mt-12 max-w-2xl text-center">
            <Quote className="mx-auto size-7 text-gold-light/70" aria-hidden="true" />
            <blockquote className="mt-3 font-serif text-xl italic leading-snug text-paper sm:text-2xl">
              “{event.themeVerse}”
            </blockquote>
            <figcaption className="mt-3 text-sm uppercase tracking-widest text-paper/55">{event.themeVerseRef}</figcaption>
          </figure>
        </Container>
      </section>

      {/* ───────── RUNDOWN ───────── */}
      <section id="rundown" aria-labelledby="judul-rundown" className="py-16 sm:py-24">
        <Container>
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Susunan Acara</p>
              <h2 id="judul-rundown" className="section-title">Rundown Acara</h2>
            </div>
            <Link href="/rundown" className="inline-flex min-h-11 items-center text-gold-light underline decoration-gold-light/40 underline-offset-4 transition-colors hover:decoration-gold-light">
              Lihat rundown lengkap
            </Link>
          </div>
          <div className="mt-10">
            <Timeline items={rundown.slice(0, 4)} />
          </div>
          {isRundownPlaceholder && (
            <p className="mt-6 text-sm text-paper/55"> </p>
          )}
        </Container>
      </section>

      {/* ───────── GALERI ───────── */}
      <section id="galeri" aria-labelledby="judul-galeri" className="py-16 sm:py-24">
        <Container>
          <div data-reveal>
            <p className="eyebrow">Dokumentasi</p>
            <h2 id="judul-galeri" className="section-title">Galeri Natal</h2>
          </div>
          <div className="mt-10">
            <Gallery />
          </div>
          <div data-reveal className="mt-8 flex justify-center">
            <ButtonLink href={GALLERY_URL} external variant="outlineLight">
              <Images className="mr-2 size-5" aria-hidden="true" />
              Lihat Semua Foto
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ───────── DAFTAR ───────── */}
      <section aria-labelledby="judul-daftar" className="py-16 sm:py-24">
        <Container>
          <div
            data-reveal
            className="glass relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16"
            style={{ backgroundImage: "radial-gradient(ellipse 70% 90% at 50% 120%, rgb(232 185 92 / 0.28), transparent 70%)" }}
          >
            <h2 id="judul-daftar" className="section-title !mt-0">Daftar {event.name} PKN STAN</h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed text-paper/80">
              Silahkan melakukan pendaftaran melalui formulir resmi panitia. Lupa sudah daftar atau belum? Kamu bisa mengecek apakah datamu sudah tercatat.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <ButtonLink href={registerLink.href} external>
                {registerLink.label}
              </ButtonLink>
              <ButtonLink href="/cek-status" variant="outlineLight">
                Cek Status Pendaftaran
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── KONTAK ───────── */}
      <section aria-labelledby="judul-kontak" className="pb-20 pt-4 sm:pb-28">
        <Container>
          <div data-reveal>
            <h2 id="judul-kontak" className="section-title !mt-0">Kontak Panitia</h2>
            <p className="mt-3 text-lg text-paper/80">Jika ada pertanyaan soal acara atau pendaftaran? Silahkan hubungi panitia.</p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: MessageCircle, label: "WhatsApp", value: event.contact.whatsapp },
              { icon: AtSign, label: "Instagram", value: event.contact.instagram },
            ].map(({ icon: Icon, label, value }, i) => (
              <li key={label} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="glass flex items-center gap-4 p-5">
                <Icon className="size-6 shrink-0 text-gold-light" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-paper/55">{label}</p>
                  <p className="break-words text-paper">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
