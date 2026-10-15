// The page of one fragrance: the opening photograph with the buy block, the three notes, the ritual, the facts of the
// bottle and the way back to its line.
import { Frame } from '../chrome/Frame';
import { FragranceHero } from '../fragrance/FragranceHero';
import { FragranceNotes } from '../fragrance/FragranceNotes';
import { Ritual } from '../fragrance/Ritual';
import { Facts } from '../shared/Facts';
import { NextLink } from '../shared/NextLink';
import type { FragranceView } from '@shared/lib/fragrance';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

export const fragranceMeta = (view: FragranceView) => pageMeta(view.title, view.description, view.page);

export function FragrancePage({ view }: { view: FragranceView }) {
  return (
    <Frame sheets="fragrance" current="fragrances" motion="fragrance">
      <FragranceHero view={view} />
      <FragranceNotes view={view} />
      <Ritual view={view} />
      <section className="section_facts background-color-paper">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <Facts facts={[['Bottle', view.material], ['Concentration', 'Eau de parfum'], ['Size', '50 ml']]} />
            </div>
          </div>
        </div>
      </section>
      <NextLink href={href(view.next.page)} label={view.next.label} name={view.next.name} image={view.next.image} alt={view.next.alt} />
    </Frame>
  );
}
