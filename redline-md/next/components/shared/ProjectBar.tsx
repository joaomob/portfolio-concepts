// The project bar on top of every page: the three review tabs and the author credit (a link to joaomob.com).
// The page script marks the tab of the page as active.
import { projectBar } from '@astro/data/project-bar';
import { page } from '@/lib/links';

export default function ProjectBar() {
  return (
    <header className="project-bar_component">
      <nav className="project-bar_links" aria-label="Project">
        {projectBar.map((tab) => (
          <a key={tab.review} className="project-bar_link" href={page(tab.href)} data-review={tab.review}>{tab.label}</a>
        ))}
      </nav>
      {' '}
      <a className="project-bar_label is-right" href="https://joaomob.com" target="_blank" rel="noopener">by João Marcos Oliveira</a>
    </header>
  );
}
