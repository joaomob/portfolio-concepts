// The page shown for an address that does not exist (404.html in the export): the way back to the house and the eight
// lines of the season.
import { Frame } from '@/components/chrome/Frame';
import { lines, collectionPage } from '@shared/lib/catalog';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

// Next writes its own noindex on the not found page, so the shared robots entry is left out to keep a single tag
const { robots: _robots, ...meta } = pageMeta('Page not found | Vanth', 'Page not found at Vanth. Go back to the house or open one of the eight lines.', '404');
export const metadata = meta;

export default function NotFound() {
  return (
    <Frame sheets="site" current={null} motion={null}>
      <section className="section_not-found">
        <div className="padding-global">
          <div className="container-large">
            <p className="not-found_number" aria-hidden="true">404</p>
            <div className="not-found_content">
              <p className="text-style-label">Autumn Winter 2026</p>
              <h1 className="heading-style-h2">Page not&nbsp;found</h1>
              <p className="not-found_text">The season has eight lines, and all of them are&nbsp;below.</p>
              <a href={href('')} className="button is-alternate">Back to the&nbsp;house</a>
            </div>
            <ul className="not-found_list" role="list">
              {lines.map((line) => (
                <li key={line.slug} className="not-found_item"><a href={href(collectionPage(line))} className="not-found_link"><span className="text-style-label">{line.number}</span><span className="heading-style-h3">{line.name}</span></a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Frame>
  );
}
