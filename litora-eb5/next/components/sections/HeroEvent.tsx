// The first screen of the webinar and the event pages: the photo, the panel with the date, and the form in the panel.
// From 992 px the photo opens from the right half to the whole width while the runway passes (motion.ts, 2).
import type { SharedView, ViewOf } from '@astro/lib/content';
import { HeroTopBanner } from '../HeroTopBanner';
import { Keep } from '../Keep';
import { Picture } from '../Picture';
import { TimeBlock } from '../TimeBlock';
import { FormCard } from './FormCard';

export function HeroEvent({ view, shared }: { view: ViewOf<'hero-event'>; shared: SharedView }) {
  return (
    <section className="section_hero-event theme-inverse" data-hero="">
      <div className="hero_layout">
        <div className="hero_media">
          <Picture className="hero_image" wide={view.wide} tall={view.tall} alt={view.imageAlt} sizes="100vw" priority data={{ 'data-hero-image': '' }} />
        </div>
        <div className="hero_panel">
          <HeroTopBanner shared={shared} />
          <div className="hero_content">
            <p className="text-style-eyebrow text-color-secondary">{view.eyebrow}</p>
            <h1><Keep text={view.heading} /></h1>
            <div className="hero_details">
              {view.details.map((detail, i) => <p key={i} className="text-size-large">{detail.text}</p>)}
            </div>
            <TimeBlock block={view.timeBlock} />
            <p className="text-size-large text-color-secondary">{view.body}</p>
          </div>
          {view.form && <FormCard view={view.form} />}
        </div>
        <div className="hero_runway" aria-hidden="true" data-hero-runway=""></div>
      </div>
    </section>
  );
}
