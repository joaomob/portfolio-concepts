// The closing band: the cancellation line and the booking buttons.
import Button from '@/components/ui/Button';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function HomeClose(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="close_home_wrap u-section u-theme-dark" aria-label={t("Book")}>
  <div className="close_home_contain u-container">
    <div className="close_home_layout">
      <p className="close_home_line u-text-style-h2">{t("Free room cancellation up to 7 days before arrival.")}</p>
      <div className="u-button-wrapper">
        <Button label={t("Book a room")} modal="room-modal" />
        <Button label={t("Book a table")} variant="secondary" modal="table-modal" />
      </div>
    </div>
  </div>
</section>
    </>
  );
}
