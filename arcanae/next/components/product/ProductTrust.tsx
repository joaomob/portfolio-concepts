// Product reassurance row (ProductTrust.astro).
import { PRODUCT_TRUST } from '../../../astro/src/data/home';
import Trust from '../Trust';

export default function ProductTrust() {
  return (
    <section className="section_trust"><div className="padding-global"><div className="container-large">
      <Trust items={PRODUCT_TRUST} />
    </div></div></section>
  );
}
