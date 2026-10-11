import React, { useEffect } from 'react';
import { profile } from './content';
import PsoArtwork from './PsoArtwork';

const sections = [
  {id:'pso-implementation',title:'Implementation'},
  {id:'pso-experiments',title:'Experiments & findings'},
  {id:'pso-reflections',title:'Limitations & reflections'},
  {id:'pso-information',title:'Project information'},
];

function Section({ id, number, title, children }) {
  return <section id={id} className="dissertation-section" aria-labelledby={`${id}-heading`}>
    <div className="section-index">{number} / ENGINEERING NOTES</div>
    <h2 id={`${id}-heading`}>{title}</h2>
    {children}
  </section>;
}

function Experiment({ number, title, children }) {
  return <div className="dissertation-finding"><div className="dissertation-finding-number">{number}</div><div><h3>{title}</h3>{children}</div></div>;
}

function ComparisonTable({ headers, rows, caption }) {
  return <div className="dissertation-table-wrap" role="region" aria-label={caption} tabIndex={0}>
    <table className="dissertation-table"><caption>{caption}</caption><thead><tr>{headers.map(header=><th scope="col" key={header}>{header}</th>)}</tr></thead>
      <tbody>{rows.map((row,i)=><tr key={i}>{row.map((value,j)=>j===0?<th scope="row" key={j}>{value}</th>:<td key={j}>{value}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function ParametersDiagram(){
  return <figure className="pso-parameters-diagram">
    <div className="section-index">HOW A PARTICLE REPRESENTS A NEURAL NETWORK</div>
    <div className="pso-parameters-flow">
      <div className="pso-param-box"><span>01 / PARAMETERS</span><div className="pso-matrix"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><strong>Weight matrices + biases</strong></div>
      <div className="pso-diagram-arrow" aria-hidden="true">→</div>
      <div className="pso-param-box"><span>02 / PARTICLE POSITION</span><div className="pso-vector"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><strong>Flatten into a single vector</strong></div>
      <div className="pso-diagram-arrow" aria-hidden="true">→</div>
      <div className="pso-param-box"><span>03 / FITNESS</span><div className="pso-fitness-visual"><span>ANN</span><b>→</b><span>MAE ↓</span></div><strong>Rebuild, predict & score</strong></div>
    </div>
    <figcaption>Conceptual representation of the optimisation loop. Each PSO candidate encodes all trainable ANN parameters; fitness is measured using training-set prediction error.</figcaption>
  </figure>;
}

export default function PsoCaseStudy({project,Nav}) {
  useEffect(()=>{
    document.title='Neural Network Optimisation with Particle Swarm Optimisation | Ali Shayan Amir';
    window.scrollTo({top:0,behavior:'instant'});
    return ()=>{document.title=`${profile.name} | Software Engineering & AI Research`;};
  },[]);

  return <div className="detail-view dissertation-view pso-case-study">
    <Nav/>
    <main className="shell dissertation-main">
      <a className="detail-back" href="#work">← All projects</a>
      <header className="dissertation-header">
        <div className="eyebrow"><span className="signal-dot"/> TWO-PERSON MSC COURSEWORK <span className="sep">/</span> 2026</div>
        <h1>Neural Network Optimisation with Particle Swarm Optimisation<span className="period">.</span></h1>
        <p className="dissertation-deck">Can a neural network be trained without backpropagation?</p>
        <div className="tag-row">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        <div className="dissertation-meta"><span><strong>Institution</strong>Heriot-Watt University</span><span><strong>Module</strong>Biologically Inspired Computation</span><span><strong>Type</strong>Two-person group coursework</span></div>
      </header>
      <div className="pso-page-art"><PsoArtwork/></div>
      <div className="dissertation-overview">
        <div className="section-index">OVERVIEW</div>
        <p>In this project, I explored <strong>Particle Swarm Optimisation (PSO)</strong> as an alternative approach to training an artificial neural network (ANN). I implemented a configurable feedforward network and a PSO optimiser from scratch, then integrated them to optimise neural-network weights and biases for concrete compressive-strength prediction.</p>
        <p>Beyond building a working training pipeline, I investigated how network architecture, activation functions, swarm behaviour and boundary handling influenced the results.</p>
        <p>This was a two-person MSc coursework project. <strong>I led much of the technical implementation and experimental work</strong> described here.</p>
      </div>

      <div className="dissertation-layout">
        <article className="dissertation-article">
          <Section id="pso-implementation" number="01" title="Implementation">
            <h3>Building the neural network</h3>
            <p>I implemented a feedforward ANN with configurable layer sizes, weight and bias parameters, and <strong>ReLU, sigmoid, tanh and linear</strong> activation functions. Forward propagation was implemented directly with NumPy rather than using an automatic-differentiation training framework.</p>
            <p>Crucially, the network could expose its parameters as a flattened vector and reconstruct them into their original matrices. The representation allowed a swarm particle to encode an entire candidate neural network.</p>
            <h3>Implementing the PSO optimiser</h3>
            <p>Following the algorithmic formulation supplied for the module, I implemented particle initialisation, position and velocity updates, personal-best and global-best tracking, informant-based guidance, search-space boundaries, and convergence monitoring. I first tested the optimiser on a mathematical objective before attaching it to the ANN.</p>
            <h3>Connecting PSO to the ANN</h3>
            <p>The central engineering challenge was to turn neural-network training into a search problem. <strong>Every particle encoded a complete candidate set of weights and biases.</strong> For each particle, the system reconstructed the parameter matrices, ran a forward pass and measured the resulting mean absolute error (MAE). That error became the particle's fitness score.</p>
            <ParametersDiagram/>
            <div className="dissertation-steps">
              <div><span>01</span><div><h3>Decode</h3><p>Reconstruct the particle's flat vector into the network's weight matrices and bias vectors.</p></div></div>
              <div><span>02</span><div><h3>Evaluate</h3><p>Run the ANN on the training data and compute MAE as the fitness function.</p></div></div>
              <div><span>03</span><div><h3>Search</h3><p>Update personal and shared best-known solutions, then move particles by modifying their velocities and positions.</p></div></div>
              <div><span>04</span><div><h3>Reconstruct the trained model</h3><p>Use the best parameter vector found by the swarm to produce predictions on held-out data.</p></div></div>
            </div>
            <p>This enabled neural-network training through <strong>population-based optimisation rather than gradient calculations</strong>.</p>
            <h3>End-to-end regression pipeline</h3>
            <p>I connected the ANN–PSO implementation to the Concrete Compressive Strength dataset, incorporating feature scaling, a 70/30 train–test split, parameter optimisation and evaluation using MAE and mean squared error (MSE).</p>
            <p>One representative run used an <strong>[8, 10, 1]</strong> network with ReLU and linear activations, <strong>40 particles</strong>, <strong>80 iterations</strong> and <strong>three informants</strong>:</p>
            <ComparisonTable caption="Reported ANN–PSO regression results from the coursework experiment" headers={['Metric','Training','Testing']} rows={[
              ['MAE','0.084','0.087'],['MSE','0.0144','0.0147']
            ]}/>
            <p>The experiment demonstrated that the implemented swarm search could find useful network parameters without backpropagation. It was <em>not</em> designed as a direct performance comparison against Adam or gradient descent.</p>
          </Section>

          <Section id="pso-experiments" number="02" title="Experiments and findings">
            <p>After completing the training pipeline, I used it to investigate five design choices. The aim was to understand <strong>how the optimiser behaved</strong>, not simply report one model score.</p>
            <Experiment number="01" title="Architecture and activation functions">
              <p>I evaluated <strong>25 neural-network configurations</strong>, varying layer sizes, neuron counts and activation functions, with results averaged across 20 runs.</p>
              <p><strong>Sigmoid frequently performed well in the output layer.</strong> One possible explanation is that its bounded output helped control prediction magnitudes while the swarm explored randomly initialised parameter settings. The finding suggested that activation functions influenced the optimisation process as well as the network's predictions.</p>
            </Experiment>
            <Experiment number="02" title="Swarm size, iteration budget and jump size">
              <p>I tested seven swarm-size and iteration-count combinations within a fixed budget of <strong>500 particle evaluations</strong>, using jump sizes of 1.0 and 2.0.</p>
              <p>In the tested configurations, smaller jumps worked better with <strong>smaller swarms and more iterations</strong>, while larger jumps benefited from <strong>larger swarms</strong> exploring more candidate solutions. The preferred balance between exploration and refinement depended on how aggressively particles moved.</p>
              <figure className="pso-experiment-figure"><img src="/media/pso-evaluation-budget.webp" alt="Original coursework plot comparing swarm-size allocations and jump-size settings" loading="lazy"/><figcaption>Original coursework evidence: allocation of a fixed evaluation budget under different jump sizes.</figcaption></figure>
            </Experiment>
            <Experiment number="03" title="Cognitive, social and global acceleration">
              <p>I compared stronger cognitive, social and global influences across inertia values of <strong>0.3, 0.5 and 0.8</strong>.</p>
              <p><strong>Higher cognitive influence</strong> produced the strongest results in the tested settings. My interpretation was that allowing particles to rely more heavily on their own best-known solutions maintained useful exploration, while stronger shared guidance could lead to premature convergence.</p>
            </Experiment>
            <Experiment number="04" title="Boundary handling">
              <p>I compared three ways of handling particles moving outside the search space: <strong>clipping</strong> to the closest valid boundary, <strong>randomly resetting</strong> the position, and <strong>periodic wrapping</strong> to the opposite boundary.</p>
              <p><strong>Clipping worked best for this task.</strong> Random resets could discard a promising candidate's progress, while wrapping could abruptly transform neural-network weights. This was a practical reminder that search-space handling needs to suit the underlying parameter representation.</p>
            </Experiment>
            <Experiment number="05" title="Selecting activation-function combinations">
              <p>In the final experiment, I extended the pipeline to evaluate candidate pairs of hidden- and output-layer activation functions. The candidates were <strong>ReLU, tanh and sigmoid</strong> in the hidden layer, and <strong>sigmoid or linear</strong> at the output. PSO-trained configurations were compared by average error before the best pairing was retrained and tested.</p>
              <p><strong>ReLU–sigmoid</strong> was the best-performing combination in this experiment.</p>
              <ComparisonTable caption="Selected configuration versus fixed-activation PSO baseline, on the held-out test set" headers={['PSO-trained configuration','Test MAE ↓']} rows={[
                ['Fixed activation: tanh–linear','0.1256'],['Selected activation: ReLU–sigmoid','0.0989']
              ]}/>
              <div className="pso-highlight"><strong>21.2% lower test MAE</strong><span>Relative improvement over the tested fixed-activation PSO configuration — not a comparison with backpropagation.</span></div>
              <figure className="pso-experiment-figure"><img src="/media/pso-activation-comparison.webp" alt="Original coursework convergence plot comparing the fixed tanh–linear activation with the selected ReLU–sigmoid activation" loading="lazy"/><figcaption>Original coursework convergence comparison. The graph depicts optimisation fitness over iterations; the table above reports the final held-out test MAE.</figcaption></figure>
            </Experiment>
          </Section>

          <Section id="pso-reflections" number="03" title="Limitations and reflections">
            <p>Building both sides of the system helped me understand how much evolutionary optimisation depends on <strong>parameter representation, activation-function choice and the balance between exploration and exploitation</strong>.</p>
            <p>One important lesson was that an optimisation strategy can behave differently when applied to neural-network parameters instead of a simple mathematical objective. Strong results from one configuration did not guarantee that the same settings would work elsewhere.</p>
            <p>The project focused on a <strong>single regression dataset</strong>, and the explanations for the observed hyperparameter effects are empirical interpretations rather than general proofs. We also did <strong>not compare PSO directly against Adam or SGD</strong>, so this project does not establish that PSO is superior to gradient-based training.</p>
            <p>Useful next steps would include matched-budget comparisons with gradient-based optimisers, hybrid PSO–backpropagation approaches, principled boundary-handling methods and parallel execution for faster experiments.</p>
          </Section>

          <Section id="pso-information" number="04" title="Project information">
            <dl className="pso-info-list">
              <div><dt>Project</dt><dd>Two-person MSc group coursework</dd></div>
              <div><dt>Module</dt><dd>Biologically Inspired Computation</dd></div>
              <div><dt>Institution</dt><dd>Heriot-Watt University · 2026</dd></div>
              <div><dt>Technologies</dt><dd>Python, NumPy, custom ANN and PSO implementations</dd></div>
              <div><dt>My contribution</dt><dd>Led much of the neural-network and swarm-optimiser implementation, system integration and experimental investigation.</dd></div>
            </dl>
            <div className="dissertation-note"><strong>Academic context</strong><p>This work was completed as a two-person MSc coursework project. Results are reproduced from the group report rather than independently re-benchmarked for this portfolio. It is not a peer-reviewed publication.</p></div>
          </Section>
        </article>
        <aside className="dissertation-sidebar" aria-label="Case study navigation">
          <div className="aside-label">ON THIS PAGE</div>
          <nav className="dissertation-toc" aria-label="PSO case study sections">{sections.map((s,i)=><button type="button" key={s.id} onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'})}><span>{String(i+1).padStart(2,'0')}</span>{s.title}</button>)}</nav>
          <div className="dissertation-sidebar-links"><div className="aside-label">READING NOTE</div><p>Figures are from the original MSc group report. The conceptual diagrams are illustrations, not measured results.</p></div>
        </aside>
      </div>
      <div className="detail-next"><span>CONTINUE EXPLORING</span><a href="#/project/good-old-haggis">Good Old Haggis ↗</a></div>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#work">Back to projects ↑</a></div></footer>
  </div>;
}
