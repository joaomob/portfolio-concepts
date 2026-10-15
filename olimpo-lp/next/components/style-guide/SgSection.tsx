// One style guide section, rendered from data/style-guide.json: header, rows, color grids and the free blocks
// (intro paragraphs, group titles and spacers), in the order of the original page.
// React has no fragment that takes raw HTML, so a free block sits in a wrapper with display: contents, which keeps
// the layout of its children as if the wrapper were not there.
import SgSectionHeader from './SgSectionHeader';
import SgRow from './SgRow';
import SgCard, { type SgCardData } from './SgCard';

export type SgBlock =
  | { type: 'gap' }
  | { type: 'header'; num: string; title: string }
  | { type: 'row'; spec: string; body: string }
  | { type: 'grid'; cards: SgCardData[] }
  | { type: 'html'; html: string };

export interface SgSectionData { className: string; id: string; blocks: SgBlock[] }

export default function SgSection({ className, id, blocks }: SgSectionData) {
  return (
    <section className={className} id={id}><div className="padding-global is-large"><div className="container-large"><div className="padding-section-medium">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'header': return <SgSectionHeader key={i} num={b.num} title={b.title} />;
          case 'row': return <SgRow key={i} spec={b.spec} body={b.body} />;
          case 'grid': return <div key={i} className="sg-grid">{b.cards.map((c) => <SgCard key={c.name} {...c} />)}</div>;
          case 'html': return <div key={i} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: b.html }} />;
          default: return null;
        }
      })}
    </div></div></div></section>
  );
}
