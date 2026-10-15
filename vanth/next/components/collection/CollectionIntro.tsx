// What the line is, in a few sentences whose words light up with the scroll.
import type { Line } from '@shared/lib/types';
import { tie } from '@shared/lib/text';

export function CollectionIntro({ line }: { line: Line }) {
  return (
    <section className="section_collection-intro">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="collection-intro_layout">
              <p className="text-style-label">The collection</p>
              <h2 className="collection-intro_text heading-style-h2" data-words="">{tie(line.intro)}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
