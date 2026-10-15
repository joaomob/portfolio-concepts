// A page of the shop (the bag, the checkout): the menu and the footer of the house around a page that fills the screen,
// without the animation library.
import type { ReactNode } from 'react';
import { Frame } from '../chrome/Frame';

export function ShopPage({ after, children }: { after?: ReactNode; children: ReactNode }) {
  return (
    <Frame sheets="shop" current={null} motion={null} fill after={after}>
      <section className="section_shop">
        <div className="padding-global">
          <div className="container-large">{children}</div>
        </div>
      </section>
    </Frame>
  );
}
