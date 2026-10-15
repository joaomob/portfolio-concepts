// A run of body blocks: headings, paragraphs and paragraphs with a link, whose page address is rewritten for this build.
import { page } from '@/lib/paths';
import type { GuideBlock } from '@astro/data/journal';

export interface Props {
  blocks: GuideBlock[];
}

export default function GuideBlocks(props: Props) {
  const { blocks } = props;
  const withLinks = (html: string) => html.replace(/href="([a-z0-9-]+)\.html"/g, (_, name) => `href="${page(name)}"`);
  return (
    <>
<div className="journal_page_rich">
  {blocks.map((block) =>
    block.kind === 'h' ? <h2 className="journal_page_heading u-text-style-h3">{block.text}</h2>
    : block.kind === 'raw' ? <p className="journal_page_text" dangerouslySetInnerHTML={{ __html: withLinks(block.text) }} />
    : block.kind === 'p' ? <p className="journal_page_text">{block.text}</p>
    : null
  )}
</div>
    </>
  );
}
