// A photo with two crops: the tall one under a breakpoint, the wide one above it (hero, project, stack, final call).
// Plain <picture> on purpose: the crops and their srcset come from the image manifest, images are not optimized at build.
import type { ImageSet } from '@astro/lib/types';

interface Props {
  wide: ImageSet; tall: ImageSet; alt: string; className: string; sizes: string;
  tallMedia?: string; lazy?: boolean; priority?: boolean; data?: Record<`data-${string}`, string>;
}

export function Picture({ wide, tall, alt, className, sizes, tallMedia = '(max-width: 767px)', lazy = false, priority = false, data = {} }: Props) {
  return (
    <picture>
      <source media={tallMedia} srcSet={tall.srcset} sizes="100vw" width={tall.width} height={tall.height} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={className} src={wide.src} srcSet={wide.srcset} sizes={sizes} width={wide.width} height={wide.height} alt={alt}
        loading={lazy ? 'lazy' : undefined} decoding={lazy ? 'async' : undefined} fetchPriority={priority ? 'high' : undefined} {...data} />
    </picture>
  );
}
