// The size guide that the picker opens: every size in the six systems and the body measurements, in centimetres or
// inches. It is a native dialog placed after the footer.
import { SYSTEMS, bySystem, type Chart } from '@shared/lib/sizes';

export function SizeGuide({ chart }: { chart: Chart }) {
  return (
    <dialog className="size-guide" aria-labelledby="size-guide-title" data-guide="">
      <div className="size-guide_header">
        <h2 className="heading-style-h3" id="size-guide-title">Size guide</h2>
        <button type="button" className="size-guide_close text-style-label" data-guide-close="">Close</button>
      </div>
      <div className="size-guide_units" role="group" aria-label="Unit of the measurements">
        <button type="button" className="size-guide_unit text-style-label" aria-pressed="true" data-guide-unit="cm">Centimetres</button>
        <button type="button" className="size-guide_unit text-style-label" aria-pressed="false" data-guide-unit="in">Inches</button>
      </div>
      <div className="size-guide_scroll" tabIndex={0} role="region" aria-labelledby="size-guide-title">
        <div className="size-guide_table" role="table" aria-labelledby="size-guide-title">
          <div className="size-guide_head" role="rowgroup"><div className="size-guide_row" role="row">{SYSTEMS.map(([key, label]) => <div key={key} className="size-guide_cell is-head" role="columnheader">{label}</div>)}{chart.measures.map(([name]) => <div key={name} className="size-guide_cell is-head" role="columnheader">{name}</div>)}</div></div>
          <div className="size-guide_body" role="rowgroup">
            {chart.sizes.map((size, i) => {
              const cells = bySystem(chart, i);
              return <div key={size} className="size-guide_row" role="row"><div className="size-guide_cell" role="rowheader">{cells.eu}</div>{SYSTEMS.slice(1).map(([key]) => <div key={key} className="size-guide_cell" role="cell">{cells[key]}</div>)}{chart.measures.map(([name, values]) => <div key={name} className="size-guide_cell" role="cell" data-cm={String(values[i])}>{values[i]}</div>)}</div>;
            })}
          </div>
        </div>
      </div>
      <p className="size-guide_note">{chart.note}</p>
    </dialog>
  );
}
