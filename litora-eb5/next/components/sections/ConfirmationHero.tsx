// The first screen of the thank you pages: the same panel as the event hero, still, with the calendar file to save.
// The calendar file is written once, by the Astro build, so the link points at its Astro address.
import type { SharedView, ViewOf } from '@astro/lib/content';
import { ButtonLabel } from '../ButtonLabel';
import { HeroTopBanner } from '../HeroTopBanner';
import { Keep } from '../Keep';
import { Picture } from '../Picture';
import { TimeBlock } from '../TimeBlock';

export function ConfirmationHero({ view, shared }: { view: ViewOf<'confirmation-hero'>; shared: SharedView }) {
  return (
    <section className="section_confirmation-hero theme-inverse" data-hero="">
      <div className="hero_layout is-static">
        <div className="hero_media">
          <Picture className="hero_image" wide={view.wide} tall={view.tall} alt={view.imageAlt} sizes="100vw" priority />
        </div>
        <div className="hero_panel">
          <HeroTopBanner shared={shared} />
          <div className="hero_content">
            <h1><Keep text={view.heading} /></h1>
            {view.details.length > 0 && (
              <div className="hero_details">{view.details.map((detail, i) => <p key={i} className="text-size-large">{detail.text}</p>)}</div>
            )}
            <TimeBlock block={view.timeBlock} />
            {view.body && <p className="text-size-large text-color-secondary">{view.body}</p>}
            {view.calendar && view.calendarHref && (
              <div className="hero_actions">
                <a className="button" href={view.calendarHref} download={view.calendar.fileName}><ButtonLabel label={view.calendar.buttonLabel} /></a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
