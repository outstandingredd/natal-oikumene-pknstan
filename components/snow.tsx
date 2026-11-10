// Salju tipis yang turun pelan di seluruh halaman. Hanya CSS (tanpa JavaScript).
// Posisi, ukuran, dan kecepatan dihitung tetap (bukan acak) supaya hasilnya selalu sama di server dan browser.
// pointer-events: none → tidak menghalangi klik. position: fixed → tidak menggeser tata letak.
// Gaya animasinya ada di app/globals.css (.snow-*), dan mati otomatis jika pengguna memilih "kurangi gerakan".

const FLAKES = 28;

const flakes = Array.from({ length: FLAKES }, (_, i) => {
  const r = (n: number) => ((i * n + 7) % 13) / 13; // deret tetap 0–1
  return {
    left: ((i * 100) / FLAKES + r(5) * 3).toFixed(1), // tersebar merata di lebar layar
    size: (3 + r(3) * 4).toFixed(1), // 3–7 px
    duration: (14 + r(7) * 14).toFixed(1), // 14–28 detik: lambat
    delay: (-r(11) * 28).toFixed(1), // negatif = sudah "di tengah jalan" saat halaman dibuka
    drift: (r(9) * 40 - 20).toFixed(0), // geser ke samping −20..20 px
    opacity: (0.5 + r(2) * 0.4).toFixed(2),
    hideOnMobile: i % 2 === 1, // di layar kecil hanya setengahnya yang tampil
  };
});

export function Snow() {
  return (
    <div aria-hidden="true" className="snow">
      {flakes.map((f, i) => (
        <span
          key={i}
          className={`snow-flake${f.hideOnMobile ? " snow-flake-extra" : ""}`}
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
