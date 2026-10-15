// The small label with the orange dot over each heading ("02 · O problema").
import { cx, motionAttrs, type Motion } from '../motion';

export default function Eyebrow({ text, variant = '', motion = 'reveal' }: { text: string; variant?: string; motion?: Motion }) {
  return <div className={cx('dot-wrapper', variant)} {...motionAttrs(motion)}><span className="small-dot" /><span>{text}</span></div>;
}
