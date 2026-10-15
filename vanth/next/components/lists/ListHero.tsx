// The opening of a list page: a small label, the title and one line on what the list holds.
import { tie } from '@shared/lib/text';

export function ListHero({ label, heading, lead }: { label: string; heading: string; lead: string }) {
  return (
    <section className="section_list-hero">
      <div className="padding-global">
        <div className="container-large">
          <p className="text-style-label">{label}</p>
          <h1 className="list-hero_title">{heading}</h1>
          <p className="list-hero_lead">{tie(lead)}</p>
        </div>
      </div>
    </section>
  );
}
