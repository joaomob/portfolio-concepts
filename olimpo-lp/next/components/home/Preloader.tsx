// Only the logo, at the size and with the pulse of the current landing. Skipped on later visits (sessionStorage).
import { asset } from '@astro/lib/site';

export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader_mark">
        <img src={asset('logo-white.svg')} alt="" width="320" height="99" />
      </div>
    </div>
  );
}
