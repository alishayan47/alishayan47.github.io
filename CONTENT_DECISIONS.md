# Portfolio content decisions — 11 October 2026

This file records agreed wording and project boundaries so future edits do not undo decisions.

## Positioning

- Portfolio is a showcase of genuine work, **not** a CV optimized for one job category.
- Balanced scope: computer science, artificial intelligence, software development, experiments, and game projects.
- Avoid over-claiming full-stack work and avoid forcing each project into the same AI/research narrative.
- Keep the existing site layout for this content pass. Larger layout redesign is a separate decision.

## Approved introduction

**Eyebrow:** COMPUTER SCIENCE / ARTIFICIAL INTELLIGENCE / SOFTWARE DEVELOPMENT

**Headline:** Hi, I’m Ali Shayan Amir.

**Supporting headline:** I research and develop machine learning models, explore algorithms, and build software.

**Body:** I have a background in Computer Science and postgraduate study in Artificial Intelligence at Heriot-Watt University. This portfolio brings together projects I’ve worked on across NLP, neural networks, optimisation, computer vision and game development.

**Closing:** Some focus on research and experimentation. Others are about turning ideas into working systems.

## Dissertation — content lock

**Full title:** Context-Augmented Distributional Prediction of Hate Speech towards Women and Immigrants.

**Nature:** Individual MSc Artificial Intelligence dissertation, Heriot-Watt University, 2026. NOT a peer-reviewed publication.

**Focus:** Predict distributions of subgroup-specific hate-speech judgements; compare identity-conditioning mechanisms; test relevant background context and analyze variable instance-level effects.

**Methodology:** MHS initial corpus subset of 19,761 comments and 49,433 annotations; retained perspective-aware datasets: 3,953 women-targeted and 3,797 immigrant-targeted comments. Training instance is a comment–subgroup distribution over three ordinal classes. RoBERTa baseline; Identity Token, learned Identity Embedding, and FiLM; each identity-conditioned approach with or without external context = seven configurations. Context from selected Wikipedia sources, LLM summaries evaluated and manually reviewed, SBERT semantic retrieval, added to input. PyTorch / Hugging Face. Fixed comment-level 70/15/15 split. Metrics include JS, CE, entropy MAE, ANAD, accuracy. Subgroup and counterfactual evaluation.

**Results:** Identity Embedding / FiLM generally more effective than Identity Token; FiLM strongest overall for ANAD and accuracy, while other approaches sometimes had better distribution metrics. Context *not* a consistent aggregate improvement. Context + FiLM reduced JS on 59.4% of immigrant-targeted and 58.9% of women-targeted individual instances. Even the strongest predicted subgroup separation captured only 1.14% and 2.99% of empirical separation, respectively. Retrieval similarity, article choice and comment length did not fully explain gains.

**Source:** Completed MSc dissertation, 23 July 2026. Source code: https://github.com/alishayan47/Distributional-Hate-Speech-Prediction

**Publication rules:** Publish descriptive case study with careful academic attribution. **DO NOT upload the dissertation PDF**. No fabricated or mislabeled metrics; no claim of journal/conference publication. The full manuscript is not public on this site. Avoid reproducing offensive comments unnecessarily.

**Website implementation:** Custom, more detailed case study in `src/DissertationCaseStudy.jsx`; short project card in `src/content.js`. Conceptual illustration of differing subgroup distributions is explicitly illustrative, not real experiment output.

## Excluded projects (until explicit permission and scope review)

- JobSynkAI
- DHAO AI
- DivLynx work and clients

Do not add without the portfolio owner's explicit approval.

## Remaining work

- PSO card and dedicated case study completed in V6; review deployment and any later refinements.
- Then Good Old Haggis, Skate Fish Escape, smaller projects.
- Optional future image/design refinement independent of content decisions.

## Confirmed UI refinements — 11 October 2026

- Remove the right-side abstract network illustration from the homepage introduction; do not replace it with another graphic.
- Display the complete name `Ali Shayan Amir` in the hero heading.
- Prioritise ML research and model development, then algorithms, then software in the supporting headline.
- Remove the detached quotation-mark glyph from the dissertation illustration; retain the central text and two illustrative distribution bars. Other visual redesign can wait.
- Remove `Software` from the available project-filter buttons because it duplicates `Game Development`; leave existing project categories and data untouched. Projects remain accessible through `All work`.
- Preserve the full dissertation case study and keep the PDF unpublished.


## PSO case study — approved and implemented (V6)

**Full title:** Neural Network Optimisation with Particle Swarm Optimisation.

**Project nature:** Two-person MSc Biologically Inspired Computation coursework. Ali Shayan Amir led much of the technical implementation and experimentation; avoid implying solo authorship. Not a peer-reviewed publication.

**Card visual:** Custom, restrained particle swarm searching over a conceptual fitness landscape. Illustration is explicitly NOT measured experimental data. Implemented using inline SVG in `src/PsoArtwork.jsx`; no generic circular-orbit graphic for this card.

**Full page:** `src/PsoCaseStudy.jsx`, with Overview, Implementation, Experiments & Findings (5 parts), Limitations & Reflections, Project Information. Actual course-report graph assets are reused from `public/media/`.

**Methods:** Configurable NumPy feedforward ANN and from-scratch PSO implementation; flatten/restore network weights and biases as particle vectors; MAE fitness; concrete-strength dataset regression; network architecture and activations, swarm budget/jump size, cognitive/social/global acceleration and inertia, boundary handling, activation pairing.

**Reported findings:** Representative 8–10–1 ANN train MAE 0.084/test MAE 0.087; train MSE 0.0144/test MSE 0.0147. Activation comparison: fixed tanh–linear PSO test MAE 0.1256 versus selected ReLU–sigmoid PSO test MAE 0.0989 (21.2% relative reduction). Not a comparison against gradient descent, Adam, or SGD. Findings about hyperparameter effects are dataset/configuration-specific empirical results, not universal guarantees.

**Media/publication:** No coursework PDF included; no project GitHub URL was added because none was verified. Do not attribute teammates' unconfirmed contributions as personal solo work.

**Unchanged:** Existing profile introduction, filters, dissertation case study and other projects from V5; the V6 patch only edits PSO project copy, adds PSO case-study and SVG modules, app routing and scoped styling.


## Good Old Haggis case study — approved and implemented (V7)

**Positioning:** Compact, candid five-person MSc coursework case study. Focus on the project's nutritional-score ambition, pipeline, Ali's specific work, the label/image mismatch and the investigations that followed. Do NOT present it as a deployed tool or published research.

**Personal contributions:** `img_kmeans_CNN.ipynb` (K-Means ingredient clustering and CNN experiments), `macromapping.ipynb` (bridging ingredient clusters to estimated nutritional data), assisting with ingredient-data preprocessing and documenting the ML analysis. The Random Forest, MLP and perceptron Nutri-Score models were primarily contributed by other members.

**Pipeline:** Normalized ingredient proportion vectors → K-Means classes → image-only CNN predictions of those classes → approximate cluster nutrition estimates → group's separate nutrient-to-Nutri-Score classifiers. This pipeline was exploratory; no claim of reliable nutrition assessment from images.

**Observations:** K=18, silhouette 0.2989; a heterogeneous 430-meal dominant cluster; baseline CNN 29.5% test vs 84.6% train; selected CNN after removing the cluster and augmenting others to 100 images/class 43.27% test. NOT a controlled improvement because classes changed. Multimodal experiment performed better but the ingredient branch could directly reveal target-cluster information, so no validated image-learning claim.

**Visuals:** Replace raw clustering/t-SNE and confusion-matrix gallery on portfolio page with a new food-led, conceptual photo→ingredient cluster→nutrition-estimate title-card illustration and a labelled schematic of a real ambiguity example from the report. The food photo is AI-generated and NOT claimed as a dataset observation. No coursework PDF added. The original static chart files are left in the assets folder unused, to avoid destructive deletion; they no longer render on the new page.

**Implementation:** `src/HaggisArtwork.jsx`, `src/HaggisCaseStudy.jsx`, scoped CSS additions and short project-summary changes in `src/content.js`. Haggis route now uses the case-study component. All prior V6-approved pages and content remain unchanged.


## Skate Fish Escape! case study — approved and implemented (V8)

**Project:** Solo MSc Unity/C# game coursework. Gameplay systems, player controller, manually authored road/node graph, A* police pursuit, level behaviour, collectibles, scoring, collision objectives and UI. Use clear credit for third-party assets: city/map and character visuals came from free asset packages, not original modelling.

**AI details:** Level 1 simpler highway chase. Level 2 directed city graph enforcing traffic routes/junction-based turnarounds; police A* repathing as player moves and direct chase when close. Level 3 separate civilian directional graph with branching traffic and bidirectional police pursuit graph allowing faster turnarounds. Avoid mislabeling civilian vehicles as pedestrians.

**Visuals:** Actual user-provided Unity captures only. Homepage card shows gameplay; long-form page uses gameplay, node-graph intersection, coloured route debugging, city-wide graph, and police chase captures. Images are lightly cropped to remove Unity editor toolbars and compressed as WebP. No fabricated performance metrics.

**Demo:** https://youtu.be/roHZlinKR80 (user-supplied unlisted coursework video link). Public portfolio link will expose this video URL to anyone viewing the case study.

**Implementation:** `src/SkateFishCaseStudy.jsx`, `src/App.jsx` routing, focused Skate Fish fields in `src/content.js`, scoped CSS and five real screenshot assets plus a card crop. Existing dissertation, PSO and Haggis content remain unchanged except the previously agreed removal of the unnecessary `01 / MEAL IMAGE` label in `src/HaggisArtwork.jsx`.

**No PDF or raw game project uploaded.**


## V9 — Dracula’s Return (supporting project)
- Preserve the four flagship case studies and approved introduction unchanged.
- Dracula’s Return is a concise BSc group-work entry, not a flagship technical report.
- Main personal contribution: card-combat functionality, including both sides’ energy budgets, card health and attack, survivor carry-over, damage resolution, sword/shield power-ups and terminal health condition.
- Game overview may mention branching routes, varied encounters and purchasable cards; do not imply the author implemented all of those systems.
- Public playable link: https://darmit165.itch.io/draculas-return
- Replace generic card art with the user’s genuine title-screen capture; show only two further genuine screenshots (route map and combat scene) on the supporting-project page. Do not add PDF or a long case study.


## V10 — Operation Nexus (supporting project)
- This is a compact bachelor’s group-coursework FPS prototype, not a new technical flagship case study.
- Original work emphasised assembling premade Unity FPS controllers and enemy AI with level/map assets, custom health and ammo pickups, win/lose conditions, menus and UI. Do not claim controllers, enemy AI, shooting mechanics or art were developed from scratch.
- Progression: tutorial, melee, shotgun, and boss-battle levels with increasing difficulty.
- Project artwork based on user-supplied low-resolution prototype frames, with enhancement used for presentation. User requested no visual-enhancement footnote on the public project page; captions describe gameplay scenes without claiming these to be untouched source frames.
- No PDF, video, external link or unrelated code changes.
- Keep the four flagship case studies, Dracula’s Return, and introduction unchanged.
