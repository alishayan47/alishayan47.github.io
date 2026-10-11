import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { filters, profile, projects } from './content';
import DissertationCaseStudy from './DissertationCaseStudy';
import PsoCaseStudy from './PsoCaseStudy';
import PsoArtwork from './PsoArtwork';
import HaggisCaseStudy from './HaggisCaseStudy';
import HaggisArtwork from './HaggisArtwork';
import SkateFishCaseStudy from './SkateFishCaseStudy';

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

function Nav({ onProjects }) {
  return <header className="site-header">
    <div className="shell nav-inner">
      <BrandMark />
      <nav aria-label="Primary navigation" className="nav-links">
        <a href="#work" onClick={onProjects}>Work</a>
        <a href="#research">Research</a>
        <a href="#about">About</a>
        <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}

function Graphic({ project, large = false }) {
  if (project.slug === 'ann-pso') return <div className={`project-art pso-landscape-art ${large ? 'project-art-large' : ''}`}><PsoArtwork /></div>;
  if (project.slug === 'good-old-haggis') return <div className={`project-art haggis-project-art ${large ? 'project-art-large' : ''}`}><HaggisArtwork large={large}/></div>;
  if (project.slug === 'distributional-hate-speech') return <div className={`project-art research-distribution-art ${large ? 'project-art-large' : ''}`} aria-label="Illustrative example of different annotator-group label distributions">
    <div className="research-distribution-inner"><div className="research-diagram-caption">ONE COMMENT · DIFFERENT PERSPECTIVES</div>
    <div className="research-diagram-comment"><span>Same text, different judgements</span></div>
    <div className="research-diagram-groups"><div><span>Group A</span><div className="research-distribution-bar"><i style={{width:'33%'}}/><b style={{width:'67%'}}/></div></div><div><span>Group B</span><div className="research-distribution-bar"><i style={{width:'50%'}}/><b style={{width:'50%'}}/></div></div></div>
    <div className="research-diagram-note">Illustrative annotation distributions · not model results</div></div>
  </div>;
  if (project.image) return <div className={`project-art ${project.slug === 'skate-fish' ? 'skate-project-art' : project.slug === 'draculas-return' ? 'dracula-project-art' : ''} ${large ? 'project-art-large' : ''}`}><img src={project.image} alt={project.slug === 'operation-nexus' ? 'Operation Nexus sci-fi FPS title menu' : `Actual gameplay screenshot from ${project.title}`} loading="lazy" /></div>;
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
  return <a className="project-card scroll-reveal" style={{ '--reveal-delay': `${(index % 2) * 75}ms` }} href={`#/project/${p.slug}`} aria-label={`Read case study: ${p.title}`}>
    <div className="card-visual"><Graphic project={p}/><span className="card-index">{String(index + 1).padStart(2, '0')}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
    <div className="card-body"><div className="card-kicker">{p.kind} <span>·</span> {p.categories[0]}</div><h3>{p.title}</h3><p>{p.subtitle}</p><div className="tag-row">{p.tags.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div></div>
  </a>;
}

function Home() {
  const [filter, setFilter] = useState('All work');
  const [showAll, setShowAll] = useState(false);
  const results = useMemo(() => projects.filter(p => filter === 'All work' || p.categories.includes(filter)), [filter]);
  const shown = filter === 'All work' && !showAll ? results.filter(p => p.prominent) : results;
  // Reveal only as content approaches the viewport. CSS and content remain usable
  // without IntersectionObserver, JavaScript motion, or when reduced motion is on.
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll('.scroll-reveal'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('reveal-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(el => {
      if (!el.classList.contains('reveal-visible')) {
        el.classList.add('reveal-ready');
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [filter, showAll]);
  return <>
    <Nav onProjects={() => { setFilter('All work'); setShowAll(false); }} />
    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-text">
          <div className="eyebrow"><span className="signal-dot"/> {profile.eyebrow}</div>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero-statement">{profile.statement}</p>
          <p className="hero-description">{profile.summary}</p>
          <p className="hero-closing">{profile.closing}</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="button button-quiet" href="#about">More about me <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="hero-bottom"><span><i/> AVAILABLE FOR OPPORTUNITIES</span><span>{profile.location} <span className="sep">/</span> Scroll to explore ↓</span></div>
      </section>

      <section id="work" className="section shell work-section" aria-labelledby="work-title">
        <div className="section-heading scroll-reveal"><div><div className="section-index">01 / SELECTED WORK</div><h2 id="work-title">Work, explored in depth<span className="period">.</span></h2><p>Experiments, products and systems — with the decisions and trade-offs behind them.</p></div><span className="section-side">{String(projects.length).padStart(2, '0')} PROJECTS</span></div>
        <div className="filter-bar" role="group" aria-label="Filter projects">
          {filters.map(f => <button key={f} type="button" className={`filter ${f===filter?'selected':''}`} onClick={()=>{setFilter(f);setShowAll(false)}} aria-pressed={f===filter}>{f}</button>)}
        </div>
        <div className="projects-grid">{shown.map((p,i)=><ProjectCard key={p.slug} p={p} index={i}/>)}</div>
        {filter==='All work' && !showAll && <button className="all-projects-button" type="button" onClick={()=>setShowAll(true)}>View all {projects.length} projects <span aria-hidden="true">↘</span></button>}
        {!shown.length && <p className="empty-state">No projects in this category yet.</p>}
      </section>

      <section id="research" className="research-band" aria-labelledby="research-title"><div className="shell research-layout"><div className="scroll-reveal"><div className="section-index">02 / RESEARCH APPROACH</div><h2 id="research-title">The result is only<br/>part of the story<span className="period">.</span></h2></div><div className="research-copy scroll-reveal"><p>Some of the most useful things I've learned started with an experiment that didn't behave as expected. I enjoy tracing failures back to their assumptions, designing follow-up tests, and explaining what the evidence actually supports.</p><p>My research interests include NLP, model evaluation, optimisation, and the practical limits of machine-learning systems.</p><a href="#work" className="text-link" onClick={()=>{setFilter('Research');setShowAll(true)}}>Browse research projects <span>↗</span></a></div></div></section>

      <section id="about" className="section shell about-section" aria-labelledby="about-title"><div className="section-index">03 / ABOUT</div><div className="about-grid"><div className="scroll-reveal"><h2 id="about-title">Engineer by practice.<br/><span>Researcher by curiosity.</span></h2></div><div className="about-copy scroll-reveal"><p>My background combines computer science and postgraduate study in artificial intelligence. I work across hands-on software development, model experimentation and interactive applications.</p><p>I'm especially interested in the space between implementation and understanding: what an algorithm does, why it behaves that way, and how to improve it when a first approach doesn't work.</p><div className="about-tags"><span>Python</span><span>C# / Unity</span><span>Java</span><span>TensorFlow</span><span>NLP & Transformers</span><span>Graph Algorithms</span><span>Experimental Evaluation</span></div><div className="credential"><span className="aside-label">CERTIFICATION</span><a href="https://www.credly.com/go/jnTjW8M5" target="_blank" rel="noreferrer">AWS Academy Cloud Foundations <span aria-hidden="true">↗</span></a><span>20-hour course · 2025</span></div>{profile.cvPath && <a className="text-link" href={profile.cvPath} download>Download CV ↗</a>}</div></div></section>

      <section id="contact" className="contact-section"><div className="shell contact-inner"><div className="scroll-reveal"><div className="section-index">04 / CONTACT</div><h2>Have something interesting<br/>to build or investigate<span className="period">?</span></h2><p>I'm open to discussing engineering roles, research opportunities, and interesting technical problems.</p></div><div className="contact-links scroll-reveal">{profile.email ? <a href={`mailto:${profile.email}`}>Email me ↗</a> : null}{profile.github ? <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a> : null}{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a> : null}</div></div></section>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name === 'YOUR NAME' ? 'Portfolio' : profile.name}</span><span>Built with care, React & GitHub Pages.</span><a href="#top">Back to top ↑</a></div></footer>
  </>;
}

function Detail({ project }) {
  useEffect(() => { document.title = `${project.title} | Portfolio`; return () => { document.title = `${profile.name} | Software Engineering & AI Research`; }; }, [project.title]);
  return <div className="detail-view"><Nav/><main className="shell detail-main"><a className="detail-back" href="#work">← Back to projects</a><div className="detail-heading"><div className="eyebrow"><span className="signal-dot"/> {project.kind} <span className="sep">/</span> {project.categories.join(' · ')}</div><h1>{project.title}<span className="period">.</span></h1><p>{project.subtitle}</p><div className="tag-row">{project.tags.map(t=><span key={t}>{t}</span>)}</div></div><Graphic project={project} large/>
      <div className="detail-grid"><article className="detail-story"><div className="section-index">OVERVIEW</div><p className="detail-lead">{project.intro}</p><h2>{project.slug === 'draculas-return' ? 'My contribution — card combat' : 'What I worked on'}</h2><ul>{project.details.map((s,i)=><li key={i}>{s}</li>)}</ul><h2>{project.slug === 'draculas-return' ? 'Gameplay focus' : 'What I learned'}</h2><p>{project.takeaway}</p>{project.figures?.length > 0 && <section className="detail-evidence" aria-label="Experimental evidence"><h2>Experimental evidence</h2><p>Selected figures from the original coursework experiments. These are reported results, not independently rerun benchmarks.</p><div className="evidence-grid">{project.figures.map((fig, i) => <figure key={fig.src} className={i===project.figures.length - 1 && project.figures.length % 2 ? 'wide' : ''}><img src={fig.src} alt={fig.alt} loading="lazy"/><figcaption>{fig.caption}</figcaption></figure>)}</div></section>}<div className="caveat"><strong>Context & limitations</strong><p>{project.caveat}</p></div></article><aside className="detail-aside"><div className="aside-label">PROJECT DETAILS</div><div className="aside-row"><span>Context</span><strong>{project.kind}</strong></div><div className="aside-row"><span>Period</span><strong>{project.year}</strong></div><div className="aside-row"><span>My role</span><strong>{project.role}</strong></div>{project.metrics.length>0 && <div className="metric-list">{project.metrics.map(m=><div className="metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}</div>}{project.links.length>0 && <div className="project-links">{project.links.map(l=><a href={l.href} key={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}</div>}</aside></div>
      {project.gallery?.length > 0 && <section className="support-gallery" aria-label="Screenshots from the game"><div className="section-index">{project.slug === 'operation-nexus' ? 'PROJECT VISUALS' : 'IN-GAME SCREENSHOTS'}</div><div className="support-gallery-grid">{project.gallery.map(shot => <figure key={shot.src}><img src={shot.src} alt={shot.alt} loading="lazy"/><figcaption>{shot.caption}</figcaption></figure>)}</div></section>}
      <div className="detail-next"><span>CONTINUE EXPLORING</span><a href={`#/project/${projects[(projects.indexOf(project)+1)%projects.length].slug}`}>{projects[(projects.indexOf(project)+1)%projects.length].title} ↗</a></div></main><footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} Portfolio</span><a href="#work">Back to projects ↑</a></div></footer></div>;
}

export default function App(){
  const route = useRoute();
  const project = route.project ? projects.find(p=>p.slug===route.project) : null;
  return project ? (project.slug === 'distributional-hate-speech' ? <DissertationCaseStudy project={project} Nav={Nav} /> : project.slug === 'ann-pso' ? <PsoCaseStudy project={project} Nav={Nav} /> : project.slug === 'good-old-haggis' ? <HaggisCaseStudy project={project} Nav={Nav} /> : project.slug === 'skate-fish' ? <SkateFishCaseStudy project={project} Nav={Nav} /> : <Detail project={project}/>) : <Home/>;
}
