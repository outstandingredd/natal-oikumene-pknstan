import Link from "next/link";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { event } from "@/data/event";
import { navLinks, registerLink } from "@/data/nav";
import { Brand } from "@/components/brand";
import { Container } from "@/components/container";

export function Footer() {
  const links = [...navLinks, registerLink];

  return (
    <footer className="relative z-10 mt-8 border-t border-white/10 bg-night/70 text-paper backdrop-blur-md">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-xs font-serif text-lg italic leading-snug text-gold-light">
            {event.tagline}
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 className="font-serif text-lg">Halaman</h2>
          <ul className="mt-4 space-y-1">
            {links.map((link) => {
              const className =
                "inline-flex min-h-10 items-center text-paper/80 transition-colors hover:text-gold-light";
              return (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={className}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-lg">Hubungi panitia</h2>
          <ul className="mt-4 space-y-3 text-paper/80">
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>Whatsapp: {event.contact.whatsapp} (Claira)</span>
            </li>
            <li className="flex items-start gap-3">
              <AtSign className="mt-0.5 size-5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>Instagram: {event.contact.instagram}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-paper/65">
          © {event.copyrightYear} Panitia {event.name} {event.campusName}. Seluruh hak dilindungi.
        </Container>
      </div>
    </footer>
  );
}
