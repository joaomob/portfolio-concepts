// Every page of the site with its head and its view, as the Astro pages folder lists them: the two Homes, the inner
// pages, one page per room, experience, guide and offer, and the two legal pages. The 404 lives in
// app/global-not-found.tsx.
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import type { PageMeta } from './meta';
import { canonical, asset } from './paths';
import { useTranslate } from '@astro/i18n/index';
import { rooms } from '@astro/data/rooms';
import { experiences } from '@astro/data/experiences';
import { GUIDES } from '@astro/data/journal';
import { OFFERS } from '@astro/data/offers';
import HomePage, { homeMeta } from '@/components/home/HomePage';
import LegalPageView, { legalMeta } from '@/components/legal/LegalPageView';
import AljubView, { meta as aljub } from '@/views/aljub';
import CelebrationsView, { meta as celebrations } from '@/views/celebrations';
import ExploreExperiencesView, { meta as exploreExperiences } from '@/views/explore-experiences';
import ExploreRoomsView, { meta as exploreRooms } from '@/views/explore-rooms';
import JournalView, { meta as journal } from '@/views/journal';
import MembersView, { meta as members } from '@/views/members';
import RooftopSpaView, { meta as rooftopSpa } from '@/views/rooftop-spa';
import RoomSlugView, { roomMeta } from '@/views/room-[slug]';
import ExperienceSlugView, { experienceMeta } from '@/views/experience-[slug]';
import JournalSlugView, { guideMeta } from '@/views/journal-[slug]';
import OfferSlugView, { offerMeta } from '@/views/offer-[slug]';

export interface Route {
  meta: PageMeta;
  render: () => ReactElement;
}

const route = (meta: PageMeta, render: () => ReactElement): Route => ({ meta, render });

/** The inner pages, under app/(en)/[slug]. */
export const pages: Route[] = [
  route(aljub, () => <AljubView />),
  route(celebrations, () => <CelebrationsView />),
  route(exploreExperiences, () => <ExploreExperiencesView />),
  route(exploreRooms, () => <ExploreRoomsView />),
  route(journal, () => <JournalView />),
  route(members, () => <MembersView />),
  route(rooftopSpa, () => <RooftopSpaView />),
  route(legalMeta('legal'), () => <LegalPageView slug="legal" />),
  route(legalMeta('privacy'), () => <LegalPageView slug="privacy" />),
  ...rooms.map((room) => route(roomMeta(room), () => <RoomSlugView room={room} />)),
  ...experiences.map((experience) => route(experienceMeta(experience), () => <ExperienceSlugView experience={experience} />)),
  ...GUIDES.map((guide) => route(guideMeta(guide), () => <JournalSlugView guide={guide} />)),
  ...OFFERS.map((offer) => route(offerMeta(offer), () => <OfferSlugView offer={offer} />)),
];

export const home = (lang: 'en' | 'es'): Route => route(homeMeta(lang), () => <HomePage lang={lang} />);

export const pageOf = (slug: string) => pages.find((entry) => entry.meta.slug === slug)!;

/** The head of a page, as the Astro BaseLayout writes it: translated title and description, noindex, canonical, hreflang. */
export function metadataOf({ title, description, slug, lang = 'en', alternates = false }: PageMeta): Metadata {
  const t = useTranslate(lang);
  return {
    title: t(title),
    description: t(description),
    robots: { index: false },
    alternates: {
      canonical: canonical(slug),
      ...(alternates ? { languages: { en: canonical(''), es: canonical('es'), 'x-default': canonical('') } } : {}),
    },
    icons: { icon: { url: asset('favicon.svg'), type: 'image/svg+xml' } },
  };
}
