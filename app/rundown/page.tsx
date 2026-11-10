import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Rundown Acara" };

export default function Page() {
  return <ComingSoon title="Rundown Acara" />;
}
