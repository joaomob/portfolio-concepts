// The curfew dial. olimpo.js plays it with GSAP on the SVG; a Rive file (curfew.riv) would take over the canvas,
// but it is switched off until the file exists.
export default function TapDial() {
  return (
    <div className="tap" data-tap="" data-state="idle" aria-hidden="true">
      <canvas className="tap_rive" width="480" height="480" hidden />
      <svg className="tap_svg" viewBox="0 0 240 240">
        <circle className="tap_track" cx="120" cy="120" r="100" />
        <g className="tap_ticks" />
        <circle className="tap_arc" cx="120" cy="120" r="100" transform="rotate(-90 120 120)" />
        <circle className="tap_mark" cx="120" cy="20" r="5" />
        <line className="tap_hand" x1="120" y1="10" x2="120" y2="34" />
        <text className="tap_num" x="120" y="128" textAnchor="middle">29</text>
        <text className="tap_h" x="120" y="156" textAnchor="middle">23h</text>
        <path className="tap_check" d="M104 176 l10 10 l22 -22" />
        <line className="tap_strike" x1="92" y1="112" x2="148" y2="112" />
      </svg>
    </div>
  );
}
