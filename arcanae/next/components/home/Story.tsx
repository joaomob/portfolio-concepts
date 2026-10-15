// Home story (Story.astro).
import { STORY } from '../../../astro/src/data/home';
import { asset } from '../../../astro/src/lib/site';

export default function Story() {
  return (
    <section className="section_story" id="story"><div className="padding-global padding-section-large"><div className="container-large">
      <div className="story_layout" data-reveal="">
        <figure className="story_media"><img className="story_image" src={asset(STORY.image)} alt={STORY.alt} loading="lazy" /></figure>
        <div className="story_body">
          <p className="text-style-eyebrow">Our Story</p>
          <h2>The person behind it</h2>
          <div className="story_prose">
            <p className="story_lead">{STORY.lead}</p>
            {STORY.paragraphs.map((p) => <p key={p.slice(0, 24)} className="story_paragraph">{p}</p>)}
          </div>
          <div className="margin-top margin-medium"><a className="button is-dark" href="#collection">Browse the collection</a></div>
        </div>
      </div>
    </div></div></section>
  );
}
