import React, { useEffect } from 'react';
import { profile } from './content';

const sections = [
  { id: 'problem', title: 'The problem' },
  { id: 'questions', title: 'Research objectives' },
  { id: 'dataset', title: 'Preparing the data' },
  { id: 'architecture', title: 'Model architecture' },
  { id: 'retrieval', title: 'Context retrieval' },
  { id: 'evaluation', title: 'Training & evaluation' },
  { id: 'results', title: 'Experimental findings' },
  { id: 'limitations', title: 'Limitations' },
  { id: 'reflections', title: 'Reflections' },
];

function Section({ id, number, title, children }) {
  return <section id={id} className="dissertation-section" aria-labelledby={`${id}-heading`}>
    <div className="section-index">{number} / RESEARCH NOTES</div>
    <h2 id={`${id}-heading`}>{title}</h2>
    {children}
  </section>;
}

function Findings({ number, title, children }) {
  return <div className="dissertation-finding">
    <div className="dissertation-finding-number">{number}</div>
    <div><h3>{title}</h3>{children}</div>
  </div>;
}

function ModelVariant({ name, children }) {
  return <div className="dissertation-model"><h3>{name}</h3><p>{children}</p></div>;
}

function ComparisonTable({ headers, rows, caption }) {
  return <div className="dissertation-table-wrap" role="region" aria-label={caption} tabIndex={0}>
    <table className="dissertation-table"><caption>{caption}</caption><thead><tr>{headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((value, j) => j === 0 ? <th scope="row" key={j}>{value}</th> : <td key={j}>{value}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function DissertationCaseStudy({ project, Nav }) {
  useEffect(() => {
    document.title = 'Context-Augmented Distributional Hate Speech Prediction | Ali Shayan Amir';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => { document.title = `${profile.name} | Software Engineering & AI Research`; };
  }, []);

  return <div className="detail-view dissertation-view">
    <Nav />
    <main className="shell dissertation-main">
      <a href="#work" className="detail-back">← All projects</a>
      <header className="dissertation-header">
        <div className="eyebrow"><span className="signal-dot"/> INDIVIDUAL MSC DISSERTATION <span className="sep">/</span> 2026</div>
        <h1>Context-Augmented Distributional Prediction of Hate Speech towards Women and Immigrants<span className="period">.</span></h1>
        <p className="dissertation-deck">Can an AI model learn not just whether a comment is hateful, but how different groups of people might interpret it?</p>
        <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="dissertation-meta"><span><strong>Institution</strong> Heriot-Watt University</span><span><strong>Degree</strong> MSc Artificial Intelligence</span><span><strong>Type</strong> Individual academic research</span></div>
      </header>

      <div className="dissertation-overview" aria-label="Project overview">
        <div className="section-index">OVERVIEW</div>
        <p>Hate speech detection is commonly treated as a classification problem where each comment receives a single label. But people can interpret the same language differently, and majority-vote labels discard this disagreement.</p>
        <p>For my MSc dissertation, I developed a <strong>perspective-aware distributional modelling framework</strong> using RoBERTa. I compared three ways of incorporating annotator-group identity and built a semantic retrieval pipeline to test whether relevant background knowledge improved predictions.</p>
        <p>The study focused on hate speech targeting women and immigrants, with annotator gender and political ideology used to define the respective groups. Learned identity representations generally improved prediction quality. Retrieved context helped many individual predictions, but did not consistently improve aggregate results.</p>
      </div>

      <div className="dissertation-layout">
        <article className="dissertation-article">
          <Section id="problem" number="01" title="The problem">
            <p>Many datasets combine multiple human annotations into a single consensus label. This makes model training simpler but can hide meaningful differences in interpretation, particularly in subjective tasks such as hate speech detection.</p>
            <p>A comment judged by several annotators may receive a mix of <em>not hateful</em>, <em>possibly hateful</em> and <em>explicitly hateful</em> labels. Reducing those judgements to one majority label erases the distribution of opinions.</p>
            <p>Rather than searching for a single supposedly correct judgement, this research examined whether a model could predict <strong>how judgements are distributed within different annotator groups</strong>. It also asked whether missing social and political context might explain some prediction errors.</p>
          </Section>

          <Section id="questions" number="02" title="Research objectives">
            <ol>
              <li>How effectively can distributional prediction model annotator disagreement in hate speech targeting women and immigrants?</li>
              <li>Does explicitly incorporating annotator-group identity improve predictions?</li>
              <li>Can retrieved contextual information further improve perspective-aware distributional prediction?</li>
            </ol>
            <p>The experimental design progressively extended a shared RoBERTa backbone so that identity and context could be investigated through controlled comparisons.</p>
          </Section>

          <Section id="dataset" number="03" title="Preparing the data">
            <p>I used the <strong>Measuring Hate Speech (MHS)</strong> dataset, which retains individual judgements alongside annotator metadata. The initial corpus subset contained <strong>19,761 unique comments</strong> and <strong>49,433 annotation records</strong>.</p>
            <p>I created two discourse-specific datasets, requiring each retained comment to have annotations from at least two different subgroups:</p>
            <ComparisonTable caption="Final perspective-aware datasets after filtering" headers={['Discourse', 'Grouping', 'Retained comments']} rows={[
              ['Women-targeted', 'Gender', '3,953'],
              ['Immigrant-targeted', 'Political ideology', '3,797'],
            ]}/>
            <p>The annotation-level records were converted into <strong>comment–subgroup training instances</strong>. For each instance, I calculated a three-value probability distribution representing the proportion of annotators who chose:</p>
            <ul><li>Not hate speech</li><li>May be hate speech</li><li>Explicit hate speech</li></ul>
            <div className="dissertation-example">
              <div className="section-index">ILLUSTRATIVE DISTRIBUTION</div>
              <p>Three annotations from one subgroup — labels 2, 2 and 1 — yield <strong>[0.00, 0.33, 0.67]</strong>. A different subgroup may produce a different distribution for the very same text.</p>
            </div>
            <p>A fixed 70%/15%/15% train/validation/test split was performed at the <strong>original-comment level</strong>, keeping all subgroup instances derived from one comment in the same partition to avoid text leakage.</p>
          </Section>

          <Section id="architecture" number="04" title="Model architecture and identity conditioning">
            <p>I implemented <strong>seven experimental configurations</strong> using a shared RoBERTa-base encoder. The first predicted distributions from the comment alone; three introduced annotator identity; and another three combined identity conditioning with retrieved context.</p>
            <div className="dissertation-models">
              <ModelVariant name="Text-only RoBERTa baseline">Encoded the comment and predicted a three-class probability distribution using a prediction head, without annotator identity or external information.</ModelVariant>
              <ModelVariant name="Identity token">Prefixed the comment with a token representing the annotator subgroup, allowing RoBERTa to process identity as part of the text.</ModelVariant>
              <ModelVariant name="Learned identity embedding">Assigned each subgroup a trainable embedding and concatenated it with the encoded comment representation before prediction.</ModelVariant>
              <ModelVariant name="Feature-wise Linear Modulation (FiLM)">Used a learned subgroup embedding to generate feature-wise scaling and shifting parameters that modulated the RoBERTa representation before prediction.</ModelVariant>
            </div>
            <p>Keeping the backbone and distributional objective consistent allowed differences between identity-conditioning strategies to be compared without switching to unrelated model architectures.</p>
          </Section>

          <Section id="retrieval" number="05" title="Building the context-retrieval pipeline">
            <p>To investigate whether external knowledge helps model subjective judgements, I developed a retrieval pipeline combining curated Wikipedia sources, LLM-generated summaries and semantic similarity.</p>
            <div className="dissertation-steps">
              <div><span>01</span><div><h3>Curate identity-specific knowledge</h3><p>Selected articles covering relevant political, social and gender concepts, organised into repositories associated with the annotator groups. These were contextual resources, not claims about what every member of a group believes.</p></div></div>
              <div><span>02</span><div><h3>Generate and select summaries</h3><p>Created candidate article summaries using <strong>Llama 3.1 8B, Qwen 2.5 7B-Instruct and Mistral 7B</strong>. Candidates were assessed using ROUGE-L Precision, BERTScore Precision, BARTScore, length suitability and manual checks for factual grounding and neutrality.</p></div></div>
              <div><span>03</span><div><h3>Retrieve relevant context</h3><p>Used Sentence-BERT to embed comments and summaries, then selected the highest-cosine-similarity summary from the appropriate subgroup repository.</p></div></div>
              <div><span>04</span><div><h3>Augment the model input</h3><p>Appended the selected summary to the original comment while retaining the identity-conditioning mechanism. This produced Context + Token, Context + Embedding and Context + FiLM variants.</p></div></div>
            </div>
            <p>Context repositories and selected summaries were prepared ahead of training, making them reusable and ensuring consistent resources across comparable experiments.</p>
          </Section>

          <Section id="evaluation" number="06" title="Training and evaluation">
            <p>The implementation used <strong>Python, PyTorch and Hugging Face Transformers</strong>. Models were fine-tuned separately for the women-targeted and immigrant-targeted domains, with validation-based checkpoint selection and early stopping. Context-augmented models required longer input sequences and smaller batches.</p>
            <p>Because the goal was to predict distributions rather than just class labels, evaluation measured several complementary aspects of performance:</p>
            <ComparisonTable caption="Evaluation metrics used in the dissertation" headers={['Metric', 'Interpretation']} rows={[
              ['Jensen–Shannon divergence (JS)', 'Agreement between predicted and empirical label distributions'],
              ['Cross-entropy (CE)', 'Quality of distributional predictions'],
              ['Entropy MAE', 'Alignment between predicted uncertainty and observed disagreement'],
              ['ANAD', 'Closeness to individual annotators’ ordinal labels'],
              ['Hard-label accuracy', 'Conventional classification performance'],
            ]}/>
            <p>I also performed <strong>subgroup-level</strong> evaluations and <strong>counterfactual</strong> tests, where the comment stayed constant but the supplied annotator identity changed. This helped examine whether the models actually used identity information, rather than merely improving aggregate scores.</p>
          </Section>

          <Section id="results" number="07" title="Experimental findings">
            <Findings number="01" title="Learned identity representations generally performed better">
              <p>Identity Embedding and FiLM generally improved on the text-only baseline. Identity Token was less consistent and often performed worse. FiLM achieved the strongest overall ANAD and hard-label accuracy for both discourse domains; Identity Embedding was particularly competitive on distributional metrics.</p>
              <ComparisonTable caption="Selected held-out test results: lower JS and higher accuracy are better" headers={['Model', 'Immigration JS ↓', 'Immigration accuracy ↑', 'Women JS ↓', 'Women accuracy ↑']} rows={[
                ['Baseline', '0.2296', '76.59%', '0.2420', '70.16%'],
                ['Identity Embedding', '0.2238', '77.02%', '0.2415', '70.59%'],
                ['Identity FiLM', '0.2195', '77.75%', '0.2432', '71.01%'],
              ]}/>
              <p>These results also show why accuracy alone was insufficient: for women-targeted discourse, FiLM improved hard-label accuracy while its JS divergence was slightly worse than the baseline.</p>
            </Findings>
            <Findings number="02" title="Context was not a universal improvement">
              <p>Adding background knowledge produced mixed aggregate results. Some contextual models improved uncertainty estimation, but no context-augmented variant consistently outperformed its corresponding identity-only version across both domains and all metrics.</p>
            </Findings>
            <Findings number="03" title="Many individual predictions did benefit from context">
              <p>At the instance level, Context + FiLM reduced JS divergence for <strong>59.4% of immigrant-targeted instances</strong> and <strong>58.9% of women-targeted instances</strong>. Other instances worsened, helping explain the small aggregate differences.</p>
            </Findings>
            <Findings number="04" title="Identity sensitivity was not the same as human disagreement">
              <p>Counterfactual tests showed that identity-conditioned models changed their predictions when the subgroup identity changed. Yet even the strongest variants captured only <strong>1.14%</strong> of empirical subgroup separation in immigrant-targeted discourse and <strong>2.99%</strong> in women-targeted discourse.</p>
              <p>This was a central limitation: models responded to identity, but reproduced only a small fraction of the variation observed between human annotator groups.</p>
            </Findings>
            <Findings number="05" title="Contextual usefulness depended on the instance">
              <p>Higher retrieval similarity was associated with <em>more frequent, but smaller</em> improvements. Some retrieved articles performed better than others on average, while comment length showed no consistent relationship with improvement. No single factor reliably explained when context helped.</p>
            </Findings>
          </Section>

          <Section id="limitations" number="08" title="Limitations and future directions">
            <p>The study also exposed constraints that matter when interpreting the findings:</p>
            <ul>
              <li><strong>Uneven annotation support.</strong> Some subgroup label distributions were calculated from very few annotators, occasionally just one.</li>
              <li><strong>Underrepresented intermediate labels.</strong> “May be hate speech” accounted for relatively few annotations, limiting examples of subtle interpretations.</li>
              <li><strong>Restricted perspective definitions.</strong> One demographic or ideological attribute cannot capture the full complexity of human identity and beliefs.</li>
              <li><strong>Limited external knowledge.</strong> Curated Wikipedia articles provided reproducible context but not necessarily the most useful evidence for each comment.</li>
            </ul>
            <p>Promising future work includes confidence-aware learning from uneven annotation counts, intersectional subgroup modelling, improved retrieval strategies, and testing across additional subjective NLP tasks.</p>
          </Section>

          <Section id="reflections" number="09" title="Reflections">
            <p>This dissertation brought together several aspects of ML research I enjoy: constructing useful data representations, adapting neural architectures, building retrieval pipelines and evaluating what systems really learn.</p>
            <p>One of the most useful lessons was that <strong>better aggregate scores do not tell the whole story</strong>. An architecture could improve classification accuracy without improving distributional similarity. Retrieved context could benefit a majority of instances without improving the overall average.</p>
            <p>The counterfactual experiments were especially revealing: responding to annotator identity and reproducing the complexity of human perspectives turned out to be two very different achievements.</p>
            <div className="dissertation-note"><strong>Academic context</strong><p>This was an individual MSc dissertation at Heriot-Watt University, supervised by Dr. Simona Frenda with co-supervision from Dr. Gavin Abercrombie. Results are reported from the completed dissertation; this is not a peer-reviewed publication. The full PDF is not hosted here.</p></div>
          </Section>
        </article>
        <aside className="dissertation-sidebar" aria-label="Project navigation and information">
          <div className="aside-label">ON THIS PAGE</div>
          <nav aria-label="Case study sections" className="dissertation-toc">
            {sections.map((s,i) => <button key={s.id} type="button" onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span>{String(i+1).padStart(2, '0')}</span>{s.title}</button>)}
          </nav>
          <div className="dissertation-sidebar-links"><div className="aside-label">SOURCE</div><a href="https://github.com/alishayan47/Distributional-Hate-Speech-Prediction" rel="noreferrer" target="_blank">Project source code ↗</a><p>The dissertation PDF is intentionally not provided.</p></div>
        </aside>
      </div>
      <div className="detail-next"><span>CONTINUE EXPLORING</span><a href="#/project/ann-pso">Neural Network Optimisation with PSO ↗</a></div>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#work">Back to projects ↑</a></div></footer>
  </div>;
}
