"use client";

import { useState } from "react";
import { CircleCheck, Info, LoaderCircle, TriangleAlert } from "lucide-react";
import { normalizePhone } from "@/lib/phone";
import { ButtonLink } from "@/components/button-link";
import type { StatusResult } from "@/types";

// Kondisi form: belum ada hasil (idle), sedang memeriksa (loading), atau salah satu hasil.
type State = { kind: "idle" } | { kind: "loading" } | { kind: "result"; result: StatusResult };

export function StatusForm() {
  const [phone, setPhone] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;

    // Validasi di browser dulu supaya pesannya cepat. Server memeriksa ulang.
    if (!normalizePhone(phone)) {
      setFieldError("Nomor HP tidak valid. Contoh: 0812 3456 7890");
      setState({ kind: "idle" });
      return;
    }
    setFieldError("");
    setState({ kind: "loading" });

    try {
      const res = await fetch("/api/cek-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const result: StatusResult = await res.json();
      setState({ kind: "result", result });
    } catch {
      setState({ kind: "result", result: { status: "error" } });
    }
  }

  const loading = state.kind === "loading";

  return (
    <div className="max-w-md">
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="phone" className="block text-lg font-medium">
          Nomor HP
        </label>
        <p id="phone-hint" className="mt-1 text-primary/70">
          Gunakan nomor yang kamu isi di formulir pendaftaran.
        </p>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0812 3456 7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? "phone-hint phone-error" : "phone-hint"}
          className="mt-3 min-h-12 w-full rounded-xl border border-primary/40 bg-white px-4 text-lg placeholder:text-primary/40"
        />
        {fieldError && (
          <p id="phone-error" role="alert" className="mt-2 font-medium text-burgundy">
            {fieldError}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-70 sm:w-auto"
        >
          {loading && <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />}
          {loading ? "Memeriksa…" : "Cek Status"}
        </button>
      </form>

      {/* aria-live: pembaca layar membacakan hasil begitu muncul */}
      <div aria-live="polite" className="mt-8">
        {state.kind === "result" && <ResultPanel result={state.result} />}
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: StatusResult }) {
  switch (result.status) {
    case "found":
      return (
        <div className="rounded-2xl bg-primary p-6 text-paper">
          <CircleCheck className="size-7 text-gold-light" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-2xl">Pendaftaranmu sudah tercatat</h2>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-paper/65">Nama lengkap</dt>
              <dd className="text-lg font-medium">{result.name}</dd>
            </div>
            <div>
              <dt className="text-paper/65">NIM</dt>
              <dd className="text-lg font-medium">{result.nim}</dd>
            </div>
          </dl>
          <p className="mt-5 leading-relaxed text-paper/90">
            Silakan cek emailmu untuk informasi selanjutnya.
          </p>
        </div>
      );

    case "not_found":
      return (
        <Notice icon={<Info className="size-6 text-gold-deep" aria-hidden="true" />} title="Nomor ini belum terdaftar">
          <p>Silakan daftar dulu lewat formulir pendaftaran.</p>
          <ButtonLink href="/daftar" className="mt-4">
            Daftar Sekarang
          </ButtonLink>
        </Notice>
      );

    case "unavailable":
      return (
        <Notice icon={<TriangleAlert className="size-6 text-gold-deep" aria-hidden="true" />} title="Layanan pengecekan belum aktif">
          <p>Fitur ini belum bisa dipakai. Coba lagi nanti atau hubungi panitia.</p>
        </Notice>
      );

    case "rate_limited":
      return (
        <Notice icon={<TriangleAlert className="size-6 text-gold-deep" aria-hidden="true" />} title="Terlalu banyak percobaan">
          <p>Tunggu beberapa menit, lalu coba lagi.</p>
        </Notice>
      );

    case "invalid":
      return (
        <Notice icon={<TriangleAlert className="size-6 text-gold-deep" aria-hidden="true" />} title="Nomor HP tidak valid">
          <p>Periksa nomornya. Contoh: 0812 3456 7890.</p>
        </Notice>
      );

    default:
      return (
        <Notice icon={<TriangleAlert className="size-6 text-gold-deep" aria-hidden="true" />} title="Pengecekan gagal">
          <p>Terjadi masalah saat memeriksa pendaftaran. Coba lagi sebentar lagi.</p>
        </Notice>
      );
  }
}

// Panel pesan biasa: garis emas di kiri, sama seperti bagian "Makna Tema" di beranda.
function Notice({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-gold pl-5">
      {icon}
      <h2 className="mt-2 font-serif text-2xl">{title}</h2>
      <div className="mt-2 max-w-[52ch] leading-relaxed">{children}</div>
    </div>
  );
}
