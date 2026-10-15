// The Lumos button of the site (button_main_wrap). It opens a modal, submits a form, or goes to a page; a link
// button is a cover link over the visual element, as the Lumos component is built in Webflow.
import type { ButtonHTMLAttributes } from 'react';

export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'link';
  /** the id of the <dialog> the button opens */
  modal?: string;
  /** a page address: the button becomes a link */
  href?: string;
  type?: 'button' | 'submit';
  /** extra combo classes on the wrapper (is-desktop, is-tablet) */
  wrapClass?: string;
}

export default function Button(props: Props) {
  const { label, variant = 'primary', modal, href, type = 'button', wrapClass, ...attrs } = props;
  const VARIANT = {
    primary: '',
    secondary: ' w-variant-e85564cd-af30-a478-692b-71732aefb3ab',
    link: ' w-variant-625d5df4-ad91-f7dc-9e2f-2e69f3fd7400',
  };
  const v = VARIANT[variant];
  const wrap = `button_main_wrap${v}${wrapClass ? ` ${wrapClass}` : ''}`;
  return (
    <>
{href ? (
  <div data-trigger="hover focus" className={wrap}><div className="clickable_wrap u-cover-absolute"><a href={href} className="clickable_link w-inline-block" aria-label={label}></a></div><div className={`button_main_element${v}`}><div aria-hidden="true" className="button_main_text u-text-style-main">{label}</div>{variant === 'link' && <div className={`button_main_line${v}`}></div>}</div></div>
) : (
  <div data-trigger="hover focus" className={wrap}><button type={type} className={`button_main_element${v}`} data-modal-open={modal} {...attrs}><span className="button_main_text u-text-style-main">{label}</span></button></div>
)}
    </>
  );
}
