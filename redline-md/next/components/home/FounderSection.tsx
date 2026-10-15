// The physician behind Redline MD: the portrait, the quote and the credentials (illustrative person).
// Markup ported word for word from the original index.html.
import { asset } from '@astro/lib/site';

export default function FounderSection() {
  return (
    <section className="section_founder">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="founder_padding">
            <div className="container-large">
              {' '}
              <div className="founder_component" data-anim="">
                {' '}
                <img className="founder_image" src={asset("founder.webp")} alt="Dr. Alan Brooks, founder of Redline MD" width="430" height="518" loading="lazy" />
                {' '}
                <div className="founder_content">
                  {' '}
                  <div className="tag">
                    <span className="tag_dot" />
                    The physician behind Redline MD
                  </div>
                  {' '}
                  <p className="founder_quote">
                    "I signed my first contract without understanding the tail clause. It cost me $22,000 when I changed jobs. Redline MD exists so that doesn't happen to you."
                  </p>
                  {' '}
                  <div className="founder_meta">
                    <div className="person_name">
                      Dr. Alan Brooks, MD
                    </div>
                    <div className="person_role">
                      Founder and Medical Director · Internal Medicine
                    </div>
                  </div>
                  {' '}
                  <div className="founder_credentials">
                    <span className="pill is-gray">
                      Board-certified physician
                    </span>
                    <span className="pill is-gray">
                      Clause library reviewed by healthcare attorneys
                    </span>
                  </div>
                  {' '}
                </div>
                {' '}
              </div>
              {' '}
            </div>
          </div>
          {' '}
        </div>
      </div>
      {' '}
    </section>
  );
}
