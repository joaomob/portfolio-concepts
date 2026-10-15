// The size picker of a piece: the country of the size, the four sizes (38 picked) shown in that country's system, and
// the button that opens the size guide. The shared sizes code (../astro/src/scripts/sizes.ts) switches the labels.
import { SYSTEMS, bySystem, type Chart } from '@shared/lib/sizes';

export function SizePicker({ chart }: { chart: Chart }) {
  const dataOf = (i: number) => Object.fromEntries(Object.entries(bySystem(chart, i)).map(([k, v]) => [`data-${k}`, v]));
  return (
    <form className="product_form" data-wf-custom="">
      <fieldset className="product_sizes">
        <legend className="text-style-label">Size</legend>
        <div className="product_systems" role="radiogroup" aria-label="Country of the size">{SYSTEMS.map(([key, label]) => <label key={key} className="product_system"><input type="radio" name="size-system" value={key} defaultChecked={key === 'eu'} /><span>{label}</span></label>)}</div>
        <div className="product_sizes-row">{chart.sizes.map((value, i) => <label key={value} className="product_size"><input type="radio" name="size" value={value} defaultChecked={i === 1} /><span data-size="" {...dataOf(i)}>{value}</span></label>)}</div>
        <button type="button" className="product_guide-open text-style-label" data-guide-open="">Size guide</button>
      </fieldset>
    </form>
  );
}
