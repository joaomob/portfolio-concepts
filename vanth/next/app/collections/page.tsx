// The eight lines of the season, one card each.
import { ListPage } from '@/components/templates/ListPage';
import { lines, collectionPage } from '@shared/lib/catalog';
import { TAGS } from '@shared/data/tags';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(
  'Collections, Autumn Winter 2026 | Vanth',
  'The eight lines of the Vanth Autumn Winter 2026 season: Iron Court, Night Office, High Rise, Machine, Lost Paradise, Lacquer, Riot and Old Blood.',
  'collections',
);

const cards = lines.map((line) => ({
  href: href(collectionPage(line)), image: line.campaign.image, alt: line.campaign.alt,
  number: line.number, name: line.name, tag: TAGS[line.slug], meta: line.meta,
}));

export default function Collections() {
  return <ListPage current="collections" label="Autumn Winter 2026" heading="Collections" lead="Open a line to see its looks and its pieces." cards={cards} />;
}
