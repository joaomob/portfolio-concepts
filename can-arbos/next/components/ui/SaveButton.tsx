// Save to My stay: the kind and the item go in two attributes and the name in its own span (one CMS field each).


export interface Props {
  kind: string;
  item: string;
  name: string;
}

export default function SaveButton(props: Props) {
  const { kind, item, name } = props;
  return (
    <>
<button type="button" className="save_button" data-save={kind} data-save-item={item} aria-pressed="false"><span className="u-sr-only">{name}</span> <span data-save-label="">Save</span></button>
    </>
  );
}
