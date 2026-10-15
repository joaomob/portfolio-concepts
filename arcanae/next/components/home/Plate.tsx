// Home detail band (Plate.astro).
import { asset } from '../../../astro/src/lib/site';

export default function Plate() {
  return (
    <section className="section_plate theme-inverse" aria-label="Detail of The Fool"><span className="plate_badge">3D render</span><img className="plate_image" id="plate-image" src={asset('process/the-fool-4.webp')} alt="The Fool tarot statue, detail of the embroidered sleeve and the hand, 3D render" /></section>
  );
}
