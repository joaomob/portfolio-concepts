// Questions before you book, the first one open.
import FaqBlock from '@/components/ui/FaqBlock';
import { HOME_FAQ } from '@astro/data/home';
import type { Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function HomeFaq(props: Props) {
  return (
    <>
<FaqBlock title="Questions before you book" items={HOME_FAQ} lang={props.lang} />
    </>
  );
}
