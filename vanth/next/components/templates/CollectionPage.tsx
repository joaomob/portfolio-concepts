// The page of one line of the season: the campaign, the story, each look with its shoppable dots, the pieces, the
// beauty product when there is one, the fragrance, and the next line.
import { Frame } from '../chrome/Frame';
import { CollectionHero } from '../collection/CollectionHero';
import { CollectionIntro } from '../collection/CollectionIntro';
import { LookSection } from '../collection/LookSection';
import { CollectionPieces } from '../collection/CollectionPieces';
import { CollectionBeauty } from '../collection/CollectionBeauty';
import { CollectionFragrance } from '../collection/CollectionFragrance';
import { NextLink } from '../shared/NextLink';
import type { Line } from '@shared/lib/types';
import { collectionPage, nextLine } from '@shared/lib/catalog';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

export const collectionMeta = (line: Line) =>
  pageMeta(
    `${line.name}, Autumn Winter 2026 collection | Vanth`,
    line.description ?? `${line.name} is line ${line.number} of eight in the Vanth Autumn Winter 2026 season. ${line.intro.split('. ')[0].replace(/\.+$/, '')}.`,
    collectionPage(line),
  );

export function CollectionPage({ line }: { line: Line }) {
  const following = nextLine(line);
  return (
    <Frame sheets="collection" current="collections" motion="collection">
      <CollectionHero line={line} />
      <CollectionIntro line={line} />
      {line.looks.map((look, index) => <LookSection key={index} line={line} look={look} index={index} />)}
      <CollectionPieces line={line} />
      {line.beauty && <CollectionBeauty line={line} beauty={line.beauty} />}
      <CollectionFragrance line={line} />
      <NextLink href={href(collectionPage(following))} label={`Next line, ${following.number} of\u00a008`} name={following.name} byWord image={following.campaign.image} alt={following.campaign.alt} />
    </Frame>
  );
}
