import React from 'react';

import './skills.css';


const Skills = () => {
  const skills = ['a', 'b', 'c', 'd', 'e', 'f'];

  return (
    <section id="skills" className="section skills-section">

      <div className="skills-container">

        <ul className="skills-list">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>

      </div>

    </section>
  );
};

export default Skills;
