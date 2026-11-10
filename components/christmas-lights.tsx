// Untaian lampu Natal di atas hero. Ini satu-satunya elemen animasi di website.
// Titik lampu dihitung dari kurva lengkung (Bezier) supaya posisinya pas di kabel.

const SWAGS = 4; // jumlah lengkungan kabel
const SWAG_WIDTH = 300;
const TOP_Y = 6; // tinggi titik gantung kabel
const DIP_Y = 66; // titik kontrol: makin besar, makin melorot
const T_VALUES = [0.2, 0.5, 0.8]; // posisi lampu di tiap lengkungan (0 = kiri, 1 = kanan)
const BULB_COLORS = ["fill-gold-light", "fill-paper", "fill-gold", "fill-paper"];

function pointOnSwag(swag: number, t: number) {
  const x0 = swag * SWAG_WIDTH;
  const cx = x0 + SWAG_WIDTH / 2;
  const x1 = x0 + SWAG_WIDTH;
  const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1;
  const y = (1 - t) ** 2 * TOP_Y + 2 * (1 - t) * t * DIP_Y + t ** 2 * TOP_Y;
  return { x, y };
}

const wirePath = Array.from({ length: SWAGS }, (_, i) => {
  const x0 = i * SWAG_WIDTH;
  return `${i === 0 ? `M${x0} ${TOP_Y}` : ""} Q${x0 + SWAG_WIDTH / 2} ${DIP_Y} ${x0 + SWAG_WIDTH} ${TOP_Y}`;
}).join(" ");

const bulbs = Array.from({ length: SWAGS }, (_, s) =>
  T_VALUES.map((t) => pointOnSwag(s, t)),
)
  .flat()
  .map((p, i) => ({ ...p, index: i }));

export function ChristmasLights({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 96"
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none h-16 w-full sm:h-20 ${className}`}
    >
      <defs>
        <radialGradient id="bulb-glow">
          <stop offset="0%" stopColor="#e8b95c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8b95c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d={wirePath} fill="none" className="stroke-gold/60" strokeWidth="1.5" />

      {bulbs.map((b) => (
        <g
          key={b.index}
          className="bulb"
          style={{ "--i": b.index } as React.CSSProperties}
        >
          <circle cx={b.x.toFixed(1)} cy={(b.y + 15).toFixed(1)} r="18" fill="url(#bulb-glow)" />
          <line
            x1={b.x.toFixed(1)}
            y1={b.y.toFixed(1)}
            x2={b.x.toFixed(1)}
            y2={(b.y + 7).toFixed(1)}
            className="stroke-gold/60"
            strokeWidth="1.5"
          />
          <ellipse
            cx={b.x.toFixed(1)}
            cy={(b.y + 14).toFixed(1)}
            rx="4.5"
            ry="7"
            className={BULB_COLORS[b.index % BULB_COLORS.length]}
          />
        </g>
      ))}
    </svg>
  );
}
