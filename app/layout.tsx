import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Snow } from "@/components/snow";
import { RevealObserver } from "@/components/reveal-observer";
import { event } from "@/data/event";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${event.fullName} — Lux in Tenebris`,
    template: `%s | ${event.name}`,
  },
  description: event.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${newsreader.variable} ${hanken.variable}`}>
      <body className="relative flex min-h-screen flex-col antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-light focus:px-5 focus:py-3 focus:font-semibold focus:text-night"
        >
          Lewati ke konten
        </a>
        <Snow />
        <Navbar />
        <RevealObserver />
        <main id="konten" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
