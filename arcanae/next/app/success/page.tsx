// After a paid checkout (src/pages/success.astro): no menu, footer or cart.
import SiteFrame from '../../components/SiteFrame';
import Success from '../../components/Success';
import { SUCCESS_META } from '../../../astro/src/data/pages';
import { pageMetadata } from '../../lib/meta';

export const metadata = pageMetadata(SUCCESS_META, 'success');

export default function SuccessPage() {
  return (
    <SiteFrame page="success" chrome={false}>
      <Success />
    </SiteFrame>
  );
}
