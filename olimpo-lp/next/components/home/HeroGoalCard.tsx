// Olimpo's own goal, drawn like the app's "Goal progress" card (dark theme). The bar fills with the end of the
// hero video, then the card opens and shows the roadmap, project by project (phones.js).
import LearnMore from './LearnMore';

const projects = [
  { name: 'Criar o aplicativo', state: 'completed', tasks: 'Pesquisa · Planejamento · Design · Desenvolvimento · Lançamento' },
  { name: 'Levar o Olimpo a mais pessoas', state: 'now', tag: 'agora', tasks: 'Comunidade · Conteúdo · Parcerias' },
  { name: 'Alavancar', state: 'next', tag: 'depois', tasks: 'Quíron contínuo · Novos recursos · Novos mercados' },
];
const stateClass: Record<string, string> = { completed: ' is-completed', now: ' is-now', next: '' };

export default function HeroGoalCard() {
  return (
    <div className="hero_meta" data-hero-meta="" hidden>
      <p className="hero-goal_label"><span aria-hidden="true">◎</span> A meta do Olimpo</p>
      <div className="hero-goal_top"><span className="hero-goal_icon" aria-hidden="true">🏛️</span><span className="hero-goal_name">Colocar o Olimpo no mundo</span><span className="hero-goal_num" data-hero-goal-num="">0%</span></div>
      <div className="hero-goal_bar" aria-hidden="true"><i data-hero-goal-fill="" /></div>
      <div className="hero-goal_roadmap" data-hero-goal-roadmap="">
        <ol className="hero-goal_list">
          {projects.map((p) => (
            <li key={p.name} className={`hero-goal_project${stateClass[p.state]}`}><span className="hero-goal_check" aria-hidden="true" /><span className="hero-goal_text"><span className="hero-goal_project-name">{p.name}{p.state === 'completed' && <span className="sr-only">, concluído</span>}{p.tag && <> <span className="hero-goal_tag">{p.tag}</span></>}</span><span className="hero-goal_tasks">{p.tasks}</span></span></li>
          ))}
        </ol>
      </div>
      {/* the goal card leads to its Codex entry (D3): the story behind the goal and the three projects */}
      <LearnMore entries={['D3']} variant="is-light hero-goal_learn-more" motion="none" />
    </div>
  );
}
