import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { event } from "@/data/event";
import { isRundownPlaceholder, rundown } from "@/data/rundown";
import { ButtonLink } from "@/components/button-link";
import { ChristmasLights } from "@/components/christmas-lights";
import { Container } from "@/components/container";
import { PineBranch } from "@/components/pine-branch";

// Berapa item rundown yang ditampilkan sebagai preview di beranda.
const PREVIEW_COUNT = 4;

// Baris info acara di hero. Isinya diambil dari data/event.ts.
const eventDetails = [
  { label: "Tanggal", value: event.date },
  { label: "Waktu", value: event.time },
  { label: "Lokasi", value: event.location },
];

const heading = "font-serif text-3xl leading-tight sm:text-4xl";

export default function HomePage() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-primary text-paper">
        <ChristmasLights />

        <Container className="relative pb-20 pt-10 sm:pb-28 sm:pt-14">
          {/* Logo resmi: di atas judul pada layar kecil, di kanan pada layar lebar */}
          <Image
            src="/logo.png"
            alt="Logo Natal Oikumene: Lux in Tenebris, The Light No Darkness Can Overcome"
            width={512}
            height={512}
            priority
            sizes="(min-width: 1024px) 26rem, 12rem"
            className="mb-8 w-44 sm:w-52 lg:absolute lg:right-8 lg:top-1/2 lg:mb-0 lg:w-[26rem] lg:-translate-y-1/2"
          />
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {event.name}
          </h1>
          <p className="mt-4 max-w-xl font-serif text-2xl italic leading-snug text-gold-light sm:text-3xl">
            {event.tagline}
          </p>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-paper/85">
            {event.description}
          </p>

          <dl className="mt-10 max-w-md">
            {eventDetails.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-paper/20 py-3"
              >
                <dt className="text-paper/65">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={event.registrationUrl} external>
              Daftar Sekarang
            </ButtonLink>
            <ButtonLink href="/rundown" variant="outlineLight">
              Lihat Rundown
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ───────── TENTANG ───────── */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <h2 className={heading}>Tentang Natal Oikumene</h2>
          <div className="max-w-[60ch] space-y-5 text-lg leading-relaxed">
            {event.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── TEMA & MAKNA TEMA ───────── */}
      <section
        aria-labelledby="judul-tema"
        className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28"
        style={{
          // Cahaya bintang yang jatuh di tengah malam: terang di atas, lalu menyatu dengan gelap.
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232,185,92,0.28), transparent 70%), linear-gradient(to bottom, #0c101c, #214562 140%)",
        }}
      >
        <Container className="relative">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-sky">
            Tema Natal
          </p>
          <h2
            id="judul-tema"
            className="mt-5 text-balance text-center font-serif text-5xl font-medium leading-none tracking-[0.08em] text-gold-light sm:text-7xl lg:text-8xl"
          >
            {event.themeTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center font-serif text-xl italic leading-snug text-paper/90 sm:text-2xl">
            {event.themeTagline}
          </p>

          <div className="mx-auto mt-14 h-px max-w-xs bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />

          <h3 className="mt-14 text-center font-serif text-2xl sm:text-3xl">Makna Tema</h3>
          <ol className="mt-10 grid gap-x-10 gap-y-10 lg:grid-cols-3">
            {event.themeMeaning.map((point, i) => (
              <li key={i} className="border-t-2 border-accent pt-5">
                <span className="font-serif text-4xl text-gold-light" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lg leading-relaxed text-paper/90">{point}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────── PREVIEW RUNDOWN ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 className={heading}>Rundown Acara</h2>
            <Link
              href="/rundown"
              className="inline-flex min-h-11 items-center font-semibold text-gold-deep underline underline-offset-4 hover:text-primary"
            >
              Lihat rundown lengkap
            </Link>
          </div>

          <ol className="mt-8 max-w-3xl">
            {rundown.slice(0, PREVIEW_COUNT).map((item) => (
              <li
                key={item.title}
                className="grid gap-1 border-t border-gold/60 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <span className="font-serif text-xl text-gold-deep">{item.time}</span>
                <span className="text-lg font-medium">{item.title}</span>
              </li>
            ))}
          </ol>

          {isRundownPlaceholder && (
            <p className="mt-4 text-sm text-primary/70">
              Jadwal ini masih contoh. Rundown resmi akan diumumkan panitia.
            </p>
          )}
        </Container>
      </section>

      {/* ───────── CTA DAFTAR ───────── */}
      <section className="relative overflow-hidden bg-primary py-16 text-paper sm:py-24">
        <PineBranch className="absolute -bottom-2 right-0 w-56 text-gold/45 sm:w-80" />
        <Container className="relative">
          <h2 className={heading}>Daftar untuk ikut Natal Oikumene</h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-paper/85">
            Pendaftaran dilakukan lewat formulir resmi panitia. Sudah mendaftar? Kamu bisa
            mengecek apakah datamu sudah tercatat.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={event.registrationUrl} external>
              Daftar Sekarang
            </ButtonLink>
            <ButtonLink href="/cek-status" variant="outlineLight">
              Cek Status Pendaftaran
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ───────── KONTAK PANITIA ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <h2 className={heading}>Kontak Panitia</h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">
            Ada pertanyaan soal acara atau pendaftaran? Hubungi panitia.
          </p>
          <ul className="mt-8 grid max-w-3xl gap-x-10 gap-y-4 sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <span>{event.contact.whatsapp}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <span>{event.contact.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <AtSign className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <span>{event.contact.instagram}</span>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
