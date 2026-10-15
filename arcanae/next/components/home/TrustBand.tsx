// Home reassurance band (TrustBand.astro).
import { HOME_TRUST } from '../../../astro/src/data/home';
import Trust from '../Trust';

export default function TrustBand() {
  return (
    <section className="section_trust"><div className="padding-global"><div className="container-large">
      <Trust items={HOME_TRUST} />
    </div></div></section>
  );
}
