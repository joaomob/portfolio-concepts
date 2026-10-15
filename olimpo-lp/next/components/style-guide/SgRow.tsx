// One specimen row: the spec column (class name and values) and the live sample next to it. Both come from the
// original markup as HTML, so the row takes them as one string to keep the sample as the direct child of .sg-row.
export default function SgRow({ spec, body }: { spec: string; body: string }) {
  return <div className="sg-row" dangerouslySetInnerHTML={{ __html: `<div class="sg-spec">${spec}</div>${body}` }} />;
}
