// The eight fragrances of the season, one card each: the notes are the part of the line before ", in" (the bottle).
import { ListPage } from '@/components/templates/ListPage';
import { lines, fragrancePage } from '@shared/lib/catalog';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(
  'Fragrances, eight eaux de parfum | Vanth',
  'The eight Vanth eaux de parfum, one for each line of the season: Slate, Amethyst, Asphalt, Halide, Gilt, Vermilion, Feedback and Sanguine.',
  'fragrances',
);

const cards = lines.map((line) => ({
  href: href(fragrancePage(line)), image: line.scent.image, alt: line.scent.alt,
  number: line.number, name: line.fragrance,
  tag: line.scent.notes.split(', in ')[0].replace(/\.+$/, ''),
  meta: `Eau de parfum of ${line.name}, ${line.scent.price}`,
}));

export default function Fragrances() {
  return <ListPage current="fragrances" label="Eight eaux de parfum" heading="Fragrances" lead="One fragrance for each line, in a bottle cut to match it. Open one to read its notes." cards={cards} />;
}
