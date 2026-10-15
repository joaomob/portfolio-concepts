// The two link lists of the style guide hero, copied from the original page (the index labels keep its dash).
export interface NavLink { href: string; label: string }

export const heroNav: NavLink[] = [
  {
    "href": "#typography",
    "label": "Typography"
  },
  {
    "href": "#color",
    "label": "Color"
  },
  {
    "href": "#spacing",
    "label": "Spacing"
  },
  {
    "href": "#components",
    "label": "Components"
  }
];

export const sectionIndex: NavLink[] = [
  {
    "href": "#typography",
    "label": "01 — Typography"
  },
  {
    "href": "#richtext",
    "label": "02 — Rich Text"
  },
  {
    "href": "#color",
    "label": "03 — Color"
  },
  {
    "href": "#spacing",
    "label": "04 — Spacing"
  },
  {
    "href": "#sizing",
    "label": "05 — Sizing"
  },
  {
    "href": "#components",
    "label": "06 — Components"
  }
];
