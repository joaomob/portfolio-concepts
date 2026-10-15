// An inline glossary term: opens the short definition of a Codex entry (olimpo.js listens on data-term).
import type { ReactNode } from 'react';

export default function Term({ entry, light = false, children }: { entry: string; light?: boolean; children: ReactNode }) {
  return <button className={light ? 'term is-light' : 'term'} type="button" data-term={entry}>{children}</button>;
}
