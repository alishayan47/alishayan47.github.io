import React from 'react';

/** Conceptual illustration, not experimental observations or a convergence plot. */
export default function PsoArtwork() {
  const particles = [
    {x:94,y:70,x2:285,y2:153,r:4},
    {x:153,y:173,x2:296,y2:160,r:5},
    {x:208,y:76,x2:315,y2:149,r:3.5},
    {x:406,y:65,x2:349,y2:147,r:4},
    {x:472,y:196,x2:353,y2:174,r:5},
    {x:169,y:225,x2:297,y2:185,r:3.5},
    {x:446,y:121,x2:359,y2:159,r:3.5},
    {x:249,y:235,x2:316,y2:192,r:3.5},
  ];
  return <svg className="pso-art-svg" viewBox="0 0 580 310" role="img" aria-labelledby="pso-art-title pso-art-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="pso-art-title">Particle swarm exploring a fitness landscape</title>
    <desc id="pso-art-desc">Illustrative contour lines, particles and movement trajectories suggesting a search toward a best-known region. Not a plot of experimental results.</desc>
    <defs>
      <radialGradient id="pso-field"><stop offset="0%" stopColor="#476c86" stopOpacity=".27"/><stop offset="68%" stopColor="#233b51" stopOpacity=".10"/><stop offset="100%" stopColor="#152231" stopOpacity="0"/></radialGradient>
      <marker id="pso-tip" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5" fill="none" stroke="#b0cee0" strokeWidth="1"/></marker>
      <pattern id="pso-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#6e90a8" strokeOpacity=".1" strokeWidth=".8"/></pattern>
    </defs>
    <rect width="580" height="310" fill="url(#pso-grid)"/>
    <ellipse cx="322" cy="164" rx="232" ry="130" fill="url(#pso-field)" />
    <g fill="none" stroke="#83a9c2" strokeWidth="1.2" strokeOpacity=".5">
      <path d="M36 181 C59 111 158 39 260 43 C368 34 494 85 530 158 C552 203 485 270 370 278 C249 291 88 251 36 181Z"/>
      <path d="M102 181 C111 124 179 77 260 79 C338 77 431 106 454 159 C476 207 408 245 336 245 C238 246 130 228 102 181Z"/>
      <path d="M172 177 C179 140 215 119 279 113 C341 108 390 137 397 167 C408 199 368 220 317 221 C255 221 190 212 172 177Z"/>
      <path d="M245 178 C247 159 270 143 305 143 C345 137 370 152 372 170 C376 190 353 200 322 203 C290 206 254 196 245 178Z"/>
    </g>
    <g stroke="#b0cee0" strokeWidth="1.3" strokeOpacity=".6" fill="none" strokeDasharray="4 6" markerEnd="url(#pso-tip)">
      {particles.map((p,i)=><path key={i} d={`M${p.x} ${p.y} Q${(p.x+p.x2)/2+((i%2)?-10:12)} ${(p.y+p.y2)/2-12} ${p.x2} ${p.y2}`}/>)}
    </g>
    <g>{particles.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r={p.r+3} fill="#8db3cf" opacity=".11"/><circle cx={p.x} cy={p.y} r={p.r} fill={i%3===0?'#d5e6f2':'#93b8d1'}/></g>)}</g>
    <circle cx="327" cy="172" r="21" fill="none" stroke="#d2e6f4" strokeWidth="1.1" strokeDasharray="4 5" opacity=".8"/>
    <circle cx="327" cy="172" r="9" fill="#dceef9" opacity=".18"/><circle cx="327" cy="172" r="5" fill="#e8f5fc"/>
    <path d="M342 182 l34 24" fill="none" stroke="#bdd5e6" strokeOpacity=".8"/>
    <text x="380" y="212" fontFamily="monospace" fontSize="10" fill="#d2e6f4">best-known</text>
    <text x="380" y="226" fontFamily="monospace" fontSize="10" fill="#d2e6f4">region</text>
    <text x="29" y="32" fontFamily="monospace" fontSize="11" letterSpacing="1.8" fill="#c1dbea">PARTICLE SWARM / SEARCH</text>
    <text x="29" y="292" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="#7895ab">ILLUSTRATIVE FITNESS LANDSCAPE · NOT EXPERIMENTAL DATA</text>
  </svg>;
}
