// The product section (Product.astro, ProductGallery.astro and ProductInfo.astro).
import { ARTWORK, FINISH, INCLUDES, USES, type Card } from '../../../astro/src/data/catalog';
import { detailRows, dispatchNote, gallery, inStock, meaningParts, money, specChips, stockLabel } from '../../../astro/src/lib/catalog';

function Gallery({ card }: { card: Card }) {
  const { shots, renders } = gallery(card);
  const first = shots[0];
  const facts = card.correspondences;
  return (
    <div className="pdp_gallery">
      {first ? (
        <div className="gallery_main is-loupe" id="gmain" role="button" tabIndex={0} data-large={first.large}><img className={`gallery_image${renders ? '' : ' is-contain'}`} id="gimg" src={first.src} alt={`${card.name}, a 3D-printed resin statue, hand-painted`} /><span className="gallery_badge" id="gbadge" hidden={!renders}>3D render</span><div className="gallery_lens" aria-hidden="true"></div></div>
      ) : (
        <div className="gallery_main" id="gmain"><span className="gallery_roman">{card.roman}</span></div>
      )}
      {shots.length > 1 && (
        <div className="gallery_thumbs">{shots.map((s, i) => <button key={s.src} className="gallery_thumb" type="button" aria-label={`Image ${i + 1}`} aria-current={i === 0 ? 'true' : 'false'} data-shot={i} data-src={s.src} data-large={s.large}><img className="gallery_thumb-image" src={s.thumb} alt="" /></button>)}</div>
      )}
      {first && <p className="gallery_hint">Hover to zoom · click to enlarge</p>}
      {facts && (
        <aside className="pdp_facts">
          <h3 className="pdp_facts-heading">Correspondences</h3>
          <div className="facts_row"><span className="facts_label">Element</span><span className="facts_value">{facts.element}</span></div>
          <div className="facts_row"><span className="facts_label">Astrology</span><span className="facts_value">{facts.astrology}</span></div>
          <div className="facts_row"><span className="facts_label">Energy</span><span className="facts_value">{facts.energy}</span></div>
          <div className="facts_row"><span className="facts_label">For</span><span className="facts_value">{facts.forWhom}</span></div>
          <div className="facts_keys">{facts.keywords.map((k) => <span key={k} className="facts_key">{k}</span>)}</div>
        </aside>
      )}
    </div>
  );
}

function Info({ card }: { card: Card }) {
  const stock = inStock(card);
  const meaning = meaningParts(card);
  return (
    <div className="pdp_info">
      <p className="text-style-eyebrow">{card.roman} · <span>The Major Arcana</span></p>
      <h1 className="heading-style-h2">{card.name} Tarot Statue</h1>
      <p className="pdp_price">{money(card.price)}</p>
      <div className="pdp_specs"><span className={`pdp_chip ${stock ? 'is-stock' : 'is-made'}`}>{stockLabel(card)}</span>{specChips(card).map((s) => <span key={s} className="pdp_chip">{s}</span>)}</div>
      <p className="pdp_desc"><span>A 3D-printed resin statue, hand-painted in a white marble finish and sealed with matte varnish.</span> <span>{card.blurb}</span></p>
      <ul className="pdp_includes">{INCLUDES.map((i) => <li key={i} className="pdp_include-item">{i}</li>)}</ul>
      <p className="pdp_finish-label">Finish</p>
      <p className="pdp_finish">{FINISH.label}<span className="pdp_finish-note">{FINISH.note}</span></p>
      <div className="pdp_cta">
        <button className="button is-gold is-full" id="add-to-cart" data-card={card.id} data-finish={FINISH.id}>Add to Cart <span>· {money(card.price)}</span></button>
      </div>
      <p className="pdp_note"><strong>{stockLabel(card)}</strong> · <span>{dispatchNote(card)}</span> <span>Ships from Spain. Taxes &amp; shipping calculated at checkout.</span></p>
      <div className="pdp_block is-first">
        <h2 className="pdp_block-heading">Details</h2>
        <div className="pdp_detail-list">{detailRows(card).map(([label, value]) => <div key={label} className="facts_row"><span className="facts_label">{label}</span><span className="facts_value">{value}</span></div>)}</div>
      </div>
      <div className="pdp_block">
        <h2 className="pdp_block-heading">What it means</h2>
        <p className="pdp_meaning">{meaning.lead && <span className="pdp_meaning-lead">{meaning.lead}</span>}{meaning.rest}</p>
      </div>
      <div className="pdp_block">
        <h2 className="pdp_block-heading">Ways to keep it</h2>
        <p className="pdp_block-text">{USES}</p>
      </div>
      <div className="pdp_block">
        <h2 className="pdp_block-heading">The artwork</h2>
        <p className="pdp_block-text">{ARTWORK}</p>
      </div>
    </div>
  );
}

export default function Product({ card }: { card: Card }) {
  return (
    <section className="section_product"><div className="padding-global padding-section-medium"><div className="container-large"><div id="pdp" data-name={card.name}>
      <div className="pdp_layout">
        <Gallery card={card} />
        <Info card={card} />
      </div>
    </div></div></div></section>
  );
}
