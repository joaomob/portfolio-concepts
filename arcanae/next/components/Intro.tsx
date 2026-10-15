// The first-visit intro (Intro.astro).
import { asset } from '../../astro/src/lib/site';

export default function Intro() {
  return (
    <div className="intro_component theme-inverse" aria-hidden="true"><div className="intro_content"><img className="intro_logo" src={asset('brand/lockup-marble.svg')} alt="" /><div className="intro_line"></div><div className="intro_text">Hand-painted tarot figurines</div><div className="intro_percentage">0%</div></div></div>
  );
}
