import React from 'react';

/** Conceptual project illustration. The meal photograph is AI-generated;
 * the flow is explanatory, NOT an output from the trained models. */
export default function HaggisArtwork({ large = false }) {
  return <div className={`haggis-artwork ${large ? 'haggis-artwork-large' : ''}`} role="img" aria-label="Illustrative prepared meal photograph beside a conceptual food-image-to-ingredient-cluster-to-nutrition-estimate pipeline">
    <div className="haggis-photo">
      <img src="/media/haggis-meal-illustration.webp" alt="" loading="lazy" />
      <span className="haggis-photo-label">01 / MEAL IMAGE</span>
    </div>
    <div className="haggis-flow">
      <span className="haggis-flow-eyebrow">GOOD OLD HAGGIS / VISION PIPELINE</span>
      <div className="haggis-flow-path" aria-hidden="true">
        <div className="haggis-flow-node"><span className="haggis-flow-icon haggis-flow-icon-photo">◩</span><div><strong>Food image</strong><small>Visual features</small></div></div>
        <div className="haggis-flow-connector">↓</div>
        <div className="haggis-flow-node"><span className="haggis-flow-icon haggis-flow-icon-cluster"><i/><i/><i/></span><div><strong>Ingredient cluster</strong><small>K-Means labels · CNN</small></div></div>
        <div className="haggis-flow-connector">↓</div>
        <div className="haggis-flow-node"><span className="haggis-flow-icon haggis-flow-icon-score">A–E</span><div><strong>Nutrition estimate</strong><small>Exploratory outcome</small></div></div>
      </div>
      <span className="haggis-flow-footer">IMAGE ≠ INGREDIENT LIST</span>
    </div>
  </div>;
}
