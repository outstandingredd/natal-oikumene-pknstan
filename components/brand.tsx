import Image from "next/image";
import { event } from "@/data/event";

// Logo resmi Natal Oikumene (public/logo.png, dari desain panitia) + nama acara.
export function Brand() {
  return (
    <span className="flex items-center gap-3">
      <Image src="/logo.png" alt="" width={512} height={512} sizes="44px" className="size-10 shrink-0 sm:size-11" />
      <span className="font-serif text-lg font-medium tracking-tight sm:text-xl">{event.name}</span>
    </span>
  );
}
