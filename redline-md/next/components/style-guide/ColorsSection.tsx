// Style guide section: Colors
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function ColorsSection() {
  return (
    <section className="section_style-guide-colors" data-pane="style-guide" id="sg-colors">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              01
            </span>
            <h2 className="heading-style-h3">
              Colors
            </h2>
            <p className="text-color-secondary">
              Black and white carry the page, red marks risk and the brand, blush warms the surfaces, and green only means savings.
            </p>
          </div>
          {' '}
          <div className="style-guide_colors" data-anim-group="">
            {' '}
            <div className="style-guide_color">
              <div className="background-color-black">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Black
                </p>
                <p className="style-guide_code">
                  #0a0a0a · background-color-black
                </p>
                <p className="style-guide_usage">
                  Text, primary buttons, dark cards, footer
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-white">
                <div className="style-guide_swatch is-ring" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  White
                </p>
                <p className="style-guide_code">
                  #ffffff · background-color-white
                </p>
                <p className="style-guide_usage">
                  Page, cards on gray, secondary buttons
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-gray-50">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Gray 50
                </p>
                <p className="style-guide_code">
                  #f8f7f7 · background-color-gray-50
                </p>
                <p className="style-guide_usage">
                  Section cards, feature and testimonial cards
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-gray-200">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Gray 200
                </p>
                <p className="style-guide_code">
                  #eeeeee · background-color-gray-200
                </p>
                <p className="style-guide_usage">
                  Borders, rings, gray pills, carousel arrows
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-gray-300">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Gray 300
                </p>
                <p className="style-guide_code">
                  #d9d9d9 · background-color-gray-300
                </p>
                <p className="style-guide_usage">
                  Dots, dashed dropzone, text on black
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-gray-500">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Gray 500
                </p>
                <p className="style-guide_code">
                  #9a9999 · background-color-gray-500
                </p>
                <p className="style-guide_usage">
                  Firm bar, labels on dark, sources
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-gray-600">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Gray 600
                </p>
                <p className="style-guide_code">
                  #696868 · background-color-gray-600
                </p>
                <p className="style-guide_usage">
                  Body text color
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-gray-900">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Gray 900
                </p>
                <p className="style-guide_code">
                  #272727 · background-color-gray-900
                </p>
                <p className="style-guide_usage">
                  Borders and tracks on dark cards
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-red">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Red
                </p>
                <p className="style-guide_code">
                  #de332f · background-color-red
                </p>
                <p className="style-guide_usage">
                  Brand, accent button, risk bar, button hover
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-red-light">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Red light
                </p>
                <p className="style-guide_code">
                  #ff5b54 · background-color-red-light
                </p>
                <p className="style-guide_usage">
                  Red on black: big numbers, slider, active flag
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-red-dark">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Red dark
                </p>
                <p className="style-guide_code">
                  #b42320 · background-color-red-dark
                </p>
                <p className="style-guide_usage">
                  Red text on light: strikes, risk values
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-blush">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Blush
                </p>
                <p className="style-guide_code">
                  #fde3df · background-color-blush
                </p>
                <p className="style-guide_usage">
                  Active clause, icon circles, red pills
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-blush-light">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Blush light
                </p>
                <p className="style-guide_code">
                  #fff4f2 · background-color-blush-light
                </p>
                <p className="style-guide_usage">
                  Gradient stop in the hero and CTA
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-green">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Green
                </p>
                <p className="style-guide_code">
                  #1c7a43 · background-color-green
                </p>
                <p className="style-guide_usage">
                  Savings and suggested redlines
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-green-light">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Green light
                </p>
                <p className="style-guide_code">
                  #e3f4e8 · background-color-green-light
                </p>
                <p className="style-guide_usage">
                  Savings badge, inserted text
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-amber">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Amber
                </p>
                <p className="style-guide_code">
                  #f2b441 · background-color-amber
                </p>
                <p className="style-guide_usage">
                  Medium risk dot
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="background-color-amber-light">
                <div className="style-guide_swatch" />
              </div>
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Amber light
                </p>
                <p className="style-guide_code">
                  #fdf0d5 · background-color-amber-light
                </p>
                <p className="style-guide_usage">
                  Medium risk pill
                </p>
              </div>
            </div>
            {' '}
          </div>
          {' '}
          <div className="style-guide_subheading" data-anim="">
            <p className="heading-style-h4">
              Logo
            </p>
            <p className="text-size-small text-color-secondary">
              Redline's own logo, with the tagline typo fixed ("Reiew" to "Review") using the letters of the original file. The light version swaps the navy for white on dark backgrounds.
            </p>
          </div>
          {' '}
          <div className="style-guide_tiles is-logo" data-anim-group="">
            {' '}
            <div className="style-guide_tile is-logo-white">
              <img className="brand_logo" src={asset("logo.webp")} alt="Redline MD logo" width="560" height="136" />
              <p className="style-guide_code">
                logo.webp · brand_logo · 2.5 / 2.125rem tall
              </p>
            </div>
            {' '}
            <div className="style-guide_tile is-logo-black">
              <img className="brand_logo" src={asset("logo-light.webp")} alt="Redline MD logo, light version" width="560" height="136" />
              <p className="style-guide_code is-light">
                logo-light.webp · footer
              </p>
            </div>
            {' '}
          </div>
          {' '}
          <div className="style-guide_subheading" data-anim="">
            <p className="heading-style-h4">
              Gradients
            </p>
          </div>
          {' '}
          <div className="style-guide_colors is-2-columns" data-anim-group="">
            {' '}
            <div className="style-guide_color">
              <div className="style-guide_swatch is-tall is-gradient-hero" />
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  Hero
                </p>
                <p className="style-guide_code">
                  section-card is-hero · #ffffff → #fff4f2 → #fde3df
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_color">
              <div className="style-guide_swatch is-tall is-gradient-cta" />
              <div className="style-guide_color-info">
                <p className="style-guide_label">
                  CTA
                </p>
                <p className="style-guide_code">
                  section-card is-cta · #fff4f2 → #fde3df
                </p>
              </div>
            </div>
            {' '}
          </div>
          {' '}
        </div>
      </div>
      {' '}
    </section>
  );
}
