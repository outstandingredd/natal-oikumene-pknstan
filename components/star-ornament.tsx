// Bintang delapan sudut dari garis tipis, dipakai sebagai dekorasi besar yang tenang di hero.
// Titik-titiknya dihitung dengan trigonometri: titik luar dan dalam bergantian mengelilingi lingkaran.

function starPoints(outer: number, inner: number, points: number, rotate = 0) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / points) * i - Math.PI / 2 + rotate;
    coords.push(
      `${(100 + radius * Math.cos(angle)).toFixed(2)},${(100 + radius * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return coords.join(" ");
}

export function StarOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <defs>
        <radialGradient id="star-glow">
          <stop offset="0%" stopColor="#e8b95c" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e8b95c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#star-glow)" />
      <circle cx="100" cy="100" r="62" className="stroke-gold/40" strokeWidth="0.6" />
      <polygon points={starPoints(92, 30, 8)} className="stroke-gold-light/70" strokeWidth="0.8" />
      <polygon points={starPoints(60, 20, 8, Math.PI / 8)} className="stroke-gold/50" strokeWidth="0.6" />
    </svg>
  );
}
