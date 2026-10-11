import React, { useEffect } from 'react';
import { profile } from './content';
import HaggisArtwork from './HaggisArtwork';

const sections = [
  {id:'haggis-pipeline', title:'The project pipeline'},
  {id:'haggis-investigation', title:'My implementation & investigation'},
  {id:'haggis-findings', title:'Findings & reflections'},
  {id:'haggis-information', title:'Project information'},
];

function Section({id,number,title,children}){
  return <section id={id} className="dissertation-section" aria-labelledby={`${id}-title`}>
    <div className="section-index">{number} / PROJECT NOTES</div>
    <h2 id={`${id}-title`}>{title}</h2>
    {children}
  </section>;
}

function Stage({number,title,children}){
  return <div className="haggis-stage"><span>{number}</span><div><h3>{title}</h3><p>{children}</p></div></div>;
}

function DrinkIcon({variation = false}) {
  return <svg viewBox="0 0 150 102" fill="none" aria-hidden="true" className="haggis-drink-svg">
    <path d="M34 18H116L105 79Q75 93 45 79Z" fill="#314b59" stroke="#bdd2df" strokeWidth="2"/>
    <path d="M39 38H111L103 76Q75 86 47 76Z" fill={variation ? '#ac5761' : '#ad5969'} fillOpacity=".84"/>
    <path d="M39 38H111" stroke="#d88f91" strokeWidth="2"/>
    <path d="M59 48L68 61L57 70L49 57Z" fill="#e0e9eb" fillOpacity=".46"/>
    <path d="M85 50L96 57L90 71L81 63Z" fill="#e0e9eb" fillOpacity=".42"/>
    {variation ? <><path d="M89 18L114 3" stroke="#edd1ab" strokeWidth="3"/><path d="M87 18C100 16 112 24 113 35" stroke="#f0b566" strokeWidth="4" strokeLinecap="round"/></> : <><path d="M51 24Q62 10 72 24" stroke="#e8c26a" strokeWidth="5"/><path d="M57 11L62 25" stroke="#a5bb83" strokeWidth="3"/></>}
    <ellipse cx="75" cy="88" rx="46" ry="4" fill="#8098a6" fillOpacity=".2"/>
  </svg>;
}

function Illustration(){
  return <figure className="haggis-ambiguity">
    <div className="section-index">WHY INGREDIENT LABELS WERE HARD TO PREDICT FROM IMAGES</div>
    <div className="haggis-ambiguity-pair">
      <div className="haggis-ambiguity-example"><span>EXAMPLE A</span><div className="haggis-ambiguity-icon"><DrinkIcon/></div><strong>Berry-based drink</strong><p>Visually similar appearance</p><small>Cluster 6 · berry-rich composition</small></div>
      <div className="haggis-ambiguity-divider" aria-hidden="true">≠</div>
      <div className="haggis-ambiguity-example"><span>EXAMPLE B</span><div className="haggis-ambiguity-icon"><DrinkIcon variation/></div><strong>Spirit-based cocktail</strong><p>Visually similar appearance</p><small>Cluster 15 · different ingredients</small></div>
    </div>
    <figcaption>Illustrative comparison based on a real dataset example described in the group report (berry rum punch versus Absinthe Sazerac). These are schematic labels, not reproduced dataset photographs or new model predictions.</figcaption>
  </figure>;
}

export default function HaggisCaseStudy({project, Nav}){
  useEffect(()=>{
    document.title=`Good Old Haggis | ${profile.name}`;
    window.scrollTo({top:0,behavior:'instant'});
    return ()=>{document.title=`${profile.name} | Software Engineering & AI Research`;};
  },[]);

  return <div className="detail-view dissertation-view haggis-case-study">
    <Nav/>
    <main className="shell dissertation-main">
      <a className="detail-back" href="#work">← All projects</a>
      <header className="dissertation-header">
        <div className="eyebrow"><span className="signal-dot"/> FIVE-PERSON MSC GROUP PROJECT <span className="sep">/</span> 2026</div>
        <h1>Good Old Haggis<span className="period">.</span></h1>
        <p className="dissertation-deck">Exploring nutritional prediction from food images</p>
        <div className="tag-row">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        <div className="dissertation-meta"><span><strong>Institution</strong>Heriot-Watt University</span><span><strong>Focus</strong>Computer vision & clustering</span><span><strong>Type</strong>Five-person MSc group coursework</span></div>
      </header>
      <figure className="haggis-hero"><HaggisArtwork large/><figcaption>Conceptual pipeline artwork with an AI-generated meal photograph; not a food photograph from the research dataset or a validated nutritional prediction.</figcaption></figure>
      <div className="dissertation-overview">
        <div className="section-index">OVERVIEW</div>
        <p><strong>Can you estimate how healthy a homemade meal is simply by looking at a photograph?</strong></p>
        <p>Good Old Haggis was a five-person machine-learning project exploring whether food images, ingredient compositions and nutritional data could be combined to estimate Nutri-Scores for prepared meals.</p>
        <p>My work focused on the <strong>image-based pipeline</strong>: ingredient clustering, convolutional neural networks (CNNs) that predicted those clusters from photographs, and investigating why performance remained limited. I also worked on connecting ingredient-cluster profiles to estimated nutritional values.</p>
      </div>

      <div className="dissertation-layout">
        <article className="dissertation-article">
          <Section id="haggis-pipeline" number="01" title="The project pipeline">
            <p>We investigated two complementary approaches. Other team members trained classifiers to predict Nutri-Scores from <strong>known numerical nutrient values</strong>. My part addressed the harder task of inferring ingredient characteristics from <strong>food photographs</strong>, before connecting those characteristics to the nutritional-scoring stage.</p>
            <div className="haggis-stages">
              <Stage number="01" title="Represent ingredients">Convert each prepared meal into a normalised vector of ingredient proportions.</Stage>
              <Stage number="02" title="Cluster meals">Use K-Means to group meals with similar ingredient compositions and produce classes for the image model.</Stage>
              <Stage number="03" title="Predict clusters from images">Train TensorFlow CNNs to identify the ingredient-derived class from a meal photograph.</Stage>
              <Stage number="04" title="Estimate nutrition">Map each cluster's average ingredient profile to estimated nutritional values for use with the team's Nutri-Score models.</Stage>
            </div>
            <p>The central assumption was that visible properties of a meal would provide enough information to predict the clusters formed from its ingredients. Testing that assumption became the most revealing part of the project.</p>
          </Section>

          <Section id="haggis-investigation" number="02" title="My implementation and investigation">
            <h3>Ingredient clustering</h3>
            <p>I developed the K-Means stage on normalised ingredient proportions. After filtering ingredients occurring exceptionally rarely or frequently, clustering used <strong>85 ingredient features</strong>. Evaluating alternative values of K led to <strong>18 clusters</strong>, though the best silhouette score was only <strong>0.2989</strong>, indicating weak separation.</p>
            <p>One cluster contained <strong>430 meals</strong>, considerably more than other groups. Many were recipes with no strongly dominant ingredient profile. The large, heterogeneous cluster introduced noisy targets and substantial class imbalance for the CNN.</p>
            <h3>CNN development</h3>
            <p>I built and tested several TensorFlow CNN architectures to classify the meal photos into their ingredient-derived clusters. The initial network achieved <strong>29.5% test accuracy</strong> despite <strong>84.6% training accuracy</strong>—a clear overfitting signal.</p>
            <p>I experimented with smaller dense layers, batch normalisation, global average pooling, dropout, adaptive learning rates and class-stratified splits. These changes addressed training instability, but several models still predicted the dominant cluster disproportionately.</p>
            <h3>Questioning the labels, not just the architecture</h3>
            <p>Further inspection suggested a more fundamental problem: <strong>K-Means grouped recipes by their ingredient proportions, while the CNN was trained solely on image pixels.</strong> Visually similar meals could belong to different ingredient clusters, and visually different meals could share them.</p>
            <Illustration/>
            <p>To isolate the effect of a particularly noisy and overrepresented class, I removed the 430-meal cluster and augmented the remaining classes to 100 images each. The selected image-only CNN reached <strong>43.27% test accuracy</strong> and produced more balanced predictions across classes.</p>
            <div className="dissertation-note"><strong>Important comparison caveat</strong><p>This was not a controlled, like-for-like accuracy gain over the original 29.5% model: the class set and training-data distribution changed. The more important observation was that class composition substantially affected model behaviour.</p></div>
            <h3>Testing a multimodal alternative</h3>
            <p>I then explored an image-plus-ingredient model to test whether ingredient information could resolve the weak relationship between images and cluster labels. The experimental model achieved much higher accuracy, but its ingredient branch received information closely related to the target labels, potentially allowing it to succeed without learning much from images.</p>
            <p>I investigated the effect of reducing the ingredient branch's capacity. That did not establish a reliable contribution from the image branch, so I did <strong>not</strong> treat the higher accuracy as a validated improvement. The team retained the more interpretable image-only CNN results.</p>
          </Section>

          <Section id="haggis-findings" number="03" title="Findings and reflections">
            <p>Predicting Nutri-Scores from available nutritional information was comparatively effective in the team's separate structured-data experiments. Inferring a useful ingredient profile from a photograph was significantly harder.</p>
            <div className="haggis-insights">
              <div><strong>01 / Label quality matters</strong><p>An image classifier cannot reliably learn ingredient-based distinctions that are not visible in the input.</p></div>
              <div><strong>02 / Class imbalance can hide failure</strong><p>A model may appear to achieve reasonable accuracy while predicting a single dominant class far too often.</p></div>
              <div><strong>03 / Higher accuracy needs interpretation</strong><p>A multimodal model can achieve a much stronger score while relying mainly on features closely tied to how its targets were constructed.</p></div>
            </div>
            <p>The most valuable part of the project was shifting the investigation from architecture tuning to the <strong>definition of the learning task itself</strong>. More layers and regularisation could not fix a fundamental mismatch between what the labels meant and what the images revealed.</p>
            <p>A useful follow-up would be to combine visual features with ingredient information when forming the clusters, or use richer datasets with verified ingredients, quantities and pretrained visual representations.</p>
          </Section>

          <Section id="haggis-information" number="04" title="Project information">
            <dl className="pso-info-list">
              <div><dt>Project type</dt><dd>Five-person MSc group coursework</dd></div>
              <div><dt>Institution</dt><dd>Heriot-Watt University · 2026</dd></div>
              <div><dt>Technologies</dt><dd>Python, TensorFlow / Keras, NumPy, pandas, scikit-learn, CNN, K-Means</dd></div>
              <div><dt>My contribution</dt><dd>Ingredient clustering, image-based CNN experiments, diagnosis of class imbalance and label mismatch, exploratory multimodal investigation and mapping ingredient clusters to estimated nutrition. Assisted with preprocessing.</dd></div>
            </dl>
            <div className="dissertation-note"><strong>Team attribution & study scope</strong><p>The Nutri-Score classification models were developed by other team members. The nutritional mapping relied partly on approximate ingredient-to-nutrient values, and the image-only pipeline did not establish reliable nutritional prediction from photographs. This page discusses academic group coursework, not a deployed application or a peer-reviewed publication.</p></div>
          </Section>
        </article>
        <aside className="dissertation-sidebar" aria-label="Case study navigation">
          <div className="aside-label">ON THIS PAGE</div>
          <nav className="dissertation-toc" aria-label="Good Old Haggis case study sections">{sections.map((s,i)=><button type="button" key={s.id} onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'})}><span>{String(i+1).padStart(2,'0')}</span>{s.title}</button>)}</nav>
          <div className="dissertation-sidebar-links"><div className="aside-label">CONTEXT</div><p>Reported observations are taken from the team's original course report. Illustrations explain concepts and are not experiment outputs.</p></div>
        </aside>
      </div>
      <div className="detail-next"><span>CONTINUE EXPLORING</span><a href="#/project/skate-fish">Skate Fish Escape! ↗</a></div>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#work">Back to projects ↑</a></div></footer>
  </div>;
}
