// A name set word by word, each word on its own line in the giant titles.
import { Fragment } from 'react';
import { words } from '@shared/lib/text';

export function Words({ text }: { text: string }) {
  return words(text).map((word, i) => <Fragment key={i}>{i > 0 && ' '}<span className="collection-hero_word">{word}</span></Fragment>);
}
