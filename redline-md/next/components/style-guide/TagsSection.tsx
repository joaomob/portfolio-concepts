// Style guide section: Tags and pills
// Markup ported word for word from the original case-study.html.

export default function TagsSection() {
  return (
    <section className="section_style-guide-tags" data-pane="style-guide" id="sg-tags">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              05
            </span>
            <h2 className="heading-style-h3">
              Tags and pills
            </h2>
            <p className="text-color-secondary">
              Tags introduce a section, pills carry status and risk level.
            </p>
          </div>
          {' '}
          <div className="style-guide_panel is-light" data-anim-group="">
            {' '}
            <div className="style-guide_item">
              <div className="tag">
                <span className="tag_dot" />
                For physicians signing their first contract
              </div>
              <p className="style-guide_code">
                tag · tag_dot
              </p>
            </div>
            {' '}
            <div className="style-guide_item">
              <span className="pill is-red">
                High
              </span>
              <p className="style-guide_code">
                pill is-red
              </p>
            </div>
            {' '}
            <div className="style-guide_item">
              <span className="pill is-amber">
                Medium
              </span>
              <p className="style-guide_code">
                pill is-amber
              </p>
            </div>
            {' '}
            <div className="style-guide_item">
              <span className="pill is-green">
                Save up to $1,751
              </span>
              <p className="style-guide_code">
                pill is-green
              </p>
            </div>
            {' '}
            <div className="style-guide_item">
              <span className="pill is-gray">
                Board-certified physician
              </span>
              <p className="style-guide_code">
                pill is-gray
              </p>
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
