// One of the 16 types. Opens its Codex article; olimpo.js adds the tint of the temperament and the two portraits.
import type { Archetype } from '@astro/data/archetypes';

export default function ArchetypeCard({ type, name, phrase, god, goddess }: Archetype) {
  return <li><button className="brands_card" type="button" data-codex={type} data-god={god} data-goddess={goddess}><span className="brands_type">{type}</span><span className="brands_name">{name}</span><span className="brands_phrase">{phrase}</span></button></li>;
}
