"use client";

// "use client" = berjalan di browser, karena butuh state (menu terbuka, posisi scroll)
// dan tahu halaman mana yang sedang aktif.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, registerLink } from "@/data/nav";
import { Brand } from "@/components/brand";
import { ButtonLink } from "@/components/button-link";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // menu mobile terbuka?
  const [scrolled, setScrolled] = useState(false); // sudah digulir? navbar jadi lebih pekat
  const [galleryInView, setGalleryInView] = useState(false); // bagian #galeri sedang terlihat?

  const close = () => setOpen(false);

  // Navbar lebih pekat setelah digulir sedikit.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tandai menu "Galeri" aktif saat bagian #galeri di beranda sedang terlihat.
  useEffect(() => {
    if (pathname !== "/") {
      setGalleryInView(false);
      return;
    }
    const el = document.getElementById("galeri");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setGalleryInView(entry.isIntersecting), {
      rootMargin: "-40% 0px -40% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  // Esc menutup menu mobile.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/#galeri") return pathname === "/" && galleryInView;
    if (href === "/") return pathname === "/" && !galleryInView;
    return pathname === href;
  };

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 border-b text-paper backdrop-blur-lg transition-colors duration-300 ${
        solid ? "border-white/15 bg-night/85" : "border-white/10 bg-night/35"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={close} aria-label="Natal Oikumene — Beranda">
          <Brand />
        </Link>

        {/* Menu desktop: mulai layar lebar (xl) karena label menunya panjang */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 text-[0.92rem] transition-colors ${
                  active
                    ? "border-gold-light text-gold-light"
                    : "border-transparent text-paper/80 hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ButtonLink href={registerLink.href} external className="!min-h-10 !py-2">
            {registerLink.label}
          </ButtonLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="-mr-2 flex size-12 items-center justify-center rounded-full transition-colors active:bg-white/10 xl:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Menu mobile: melayang di bawah bar (absolute) supaya membuka/menutupnya tidak menggeser isi halaman. `inert` = tak bisa difokus saat tertutup. */}
      <div
        id="menu-mobile"
        inert={!open}
        className={`absolute inset-x-0 top-full grid border-white/15 bg-night/95 backdrop-blur-lg transition-[grid-template-rows] duration-300 ease-out xl:hidden ${open ? "border-b" : ""} ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label="Navigasi utama (mobile)" className="overflow-hidden">
          <div className="mx-auto max-h-[calc(100dvh-4rem)] w-full max-w-7xl overflow-y-auto px-5 pb-6 pt-1 sm:px-8">
            <ul>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="border-b border-white/10">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center text-lg transition-colors ${
                        active ? "text-gold-light" : "text-paper"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href={registerLink.href} external onClick={close} className="mt-5 w-full">
              {registerLink.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
