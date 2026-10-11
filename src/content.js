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
    subtitle: 'Investigating the limits of nutritional prediction from food photographs',
    categories: ['Research', 'AI / ML'],
    tags: ['Computer Vision', 'CNN', 'K-Means', 'TensorFlow', 'Failure Analysis'],
    year: '2026', kind: 'Five-person MSc group coursework', prominent: true, art: 'vision',
    intro: 'Explored whether a prepared meal’s nutritional characteristics could be inferred from its photograph. My part focused on ingredient-based K-Means clustering, CNN image classification, and investigating why visual features did not consistently correspond to ingredient-derived labels.',
    role: 'Ingredient clustering, CNN experiments and investigation of model limitations',
    details: [
      'Constructed K-Means ingredient-composition clusters and trained CNNs to identify those clusters from prepared-meal images.',
      'Investigated class imbalance, overfitting and discrepancies between visually recognisable food features and ingredient-based labels.',
      'Evaluated how removing a dominant noisy cluster and balancing the remaining classes changed CNN behaviour.',
      'Explored a multimodal model and investigated why its apparent accuracy could be misleading.',
      'Mapped representative cluster ingredient profiles to approximate nutritional data to help connect the team’s two modelling pipelines.'
    ],
    metrics: [
      {value:'18', label:'Ingredient-composition clusters'},
      {value:'43.27%', label:'Selected image-only CNN test accuracy on revised classes'},
      {value:'5', label:'Members in the overall team'}
    ],
    takeaway: 'A more complex model cannot solve a mismatch between a photo’s observable features and the ingredient-based labels it is trained to predict.',
    caveat: 'Five-person academic project. Other team members implemented the Nutri-Score classifiers. Image-only accuracy followed changes to class composition and is not a directly controlled comparison. The multimodal experiment was exploratory and not validated.',
    links: []
  },
  {
    slug: 'skate-fish',
    title: 'Skate Fish Escape!',
    subtitle: 'A* police pursuit and custom road graphs in a Unity escape game',
    categories: ['Game Development', 'AI / ML', 'Software'],
    tags: ['Unity', 'C#', 'A* Pathfinding', 'Directed Graphs', 'Game AI'],
    year: '2026', kind: 'Solo MSc game coursework', prominent: true, art: 'skate', image:'/media/skate-fish-card.webp',
    intro: 'A stylised arcade escape game built in Unity. I implemented a manual node-based road network, A* police pursuit, civilian traffic behaviour and the supporting gameplay systems, using free third-party map and character assets.',
    role: 'Built the player controller, traffic and pursuit navigation, levels and gameplay systems',
    details: [
      'Manually placed navigation nodes and authored directed road connections to control legal turns and lane-following traffic.',
      'Integrated A* pursuit for moving targets, with a proximity-triggered switch from graph routing to a direct chase.',
      'Used two navigation graph types in the final level: directed civilian traffic and bidirectional, more aggressive police routing.',
      'Implemented player movement, collectible and score systems, objectives, collision handling, UI and win/lose logic.',
      'Integrated free map and character assets rather than building those visual models.'
    ],
    metrics: [
      {value:'3',label:'Levels with evolving AI behaviour'},
      {value:'2',label:'Road graph types'}
    ],
    takeaway: 'The road graph did more than enable pathfinding: its connectivity controlled vehicle behaviour and helped create difficulty progression.',
    caveat: 'Solo academic Unity game. Map and character art used free third-party assets; these are not claimed as original visual work.',
    links: [{label:'Watch gameplay demo (unlisted YouTube)',href:'https://youtu.be/roHZlinKR80'}]
  },
  {
    slug: 'draculas-return',
    title: "Dracula’s Return",
    subtitle: 'Gothic roguelike card-battler with branching routes and strategic combat',
    categories: ['Game Development'],
    tags: ['Unity', 'C#', 'Card Combat', 'Roguelike'],
    year: 'BSc', kind: 'University group coursework', prominent: false, art: 'dracula', image: '/media/dracula-title.webp',
    intro: 'Dracula’s Return is a gothic roguelike-inspired card-game prototype built for a university group project. Runs feature branching map routes, different encounters and opportunities to purchase or upgrade cards. My primary contribution was implementing the card-battle functionality.',
    role: 'Implemented the card-battle system',
    details: [
      'Implemented the energy-based card battle loop: player and enemy both manage energy, while individual cards have health, attack values and costs.',
      'Built combat resolution around card survival. Surviving cards can be carried into the next round to conserve energy; when cards are defeated, remaining damage affects player health.',
      'Implemented card power-ups, including sword and shield effects that boost attack or health, and the battle-ending condition when a side reaches zero health.'
    ],
    metrics: [],
    takeaway: 'The core decision is how to spend limited energy while preserving surviving cards and choosing upgrades for later rounds.',
    caveat: 'University group prototype. My main implementation contribution was card combat; I do not claim the branching map, other systems or visual assets as individual work.',
    links: [{label:'Play the prototype on itch.io',href:'https://darmit165.itch.io/draculas-return'}],
    gallery: [
      {src:'/media/dracula-map.webp',alt:'Dracula’s Return branching route map with battle and healing nodes',caption:'Branching encounter map, with battle and healing choices.'},
      {src:'/media/dracula-combat.webp',alt:'Dracula’s Return card battle with health and attack values on cards',caption:'Card-battle screen showing the character cards, attack and health values.'}
    ]
  },
  {
    slug: 'operation-nexus',
    title: 'Operation Nexus',
    subtitle: 'A sci-fi FPS prototype built around level design and gameplay integration',
    categories: ['Game Development', 'Software'],
    tags: ['Unity', 'C#', 'FPS Prototype', 'Game Integration', 'UI'],
    year: 'BSc', kind: 'Bachelor’s group coursework', prominent: false, art: 'nexus', image:'/media/operation-nexus-menu.webp',
    intro: 'Operation Nexus is a sci-fi first-person shooter prototype developed for bachelor’s group coursework. Rather than building the controller, combat and enemy systems from scratch, we integrated premade mechanics and map assets into a playable game with four increasingly challenging stages.',
    role: 'Gameplay integration, level design, UI and supporting game-state logic',
    details: [
      'Integrated a premade FPS player controller and enemy AI with environment assets to create connected gameplay encounters.',
      'Designed the tutorial, melee, shotgun and boss-battle stages, with increasing difficulty and distinct combat objectives.',
      'Added collectible health and ammunition pickups, player health handling, and win/lose conditions to complete the gameplay loop.',
      'Designed and implemented the game UI, including the menu and on-screen health and ammunition displays.'
    ],
    metrics: [],
    takeaway: 'The project was an exercise in turning existing systems and assets into a coherent playable experience through level design, gameplay logic and integration.',
    caveat: 'Bachelor’s group coursework. The FPS controller, shooting mechanics, enemy AI and map assets were premade; I do not claim to have created them from scratch. ',
    links: [],
    gallery: [
      {src:'/media/operation-nexus-melee.webp',alt:'Melee encounter with robots inside a futuristic interior',caption:'Melee-focused stage.'},
      {src:'/media/operation-nexus-shotgun.webp',alt:'Shotgun encounter in a futuristic interior',caption:'Shotgun-focused stage.'},
      {src:'/media/operation-nexus-pickup.webp',alt:'Health pickup and ammunition in the FPS environment',caption:'Collectible health and ammunition pickups.'},
      {src:'/media/operation-nexus-city.webp',alt:'Urban environment in a sci-fi FPS',caption:'Urban environment used in the prototype.'}
    ]
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
