// One "Saiba mais" door: a button that opens a Codex entry as a tab in the dock (olimpo.js listens on data-codex).
import { codexDoors } from '@astro/data/codex-doors';

export default function CodexDoor({ entry }: { entry: string }) {
  const door = codexDoors[entry];
  if (!door) throw new Error(`No Codex door for ${entry}`);
  return <button className="codex-door" type="button" data-codex={entry}><svg className="codex-door_icon" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: door.icon }} />{door.label}</button>;
}
