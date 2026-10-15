// Style guide section: Surfaces and cards
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function SurfacesSection() {
  return (
    <section className="section_style-guide-surfaces" data-pane="style-guide" id="sg-surfaces">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="heading_component is-narrow" data-anim="">
                <span className="text-style-eyebrow text-color-brand">
                  06
                </span>
                <h2 className="heading-style-h3">
                  Surfaces and cards
                </h2>
                <p className="text-color-secondary">
                  {"Sections sit inside a rounded frame (section-frame > section-card, radius 40). Cards inside use radius 32, smaller parts 24, 20 and 16."}
                </p>
              </div>
              {' '}
              <div className="style-guide_tiles" data-anim-group="">
                {' '}
                <div className="style-guide_tile is-gray">
                  <p className="style-guide_code">
                    section-card
                  </p>
                </div>
                {' '}
                <div className="style-guide_tile is-gradient-hero">
                  <p className="style-guide_code">
                    section-card is-hero
                  </p>
                </div>
                {' '}
                <div className="style-guide_tile is-gradient-cta">
                  <p className="style-guide_code">
                    section-card is-cta
                  </p>
                </div>
                {' '}
                <div className="style-guide_tile is-black">
                  <p className="style-guide_code is-light">
                    problem_card · demo_review · footer_component
                  </p>
                </div>
                {' '}
                <div className="style-guide_tile is-texture">
                  <p className="style-guide_code">
                    section-card is-texture
                  </p>
                </div>
                {' '}
                <div className="style-guide_tile is-white">
                  <p className="style-guide_code">
                    how_card · pricing_component · card_component
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_subheading" data-anim="">
                <p className="heading-style-h4">
                  Cards in use
                </p>
              </div>
              {' '}
              <div className="style-guide_cards" data-anim-group="">
                {' '}
                <div className="terms_card">
                  <div className="terms_icon-wrapper">
                    <svg className="terms_icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
                    </svg>
                  </div>
                  <div className="terms_card-content">
                    <h3 className="heading-style-h4">
                      Tail coverage
                    </h3>
                    <p className="text-color-secondary">
                      Who pays malpractice tail when you leave.
                    </p>
                  </div>
                </div>
                {' '}
                <div className="testimonials_card">
                  <div className="testimonials_person">
                    <img className="testimonials_avatar" src={asset("avatar-1.webp")} alt="" width="96" height="96" />
                    <div>
                      <div className="person_name">
                        Dr. Emily Hart
                      </div>
                      <div className="person_role">
                        Family Medicine · 2025
                      </div>
                    </div>
                  </div>
                  <p className="testimonials_quote">
                    "The practice agreed to split it."
                  </p>
                  <div className="testimonials_result">
                    <span className="testimonials_result-value">
                      50/50
                    </span>
                    <span className="testimonials_result-label">
                      tail coverage
                    </span>
                  </div>
                </div>
                {' '}
                <div className="how_card">
                  <div className="how_number">
                    01
                  </div>
                  <div className="how_card-content">
                    <h3 className="heading-style-h4">
                      Upload
                    </h3>
                    <p className="text-color-secondary">
                      Add your contract, up to 30 pages.
                    </p>
                  </div>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_radii" data-anim-group="">
                {' '}
                <div className="style-guide_radius is-40">
                  <p className="style-guide_code">
                    2.5rem · section-card
                  </p>
                </div>
                {' '}
                <div className="style-guide_radius is-32">
                  <p className="style-guide_code">
                    2rem · cards
                  </p>
                </div>
                {' '}
                <div className="style-guide_radius is-24">
                  <p className="style-guide_code">
                    1.5rem · shots, art
                  </p>
                </div>
                {' '}
                <div className="style-guide_radius is-16">
                  <p className="style-guide_code">
                    1rem · flags, clauses
                  </p>
                </div>
                {' '}
                <div className="style-guide_radius is-pill">
                  <p className="style-guide_code">
                    pill · buttons, pills
                  </p>
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
