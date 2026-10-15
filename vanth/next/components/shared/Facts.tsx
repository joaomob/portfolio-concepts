// A short list of facts (material, where it is made, size). The first, the longest, takes the whole row on a phone, so
// no fact is left alone on its row.
export function Facts({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="product_facts">
      {facts.map(([term, value], i) => <div key={term} className={i === 0 ? 'product_fact is-wide' : 'product_fact'}><dt className="text-style-label">{term}</dt><dd>{value}</dd></div>)}
    </dl>
  );
}
