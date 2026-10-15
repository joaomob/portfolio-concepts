// The opening of an inner page: night theme, the text on the left and the photo in an arch on the right.
// The eyebrow can be replaced by a node, since on a room page it is a link back to the rooms; the children go under the text.
import type { ReactNode } from 'react';
import { img } from '@/lib/paths';

export interface Props {
  title: string;
  text: string;
  /** the photo under assets/images/, with .webp */
  image: string;
  alt: string;
  eyebrow?: string;
  /** long titles (experiences) take one more column and the h2 size */
  long?: boolean;
  /** the guides of the journal have the longest titles */
  guide?: boolean;
  /** replaces the eyebrow text (the link back to the rooms, experiences or journal) */
  eyebrowSlot?: ReactNode;
  children?: ReactNode;
}

export default function PageHero(props: Props) {
  const { title, text, image, alt, eyebrow, long = false, guide = false } = props;
  const layout = ['page_hero_layout', long && 'is-long', guide && 'is-guide'].filter(Boolean).join(' ');
  return (
    <>
<section className="page_hero_wrap u-theme-dark" aria-labelledby="page-title">
  <div className="page_hero_contain u-container">
    <div className={layout}>
      <div className="page_hero_content">
        <p className="eyebrow_text">{props.eyebrowSlot ?? eyebrow}</p>
        <h1 className={`page_hero_title u-text-style-${long ? 'h2' : 'h1'}`} id="page-title">{title}</h1>
        <p className="page_hero_text u-text-style-large">{text}</p>
        {props.children}
      </div>
      <img className="page_hero_image is-arch" {...img(image, 900)} alt={alt} width="900" height="1117" fetchPriority="high" />
    </div>
  </div>
</section>
    </>
  );
}
