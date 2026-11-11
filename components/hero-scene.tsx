// Dekorasi dasar hero, terinspirasi poster panitia: cahaya bulan di cakrawala, bukit gelap, dan bintang jatuh.
// SVG murni (tanpa gambar). Seluruhnya dekoratif: aria-hidden dan tidak bisa diklik.
// Mau diganti ilustrasi asli (mis. tiga orang majus)? Taruh gambarnya di public/ dan tampilkan di komponen ini.

export function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
      style={{
        background:
          "radial-gradient(ellipse 65% 85% at 50% 100%, rgb(255 244 214 / 0.34), rgb(232 185 92 / 0.16) 38%, transparent 70%)",
      }}
    />
  );
}

export function HeroHills() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-20 w-full sm:h-28 lg:h-36"
    >
      <path
        d="M0 160V96C120 70 220 62 340 86C470 112 560 120 700 98C840 76 960 52 1100 72C1230 90 1340 98 1440 74V160Z"
        fill="#0a0e19"
        opacity="0.55"
      />
      <path
        d="M0 160V118C140 96 260 92 400 112C540 132 640 134 780 116C920 98 1040 92 1180 108C1290 120 1380 118 1440 106V160Z"
        fill="#0a0e19"
      />
    </svg>
  );
}

export function Comet({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <svg viewBox="0 0 220 90" className="comet block h-auto w-full" fill="none">
        <defs>
          <linearGradient id="comet-tail" x1="206" y1="14" x2="0" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#e8b95c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M206 14C150 26 70 52 0 84C70 62 150 40 206 20Z" fill="url(#comet-tail)" />
        <path
          d="M206 0C208 10 212 14 222 15C212 16 208 20 206 30C204 20 200 16 190 15C200 14 204 10 206 0Z"
          fill="#fff"
          transform="translate(-8 -2)"
        />
      </svg>
    </div>
  );
}
