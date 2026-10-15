// The English Home, at /concepts/can-arbos/next.
import { home, metadataOf } from '@/lib/routes';

const route = home('en');
export const metadata = metadataOf(route.meta);
export default function Page() {
  return route.render();
}
