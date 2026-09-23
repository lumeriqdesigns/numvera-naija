import Image from "next/image";

/** Optimized logo mark — uses next/image for caching & sizing */
export default function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/icon.svg"
      alt="Numvera Naija"
      width={size}
      height={size}
      priority
      className="rounded-xl"
      unoptimized={false}
    />
  );
}
