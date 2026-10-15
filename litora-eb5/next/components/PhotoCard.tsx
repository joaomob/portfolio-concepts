// A square photo with its title on a veil and a text under it (audience cards and speakers).
import type { ImageSet } from '@astro/lib/types';
import { Keep } from './Keep';

interface Props { img: ImageSet; alt: string; sizes: string; focusClass?: string; heading: string; role?: string; text: string }

export function PhotoCard({ img, alt, sizes, focusClass, heading, role, text }: Props) {
  return (
    <>
      <div className="photo-card_component">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={['photo-card_media', focusClass].filter(Boolean).join(' ')} src={img.src} srcSet={img.srcset} sizes={sizes}
          width={img.width} height={img.height} alt={alt} loading="lazy" decoding="async" />
        <div className="photo-card_veil"><h3><Keep text={heading} /></h3>{role && <p className="text-style-eyebrow">{role}</p>}</div>
      </div>
      <p className="photo-card_text">{text}</p>
    </>
  );
}
