# Portfolio content decisions — 11 October 2026

This file records agreed wording and project boundaries so future edits do not undo decisions.

## Positioning

- Portfolio is a showcase of genuine work, **not** a CV optimized for one job category.
- Balanced scope: computer science, artificial intelligence, software development, experiments, and game projects.
- Avoid over-claiming full-stack work and avoid forcing each project into the same AI/research narrative.
- Keep the existing site layout for this content pass. Larger layout redesign is a separate decision.

## Approved introduction

**Eyebrow:** COMPUTER SCIENCE / ARTIFICIAL INTELLIGENCE / SOFTWARE DEVELOPMENT

**Headline:** Hi, I’m Ali Shayan.

**Supporting headline:** I build software, explore algorithms, and experiment with machine learning.

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

- Review PSO card and case study next, including accurate personal contributions and results.
- Then Good Old Haggis, Skate Fish Escape, smaller projects.
- Optional future image/design refinement independent of content decisions.
