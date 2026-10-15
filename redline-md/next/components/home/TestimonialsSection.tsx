// The testimonials: a grid on desktop and a carousel with dots and arrows below 992 px (home.js), from
// data/testimonials.ts.
import { testimonials } from '@astro/data/testimonials';
import { asset } from '@astro/lib/site';

export default function TestimonialsSection() {
  return (
    <section className="section_testimonials">
      <div className="padding-global padding-section-large"><div className="container-large">
        <div className="heading_component is-center" data-anim=""><h2 className="heading-style-h2">{testimonials.heading}</h2></div>
        <div className="testimonials_component" data-anim-group="" data-carousel="">
          {testimonials.items.map((item) => (
            <div key={item.name} className="testimonials_card">
              <div className="testimonials_person"><img className="testimonials_avatar" src={asset(item.avatar)} alt="" width="96" height="96" /><div><div className="person_name">{item.name}</div><div className="person_role">{item.role}</div></div></div>
              <p className="testimonials_quote">{item.quote}</p>
              <div className="testimonials_result"><span className="testimonials_result-value">{item.value}</span><span className="testimonials_result-label">{item.label}</span></div>
            </div>
          ))}
        </div>
        <div className="carousel_nav" data-carousel-nav=""><div className="carousel_dots">{testimonials.items.map((item, i) => <span key={item.name} className={i === 0 ? 'carousel_dot is-active' : 'carousel_dot'} data-dot={String(i)} />)}</div><div className="carousel_arrows"><div className="carousel_arrow is-off" role="button" tabIndex={0} aria-label="Previous testimonial" data-dir="-1">←</div><div className="carousel_arrow" role="button" tabIndex={0} aria-label="Next testimonial" data-dir="1">→</div></div></div>
      </div></div>
    </section>
  );
}
