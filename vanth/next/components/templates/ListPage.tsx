// A list page of the menu (all the collections, all the fragrances): the opening and one card per line.
import { Frame } from '../chrome/Frame';
import type { Current } from '../chrome/Nav';
import { ListHero } from '../lists/ListHero';
import { ListGrid, type ListCard } from '../lists/ListGrid';

interface Props {
  current: Current;
  label: string;
  heading: string;
  lead: string;
  cards: ListCard[];
}

export function ListPage({ current, label, heading, lead, cards }: Props) {
  return (
    <Frame sheets="list" current={current} motion="list">
      <ListHero label={label} heading={heading} lead={lead} />
      <ListGrid cards={cards} />
    </Frame>
  );
}
