// One attempt that stopped: the X, the goal and how many days it lasted.
import type { Attempt } from '@astro/data/attempts';

export default function AttemptCard({ goal, lasted }: Attempt) {
  return <div className="logos_item"><div className="logos_card"><svg className="logos_x" viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 4.5 15.5 15.5M15.5 4.5 4.5 15.5" /></svg><span className="logos_name">{goal}</span><span className="logos_meta">{lasted}</span></div></div>;
}
