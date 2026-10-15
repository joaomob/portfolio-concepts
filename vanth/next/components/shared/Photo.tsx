// One photograph: the full file with its width and height, and the smaller copies with the sizes of the frame it sits
// in, so a phone loads the small one. Any other attribute (loading, fetchPriority, data-focus) passes through.
import type { ImgHTMLAttributes } from 'react';
import { source, type Frame } from '@shared/lib/photos';

type DataAttributes = { [key: `data-${string}`]: string | undefined };
interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>, DataAttributes {
  name: string;
  alt: string;
  frame?: Frame;
}

export function Photo({ name, alt, frame = 'half', ...rest }: Props) {
  const photo = source(name, frame);
  // eslint-disable-next-line @next/next/no-img-element -- the copies are made ahead of the build (images: unoptimized)
  return <img src={photo.src} srcSet={photo.srcset} sizes={photo.sizes} width={photo.width} height={photo.height} {...rest} alt={alt} />;
}
