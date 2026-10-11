// Public display name from the uploaded coursework/certificate; confirm before publishing.
// Public profile links supplied by the project owner. Other contact links remain optional.
export const profile = {
  name: 'Ali Shayan Amir',
  initials: 'AA',
  eyebrow: 'COMPUTER SCIENCE  /  ARTIFICIAL INTELLIGENCE  /  SOFTWARE DEVELOPMENT',
  headline: 'Hi, I’m Ali Shayan Amir.',
  statement: 'I research and develop machine learning models, explore algorithms, and build software.',
  summary: 'I have a background in Computer Science and postgraduate study in Artificial Intelligence at Heriot-Watt University. This portfolio brings together projects I’ve worked on across NLP, neural networks, optimisation, computer vision and game development.',
  closing: 'Some focus on research and experimentation. Others are about turning ideas into working systems.',
  location: 'United Kingdom',
  email: '', // Set your actual email to enable the Email link
  github: 'https://github.com/alishayan47',
  linkedin: 'https://www.linkedin.com/in/ali-shayan-nlp-ml-game-developer/',
  cvPath: '', // Add your CV to public/CV.pdf then set to '/CV.pdf'
};

// Each project is accurate to the details supplied so far. Add verified screenshots,
// repository links, model hyperparameters and precise contributions as they become available.
export const projects = [
  {
    slug: 'distributional-hate-speech',
    title: 'Context-Augmented Hate Speech Prediction',
    subtitle: 'Learning annotator perspectives through distributional NLP and retrieved context',
    categories: ['Research', 'AI / ML'],
    tags: ['NLP', 'PyTorch', 'RoBERTa', 'FiLM', 'Semantic Retrieval'],
    year: '2026', kind: 'Individual MSc dissertation', prominent: true, art: 'nlp',
    intro: 'Developed and evaluated transformer-based models that predict how demographic and ideological groups interpret hate speech rather than collapsing their judgements into a single label. Compared three identity-conditioning strategies and explored how semantically retrieved context affects distributional predictions.',
    role: 'Independent research, implementation and evaluation',
    details: [
      'Constructed subgroup-specific probability distributions from individual annotations in the Measuring Hate Speech dataset.',
      'Built a RoBERTa baseline and three identity-conditioning methods (tokens, learned embeddings, FiLM).',
      'Developed identity-specific Wikipedia knowledge repositories, LLM-based summaries and SBERT semantic retrieval.',
      'Evaluated seven configurations per discourse domain with distributional, subgroup and counterfactual analyses.'
    ],
    metrics: [
      {value:'7', label:'Model configurations per discourse domain'},
      {value:'59.4%', label:'Immigration FiLM instances improved with context (JS)'},
      {value:'58.9%', label:'Women FiLM instances improved with context (JS)'}
    ],
    takeaway: 'Learned identity representations improved prediction, but reproduced only a small share of empirical subgroup differences. Context helped many individual predictions without delivering uniform aggregate gains.',
    caveat: 'Individual taught-MSc dissertation (not a peer-reviewed publication). Metrics come from the completed dissertation. No dissertation PDF is hosted on this portfolio.',
    links: [{label:'Explore source code', href:'https://github.com/alishayan47/Distributional-Hate-Speech-Prediction'}]
  },
  {
    slug: 'ann-pso',
    title: 'Neural Network Optimisation with PSO',
    subtitle: 'Built an ANN and a particle-swarm optimiser from scratch to study gradient-free training',
    categories: ['Research', 'AI / ML'],
    tags: ['Particle Swarm Optimisation', 'Neural Networks', 'NumPy', 'Experiments'],
    year: '2026', kind: 'MSc group coursework', prominent: true, art: 'pso',
    intro: 'Implemented a configurable feedforward neural network and Particle Swarm Optimisation algorithm from scratch, then integrated them to optimise ANN parameters for concrete-strength prediction. Investigated how activation functions, swarm dynamics and boundary handling affected performance.',
    role: 'Led much of the implementation and experiments in a two-person coursework project',
    details: [
      'Implemented configurable neural-network forward propagation, activation functions and parameter handling.',
      'Developed PSO mechanics: particles, velocities, personal and global best tracking, search-space constraints and convergence.',
      'Coupled PSO particle vectors to ANN parameters and trained on concrete compressive strength regression data.',
      'Investigated 25 network configurations, swarm sizes, iteration budgets, acceleration coefficients, boundary strategies and activation-function selection.'
    ],
    metrics: [
      {value:'0.087', label:'Initial test MAE'},
      {value:'0.0147', label:'Initial test MSE'},
      {value:'21.2%', label:'Test MAE reduction in activation experiment'}
    ],
    takeaway: 'Optimisation performance is sensitive to design decisions beyond model architecture—including swarm dynamics and the fitness landscape.',
    caveat: 'The reported improvement compares two PSO-trained activation configurations, not PSO against gradient descent. Results come from the two-person coursework report.',
    links: [],
    figures: [
      {src:'/media/pso-activation-comparison.webp', alt:'Convergence curves for baseline versus selected activation-function configuration', caption:'PSO convergence: baseline tanh–linear versus selected ReLU–sigmoid configuration (coursework experiment).'},
      {src:'/media/pso-evaluation-budget.webp', alt:'Impact of PSO particle swarm sizes and jump sizes on regression error', caption:'Evaluation-budget experiment comparing swarm sizes and step sizes.'}
    ]
  },
  {
    slug: 'good-old-haggis',
    title: 'Good Old Haggis',
    subtitle: 'Understanding when a vision model cannot learn the intended labels',
    categories: ['Research', 'AI / ML'],
    tags: ['TensorFlow', 'CNN', 'K-Means', 'Computer Vision', 'Failure Analysis'],
    year: '2026', kind: 'Five-person MSc team project', prominent: true, art: 'vision',
    intro: 'A collaborative project exploring nutritional-score prediction for prepared meals. My work focused on clustering meals by ingredient composition and training CNNs to predict those clusters from images.',
    role: 'Owned the ingredient clustering, image-classification experiments and model-bridging work',
    details: [
      'Developed K-Means ingredient clustering and multiple TensorFlow CNN classifiers.',
      'Investigated overfitting, unbalanced clusters and the limited correspondence between visual appearance and ingredient-based labels.',
      'Improved the reported image-only test accuracy from 29.5% in the initial configuration to 43.27% in the selected configuration, alongside changes to class handling.',
      'Proposed an exploratory multimodal image-plus-ingredient approach, then explicitly examined why its higher accuracy might be misleading.',
      'Connected the image/cluster pipeline with nutritional estimates using Python scripts and spreadsheet-based mappings.'
    ],
    metrics: [
      {value:'43.27%', label:'Selected image-only CNN test accuracy'},
      {value:'18', label:'Ingredient-derived clusters'},
      {value:'5', label:'Team members'}
    ],
    takeaway: 'Poor results can expose a flawed learning formulation: ingredient-defined labels are not always visually recoverable from food photographs.',
    caveat: 'The team’s nutritional-score classifier was developed by other members. The CNN configurations are not identical controlled experiments; the multimodal result was exploratory, not deployed.',
    links: [], // The team's GitHub URL appears in the report but currently returns 404; do not show a broken link.
    figures: [
      {src:'/media/haggis-before-balancing.webp', alt:'Confusion matrix before class balancing with most predictions concentrated in one class', caption:'Before: model heavily favoured a dominant ingredient cluster.'},
      {src:'/media/haggis-after-balancing.webp', alt:'Confusion matrix after class balancing with predictions distributed across multiple classes', caption:'After: removing the noisy cluster and balancing the remaining classes.'},
      {src:'/media/haggis-cluster-tsne.webp', alt:'t-SNE visualisation of ingredient-composition clusters', caption:'Ingredient-derived clusters visualised using t-SNE.'}
    ]
  },
  {
    slug: 'skate-fish',
    title: 'Skate Fish Escape!',
    subtitle: 'Traffic-aware pursuit AI built on custom A* pathfinding',
    categories: ['Game Development', 'AI / ML', 'Software'],
    tags: ['Unity', 'C#', 'A*', 'Directed Graphs', 'Game AI'],
    year: '2026', kind: 'MSc game coursework', prominent: true, art: 'skate', image:'/media/skate-fish.webp',
    intro: 'A playful arcade escape game whose core technical challenge was coordinating police pursuit and civilian road traffic without using Unity NavMesh.',
    role: 'Designed and programmed the controller and navigation systems',
    details: [
      'Implemented A* pursuit across manually authored navigation nodes, using directed graph edges to enforce road rules.',
      'Required police on Level 2 to reach legal junctions to reverse direction; switched to direct chase when sufficiently close to the player.',
      'Introduced separate navigation layers in Level 3: directional, randomly routed civilian traffic and bidirectional, more aggressive police routing.',
      'Developed the player controller and integrated existing visual assets into the game.'
    ],
    metrics: [
      {value:'3',label:'Distinct level behaviours'},
      {value:'2',label:'Navigation graph types'}
    ],
    takeaway: 'Changing navigation constraints, not just vehicle speed, made enemy behaviour more challenging across levels.',
    caveat: 'Gameplay image extracted from the author-provided coursework demo. Full game footage is not embedded in this starter to keep the website lightweight.',
    links: []
  },
  {
    slug: 'draculas-return',
    title: "Dracula’s Return",
    subtitle: 'Roguelike deck-building prototype',
    categories: ['Game Development'],
    tags: ['Deck-building', 'Card Battles', 'Game Design'],
    year: 'BSc', kind: 'University group project', prominent: false, art: 'dracula',
    intro: 'A Dracula-themed roguelike card game featuring card-based battles, deck progression, recruitable monsters and rooms to explore.',
    role: 'Group contributor — specific implementation responsibilities to be documented',
    details: [
      'Worked as part of a university team on a prototype card game.',
      'A public itch.io project page and gameplay demonstration are available.'
    ],
    metrics: [], takeaway: 'A collaborative game prototype with a publicly documented playable concept.',
    caveat: 'Specific personal contributions and engine are not yet confirmed; they must be added before presenting this as an individual technical case study.',
    links: [{label:'View on itch.io',href:'https://darmit165.itch.io/draculas-return'}]
  },
  {
    slug: 'operation-nexus',
    title: 'Operation Nexus',
    subtitle: 'Integrating a playable science-fiction FPS',
    categories: ['Game Development', 'Software'],
    tags: ['Unity', 'C#', 'Figma', 'Game Systems Integration'],
    year: 'BSc', kind: 'University group project', prominent: false, art: 'nexus', image:'/media/operation-nexus.webp',
    intro: 'A futuristic first-person shooter assembled from prebuilt maps, controller systems and AI assets, with custom game-state mechanics and original UI work.',
    role: 'Led much of the game integration and implemented smaller gameplay systems',
    details: [
      'Integrated premade FPS controller, enemy AI and environment assets into connected levels.',
      'Implemented supporting gameplay logic including health and win/loss states.',
      'Designed and implemented the game’s interface with Figma and Unity.'
    ],
    metrics: [], takeaway: 'Practical game development includes integrating, configuring and debugging disparate systems—not recreating every asset from scratch.',
    caveat: 'Controller, shooting mechanics, AI and environments were premade third-party assets; they are not claimed as original implementations.',
    links: []
  },
  {
    slug: 'word-embeddings',
    title: 'Word Embeddings & Semantic Similarity',
    subtitle: 'A foundational NLP investigation',
    categories: ['AI / ML'],
    tags: ['Word2Vec', 'Gensim', 'NLP', 'Evaluation'],
    year: '2026', kind: 'MSc group coursework', prominent: false, art: 'word',
    intro: 'Explored Word2Vec representations across different corpus sizes, evaluated semantic similarity and investigated stereotyped associations in pretrained embeddings.',
    role: 'Coursework contributor',
    details: [
      'Trained and evaluated Word2Vec embeddings using Gensim.',
      'Compared embedding similarity against WordSim-353 human ratings.',
      'Explored model hyperparameters, corpus effects and word analogy bias.'
    ],
    metrics: [], takeaway: 'Training data scale and evaluation choices strongly influence the quality and behaviour of learned word representations.',
    caveat: 'Foundational coursework using library implementations; intentionally kept as a smaller project rather than a flagship case study.',
    links: []
  },
  {
    slug: 'llm-safety',
    title: 'Safety–Helpfulness Trade-offs in LLMs',
    subtitle: 'Dataset engineering for collaborative LLM research',
    categories: ['Research', 'AI / ML'],
    tags: ['LLM Safety', 'Dataset Engineering', 'Evaluation'],
    year: '2026', kind: 'Six-person MSc research project', prominent: false, art: 'safety',
    intro: 'Collaborative research into how safety training data affects refusal behaviour and helpfulness across Llama, Qwen and Gemma model families.',
    role: 'Led collection and preparation of experimental datasets; assisted evaluation runs',
    details: [
      'Sourced and prepared datasets, including the training, validation and evaluation samples needed by the research team.',
      'Supported the evaluation lead by running computationally intensive tests.',
      'Contributed to a shared investigation of over-refusal and unsafe compliance.'
    ],
    metrics: [], takeaway: 'Reliable LLM research depends on careful data preparation and consistent evaluation inputs.',
    caveat: 'Team members led fine-tuning and evaluation design; these are not attributed to the author. Group coursework, not a peer-reviewed publication.',
    links: []
  }
];

export const filters = ['All work', 'AI / ML', 'Research', 'Game Development'];
