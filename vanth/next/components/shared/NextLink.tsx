// The way out at the end of a collection or a fragrance page: the next thing to see, its name and its photograph, all
// one link. On a collection page the name is set word by word, like the giant names of the hero.
import { Photo } from './Photo';
import { Words } from './Words';

interface Props {
  href: string;
  label: string;
  name: string;
  image: string;
  alt: string;
  byWord?: boolean;
}

export function NextLink({ href, label, name, image, alt, byWord = false }: Props) {
  return (
    <section className="section_next">
      <a href={href} className="next_link">
        <span className="text-style-label">{label}</span>
        <span className="next_name">{byWord ? <Words text={name} /> : name}</span>
        <span className="next_photo"><Photo name={image} loading="lazy" alt={alt} /></span>
      </a>
    </section>
  );
}
