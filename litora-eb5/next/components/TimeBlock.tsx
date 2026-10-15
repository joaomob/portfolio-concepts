// The date and the hours of the event, shared by the event hero and the confirmation hero.
import type { TimeBlock as TimeBlockData } from '@astro/lib/types';

export function TimeBlock({ block }: { block: TimeBlockData }) {
  return (
    <div className="hero_time-block">
      <time className="hero_time-day" dateTime={block.date}>
        <span className="text-style-display-medium text-weight-medium">{block.day}</span><span className="text-style-eyebrow">{block.month}</span>
      </time>
      <ul className="hero_time-list" role="list">
        {block.rows.map((row, i) => (
          <li key={i} className="hero_time-row text-size-large">
            {row.datetime ? <time className="hero_time-hour" dateTime={row.datetime}>{row.time}</time> : <span className="hero_time-hour">{row.time}</span>}
            <span>{row.place}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
