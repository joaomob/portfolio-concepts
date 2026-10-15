// 9 · Staying power: the bento with the curfew dial, the streak and the trophies.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import Term from './Term';
import TapDial from './TapDial';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function StayingPowerSection() {
  return (
    <section className="section section_staying-power" id="staying-power" aria-labelledby="h-staying-power">
      <div className="section-card is-gray">
        <div className="container bento_component">
          <div className="title-grid" data-reveal="">
            <Eyebrow text={eyebrowOf('staying-power')} motion="none" />
            <div className="max-w _01">
              <h2 className="h3-display" id="h-staying-power">No ranking <span className="gray-font"><span className="otherfont">sobe</span> quem volta.</span></h2>
              <div className="divider-s" />
              <p className="p-subhead add-max-w">O <Term entry="C9">ranking</Term> dá metade dos pontos à regularidade. <span className="gray-font">Horas acumuladas de uma vez pesam pouco.</span></p>
            </div>
          </div>

          <div className="bento_grid">
            <article className="bento_vertical" data-reveal="">
              <img className="bento_bg" src={asset('img/morpheus-portrait-dark.webp')} alt="" width="900" height="1260" loading="lazy" />
              <div className="bento_vertical-top">
                <p className="bento_kicker">E existe uma sequência que quebra pelo motivo contrário.</p>
                <h3 className="bento_huge">Toque de Recolher</h3>
              </div>
              <TapDial />
              <p className="bento_vertical-paragraph">O <strong>Toque de Recolher</strong> conta os dias em que o trabalho parou antes das 23h. Passou do horário, zera. Varou a madrugada, zera, e o dia fica marcado.</p>
            </article>
            <article className="bento_top" data-reveal="">
              <div className="bento_media"><video className="cover" muted loop playsInline preload="none" poster={asset('video/glory-flame-dark.webp')} data-autoplay="" aria-hidden="true"><source src={asset('video/glory-flame-dark.mp4')} type="video/mp4" /></video></div>
              <div className="bento_top-content">
                <p className="bento_word">Streak</p>
                <div className="streak" aria-hidden="true"><div className="streak_anim" data-lottie-streak="" /><span className="streak_count" data-streak-count="">0</span></div>
                <p className="bent_paragraph">O <Term entry="C7" light>streak</Term> soma os dias em que houve volta. Quebrar a sequência não apaga o que já foi feito.</p>
              </div>
            </article>
            <article className="bento_bottom" data-reveal="">
              <div className="bento_media"><video className="cover" muted loop playsInline preload="none" poster={asset('video/glory-podium-light.webp')} data-autoplay="" aria-hidden="true"><source src={asset('video/glory-podium-light.mp4')} type="video/mp4" /></video></div>
              <div className="bento_bottom-content">
                <p className="bento_word">Troféus</p>
                <p className="bento_paragraph">Os <Term entry="C8" light>troféus</Term> vêm da mitologia grega e não se perdem. As estatísticas mostram um ano de trabalho numa tela só. A comunidade sobe junto, pela mesma régua.</p>
              </div>
            </article>
          </div>

          <LearnMore entries={['C7', 'C8', 'C9', 'A9', 'A10']} />
        </div>
      </div>
    </section>
  );
}
