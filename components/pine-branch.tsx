// Ranting pinus dari garis tipis. Batang berupa kurva, daun jarum dihitung di sepanjang kurva itu.

const P0 = [5, 100];
const P1 = [100, 88];
const P2 = [195, 36];

function pointAt(t: number) {
  return [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1],
  ];
}

function directionAt(t: number) {
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  const len = Math.hypot(dx, dy);
  return [dx / len, dy / len];
}

const needles: { x1: string; y1: string; x2: string; y2: string }[] = [];
for (let i = 1; i <= 12; i++) {
  const t = i / 13;
  const [px, py] = pointAt(t);
  const [dx, dy] = directionAt(t);
  const length = 24 - t * 8; // jarum makin pendek ke arah ujung
  for (const side of [-1, 1]) {
    const angle = side * 0.95; // sudut jarum terhadap batang (radian)
    const nx = dx * Math.cos(angle) - dy * Math.sin(angle);
    const ny = dx * Math.sin(angle) + dy * Math.cos(angle);
    needles.push({
      x1: px.toFixed(1),
      y1: py.toFixed(1),
      x2: (px + nx * length).toFixed(1),
      y2: (py + ny * length).toFixed(1),
    });
  }
}

export function PineBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M5 100 Q100 88 195 36" />
      {needles.map((n, i) => (
        <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} />
      ))}
    </svg>
  );
}
