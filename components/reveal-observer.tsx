"use client";

// Menampilkan elemen bertanda data-reveal dengan efek naik-memudar saat masuk layar.
// Cara pakai di halaman mana pun: <div data-reveal> ... </div>
// Jeda bertahap untuk beberapa kartu: style={{ "--reveal-delay": "120ms" }}
// Tanpa JavaScript atau dengan "kurangi gerakan", konten langsung tampil (lihat app/globals.css).

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealObserver() {
  const pathname = usePathname(); // dijalankan ulang setiap pindah halaman

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
