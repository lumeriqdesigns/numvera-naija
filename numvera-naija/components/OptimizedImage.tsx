import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "alt"> & {
  alt: string;
  /** Prefer true only for LCP hero / above-the-fold images */
  priority?: boolean;
};

/**
 * Thin wrapper around next/image with sensible defaults for this site.
 * - Always requires alt (a11y)
 * - Lazy-loads by default (unless priority)
 * - Uses quality 75 (good balance for web)
 */
export default function OptimizedImage({
  alt,
  priority = false,
  quality = 75,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  ...rest
}: Props) {
  return (
    <Image
      alt={alt}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={quality}
      sizes={sizes}
      className={className}
      {...rest}
    />
  );
}
