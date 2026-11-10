"use client";

// "use client" artinya komponen ini berjalan di browser, karena butuh state (menu terbuka/tertutup)
// dan tahu halaman mana yang sedang aktif.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, registerLink } from "@/data/nav";
import { Brand } from "@/components/brand";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // menu mobile terbuka?

  const close = () => setOpen(false);

  // Tekan tombol Esc untuk menutup menu mobile.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-primary text-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" onClick={close} aria-label={`${navLinks[0].label} — Natal Oikumene`}>
          <Brand />
        </Link>

        {/* Menu desktop: tampil mulai layar lebar (xl) karena label menunya panjang */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 xl:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 text-[0.95rem] transition-colors ${
                  active
                    ? "border-gold-light text-gold-light"
                    : "border-transparent text-paper/85 hover:text-paper"
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

        {/* Tombol hamburger: hanya tampil di bawah xl */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="-mr-2 flex size-12 items-center justify-center rounded-full xl:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {/* Panel menu mobile */}
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navigasi utama"
          className="border-t border-paper/10 bg-primary xl:hidden"
        >
          <Container className="py-2 pb-6">
            <ul>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href} className="border-b border-paper/10">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center text-lg ${
                        active ? "text-gold-light" : "text-paper"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink
              href={registerLink.href}
              external
              onClick={close}
              className="mt-5 w-full"
            >
              {registerLink.label}
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
