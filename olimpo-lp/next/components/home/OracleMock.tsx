// The Oracle phone. Scrolling types the request and builds the plan: phones.js shows each .om-step when the
// section progress passes its data-show value (and hides it again past data-hide).
import { oracleGoal, oraclePlan } from '@astro/data/planner';

export default function OracleMock() {
  return (
    <div className="oracle-mock" data-oracle="" data-goal={oracleGoal} aria-hidden="true">
      <div className="om-hd"><span className="om-sig">◇</span><span className="om-ht">Oráculo</span><span className="om-hs">IA · SMART</span></div>
      <div className="om-body">
        <div className="om-feed" data-feed="">
          <div className="om-msg om-user om-step" data-show="0.18"><span data-typed="" /></div>
          <div className="om-msg om-ai om-step" data-show="0.26">
            <span className="om-dots om-step" data-show="0.26" data-hide="0.34"><span /><span /><span /></span>{' '}
            <span className="om-aitext om-step" data-show="0.34">Pronto. Montei um plano SMART em 3 fases:</span>
          </div>
          <div className="om-card om-step" data-show="0.40">
            <div className="om-loading om-step" data-show="0.40" data-hide="0.48">Montando seu plano <span className="om-dots dim"><span /><span /><span /></span></div>
            <div className="om-content om-step" data-show="0.48">
              {oraclePlan.map((row) => (
                <div key={row.text} className={`om-row om-${row.kind} om-step`} data-show={row.show}><span className="om-chk">✓</span> <span>{row.text}</span>{row.date && <> <span className="om-date">{row.date}</span></>}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="om-inputbar"><span className="om-itext ph" data-itext="">Descreva seu objetivo…</span><span className="om-caret" /><span className="om-send">↑</span></div>
    </div>
  );
}
