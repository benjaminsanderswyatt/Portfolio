import React from 'react';

import './sectionPlaceholder.css';

const SectionPlaceholder = ({ height = '50vh', background = 'var(--section-bg)' }) => (
  <div className="section-placeholder" style={{ height, background }}>
    
  </div>
);

export default SectionPlaceholder;