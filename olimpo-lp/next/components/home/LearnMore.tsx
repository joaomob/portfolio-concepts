// The row of Codex doors that closes most sections. variant carries the layout classes (center, is-light).
import CodexDoor from './CodexDoor';
import { cx, motionAttrs, type Motion } from '../motion';

export default function LearnMore({ entries, variant = '', motion = 'reveal' }: { entries: string[]; variant?: string; motion?: Motion }) {
  return (
    <div className={cx('learn-more', variant)} {...motionAttrs(motion)}>
      <span className="learn-more_label">Saiba mais</span>{' '}
      {entries.map((entry) => <CodexDoor key={entry} entry={entry} />)}
    </div>
  );
}
