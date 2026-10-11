import React, { useEffect } from 'react';
import { profile } from './content';

const sections = [
  {id:'skate-navigation', title:'The navigation system'},
  {id:'skate-levels', title:'Traffic and pursuit across levels'},
  {id:'skate-gameplay', title:'Gameplay systems'},
  {id:'skate-reflection', title:'What I learned'},
  {id:'skate-information', title:'Project information'},
];

function Section({id, number, title, children}) {
  return <section id={id} className="dissertation-section" aria-labelledby={`${id}-title`}>
    <div className="section-index">{number} / DEVELOPMENT NOTES</div>
    <h2 id={`${id}-title`}>{title}</h2>
    {children}
  </section>;
}

function ImageEvidence({src, alt, caption, wide = false}) {
  return <figure className={`skate-evidence ${wide ? 'skate-evidence-wide' : ''}`}>
    <img src={src} alt={alt} loading="lazy" />
    <figcaption>{caption}</figcaption>
  </figure>;
}

export default function SkateFishCaseStudy({project, Nav}) {
  useEffect(() => {
    document.title = `Skate Fish Escape! | ${profile.name}`;
    window.scrollTo({top:0,behavior:'instant'});
    return () => { document.title = `${profile.name} | Software Engineering & AI Research`; };
  }, []);

  return <div className="detail-view dissertation-view skate-case-study">
    <Nav />
    <main className="shell dissertation-main">
      <a className="detail-back" href="#work">← All projects</a>
      <header className="dissertation-header">
        <div className="eyebrow"><span className="signal-dot"/> SOLO MSC GAME COURSEWORK <span className="sep">/</span> 2026</div>
        <h1>Skate Fish Escape!<span className="period">.</span></h1>
        <p className="dissertation-deck">A playful escape game with custom traffic navigation and A* pursuit AI.</p>
        <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="dissertation-meta"><span><strong>Engine</strong>Unity · C#</span><span><strong>Focus</strong>Game AI and graph navigation</span><span><strong>Visual assets</strong>Free third-party map and character assets</span></div>
        <a className="skate-demo-button" href="https://youtu.be/roHZlinKR80" target="_blank" rel="noopener noreferrer">Watch gameplay demo <span aria-hidden="true">↗</span></a>
      </header>

      <figure className="skate-main-visual">
        <img src="/media/skate-fish-gameplay.webp" alt="Skate Fish Escape gameplay: a blue skateboarding fish moving through a city street among cars and trucks" />
        <figcaption>Actual Unity gameplay capture. The city and character art use free third-party assets; the gameplay and vehicle navigation systems were implemented for this project.</figcaption>
      </figure>

      <div className="dissertation-overview">
        <div className="section-index">OVERVIEW</div>
        <p><strong>How do you make an arcade chase feel different across levels without rebuilding the entire AI system?</strong></p>
        <p>Skate Fish Escape! is a stylised Unity game in which a fish on a skateboard collects items, navigates city streets and tries to avoid traffic and pursuing police cars.</p>
        <p>I built the <strong>player controller, gameplay logic and vehicle navigation systems</strong>, including manually authored road graphs and custom A* pathfinding for police pursuit. I used free third-party assets for the map and characters; the focus of my work was making those assets function together as a playable game.</p>
      </div>

      <div className="dissertation-layout">
        <article className="dissertation-article">
          <Section id="skate-navigation" number="01" title="The navigation system">
            <p>Instead of using Unity's built-in NavMesh, I built a <strong>node-based road network</strong>. Each node marked a permitted road position, while the connections between nodes defined where a vehicle could travel next.</p>
            <p>The graph was authored manually so I could control one-way movement, legal turns, junction behaviour and the differences between civilian and police traffic.</p>

            <ImageEvidence
              src="/media/skate-fish-directed-nodes.webp"
              alt="Unity Scene view showing yellow navigation nodes linked across roads and a multi-way intersection"
              caption="Development view of the road network. Yellow markers and connecting lines show manually laid-out navigation nodes and their links."
              wide
            />

            <h3>Directed roads and junctions</h3>
            <p>For rule-following vehicles, node connections were <strong>directional</strong>. A car approaching an intersection could only choose an outgoing edge that represented a permitted turn. That gave the traffic system road rules instead of allowing vehicles to move freely toward their destinations.</p>
            <p>It also made the graph itself a gameplay tool: changing the permitted connections changed how a pursuer could reach the player.</p>

            <h3>A* pursuit of a moving player</h3>
            <p>Police vehicles used <strong>A* pathfinding</strong> to find routes across the graph toward the player's changing position. I integrated route updates into the chase behaviour rather than treating the path as a fixed start-to-finish calculation.</p>
            <p>In the second level, police had to navigate valid road connections when reversing course. Once sufficiently close to the player, they could switch from graph routing to a more direct pursuit mode.</p>

            <ImageEvidence
              src="/media/skate-fish-route-debug.webp"
              alt="Unity Scene view with a red route overlay and coloured nodes tracing a path along a city street"
              caption="Navigation debugging in Unity: a highlighted road route and node markers used while developing vehicle routing."
              wide
            />
          </Section>

          <Section id="skate-levels" number="02" title="Traffic and pursuit across levels">
            <p>The three levels introduced progressively less forgiving pursuit behaviour. Rather than only changing vehicle speed, I changed the <strong>constraints the vehicles had to follow</strong>.</p>
            <div className="skate-level-list">
              <div><span>01</span><div><h3>Highway chase</h3><p>A simpler road environment established the escape mechanics, collectibles and a more straightforward police chase.</p></div></div>
              <div><span>02</span><div><h3>City pursuit with directional roads</h3><p>Police used the directed node graph and A* to pursue the player while respecting junctions and road direction. Reversing direction required a valid route through the road network, rather than turning around instantly.</p></div></div>
              <div><span>03</span><div><h3>Separate civilian and police networks</h3><p>Civilian vehicles followed <strong>directional road links</strong> and selected valid branches at junctions, creating moving hazards. Police used a separate <strong>bidirectional graph</strong>, allowing more aggressive route corrections and 180-degree changes of direction.</p></div></div>
            </div>
            <ImageEvidence
              src="/media/skate-fish-overview-graph.webp"
              alt="Wide Unity Scene view of a city block showing multiple roads with dense navigation lines and node markers"
              caption="A wider view of the city navigation setup, showing road-linked paths spread across intersections and blocks."
              wide
            />
            <p>The directional graph and the more permissive police graph were particularly important in level three. They allowed civilian vehicles to behave like normal traffic while police remained threatening, without requiring an unrelated pathfinding system.</p>
          </Section>

          <Section id="skate-gameplay" number="03" title="Making it a playable game">
            <p>Alongside the pathfinding, I implemented and integrated the supporting game systems: player movement, collectible tracking, scoring, collisions, win/lose conditions, level objectives and UI. These systems linked the AI behaviour to a complete gameplay loop rather than leaving it as an isolated navigation demo.</p>
            <ImageEvidence
              src="/media/skate-fish-police-chase.webp"
              alt="Unity gameplay view of the skateboard-riding fish next to a pursuing black-and-white police car in a city street"
              caption="Gameplay capture showing the fish character and a police vehicle in the city level."
              wide
            />
          </Section>

          <Section id="skate-reflection" number="04" title="What I learned">
            <p>The biggest lesson was that <strong>pathfinding and behaviour are not the same thing</strong>. A* determines a route, but the graph representation determines which routes are possible, how vehicles turn and which driving rules they follow.</p>
            <p>The project combined graph algorithms, real-time control and gameplay design. Changing the connectivity of the road network—and when the police switched between routing and direct pursuit—produced different levels of difficulty without needing an entirely new game architecture.</p>
            <p>Working with third-party visual assets also made the distinction between <strong>asset creation</strong> and <strong>systems implementation</strong> clear. My contribution was the code and gameplay behaviour, not modelling the city or characters.</p>
          </Section>

          <Section id="skate-information" number="05" title="Project information">
            <dl className="pso-info-list">
              <div><dt>Project type</dt><dd>Solo MSc game coursework</dd></div>
              <div><dt>Engine and language</dt><dd>Unity, C#</dd></div>
              <div><dt>Technical focus</dt><dd>Custom A*, directed and bidirectional road graphs, police pursuit, traffic behaviour, player control and gameplay systems</dd></div>
              <div><dt>Visual assets</dt><dd>Free third-party city/map and character assets; not presented as original models</dd></div>
              <div><dt>Video demonstration</dt><dd><a className="skate-inline-link" href="https://youtu.be/roHZlinKR80" target="_blank" rel="noopener noreferrer">Watch unlisted gameplay demo ↗</a></dd></div>
            </dl>
            <div className="dissertation-note"><strong>Scope and attribution</strong><p>This is an academic game project, not a commercial release. The screenshots are from the Unity project; environment and character assets were sourced from free third-party packages. The custom navigation, pursuit and gameplay systems described above are the implementation work being showcased.</p></div>
          </Section>
        </article>

        <aside className="dissertation-sidebar" aria-label="Case study navigation">
          <div className="aside-label">ON THIS PAGE</div>
          <nav className="dissertation-toc" aria-label="Skate Fish Escape case study sections">{sections.map((s,i) => <button type="button" key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'})}><span>{String(i+1).padStart(2,'0')}</span>{s.title}</button>)}</nav>
          <div className="dissertation-sidebar-links"><div className="aside-label">DEMO</div><a href="https://youtu.be/roHZlinKR80" target="_blank" rel="noopener noreferrer">Watch gameplay video ↗</a><p>Unlisted YouTube demonstration, originally shared for coursework assessment. The owner provided this link for the portfolio.</p></div>
        </aside>
      </div>
      <div className="detail-next"><span>CONTINUE EXPLORING</span><a href="#/project/draculas-return">Dracula's Return ↗</a></div>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#work">Back to projects ↑</a></div></footer>
  </div>;
}
