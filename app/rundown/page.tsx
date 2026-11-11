import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Timeline } from "@/components/timeline";
import { rundown, isRundownPlaceholder } from "@/data/rundown";

export const metadata: Metadata = { title: "Rundown Acara" };

export default function Page() {
  return (
    <Container className="py-14 sm:py-20">
      <div data-reveal>
        <p className="eyebrow">Susunan Acara</p>
        <h1 className="section-title">Rundown Acara</h1>
        {isRundownPlaceholder && (
          <p className="mt-4 max-w-[52ch] text-paper/70">
            Jadwal di bawah ini masih contoh. Rundown resmi akan diumumkan panitia.
          </p>
        )}
      </div>
      <div className="mt-12">
        <Timeline items={rundown} />
      </div>
    </Container>
  );
}
