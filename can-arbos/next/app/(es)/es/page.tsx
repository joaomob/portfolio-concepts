// The Spanish Home, at /concepts/can-arbos/next/es.
import { home, metadataOf } from '@/lib/routes';

const route = home('es');
export const metadata = metadataOf(route.meta);
export default function Page() {
  return route.render();
}
