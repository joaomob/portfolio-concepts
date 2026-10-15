// Home (src/pages/index.astro in the Astro build).
import Collection from '../components/home/Collection';
import Craft from '../components/home/Craft';
import Faq from '../components/home/Faq';
import Hero from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import Plate from '../components/home/Plate';
import Story from '../components/home/Story';
import TrustBand from '../components/home/TrustBand';
import Wheel from '../components/home/Wheel';
import SiteFrame from '../components/SiteFrame';
import { HOME_META } from '../../astro/src/data/pages';
import { pageMetadata } from '../lib/meta';

export const metadata = pageMetadata(HOME_META, '');

export default function HomePage() {
  return (
    <SiteFrame page="home" cartNote cards>
      <Hero />
      <Collection />
      <Craft />
      <TrustBand />
      <Plate />
      <Story />
      <Faq />
      <Wheel />
      <Newsletter />
    </SiteFrame>
  );
}
