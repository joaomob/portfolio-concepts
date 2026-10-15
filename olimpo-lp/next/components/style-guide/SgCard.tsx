// One color chip with its name and value. The chip is either a raw color or a background-color class.
export interface SgCardData { cardClass: string | null; chipClass: string | null; color: string | null; name: string; meta: string }

export default function SgCard({ cardClass, chipClass, color, name, meta }: SgCardData) {
  return <div className={cardClass ? `sg-card ${cardClass}` : 'sg-card'}><div className={chipClass ? `sg-chip ${chipClass}` : 'sg-chip'} style={color ? { background: color } : undefined} /><div className="sg-meta"><b>{name}</b>{meta}</div></div>;
}
