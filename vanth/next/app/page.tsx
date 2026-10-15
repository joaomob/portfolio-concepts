// The Home: the season in one scroll, from the campaign to the departments.
import { Frame } from '@/components/chrome/Frame';
import { HomeHero } from '@/components/home/HomeHero';
import { Manifesto } from '@/components/home/Manifesto';
import { LinesTrack } from '@/components/home/LinesTrack';
import { Marquee } from '@/components/home/Marquee';
import { SelectedPieces } from '@/components/home/SelectedPieces';
import { FragranceTeaser } from '@/components/home/FragranceTeaser';
import { Lookbook } from '@/components/home/Lookbook';
import { Departments } from '@/components/home/Departments';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(
  'Vanth | Couture, accessories and fragrance',
  'Vanth is a concept couture house from Berlin, for the ones who dress after dark. Eight lines of clothing, shoes, accessories and fragrance for Autumn Winter 2026.',
  '',
);

export default function Home() {
  return (
    <Frame sheets="home" current="home" motion="home">
      <HomeHero />
      <Manifesto />
      <LinesTrack />
      <Marquee />
      <SelectedPieces />
      <FragranceTeaser />
      <Lookbook />
      <Departments />
    </Frame>
  );
}
