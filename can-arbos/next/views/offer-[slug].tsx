// One page per offer of the Offers collection.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import CloseBand from '@/components/ui/CloseBand';
import OfferIntro from '@/components/offers/OfferIntro';
import OfferDetails from '@/components/offers/OfferDetails';
import OtherOffers from '@/components/offers/OtherOffers';
import { OFFERS, type Offer } from '@astro/data/offers';

export const offerMeta = (offer: Offer): PageMeta => ({ title: offer.title, description: offer.meta, slug: `offer-${offer.slug}` });

export default function OfferSlugView({ offer }: { offer: Offer }) {
  return (
    <BaseLayout {...offerMeta(offer)}>
  <OfferIntro offer={offer} />
  <OfferDetails offer={offer} />
  <OtherOffers current={offer} />
  <CloseBand />
</BaseLayout>
  );
}
