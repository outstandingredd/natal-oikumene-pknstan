import Image from "next/image";
import { event } from "@/data/event";

// Logo resmi Natal Oikumene (public/logo.png, dari desain panitia) + nama acara.
export function Brand() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt=""
        width={512}
        height={512}
        sizes="44px"
        className="size-11 shrink-0"
      />
      <span className="font-serif text-xl font-medium tracking-tight">
        {event.name}
      </span>
    </span>
  );
}
