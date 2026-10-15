// The number and the title that open each style guide section.
export default function SgSectionHeader({ num, title }: { num: string; title: string }) {
  return <div className="sg-section-header"><span className="sg-num">{num}</span><h2 className="heading-style-h3">{title}</h2></div>;
}
