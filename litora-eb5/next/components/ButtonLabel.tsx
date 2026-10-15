// The label of every button: the text and a clone under it that slides in on hover (the clone is hidden from readers).
export function ButtonLabel({ label }: { label: string }) {
  return (
    <span className="button_text-wrap">
      <span className="button_text">{label}</span>
      <span className="button_text is-clone" aria-hidden="true">{label}</span>
    </span>
  );
}
