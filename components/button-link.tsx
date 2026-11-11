import Link from "next/link";

// Tiga gaya tombol. Pilih lewat prop `variant`.
const variants = {
  gold: "bg-gold-light text-night shadow-[0_0_28px_-6px_rgb(232_185_92_/_0.7)] hover:bg-[#f3cf84] hover:shadow-[0_0_36px_-4px_rgb(232_185_92_/_0.9)]",
  outlineLight: "border border-paper/40 text-paper hover:border-sky/70 hover:bg-paper/10",
  outlineDark: "border border-primary/40 text-primary hover:bg-primary/5",
};

type Props = {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean; // true = buka di tab baru
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "gold",
  external = false,
  className = "",
  onClick,
  children,
}: Props) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-semibold btn-press ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
