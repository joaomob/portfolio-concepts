// The Focus Mode phone, ported from the landing with the same markup and phases. phones.js drives the ring,
// the phase and the time from the active step.
export default function FocusMock() {
  return (
    <div className="oracle-mock focus-mock" data-focus="" aria-hidden="true">
      <div className="om-status"><span>9:41</span><span className="om-sb" /></div>
      <div className="om-hd">
        <span className="om-sig">◴</span>{' '}
        <span className="om-ht">Modo Foco</span>{' '}
        <span className="om-hs" data-focus-cycle="">CONFIGURAR ▾</span>
      </div>
      <div className="om-body focus-body">
        <div className="fm-icons">
          <span className="fm-ic" aria-label="Respiração"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" opacity=".55" /><circle cx="12" cy="12" r="1.8" fill="currentColor" /></svg></span>{' '}
          <span className="fm-ic" aria-label="Microfone"><svg viewBox="0 0 24 24" fill="none"><rect x="9" y="1" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M12 19v3M8 23h8" /></svg></span>{' '}
          <span className="fm-ic fm-ic-x" aria-label="Fechar">×</span>
        </div>
        <div className="fm-ring">
          <svg viewBox="0 0 220 220" className="fm-ring-svg">
            <circle className="fm-ring-bg" cx="110" cy="110" r="100" />
            <circle className="fm-ring-fg" cx="110" cy="110" r="100" data-focus-ring="" />
          </svg>
          <div className="fm-ring-inner">
            <span className="fm-phase" data-focus-phase="">FOCO</span>{' '}
            <span className="fm-time" data-focus-time="">25:00</span>{' '}
            <span className="fm-pct" data-focus-pct="">0%</span>
          </div>
        </div>
        <div className="fm-task">
          <div className="fm-task-name" data-focus-task="">Somar os gastos fixos</div>
          <div className="fm-task-tag" data-focus-task-meta="">🏠 Entrada do apartamento · Fase 1</div>
        </div>
        <div className="fm-actions">
          <button className="fm-btn fm-primary" data-focus-pausebtn=""><span data-focus-pauseicon="">❚❚</span> <span data-focus-pauselabel="">Pausar</span></button>{' '}
          <button className="fm-btn fm-ghost">■ Encerrar</button>
        </div>
        <div className="fm-music" data-focus-music="">
          <div className="fm-music-cover"><svg viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg></div>
          <div className="fm-music-info">
            <div className="fm-music-title">Lo-Fi Beats</div>
            <div className="fm-music-sub">Chillhop · Foco profundo</div>
          </div>
          <div className="fm-music-eq"><span /><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}
