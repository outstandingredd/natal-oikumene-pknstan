// Langit malam: latar bergradasi + salju besar + salju kecil + bintang berkilau.
// Server component, CSS saja (tanpa JavaScript). Semua posisi dihitung tetap (bukan acak)
// supaya hasilnya sama di server dan browser. Gaya & animasi: app/globals.css (.sky, .snow-*, .star).

const r = (i: number, n: number) => ((i * n + 7) % 13) / 13; // deret tetap 0–1

// Salju besar berbentuk kristal. Sedikit jumlahnya, lambat, transparan, agar jadi ciri khas tanpa ramai.
const BIG = 8;
const bigFlakes = Array.from({ length: BIG }, (_, i) => ({
  left: ((i * 100) / BIG + r(i, 5) * 6).toFixed(1),
  size: Math.round(40 + r(i, 3) * 70), // 40–110 px
  duration: (34 + r(i, 7) * 26).toFixed(1), // 34–60 detik
  delay: (-r(i, 11) * 60).toFixed(1),
  drift: Math.round(r(i, 9) * 120 - 60),
  opacity: (0.22 + r(i, 2) * 0.26).toFixed(2),
  blur: i % 4 === 0 ? 2 : 0, // yang terbesar sedikit buram, memberi kesan jarak
  extra: i % 2 === 1,
}));

const SMALL = 26;
const smallFlakes = Array.from({ length: SMALL }, (_, i) => ({
  left: ((i * 100) / SMALL + r(i, 5) * 3).toFixed(1),
  size: (2 + r(i, 3) * 3.5).toFixed(1),
  duration: (14 + r(i, 7) * 16).toFixed(1),
  delay: (-r(i, 11) * 30).toFixed(1),
  drift: Math.round(r(i, 9) * 40 - 20),
  opacity: (0.35 + r(i, 2) * 0.45).toFixed(2),
  extra: i % 2 === 1,
}));

const STARS = 14;
const stars = Array.from({ length: STARS }, (_, i) => ({
  left: (4 + r(i, 8) * 92).toFixed(1),
  top: (3 + r(i, 6) * 62).toFixed(1),
  size: Math.round(8 + r(i, 4) * 10),
  duration: (3 + r(i, 10) * 4).toFixed(1),
  delay: (-r(i, 12) * 6).toFixed(1),
  extra: i % 3 === 2,
}));

function Crystal() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      {[0, 60, 120].map((a) => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <line x1="50" y1="5" x2="50" y2="95" />
          <path d="M50 20 L38 9 M50 20 L62 9 M50 80 L38 91 M50 80 L62 91 M50 36 L41 28 M50 36 L59 28 M50 64 L41 72 M50 64 L59 72" />
        </g>
      ))}
    </svg>
  );
}

export function Snow() {
  return (
    <div aria-hidden="true" className="sky">
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className={`star${s.extra ? " snow-extra" : ""}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
            <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
          </svg>
        </span>
      ))}

      {bigFlakes.map((f, i) => (
        <span
          key={`b${i}`}
          className={`snow-big${f.extra ? " snow-extra" : ""}`}
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              filter: f.blur ? `blur(${f.blur}px)` : undefined,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            } as React.CSSProperties
          }
        >
          <Crystal />
        </span>
      ))}

      {smallFlakes.map((f, i) => (
        <span
          key={`d${i}`}
          className={`snow-dot${f.extra ? " snow-extra" : ""}`}
          style={
            {
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
