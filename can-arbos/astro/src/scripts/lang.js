/** The language of the page: the Spanish Home says es on its page wrapper, every other page is English. */
export const pageLang = () => ((document.querySelector('.page_wrap[lang]') || document.documentElement).lang || 'en').slice(0, 2);
