import type { SharedView } from '@astro/lib/content';

export function LanguageSwitch({ shared }: { shared: SharedView }) {
  const { languages } = shared;
  return (
    <ul className="language-switch_list" role="list">
      <li><span className="language-switch_link is-current" aria-current="true">{languages.current}</span></li>
      <li>
        <a className="language-switch_link" href={languages.href} hrefLang={languages.lang}>
          <span aria-hidden="true">{languages.other}</span><span className="visually-hidden">{languages.otherLabel}</span>
        </a>
      </li>
    </ul>
  );
}
