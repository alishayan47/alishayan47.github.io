import React, { useEffect, useMemo, useState } from 'react';
import { filters, profile, projects } from './content';

function useRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => {
      const nextHash = window.location.hash;
      setHash(nextHash);
      if (nextHash.startsWith('#/project/') || nextHash === '#top') {
        window.scrollTo({top: 0, behavior: 'instant'});
      } else if (nextHash.startsWith('#')) {
        // When returning from a project route, the home section has to mount first.
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const target = document.getElementById(nextHash.slice(1));
          target?.scrollIntoView({behavior: 'smooth', block: 'start'});
        }));
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash.startsWith('#/project/') ? { project: decodeURIComponent(hash.slice(10)) } : { project: null };
}

function BrandMark() {
  return <a href="#top" className="brand" aria-label="Portfolio home">
    <span className="brand-icon" aria-hidden="true"><span className="brand-line"></span><span className="brand-point"></span></span>
    <span className="brand-word">{profile.name === 'YOUR NAME' ? 'PORTFOLIO' : profile.name}</span>
    <span className="brand-dot">.</span>
  </a>;
}

function Nav() {
  return <header className="site-header">
    <div className="shell nav-inner">
      <BrandMark />
      <nav aria-label="Primary navigation" className="nav-links">
        <a href="#work">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}

function Graphic({ project, large = false }) {
  if (project.image) return <div className={`project-art ${large ? 'project-art-large' : ''}`}><img src={project.image} alt={`Actual gameplay screenshot from ${project.title}`} loading="lazy" /></div>;
  return <div aria-hidden="true" className={`project-art generated-art art-${project.art} ${large ? 'project-art-large' : ''}`}>
    <div className="visual-grid" />
    {project.art === 'pso' ? <div className="pso-orbit"><i/><i/><i/><i/><i/><i/></div> : null}
    {project.art === 'nlp' ? <div className="nlp-art"><span>p(y|x)</span><em>distribution ≠ decision</em><div className="nlp-bars"><b/><b/><b/><b/><b/><b/><b/><b/><b/></div></div> : null}
    {project.art === 'vision' ? <div className="vision-art"><div className="vision-target"><i/><i/><i/><i/></div><span>INPUT ≠ LABEL</span></div> : null}
    {project.art === 'safety' ? <div className="generic-art">S / H</div> : null}
    {project.art === 'word' ? <div className="generic-art">word → vector</div> : null}
    {project.art === 'dracula' ? <div className="generic-art dracula-art">♠</div> : null}
  </div>;
}

function ProjectCard({ p, index }) {
  return <a className="project-card" href={`#/project/${p.slug}`} aria-label={`Read case study: ${p.title}`}>
    <div className="card-visual"><Graphic project={p}/><span className="card-index">{String(index + 1).padStart(2, '0')}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
    <div className="card-body">
      <div className="card-kicker">{p.categories[0]} <span>·</span> {p.kind}</div>
      <h3>{p.title}</h3>
      <p>{p.subtitle}</p>
      <div className="tag-row">{p.tags.slice(0, 2).map(t => <span key={t}>{t}</span>)}</div>
    </div>
  </a>;
}

function Home() {
  const [showArchive, setShowArchive] = useState(false);
  const [filter, setFilter] = useState('All work');
  const featured = projects.filter(p => p.prominent);
  const archive = projects.filter(p => !p.prominent && (filter === 'All work' || p.categories.includes(filter)));

  return <>
    <Nav />
    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-text">
          <div className="eyebrow"><span className="signal-dot"/> ALI SHAYAN AMIR  <span className="sep">/</span> SOFTWARE ENGINEER & AI RESEARCHER</div>
          <h1 id="hero-title">I build software.<br/><span>I investigate intelligence.</span></h1>
          <p className="hero-description">I develop software, explore machine learning, and build intelligent game systems. I care about the engineering behind the result — not just the final number.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">See selected projects <span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href="#contact">Get in touch <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="hero-bottom"><span><i/> OPEN TO ENGINEERING & RESEARCH OPPORTUNITIES</span><span>{profile.location}</span></div>
      </section>

      <section id="work" className="section shell work-section" aria-labelledby="work-title">
        <div className="section-heading">
          <div><div className="section-index">SELECTED PROJECTS</div><h2 id="work-title">A few things I've built<span className="period">.</span></h2><p>Four projects that best represent my work. Open any card for the technical details.</p></div>
        </div>
        <div className="projects-grid">{featured.map((p,i) => <ProjectCard key={p.slug} p={p} index={i}/>)}</div>
        <div className="archive-intro">
          <div><h3>More work</h3><p>Earlier game development, NLP coursework and collaborative research.</p></div>
          <button type="button" className="archive-toggle" onClick={() => setShowArchive(v=>!v)} aria-expanded={showArchive} aria-controls="project-archive">{showArchive ? 'Hide other projects' : `Browse ${projects.length-featured.length} more projects`} <span aria-hidden="true">{showArchive?'↑':'↗'}</span></button>
        </div>
        {showArchive && <div id="project-archive" className="project-archive">
          <div className="filter-bar" role="group" aria-label="Filter other projects">
            {filters.map(f => <button key={f} type="button" className={`filter ${f===filter?'selected':''}`} onClick={()=>setFilter(f)} aria-pressed={f===filter}>{f}</button>)}
          </div>
          <div className="archive-list">{archive.map(p => <a key={p.slug} className="archive-row" href={`#/project/${p.slug}`}><div><span className="archive-kind">{p.categories[0]}</span><h4>{p.title}</h4><p>{p.subtitle}</p></div><span className="archive-arrow" aria-hidden="true">↗</span></a>)}</div>
          {archive.length===0 && <p className="empty-state">No other projects in this category. The featured projects above may match instead.</p>}
        </div>}
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="shell about-inner">
          <div className="about-intro"><div className="section-index">ABOUT ME</div><h2 id="about-title">Curious about how<br/>systems really work<span className="period">.</span></h2></div>
          <div className="about-copy">
            <p>I'm a computer science graduate with postgraduate training in artificial intelligence. I enjoy both writing the code and understanding why the approach works — or why it doesn't.</p>
            <div className="about-education">
              <div><strong>MSc Artificial Intelligence</strong><span>Heriot-Watt University</span></div>
              <div><strong>BS Computer Science</strong><span>FAST-NUCES, Islamabad</span></div>
            </div>
            <p className="skills-label">AREAS I WORK IN</p>
            <div className="about-tags"><span>Python & ML</span><span>NLP</span><span>Unity & C#</span><span>Algorithms</span><span>Java</span><span>Experimental Evaluation</span></div>
            <div className="credential"><span className="aside-label">ADDITIONAL TRAINING</span><a href="https://www.credly.com/go/jnTjW8M5" target="_blank" rel="noreferrer">AWS Academy Cloud Foundations ↗</a></div>
            {profile.cvPath && <a className="text-link" href={profile.cvPath} download>Download CV ↗</a>}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="shell contact-inner"><div><div className="section-index">LET'S CONNECT</div><h2 id="contact-title">Let's build something<br/>worth exploring<span className="period">.</span></h2><p>Open to software engineering, AI and research opportunities.</p></div><div className="contact-links">{profile.email ? <a href={`mailto:${profile.email}`}>Email me ↗</a> : null}{profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}</div></div></section>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built with React · Hosted on GitHub Pages</span><a href="#top">Back to top ↑</a></div></footer>
  </>;
}

function Detail({ project }) {
  useEffect(() => { document.title = `${project.title} | Portfolio`; return () => { document.title = `${profile.name} | Software Engineering & AI Research`; }; }, [project.title]);
  return <div className="detail-view"><Nav/><main className="shell detail-main"><a className="detail-back" href="#work">← Back to projects</a><div className="detail-heading"><div className="eyebrow"><span className="signal-dot"/> {project.kind} <span className="sep">/</span> {project.categories.join(' · ')}</div><h1>{project.title}<span className="period">.</span></h1><p>{project.subtitle}</p><div className="tag-row">{project.tags.map(t=><span key={t}>{t}</span>)}</div></div><Graphic project={project} large/>
      <div className="detail-grid"><article className="detail-story"><div className="section-index">OVERVIEW</div><p className="detail-lead">{project.intro}</p><h2>What I worked on</h2><ul>{project.details.map((s,i)=><li key={i}>{s}</li>)}</ul><h2>What I learned</h2><p>{project.takeaway}</p>{project.figures?.length > 0 && <section className="detail-evidence" aria-label="Experimental evidence"><h2>Experimental evidence</h2><p>Selected figures from the original coursework experiments. These are reported results, not independently rerun benchmarks.</p><div className="evidence-grid">{project.figures.map((fig, i) => <figure key={fig.src} className={i===project.figures.length - 1 && project.figures.length % 2 ? 'wide' : ''}><img src={fig.src} alt={fig.alt} loading="lazy"/><figcaption>{fig.caption}</figcaption></figure>)}</div></section>}<div className="caveat"><strong>Context & limitations</strong><p>{project.caveat}</p></div></article><aside className="detail-aside"><div className="aside-label">PROJECT DETAILS</div><div className="aside-row"><span>Context</span><strong>{project.kind}</strong></div><div className="aside-row"><span>Period</span><strong>{project.year}</strong></div><div className="aside-row"><span>My role</span><strong>{project.role}</strong></div>{project.metrics.length>0 && <div className="metric-list">{project.metrics.map(m=><div className="metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}</div>}{project.links.length>0 && <div className="project-links">{project.links.map(l=><a href={l.href} key={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}</div>}</aside></div>
      <div className="detail-next"><span>CONTINUE EXPLORING</span><a href={`#/project/${projects[(projects.indexOf(project)+1)%projects.length].slug}`}>{projects[(projects.indexOf(project)+1)%projects.length].title} ↗</a></div></main><footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} Portfolio</span><a href="#work">Back to projects ↑</a></div></footer></div>;
}

export default function App(){
  const route = useRoute();
  const project = route.project ? projects.find(p=>p.slug===route.project) : null;
  return project ? <Detail project={project}/> : <Home/>;
}
