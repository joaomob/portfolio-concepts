// Shapes shared by the data files.

export interface FaqItem {
  question: string;
  answer: string;
}

/** A photo of the site: its path under assets/images/ (without .webp), its alt text, its width and height. */
export interface Photo {
  path: string;
  alt: string;
  width: number;
  height: number;
}
